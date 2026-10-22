/**
 * ESTA Pakistan — HTML Page Templates for Subpages
 * Renders Product Detail Pages, Categories, Shop, Cart, and Checkout
 * using authentic Woodmart classes and styling.
 */

export function renderProductCard(p) {
  return `
    <div class="product-grid-item" style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:transform 0.2s, box-shadow 0.2s;">
      <a href="${p.url}" style="text-align:center;display:block;margin-bottom:12px;">
        <img src="${p.image}" alt="${p.name}" style="width:100%;height:200px;object-fit:contain;" />
      </a>
      <div>
        <div style="font-size:11px;color:#64748b;text-transform:uppercase;margin-bottom:4px;letter-spacing:0.5px;">${p.primaryCategoryName}</div>
        <h3 style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 8px;line-height:1.4;">
          <a href="${p.url}" style="color:inherit;text-decoration:none;">${p.name}</a>
        </h3>
        <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">SKU: ${p.sku}</div>
      </div>
      <div>
        <div style="font-size:16px;font-weight:700;color:#b91c1c;margin-bottom:12px;">${p.price}</div>
        <button type="button" class="add_to_cart_button" data-product_id="${p.id}" style="width:100%;background:#111;color:#fff;border:none;padding:10px;border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;transition:background 0.2s;">
          Add to cart
        </button>
      </div>
    </div>
  `;
}

export function renderProductPage(p, related) {
  const relatedHtml = related.slice(0, 4).map(r => renderProductCard(r)).join('');

  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:28px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <a href="/product-category/${p.primaryCategory}/" style="color:#0f172a;text-decoration:none;">${p.primaryCategoryName}</a> <span> / </span>
      <span style="color:#64748b;">${p.name}</span>
    </div>

    <div class="product single-product-page wd-layout-default">
      <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:48px;" class="pdp-main-grid">
        <div class="product-images" style="text-align:center;">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;display:inline-block;width:100%;max-width:500px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <img src="${p.image}" alt="${p.name}" style="width:100%;max-height:440px;object-fit:contain;" />
          </div>
        </div>

        <div class="summary entry-summary">
          <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">
            ${p.primaryCategoryName}
          </div>
          <h1 class="product_title entry-title" style="font-size:28px;font-weight:700;color:#0f172a;margin:0 0 12px;line-height:1.3;">
            ${p.name}
          </h1>

          <div class="price-wrap" style="margin-bottom:16px;">
            <span class="price" style="font-size:26px;font-weight:800;color:#b91c1c;">${p.price}</span>
            <span style="font-size:13px;color:#64748b;margin-left:8px;">(Incl. all taxes)</span>
          </div>

          <div style="margin-bottom:20px;">
            <span style="display:inline-block;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">
              ✓ In Stock — Authentic ESTA Certified
            </span>
          </div>

          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">
            Engineered for high performance, premium build quality, and sleek modern aesthetics, the ${p.name} delivers precision cooking, durability, and energy efficiency for the modern Pakistani home.
          </p>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
              <div class="quantity" style="display:flex;align-items:center;border:1px solid #cbd5e1;border-radius:4px;background:#fff;">
                <button type="button" class="qty-btn minus" style="width:36px;height:42px;border:none;background:none;font-size:18px;cursor:pointer;">-</button>
                <input type="number" class="input-text qty text" step="1" min="1" max="99" name="quantity" value="1" title="Qty" size="4" style="width:48px;height:42px;border:none;text-align:center;font-size:15px;font-weight:600;">
                <button type="button" class="qty-btn plus" style="width:36px;height:42px;border:none;background:none;font-size:18px;cursor:pointer;">+</button>
              </div>
              <button type="button" class="single_add_to_cart_button button alt add_to_cart_button" data-product_id="${p.id}" style="background:#111;color:#fff;border:none;padding:12px 32px;border-radius:4px;font-weight:600;font-size:15px;cursor:pointer;flex:1;">
                Add to cart
              </button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;color:#64748b;">
              <span>🚚 Free Delivery Nationwide</span>
              <span>🛡️ 1-Year Official Warranty</span>
              <span>⚡ Genuine ESTA Pakistan Standard</span>
              <span>📞 Dedicated Customer Support</span>
            </div>
          </div>

          <div class="product_meta" style="font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:16px;line-height:1.8;">
            <div><strong>SKU:</strong> <span style="color:#0f172a;">${p.sku}</span></div>
            <div><strong>Category:</strong> <a href="/product-category/${p.primaryCategory}/" style="color:#0f172a;text-decoration:none;">${p.primaryCategoryName}</a></div>
            <div><strong>Brand:</strong> <span style="color:#0f172a;">ESTA Pakistan</span></div>
          </div>
        </div>
      </div>

      <!-- Specifications Table -->
      <div style="margin-top:56px;border-top:1px solid #e2e8f0;padding-top:36px;">
        <h2 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 20px;">Product Specifications</h2>
        <table style="width:100%;max-width:760px;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;background:#fff;">
          <tbody>
            <tr style="border-bottom:1px solid #f1f5f9;"><th style="padding:12px 18px;text-align:left;background:#f8fafc;width:240px;font-size:13px;color:#475569;">Brand</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">ESTA Pakistan</td></tr>
            <tr style="border-bottom:1px solid #f1f5f9;"><th style="padding:12px 18px;text-align:left;background:#f8fafc;font-size:13px;color:#475569;">Appliance Category</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">${p.primaryCategoryName}</td></tr>
            <tr style="border-bottom:1px solid #f1f5f9;"><th style="padding:12px 18px;text-align:left;background:#f8fafc;font-size:13px;color:#475569;">Model / SKU</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">${p.sku}</td></tr>
            <tr style="border-bottom:1px solid #f1f5f9;"><th style="padding:12px 18px;text-align:left;background:#f8fafc;font-size:13px;color:#475569;">Operating Voltage</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">220-240V ~ 50Hz (Standard Pakistan Grid)</td></tr>
            <tr style="border-bottom:1px solid #f1f5f9;"><th style="padding:12px 18px;text-align:left;background:#f8fafc;font-size:13px;color:#475569;">Warranty Coverage</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">1-Year Official Brand Warranty</td></tr>
            <tr><th style="padding:12px 18px;text-align:left;background:#f8fafc;font-size:13px;color:#475569;">Quality Certification</th><td style="padding:12px 18px;font-size:14px;color:#0f172a;">ISO 9001 Certified Manufacturing</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Related Products -->
      ${relatedHtml ? `
        <div style="margin-top:56px;border-top:1px solid #e2e8f0;padding-top:36px;">
          <h2 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 24px;">Related ESTA Appliances</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:24px;">
            ${relatedHtml}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function renderCategoryPage(title, slug, products) {
  const cardsHtml = products.map(p => renderProductCard(p)).join('');

  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:24px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <span style="color:#64748b;">${title}</span>
    </div>

    <div style="margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:32px;font-weight:700;color:#0f172a;margin:0 0 6px;">${title}</h1>
        <p style="font-size:14px;color:#64748b;margin:0;">Showing ${products.length} premium ESTA appliances</p>
      </div>
      <div>
        <a href="/shop/" style="font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;">View All Categories →</a>
      </div>
    </div>

    ${products.length > 0 ? `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:24px;">
        ${cardsHtml}
      </div>
    ` : `
      <div style="text-align:center;padding:60px 20px;background:#f8fafc;border-radius:8px;">
        <h3 style="font-size:18px;color:#475569;">No products currently listed in this category.</h3>
        <a href="/shop/" style="margin-top:16px;display:inline-block;background:#111;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:600;">Return to Shop</a>
      </div>
    `}
  `;
}

export function renderShopPage(products, activeCat = 'all') {
  const categories = [
    { slug: 'all', label: 'All Appliances' },
    { slug: 'kitchen-hobs', label: 'Kitchen Hobs' },
    { slug: 'kitchen-hoods', label: 'Kitchen Hoods' },
    { slug: 'built-in-ovens', label: 'Built-in Ovens' },
    { slug: 'built-in-microwaves', label: 'Built-in Microwaves' },
    { slug: 'small-domestic-appliances', label: 'Small Domestic' },
    { slug: 'electric-kettles', label: 'Electric Kettles' },
    { slug: 'sandwich-makers', label: 'Sandwich Makers' }
  ];

  const filtered = activeCat === 'all'
    ? products
    : products.filter(p => p.categories.includes(activeCat) || p.primaryCategory === activeCat);

  const filterTabs = categories.map(c => `
    <a href="/shop/${c.slug === 'all' ? '' : '?cat=' + c.slug}" style="display:inline-block;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;text-decoration:none;border:1px solid ${c.slug === activeCat ? '#111' : '#cbd5e1'};background:${c.slug === activeCat ? '#111' : '#fff'};color:${c.slug === activeCat ? '#fff' : '#334155'};transition:all 0.2s;">
      ${c.label}
    </a>
  `).join('');

  const cardsHtml = filtered.map(p => renderProductCard(p)).join('');

  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:24px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <span style="color:#64748b;">ESTA Appliance Collection</span>
    </div>

    <div style="margin-bottom:28px;">
      <h1 style="font-size:32px;font-weight:700;color:#0f172a;margin:0 0 8px;">ESTA Appliance Collection</h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 20px;">Discover our complete range of built-in cooking appliances and premium small home electronics.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${filterTabs}
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:24px;">
      ${cardsHtml}
    </div>
  `;
}

export function renderCartPage() {
  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:24px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <span style="color:#64748b;">Shopping Cart</span>
    </div>

    <h1 style="font-size:32px;font-weight:700;color:#0f172a;margin:0 0 24px;">Shopping Cart</h1>

    <div id="esta-cart-page-mount">
      <!-- Injected dynamically by esta-commerce.js from localStorage -->
      <div style="text-align:center;padding:40px;color:#64748b;">Loading shopping cart...</div>
    </div>
  `;
}

export function renderCheckoutPage() {
  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:24px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <a href="/cart/" style="color:#0f172a;text-decoration:none;">Shopping Cart</a> <span> / </span>
      <span style="color:#64748b;">Checkout</span>
    </div>

    <h1 style="font-size:32px;font-weight:700;color:#0f172a;margin:0 0 24px;">Checkout</h1>

    <div id="esta-checkout-page-mount">
      <!-- Injected dynamically by esta-commerce.js from localStorage -->
      <div style="text-align:center;padding:40px;color:#64748b;">Loading checkout...</div>
    </div>
  `;
}

export function renderSearchResultsPage(query, matches) {
  const cardsHtml = matches.map(p => renderProductCard(p)).join('');

  return `
    <div class="woocommerce-breadcrumb wd-breadcrumbs text-left" style="margin-bottom:24px;font-size:13px;color:#64748b;">
      <a href="/" style="color:#0f172a;text-decoration:none;">Home</a> <span> / </span>
      <span style="color:#64748b;">Search Results</span>
    </div>

    <div style="margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid #e2e8f0;">
      <h1 style="font-size:28px;font-weight:700;color:#0f172a;margin:0 0 6px;">Search Results for “${query}”</h1>
      <p style="font-size:14px;color:#64748b;margin:0;">Found ${matches.length} matching ESTA appliances</p>
    </div>

    ${matches.length > 0 ? `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:24px;">
        ${cardsHtml}
      </div>
    ` : `
      <div style="text-align:center;padding:60px 20px;background:#f8fafc;border-radius:8px;">
        <h3 style="font-size:18px;color:#475569;">No products found matching your search.</h3>
        <p style="font-size:14px;color:#64748b;margin-top:8px;">Try searching for "hob", "hood", "oven", "kettle", or a model SKU.</p>
        <a href="/shop/" style="margin-top:16px;display:inline-block;background:#111;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:600;">Browse All Products</a>
      </div>
    `}
  `;
}
