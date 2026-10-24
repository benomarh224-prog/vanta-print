/* Browser checks for the actual storefront. Install Playwright in your test environment.
   PLAYWRIGHT_MODULE and CHROMIUM_EXECUTABLE are optional local-run overrides. */
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {spawn} = require('node:child_process');
const server = spawn(process.execPath, ['preview-server.cjs'], {cwd:__dirname});
const started = new Promise((resolve, reject) => {
  server.stdout.once('data', resolve);
  server.once('error', reject);
});

(async () => {
  await started;
  const browser = await chromium.launch({headless:true,
    ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath:process.env.CHROMIUM_EXECUTABLE} : {}),
    args:['--no-sandbox','--disable-dev-shm-usage']});
  try {
    const errors = [];
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/', {waitUntil:'domcontentloaded'});
    await page.locator('.campaign-frame').first().evaluate(image => image.decode());
    assert.equal(await page.locator('.campaign-frame').count(),4);
    assert.equal(await page.locator('.collection-card').count(),4);
    // Autoplay advances, a manual selection pauses it, and the last slide wraps correctly.
    await page.mouse.move(0,0);
    await page.waitForFunction(() => document.querySelector('.campaign-current').textContent === '02', null, {timeout:10000});
    await page.locator('[data-slide="3"]').click();
    await page.waitForFunction(() => document.querySelector('.campaign-current').textContent === '04');
    assert.equal(await page.locator('.campaign-toggle').getAttribute('aria-pressed'),'true');
    await page.locator('[data-direction="1"]').click();
    await page.waitForFunction(() => document.querySelector('.campaign-current').textContent === '01');
    // Failed images do not blank the active frame.
    const failed = await context.newPage();
    await failed.route('**/campaign-sport-*.webp', route => route.abort());
    await failed.goto('http://127.0.0.1:4173/', {waitUntil:'domcontentloaded'});
    await failed.locator('[data-slide="1"]').click();
    assert.equal(await failed.locator('.campaign-current').innerText(),'01');
    assert.equal(await failed.locator('.campaign-frame.is-active').count(),1);
    await failed.close();
    console.log('Carousel playback, controls and failed-image checks passed.');
    // Responsive routes: no horizontal overflow, and all local images resolve.
    for (const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:900});
      for (const route of ['index.html','anime.html','football.html','tv.html','motivation.html']) {
        await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'domcontentloaded'});
        await page.evaluate(() => document.fonts.ready);
        const size = await page.evaluate(() => ({viewport:innerWidth, content:document.documentElement.scrollWidth}));
        assert.ok(size.content <= size.viewport + 1,`${route}: overflow at ${width}: ${size.content}`);
        await page.locator('img').evaluateAll(async images => {
          await Promise.all(images.filter(i => {const r=i.getBoundingClientRect();return r.width>0 && r.height>0 && r.top<innerHeight;}).map(i => i.decode().catch(() => {})));
        });
        assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => i.complete && !i.naturalWidth).length),0,route);
      }
      console.log(`Responsive routes passed at ${width}px.`);
    }
    // Mobile menu, focus containment, cart, and checkout composition. No message is sent.
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('#mobile-menu').getAttribute('open'),'');
    await page.locator('.mobile-menu-close').click();
    await page.locator('.welcome-grid [data-product]').first().click();
    assert.equal(await page.locator('#product-dialog').getAttribute('open'),'');
    await page.locator('.dialog-add').click();
    await page.waitForFunction(() => document.querySelector('#cart-drawer').classList.contains('open'));
    assert.equal(await page.locator('.cart-count').first().innerText(),'1');
    assert.equal(await page.evaluate(() => document.activeElement.id),'cart-close');
    await page.locator('[data-delta="1"]').click();
    assert.match(await page.locator('#subtotal').innerText(),/500/);
    assert.match(await page.locator('#deposit').innerText(),/50/);
    assert.match(await page.locator('#balance').innerText(),/450/);
    await page.locator('#checkout-name').fill('Test Customer');
    await page.locator('#checkout-city').fill('Test City');
    await page.locator('#checkout-address').fill('Test Address 10');
    let composed;
    await context.route('https://wa.me/**', async route => {
      composed = new URL(route.request().url());
      await route.fulfill({status:200,contentType:'text/plain',body:'Checkout compose intercepted by the local test. No message sent.'});
    });
    const popupPromise=page.waitForEvent('popup');
    await page.locator('#whatsapp-order').click();
    const popup=await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    assert.ok(composed);
    const text = composed.searchParams.get('text');
    for(const value of ['Test Customer','Test City','Test Address 10','500','50','450']) assert.ok(text.includes(value),value);
    await popup.close();
    await page.locator('#cart-close').click();
    assert.equal(await page.locator('#cart-drawer').evaluate(el => el.inert),true);
    // Motion preference disables automatic movement without disabling manual navigation.
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('.campaign-toggle').isDisabled(),true);
    await page.locator('[data-slide="2"]').click();
    await page.waitForFunction(() => document.querySelector('.campaign-current').textContent === '03');
    assert.equal(await page.locator('.campaign-hero').evaluate(el => el.classList.contains('is-running')),false);
    assert.deepEqual(errors,[]);
    console.log('PASS: 20 responsive route views, autoplay, manual pause, wrap, failed-image fallback, menu, cart/focus, checkout composition, and reduced motion.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;}).finally(() => {server.kill();});
