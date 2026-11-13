/* ============================================================
   TechPoint — تشغيل المتجر
   بيملا البيانات من data.js، وبيبني الهيدر والفوتر والسلة،
   وبيشغّل الفلاتر وصفحة المنتج والبحث.
   ============================================================ */
(function () {
  "use strict";

  var D = window.SHOP;
  var PRODUCTS = window.PRODUCTS || [];
  if (!D) return;

  /* ---------------- أدوات ---------------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };
  var num = function (n) { return new Intl.NumberFormat("en-US").format(n); };
  var money = function (n) { return num(n) + " " + D.currency; };
  var catName = function (id) {
    var c = D.categories.filter(function (x) { return x.id === id; })[0];
    return c ? c.name : "منتجات";
  };
  var byId = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var normalize = function (s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[\u064B-\u0652]/g, "")
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/\s+/g, " ")
      .trim();
  };
  var params = function () { return new URLSearchParams(window.location.search); };

  var ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    cart: '<path d="M3 4h2l2.3 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
    phone: '<path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13 11 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1 1 0 0 0-.8-1l-4-1a1 1 0 0 0-1 .3l-1.5 1.5a15 15 0 0 1-6-6L9.5 9a1 1 0 0 0 .3-1l-1-4a1 1 0 0 0-1-.8Z"/>',
    pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    truck: '<path d="M3 6h11v11H3z"/><path d="M14 9h4l3 3v5h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield: '<path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    cash: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
    headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="13" width="4.5" height="7" rx="2"/><rect x="17" y="13" width="4.5" height="7" rx="2"/><path d="M20 20v1a2 2 0 0 1-2 2h-3"/>',
    star: '<path d="M12 3.6l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8L12 3.6Z"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
    check: '<path d="m5 13 4 4L19 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 6"/><path d="M20 4v7h-7"/>',
    whatsapp: ''
  };

  function icon(name, cls) {
    if (name === "whatsapp") {
      return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : "") +
        '><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.7-5.8c-.3-.1-1.5-.7-1.7-.8-.3-.1-.5-.1-.7.1l-.9 1c-.1.2-.3.2-.6.1a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.8c-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-1.9c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.8.4-.3.3-.9 1-.9 2.3 0 1.4 1 2.7 1.1 2.9.1.2 1.9 3 4.6 4.2.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : "") + ">" + (ICONS[name] || "") + "</svg>";
  }

  function stars(rating) {
    var out = '<span class="stars" aria-label="تقييم ' + rating + ' من 5">';
    for (var i = 1; i <= 5; i++) {
      out += '<svg viewBox="0 0 24 24" fill="' + (i <= Math.round(rating) ? "currentColor" : "none") +
        '" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' + ICONS.star + "</svg>";
    }
    return out + "</span>";
  }

  var brandMark = function () {
    var b = D.brand;
    if (b.logo) {
      return '<span class="brand-mark brand-mark--img" aria-hidden="true"><img src="' + esc(b.logo) + '" alt=""></span>';
    }
    return '<span class="brand-mark" aria-hidden="true">' + esc(b.logoText) + "</span>";
  };

  var waLink = function (text) {
    return "https://wa.me/" + D.brand.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  };

  /* ---------------- السلة ---------------- */
  var CART_KEY = "techpoint_cart_v1";
  var cart = loadCart();

  function loadCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw
        .filter(function (it) { return it && byId(it.id) && Number(it.qty) > 0; })
        .map(function (it) { return { id: it.id, qty: Math.min(99, Math.round(Number(it.qty))) }; });
    } catch (e) { return []; }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount() {
    return cart.reduce(function (s, it) { return s + it.qty; }, 0);
  }
  function cartTotal() {
    return cart.reduce(function (s, it) {
      var p = byId(it.id);
      return s + (p ? p.price * it.qty : 0);
    }, 0);
  }
  function addToCart(id, qty) {
    var p = byId(id);
    if (!p) return;
    if (p.stock === false) { toast("المنتج ده نافد حالياً"); return; }
    qty = Math.max(1, Math.round(qty || 1));
    var line = cart.filter(function (it) { return it.id === id; })[0];
    if (line) line.qty = Math.min(99, line.qty + qty);
    else cart.push({ id: id, qty: qty });
    saveCart();
    renderCart();
    toast("تمت الإضافة للسلة");
  }
  function setQty(id, qty) {
    qty = Math.round(qty);
    if (qty <= 0) { cart = cart.filter(function (it) { return it.id !== id; }); }
    else {
      var line = cart.filter(function (it) { return it.id === id; })[0];
      if (line) line.qty = Math.min(99, qty);
    }
    saveCart();
    renderCart();
  }

  function renderCart() {
    var count = cartCount();
    var badges = $$(".cart-badge");
    badges.forEach(function (b) {
      b.textContent = count;
      b.setAttribute("data-count", count);
    });
    var countText = $("#cartCountText");
    if (countText) countText.textContent = count ? count + " منتج" : "فاضية";

    var host = $("#cartItems");
    if (!host) return;

    if (!cart.length) {
      host.innerHTML =
        '<div class="cart-empty"><div class="ce-icon" aria-hidden="true">🛒</div>' +
        "<h3>السلة فاضية</h3><p>لسه مختارتش حاجة. ابدأ من الأكثر طلباً أو دوّر على جهازك.</p>" +
        '<a class="btn btn-primary" href="shop.html">تسوّق دلوقتي</a></div>';
    } else {
      host.innerHTML = cart.map(function (it) {
        var p = byId(it.id);
        if (!p) return "";
        return '<div class="cart-item" data-id="' + esc(p.id) + '">' +
          '<a href="product.html?id=' + encodeURIComponent(p.id) + '">' +
            (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">' : '<img alt="" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E">') +
          "</a>" +
          '<div><div class="ci-name"><a href="product.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.name) + "</a></div>" +
            '<div class="ci-meta">' + esc(p.brand) + " · " + (p.condition === "new" ? "جديد" : "مستعمل") + "</div>" +
            '<div class="ci-qty"><button type="button" data-cart-dec aria-label="تقليل">' + icon("minus") + "</button>" +
            "<span>" + it.qty + "</span>" +
            '<button type="button" data-cart-inc aria-label="زيادة">' + icon("plus") + "</button></div>" +
          "</div>" +
          '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">' +
            '<button type="button" class="ci-remove" data-cart-remove aria-label="احذف من السلة">' + icon("trash") + "</button>" +
            '<span class="ci-price">' + money(p.price * it.qty) + "</span>" +
          "</div>" +
        "</div>";
      }).join("");
    }

    var sub = $("#cartSubtotal");
    if (sub) sub.textContent = money(cartTotal());
    var foot = $("#cartFoot");
    if (foot) foot.hidden = !cart.length;
  }

  function checkoutMessage() {
    var lines = cart.map(function (it) {
      var p = byId(it.id);
      return "• " + p.name + " × " + it.qty + " — " + money(p.price * it.qty);
    });
    return "مرحباً " + D.brand.nameAr + " 👋\nعايز أطلب:\n" + lines.join("\n") +
      "\n\nالإجمالي المبدئي: " + money(cartTotal()) +
      "\n\nالاسم:\nرقم الموبايل:\nالعنوان:\nالمحافظة:";
  }

  /* ---------------- الهيدر والفوتر ---------------- */
  function navHTML() {
    var items = D.nav.map(function (n) {
      return '<a class="nav-link" href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
    });
    var cats = D.categories.map(function (c) {
      return '<a href="shop.html?cat=' + encodeURIComponent(c.id) + '">' + esc(c.name) +
        '<span class="count">' + PRODUCTS.filter(function (p) { return p.category === c.id; }).length + "</span></a>";
    }).join("");
    items.push(
      '<div class="nav-drop"><button type="button" class="nav-link" aria-haspopup="true">الأقسام ' + icon("chev") + "</button>" +
      '<div class="nav-menu">' + cats + "</div></div>"
    );
    return items.join("");
  }

  function renderShell() {
    var A = D.brand;
    var headerHost = document.getElementById("siteHeader");
    if (headerHost) {
      headerHost.innerHTML =
        '<div class="topbar"><div class="wrap topbar-inner">' +
          '<p class="topbar-note">' + icon("bolt") + " <span>" + esc(D.announcements[0]) + "</span></p>" +
          '<div class="topbar-links">' +
            '<a href="tel:' + esc(A.phone) + '">' + icon("phone") + " " + esc(A.phoneDisplay) + "</a>" +
            '<a href="' + waLink("") + '" target="_blank" rel="noopener">' + icon("whatsapp") + " واتساب</a>" +
          "</div>" +
        "</div></div>" +
        '<header class="site-header"><div class="wrap header-inner">' +
          '<button type="button" class="icon-btn burger" id="burger" aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobileNav">' + icon("menu") + "</button>" +
          '<a class="brand" href="index.html" aria-label="' + esc(A.name) + ' — الرئيسية">' +
            brandMark() +
            '<span class="brand-text"><strong>' + esc(A.name) + "</strong><small>" + esc(A.kicker) + "</small></span>" +
          "</a>" +
          '<nav class="nav" aria-label="التنقل الرئيسي">' + navHTML() + "</nav>" +
          '<form class="header-search" action="search.html" role="search">' +
            '<input type="search" name="q" placeholder="دوّر على لابتوب، كارت شاشة…" aria-label="ابحث في المتجر">' +
            '<button type="submit" aria-label="ابحث">' + icon("search") + "</button>" +
          "</form>" +
          '<div class="header-actions">' +
            '<a class="icon-btn" href="tel:' + esc(A.phone) + '" aria-label="اتصل بينا">' + icon("phone") + "</a>" +
            '<button type="button" class="icon-btn" id="cartBtn" aria-label="سلة التسوق" aria-haspopup="dialog">' + icon("cart") +
              '<span class="cart-badge" data-count="0"></span></button>' +
          "</div>" +
        "</div></header>";
    }

    /* قائمة الموبايل + السلة */
    var mobile = $("#mobileNav");
    if (!mobile) {
      var mlinks = D.nav.map(function (n) {
        return '<a class="m-link" href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
      }).join("");
      var mcats = D.categories.map(function (c) {
        return '<a href="shop.html?cat=' + encodeURIComponent(c.id) + '">' + esc(c.name) + " <small>· " +
          PRODUCTS.filter(function (p) { return p.category === c.id; }).length + "</small></a>";
      }).join("");
      document.body.insertAdjacentHTML("beforeend",
        '<div class="drawer-overlay" id="overlay"></div>' +
        '<aside class="mobile-nav" id="mobileNav" aria-label="قائمة الموبايل" aria-hidden="true">' +
          '<div class="filter-head"><a class="brand" href="index.html">' +
            brandMark() +
            '<span class="brand-text"><strong>' + esc(A.name) + "</strong><small>" + esc(A.kicker) + "</small></span></a>" +
            '<button type="button" class="icon-btn" data-close-panel aria-label="إغلاق القائمة">' + icon("close") + "</button></div>" +
          mlinks +
          '<div class="filter-group" style="border-top:0"><h3>الأقسام</h3><div class="m-sub">' + mcats + "</div></div>" +
          '<div class="m-foot">' +
            '<a class="btn btn-primary btn-block" href="' + waLink("مرحباً " + A.nameAr + "، عايز أستفسر عن جهاز") + '" target="_blank" rel="noopener">' + icon("whatsapp") + " كلّمنا واتساب</a>" +
            '<a class="btn btn-outline btn-block" href="tel:' + esc(A.phone) + '">' + icon("phone") + " " + esc(A.phoneDisplay) + "</a>" +
          "</div>" +
        "</aside>" +
        '<aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true">' +
          '<div class="drawer-head"><div><h2 id="cartTitle">سلة التسوق</h2><span class="count" id="cartCountText">فاضية</span></div>' +
            '<button type="button" class="icon-btn" data-close-panel aria-label="إغلاق السلة">' + icon("close") + "</button></div>" +
          '<div class="cart-items" id="cartItems"></div>' +
          '<div class="drawer-foot" id="cartFoot" hidden>' +
            '<div class="subtotal-row"><span>الإجمالي المبدئي</span><strong id="cartSubtotal">0</strong></div>' +
            '<div class="note">' + icon("truck") + " <span>" + esc(D.shippingNote) + "</span></div>" +
            '<button type="button" class="btn btn-wa btn-block" id="checkoutBtn">' + icon("whatsapp") + " اطلب على واتساب</button>" +
            '<button type="button" class="link" data-close-panel>متابعة التسوق</button>' +
          "</div>" +
        "</aside>" +
        '<div class="toast" id="toast" role="status" aria-live="polite"></div>' +
        '<button type="button" class="to-top" id="toTop" aria-label="ارجع لفوق">' + icon("arrowUp") + "</button>"
      );
    }

    var footerHost = document.getElementById("siteFooter");
    if (footerHost) {
      var fcats = D.categories.map(function (c) {
        return '<li><a href="shop.html?cat=' + encodeURIComponent(c.id) + '">' + esc(c.name) + "</a></li>";
      }).join("");
      var social = A.social.map(function (s) {
        return '<a href="' + esc(s.url) + '" aria-label="' + esc(s.name) + '" title="' + esc(s.name) + '">' + esc(s.icon) + "</a>";
      }).join("");
      footerHost.innerHTML =
        '<footer class="site-footer"><div class="wrap">' +
          '<div class="footer-grid">' +
            '<div class="footer-about">' +
              '<a class="brand" href="index.html">' + brandMark() +
                '<span class="brand-text"><strong>' + esc(A.name) + "</strong><small>" + esc(A.kicker) + "</small></span></a>" +
              "<p>" + esc(A.tagline) + "</p>" +
              '<div class="footer-social">' + social + "</div>" +
            "</div>" +
            '<div class="footer-col"><h3>الأقسام</h3><ul>' + fcats + "</ul></div>" +
            '<div class="footer-col"><h3>روابط سريعة</h3><ul>' +
              '<li><a href="shop.html">كل المنتجات</a></li>' +
              '<li><a href="shop.html?deal=1">العروض والخصومات</a></li>' +
              '<li><a href="search.html">ابحث عن جهاز</a></li>' +
              '<li><a href="shop.html?cond=new">الجديد عندنا</a></li>' +
              '<li><a href="index.html#faq">أسئلة شائعة</a></li>' +
            "</ul></div>" +
            '<div class="footer-col"><h3>تواصل معانا</h3><ul class="footer-contact">' +
              '<li>' + icon("pin") + "<span>" + esc(A.address) + "</span></li>" +
              '<li>' + icon("phone") + '<span><a href="tel:' + esc(A.phone) + '"><strong>' + esc(A.phoneDisplay) + "</strong></a></span></li>" +
              '<li>' + icon("mail") + '<span><a href="mailto:' + esc(A.email) + '">' + esc(A.email) + "</a></span></li>" +
              '<li>' + icon("clock") + "<span>" + esc(A.hours) + "</span></li>" +
            "</ul></div>" +
          "</div>" +
          '<div class="footer-bottom"><span>© <span id="year"></span> ' + esc(A.copyright) + " — كل الحقوق محفوظة.</span>" +
            '<div class="pay-methods"><span>دفع عند الاستلام</span><span>فيزا / ماستر</span><span>محافظ إلكترونية</span></div>' +
          "</div>" +
        "</div></footer>";
    }

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* تنشيط لينك الصفحة الحالية */
    var herePath = window.location.pathname.split("/").pop() || "index.html";
    var hereQuery = new URLSearchParams(window.location.search);
    $$(".nav-link[href]").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var parts = href.split("?");
      if (parts[0] !== herePath) return;
      if (!parts[1]) {
        if (!window.location.search) a.classList.add("is-active");
        return;
      }
      var q = new URLSearchParams(parts[1]);
      var same = true;
      q.forEach(function (v, k) { if (hereQuery.get(k) !== v) same = false; });
      if (same) a.classList.add("is-active");
    });

    renderCart();
    bindShell();
  }

  /* ---------------- فتح وقفل اللوحات ---------------- */
  function openPanel(el) {
    if (!el) return;
    closePanels();
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    var ov = $("#overlay");
    if (ov) ov.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var first = el.querySelector("[data-close-panel]");
    if (first) first.focus({ preventScroll: true });
  }
  function closePanels() {
    $$(".cart-drawer.is-open, .mobile-nav.is-open, .filters.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
    });
    var ov = $("#overlay");
    if (ov) ov.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function openCart() {
    var d = $("#cartDrawer");
    openPanel(d);
  }

  function bindShell() {
    var cartBtn = $("#cartBtn");
    if (cartBtn) cartBtn.addEventListener("click", openCart);
    var burger = $("#burger");
    if (burger) burger.addEventListener("click", function () {
      var nav = $("#mobileNav");
      openPanel(nav);
    });
    var overlay = $("#overlay");
    if (overlay) overlay.addEventListener("click", closePanels);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanels();
    });

    document.addEventListener("click", function (e) {
      var closer = e.target.closest("[data-close-panel]");
      if (closer) { closePanels(); return; }
      if (e.target.closest("#mobileNav a")) closePanels();
      var add = e.target.closest("[data-add]");
      if (add) {
        addToCart(add.getAttribute("data-add"), 1);
      }
    });

    var checkout = $("#checkoutBtn");
    if (checkout) checkout.addEventListener("click", function () {
      if (!cart.length) return;
      window.open(waLink(checkoutMessage()), "_blank", "noopener");
    });

    var items = $("#cartItems");
    if (items) items.addEventListener("click", function (e) {
      var row = e.target.closest(".cart-item");
      if (!row) return;
      var id = row.getAttribute("data-id");
      var line = cart.filter(function (it) { return it.id === id; })[0];
      if (!line) return;
      if (e.target.closest("[data-cart-inc]")) setQty(id, line.qty + 1);
      if (e.target.closest("[data-cart-dec]")) setQty(id, line.qty - 1);
      if (e.target.closest("[data-cart-remove]")) setQty(id, 0);
    });

    /* رجوع لفوق + ظل الهيدر */
    var toTop = $("#toTop");
    var header = $(".site-header");
    var onScroll = function () {
      if (toTop) toTop.classList.toggle("is-show", window.scrollY > 640);
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* توست */
    var toastTimer;
    window.__toast = function (msg) {
      var t = $("#toast");
      if (!t) return;
      t.innerHTML = icon("check") + "<span>" + esc(msg) + "</span>";
      t.classList.add("is-show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { t.classList.remove("is-show"); }, 2400);
    };

    /* مراقبة العناصر اللي بتظهر */
    if ("IntersectionObserver" in window) {
      window.__revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            window.__revealObserver.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    }
    revealAll();
  }

  function toast(msg) {
    if (window.__toast) window.__toast(msg);
  }

  function revealAll() {
    $$(".reveal:not(.is-in)").forEach(function (el) {
      if (window.__revealObserver) window.__revealObserver.observe(el);
      else el.classList.add("is-in");
    });
  }

  /* ---------------- كارت المنتج ---------------- */
  function card(p) {
    var off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    var badge = "";
    if (off >= 5) badge = '<span class="pc-badge pc-badge--sale">خصم ' + off + "%</span>";
    else if (p.badge) badge = '<span class="pc-badge' + (p.badge === "جديد" || p.badge === "جديد الوصول" ? " pc-badge--new" : "") + '">' + esc(p.badge) + "</span>";
    var href = "product.html?id=" + encodeURIComponent(p.id);
    return '<article class="product-card reveal">' +
      '<a class="pc-media" href="' + href + '" aria-label="' + esc(p.name) + '">' +
        (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="400" height="320">' : '<span class="pc-ph" aria-hidden="true">💻</span>') +
        badge +
        '<span class="pc-cond' + (p.condition === "new" ? " is-new" : "") + '">' + (p.condition === "new" ? "جديد" : "مستعمل") + "</span>" +
        (p.stock === false ? '<span class="pc-oos">نفدت الكمية</span>' : "") +
      "</a>" +
      '<div class="pc-body">' +
        '<span class="pc-brand">' + esc(p.brand) + "</span>" +
        '<h3 class="pc-title"><a href="' + href + '">' + esc(p.name) + "</a></h3>" +
        '<p class="pc-short">' + esc(p.short) + "</p>" +
        '<div class="pc-price"><strong>' + num(p.price) + '</strong><span class="cur">' + D.currency + "</span>" +
          (p.oldPrice ? "<s>" + num(p.oldPrice) + "</s>" : "") + "</div>" +
        '<div class="pc-actions">' +
          '<button type="button" class="btn btn-primary" data-add="' + esc(p.id) + '"' + (p.stock === false ? " disabled" : "") + ">" +
            (p.stock === false ? "غير متوفر" : icon("cart") + " أضف للسلة") + "</button>" +
          '<a class="icon-btn" href="' + href + '" aria-label="تفاصيل ' + esc(p.name) + '">' + icon("eye") + "</a>" +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function fill(sel, html) {
    var el = $(sel);
    if (el) el.innerHTML = html;
    revealAll();
  }

  /* ============================================================
     الرئيسية
     ============================================================ */
  function initHome() {
    var host = $("#heroHost");
    if (host) {
      var H = D.hero;
      host.innerHTML = '<div class="wrap hero-inner">' +
        '<div class="hero-copy reveal">' +
          '<span class="hero-eyebrow"><span class="dot"></span>' + esc(H.eyebrow) + "</span>" +
          "<h1>" + esc(H.title) + " <em>" + esc(H.accent) + "</em></h1>" +
          '<p class="hero-lead">' + esc(H.lead) + "</p>" +
          '<div class="hero-cta">' +
            '<a class="btn btn-primary btn-lg" href="' + esc(H.primaryCta.href) + '">' + esc(H.primaryCta.label) + " " + icon("arrowLeft") + "</a>" +
            '<a class="btn btn-outline btn-lg" href="' + esc(H.secondaryCta.href) + '">' + esc(H.secondaryCta.label) + "</a>" +
          "</div>" +
          '<dl class="hero-stats">' + H.stats.map(function (s) {
            return "<div><dt>" + esc(s.value) + "</dt><dd>" + esc(s.label) + "</dd></div>";
          }).join("") + "</dl>" +
        "</div>" +
        '<div class="hero-visual reveal">' +
          '<div class="hero-shot"><img src="' + esc(H.image) + '" alt="أجهزة كمبيوتر ولابتوب" fetchpriority="high"></div>' +
          '<span class="hero-chip">' + icon("shield") + " كل جهاز متفحّص قبل التسليم</span>" +
          '<div class="hero-float">' +
            '<img src="' + esc(H.floatCard.image) + '" alt="">' +
            '<div class="hf-body"><strong>' + esc(H.floatCard.title) + "</strong><small>" + esc(H.floatCard.note) + "</small></div>" +
            '<div class="hf-price">' + num(H.floatCard.price) + "<span>" + D.currency + "</span></div>" +
          "</div>" +
        "</div>" +
      "</div>";
    }

    fill("#featureGrid", D.features.map(function (f) {
      return '<article class="feature reveal"><span class="feature-icon">' + icon(f.icon) + "</span>" +
        "<div><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></div></article>";
    }).join(""));

    fill("#catGrid", D.categories.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return '<a class="cat-tile reveal" href="shop.html?cat=' + encodeURIComponent(c.id) + '">' +
        '<span class="cat-media">' +
          (c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" loading="lazy">' : "") +
        "</span>" +
        '<span class="cat-body">' +
          '<span class="cat-text"><strong>' + esc(c.name) + "</strong><small>" + n + " منتج · " + esc(c.desc) + "</small></span>" +
          '<span class="cat-arrow">' + icon("arrowLeft") + "</span>" +
        "</span></a>";
    }).join(""));

    var tabs = [{ id: "", label: "الكل" }].concat(
      D.categories.filter(function (c) { return ["laptops", "desktops", "gpus", "monitors", "gaming"].indexOf(c.id) > -1; })
        .map(function (c) { return { id: c.id, label: c.name }; })
    );
    var tabsHost = $("#featuredTabs");
    if (tabsHost) {
      tabsHost.innerHTML = tabs.map(function (t, i) {
        return '<button type="button" class="tab-btn' + (i === 0 ? " is-active" : "") + '" data-tab="' + t.id + '">' + esc(t.label) + "</button>";
      }).join("");
      var renderFeatured = function (cat) {
        var list = PRODUCTS.filter(function (p) { return p.featured && (!cat || p.category === cat); });
        if (!list.length) list = PRODUCTS.filter(function (p) { return !cat || p.category === cat; });
        fill("#featuredGrid", list.slice(0, 8).map(card).join(""));
      };
      renderFeatured("");
      tabsHost.addEventListener("click", function (e) {
        var btn = e.target.closest(".tab-btn");
        if (!btn) return;
        $$(".tab-btn", tabsHost).forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        renderFeatured(btn.getAttribute("data-tab"));
      });
    }

    var fresh = PRODUCTS.filter(function (p) {
      return p.condition === "new" || p.badge === "جديد الوصول";
    }).slice(0, 4);
    fill("#newGrid", fresh.map(card).join(""));

    var dealHost = $("#dealHost");
    if (dealHost) {
      var dl = D.deal;
      var off = Math.round((1 - dl.price / dl.oldPrice) * 100);
      dealHost.innerHTML = '<div class="deal reveal">' +
        '<div class="deal-media"><img src="' + esc(dl.image) + '" alt="' + esc(dl.title) + '" loading="lazy"></div>' +
        '<div class="deal-body">' +
          '<span class="deal-kicker">' + esc(dl.kicker) + "</span>" +
          "<h2>" + esc(dl.title) + "</h2>" +
          "<p>" + esc(dl.text) + "</p>" +
          '<div class="deal-price"><strong>' + num(dl.price) + " " + D.currency + "</strong><s>" + num(dl.oldPrice) + "</s>" +
            '<span class="off">وفّر ' + off + "%</span></div>" +
          '<div class="deal-count"><span>' + icon("check") + " متجرّبة قبل التسليم</span><span>" + icon("truck") + " توصيل خلال ٢٤ ساعة</span></div>" +
          '<a class="btn btn-primary btn-lg" href="' + esc(dl.cta.href) + '">' + esc(dl.cta.label) + " " + icon("arrowLeft") + "</a>" +
        "</div>" +
      "</div>";
    }

    fill("#brandRow", D.brands.map(function (b) {
      return '<a class="brand-pill" href="shop.html?q=' + encodeURIComponent(b) + '">' + esc(b) + "</a>";
    }).join(""));

    fill("#reviewGrid", D.reviews.map(function (r) {
      return '<article class="review reveal">' + stars(r.rating) +
        "<p>" + esc(r.text) + "</p>" +
        '<div class="review-by"><span class="avatar">' + esc(r.initials) + "</span>" +
          "<div><strong>" + esc(r.name) + "</strong><small>عميل مشترى موثّق</small></div></div>" +
      "</article>";
    }).join(""));

    fill("#faqList", D.faq.map(function (f) {
      return '<details class="faq-item"><summary>' + esc(f.q) + '<span class="plus">' + icon("plus") + "</span></summary>" +
        '<div class="faq-a">' + esc(f.a) + "</div></details>";
    }).join(""));

    var cta = $("#ctaHost");
    if (cta) {
      cta.innerHTML = '<div class="wrap"><div class="cta-inner reveal">' +
        "<div><h2>مش لاقي اللي بتدوّر عليه؟</h2>" +
        "<p>ابعتلنا الموديل والميزانية على الواتساب وهنجهّزلك العرض الأنسب.</p></div>" +
        '<div class="cta-actions">' +
          '<a class="btn btn-wa" href="' + waLink("مرحباً " + D.brand.nameAr + "، عايز مساعدة أختار جهاز") + '" target="_blank" rel="noopener">' + icon("whatsapp") + " اسأل مهندس</a>" +
          '<a class="btn btn-outline" href="tel:' + esc(D.brand.phone) + '">' + icon("phone") + " " + esc(D.brand.phoneDisplay) + "</a>" +
        "</div></div></div>";
    }
    revealAll();
  }

  /* ============================================================
     المتجر / الأقسام
     ============================================================ */
  function initShop() {
    var grid = $("#shopGrid");
    if (!grid) return;
    var q0 = params();
    var state = {
      cat: q0.get("cat") || "",
      brands: q0.get("brand") ? q0.get("brand").split(",").filter(Boolean) : [],
      cond: q0.get("cond") ? q0.get("cond").split(",").filter(Boolean) : [],
      q: q0.get("q") || "",
      max: q0.get("max") ? Number(q0.get("max")) : 0,
      deal: q0.get("deal") === "1",
      sort: q0.get("sort") || "featured"
    };
    var PRICE_MAX = 22000;

    var brandCounts = {};
    PRODUCTS.forEach(function (p) { brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1; });
    var brandList = Object.keys(brandCounts).sort(function (a, b) { return brandCounts[b] - brandCounts[a]; });

    var filters = $("#filters");
    filters.innerHTML =
      '<div class="filter-head"><h2>الفلاتر</h2>' +
        '<button type="button" class="filter-reset" id="resetFilters">مسح الكل</button>' +
        '<button type="button" class="icon-btn filter-close" data-close-panel aria-label="إغلاق الفلاتر">' + icon("close") + "</button>" +
      "</div>" +
      '<div class="filter-group"><h3>القسم</h3><div class="filter-list">' +
        '<label class="filter-opt"><input type="radio" name="fcat" value=""> كل الأقسام <span class="count">' + PRODUCTS.length + "</span></label>" +
        D.categories.map(function (c) {
          return '<label class="filter-opt"><input type="radio" name="fcat" value="' + esc(c.id) + '">' + esc(c.name) +
            '<span class="count">' + PRODUCTS.filter(function (p) { return p.category === c.id; }).length + "</span></label>";
        }).join("") +
      "</div></div>" +
      '<div class="filter-group"><h3>الحالة</h3><div class="filter-list">' +
        '<label class="filter-opt"><input type="checkbox" data-cond="new"> جديد <span class="count">' +
          PRODUCTS.filter(function (p) { return p.condition === "new"; }).length + "</span></label>" +
        '<label class="filter-opt"><input type="checkbox" data-cond="used"> مستعمل <span class="count">' +
          PRODUCTS.filter(function (p) { return p.condition === "used"; }).length + "</span></label>" +
      "</div></div>" +
      '<div class="filter-group"><h3>الماركة</h3><div class="filter-list">' +
        brandList.map(function (b) {
          return '<label class="filter-opt"><input type="checkbox" data-brand="' + esc(b) + '">' + esc(b) +
            '<span class="count">' + brandCounts[b] + "</span></label>";
        }).join("") +
      "</div></div>" +
      '<div class="filter-group"><h3>أقصى سعر</h3><div class="range-wrap">' +
        '<output id="priceOut">حتى ' + money(PRICE_MAX) + "</output>" +
        '<input type="range" id="priceMax" min="1000" max="' + PRICE_MAX + '" step="500" value="' + PRICE_MAX + '">' +
      "</div></div>" +
      '<div class="filter-group"><label class="filter-opt"><input type="checkbox" id="dealOnly"> العروض والخصومات بس</label></div>' +
      '<button type="button" class="btn btn-primary btn-block" data-close-panel id="showResults">اعرض النتائج</button>';

    var sortSel = $("#shopSort");
    if (sortSel) sortSel.value = state.sort;
    syncFilterControls();
    renderShop();

    /* أحداث الفلاتر */
    filters.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "fcat") state.cat = t.value;
      else if (t.hasAttribute("data-cond")) {
        state.cond = toggleValue(state.cond, t.getAttribute("data-cond"), t.checked);
      } else if (t.hasAttribute("data-brand")) {
        state.brands = toggleValue(state.brands, t.getAttribute("data-brand"), t.checked);
      } else if (t.id === "dealOnly") {
        state.deal = t.checked;
      } else if (t.id === "priceMax") {
        state.max = Number(t.value);
      }
      renderShop();
    });
    filters.addEventListener("input", function (e) {
      if (e.target.id === "priceMax") {
        state.max = Number(e.target.value);
        $("#priceOut").textContent = "حتى " + money(state.max);
        renderShop();
      }
    });
    $("#resetFilters").addEventListener("click", resetFilters);
    if (sortSel) sortSel.addEventListener("change", function () {
      state.sort = sortSel.value;
      renderShop();
    });

    var ft = $("#filterToggle");
    if (ft) ft.addEventListener("click", function () { openPanel(filters); });

    function resetFilters() {
      state = { cat: "", brands: [], cond: [], q: "", max: 0, deal: false, sort: "featured" };
      if (sortSel) sortSel.value = "featured";
      syncFilterControls();
      renderShop();
    }

    function syncFilterControls() {
      $$('input[name="fcat"]', filters).forEach(function (r) { r.checked = r.value === state.cat; });
      $$("[data-brand]", filters).forEach(function (c) { c.checked = state.brands.indexOf(c.getAttribute("data-brand")) > -1; });
      $$("[data-cond]", filters).forEach(function (c) { c.checked = state.cond.indexOf(c.getAttribute("data-cond")) > -1; });
      var deal = $("#dealOnly");
      if (deal) deal.checked = state.deal;
      var pm = $("#priceMax");
      if (pm) pm.value = state.max || PRICE_MAX;
      var out = $("#priceOut");
      if (out) out.textContent = "حتى " + money(state.max || PRICE_MAX);
    }

    function baseList() {
      var qn = normalize(state.q);
      return PRODUCTS.filter(function (p) {
        if (state.cat && p.category !== state.cat) return false;
        if (state.brands.length && state.brands.indexOf(p.brand) === -1) return false;
        if (state.cond.length && state.cond.indexOf(p.condition) === -1) return false;
        if (state.deal && !p.oldPrice) return false;
        if (state.max && p.price > state.max) return false;
        if (qn) {
          var hay = normalize(p.name + " " + p.brand + " " + p.short + " " + (p.tags || []).join(" ") + " " + catName(p.category));
          if (hay.indexOf(qn) === -1) return false;
        }
        return true;
      });
    }

    function renderShop() {
      var list = baseList();
      var sort = state.sort;
      list = list.slice().sort(function (a, b) {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "new") {
          var an = a.condition === "new" ? 1 : 0, bn = b.condition === "new" ? 1 : 0;
          return bn - an || b.rating - a.rating;
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      });

      grid.innerHTML = list.map(card).join("");
      var empty = $("#shopEmpty");
      if (empty) {
        empty.innerHTML = list.length ? "" :
          '<div class="empty-state"><div class="es-icon" aria-hidden="true">🔍</div>' +
          "<h3>مفيش نتائج بالفلاتر دي</h3><p>جرّب تقلّل الفلاتر أو تمسح الكل وتبدأ من جديد.</p>" +
          '<button type="button" class="btn btn-primary" id="emptyReset">امسح الفلاتر</button></div>';
        var er = $("#emptyReset");
        if (er) er.addEventListener("click", resetFilters);
      }

      var count = $("#resultCount");
      if (count) count.innerHTML = "<strong>" + list.length + "</strong> منتج" + (state.q ? " لـ «" + esc(state.q) + "»" : "");
      var showBtn = $("#showResults");
      if (showBtn) showBtn.textContent = "اعرض " + list.length + " نتيجة";

      var title = $("#shopTitle"), sub = $("#shopSub");
      if (title) title.textContent = state.cat ? catName(state.cat) : (state.deal ? "العروض والخصومات" : "كل المنتجات");
      if (sub) {
        var c = D.categories.filter(function (x) { return x.id === state.cat; })[0];
        sub.textContent = c ? c.desc + " · اتفحّصت وتجرّبت قبل التسليم." :
          "لابتوبات وأجهزة مكتبية وكروت شاشة وشاشات — كلها بضمان مكتوب.";
      }
      if (title) document.title = (state.cat ? catName(state.cat) : "المتجر") + " — " + D.brand.name;

      /* شيبس الفلاتر */
      var chips = [];
      if (state.q) chips.push({ k: "q", label: "بحث: " + state.q });
      if (state.cat) chips.push({ k: "cat", label: catName(state.cat) });
      state.brands.forEach(function (b) { chips.push({ k: "brand", v: b, label: b }); });
      state.cond.forEach(function (c) { chips.push({ k: "cond", v: c, label: c === "new" ? "جديد" : "مستعمل" }); });
      if (state.deal) chips.push({ k: "deal", label: "عروض فقط" });
      if (state.max) chips.push({ k: "max", label: "حتى " + money(state.max) });
      var chipsHost = $("#activeChips");
      if (chipsHost) {
        chipsHost.innerHTML = chips.map(function (c) {
          return '<span class="chip">' + esc(c.label) +
            '<button type="button" data-chip="' + c.k + '" data-value="' + esc(c.v || "") + '" aria-label="شيل الفلتر">×</button></span>';
        }).join("") + (state.sort !== "featured" ? "" : "");
      }

      syncURL();
      revealAll();
    }

    function syncURL() {
      var p = new URLSearchParams();
      if (state.cat) p.set("cat", state.cat);
      if (state.q) p.set("q", state.q);
      if (state.brands.length) p.set("brand", state.brands.join(","));
      if (state.cond.length) p.set("cond", state.cond.join(","));
      if (state.deal) p.set("deal", "1");
      if (state.max) p.set("max", String(state.max));
      if (state.sort !== "featured") p.set("sort", state.sort);
      try {
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p.toString() : ""));
      } catch (e) {}
    }

    var chipsHost = $("#activeChips");
    if (chipsHost) chipsHost.addEventListener("click", function (e) {
      var b = e.target.closest("[data-chip]");
      if (!b) return;
      var k = b.getAttribute("data-chip");
      var v = b.getAttribute("data-value");
      if (k === "q") state.q = "";
      if (k === "cat") state.cat = "";
      if (k === "brand") state.brands = state.brands.filter(function (x) { return x !== v; });
      if (k === "cond") state.cond = state.cond.filter(function (x) { return x !== v; });
      if (k === "deal") state.deal = false;
      if (k === "max") state.max = 0;
      syncFilterControls();
      renderShop();
    });

    var empty = $("#shopEmpty");
    if (empty) empty.addEventListener("click", function (e) {
      if (e.target.id === "emptyReset") resetFilters();
    });

    revealAll();
  }

  function toggleValue(arr, value, on) {
    var out = arr.filter(function (x) { return x !== value; });
    if (on) out.push(value);
    return out;
  }

  /* ============================================================
     صفحة المنتج
     ============================================================ */
  function initProduct() {
    var root = $("#productRoot");
    if (!root) return;
    var id = params().get("id");
    var p = byId(id);

    if (!p) {
      root.innerHTML = '<div class="empty-state" style="margin-block:40px">' +
        '<div class="es-icon" aria-hidden="true">🧐</div><h3>المنتج مش موجود</h3>' +
        "<p>يمكن اللينك قديم أو المنتج اتشال من المتجر.</p>" +
        '<a class="btn btn-primary" href="shop.html">شوف كل المنتجات</a></div>';
      revealAll();
      return;
    }

    document.title = p.name + " — " + D.brand.name;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", p.name + " — " + p.short + " بسعر " + money(p.price) + " في " + D.brand.name + ".");

    var off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    var gallery = (p.gallery && p.gallery.length ? p.gallery : [p.image]).filter(Boolean);
    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 4);
    if (related.length < 4) {
      PRODUCTS.forEach(function (x) {
        if (related.length < 4 && x.id !== p.id && related.indexOf(x) === -1) related.push(x);
      });
    }

    root.innerHTML =
      '<div class="page-head"><div class="wrap">' +
        '<nav class="crumbs" aria-label="مسار التنقل"><a href="index.html">الرئيسية</a>' + icon("arrowLeft") +
          '<a href="shop.html">المتجر</a>' + icon("arrowLeft") +
          '<a href="shop.html?cat=' + encodeURIComponent(p.category) + '">' + esc(catName(p.category)) + "</a>" + icon("arrowLeft") +
          "<span>" + esc(p.name) + "</span></nav></div></div>" +
      '<div class="wrap">' +
        '<div class="product-layout">' +
          '<div class="gallery">' +
            '<div class="gallery-main">' +
              '<img id="galleryMain" src="' + esc(gallery[0]) + '" alt="' + esc(p.name) + '">' +
              '<span class="pc-cond' + (p.condition === "new" ? " is-new" : "") + '">' + (p.condition === "new" ? "جديد" : "مستعمل") + "</span>" +
            "</div>" +
            (gallery.length > 1 ? '<div class="gallery-thumbs" id="galleryThumbs">' + gallery.map(function (src, i) {
              return '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" data-src="' + esc(src) + '" aria-label="صورة ' + (i + 1) + '">' +
                '<img src="' + esc(src) + '" alt=""></button>';
            }).join("") + "</div>" : "") +
          "</div>" +
          '<div class="buybox">' +
            '<span class="pc-brand">' + esc(p.brand) + " · " + esc(catName(p.category)) + "</span>" +
            "<h1>" + esc(p.name) + "</h1>" +
            '<div class="rating-row">' + stars(p.rating) + "<strong>" + p.rating + "</strong>" +
              "<span>· " + p.reviews + " تقييم</span>" +
              '<a href="#reviews" data-scroll>شوف آراء العملاء</a></div>' +
            '<div class="price-block"><strong>' + num(p.price) + '</strong><span class="cur">' + D.currency + "</span>" +
              (p.oldPrice ? "<s>" + num(p.oldPrice) + " " + D.currency + "</s>" : "") +
              (off >= 5 ? '<span class="off">خصم ' + off + "%</span>" : "") + "</div>" +
            '<p class="p-short">' + esc(p.short) + "</p>" +
            '<div class="stock-line' + (p.stock === false ? " is-out" : "") + '"><span class="dot"></span>' +
              (p.stock === false ? "نفدت الكمية — كلّمنا نبلّغك لما يرجع" : "متوفر · جاهز للتسليم") + "</div>" +
            '<div class="buy-row">' +
              '<div class="qty" aria-label="الكمية">' +
                '<button type="button" id="qtyMinus" aria-label="تقليل الكمية">' + icon("minus") + "</button>" +
                '<input id="qtyInput" type="number" value="1" min="1" max="10" inputmode="numeric" aria-label="عدد القطع">' +
                '<button type="button" id="qtyPlus" aria-label="زيادة الكمية">' + icon("plus") + "</button>" +
              "</div>" +
              '<button type="button" class="btn btn-primary btn-lg" id="pAdd"' + (p.stock === false ? " disabled" : "") + ">" + icon("cart") + " أضف للسلة</button>" +
              '<a class="btn btn-wa btn-lg" href="' + waProduct(p) + '" target="_blank" rel="noopener">' + icon("whatsapp") + " اطلب واتساب</a>" +
            "</div>" +
            '<ul class="perks">' +
              "<li>" + icon("shield") + "<div><strong>ضمان مكتوب</strong>" + (p.condition === "new" ? "سنة ضمان كامل" : "3 شهور ضمان") + "</div></li>" +
              "<li>" + icon("truck") + "<div><strong>توصيل سريع</strong>القاهرة والجيزة في 24 ساعة</div></li>" +
              "<li>" + icon("cash") + "<div><strong>دفع عند الاستلام</strong>جرّب الجهاز قبل ما تدفع</div></li>" +
              "<li>" + icon("headset") + "<div><strong>دعم فني</strong>" + esc(D.brand.hours) + "</div></li>" +
            "</ul>" +
          "</div>" +
        "</div>" +

        '<div class="product-info" id="reviews">' +
          '<div class="info-tabs" role="tablist">' +
            '<button type="button" class="info-tab is-active" data-itab="desc">الوصف</button>' +
            '<button type="button" class="info-tab" data-itab="specs">المواصفات</button>' +
            '<button type="button" class="info-tab" data-itab="ship">الشحن والضمان</button>' +
          "</div>" +
          '<div class="info-panel is-active" id="panel-desc"><p>' + esc(p.desc) + "</p></div>" +
          '<div class="info-panel" id="panel-specs"><table class="spec-table"><tbody>' +
            Object.keys(p.specs || {}).map(function (k) {
              return "<tr><th>" + esc(k) + "</th><td>" + esc(p.specs[k]) + "</td></tr>";
            }).join("") + "</tbody></table></div>" +
          '<div class="info-panel" id="panel-ship"><p>' + esc(D.shippingNote) + "</p>" +
            "<p>الدفع عند الاستلام متاح لكل المحافظات. تقدر تجرّب الجهاز قبل الدفع، ولو فيه أي عيب مش في الوصف تقدر ترفض الاستلام من غير أي رسوم.</p>" +
            "<p>الضمان " + (p.condition === "new" ? "سنة كاملة" : "3 شهور") + " على العيوب المصنعية من تاريخ الفاتورة. الصيانة في مركزنا أو عن طريق مندوب.</p></div>" +
        "</div>" +
      "</div>" +
      '<section class="wrap related"><div class="section-head"><div><span class="kicker">ممكن يعجبك كمان</span>' +
        "<h2>منتجات من نفس القسم</h2></div>" +
        '<a class="link-more" href="shop.html?cat=' + encodeURIComponent(p.category) + '">شوف الكل ' + icon("arrowLeft") + "</a></div>" +
        '<div class="product-grid">' + related.map(card).join("") + "</div></section>";

    /* جاليري */
    var thumbs = $("#galleryThumbs");
    if (thumbs) thumbs.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-src]");
      if (!b) return;
      $$("button", thumbs).forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      $("#galleryMain").src = b.getAttribute("data-src");
    });

    /* كمية */
    var qty = 1;
    var input = $("#qtyInput");
    var syncQty = function (v) {
      qty = Math.max(1, Math.min(10, Math.round(v || 1)));
      if (input) input.value = qty;
    };
    if ($("#qtyMinus")) $("#qtyMinus").addEventListener("click", function () { syncQty(qty - 1); });
    if ($("#qtyPlus")) $("#qtyPlus").addEventListener("click", function () { syncQty(qty + 1); });
    if (input) input.addEventListener("change", function () { syncQty(Number(input.value)); });

    var addBtn = $("#pAdd");
    if (addBtn) addBtn.addEventListener("click", function () {
      addToCart(p.id, qty);
    });

    /* تابات */
    $$(".info-tab").forEach(function (t) {
      t.addEventListener("click", function () {
        $$(".info-tab").forEach(function (x) { x.classList.remove("is-active"); });
        $$(".info-panel").forEach(function (x) { x.classList.remove("is-active"); });
        t.classList.add("is-active");
        var panel = $("#panel-" + t.getAttribute("data-itab"));
        if (panel) panel.classList.add("is-active");
      });
    });

    var anchor = $("[data-scroll]");
    if (anchor) anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var el = document.getElementById("reviews");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /* بيانات منظمة للجوجل */
    var ld = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: [p.image],
      description: p.desc,
      brand: { "@type": "Brand", name: p.brand },
      offers: {
        "@type": "Offer",
        priceCurrency: "EGP",
        price: p.price,
        availability: p.stock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
      }
    };
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);

    revealAll();
  }

  function waProduct(p) {
    return waLink("مرحباً " + D.brand.nameAr + " 👋\nمهتم بالمنتج ده:\n" + p.name +
      "\nالسعر: " + money(p.price) + "\nمتوفر؟ وهل فيه تفاصيل إضافية؟");
  }

  /* ============================================================
     صفحة البحث
     ============================================================ */
  function initSearch() {
    var grid = $("#searchGrid");
    if (!grid) return;
    var q = params().get("q") || "";
    var input = $("#searchInput");
    if (input) input.value = q;

    var trending = ["لابتوب", "كارت شاشة", "Dell", "شاشة 24", "SSD", "رام DDR4"];
    fill("#trendChips", '<span>الأكثر بحثاً:</span>' + trending.map(function (t) {
      return '<a href="search.html?q=' + encodeURIComponent(t) + '">' + esc(t) + "</a>";
    }).join(""));

    var sortSel = $("#searchSort");
    var sort = (sortSel && sortSel.value) || "featured";

    function run() {
      var qn = normalize(q);
      var list = PRODUCTS.filter(function (p) {
        if (!qn) return true;
        return normalize(p.name + " " + p.brand + " " + p.short + " " + p.desc + " " +
          (p.tags || []).join(" ") + " " + catName(p.category)).indexOf(qn) > -1;
      });
      list.sort(function (a, b) {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });

      var info = $("#searchInfo");
      if (info) {
        info.innerHTML = qn
          ? "لقينا <strong>" + list.length + "</strong> نتيجة عن «" + esc(q) + "»"
          : "بنعرض <strong>" + list.length + "</strong> منتج — اكتب اسم جهاز أو ماركة فوق";
      }
      document.title = (qn ? "بحث: " + q : "ابحث") + " — " + D.brand.name;

      grid.innerHTML = list.map(card).join("");
      var empty = $("#searchEmpty");
      if (empty) {
        empty.innerHTML = list.length ? "" :
          '<div class="empty-state"><div class="es-icon" aria-hidden="true">🔎</div>' +
          "<h3>مفيش نتائج لـ «" + esc(q) + "»</h3>" +
          "<p>جرّب كلمة أقصر، أو اكتب اسم الماركة، أو اتفرج على كل الأقسام.</p>" +
          '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
            '<a class="btn btn-primary" href="shop.html">كل المنتجات</a>' +
            '<a class="btn btn-outline" href="' + waLink("مرحباً، بدوّر على: " + q) + '" target="_blank" rel="noopener">' + icon("whatsapp") + " اسأل عن " + esc(q) + "</a>" +
          "</div></div>";
      }
      revealAll();
    }

    if (sortSel) sortSel.addEventListener("change", function () { sort = sortSel.value; run(); });
    run();
    revealAll();
  }

  /* ============================================================
     تشغيل
     ============================================================ */
  function init() {
    renderShell();
    var page = document.body.getAttribute("data-page");
    if (page === "home") initHome();
    if (page === "shop") initShop();
    if (page === "product") initProduct();
    if (page === "search") initSearch();
    revealAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
