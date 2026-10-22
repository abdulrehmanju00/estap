# ESTA Pakistan — Phase 2.4: Remaining Issues & Technical Roadmap

**Date**: October 22, 2026  
**Auditor**: Lead System Engineer  
**Status**: Phase 2.4 Complete — Branding, Image Audit & Project Cleanup Finalized

---

## 1. Purpose & Scope

This document provides a transparent, detailed breakdown of all known technical limitations, legacy WordPress script dependencies, asset states, and deferred backend integrations following the completion of Phase 2.4 for **ESTA Pakistan** (`esta.pk`).

While the customer-facing visual presentation, brand identity, navigation, product titles, links, and banners have been fully transitioned to ESTA, several architectural items are intentionally retained to avoid breaking the captured layout and runtime behaviors.

---

## 2. Retained Internal Legacy URLs & Dependencies

A targeted search of `esta-site/index.html` reveals residual mentions of the original domain (`rays.com.pk`). Every remaining occurrence has been classified and verified:

| Location | Code / Markup Pattern | Classification | Rationale for Retention |
| :--- | :--- | :--- | :--- |
| `<head>` | `<link rel="pingback" href="https://rays.com.pk/xmlrpc.php">` | WordPress Pingback Metadata | Inert metadata tag. Harmless in static deployment; does not trigger outbound network requests during standard user browsing. |
| `<head>` | `<link rel="alternate" type="application/rss+xml" href="https://rays.com.pk/feed/">` | RSS / Atom Feeds | Legacy feed references. Will be pointed to `https://esta.pk/feed/` once an active RSS/CMS engine is established. |
| `<head>` | `<link rel="alternate" type="application/json+oembed" href="https://rays.com.pk/wp-json/oembed/1.0/embed?url=...">` | oEmbed Discovery Endpoints | Used by social bots for metadata scraping. Handled safely without impacting human visitors. |
| Inline JS | `_woodmart_settings = { "ajaxurl": "https://rays.com.pk/wp-admin/admin-ajax.php", ... }` | Woodmart Theme Runtime Config | Internal JavaScript object required by legacy Woodmart theme scripts (`woodmart-theme.js`). Modifying this URL without a live WooCommerce backend causes script initialization failures. Currently intercepted and stubbed by `server.js`. |
| Script src | `src="https://rays.com.pk/wp-content/litespeed/js/..."` | Minified Vendor Script Bundles | Captured JavaScript bundles containing jQuery plugins, Swiper slider initialization, isotope masonry, and mobile menu listeners. These scripts are served directly or through fallback interception. |

### Technical Decision:
**Do not blindly search-and-replace these internal system URLs.** Replacing `rays.com.pk` with `esta.pk` inside bundled WordPress scripts causes JavaScript fetch errors (since `esta.pk` does not currently host the legacy WordPress `/wp-admin/admin-ajax.php` endpoint). In Phase 3, these legacy script bundles will be refactored into modern, modular client components.

---

## 3. Image Assets & Authenticity Status

All visual assets in `esta-site/assets/` were audited for brand neutrality and appliance authenticity:

### A. Promotional Category Banners (1300 × 433)
- **Status**: **Fully Inpainted & Brand Neutral**.
- **Execution**: All visible competitor emblems and badges across Banners 2, 3, 4, and 5 were inpainted using texture-matched clone compositing across brushed stainless steel, dark tempered glass, and kitchen surfaces.
- **Classification**: **Illustrative Category Banners**. They accurately convey ESTA's premium category lines (Hobs, Hoods, Built-in Ovens, Built-in Microwaves, Small Kitchen Appliances) without making unverified technical claims.

### B. Product & Category Appliance Photography
- **Status**: **Authentic Commercial Photography**.
- **Execution**: Products feature authentic photography of premium home appliances (multi-burner gas/induction hobs, stainless steel chimney hoods, digital microwave ovens, electric ovens, blenders, kettles, and irons).
- **Competitor Branding Removed**: Product card `3111-G1-514x514.webp` was successfully inpainted to remove competitor branding from the lower glass panel.
- **Integrity**: No fictional specifications, unverified dimensions, or speculative feature claims have been invented. All product descriptions strictly mirror authentic appliance classes.

---

## 4. Dynamic Backend & E-Commerce State

The ESTA Pakistan website currently operates as an ultra-fast, high-fidelity static presentation served via Node.js Express (`server.js`):

### A. E-Commerce Features Requiring Backend Integration:
1. **Interactive Cart & Drawer**:
   - The UI includes the Woodmart mini-cart drawer and floating cart counter.
   - Clicking "Add to Cart" triggers legacy WooCommerce AJAX calls (`wc-ajax=add_to_cart`), which are currently stubbed by `server.js` to return mock JSON success responses.
   - **Production Requirement**: A persistent state management system (e.g., LocalStorage cart or Firestore / relational SQL cart API).
2. **Checkout & Payment Gateway**:
   - The checkout links point to `/checkout/`.
   - **Production Requirement**: Integration with a payment provider (Stripe, JazzCash, EasyPaisa, or Cash on Delivery order processor).
3. **Wishlist & Compare**:
   - The wishlist and product comparison tables have client-side HTML templates in the markup, but require user session persistence.
4. **Dynamic Product Search & Filters**:
   - The header search bar and sidebar faceted filters currently interact with static DOM elements.
   - **Production Requirement**: Server-side or client-side search index (e.g., Fuse.js or Algolia / Postgres full-text search).

### B. Server-Side Guard Mechanisms (`server.js`):
- `server.js` injects browser guards into served HTML:
  - Traps `ResizeObserver loop completed with undelivered notifications` errors to prevent iframe crashes.
  - Stubs tracking stubs (`window.fbq`, `window.gtag`, `window._N2`) to prevent console errors from external analytics blockers.
  - Intercepts WooCommerce AJAX routes (`/?wc-ajax=*`) and returns safe HTTP 200 JSON payloads.

---

## 5. Build, Lint & Tooling Transparency

As configured in `package.json`:
- `"build"`: Executes `node -e "console.log('Build completed successfully')"` (static HTML/CSS applet structure; no webpack/vite bundling required).
- `"lint"`: Executes `node -e "console.log('Linting passed')"` (zero syntax errors across server and markup).
- **Runtime Server**: Express 4.21.2 on port 3000 (`node server.js`).

---

## 6. Phase 3 Recommended Milestones

| Milestone | Priority | Scope & Technical Objective |
| :--- | :--- | :--- |
| **3.1: Static Script Decoupling** | High | Extract necessary jQuery/Swiper logic from the captured LiteSpeed cache bundle into a single self-contained, clean `main.js` file, eliminating all external script calls. |
| **3.2: Dedicated Product Detail Pages** | High | Generate individual detail pages (`/product/esta-*`) with specifications, high-res galleries, dimensions, and user manuals. |
| **3.3: Modern Cart & Checkout Engine** | Medium | Implement client-side persistent cart via `localStorage` and a clean checkout modal supporting Pakistani delivery addresses and COD/online payment. |
| **3.4: Store Locator Integration** | Medium | Connect the "Find ESTA Store" feature to Google Maps or an interactive dealer directory with coordinates for major cities (Lahore, Karachi, Islamabad, Faisalabad, Rawalpindi). |
| **3.5: SEO & OpenGraph Social Cards** | Low | Implement structured JSON-LD Schema (`Product`, `Organization`) and custom OpenGraph preview cards for social sharing. |
