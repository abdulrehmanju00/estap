# ESTA Asset Inventory (Phase 2.1 Audit & Localization)

This document provides a comprehensive accounting of every asset discovered within `reference/index.html` and `reference/styles.css`, categorizing each by its exact storage and delivery state in `esta-site/`.

---

## 1. Asset Classification Summary

| Category | Count | Description |
|---|---|---|
| **Total Discovered Asset References** | **507** | Total unique asset URLs identified across captured HTML attributes (`src`, `data-src`, `srcset`) and stylesheet `@font-face` rules. |
| **Assets Embedded as Base64 Data** | **104** | Product and thumbnail images embedded directly as base64 WebP data URIs in `<img src="data:image/webp;base64,...">`. These load instantaneously with zero network latency. |
| **Assets Downloaded & Stored Locally** | **72** | Core assets retrieved from origin and stored in `esta-site/assets/` (7 webfont files, 2 logo assets, 5 promotional banners, 6 category icons, and 52 primary product showcase images). |
| **Primary Homepage Images Localized (`data-src`)** | **86 of 86 (100%)** | All 86 `data-src` lazy-load image attributes on the homepage now point directly to local files in `./assets/`. Zero remote `data-src` remain. |
| **Assets Remaining Externally Hosted** | **359 unique URLs (675 references)** | Secondary responsive resolution descriptors in `srcset` (e.g. `430x430`, `700x700`, `300x300` variants) and remote Google Font weights hosted on `fonts.gstatic.com`. |
| **Assets Unavailable / Failed on Origin** | **11** | Remote paths that returned HTTP 404 on `rays.com.pk` during download tests (e.g., deprecated standalone uploads; visual presentation preserved via base64 fallback). |

---

## 2. Locally Stored Assets (`esta-site/assets/`)

### A. Web Fonts & Iconography (7 files)
These font files were downloaded to eliminate remote CDN and origin font dependencies:

| File Name | Size | Purpose & Typography Scope | Local Path | Origin URL |
|---|---|---|---|---|
| `fa-solid-900.woff2` | 78.2 KB | Font Awesome 5 Free (Solid Glyphs) | `esta-site/assets/fa-solid-900.woff2` | `https://rays.com.pk/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-solid-900.woff2` |
| `fa-regular-400.woff2` | 13.3 KB | Font Awesome 5 Free (Regular Glyphs) | `esta-site/assets/fa-regular-400.woff2` | `https://rays.com.pk/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-regular-400.woff2` |
| `fa-brands-400.woff2` | 81.6 KB | Font Awesome 5 Brands (Social Icons) | `esta-site/assets/fa-brands-400.woff2` | `https://rays.com.pk/wp-content/plugins/elementor/assets/lib/font-awesome/webfonts/fa-brands-400.woff2` |
| `eicons.woff2` | 106.5 KB | Elementor Core UI Icons | `esta-site/assets/eicons.woff2` | `https://rays.com.pk/wp-content/plugins/elementor/assets/lib/eicons/fonts/eicons.woff2` |
| `woodmart-font-3-400.woff2` | 13.7 KB | WoodMart Theme UI (Search, Cart, Wishlist, Arrows) | `esta-site/assets/woodmart-font-3-400.woff2` | `https://rays.com.pk/wp-content/themes/woodmart/fonts/woodmart-font-3-400.woff2` |
| `WooCommerce.woff` | 8.1 KB | WooCommerce Core Shop Glyphs | `esta-site/assets/WooCommerce.woff` | `https://rays.com.pk/wp-content/plugins/woocommerce/assets/fonts/WooCommerce.woff` |
| `star.woff` | 1.3 KB | Product Star Review Rating Glyphs | `esta-site/assets/star.woff` | `https://rays.com.pk/wp-content/plugins/woocommerce/assets/fonts/star.woff` |

### B. Brand & Navigation Assets (3 files)
| File Name | Size | Purpose | Status |
|---|---|---|---|
| `Asset-1.png` | 12.3 KB | Header Brand Logo (Preserved original dimensions: 663×264 px, max-width 150px) | Localized; Pending authentic ESTA vector logo |
| `Asset-2.png` | 11.4 KB | Secondary Header / Sticky Logo Variant | Localized; Pending authentic ESTA vector logo |
| `Rays.jpg` | 1.7 KB | Site Favicon & Apple Touch Icon (32×32, 192×192 px) | Localized; Pending authentic ESTA icon |

### C. Promotional Section Banners (5 files)
Full-width section separator banners displayed across the homepage:
| File Name | Size | Resolution | Section Placement |
|---|---|---|---|
| `1-For-Small-Appliances-Banner-1-1300x433.webp` | 46.1 KB | 1300 × 433 px | Small Domestic Appliances Section Header |
| `2-For-Built-In-Microwave-Ovens-Banner-1-1300x433.webp` | 45.1 KB | 1300 × 433 px | Built-in Microwave Ovens Showcase |
| `3-For-Built-In-Ovens-Banner-1-1300x433.webp` | 38.2 KB | 1300 × 433 px | Built-in Ovens Showcase |
| `4-For-Hobs-Banner-1-1300x433.webp` | 39.1 KB | 1300 × 433 px | Gas & Ceramic Kitchen Hobs Showcase |
| `5-For-Hoods-Banner-1-1300x433.webp` | 51.3 KB | 1300 × 433 px | Range Hoods Showcase |

### D. Category Showcase Icons (6 files)
Square graphic tiles highlighting major product categories:
| File Name | Size | Resolution | Category Target |
|---|---|---|---|
| `Kitchen-Hood-1-361x360.png` | 17.9 KB | 361 × 360 px | Kitchen Hoods |
| `Kitchen-Hob-1-361x360.png` | 19.9 KB | 361 × 360 px | Kitchen Hobs |
| `Microwave-Oven-1-361x360.png` | 21.7 KB | 361 × 360 px | Microwave Ovens |
| `Sandwich-Maker-360x360.png` | 32.7 KB | 360 × 360 px | Sandwich Makers |
| `Counter-Top-Plate-1-361x360.png` | 24.4 KB | 361 × 360 px | Hot Plates & Induction |
| `Air-Fryer-Oven-1-361x360.png` | 41.6 KB | 361 × 360 px | Air Fryer Ovens |

### E. Primary Product Showcase Images (51 files)
All primary product images used by the WooCommerce product cards on the homepage (e.g. `EK-1701-514x514.webp`, `RSA-1411-514x514.webp`, `AWM-26.webp`, `F60TIX-Silver-514x514.webp`, `3111-S1-514x514.webp`, `6314-G1-514x514.webp`, `108QA90-T-514x514.webp`, `RKH-6006CB-514x514.webp`, etc.) are downloaded and saved in `esta-site/assets/`.

---

## 3. Base64 Embedded Assets (104 items)

Every visible `<img>` tag in `esta-site/index.html` contains an embedded base64 WebP image payload:
- **Format**: `data:image/webp;base64,...`
- **Reliability**: Requires zero HTTP requests to render; guarantees that cards render without layout shift or broken image icons even when offline or behind a strict firewall.

---

## 4. Assets Remaining Externally Hosted

1. **Secondary Responsive `srcset` Descriptors (359 unique URLs, 675 references)**:
   - When screens request secondary resolutions (e.g. `430w`, `700w`), the browser falls back to the embedded base64 WebP preview or queries origin CDN URLs if available.
2. **Google Web Fonts**:
   - Montserrat and Roboto weights declared via `@font-face` point to `fonts.gstatic.com` and `new.rays.com.pk`. The browser uses standard system sans-serif font fallbacks (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`) if unreachable.

---

## 5. Assets Unavailable / Failed on Origin (11 items)

During origin retrieval, 11 URLs returned HTTP 404 Not Found on `rays.com.pk`:
- `Oven-Toasters.jpg`, `Electric-Kettles.jpg`, `Juicers.jpg`, `Sandwich-Makers.jpg`, `Irons.jpg`, `Blender-Grinders.jpg`, `Hand-Blenders.jpg`, `counter-top-plates.jpg`, `air-fryer-oven.jpg`, `geysers.jpg`, `calend-d.svg`.
- **Handling**: These items remain visually intact on the homepage because modern browsers render their inlined base64 WebP image data URIs. No stock photos or invented placeholders were substituted.
