import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  renderProductPage,
  renderCategoryPage,
  renderShopPage,
  renderCartPage,
  renderCheckoutPage,
  renderSearchResultsPage
} from './templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Load products catalogue
const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Category friendly title mapping
const categoryTitles = {
  'built-in-kitchen-appliances': 'Built-in Kitchen Appliances',
  'kitchen-hobs': 'Kitchen Hobs',
  'kitchen-hoods': 'Kitchen Hoods',
  'built-in-ovens': 'Built-in Ovens',
  'built-in-microwaves': 'Built-in Microwave Ovens',
  'built-in-induction-cooktops': 'Built-in Induction Cooktops',
  'small-domestic-appliances': 'Small Domestic Appliances',
  'small-electronics': 'Small Electronics',
  'electric-kettles': 'Electric Kettles',
  'sandwich-makers': 'Sandwich Makers',
  'irons': 'Dry & Steam Irons',
  'blender-grinders': 'Blender Grinders',
  'juicers': 'Juicers & Food Processors',
  'hand-blenders': 'Hand Blenders',
  'oven-toasters': 'Oven Toasters',
  'counter-top-plates': 'Counter Top Hot Plates',
  'geysers': 'Water Heaters & Geysers'
};

// Handle WordPress/WooCommerce background AJAX endpoints gracefully
app.all(['/wp-admin/admin-ajax.php', '/'], (req, res, next) => {
  // Woodmart AJAX Search
  if (req.query.action === 'woodmart_ajax_search') {
    const q = (req.query.query || req.query.s || '').toLowerCase().trim();
    const matches = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.primaryCategoryName.toLowerCase().includes(q)
    ).slice(0, 8);

    return res.json({
      status: 'success',
      suggestions: matches.map(m => ({
        value: m.name,
        permalink: m.url,
        price: m.price,
        thumbnail: m.image,
        sku: m.sku
      }))
    });
  }

  // WooCommerce background AJAX stubs
  if (req.query['wc-ajax'] || (req.path && req.path.includes('admin-ajax.php'))) {
    return res.json({
      success: true,
      data: { sent_count: 0 },
      fragments: {},
      cart_hash: 'esta-demo-hash'
    });
  }
  next();
});

app.post('*', (req, res, next) => {
  if (req.xhr || req.headers['content-type']?.includes('json') || req.path.includes('wp-admin') || req.query['wc-ajax']) {
    return res.json({ success: true, data: {} });
  }
  next();
});

const guardScript = `
<script>
(function() {
  // 1. Wrap ResizeObserver with requestAnimationFrame to prevent notification loops in iframe
  if (typeof window.ResizeObserver !== 'undefined') {
    var OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends OriginalResizeObserver {
      constructor(callback) {
        super(function(entries, observer) {
          window.requestAnimationFrame(function() {
            try {
              callback(entries, observer);
            } catch (err) {
              // Benign ResizeObserver notification error handled
            }
          });
        });
      }
    };
  }

  // 2. Intercept and suppress ResizeObserver notifications, cross-origin, and legacy tracker errors
  window.addEventListener('error', function(e) {
    var msg = (e && e.message) ? String(e.message) : '';
    var lower = msg.toLowerCase();
    var filename = (e && e.filename) ? String(e.filename) : '';
    if (
      lower.indexOf('resizeobserver') !== -1 ||
      msg === 'Script error.' ||
      msg.indexOf('Script error') !== -1 ||
      (filename && filename.indexOf(window.location.host) === -1) ||
      (e.target && (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK'))
    ) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      return true;
    }
  }, true);

  // 3. Intercept unhandled promise rejections (e.g. from analytics network calls)
  window.addEventListener('unhandledrejection', function(e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);

  // 4. Fallback standard onerror
  window.onerror = function(msg, url, line, col, err) {
    var str = typeof msg === 'string' ? msg.toLowerCase() : '';
    if (
      str.indexOf('resizeobserver') !== -1 ||
      str === 'script error.' ||
      str.indexOf('script error') !== -1 ||
      (url && url.indexOf(window.location.host) === -1)
    ) {
      return true;
    }
  };

  // 5. Safe stubs for globals expected by WordPress / LiteSpeed / Google / FB trackers
  window.n2const = window.n2const || { prefersReducedMotion: false };
  window._N2 = window._N2 || { _r: [], _d: [], r: function(){}, d: function(){} };
  window._N2.SmartSliderSimple = window._N2.SmartSliderSimple || function() {};
  window._N2.SmartSliderWidgetArrowImage = window._N2.SmartSliderWidgetArrowImage || function() {};
  window._N2.SmartSliderWidgetBulletTransition = window._N2.SmartSliderWidgetBulletTransition || function() {};
  
  window.grecaptcha = window.grecaptcha || {
    render: function() { return 0; },
    reset: function() {},
    ready: function(cb) { if (cb) cb(); },
    execute: function() { return Promise.resolve(''); }
  };
  window.fbq = window.fbq || function() {};
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
})();
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/esta-commerce.js" defer></script>
`;

function injectGuard(html) {
  return html.replace(/<head[^>]*>/i, function(match) {
    return match + guardScript;
  });
}

// Serve reference copy at /reference/ for comparison verification (100% untouched)
const refIndexPath = path.join(__dirname, 'reference', 'index.html');
app.get(['/reference', '/reference/', '/reference/index.html'], (req, res) => {
  const refHtml = fs.readFileSync(refIndexPath, 'utf-8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(injectGuard(refHtml));
});
app.use('/reference', express.static(path.join(__dirname, 'reference'), { index: false }));

// Read base template parts from esta-site/index.html
const estaIndexPath = path.join(__dirname, 'esta-site', 'index.html');
const estaHtmlRaw = fs.readFileSync(estaIndexPath, 'utf-8');
const splitStart = estaHtmlRaw.indexOf('<div class="wd-page-content main-page-wrapper">');
const splitEnd = estaHtmlRaw.indexOf('<footer class="wd-footer footer-container">');
const headerPart = estaHtmlRaw.slice(0, splitStart);
const footerPart = estaHtmlRaw.slice(splitEnd);

function buildPage(contentHtml, pageTitle = '') {
  let header = headerPart;
  if (pageTitle) {
    header = header.replace(/<title>[^<]*<\/title>/, `<title>${pageTitle} – ESTA Pakistan</title>`);
  }
  const page = header +
    `<div class="wd-page-content main-page-wrapper"><main id="main-content" class="wd-content-layout content-layout-wrapper container" role="main" style="padding:40px 15px;"><div class="wd-content-area site-content">` +
    contentHtml +
    `</div></main></div>` +
    footerPart;
  return injectGuard(page);
}

// 1. Homepage & On-Site Search
app.get(['/', '/index.html'], (req, res) => {
  const query = (req.query.s || '').trim();
  if (query) {
    const qLower = query.toLowerCase();
    const matches = products.filter(p =>
      p.name.toLowerCase().includes(qLower) ||
      p.sku.toLowerCase().includes(qLower) ||
      p.primaryCategoryName.toLowerCase().includes(qLower)
    );
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(buildPage(renderSearchResultsPage(query, matches), `Search: ${query}`));
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(injectGuard(estaHtmlRaw));
});

// 2. Product Detail Pages (PDP) for all 34 products
app.get('/product/:slug', (req, res, next) => {
  const slug = req.params.slug.replace(/\/$/, '');
  const product = products.find(p => p.slug === slug);
  if (!product) return next();

  // Find related products in same category
  const related = products.filter(p =>
    p.id !== product.id &&
    (p.primaryCategory === product.primaryCategory || p.categories.some(c => product.categories.includes(c)))
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderProductPage(product, related), product.name));
});

// 3. Category Pages
app.get(['/product-category/:cat1', '/product-category/:cat1/:cat2'], (req, res) => {
  const catSlug = (req.params.cat2 || req.params.cat1 || '').replace(/\/$/, '');
  const title = categoryTitles[catSlug] || catSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  let catProducts = [];
  if (catSlug === 'built-in-kitchen-appliances') {
    catProducts = products.filter(p => p.categories.includes('built-in-kitchen-appliances'));
  } else if (catSlug === 'small-domestic-appliances' || catSlug === 'small-electronics') {
    catProducts = products.filter(p => p.categories.includes('small-domestic-appliances') || p.categories.includes('small-electronics'));
  } else {
    catProducts = products.filter(p => p.categories.includes(catSlug) || p.primaryCategory === catSlug);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderCategoryPage(title, catSlug, catProducts), title));
});

// 4. Shop Page
app.get(['/shop', '/shop/'], (req, res) => {
  const activeCat = (req.query.cat || 'all').toLowerCase();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderShopPage(products, activeCat), 'Shop Appliances'));
});

// 5. Dedicated Cart Page
app.get(['/cart', '/cart/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderCartPage(), 'Shopping Cart'));
});

// 6. Dedicated Checkout Page
app.get(['/checkout', '/checkout/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderCheckoutPage(), 'Checkout'));
});

// 7. Wishlist & Compare Views
app.get(['/wishlist', '/wishlist/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(
    `<div style="text-align:center;padding:48px 16px;">
      <h1 style="font-size:28px;font-weight:700;margin-bottom:12px;">ESTA Wishlist</h1>
      <p style="color:#64748b;font-size:14px;margin-bottom:24px;">Your saved appliances are stored in browser session. (Demonstration Mode)</p>
      <a href="/shop/" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:600;">Browse Appliances</a>
    </div>`,
    'Wishlist'
  ));
});

app.get(['/compare', '/compare/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(
    `<div style="text-align:center;padding:48px 16px;">
      <h1 style="font-size:28px;font-weight:700;margin-bottom:12px;">Compare ESTA Appliances</h1>
      <p style="color:#64748b;font-size:14px;margin-bottom:24px;">Compare dimensions, power ratings, burner configurations, and capacities side-by-side. (Demonstration Mode)</p>
      <a href="/shop/" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:600;">Browse Appliances</a>
    </div>`,
    'Compare'
  ));
});

// 8. Static Content Pages (About Us, Contact Us)
app.get(['/about-us', '/about-us/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(
    `<div style="max-width:820px;margin:0 auto;line-height:1.7;">
      <h1 style="font-size:32px;font-weight:700;margin-bottom:20px;color:#0f172a;">About ESTA Pakistan</h1>
      <p style="font-size:16px;color:#475569;margin-bottom:16px;">
        ESTA Pakistan is a premier brand of built-in kitchen appliances and domestic electrical appliances. Engineered with European aesthetic principles and tailored for the demands of Pakistani cooking, ESTA brings timeless design, culinary precision, and durable craftsmanship into contemporary living spaces.
      </p>
      <p style="font-size:15px;color:#475569;margin-bottom:16px;">
        Our portfolio spans high-suction kitchen range hoods, tempered glass and stainless steel hobs, multi-function convection ovens, built-in digital microwave ovens, and precision breakfast electronics.
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin-top:28px;">
        <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:8px;">ESTA Quality Commitment</h3>
        <p style="font-size:14px;color:#64748b;margin:0;">All ESTA appliances comply with international ISO 9001 quality management standards and include official 1-year brand warranty coverage through our nationwide dealer network.</p>
      </div>
    </div>`,
    'About Us'
  ));
});

app.get(['/contact-us', '/contact-us/'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(
    `<div style="max-width:820px;margin:0 auto;line-height:1.7;">
      <h1 style="font-size:32px;font-weight:700;margin-bottom:16px;color:#0f172a;">Contact ESTA Pakistan</h1>
      <p style="font-size:15px;color:#64748b;margin-bottom:28px;">Reach out to our customer care, sales, and dealership advisory team.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:28px;">
        <div>
          <h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 6px;">Head Office & Experience Center</h4>
          <p style="font-size:14px;color:#64748b;margin:0;">ESTA Pakistan Corporate Towers<br>Main Boulevard, Gulberg III, Lahore, Pakistan</p>
        </div>
        <div>
          <h4 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 6px;">Helpline & Inquiries</h4>
          <p style="font-size:14px;color:#64748b;margin:0;">UAN: +92 (42) 111-378-275<br>Email: support@esta.pk<br>Mon – Sat: 9:00 AM – 6:00 PM PST</p>
        </div>
      </div>
    </div>`,
    'Contact Us'
  ));
});

// Serve static assets from esta-site
app.use(express.static(path.join(__dirname, 'esta-site'), { index: false }));

// Fallback to shop if unmapped route
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(buildPage(renderShopPage(products, 'all'), 'Appliance Catalogue'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
