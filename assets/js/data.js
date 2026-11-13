/* ============================================================
   بيانات المتجر — كل حاجة تتغيّر من الملف ده وبس
   ------------------------------------------------------------
   ١) الاسم والتليفون والعنوان واللينكات في SITE تحت.
   ٢) صور المنتجات في assets/img/ — بنفس الأسماء المكتوبة هنا.
      لو مسحت مسار الصورة، الكارت هيظهر بمكان فاضي أنيق.
   ٣) المنتجات في PRODUCTS: زوّد أو امسح براحتك، بس خلّي الـ id
      مختلف لكل منتج (هو اللي بيتبني عليه لينك صفحة المنتج).
   ٤) الأقسام في SITE.categories — الـ id هو اللي بيتكتب في
      product.category، والاسم هو اللي بيظهر للزائر.
   ============================================================ */

window.SHOP = {
  brand: {
    name: "PC TECH STORE",
    nameAr: "PC TECH STORE",
    kicker: "لابتوب وأجهزة كمبيوتر",
    tagline: "أجهزة كمبيوتر ولابتوب مستعملة بحالة الزيرو، بضمان حقيقي وأسعار في المتناول.",
    logo: "assets/img/logo.jpg",
    logoText: "TP",
    copyright: "PC TECH STORE",
    address: "العصافرة عبد الناصر خلف بنك ابو ظبي",
    city: "الاسكندرية",
    email: "hello@pctechstore.eg",
    phoneDisplay: "01224802782",
    phone: "+201224802782",
    whatsapp: "201224802782",
    hours: "كل يوم من ١٠ الصبح لـ ١٠ بالليل",
    mapUrl: "",
    social: [
      { name: "فيسبوك", icon: "f", url: "#" },
      { name: "إنستجرام", icon: "◎", url: "#" },
      { name: "تيك توك", icon: "♪", url: "#" }
    ]
  },

  currency: "ج.م",

  /* الشريط اللي فوق الهيدر */
  announcements: [
    "شحن مجاني للطلبات فوق ١٠٬٠٠٠ ج.م",
    "ضمان ٣ شهور على الأجهزة المستعملة"
  ],

  nav: [
    { label: "الرئيسية", href: "index.html" },
    { label: "المتجر", href: "shop.html" },
    { label: "العروض", href: "shop.html?deal=1" }
  ],

  hero: {
    eyebrow: "لابتوب وأجهزة كمبيوتر · الاسكندرية",
    title: "جهّز شغلك",
    accent: "من غير ما تلف البلد",
    lead: "لابتوبات وأجهزة مكتبية وكروت شاشة، كلها متفحّصة قطعة قطعة وبضمان مكتوب. تختار، تدفع عند الاستلام، وتستلم في بيتك.",
    primaryCta: { label: "تسوّق الأجهزة", href: "shop.html" },
    secondaryCta: { label: "شوف العروض", href: "shop.html?deal=1" },
    image: "assets/img/hero-laptop.jpg",
    stats: [
      { value: "+2,400", label: "جهاز اتسلّم" },
      { value: "4.8", label: "تقييم العملاء" },
      { value: "3 شهور", label: "ضمان على المستعمل" }
    ],
    floatCard: { title: "Dell XPS 13", price: 12500, note: "خصم ٢٬٠٠٠ ج.م", image: "assets/img/laptop-dell-xps.jpg" }
  },

  features: [
    { icon: "shield", title: "ضمان مكتوب", text: "٣ شهور ضمان على كل جهاز مستعمل، وقطع الغيار متوفرة." },
    { icon: "truck", title: "توصيل لكل مصر", text: "القاهرة والجيزة في ٢٤ ساعة، وباقي المحافظات ٢–٤ أيام." },
    { icon: "cash", title: "دفع عند الاستلام", text: "تفتح الكرتونة، تجرّب الجهاز، وبعدين تدفع." },
    { icon: "headset", title: "دعم فني حقيقي", text: "مهندس على الواتساب طول الأسبوع يجاوبك على أي سؤال." }
  ],

  categories: [
    { id: "laptops", name: "اللابتوب", desc: "Dell · HP · Lenovo", image: "assets/img/cat-laptops.jpg" },
    { id: "desktops", name: "كمبيوتر مكتبي", desc: "أجهزة كاملة جاهزة للشغل", image: "assets/img/cat-desktops.jpg" },
    { id: "gaming", name: "تجميعات جيمينج", desc: "مكوّنات مختارة بإيد مهندس", image: "assets/img/cat-gaming.jpg" },
    { id: "gpus", name: "كروت الشاشة", desc: "NVIDIA · AMD", image: "assets/img/cat-gpus.jpg" },
    { id: "monitors", name: "شاشات كمبيوتر", desc: "من ٢٠ لـ ٢٧ بوصة", image: "assets/img/cat-monitors.jpg" },
    { id: "storage", name: "هاردات وSSD", desc: "مساحة أسرع وأكبر", image: "assets/img/cat-storage.jpg" },
    { id: "ram", name: "رامات", desc: "DDR3 · DDR4", image: "assets/img/cat-ram.jpg" }
  ],

  brands: ["Dell", "HP", "Lenovo", "Dynabook", "NVIDIA", "Kingston", "Western Digital", "Samsung"],

  deal: {
    kicker: "عرض الأسبوع",
    title: "تجميعة جيمينج كاملة",
    text: "كيسة + شاشة ٢٤ + كيبورد وماوس، متجمّعة ومتجرّبة قبل التسليم. الكمية محدودة.",
    price: 21500,
    oldPrice: 24900,
    image: "assets/img/gaming-ryzen.jpg",
    cta: { label: "اطلب التجميعة", href: "product.html?id=gaming-ryzen-5" }
  },

  reviews: [
    { name: "أحمد مصطفى", initials: "أ.م", rating: 5, text: "اشتريت لابتوب Dell مستعمل، وصل بحالة ممتازة فعلاً. المهندس شرحلي كل حاجة على الواتساب قبل ما أدفع." },
    { name: "نهى عبد الرحمن", initials: "ن.ع", rating: 5, text: "طلبت شاشة ٢٤ بوصة ووصلت تاني يوم في الجيزة. التغليف كان محترم جداً والسعر أقل من السوق." },
    { name: "محمود سعيد", initials: "م.س", rating: 4, text: "التجميعة شغالة زي الفل مع الألعاب. اتأخرت يوم عن الميعاد بس التواصل كان مستمر واعتذروا." }
  ],

  faq: [
    { q: "الأجهزة المستعملة بضمان؟", a: "أيوه، كل جهاز مستعمل عليه ضمان ٣ شهور على العيوب المصنعية، ومكتوب في الفاتورة. البطاريات والاكسسوارات ليها ضمان أسبوع للاستبدال." },
    { q: "أقدر أجرّب الجهاز قبل ما أدفع؟", a: "طبعاً. مندوب التوصيل بيستنى لحد ما تفتح وتشغّل الجهاز وتتأكد إنه زي الوصف، وبعدها تدفع." },
    { q: "الشحن بيوصل في قد إيه؟", a: "القاهرة والجيزة خلال ٢٤ ساعة من تأكيد الطلب، وباقي المحافظات من ٢ لـ ٤ أيام عمل. الشحن مجاني فوق ١٠٬٠٠٠ ج.م." },
    { q: "ينفع أستبدل جهازي القديم؟", a: "بنقبل الاستبدال (Trade-in) لو الجهاز شغال. ابعتلنا الموديل والمواصفات على الواتساب وهنقولك قيمته وخصمها من طلبك." }
  ],

  shippingNote: "الشحن بيتحسب حسب المحافظة، ومجاني للطلبات فوق ١٠٬٠٠٠ ج.م."
};

/* ============================================================
   المنتجات
   condition: "used" (مستعمل) أو "new" (جديد)
   stock: true / false
   featured: بتظهر في قسم "الأكثر طلباً" في الرئيسية
   ============================================================ */

window.PRODUCTS = [
  /* ---------------- لابتوب ---------------- */
  {
    id: "dell-xps-13-9360",
    name: "Dell XPS 13 9360",
    brand: "Dell",
    category: "laptops",
    condition: "used",
    price: 12500,
    oldPrice: 14500,
    image: "assets/img/laptop-dell-xps.jpg",
    gallery: ["assets/img/laptop-dell-xps.jpg"],
    badge: "الأكثر مبيعاً",
    rating: 4.8,
    reviews: 42,
    featured: true,
    stock: true,
    tags: ["لابتوب", "dell", "xps", "i7", "خفيف", "شغل"],
    short: "Core i7 · 8GB RAM · SSD 256GB · شاشة 13.3″ FHD",
    specs: {
      "المعالج": "Intel Core i7-7500U (2.7GHz – 3.5GHz)",
      "الرام": "8GB LPDDR3",
      "التخزين": "SSD 256GB NVMe",
      "الشاشة": "13.3 بوصة FHD IPS",
      "كرت الشاشة": "Intel HD Graphics 620",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 9/10",
      "الضمان": "3 شهور"
    },
    desc: "الـ XPS 13 من أنحف وأخف اللابتوبات اللي عملتها Dell، وهنا نسخة بحالة ممتازة وبطارية بتقعد معاك طول يوم الشغل. مناسب للبرمجة والتصميم الخفيف والتنقل اليومي، وبيجي معاه الشاحن الأصلي."
  },
  {
    id: "hp-zbook-15-g3",
    name: "HP ZBook 15 G3",
    brand: "HP",
    category: "laptops",
    condition: "used",
    price: 13000,
    image: "assets/img/laptop-hp-zbook.jpg",
    gallery: ["assets/img/laptop-hp-zbook.jpg"],
    badge: "للتصميم",
    rating: 4.7,
    reviews: 27,
    featured: true,
    stock: true,
    tags: ["لابتوب", "hp", "zbook", "workstation", "رندر", "تصميم"],
    short: "Core i7 · 16GB RAM · SSD 512GB · كارت Quadro",
    specs: {
      "المعالج": "Intel Core i7-6820HQ",
      "الرام": "16GB DDR4",
      "التخزين": "SSD 512GB",
      "الشاشة": "15.6 بوصة FHD",
      "كرت الشاشة": "NVIDIA Quadro M1000M 2GB",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 8.5/10",
      "الضمان": "3 شهور"
    },
    desc: "محطة عمل حقيقية بسعر لابتوب عادي. الـ ZBook بيستحمل الرندر والـ CAD والبرامج التقيلة، وشاشته الماتّة مريحة للعين في الشغل الطويل. البودي معدني متين ومتفحّص بالكامل."
  },
  {
    id: "dell-latitude-5480",
    name: "Dell Latitude 5480",
    brand: "Dell",
    category: "laptops",
    condition: "used",
    price: 13000,
    oldPrice: 15200,
    image: "assets/img/laptop-dell-5480.jpg",
    gallery: ["assets/img/laptop-dell-5480.jpg"],
    rating: 4.6,
    reviews: 19,
    featured: false,
    stock: true,
    tags: ["لابتوب", "dell", "latitude", "i5", "مكتبي", "شركات"],
    short: "Core i5 · 8GB RAM · SSD 256GB · شاشة 14″",
    specs: {
      "المعالج": "Intel Core i5-7300U",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "الشاشة": "14 بوصة FHD",
      "كرت الشاشة": "Intel HD 620",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "لابتوب شغل عملي وخفيف، بطارية كويسة وكيبورد مريح. مناسب للطلبة والمحاسبة والأعمال المكتبية، وسعره من أفضل الأسعار في فئته."
  },
  {
    id: "dynabook-portege-x40",
    name: "Dynabook Portege X40-J",
    brand: "Dynabook",
    category: "laptops",
    condition: "used",
    price: 13500,
    image: "assets/img/laptop-dynabook.jpg",
    gallery: ["assets/img/laptop-dynabook.jpg"],
    badge: "خفيف جداً",
    rating: 4.5,
    reviews: 12,
    featured: false,
    stock: true,
    tags: ["لابتوب", "dynabook", "portege", "i5", "خفيف", "بطارية"],
    short: "Core i5 · 8GB RAM · SSD 256GB · وزن 1.2 كجم",
    specs: {
      "المعالج": "Intel Core i5-1135G7",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "الشاشة": "14 بوصة FHD",
      "كرت الشاشة": "Intel Iris Xe",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 9/10",
      "الضمان": "3 شهور"
    },
    desc: "وزنه ١.٢ كجم بس، وبيشتغل لحد ٨ ساعات بعيد عن الشاحن. الجهاز الياباني ده معمول للتنقل، وفيه منافذ USB-C وHDMI وشاشة ماتّة مريحة."
  },
  {
    id: "hp-elitebook-840-g8",
    name: "HP EliteBook 840 G8",
    brand: "HP",
    category: "laptops",
    condition: "used",
    price: 16500,
    oldPrice: 18900,
    image: "assets/img/laptop-hp-840.jpg",
    gallery: ["assets/img/laptop-hp-840.jpg"],
    badge: "جديد الوصول",
    rating: 4.9,
    reviews: 8,
    featured: true,
    stock: true,
    tags: ["لابتوب", "hp", "elitebook", "i5", "جيل 11", "شغل"],
    short: "Core i5 جيل 11 · 16GB RAM · SSD 512GB",
    specs: {
      "المعالج": "Intel Core i5-1135G7",
      "الرام": "16GB DDR4",
      "التخزين": "SSD 512GB NVMe",
      "الشاشة": "14 بوصة FHD IPS",
      "كرت الشاشة": "Intel Iris Xe",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 9.5/10",
      "الضمان": "3 شهور"
    },
    desc: "من أنضف الأجهزة اللي بتدخل عندنا. EliteBook 840 بمعالج جيل ١١ ورام ١٦ جيجا، يعني برمجة وتصميم ومهام تقيلة من غير تهنيج. البودي ألومنيوم والكيبورد مقاوم للماء."
  },
  {
    id: "lenovo-thinkpad-t480",
    name: "Lenovo ThinkPad T480",
    brand: "Lenovo",
    category: "laptops",
    condition: "used",
    price: 11900,
    image: "assets/img/laptop-thinkpad.jpg",
    gallery: ["assets/img/laptop-thinkpad.jpg"],
    rating: 4.7,
    reviews: 31,
    featured: false,
    stock: true,
    tags: ["لابتوب", "lenovo", "thinkpad", "i5", "كيبورد", "متين"],
    short: "Core i5 · 8GB RAM · SSD 256GB · بطاريتين",
    specs: {
      "المعالج": "Intel Core i5-8250U",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "الشاشة": "14 بوصة FHD",
      "كرت الشاشة": "Intel UHD 620",
      "نظام التشغيل": "Windows 11 Pro",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "الـ ThinkPad أسطورة في المتانة والكيبورد. النسخة دي بنظام بطاريتين (داخلية وخارجية قابلة للتغيير) وبتقعد معاك يوم شغل كامل، وسعرها من أفضل الأسعار."
  },

  /* ---------------- كمبيوتر مكتبي ---------------- */
  {
    id: "hp-800-g1-desk",
    name: "HP EliteDesk 800 G1",
    brand: "HP",
    category: "desktops",
    condition: "used",
    price: 5500,
    image: "assets/img/desktop-hp-800g1.jpg",
    gallery: ["assets/img/desktop-hp-800g1.jpg"],
    badge: "أرخص سعر",
    rating: 4.4,
    reviews: 24,
    featured: true,
    stock: true,
    tags: ["كمبيوتر", "hp", "مكتبي", "i5", "بيت", "مكتب"],
    short: "Core i5 · 8GB RAM · HDD 500GB · كيبورد وماوس",
    specs: {
      "المعالج": "Intel Core i5-4570",
      "الرام": "8GB DDR3",
      "التخزين": "HDD 500GB",
      "كرت الشاشة": "Intel HD 4600",
      "نظام التشغيل": "Windows 10 Pro",
      "الملحقات": "كيبورد وماوس",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "جهاز مكتبي صغير الحجم بياخد مساحة قليلة، مناسب للمكاتب والاستخدام المنزلي والكاشير. بيشتغل أونلاين وأوفيس وبرامج المحاسبة بسلاسة، وسعره مش هتلاقيه."
  },
  {
    id: "lenovo-m910s",
    name: "Lenovo ThinkCentre M910s",
    brand: "Lenovo",
    category: "desktops",
    condition: "used",
    price: 6700,
    image: "assets/img/desktop-lenovo-910s.jpg",
    gallery: ["assets/img/desktop-lenovo-910s.jpg"],
    badge: "الأكثر طلباً",
    rating: 4.6,
    reviews: 18,
    featured: true,
    stock: true,
    tags: ["كمبيوتر", "lenovo", "مكتبي", "i5", "شركات"],
    short: "Core i5 · 8GB RAM · SSD 256GB",
    specs: {
      "المعالج": "Intel Core i5-7500",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "كرت الشاشة": "Intel HD 630",
      "نظام التشغيل": "Windows 11 Pro",
      "الملحقات": "كيبورد وماوس",
      "حالة الجهاز": "مستعمل — 8.5/10",
      "الضمان": "3 شهور"
    },
    desc: "جهاز شركات ألماني الصنع، متين وهادي في التشغيل. الـ SSD بيخلي الويندوز يفتح في ثواني، ومناسب لشغل الأوفيس والبرامج المحاسبية."
  },
  {
    id: "hp-z240",
    name: "HP Z240 Workstation",
    brand: "HP",
    category: "desktops",
    condition: "used",
    price: 7000,
    image: "assets/img/desktop-hp-z240.jpg",
    gallery: ["assets/img/desktop-hp-z240.jpg"],
    rating: 4.7,
    reviews: 9,
    featured: false,
    stock: true,
    tags: ["كمبيوتر", "hp", "z240", "workstation", "تصميم"],
    short: "Xeon · 8GB RAM · SSD 256GB · كارت Quadro",
    specs: {
      "المعالج": "Intel Xeon E3-1225 v5",
      "الرام": "8GB DDR4 ECC",
      "التخزين": "SSD 256GB",
      "كرت الشاشة": "NVIDIA Quadro K620 2GB",
      "نظام التشغيل": "Windows 11 Pro",
      "الملحقات": "كيبورد وماوس",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "محطة عمل بمكونات ECC معمولة للشغل اللي مش بيقبل الأخطاء. مناسبة للـ AutoCAD والـ 3D والتصميم الهندسي، وبتستحمل تشتغل عليها طول اليوم."
  },
  {
    id: "hp-800-g3-desk",
    name: "HP EliteDesk 800 G3",
    brand: "HP",
    category: "desktops",
    condition: "used",
    price: 7000,
    image: "assets/img/desktop-hp-800g3.jpg",
    gallery: ["assets/img/desktop-hp-800g3.jpg"],
    rating: 4.5,
    reviews: 14,
    featured: false,
    stock: true,
    tags: ["كمبيوتر", "hp", "مكتبي", "i5", "جيل 6"],
    short: "Core i5 جيل 7 · 8GB RAM · SSD 256GB",
    specs: {
      "المعالج": "Intel Core i5-7500",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "كرت الشاشة": "Intel HD 630",
      "نظام التشغيل": "Windows 11 Pro",
      "الملحقات": "كيبورد وماوس",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "نسخة محدّثة من الـ EliteDesk بسوكيت أحدث ودعم أفضل للرامات. بيشيل شاشتين في نفس الوقت، ومثالي للمكاتب اللي بتشتغل على برامج تقيلة."
  },
  {
    id: "hp-tower-800-g2",
    name: "HP Tower 800 G2",
    brand: "HP",
    category: "desktops",
    condition: "used",
    price: 7500,
    image: "assets/img/desktop-hp-800g2.jpg",
    gallery: ["assets/img/desktop-hp-800g2.jpg"],
    badge: "قابل للتطوير",
    rating: 4.3,
    reviews: 11,
    featured: false,
    stock: true,
    tags: ["كمبيوتر", "hp", "برج", "tower", "تطوير"],
    short: "Core i5 · 8GB RAM · SSD 256GB · برج قابل للتطوير",
    specs: {
      "المعالج": "Intel Core i5-6500",
      "الرام": "8GB DDR4",
      "التخزين": "SSD 256GB",
      "كرت الشاشة": "Intel HD 530",
      "نظام التشغيل": "Windows 11 Pro",
      "الملحقات": "كيبورد وماوس",
      "حالة الجهاز": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "كيسة برج بمساحة واسعة للتطوير — تقدر تزوّد رام وهارد وكارت شاشة بسهولة. مناسب لو ناوي تبني جهازك خطوة بخطوة على ميزانية."
  },

  /* ---------------- تجميعات جيمينج ---------------- */
  {
    id: "gaming-ryzen-5",
    name: "تجميعة Ryzen 5 + RTX 3060",
    brand: "PC TECH STORE",
    category: "gaming",
    condition: "new",
    price: 21500,
    oldPrice: 24900,
    image: "assets/img/gaming-ryzen.jpg",
    gallery: ["assets/img/gaming-ryzen.jpg", "assets/img/gpu-1660.jpg"],
    badge: "عرض الأسبوع",
    rating: 5,
    reviews: 7,
    featured: true,
    stock: true,
    tags: ["تجميعة", "جيمينج", "ryzen", "rtx", "العاب", "كيسة"],
    short: "Ryzen 5 · 16GB RAM · RTX 3060 · SSD 512GB",
    specs: {
      "المعالج": "AMD Ryzen 5 5600",
      "الرام": "16GB DDR4 3200MHz",
      "كرت الشاشة": "NVIDIA RTX 3060 12GB",
      "التخزين": "SSD NVMe 512GB",
      "اللوحة": "B550M",
      "الباور": "650W 80+ Bronze",
      "الكيسة": "RGB مع 4 مراوح",
      "الضمان": "سنة على التجميعة"
    },
    desc: "تجميعة متوازنة بتلعب أحدث الألعاب على 1080p و1440p بإعدادات عالية. كل قطعة مختارة ومتجرّبة، والكيسة متجمّعة ومنظّمة الكابلات قبل التسليم. تقدر تعدّل أي قطعة قبل الطلب — كلّمنا."
  },
  {
    id: "gaming-intel-i5",
    name: "تجميعة Core i5 + GTX 1660",
    brand: "PC TECH STORE",
    category: "gaming",
    condition: "new",
    price: 15900,
    image: "assets/img/gaming-intel.jpg",
    gallery: ["assets/img/gaming-intel.jpg", "assets/img/gpu-1070.jpg"],
    badge: "بداية موفّرة",
    rating: 4.6,
    reviews: 15,
    featured: false,
    stock: true,
    tags: ["تجميعة", "جيمينج", "intel", "gtx", "العاب", "اقتصادية"],
    short: "Core i5 · 16GB RAM · GTX 1660 · SSD 512GB",
    specs: {
      "المعالج": "Intel Core i5-10400F",
      "الرام": "16GB DDR4 2666MHz",
      "كرت الشاشة": "NVIDIA GTX 1660 Super 6GB",
      "التخزين": "SSD NVMe 512GB",
      "اللوحة": "H410M",
      "الباور": "550W 80+",
      "الكيسة": "RGB Mid Tower",
      "الضمان": "سنة على التجميعة"
    },
    desc: "أحسن بداية للجيمينج بأقل تكلفة. بتشغّل PUBG وValorant وGTA V على إعدادات عالية بسلاسة، وفيها مساحة للتطوير بعدين من غير ما تغيّر الكيسة."
  },

  /* ---------------- كروت شاشة ---------------- */
  {
    id: "gtx-1660-super",
    name: "GeForce GTX 1660 SUPER 6G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 8800,
    image: "assets/img/gpu-1660.jpg",
    gallery: ["assets/img/gpu-1660.jpg"],
    badge: "الأكثر طلباً",
    rating: 4.8,
    reviews: 23,
    featured: true,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "1660", "جيمينج"],
    short: "6GB GDDR6 · 1080p Gaming · HDMI/DP",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 1660 SUPER",
      "الذاكرة": "6GB GDDR6",
      "نوع الذاكرة": "192-bit",
      "المنافذ": "HDMI 2.0 · DisplayPort 1.4 · DVI",
      "الطاقة المطلوبة": "450W",
      "حالة الكارت": "مستعمل — 8.5/10",
      "الضمان": "3 شهور"
    },
    desc: "أشهر كارت في فئة الـ 1080p. بيشغّل معظم الألعاب على High بسلاسة، ومناسب كمان للمونتاج والتصميم. الكارت متفحّص ومجرّب على ألعاب قبل التسليم."
  },
  {
    id: "gtx-1070-8g",
    name: "GeForce GTX 1070 8G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 7800,
    image: "assets/img/gpu-1070.jpg",
    gallery: ["assets/img/gpu-1070.jpg"],
    rating: 4.6,
    reviews: 16,
    featured: true,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "1070", "8gb"],
    short: "8GB GDDR5 · 1440p · ممتاز للرندر",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 1070",
      "الذاكرة": "8GB GDDR5",
      "نوع الذاكرة": "256-bit",
      "المنافذ": "HDMI 2.0 · DisplayPort 1.4 · DVI",
      "الطاقة المطلوبة": "500W",
      "حالة الكارت": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "ذاكرة ٨ جيجا بتفرق جداً في الألعاب الحديثة والرندر. لسه كارت قوي جداً لسعره، وبيشتغل معاه شاشتين أو تلاتة من غير مشاكل."
  },
  {
    id: "gtx-1060-6g",
    name: "GeForce GTX 1060 6G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 7000,
    oldPrice: 7600,
    image: "assets/img/gpu-1060.jpg",
    gallery: ["assets/img/gpu-1060.jpg"],
    rating: 4.5,
    reviews: 29,
    featured: false,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "1060", "اقتصادي"],
    short: "6GB GDDR5 · 1080p Gaming",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 1060",
      "الذاكرة": "6GB GDDR5",
      "نوع الذاكرة": "192-bit",
      "المنافذ": "HDMI · DisplayPort · DVI",
      "الطاقة المطلوبة": "400W",
      "حالة الكارت": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "الاختيار الاقتصادي الآمن للجيمينج على 1080p. كارت مجرّب ومعروف باعتماديته، وسعره بيسمحلك تجمّع جهاز كامل بميزانية معقولة."
  },
  {
    id: "gtx-1060-3g",
    name: "GeForce GTX 1060 3G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 5000,
    image: "assets/img/gpu-1060.jpg",
    gallery: ["assets/img/gpu-1060.jpg"],
    rating: 4.2,
    reviews: 21,
    featured: false,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "1060", "3gb", "رخيص"],
    short: "3GB GDDR5 · ألعاب خفيفة ومتوسطة",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 1060",
      "الذاكرة": "3GB GDDR5",
      "نوع الذاكرة": "192-bit",
      "المنافذ": "HDMI · DisplayPort · DVI",
      "الطاقة المطلوبة": "400W",
      "حالة الكارت": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "مناسب للألعاب الأونلاين الخفيفة والمتوسطة (Valorant / CS / FIFA) ولمونتاج بسيط. أرخص طريقة ترفع أداء جهازك الحالي بدل ما تشتري جهاز جديد."
  },
  {
    id: "quadro-k6000",
    name: "NVIDIA Quadro K6000 12G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 8000,
    image: "assets/img/gpu-quadro.jpg",
    gallery: ["assets/img/gpu-quadro.jpg"],
    badge: "للاحترافيين",
    rating: 4.7,
    reviews: 6,
    featured: false,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "quadro", "k6000", "رندر", "تصميم"],
    short: "12GB GDDR5 · كارت احترافي للرندر والـ 3D",
    specs: {
      "المعالج الرسومي": "NVIDIA Quadro K6000",
      "الذاكرة": "12GB GDDR5",
      "نوع الذاكرة": "384-bit",
      "المنافذ": "4× DisplayPort",
      "الطاقة المطلوبة": "600W",
      "حالة الكارت": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "كارت شغل مش كارت ألعاب. الـ ١٢ جيجا والـ CUDA cores بيخلّوه ممتاز للرندر والـ 3ds Max والـ Maya والـ CAD. لو شغلك تصميم، ده استثمار مش مصروف."
  },
  {
    id: "gtx-745-4g",
    name: "GeForce GTX 745 4G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 2500,
    image: "assets/img/gpu-745.jpg",
    gallery: ["assets/img/gpu-745.jpg"],
    rating: 4,
    reviews: 13,
    featured: false,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "745", "رخيص", "شاشات"],
    short: "4GB DDR3 · تشغيل شاشات متعددة",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 745",
      "الذاكرة": "4GB DDR3",
      "نوع الذاكرة": "128-bit",
      "المنافذ": "HDMI · DVI · VGA",
      "الطاقة المطلوبة": "300W",
      "حالة الكارت": "مستعمل — 7.5/10",
      "الضمان": "3 شهور"
    },
    desc: "كارت بسيط لتشغيل الجهاز على أكتر من شاشة، أو لو كارت الشاشة الداخلي تعبان. مش للألعاب التقيلة، بس بيفرق في شغل الأوفيس والتصفح والفيديو."
  },
  {
    id: "gtx-1660-6g",
    name: "GeForce GTX 1660 6G",
    brand: "NVIDIA",
    category: "gpus",
    condition: "used",
    price: 7500,
    image: "assets/img/gpu-1660.jpg",
    gallery: ["assets/img/gpu-1660.jpg"],
    rating: 4.5,
    reviews: 11,
    featured: false,
    stock: true,
    tags: ["كارت شاشة", "nvidia", "gtx", "1660"],
    short: "6GB GDDR5 · 1080p High",
    specs: {
      "المعالج الرسومي": "NVIDIA GeForce GTX 1660",
      "الذاكرة": "6GB GDDR5",
      "نوع الذاكرة": "192-bit",
      "المنافذ": "HDMI · DisplayPort · DVI",
      "الطاقة المطلوبة": "450W",
      "حالة الكارت": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "نسخة موفّرة من الـ SUPER بنفس الذاكرة. أداء ممتاز على 1080p وسعر أقل، ومتفحّص بالكامل قبل التسليم."
  },

  /* ---------------- شاشات ---------------- */
  {
    id: "monitor-24-frameless",
    name: "شاشة 24 بوصة Frameless",
    brand: "Samsung",
    category: "monitors",
    condition: "used",
    price: 2500,
    image: "assets/img/monitor-24.jpg",
    gallery: ["assets/img/monitor-24.jpg", "assets/img/monitor-27.jpg"],
    badge: "الأكثر مبيعاً",
    rating: 4.7,
    reviews: 34,
    featured: true,
    stock: true,
    tags: ["شاشة", "monitor", "24", "frameless", "hdmi"],
    short: "24″ FHD · 75Hz · HDMI + VGA",
    specs: {
      "المقاس": "24 بوصة",
      "الدقة": "1920 × 1080 (FHD)",
      "معدل التحديث": "75Hz",
      "نوع البانل": "IPS",
      "المنافذ": "HDMI · VGA",
      "التثبيت": "VESA 100×100",
      "حالة الشاشة": "مستعمل — 9/10",
      "الضمان": "3 شهور"
    },
    desc: "شاشة بحواف رفيعة جداً ومناسبة للشغل والجيمينج الخفيف. الصورة واضحة من كل زاوية بفضل بانل IPS، وفيها فتحات VESA لو حبيت تعلّقها على الحيطة."
  },
  {
    id: "monitor-27-2k",
    name: "شاشة 27 بوصة 2K Frameless",
    brand: "Samsung",
    category: "monitors",
    condition: "used",
    price: 4500,
    image: "assets/img/monitor-27.jpg",
    gallery: ["assets/img/monitor-27.jpg"],
    rating: 4.8,
    reviews: 12,
    featured: true,
    stock: true,
    tags: ["شاشة", "monitor", "27", "2k", "qhd", "تصميم"],
    short: "27″ QHD 2560×1440 · 75Hz · HDMI/DP",
    specs: {
      "المقاس": "27 بوصة",
      "الدقة": "2560 × 1440 (QHD)",
      "معدل التحديث": "75Hz",
      "نوع البانل": "IPS",
      "المنافذ": "HDMI · DisplayPort",
      "التثبيت": "VESA 100×100",
      "حالة الشاشة": "مستعمل — 9/10",
      "الضمان": "3 شهور"
    },
    desc: "مساحة شغل أكبر وتفاصيل أوضح بكتير من الـ Full HD. مثالية للتصميم والبرمجة والمونتاج، ووضوح الخطوط فيها مريح جداً للعين."
  },
  {
    id: "monitor-27-4k",
    name: "شاشة 27 بوصة 4K",
    brand: "Samsung",
    category: "monitors",
    condition: "used",
    price: 5000,
    image: "assets/img/monitor-27.jpg",
    gallery: ["assets/img/monitor-27.jpg"],
    rating: 4.6,
    reviews: 5,
    featured: false,
    stock: true,
    tags: ["شاشة", "monitor", "27", "4k", "uhd"],
    short: "27″ UHD 3840×2160 · HDMI/DP",
    specs: {
      "المقاس": "27 بوصة",
      "الدقة": "3840 × 2160 (4K UHD)",
      "معدل التحديث": "60Hz",
      "نوع البانل": "IPS",
      "المنافذ": "HDMI · DisplayPort",
      "التثبيت": "VESA 100×100",
      "حالة الشاشة": "مستعمل — 9/10",
      "الضمان": "3 شهور"
    },
    desc: "دقة 4K حقيقية لشغل الجرافيك والمونتاج الاحترافي. لو شغلك على تفاصيل صغيرة أو ألوان دقيقة، الشاشة دي هتفرق معاك جامد."
  },
  {
    id: "monitor-23",
    name: "شاشة 23 بوصة Frameless",
    brand: "Dell",
    category: "monitors",
    condition: "used",
    price: 2200,
    image: "assets/img/monitor-22.jpg",
    gallery: ["assets/img/monitor-22.jpg"],
    rating: 4.4,
    reviews: 26,
    featured: false,
    stock: true,
    tags: ["شاشة", "monitor", "23", "frameless"],
    short: "23″ FHD · HDMI · حواف رفيعة",
    specs: {
      "المقاس": "23 بوصة",
      "الدقة": "1920 × 1080 (FHD)",
      "معدل التحديث": "60Hz",
      "نوع البانل": "IPS",
      "المنافذ": "HDMI · VGA",
      "التثبيت": "VESA 100×100",
      "حالة الشاشة": "مستعمل — 8.5/10",
      "الضمان": "3 شهور"
    },
    desc: "مقاس مريح للمكتب، حواف رفيعة وشاشة واضحة. كويسة جداً كشاشة تانية جنب اللابتوب أو لجهاز مكتبي بسيط."
  },
  {
    id: "monitor-22",
    name: "شاشة 22 بوصة",
    brand: "HP",
    category: "monitors",
    condition: "used",
    price: 2000,
    image: "assets/img/monitor-22.jpg",
    gallery: ["assets/img/monitor-22.jpg"],
    rating: 4.2,
    reviews: 17,
    featured: false,
    stock: true,
    tags: ["شاشة", "monitor", "22", "اقتصادي"],
    short: "22″ FHD · HDMI + VGA",
    specs: {
      "المقاس": "22 بوصة",
      "الدقة": "1920 × 1080 (FHD)",
      "معدل التحديث": "60Hz",
      "نوع البانل": "LED",
      "المنافذ": "HDMI · VGA",
      "التثبيت": "VESA",
      "حالة الشاشة": "مستعمل — 8/10",
      "الضمان": "3 شهور"
    },
    desc: "شاشة اقتصادية بحجم مناسب للمكاتب والاستخدام اليومي. صورة واضحة ومناسبة للتصفح والأوفيس والفيديو."
  },

  /* ---------------- تخزين ---------------- */
  {
    id: "ssd-512",
    name: "SSD 512GB NVMe",
    brand: "Kingston",
    category: "storage",
    condition: "new",
    price: 1800,
    image: "assets/img/ssd.jpg",
    gallery: ["assets/img/ssd.jpg"],
    badge: "جديد",
    rating: 4.8,
    reviews: 40,
    featured: true,
    stock: true,
    tags: ["ssd", "هارد", "تخزين", "nvme", "512"],
    short: "512GB NVMe · سرعة قراءة 3500MB/s",
    specs: {
      "السعة": "512GB",
      "النوع": "NVMe M.2",
      "سرعة القراءة": "حتى 3500MB/s",
      "سرعة الكتابة": "حتى 2100MB/s",
      "الضمان": "سنة",
      "الحالة": "جديد"
    },
    desc: "أسرع ترقية ممكن تعملها لجهازك. الويندوز والبرامج هتفتح في ثواني، والألعاب هتقل فيها شاشات التحميل. متوافق مع معظم اللوحات الحديثة."
  },
  {
    id: "ssd-256",
    name: "SSD 256GB SATA",
    brand: "Western Digital",
    category: "storage",
    condition: "used",
    price: 700,
    image: "assets/img/ssd.jpg",
    gallery: ["assets/img/ssd.jpg"],
    rating: 4.5,
    reviews: 22,
    featured: false,
    stock: true,
    tags: ["ssd", "هارد", "تخزين", "sata", "256"],
    short: "256GB SATA · 2.5 بوصة · للابتوب والمكتبي",
    specs: {
      "السعة": "256GB",
      "النوع": "SATA 2.5″",
      "سرعة القراءة": "حتى 540MB/s",
      "سرعة الكتابة": "حتى 500MB/s",
      "الضمان": "3 شهور",
      "الحالة": "مستعمل — 9/10"
    },
    desc: "بديل ممتاز للهارد التقليدي في اللابتوبات القديمة. بيخلي الجهاز يفتح في نص الوقت، وسعره مناسب جداً كترقية سريعة."
  },
  {
    id: "hdd-1tb",
    name: "هارد 1TB Desk",
    brand: "Western Digital",
    category: "storage",
    condition: "used",
    price: 900,
    image: "assets/img/hdd.jpg",
    gallery: ["assets/img/hdd.jpg"],
    rating: 4.3,
    reviews: 19,
    featured: false,
    stock: true,
    tags: ["هارد", "تخزين", "hdd", "1tb", "ارشيف"],
    short: "1TB HDD 7200RPM · 3.5 بوصة",
    specs: {
      "السعة": "1TB",
      "النوع": "HDD 3.5″",
      "السرعة": "7200RPM",
      "الكاش": "64MB",
      "الضمان": "3 شهور",
      "الحالة": "مستعمل — 8/10"
    },
    desc: "مساحة كبيرة لتخزين الصور والأفلام والأرشفة. حالته متفحّصة بالكامل (فحص قطاعات) وبيجي معاه ضمان استبدال."
  },

  /* ---------------- رامات ---------------- */
  {
    id: "ram-ddr4-16",
    name: "رام DDR4 16GB",
    brand: "Kingston",
    category: "ram",
    condition: "new",
    price: 1100,
    image: "assets/img/ram-pc.jpg",
    gallery: ["assets/img/ram-pc.jpg"],
    rating: 4.7,
    reviews: 15,
    featured: true,
    stock: true,
    tags: ["رام", "ram", "ddr4", "16gb", "ترقية"],
    short: "16GB DDR4 3200MHz · للكمبيوتر المكتبي",
    specs: {
      "السعة": "16GB",
      "النوع": "DDR4",
      "السرعة": "3200MHz",
      "الشكل": "DIMM (مكتبي)",
      "الضمان": "سنة",
      "الحالة": "جديد"
    },
    desc: "أسهل ترقية لجهازك المكتبي. ١٦ جيجا بتفرق في فتح البرامج والتشغيل المتعدد والتجميعات. متوافقة مع معظم اللوحات الحديثة."
  },
  {
    id: "ram-ddr4-8",
    name: "رام DDR4 8GB لابتوب",
    brand: "Samsung",
    category: "ram",
    condition: "used",
    price: 600,
    image: "assets/img/ram-lap.jpg",
    gallery: ["assets/img/ram-lap.jpg"],
    rating: 4.6,
    reviews: 28,
    featured: false,
    stock: true,
    tags: ["رام", "ram", "ddr4", "8gb", "لابتوب"],
    short: "8GB DDR4 2666MHz · SODIMM للابتوب",
    specs: {
      "السعة": "8GB",
      "النوع": "DDR4",
      "السرعة": "2666MHz",
      "الشكل": "SODIMM (لابتوب)",
      "الضمان": "3 شهور",
      "الحالة": "مستعمل — 9/10"
    },
    desc: "ترقية سريعة لأي لابتوب فيه سلوت رام فاضي. هتفرق معاك في التصفح وفتح البرامج والتشغيل مع بعض من غير تهنيج."
  },
  {
    id: "ram-ddr3-8",
    name: "رام DDR3 8GB",
    brand: "Kingston",
    category: "ram",
    condition: "used",
    price: 350,
    image: "assets/img/ram-pc.jpg",
    gallery: ["assets/img/ram-pc.jpg"],
    rating: 4.2,
    reviews: 33,
    featured: false,
    stock: false,
    tags: ["رام", "ram", "ddr3", "8gb", "قديم"],
    short: "8GB DDR3 1600MHz · للأجهزة الأقدم",
    specs: {
      "السعة": "8GB",
      "النوع": "DDR3",
      "السرعة": "1600MHz",
      "الشكل": "DIMM (مكتبي)",
      "الضمان": "3 شهور",
      "الحالة": "مستعمل — 8/10"
    },
    desc: "حيّت جهازك القديم من غير ما تشتري جديد. الرامة متفحّصة ومجرّبة على جهاز قبل التسليم، ومتوفر منها كميات محدودة."
  }
];
