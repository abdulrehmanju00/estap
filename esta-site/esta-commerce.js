/**
 * ESTA Pakistan — Phase 3 E-Commerce Demo Engine
 * Provides client-side cart state management, live search, and Woodmart drawer interactivity.
 */
(function() {
  'use strict';

  // 34 Verified ESTA Products Dictionary
  var PRODUCTS = [
    { id: "9163", slug: "esta-1-7-liters-electric-kettle-ek-1701", name: "ESTA 1.7 Liters Electric Kettle EK-1701", price: "₨ 9,360", priceNum: 9360, sku: "00012860", category: "Electric Kettles", image: "./assets/EK-1701-514x514.webp", url: "/product/esta-1-7-liters-electric-kettle-ek-1701/" },
    { id: "9185", slug: "esta-4-in-1-juicer-rsa-1411", name: "ESTA 4 in 1 Juicer RSA-1411", price: "₨ 15,000", priceNum: 15000, sku: "00011842", category: "Juicers & Food Processors", image: "./assets/RSA-1411-514x514.webp", url: "/product/esta-4-in-1-juicer-rsa-1411/" },
    { id: "9171", slug: "esta-2-slice-sandwich-maker-sm-3000", name: "ESTA 2 Slice Sandwich Maker SM-3000", price: "₨ 15,000", priceNum: 15000, sku: "00012814", category: "Sandwich Makers", image: "./assets/SM-3000-514x514.webp", url: "/product/esta-2-slice-sandwich-maker-sm-3000/" },
    { id: "9137", slug: "esta-1000w-dry-iron-ir-110", name: "ESTA 1000W Dry Iron IR-110", price: "₨ 6,240", priceNum: 6240, sku: "ESTA-9137", category: "Dry & Steam Irons", image: "./assets/Dry-Iron-IR-110-Black-514x514.webp", url: "/product/esta-1000w-dry-iron-ir-110/" },
    { id: "10441", slug: "esta-1-7-liters-electric-kettle-rek-1720", name: "ESTA 1.7 Liters Electric Kettle REK-1720", price: "₨ 10,800", priceNum: 10800, sku: "00014505", category: "Electric Kettles", image: "./assets/REK-1720-Electric-Kettle.jpg.jpeg", url: "/product/esta-1-7-liters-electric-kettle-rek-1720/" },
    { id: "9135", slug: "esta-1-5-liters-blender-grinder-bl-260bg", name: "ESTA 1.5 Liters Blender Grinder BL-260BG", price: "₨ 15,000", priceNum: 15000, sku: "00013162", category: "Blenders & Grinders", image: "./assets/BL-260BG-514x514.webp", url: "/product/esta-1-5-liters-blender-grinder-bl-260bg/" },
    { id: "10442", slug: "esta-3-in-1-hand-blender-rhb-1000", name: "ESTA 3 in 1 Hand Blender RHB-1000", price: "₨ 11,400", priceNum: 11400, sku: "00014497", category: "Hand Blenders", image: "./assets/Rays-3-in-1-Hand-Blender-RHB-1000.webp", url: "/product/esta-3-in-1-hand-blender-rhb-1000/" },
    { id: "9172", slug: "esta-2-slice-sandwich-maker-sm-1002", name: "ESTA 2 Slice Sandwich Maker SM-1002", price: "₨ 6,600", priceNum: 6600, sku: "00012813", category: "Sandwich Makers", image: "./assets/SM-1002-514x514.webp", url: "/product/esta-2-slice-sandwich-maker-sm-1002/" },
    { id: "8811", slug: "esta-25-liters-built-in-grill-microwave-oven-awm-26", name: "ESTA 25 Liters Built-in Grill Microwave Oven AWM-26", price: "₨ 90,000", priceNum: 90000, sku: "ESTA-8811", category: "Built-in Microwaves", image: "./assets/AWM-26.webp", url: "/product/esta-25-liters-built-in-grill-microwave-oven-awm-26/" },
    { id: "8812", slug: "esta-38-liters-built-in-combi-microwave-oven-mwo-32", name: "ESTA 38 Liters Built-in Combi Microwave Oven MWO-32", price: "₨ 213,600", priceNum: 213600, sku: "00011553", category: "Built-in Microwaves", image: "./assets/MWO-32-514x514.webp", url: "/product/esta-38-liters-built-in-combi-microwave-oven-mwo-32/" },
    { id: "8813", slug: "esta-25-liters-built-in-grill-microwave-oven-meg-95b-bg", name: "ESTA 25 Liters Built-in Grill Microwave Oven MEG-95B-BG", price: "₨ 96,000", priceNum: 96000, sku: "00012748", category: "Built-in Microwaves", image: "./assets/MEG-95B-BG-514x514.webp", url: "/product/esta-25-liters-built-in-grill-microwave-oven-meg-95b-bg/" },
    { id: "8814", slug: "esta-25-liters-built-in-grill-microwave-oven-meg-95b-ss", name: "ESTA 25 Liters Built-in Grill Microwave Oven MEG-95B-SS", price: "₨ 93,600", priceNum: 93600, sku: "00012749", category: "Built-in Microwaves", image: "./assets/MEG-95B-SS-514x514.webp", url: "/product/esta-25-liters-built-in-grill-microwave-oven-meg-95b-ss/" },
    { id: "8810", slug: "esta-25-liters-built-in-grill-microwave-oven-awm-25", name: "ESTA 25 Liters Built-in Grill Microwave Oven AWM-25", price: "₨ 83,499", priceNum: 83499, sku: "00008486", category: "Built-in Microwaves", image: "./assets/AWM-25-Silver-514x514.webp", url: "/product/esta-25-liters-built-in-grill-microwave-oven-awm-25/" },
    { id: "8827", slug: "esta-56-liters-built-in-oven-f60tix", name: "ESTA 56 Liters Built-in Oven F60TIX", price: "₨ 86,400", priceNum: 86400, sku: "00009416", category: "Built-in Ovens", image: "./assets/F60TIX-Silver-514x514.webp", url: "/product/esta-56-liters-built-in-oven-f60tix/" },
    { id: "8831", slug: "esta-80-liters-built-in-oven-ro-10q70af", name: "ESTA 80 Liters Built-in Oven RO-10Q70AF", price: "₨ 168,000", priceNum: 168000, sku: "00012742", category: "Built-in Ovens", image: "./assets/RO-10Q70AF-514x514.webp", url: "/product/esta-80-liters-built-in-oven-ro-10q70af/" },
    { id: "8830", slug: "esta-56-liters-built-in-oven-f86etix", name: "ESTA 56 Liters Built-in Oven F86ETIX", price: "₨ 105,000", priceNum: 105000, sku: "00003740", category: "Built-in Ovens", image: "./assets/F86ETIX-Main-514x514.webp", url: "/product/esta-56-liters-built-in-oven-f86etix/" },
    { id: "8829", slug: "esta-70-liters-built-in-oven-40fbg-e", name: "ESTA 70 Liters Built-in Oven 40FBG-E", price: "₨ 199,800", priceNum: 199800, sku: "00011552", category: "Built-in Ovens", image: "./assets/40FBG-E-Black-514x514.webp", url: "/product/esta-70-liters-built-in-oven-40fbg-e/" },
    { id: "8825", slug: "esta-56-liters-built-in-oven-fge2tix", name: "ESTA 56 Liters Built-in Oven FGE2TIX", price: "₨ 100,200", priceNum: 100200, sku: "00009417", category: "Built-in Ovens", image: "./assets/FGE2TIX.jpg", url: "/product/esta-56-liters-built-in-oven-fge2tix/" },
    { id: "9059", slug: "esta-1-burner-stainless-steel-gas-kitchen-hob-3111-s1", name: "ESTA 1 Burner Stainless Steel Gas Kitchen Hob 3111-S1", price: "₨ 27,600", priceNum: 27600, sku: "00008766", category: "Kitchen Hobs", image: "./assets/3111-S1-514x514.webp", url: "/product/esta-1-burner-stainless-steel-gas-kitchen-hob-3111-s1/" },
    { id: "9037", slug: "esta-4-burners-glass-top-gas-kitchen-hob-6314-g1", name: "ESTA 4 Burners Glass Top Gas Kitchen Hob 6314-G1", price: "₨ 40,800", priceNum: 40800, sku: "00012758", category: "Kitchen Hobs", image: "./assets/6314-G1-514x514.webp", url: "/product/esta-4-burners-glass-top-gas-kitchen-hob-6314-g1/" },
    { id: "9035", slug: "esta-3-burners-ceramic-glass-top-gas-electric-kitchen-hob-rg-8603b", name: "ESTA 3 Burners Ceramic Glass Top Gas/Electric Kitchen Hob RG-8603B", price: "₨ 90,000", priceNum: 90000, sku: "00012744", category: "Kitchen Hobs", image: "./assets/RGH-8603-B-514x514.webp", url: "/product/esta-3-burners-ceramic-glass-top-gas-electric-kitchen-hob-rg-8603b/" },
    { id: "9034", slug: "esta-5-burners-stainless-steel-gas-kitchen-hob-81602-ss", name: "ESTA 5 Burners Stainless Steel Gas Kitchen Hob 81602-SS", price: "₨ 49,560", priceNum: 49560, sku: "00012626", category: "Kitchen Hobs", image: "./assets/81602SS-514x514.webp", url: "/product/esta-5-burners-stainless-steel-gas-kitchen-hob-81602-ss/" },
    { id: "9064", slug: "esta-2-burners-glass-top-gas-kitchen-hob-3112-g1", name: "ESTA 2 Burners Glass Top Gas Kitchen Hob 3112-G1", price: "₨ 31,440", priceNum: 31440, sku: "00008769", category: "Kitchen Hobs", image: "./assets/3112-G1-514x514.webp", url: "/product/esta-2-burners-glass-top-gas-kitchen-hob-3112-g1/" },
    { id: "9062", slug: "esta-2-burners-stainless-steel-gas-kitchen-hob-3112-s1", name: "ESTA 2 Burners Stainless Steel Gas Kitchen Hob 3112-S1", price: "₨ 30,000", priceNum: 30000, sku: "00008768", category: "Kitchen Hobs", image: "./assets/3112-S-514x514.webp", url: "/product/esta-2-burners-stainless-steel-gas-kitchen-hob-3112-s1/" },
    { id: "9061", slug: "esta-1-burner-glass-top-gas-kitchen-hob-3111-g1", name: "ESTA 1 Burner Glass Top Gas Kitchen Hob 3111-G1", price: "₨ 29,400", priceNum: 29400, sku: "00008767", category: "Kitchen Hobs", image: "./assets/3111-G1-514x514.webp", url: "/product/esta-1-burner-glass-top-gas-kitchen-hob-3111-g1/" },
    { id: "9060", slug: "esta-4-burners-stainless-steel-gas-kitchen-hob-6354-s1", name: "ESTA 4 Burners Stainless Steel Gas Kitchen Hob 6354-S1", price: "₨ 39,000", priceNum: 39000, sku: "00012759", category: "Kitchen Hobs", image: "./assets/6354-S1-514x514.webp", url: "/product/esta-4-burners-stainless-steel-gas-kitchen-hob-6354-s1/" },
    { id: "9597", slug: "esta-90cm-wall-mounted-kitchen-hood-108qa90-t", name: "ESTA 90cm Wall Mounted Kitchen Hood 108QA90-Т", price: "₨ 90,600", priceNum: 90600, sku: "00012616", category: "Kitchen Hoods", image: "./assets/108QA90-T-514x514.webp", url: "/product/esta-90cm-wall-mounted-kitchen-hood-108qa90-t/" },
    { id: "9639", slug: "esta-60cm-wall-mounted-kitchen-hood-rkh-6006cb", name: "ESTA 60cm Wall Mounted Kitchen Hood RKH-6006CB", price: "₨ 38,499", priceNum: 38499, sku: "00010029", category: "Kitchen Hoods", image: "./assets/RKH-6006CB-514x514.webp", url: "/product/esta-60cm-wall-mounted-kitchen-hood-rkh-6006cb/" },
    { id: "9606", slug: "esta-90cm-wall-mounted-kitchen-hood-hcf-22", name: "ESTA 90cm Wall Mounted Kitchen Hood HCF-22", price: "₨ 114,000", priceNum: 114000, sku: "00003845", category: "Kitchen Hoods", image: "./assets/Rays-90cm-Wall-Mounted-Kitchen-Hood-HCF-22.webp", url: "/product/esta-90cm-wall-mounted-kitchen-hood-hcf-22/" },
    { id: "9605", slug: "esta-60cm-wall-mounted-kitchen-hood-6160-p1-black", name: "ESTA 60cm Wall Mounted Kitchen Hood 6160-P1 Black", price: "₨ 53,400", priceNum: 53400, sku: "00008819", category: "Kitchen Hoods", image: "./assets/6160P1-Black-514x514.webp", url: "/product/esta-60cm-wall-mounted-kitchen-hood-6160-p1-black/" },
    { id: "10264", slug: "esta-90cm-island-kitchen-hood-ms-94", name: "ESTA 90cm Island Kitchen Hood MS-94", price: "₨ 147,000", priceNum: 147000, sku: "00006469", category: "Kitchen Hoods", image: "./assets/MS-94_-514x514.webp", url: "/product/esta-90cm-island-kitchen-hood-ms-94/" },
    { id: "10246", slug: "esta-90cm-island-kitchen-hood-105ja90-t", name: "ESTA 90cm Island Kitchen Hood 105JA90-T", price: "₨ 146,400", priceNum: 146400, sku: "00012612", category: "Kitchen Hoods", image: "./assets/105JA90-T-514x514.webp", url: "/product/esta-90cm-island-kitchen-hood-105ja90-t/" },
    { id: "10243", slug: "esta-90cm-island-kitchen-hood-8490", name: "ESTA 90cm Island Kitchen Hood 8490", price: "₨ 141,600", priceNum: 141600, sku: "00008689", category: "Kitchen Hoods", image: "./assets/8490-514x514.webp", url: "/product/esta-90cm-island-kitchen-hood-8490/" },
    { id: "10241", slug: "esta-90cm-wall-mounted-kitchen-hood-rkh-9006cb", name: "ESTA 90cm Wall Mounted Kitchen Hood RKH-9006CB", price: "₨ 38,999", priceNum: 38999, sku: "00013415", category: "Kitchen Hoods", image: "./assets/RKH-9006CB-514x514.webp", url: "/product/esta-90cm-wall-mounted-kitchen-hood-rkh-9006cb/" }
  ];

  var CART_STORAGE_KEY = 'esta_demo_cart_v1';

  function getCart() {
    try {
      var raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateUI();
  }

  function formatPKR(num) {
    return '₨\u00a0' + Number(num).toLocaleString('en-PK');
  }

  function findProduct(idOrSlug) {
    if (!idOrSlug) return null;
    var str = String(idOrSlug).toLowerCase().trim();
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (String(PRODUCTS[i].id) === str || PRODUCTS[i].slug.toLowerCase() === str) {
        return PRODUCTS[i];
      }
    }
    return null;
  }

  function addToCart(productId, qty) {
    qty = parseInt(qty, 10) || 1;
    var product = findProduct(productId);
    if (!product) return;

    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        existing = cart[i];
        break;
      }
    }

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image,
        url: product.url,
        quantity: qty
      });
    }

    saveCart(cart);
    openSideCart();
  }

  function removeFromCart(productId) {
    var cart = getCart();
    var updated = cart.filter(function(item) {
      return item.id !== String(productId);
    });
    saveCart(updated);
  }

  function updateQuantity(productId, delta) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === String(productId)) {
        cart[i].quantity += delta;
        if (cart[i].quantity <= 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    saveCart(cart);
  }

  function openSideCart() {
    var drawer = document.querySelector('.cart-widget-side');
    var overlay = document.querySelector('.wd-close-side');
    if (drawer) drawer.classList.add('wd-opened');
    if (overlay) overlay.classList.add('wd-close-side-opened');
    document.body.classList.add('wd-cart-opened');
  }

  function closeSideCart() {
    var drawer = document.querySelector('.cart-widget-side');
    var overlay = document.querySelector('.wd-close-side');
    if (drawer) drawer.classList.remove('wd-opened');
    if (overlay) overlay.classList.remove('wd-close-side-opened');
    document.body.classList.remove('wd-cart-opened');
  }

  function updateUI() {
    var cart = getCart();
    var totalCount = 0;
    var totalAmount = 0;

    for (var i = 0; i < cart.length; i++) {
      totalCount += cart[i].quantity;
      totalAmount += cart[i].quantity * cart[i].priceNum;
    }

    // 1. Update header counts
    var countEls = document.querySelectorAll('.wd-cart-number, .wd-tools-count');
    countEls.forEach(function(el) {
      el.innerHTML = totalCount + ' <span>items</span>';
    });

    var subtotalEls = document.querySelectorAll('.wd-cart-subtotal');
    subtotalEls.forEach(function(el) {
      el.innerHTML = '<span class="woocommerce-Price-amount amount">' + formatPKR(totalAmount) + '</span>';
    });

    // 2. Render Mini-Cart Drawer
    var contentEl = document.querySelector('.widget_shopping_cart_content');
    if (contentEl) {
      if (cart.length === 0) {
        contentEl.innerHTML = 
          '<div class="woocommerce-mini-cart__empty-message" style="padding:48px 24px;text-align:center;">' +
            '<div style="font-size:44px;color:#cbd5e1;margin-bottom:12px;">🛍️</div>' +
            '<p style="font-size:16px;font-weight:700;color:#1e293b;margin:0 0 6px;">Your cart is currently empty</p>' +
            '<p style="font-size:13px;color:#64748b;margin:0 0 20px;">Explore ESTA premium home & kitchen appliances to add items.</p>' +
            '<a href="/shop/" class="button" style="display:inline-block;background:#111;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:600;">Return to Shop</a>' +
          '</div>';
      } else {
        var itemsHtml = '';
        for (var j = 0; j < cart.length; j++) {
          var it = cart[j];
          itemsHtml += 
            '<li class="woocommerce-mini-cart-item mini_cart_item" style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9;">' +
              '<a href="#" class="remove remove_from_cart_button" data-id="' + it.id + '" title="Remove this item" style="color:#ef4444;font-size:18px;font-weight:bold;text-decoration:none;padding:2px 6px;">×</a>' +
              '<a href="' + it.url + '" style="flex-shrink:0;">' +
                '<img src="' + it.image + '" width="54" height="54" style="object-fit:contain;border:1px solid #e2e8f0;border-radius:4px;padding:2px;background:#fff;" alt="' + it.name + '">' +
              '</a>' +
              '<div style="flex:1;min-width:0;">' +
                '<a href="' + it.url + '" style="display:block;font-size:13px;font-weight:600;color:#0f172a;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + it.name + '</a>' +
                '<div style="margin-top:4px;display:flex;align-items:center;gap:6px;font-size:12px;color:#475569;">' +
                  '<span style="display:inline-flex;align-items:center;border:1px solid #cbd5e1;border-radius:3px;overflow:hidden;background:#fff;">' +
                    '<button class="mini-qty-minus" data-id="' + it.id + '" style="border:none;background:none;padding:2px 7px;cursor:pointer;font-weight:bold;">-</button>' +
                    '<span style="padding:0 6px;font-weight:600;">' + it.quantity + '</span>' +
                    '<button class="mini-qty-plus" data-id="' + it.id + '" style="border:none;background:none;padding:2px 7px;cursor:pointer;font-weight:bold;">+</button>' +
                  '</span>' +
                  '<span style="font-weight:600;color:#0f172a;">× ' + it.price + '</span>' +
                '</div>' +
              '</div>' +
            '</li>';
        }

        contentEl.innerHTML = 
          '<div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #f59e0b;padding:8px 12px;margin:12px 16px 8px;border-radius:4px;font-size:12px;color:#92400e;line-height:1.4;">' +
            '<strong>Demonstration Cart:</strong> Quantities and pricing stored locally for testing.' +
          '</div>' +
          '<ul class="woocommerce-mini-cart cart_list product_list_widget" style="padding:0 16px;list-style:none;margin:0;max-height:340px;overflow-y:auto;">' +
            itemsHtml +
          '</ul>' +
          '<div class="woocommerce-mini-cart__total total" style="padding:14px 16px 10px;display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:700;color:#0f172a;border-top:1px solid #e2e8f0;margin-top:8px;">' +
            '<span>Subtotal:</span>' +
            '<span class="woocommerce-Price-amount amount" style="color:#b91c1c;">' + formatPKR(totalAmount) + '</span>' +
          '</div>' +
          '<div class="woocommerce-mini-cart__buttons buttons" style="padding:0 16px 16px;display:flex;flex-direction:column;gap:8px;">' +
            '<a href="/cart/" class="button wc-forward" style="display:block;text-align:center;background:#f8fafc;color:#0f172a;padding:10px;border-radius:4px;text-decoration:none;font-weight:600;font-size:13px;border:1px solid #cbd5e1;">View Cart</a>' +
            '<a href="/checkout/" class="button checkout wc-forward" style="display:block;text-align:center;background:#111;color:#fff;padding:10px;border-radius:4px;text-decoration:none;font-weight:600;font-size:13px;">Proceed to Checkout</a>' +
          '</div>';
      }
    }

    // 3. Render Dedicated /cart/ Page view if present
    var cartPageContainer = document.getElementById('esta-cart-page-mount');
    if (cartPageContainer) {
      renderDedicatedCartPage(cartPageContainer, cart, totalAmount);
    }

    // 4. Render Dedicated /checkout/ Page view if present
    var checkoutPageContainer = document.getElementById('esta-checkout-page-mount');
    if (checkoutPageContainer) {
      renderDedicatedCheckoutPage(checkoutPageContainer, cart, totalAmount);
    }
  }

  function renderDedicatedCartPage(mount, cart, totalAmount) {
    if (cart.length === 0) {
      mount.innerHTML = 
        '<div style="text-align:center;padding:60px 20px;background:#f8fafc;border-radius:8px;margin:20px 0;">' +
          '<div style="font-size:56px;color:#cbd5e1;margin-bottom:16px;">🛒</div>' +
          '<h2 style="font-size:24px;font-weight:700;color:#1e293b;margin:0 0 8px;">Your Cart is Empty</h2>' +
          '<p style="font-size:14px;color:#64748b;margin:0 0 24px;">You have no items in your demonstration shopping cart.</p>' +
          '<a href="/shop/" style="display:inline-block;background:#111;color:#fff;padding:12px 32px;border-radius:4px;text-decoration:none;font-weight:600;">Browse All Appliances</a>' +
        '</div>';
      return;
    }

    var rows = '';
    for (var i = 0; i < cart.length; i++) {
      var it = cart[i];
      var rowSub = it.quantity * it.priceNum;
      rows += 
        '<tr style="border-bottom:1px solid #e2e8f0;">' +
          '<td style="padding:16px 12px;text-align:center;width:40px;">' +
            '<a href="#" class="remove-cart-item" data-id="' + it.id + '" style="color:#ef4444;font-size:20px;font-weight:bold;text-decoration:none;">×</a>' +
          '</td>' +
          '<td style="padding:16px 12px;width:90px;">' +
            '<a href="' + it.url + '"><img src="' + it.image + '" width="80" height="80" style="object-fit:contain;border:1px solid #e2e8f0;border-radius:6px;padding:4px;" alt="' + it.name + '"></a>' +
          '</td>' +
          '<td style="padding:16px 12px;">' +
            '<a href="' + it.url + '" style="font-weight:600;color:#0f172a;text-decoration:none;font-size:15px;">' + it.name + '</a>' +
            '<div style="font-size:12px;color:#64748b;margin-top:4px;">SKU: ' + (it.sku || it.id) + '</div>' +
          '</td>' +
          '<td style="padding:16px 12px;font-weight:600;color:#334155;">' + it.price + '</td>' +
          '<td style="padding:16px 12px;">' +
            '<div style="display:inline-flex;align-items:center;border:1px solid #cbd5e1;border-radius:4px;overflow:hidden;background:#fff;">' +
              '<button class="page-qty-minus" data-id="' + it.id + '" style="border:none;background:#f8fafc;padding:6px 12px;cursor:pointer;font-weight:bold;font-size:14px;">-</button>' +
              '<span style="padding:0 14px;font-weight:600;font-size:14px;">' + it.quantity + '</span>' +
              '<button class="page-qty-plus" data-id="' + it.id + '" style="border:none;background:#f8fafc;padding:6px 12px;cursor:pointer;font-weight:bold;font-size:14px;">+</button>' +
            '</div>' +
          '</td>' +
          '<td style="padding:16px 12px;font-weight:700;color:#b91c1c;text-align:right;">' + formatPKR(rowSub) + '</td>' +
        '</tr>';
    }

    mount.innerHTML = 
      '<div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 18px;margin-bottom:28px;border-radius:4px;font-size:13px;color:#92400e;">' +
        '<strong>Demonstration Shopping Cart:</strong> This cart demonstrates frontend state, item calculation, and responsive layout. Backend order processing is inactive.' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:2fr 1fr;gap:32px;" class="cart-grid-wrap">' +
        '<div>' +
          '<table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;background:#fff;">' +
            '<thead style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">' +
              '<tr>' +
                '<th style="padding:14px;width:40px;"></th>' +
                '<th style="padding:14px;width:90px;"></th>' +
                '<th style="padding:14px;text-align:left;font-size:13px;font-weight:700;color:#475569;">Product</th>' +
                '<th style="padding:14px;text-align:left;font-size:13px;font-weight:700;color:#475569;">Price</th>' +
                '<th style="padding:14px;text-align:left;font-size:13px;font-weight:700;color:#475569;">Quantity</th>' +
                '<th style="padding:14px;text-align:right;font-size:13px;font-weight:700;color:#475569;">Subtotal</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table>' +
          '<div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">' +
            '<a href="/shop/" style="color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;">← Continue Shopping</a>' +
            '<button id="clear-demo-cart" style="background:none;border:1px solid #cbd5e1;padding:8px 16px;border-radius:4px;font-size:13px;cursor:pointer;color:#64748b;">Clear Cart</button>' +
          '</div>' +
        '</div>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;height:fit-content;">' +
          '<h3 style="font-size:18px;font-weight:700;margin:0 0 16px;color:#0f172a;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">Order Summary</h3>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px;color:#475569;">' +
            '<span>Cart Subtotal</span>' +
            '<span style="font-weight:600;color:#0f172a;">' + formatPKR(totalAmount) + '</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:14px;color:#475569;">' +
            '<span>Nationwide Shipping</span>' +
            '<span style="font-weight:600;color:#16a34a;">FREE</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;padding-top:16px;border-top:2px solid #e2e8f0;margin-bottom:24px;font-size:18px;font-weight:700;color:#0f172a;">' +
            '<span>Total</span>' +
            '<span style="color:#b91c1c;">' + formatPKR(totalAmount) + '</span>' +
          '</div>' +
          '<a href="/checkout/" style="display:block;text-align:center;background:#111;color:#fff;padding:14px;border-radius:4px;text-decoration:none;font-weight:600;font-size:15px;">Proceed to Checkout</a>' +
          '<div style="margin-top:16px;font-size:12px;color:#64748b;text-align:center;">' +
            '🛡️ 1-Year Official Warranty Included' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderDedicatedCheckoutPage(mount, cart, totalAmount) {
    if (cart.length === 0) {
      mount.innerHTML = 
        '<div style="text-align:center;padding:60px 20px;background:#f8fafc;border-radius:8px;margin:20px 0;">' +
          '<h2 style="font-size:24px;font-weight:700;color:#1e293b;margin:0 0 8px;">No Items to Checkout</h2>' +
          '<p style="font-size:14px;color:#64748b;margin:0 0 24px;">Please add items to your cart before proceeding to checkout.</p>' +
          '<a href="/shop/" style="display:inline-block;background:#111;color:#fff;padding:12px 32px;border-radius:4px;text-decoration:none;font-weight:600;">Return to Shop</a>' +
        '</div>';
      return;
    }

    var orderItems = '';
    for (var i = 0; i < cart.length; i++) {
      var it = cart[i];
      orderItems += 
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:13px;">' +
          '<span style="color:#334155;">' + it.name + ' <strong style="color:#0f172a;">× ' + it.quantity + '</strong></span>' +
          '<span style="font-weight:600;color:#0f172a;">' + formatPKR(it.quantity * it.priceNum) + '</span>' +
        '</div>';
    }

    mount.innerHTML = 
      '<div style="background:#fee2e2;border-left:4px solid #ef4444;padding:14px 18px;margin-bottom:28px;border-radius:4px;font-size:13px;color:#991b1b;line-height:1.5;">' +
        '<strong>ESTA Demonstration Notice:</strong> Payment gateway integration and order dispatch are strictly disabled pending production database and merchant credential configuration. No payment cards or personal information will be stored.' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:36px;" class="checkout-grid-wrap">' +
        '<div>' +
          '<h3 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 20px;">Shipping & Contact Details</h3>' +
          '<form id="demo-checkout-form" onsubmit="return false;" style="display:flex;flex-direction:column;gap:16px;">' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
              '<div>' +
                '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">First Name *</label>' +
                '<input type="text" placeholder="Abdul" required style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;">' +
              '</div>' +
              '<div>' +
                '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">Last Name *</label>' +
                '<input type="text" placeholder="Rehman" required style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;">' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">Phone / Mobile * (for delivery SMS)</label>' +
              '<input type="tel" placeholder="+92 300 1234567" required style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;">' +
            '</div>' +
            '<div>' +
              '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">Delivery Address *</label>' +
              '<input type="text" placeholder="House/Flat #, Street, Area" required style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;">' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
              '<div>' +
                '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">City *</label>' +
                '<input type="text" placeholder="Lahore / Karachi / Islamabad" required style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;">' +
              '</div>' +
              '<div>' +
                '<label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#334155;">Country</label>' +
                '<input type="text" value="Pakistan" readonly style="width:100%;padding:10px 12px;border:1px solid #e2e8f0;background:#f1f5f9;border-radius:4px;font-size:14px;color:#64748b;">' +
              '</div>' +
            '</div>' +
          '</form>' +
        '</div>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;height:fit-content;">' +
          '<h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 16px;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">Your Order</h3>' +
          '<div style="margin-bottom:16px;">' + orderItems + '</div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;color:#475569;">' +
            '<span>Subtotal</span>' +
            '<span style="font-weight:600;color:#0f172a;">' + formatPKR(totalAmount) + '</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:14px;font-size:14px;color:#475569;">' +
            '<span>Nationwide Shipping</span>' +
            '<span style="font-weight:600;color:#16a34a;">FREE</span>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;padding:14px 0;border-top:2px solid #e2e8f0;border-bottom:2px solid #e2e8f0;margin-bottom:20px;font-size:18px;font-weight:700;color:#0f172a;">' +
            '<span>Total</span>' +
            '<span style="color:#b91c1c;">' + formatPKR(totalAmount) + '</span>' +
          '</div>' +
          '<div style="margin-bottom:20px;padding:12px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">' +
            '<div style="font-weight:600;font-size:13px;color:#0f172a;margin-bottom:4px;">Cash on Delivery (Demo)</div>' +
            '<div style="font-size:12px;color:#64748b;">Pay upon receiving your official ESTA appliance inspection.</div>' +
          '</div>' +
          '<button id="demo-place-order-btn" style="width:100%;background:#94a3b8;color:#fff;padding:14px;border:none;border-radius:4px;font-weight:700;font-size:15px;cursor:not-allowed;" title="Disabled in demonstration mode">Place Order (Demo Disabled)</button>' +
          '<div style="font-size:12px;color:#64748b;text-align:center;margin-top:12px;">' +
            'Production checkout requires active payment gateway.' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Event Delegation for All Interactions
  document.addEventListener('click', function(e) {
    // 1. Add to cart button clicks
    var atcBtn = e.target.closest('.add_to_cart_button, .add-to-cart-loop, .single_add_to_cart_button');
    if (atcBtn) {
      e.preventDefault();
      e.stopPropagation();
      var pid = atcBtn.getAttribute('data-product_id');
      var qtyInput = document.querySelector('input.qty');
      var qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
      if (!pid) {
        var card = atcBtn.closest('[data-id]');
        if (card) pid = card.getAttribute('data-id');
      }
      if (pid) addToCart(pid, qty);
      return;
    }

    // 2. Cart drawer opener
    var opener = e.target.closest('.cart-widget-opener, .wd-header-cart');
    if (opener && !e.target.closest('a[href="/checkout/"]')) {
      e.preventDefault();
      openSideCart();
      return;
    }

    // 3. Close cart drawer
    var closer = e.target.closest('.close-side-widget, .wd-close-side');
    if (closer) {
      e.preventDefault();
      closeSideCart();
      return;
    }

    // 4. Remove item from mini-cart
    var removeMini = e.target.closest('.remove_from_cart_button');
    if (removeMini) {
      e.preventDefault();
      var rId = removeMini.getAttribute('data-id') || removeMini.getAttribute('data-product_id');
      if (rId) removeFromCart(rId);
      return;
    }

    // 5. Quantity plus/minus in mini-cart
    var qMinus = e.target.closest('.mini-qty-minus, .page-qty-minus');
    if (qMinus) {
      e.preventDefault();
      var idM = qMinus.getAttribute('data-id');
      if (idM) updateQuantity(idM, -1);
      return;
    }
    var qPlus = e.target.closest('.mini-qty-plus, .page-qty-plus');
    if (qPlus) {
      e.preventDefault();
      var idP = qPlus.getAttribute('data-id');
      if (idP) updateQuantity(idP, 1);
      return;
    }

    // 6. Remove item from dedicated cart page
    var removePage = e.target.closest('.remove-cart-item');
    if (removePage) {
      e.preventDefault();
      var rpId = removePage.getAttribute('data-id');
      if (rpId) removeFromCart(rpId);
      return;
    }

    // 7. Clear cart button
    var clearBtn = e.target.closest('#clear-demo-cart');
    if (clearBtn) {
      e.preventDefault();
      saveCart([]);
      return;
    }

    // 8. PDP quantity buttons
    var pdpMinus = e.target.closest('.qty-btn.minus');
    if (pdpMinus) {
      e.preventDefault();
      var inp = pdpMinus.parentElement.querySelector('input.qty');
      if (inp) {
        var v = Math.max(1, (parseInt(inp.value, 10) || 1) - 1);
        inp.value = v;
      }
      return;
    }
    var pdpPlus = e.target.closest('.qty-btn.plus');
    if (pdpPlus) {
      e.preventDefault();
      var inpP = pdpPlus.parentElement.querySelector('input.qty');
      if (inpP) {
        var vP = (parseInt(inpP.value, 10) || 1) + 1;
        inpP.value = vP;
      }
      return;
    }
  });

  // Live Search Autocomplete Listener
  function initSearch() {
    var searchInputs = document.querySelectorAll('.woodmart-ajax-search input.s');
    searchInputs.forEach(function(input) {
      var debounceTimer;
      input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        var q = (input.value || '').trim().toLowerCase();
        var form = input.closest('.wd-search-form');
        var resultsWrapper = form ? form.querySelector('.wd-search-results .wd-scroll-content') : null;
        if (!resultsWrapper) return;

        if (q.length < 2) {
          resultsWrapper.innerHTML = '';
          return;
        }

        debounceTimer = setTimeout(function() {
          var matches = PRODUCTS.filter(function(p) {
            return p.name.toLowerCase().indexOf(q) !== -1 ||
                   p.sku.toLowerCase().indexOf(q) !== -1 ||
                   p.category.toLowerCase().indexOf(q) !== -1;
          }).slice(0, 8);

          if (matches.length === 0) {
            resultsWrapper.innerHTML = '<div style="padding:16px;text-align:center;color:#64748b;font-size:13px;">No matching ESTA appliances found.</div>';
          } else {
            var html = '<div style="padding:8px 0;">';
            matches.forEach(function(p) {
              html += 
                '<a href="' + p.url + '" style="display:flex;align-items:center;gap:12px;padding:8px 16px;text-decoration:none;border-bottom:1px solid #f1f5f9;color:#0f172a;">' +
                  '<img src="' + p.image + '" width="40" height="40" style="object-fit:contain;border-radius:4px;background:#fff;border:1px solid #e2e8f0;" alt="' + p.name + '">' +
                  '<div style="flex:1;min-width:0;">' +
                    '<div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + p.name + '</div>' +
                    '<div style="font-size:12px;color:#b91c1c;font-weight:700;">' + p.price + '</div>' +
                  '</div>' +
                '</a>';
            });
            html += '</div>';
            resultsWrapper.innerHTML = html;
          }
        }, 200);
      });
    });
  }

  // Initialize on DOMContentLoaded or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateUI();
      initSearch();
    });
  } else {
    updateUI();
    initSearch();
  }

  // Expose for testing if needed
  window.ESTA_COMMERCE = {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQuantity: updateQuantity,
    products: PRODUCTS
  };
})();
