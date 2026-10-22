const products = [
  { id:'anime-tee', name:'تيشيرت Night Warrior', category:'anime', type:'تيشيرت', tag:'ANIME / TEE', price:149, image:'assets/anime-shirt.jpg', badge:'الأكثر طلباً', desc:'رسمة أصلية مستوحاة من طاقة الأنمي، على تيشيرت كاجوال بطبع واضح وحضور قوي.', sizes:['S','M','L','XL','XXL'], colors:['أسود','أبيض'] },
  { id:'football-hoodie', name:'هودي Stadium Energy', category:'football', type:'هودي', tag:'FOOTBALL / HOODIE', price:279, image:'assets/football-hoodie.jpg', badge:'جديد', desc:'أجواء الملعب والشغف ديال الكرة في هودي مريح بستايل يومي.', sizes:['S','M','L','XL','XXL'], colors:['كريمي','أسود'] },
  { id:'anime-canvas', name:'طابلو Neon City', category:'anime', type:'طابلو', tag:'ANIME / CANVAS', price:199, image:'assets/anime-canvas.jpg', badge:'فن الحائط', desc:'مدينة خيالية بإضاءة غروب قوية كتزيد جو مختلف للحائط ديالك.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار أسود','بلا إطار'] },
  { id:'football-canvas', name:'طابلو Match Night', category:'football', type:'طابلو', tag:'FOOTBALL / CANVAS', price:199, image:'assets/football-canvas.jpg', badge:'', desc:'لحظة من سحر الملعب تحت الأضواء، مناسبة لأي عاشق للكرة.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار أسود','بلا إطار'] },
  { id:'motivation-tee', name:'تيشيرت Beyond Limits', category:'motivation', type:'تيشيرت', tag:'MOTIVATION / TEE', price:149, image:'assets/motivation-shirt.jpg', badge:'', desc:'رسمة كتفكرك أن كل قمة كتبدأ بخطوة، بطبعة جريئة على تيشيرت أسود.', sizes:['S','M','L','XL','XXL'], colors:['أسود','أبيض'] },
  { id:'motivation-canvas', name:'طابلو Rise Higher', category:'motivation', type:'طابلو', tag:'MOTIVATION / CANVAS', price:199, image:'assets/motivation-canvas.jpg', badge:'مميز', desc:'مشهد القمة والشمس كيضيف طاقة إيجابية لمساحتك كل نهار.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار خشبي','بلا إطار'] }
];
const basePrices = {'تيشيرت':149,'هودي':279,'طابلو':199,'توت باغ':99};
const $ = (q,root=document) => root.querySelector(q);
const $$ = (q,root=document) => [...root.querySelectorAll(q)];
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => `${Number(n).toLocaleString('fr-MA')} د.م`;
let cart = [];
try { const saved=JSON.parse(localStorage.getItem('vanta-cart')||'[]'); if(Array.isArray(saved)) cart=saved.filter(x=>x&&typeof x.name==='string'&&Number.isFinite(x.price)&&x.qty>0).slice(0,100); } catch {}
let activeFilter='all';
let toastTimer;

function showToast(message){ const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200); }
function saveCart(){localStorage.setItem('vanta-cart',JSON.stringify(cart));renderCart();}
function renderProducts(visible){
  $('#product-grid').innerHTML=visible.map(p=>`<article class="product-card reveal in-view"><div class="product-image"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy">${p.badge?`<span class="product-badge">${esc(p.badge)}</span>`:''}<button class="product-action" type="button" data-product="${p.id}" aria-label="شوف تفاصيل ${esc(p.name)}">↗</button></div><div class="product-info"><div><small>${p.tag}</small><h3>${esc(p.name)}</h3></div><strong class="product-price">${money(p.price)}</strong></div></article>`).join('');
  $('.result-count').textContent=`${visible.length} ${visible.length===1?'منتج':'منتجات'}`;
}
function setFilter(filter){
  if(filter==='custom'){document.getElementById('custom').scrollIntoView({behavior:'smooth'});return;}
  activeFilter=filter;
  $$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  renderProducts(filter==='all'?products:products.filter(p=>p.category===filter));
}
function setTypeFilter(type){
  activeFilter='type:'+type;
  $$('.filter').forEach(b=>b.classList.remove('active'));
  renderProducts(products.filter(p=>p.type===type));
}
function openDialog(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const dialog=$('#product-dialog');
  $('#dialog-content').innerHTML=`<div class="dialog-grid"><img src="${p.image}" alt="${esc(p.name)}"><div class="dialog-detail"><small>${p.tag}</small><h2>${esc(p.name)}</h2><p>${esc(p.desc)}</p><strong class="dialog-price">ابتداءً من ${money(p.price)}</strong><div class="choice-label">${p.type==='طابلو'?'القياس':'المقاس'}</div><div class="choice-row" data-choice="size">${p.sizes.map((s,i)=>`<button class="choice ${i===0?'selected':''}" type="button" data-value="${esc(s)}">${esc(s)}</button>`).join('')}</div><div class="choice-label">${p.type==='طابلو'?'الإطار':'اللون'}</div><div class="choice-row" data-choice="color">${p.colors.map((c,i)=>`<button class="choice ${i===0?'selected':''}" type="button" data-value="${esc(c)}">${esc(c)}</button>`).join('')}</div><button class="button button-dark dialog-add" type="button" data-add="${p.id}">زيد للسلة <span>↗</span></button><p class="dialog-hint">الثمن تقريبي وكيختلف حسب المقاس والتخصيص.</p></div></div>`;
  dialog.showModal();document.body.classList.add('locked');
}
function addItem(item){const key=[item.id,item.size,item.color,item.desc||''].join('|');const found=cart.find(x=>x.key===key);if(found)found.qty++;else cart.push({...item,key,qty:1});saveCart();showToast('تزادت القطعة للسلة');}
function openCart(){renderCart();$('#overlay').hidden=false;requestAnimationFrame(()=>$('#overlay').classList.add('visible'));$('#cart-drawer').classList.add('open');$('#cart-drawer').setAttribute('aria-hidden','false');document.body.classList.add('locked');}
function closeCart(){$('#overlay').classList.remove('visible');$('#cart-drawer').classList.remove('open');$('#cart-drawer').setAttribute('aria-hidden','true');document.body.classList.remove('locked');setTimeout(()=>{$('#overlay').hidden=true},250);}
function renderCart(){
  const count=cart.reduce((n,x)=>n+x.qty,0),subtotal=cart.reduce((n,x)=>n+x.price*x.qty,0);
  $$('.cart-count').forEach(el=>{el.textContent=count;el.hidden=count===0});$('#drawer-count').textContent=`(${count})`;$('#subtotal').textContent=money(subtotal);
  $('#cart-items').innerHTML=count?cart.map((x,i)=>`<div class="cart-item"><img src="${esc(x.image||'assets/hero.jpg')}" alt=""><div><h3>${esc(x.name)}</h3><p>${esc([x.size,x.color].filter(Boolean).join(' / '))}</p>${x.desc?`<p>${esc(x.desc).slice(0,150)}</p>`:''}<div class="qty-controls"><button type="button" data-qty="${i}" data-delta="-1" aria-label="نقص الكمية">−</button><span>${x.qty}</span><button type="button" data-qty="${i}" data-delta="1" aria-label="زيد الكمية">+</button></div></div><div><strong>${money(x.price*x.qty)}</strong><button class="remove" type="button" data-remove="${i}">حذف</button></div></div>`).join(''):`<div class="empty-cart"><span>◈</span><strong>السلة باقية خاوية</strong><p>زيد شي قطعة عجبتك وبدا حضّر الطلب ديالك.</p></div>`;
  $('#copy-order').disabled=!count;$('#download-order').disabled=!count;
}
function orderText(){const lines=['VANTA PRINT — ملخص طلب تجريبي',''];cart.forEach((x,i)=>{lines.push(`${i+1}. ${x.name}`);lines.push(`   ${[x.size,x.color].filter(Boolean).join(' / ')} | الكمية: ${x.qty} | ${money(x.price*x.qty)}`);if(x.desc)lines.push(`   الفكرة: ${x.desc}`)});lines.push('',`المجموع التقريبي: ${money(cart.reduce((n,x)=>n+x.price*x.qty,0))}`,'','الأثمنة نهائية بعد تأكيد التفاصيل مع المتجر.');return lines.join('\n');}
async function copyOrder(){if(!cart.length)return;try{await navigator.clipboard.writeText(orderText());showToast('تنسخ ملخص الطلب');}catch{const textArea=document.createElement('textarea');textArea.value=orderText();document.body.append(textArea);textArea.select();document.execCommand('copy');textArea.remove();showToast('تنسخ ملخص الطلب');}}
function downloadOrder(){if(!cart.length)return;const blob=new Blob(['\ufeff'+orderText()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='vanta-print-order.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('تحمّل ملخص الطلب');}

document.addEventListener('click',e=>{
  const typeLink=e.target.closest('[data-type-link]');if(typeLink){setTypeFilter(typeLink.dataset.typeLink);return;}
  const filter=e.target.closest('[data-filter]');if(filter){setFilter(filter.dataset.filter);return;}
  const filterLink=e.target.closest('[data-filter-link]');if(filterLink){setFilter(filterLink.dataset.filterLink);}
  const product=e.target.closest('[data-product]');if(product){openDialog(product.dataset.product);return;}
  const choice=e.target.closest('.choice');if(choice){$$('.choice',choice.parentElement).forEach(x=>x.classList.remove('selected'));choice.classList.add('selected');return;}
  const add=e.target.closest('[data-add]');if(add){const p=products.find(x=>x.id===add.dataset.add);const d=$('#dialog-content');addItem({id:p.id,name:p.name,price:p.price,image:p.image,size:$('.choice-row[data-choice="size"] .selected',d)?.dataset.value,color:$('.choice-row[data-choice="color"] .selected',d)?.dataset.value});$('#product-dialog').close();document.body.classList.remove('locked');openCart();return;}
  const qty=e.target.closest('[data-qty]');if(qty){const i=Number(qty.dataset.qty);cart[i].qty+=Number(qty.dataset.delta);if(cart[i].qty<=0)cart.splice(i,1);saveCart();return;}
  const remove=e.target.closest('[data-remove]');if(remove){cart.splice(Number(remove.dataset.remove),1);saveCart();return;}
});
$$('.filter').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
$$('.cart-toggle,.footer-cart').forEach(b=>b.addEventListener('click',openCart));
$('#cart-close').addEventListener('click',closeCart);$('#overlay').addEventListener('click',closeCart);
$('#copy-order').addEventListener('click',copyOrder);$('#download-order').addEventListener('click',downloadOrder);
$('.dialog-close').addEventListener('click',()=>$('#product-dialog').close());
$('#product-dialog').addEventListener('close',()=>document.body.classList.remove('locked'));
$('#product-dialog').addEventListener('click',e=>{if(e.target===$('#product-dialog'))$('#product-dialog').close()});
$('#custom-form').addEventListener('submit',e=>{e.preventDefault();const type=$('#custom-type').value,style=$('#custom-style').value,desc=$('#custom-desc').value.trim();if(!desc)return;addItem({id:'custom-'+type,name:'طباعة خاصة — '+type,price:basePrices[type],image:'assets/hero.jpg',size:'يحدد لاحقاً',color:style,desc});e.target.reset();openCart();});
$('.menu-toggle').addEventListener('click',()=>{const menu=$('.mobile-nav');const isOpen=!menu.hidden;menu.hidden=isOpen;$('.menu-toggle').setAttribute('aria-expanded',String(!isOpen));});
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{$('.mobile-nav').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#cart-drawer').classList.contains('open'))closeCart()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.09});$$('.reveal').forEach(el=>observer.observe(el));
setFilter('all');renderCart();
