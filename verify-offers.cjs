const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const js = fs.readFileSync('dist/app.js', 'utf8');
const head = js.slice(0, js.indexOf('function showToast'));
const order = js.slice(js.indexOf('function orderText(){'), js.indexOf("document.addEventListener('click'"));
function message(cart) {
  const fields = {'#checkout-name':'Houssam Test','#checkout-city':'Casablanca','#checkout-address':'Rue Test 10'};
  const context = {
    localStorage: {getItem:key=>key==='noxwear-cart'?JSON.stringify(cart):null},
    document: {querySelector:selector=>selector==='#checkout-form'?{}:{value:fields[selector]??''}},
  };
  vm.runInNewContext(head + order + 'globalThis.result = orderText();', context);
  return context.result;
}
const offer = message([{id:'welcome-zenin',name:'هودي Zenin الأسود',price:250,qty:2,size:'L',color:'أسود'}]);
assert.match(offer, /500 د\.م/);
assert.match(offer, /خصم جوج هوديات: −50 د\.م/);
assert.match(offer, /المجموع: 450 د\.م/);
assert.match(offer, /الباقي عند التسليم: 400 د\.م/);
assert.match(offer, /التوصيل: مجاني/);
assert.match(offer, /Houssam Test/);
assert.match(offer, /Casablanca/);
assert.match(offer, /Rue Test 10/);
const mixed = message([{id:'welcome-zenin',name:'هودي Zenin الأسود',price:250,qty:1,size:'L',color:'أسود'},{id:'anime-tee',name:'تيشيرت',price:149,qty:1,size:'M',color:'أبيض'}]);
assert.match(mixed, /500 د\.م/); // Saved legacy prices are normalized to today's unit price.
assert.doesNotMatch(mixed, /خصم جوج هوديات/);
assert.match(mixed, /التوصيل: مجاني/);
assert.match(mixed, /التسبيق لتأكيد الطلب: 50 د\.م/);
assert.match(mixed, /الباقي عند التسليم: 450 د\.م/);
const fourHoodies = message([{id:'welcome-zenin',name:'هودي Zenin الأسود',price:250,qty:4,size:'L',color:'أسود'}]);
assert.match(fourHoodies, /خصم جوج هوديات: −100 د\.م/);
assert.match(fourHoodies, /المجموع: 900 د\.م/);
const html = fs.readFileSync('dist/index.html','utf8');
for(const id of ['welcome-grid','checkout-form','checkout-name','checkout-city','checkout-address','checkout-text','items-total','hoodie-discount']) assert.ok(html.includes(`id="${id}"`), id);
console.log('Offer order summary, shipping, customer fields, and checkout structure: OK');
