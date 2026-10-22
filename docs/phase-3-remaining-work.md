# ESTA Pakistan — Phase 3: Remaining Work & Commerce Backend Architecture Plan

**Date**: October 22, 2026  
**Auditor**: Lead System Engineer  
**Status**: Phase 3 Functional Verification Complete — Frontend & Routing Operational

---

## 1. Overview & Architectural Options

Following the delivery of dedicated Product Detail Pages (PDP), category filtering, search autocomplete, and client-side demonstration cart interactivity, the ESTA Pakistan website requires a production backend to support live order processing, inventory synchronization, secure customer accounts, and real financial transactions.

### Architectural Decision: Headless Node.js Commerce vs. WooCommerce API

| Dimension | Option A: Connect to Headless WooCommerce | Option B: Native Cloud Database (PostgreSQL / Firestore) | Recommended Approach |
| :--- | :--- | :--- | :--- |
| **Data Ownership** | Relies on external WordPress/WooCommerce server host | Complete ownership in modern Cloud SQL (Postgres) or Firebase Firestore | **Option B** (Native Cloud Backend) |
| **API Latency** | High (PHP/WordPress REST API roundtrips: 400-800ms) | Ultra-low (sub-50ms query times directly from Express) | **Option B** |
| **Maintenance** | WordPress plugin updates, security exploits, database bloat | Serverless scale-to-zero, typed schemas, automated migrations | **Option B** |
| **Theme Compatibility** | Requires keeping legacy WordPress runtime scripts | Pure modern frontend; preserves 100% of the Woodmart/Elementor HTML & CSS | **Option B** |

**Recommendation**: Transition to a **Native Cloud Backend** (Node.js Express + PostgreSQL with Drizzle ORM or Firebase Firestore). The existing 34-product catalogue (`products.json`) serves as the verified initial seed data.

---

## 2. Recommended Commerce Backend Architecture

### 1. Products & Variants Schema
- **Database Tables/Collections**:
  - `products`: `id`, `slug`, `name`, `brand` ("ESTA Pakistan"), `base_price_pkr`, `sku`, `category_id`, `image_url`, `description`, `is_active`, `created_at`.
  - `product_variants`: `id`, `product_id`, `variant_name` (e.g., "Stainless Steel", "Black Tempered Glass"), `sku`, `price_override`, `inventory_quantity`.
  - `categories`: `id`, `slug`, `title`, `parent_id`, `display_order`, `banner_image_url`.

### 2. Real-Time Inventory & Pricing
- Atomic inventory decrements upon order confirmation.
- Out-of-stock badge triggers automatically when `inventory_quantity == 0`.
- All prices strictly stored in integer Pakistani Rupees (`PKR`) to avoid floating-point rounding errors.

### 3. Persistent Cart & Checkout Flow
- **Session-Based or Authenticated Cart**:
  - Anonymous visitors: Cart tokens stored in secure `HttpOnly` cookie or JWT.
  - Authenticated visitors: Cart items synchronized with database user record.
- **Server-Side Validation**:
  - Cart total, taxes, and shipping are recalculated server-side during checkout submission (never trusting client-submitted prices).

### 4. Customer Accounts & Authentication
- Google OAuth / Firebase Auth or secure phone-number SMS OTP verification (standard across Pakistani e-commerce).
- Profiles maintain delivery addresses (street, area, landmark, city, postal code) and order history.

### 5. Orders & Order Status Lifecycle
- **Order Model**:
  - `id`: Unique order number (e.g., `ESTA-2026-10042`).
  - `customer_id` / guest contact details (Name, Phone, Email, Delivery City).
  - `items`: Snapshot of products, unit prices, and quantities at time of purchase.
  - `subtotal_pkr`, `shipping_pkr` (Free promotion or regional surcharge), `discount_pkr`, `total_pkr`.
  - `status`: `PENDING` → `CONFIRMED` → `PROCESSING` → `DISPATCHED` → `DELIVERED` → `CANCELLED`.
  - `tracking_number`: Courier tracking ID.

### 6. Payment Integration Plan
- **Primary Method (Pakistan E-Commerce Standard)**: **Cash on Delivery (COD)**.
  - Generates pending order, triggers automated SMS/WhatsApp order confirmation.
- **Digital Payment Gateways Required**:
  - **JazzCash / EasyPaisa Mobile Wallets**: Direct API integration for mobile wallet debit and debit/credit cards.
  - **PayFast / Bank Alfalah / Safepay**: Local 3D-Secure payment gateway for Visa, MasterCard, and UnionPay.
  - **Stripe**: For international overseas Pakistani transactions.
- **Security Rule**: Zero payment card data touches application servers; all transactions use tokenized redirect or embedded iFrame PCI-DSS Level 1 compliant fields.

### 7. Shipping & Courier Integration
- Integration with major Pakistani logistics APIs:
  - **TCS E-Com API**
  - **Leopards Courier API**
  - **Trax Logistics / Call Courier**
- Automatic generation of airway bills (AWB), shipping labels, and real-time webhook status updates.

### 8. Admin Management Dashboard
- Lightweight administrative panel (e.g., `/admin`) secured with role-based access control (RBAC):
  - Product catalog CRUD (create, update prices, upload replacement photography).
  - Order review and fulfillment status updater.
  - Customer support lookup by phone or order number.

---

## 3. Exact Credentials & Configuration Required Before Production Go-Live

To transition from the current verified demonstration mode to active production transactions, the following real credentials and infrastructure must be provisioned:

| Integration / Service | Required Credentials / Environment Variables | Production Purpose |
| :--- | :--- | :--- |
| **Domain & SSL** | DNS A-records pointing `esta.pk` and `www.esta.pk` to production host with TLS certificate | Customer domain branding |
| **Payment Gateway (e.g. JazzCash)** | `JAZZCASH_MERCHANT_ID`, `JAZZCASH_PASSWORD`, `JAZZCASH_INTEGRITY_SALT` | Local mobile wallet & card processing |
| **Payment Gateway (e.g. Safepay/PayFast)**| `SAFEPAY_API_KEY`, `SAFEPAY_SECRET_KEY`, `SAFEPAY_WEBHOOK_SECRET` | 3D-Secure Visa & Mastercard processing |
| **Transactional SMS / OTP** | `SMS_GATEWAY_API_KEY`, `SMS_SENDER_ID` (e.g. Branded "ESTA") | Order confirmation & OTP verification |
| **Courier Logistics API** | `COURIER_CLIENT_ID`, `COURIER_API_KEY`, `COURIER_ACCOUNT_NO` | Automated consignment booking & tracking |
| **Transactional Email** | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Order confirmation emails & PDF invoices |
| **Database Instance** | PostgreSQL connection URI or Firebase Service Account | Persistent storage for orders and customers |

---

## 4. Work Completed in Phase 3 vs. Deferred to Phase 4

### Delivered in Phase 3:
- [x] Full functional audit (`docs/phase-3-functional-audit.md`).
- [x] Replaced all residual competitor `data-success_message` button attributes with ESTA naming.
- [x] Normalized all 270 hardcoded `https://esta.pk/*` absolute URLs into root-relative links.
- [x] Implemented dedicated responsive Product Detail Pages (PDP) for all 34 products with authentic specifications.
- [x] Implemented Category Collection pages with breadcrumb navigation.
- [x] Implemented Complete Shop page with interactive category filters.
- [x] Implemented client-side demonstration cart with `localStorage` persistence, item removal, and quantity adjustments.
- [x] Implemented live debounced catalog search in header with Woodmart AJAX endpoint integration.
- [x] Implemented dedicated Cart and Checkout demonstration layouts with transparent demo notices.
- [x] Comprehensive test suite executed and documented (`docs/phase-3-test-results.md`).

### Deferred to Phase 4 (Production Go-Live):
- [ ] Database provisioning and migration from `products.json` into relational/Firestore tables.
- [ ] Merchant account setup and payment gateway API integration.
- [ ] Customer account authentication and order tracking portal.
- [ ] Real-time courier dispatch webhook integration.
