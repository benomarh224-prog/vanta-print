const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const js = fs.readFileSync('dist/app.js', 'utf8');
const head = js.slice(0, js.indexOf('function showToast'));
const order = js.slice(js.indexOf('function orderText(){'), js.indexOf('async function copyOrder'));
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
assert.match(offer, /التوصيل: مجاني/);
assert.match(offer, /Houssam Test/);
assert.match(offer, /Casablanca/);
assert.match(offer, /Rue Test 10/);
const mixed = message([{id:'welcome-zenin',name:'هودي Zenin الأسود',price:250,qty:1,size:'L',color:'أسود'},{id:'anime-tee',name:'تيشيرت',price:149,qty:1,size:'M',color:'أبيض'}]);
assert.match(mixed, /399 د\.م/);
assert.match(mixed, /التوصيل: كيتأكد/);
const html = fs.readFileSync('dist/index.html','utf8');
for(const id of ['welcome-grid','checkout-form','checkout-name','checkout-city','checkout-address','checkout-text']) assert.ok(html.includes(`id="${id}"`), id);
console.log('Offer order summary, shipping, customer fields, and checkout structure: OK');
