const fs = require('node:fs');
const path = require('node:path');

const dist = path.join(__dirname, 'dist');
const homeFile = path.join(dist, 'index.html');
let home = fs.readFileSync(homeFile, 'utf8');

function removeBetween(start, end) {
  const from = home.indexOf(start);
  if (from < 0) return;
  const to = home.indexOf(end, from);
  if (to < 0) throw new Error(`Missing end marker for ${start}`);
  home = home.slice(0, from) + home.slice(to);
}

removeBetween('      <nav class="container hero-v2-strip"', '    </section>');
removeBetween('    <section class="products section" id="products">', '    <section class="custom-section');
removeBetween('    <section class="statement">', '    <section class="faq section"');

const mobileNavStart = home.indexOf('        <nav class="mobile-nav"');
const mobileNavEnd = home.indexOf('        </nav>', mobileNavStart);
if (mobileNavStart < 0 || mobileNavEnd < 0) throw new Error('Mobile navigation not found');
home = home.slice(0, mobileNavStart) + `        <nav class="mobile-nav" aria-label="تصفح الموقع">
          <a href="index.html#collections"><span class="mobile-menu-index">01</span><span class="mobile-menu-link-text"><strong>العوالم</strong><small>أنمي، رياضة، مسلسلات وفن الحروف</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
          <a href="index.html#offers"><span class="mobile-menu-index">02</span><span class="mobile-menu-link-text"><strong>عروض ترحيبية</strong><small>كل قطعة 250 د.م · التوصيل مجاني</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
          <a href="anime.html"><span class="mobile-menu-index">03</span><span class="mobile-menu-link-text"><strong>عالم الأنمي</strong><small>تصاميم مستوحاة من الخيال</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
          <a href="football.html"><span class="mobile-menu-index">04</span><span class="mobile-menu-link-text"><strong>عالم الرياضة</strong><small>الشغف اللي كيلبسو</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
          <a href="tv.html"><span class="mobile-menu-index">05</span><span class="mobile-menu-link-text"><strong>عالم المسلسلات</strong><small>حكايات فستايل جديد</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
          <a href="motivation.html"><span class="mobile-menu-index">06</span><span class="mobile-menu-link-text"><strong>فن الحروف العربية</strong><small>عبارات بطابع عربي</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
        </nav>` + home.slice(mobileNavEnd + '        </nav>'.length);

for (const world of ['anime', 'football', 'tv', 'motivation']) {
  home = home.replaceAll(`href="#products" data-filter-link="${world}"`, `href="${world}.html"`);
}
home = home.replace('<a href="#products">المنتجات</a>', '<a href="#collections">العوالم</a>');
home = home.replace('<a href="#products">المنتجات</a>', '<a href="anime.html">أنمي</a><a href="football.html">رياضة</a><a href="motivation.html">فن الحروف</a>');
home = home.replaceAll('كتشف الكولكشن', 'اختار العالم ديالك');
if (home.includes('href="#products"') || home.includes('data-filter-link=')) throw new Error('Old product filter links remain on home');
fs.writeFileSync(homeFile, home);

const worlds = {
  anime: {
    index: '01', english: 'ANIME', name: 'عالم الأنمي', hero: 'world-anime-color.png',
    description: 'تصاميم مستوحاة من طاقة الأنمي، مطبوعة على قطع كتعبّر على الخيال ديالك.',
    headline: 'خيالك، على ستايلك.', lead: 'من التيشيرت للحائط، هاد العالم فيه تفاصيل جريئة وشخصيات وأجواء كتعيش معاك كل نهار.',
    productIntro: 'قطع كتجمع الفن والطباعة اليومية، وتخلي الستايل ديالك عندو حكاية.',
    imageAlt: 'شخصية محارب خيالية بألوان الأزرق والأحمر وسط أزهار الكرز'
  },
  football: {
    index: '02', english: 'SPORT', name: 'عالم الرياضة', hero: 'world-football-color.png',
    description: 'شغف الملعب كيمشي معاك من المدرجات للشارع، على هوديات وطابلوات بطابع قوي.',
    headline: 'الشغف كيبان.', lead: 'الأضواء، اللحظة الحاسمة، والإحساس ديال الماتش. اختار قطعة كتفكرك علاش الكرة أكثر من لعبة.',
    productIntro: 'من الهودي المريح للطابلو اللي كيزيد حماس للحائط ديالك.',
    imageAlt: 'لاعب كرة قدم في ملعب مضيء عند الغروب'
  },
  motivation: {
    index: '04', english: 'ARABIC ART', name: 'فن الحروف العربية', hero: 'motivation-heart-hoodies.jpg',
    description: 'حروف وعبارات عربية مطبوعة على قطع كتعبّر على هويتك وستايلك.',
    headline: 'الحروف عندها معنى.', lead: 'من كلمة قصيرة لعبارة قريبة لقلبك، اختار تصميم فيه حروف عربية كتعبّر عليك.',
    productIntro: 'هوديات وقطع بكتابة عربية وتفاصيل كتخلي الستايل ديالك يحكي حكايتك.',
    imageAlt: 'هوديان بتصميم قلب وكتابة عربية'
  },
  tv: {
    index: '03', english: 'TV SERIES', name: 'عالم المسلسلات', hero: 'world-tv-color.png',
    description: 'حكايات وأجواء درامية أصلية مطبوعة على قطع كتعيش معاك خارج الشاشة.',
    headline: 'الحكاية كتكمّل معاك.', lead: 'من تفاصيل الشخصيات الغامضة لألوان الملصقات السينمائية، لقى ستايل فيه قصة جديدة.',
    productIntro: 'قطع مستوحاة من أجواء المسلسلات بتصاميم فنية أصلية.',
    imageAlt: 'هودي أسود بتصميم درامي أصلي بجانب ملصق فني'
  }
};

const header = home.match(/  <header class="site-header"[\s\S]*?<\/header>/)?.[0];
const footer = home.match(/  <footer class="footer">[\s\S]*?<\/footer>/)?.[0];
const widgets = home.slice(home.indexOf('  <div class="overlay"'), home.indexOf('</body>'));
if (!header || !footer || !widgets) throw new Error('Shared storefront shell not found');
const toHomeLinks = html => html.replaceAll('href="#top"', 'href="index.html#top"')
  .replaceAll('href="#collections"', 'href="index.html#collections"')
  .replaceAll('href="#offers"', 'href="index.html#offers"')
  .replaceAll('href="#custom"', 'href="index.html#custom"')
  .replaceAll('href="#how"', 'href="index.html#how"')
  .replaceAll('href="#faq"', 'href="index.html#faq"');

for (const [slug, world] of Object.entries(worlds)) {
  const otherWorlds = Object.entries(worlds).filter(([key]) => key !== slug);
  const nextCards = otherWorlds.map(([key, item]) => `<a class="world-next-card" href="${key}.html"><img src="assets/${item.hero}" alt="" loading="lazy"><span class="world-next-shade"></span><span class="world-next-label"><strong>${item.english}</strong><small>${item.name}</small></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11"/></svg></a>`).join('');
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#090a0e">
  <meta name="description" content="NOXwear — ${world.description}">
  <title>${world.name} — NOXwear</title>
  <link rel="stylesheet" href="fonts.css">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="editorial.css">
  <link rel="stylesheet" href="worlds.css">
  <link rel="stylesheet" href="studio-polish.css">
  <link rel="icon" href="assets/noxwear-mark.svg" type="image/svg+xml">
  <script src="app.js" defer></script>
  <script src="studio-motion.js" defer></script>
</head>
<body data-world="${slug}">
  <div class="announcement" aria-label="رسالة المتجر"><span>NOXwear / PRINT YOUR WORLD</span><svg class="announcement-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></svg><span>${world.name}</span></div>
${toHomeLinks(header).replace(`href="${slug}.html"`, `href="${slug}.html" aria-current="page"`)}
  <main>
    <section class="world-hero" aria-labelledby="world-title"><img class="world-hero-image" src="assets/${world.hero}" alt="${world.imageAlt}" fetchpriority="high"><div class="world-hero-shade" aria-hidden="true"></div><div class="container world-hero-content"><nav class="world-breadcrumb" aria-label="مسار الصفحة"><a href="index.html">الرئيسية</a><span>/</span><a href="index.html#collections">العوالم</a><span>/</span><span aria-current="page">${world.name}</span></nav><span class="world-index">NOXwear / WORLD ${world.index}</span><h1 id="world-title">${world.english}</h1><strong class="world-arabic">${world.name}</strong><p>${world.description}</p><a class="world-hero-link" href="#products">شوف قطع ${world.name} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a></div></section>
    <section class="world-intro"><div class="container"><span>${world.index} / THE WORLD</span><h2>${world.headline}</h2><p>${world.lead}</p></div></section>
    <section class="products section world-products" id="products"><div class="container"><div class="section-head world-products-head"><div><div class="world-products-kicker"><span class="kicker">${world.index} / القطع المختارة</span><span class="result-count">المنتجات</span></div><h2>اختار من <span>${world.name}.</span></h2></div><p>${world.productIntro}</p></div><div class="product-grid" id="product-grid"></div><p class="sample-note">كل قطعة بـ250 د.م. التوصيل مجاني خلال 24–48 ساعة بعد تأكيد الطلب. تسبيق 50 د.م على الطلب كامل.</p></div></section>
    <section class="world-next section" aria-labelledby="world-next-title"><div class="container"><div class="world-next-head"><div><span class="kicker">NOXwear / MORE WORLDS</span><h2 id="world-next-title">كمل الجولة ديالك.</h2></div><a href="index.html#collections">جميع العوالم <span aria-hidden="true">↗</span></a></div><div class="world-next-grid">${nextCards}</div></div></section>
    <section class="world-custom"><div class="container world-custom-inner"><div><span>صمّمها بطريقتك</span><h2>باغي تصميم خاص بيك؟</h2><p>وصف لينا الفكرة ديالك، ونوجدولك ملخص واضح للطلب.</p></div><a href="index.html#custom">بدا التصميم ديالك <span aria-hidden="true">↗</span></a></div></section>
  </main>
${toHomeLinks(footer)}
${widgets}</body>
</html>
`;
  fs.writeFileSync(path.join(dist, `${slug}.html`), html);
}

console.log('Updated the home page and generated four world pages.');
