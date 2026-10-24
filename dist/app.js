const UNIT_PRICE = 250;
const ORDER_DEPOSIT = 50;
const products = [
  { id:'welcome-keffiyeh', name:'هودي الكوفية الأبيض', category:'welcome', type:'هودي', tag:'NOXWEAR / WELCOME', price:UNIT_PRICE, image:'assets/welcome-keffiyeh-hoodie.jpg', badge:'عرض ترحيبي', welcomeOffer:true, desc:'هودي أبيض بطبعة الكوفية على الظهر. الثمن 250 د.م والتوصيل مجاني ضمن العرض الترحيبي.', sizes:['S','M','L','XL','XXL'], colors:['أبيض'] },
  { id:'welcome-zenin', name:'هودي Zenin الأسود', category:'anime', type:'هودي', tag:'ANIME / WELCOME', price:UNIT_PRICE, image:'assets/welcome-zenin-hoodie.jpg', badge:'عرض ترحيبي', welcomeOffer:true, desc:'هودي أسود برسمة أنمي بالأبيض والأحمر على الظهر. الثمن 250 د.م والتوصيل مجاني ضمن العرض الترحيبي.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'welcome-motorsport', name:'هودي سيارة رياضية الأسود', category:'welcome', type:'هودي', tag:'MOTORSPORT / WELCOME', price:UNIT_PRICE, image:'assets/welcome-motorsport-hoodie.jpg', badge:'عرض ترحيبي', welcomeOffer:true, desc:'هودي أسود بطبعة سيارة رياضية على الظهر. الثمن 250 د.م والتوصيل مجاني ضمن العرض الترحيبي.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'welcome-anime-white', name:'هودي أنمي الأبيض', category:'anime', type:'هودي', tag:'ANIME / WELCOME', price:UNIT_PRICE, image:'assets/welcome-anime-white-hoodie.jpg', badge:'عرض ترحيبي', welcomeOffer:true, desc:'هودي أبيض برسمة أنمي بالأسود على الظهر. الثمن 250 د.م والتوصيل مجاني ضمن العرض الترحيبي.', sizes:['S','M','L','XL','XXL'], colors:['أبيض'] },
  { id:'anime-tee', name:'تيشيرت Night Warrior', category:'anime', type:'تيشيرت', tag:'ANIME / TEE', price:UNIT_PRICE, image:'assets/anime-shirt.jpg', badge:'الأكثر طلباً', desc:'رسمة أصلية مستوحاة من طاقة الأنمي، على تيشيرت كاجوال بطبع واضح وحضور قوي.', sizes:['S','M','L','XL','XXL'], colors:['أسود','أبيض'] },
  { id:'anime-manga-eyes', name:'هودي عيون المانغا', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-manga-eyes-hoodie.jpg', badge:'جديد', desc:'هودي أسود بثلاث لقطات عيون مانغا بالأبيض والأسود على الصدر.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-dual-panels', name:'هودي الإطار المزدوج', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-dual-panels-hoodie.jpg', badge:'جديد', desc:'هودي أسود بلوحتين مانغا على الصدر وكتابة بيضاء على الأكمام.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-crimson-shadow', name:'هودي الظل القرمزي', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-crimson-shadow-hoodie.jpg', badge:'جديد', desc:'هودي أسود بطبعة شخصية أنمي بالأحمر والأبيض على الظهر والأكمام.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-white-sorcerer', name:'هودي الساحر الأبيض', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-white-sorcerer-hoodie.jpg', badge:'', desc:'هودي أسود برسمة مانغا بيضاء كبيرة وكتابة على الأكمام.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-silver-vision', name:'تيشيرت النظرة الفضية', category:'anime', type:'تيشيرت', tag:'ANIME / TEE', price:UNIT_PRICE, image:'assets/anime-silver-vision-tee.jpg', badge:'', desc:'تيشيرت رمادي بطبعة صغيرة من الأمام ورسمة مانغا كبيرة على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['رمادي'] },
  { id:'anime-red-moon', name:'هودي القمر الأحمر', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-red-moon-hoodie.jpg', badge:'', desc:'هودي أسود بتصميم أمامي صغير ومشهد أحمر كبير على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-titan-panels', name:'هودي لوحات العمالقة', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-titan-panels-hoodie.jpg', badge:'', desc:'هودي أسود بثلاث لوحات مانغا بالأبيض والأسود وكتابة على الأكمام.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-scarlet-eyes', name:'هودي العين القرمزية', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-scarlet-eyes-hoodie.jpg', badge:'', desc:'هودي أسود بطبعة عيون مانغا بالأبيض والأحمر على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-black-sword', name:'هودي السيف الأسود', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-black-sword-hoodie.jpg', badge:'', desc:'هودي أسود بعيون مانغا على الصدر ورمز أبيض كبير على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'anime-emerald-wings', name:'هودي الأجنحة الخضراء', category:'anime', type:'هودي', tag:'ANIME / HOODIE', price:UNIT_PRICE, image:'assets/anime-emerald-wings-hoodie.jpg', badge:'', desc:'هودي أخضر داكن بشعار جناحين صغير على الصدر وطبعة كبيرة على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['أخضر داكن'] },
  { id:'football-hoodie', name:'هودي Stadium Energy', category:'football', type:'هودي', tag:'SPORT / HOODIE', price:UNIT_PRICE, image:'assets/football-hoodie.jpg', badge:'جديد', desc:'أجواء الملعب والشغف ديال الكرة في هودي مريح بستايل يومي.', sizes:['S','M','L','XL','XXL'], colors:['كريمي','أسود'] },
  { id:'anime-canvas', name:'طابلو Neon City', category:'anime', type:'طابلو', tag:'ANIME / CANVAS', price:UNIT_PRICE, image:'assets/anime-canvas.jpg', badge:'فن الحائط', desc:'مدينة خيالية بإضاءة غروب قوية كتزيد جو مختلف للحائط ديالك.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار أسود','بلا إطار'] },
  { id:'football-canvas', name:'طابلو Match Night', category:'football', type:'طابلو', tag:'SPORT / CANVAS', price:UNIT_PRICE, image:'assets/football-canvas.jpg', badge:'', desc:'لحظة من سحر الملعب تحت الأضواء، مناسبة لأي عاشق للكرة.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار أسود','بلا إطار'] },
  { id:'motivation-yemen-hoodie', name:'هودي اليمن الذهبي', category:'motivation', type:'هودي', tag:'ARABIC ART / HOODIE', price:UNIT_PRICE, image:'assets/motivation-yemen-gold-hoodie.jpg', badge:'جديد', desc:'هودي أسود بكتابة عربية ذهبية وتفاصيل مستوحاة من اليمن.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] },
  { id:'motivation-deer-hoodie', name:'هودي عيون الغزال', category:'motivation', type:'هودي', tag:'ARABIC ART / HOODIE', price:UNIT_PRICE, image:'assets/motivation-deer-hoodie.jpg', badge:'جديد', desc:'هودي كريمي برسمة غزال وعبارة عربية على الظهر.', sizes:['S','M','L','XL','XXL'], colors:['كريمي'] },
  { id:'motivation-heart-hoodie', name:'هودي نبض القلب', category:'motivation', type:'هودي', tag:'ARABIC ART / HOODIE', price:UNIT_PRICE, image:'assets/motivation-heart-hoodies.jpg', badge:'جديد', desc:'هودي بتصميم قلب وكتابة عربية، باختيار اللون البني أو الكريمي.', sizes:['S','M','L','XL','XXL'], colors:['بني','كريمي'] },
  { id:'motivation-tee', name:'تيشيرت Beyond Limits', category:'motivation', type:'تيشيرت', tag:'ARABIC ART / TEE', price:UNIT_PRICE, image:'assets/motivation-shirt.jpg', badge:'', desc:'رسمة كتفكرك أن كل قمة كتبدأ بخطوة، بطبعة جريئة على تيشيرت أسود.', sizes:['S','M','L','XL','XXL'], colors:['أسود','أبيض'] },
  { id:'motivation-canvas', name:'طابلو Rise Higher', category:'motivation', type:'طابلو', tag:'ARABIC ART / CANVAS', price:UNIT_PRICE, image:'assets/motivation-canvas.jpg', badge:'مميز', desc:'مشهد القمة والشمس كيضيف طاقة إيجابية لمساحتك كل نهار.', sizes:['30×40 سم','40×60 سم','60×90 سم'], colors:['إطار خشبي','بلا إطار'] },
  { id:'tv-noir-hoodie', name:'هودي Noir Story', category:'tv', type:'هودي', tag:'TV SERIES / HOODIE', price:UNIT_PRICE, image:'assets/world-tv-color.png', badge:'جديد', desc:'هودي أسود بتصميم درامي أصلي مستوحى من أجواء المسلسلات.', sizes:['S','M','L','XL','XXL'], colors:['أسود'] }
];
const basePrices = {'تيشيرت':UNIT_PRICE,'هودي':UNIT_PRICE,'طابلو':UNIT_PRICE,'توت باغ':UNIT_PRICE};
const $ = (q,root=document) => root.querySelector(q);
const $$ = (q,root=document) => [...root.querySelectorAll(q)];
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => `${Number(n).toLocaleString('fr-MA')} د.م`;
let cart = [];
try { const saved=JSON.parse(localStorage.getItem('noxwear-cart') ?? localStorage.getItem('vanta-cart') ?? '[]'); if(Array.isArray(saved)) cart=saved.filter(x=>x&&typeof x.name==='string'&&Number.isFinite(x.price)&&x.qty>0).slice(0,100).map(x=>({...x,price:UNIT_PRICE})); } catch {}
function cartPricing(items=cart){
  const itemsTotal=items.reduce((sum,item)=>sum+item.price*item.qty,0);
  const hoodieCount=items.reduce((sum,item)=>sum+(products.find(product=>product.id===item.id)?.type==='هودي'||item.name.includes('هودي')?item.qty:0),0);
  const discount=Math.floor(hoodieCount/2)*50;
  const total=itemsTotal-discount;
  const deposit=total?Math.min(ORDER_DEPOSIT,total):0;
  return {itemsTotal,discount,total,deposit,balance:total-deposit};
}
let activeFilter='all';
let toastTimer;

function showToast(message){ const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200); }
function saveCart(){localStorage.setItem('noxwear-cart',JSON.stringify(cart));renderCart();}
function productCard(p){return `<article class="product-card reveal in-view"><button class="product-image product-open" type="button" data-product="${p.id}" aria-label="شوف تفاصيل ${esc(p.name)}"><img src="${p.image}" alt="" loading="lazy">${p.badge?`<span class="product-badge">${esc(p.badge)}</span>`:''}<span class="product-open-label" aria-hidden="true">شوف التفاصيل</span></button><div class="product-info"><div><small>${p.tag}</small><h3>${esc(p.name)}</h3><span class="offer-delivery">التوصيل مجاني</span></div><strong class="product-price">${money(p.price)}</strong></div></article>`;}
function renderWelcomeOffers(){const grid=$('#welcome-grid');if(grid)grid.innerHTML=products.filter(p=>p.welcomeOffer).map(productCard).join('');}
function renderProducts(visible){
  if (!$('#product-grid')) return;
  $('#product-grid').innerHTML=visible.map(productCard).join('');
  if ($('.result-count')) $('.result-count').textContent=`${visible.length} ${visible.length===1?'منتج':visible.length===2?'منتجان':visible.length<=10?'منتجات':'منتج'}`;
}
function setFilter(filter){
  if(filter==='custom'){const custom=$('#custom');if(custom)custom.scrollIntoView({behavior:'smooth'});else location.href='index.html#custom';return;}
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
  $('#dialog-content').innerHTML=`<div class="dialog-grid"><div class="dialog-media"><img src="${p.image}" alt="${esc(p.name)}"><span class="dialog-media-tag">NOXwear / ${esc(p.type)}</span></div><div class="dialog-detail"><div class="dialog-detail-main"><small class="dialog-eyebrow">${esc(p.tag)}</small><h2>${esc(p.name)}</h2><p class="dialog-description">${esc(p.desc)}</p><div class="choice-label">${p.type==='طابلو'?'القياس':'المقاس'}</div><div class="choice-row" data-choice="size">${p.sizes.map((s,i)=>`<button class="choice ${i===0?'selected':''}" type="button" data-value="${esc(s)}">${esc(s)}</button>`).join('')}</div><div class="choice-label">${p.type==='طابلو'?'الإطار':'اللون'}</div><div class="choice-row" data-choice="color">${p.colors.map((c,i)=>`<button class="choice ${i===0?'selected':''}" type="button" data-value="${esc(c)}">${esc(c)}</button>`).join('')}</div><p class="dialog-hint">تبديل المقاس متاح. تأكيد الطلب كيتطلب تسبيق 50 د.م على الطلب كامل.</p></div><div class="dialog-purchase"><div class="dialog-purchase-price"><small>الثمن</small><strong class="dialog-price">${money(p.price)}</strong><span>التوصيل مجاني</span></div><button class="dialog-add" type="button" data-add="${p.id}">زيد للسلة <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg></button></div></div></div>`;
  dialog.showModal();document.body.classList.add('locked');
}
function addItem(item){const key=[item.id,item.size,item.color,item.desc||''].join('|');const found=cart.find(x=>x.key===key);if(found)found.qty++;else cart.push({...item,key,qty:1});saveCart();showToast('تزادت القطعة للسلة');}
function openCart(){renderCart();$('#overlay').hidden=false;requestAnimationFrame(()=>$('#overlay').classList.add('visible'));$('#cart-drawer').classList.add('open');$('#cart-drawer').setAttribute('aria-hidden','false');document.body.classList.add('locked');}
function closeCart(){$('#overlay').classList.remove('visible');$('#cart-drawer').classList.remove('open');$('#cart-drawer').setAttribute('aria-hidden','true');document.body.classList.remove('locked');setTimeout(()=>{$('#overlay').hidden=true},250);}
function renderCart(){
  const count=cart.reduce((n,x)=>n+x.qty,0),pricing=cartPricing();
  $$('.cart-count').forEach(el=>{el.textContent=count;el.hidden=count===0});$('#drawer-count').textContent=`(${count})`;$('#subtotal').textContent=money(pricing.total);
  $('#items-total').textContent=money(pricing.itemsTotal);$('#hoodie-discount-row').hidden=!pricing.discount;$('#hoodie-discount').textContent=`−${money(pricing.discount)}`;
  $('#deposit').textContent=money(pricing.deposit);$('#balance').textContent=money(pricing.balance);
  $('#cart-items').innerHTML=count?cart.map((x,i)=>`<div class="cart-item"><img src="${esc(x.image||'assets/hero.jpg')}" alt=""><div><h3>${esc(x.name)}</h3><p>${esc([x.size,x.color].filter(Boolean).join(' / '))}</p>${x.desc?`<p>${esc(x.desc).slice(0,150)}</p>`:''}<div class="qty-controls"><button type="button" data-qty="${i}" data-delta="-1" aria-label="نقص الكمية">−</button><span>${x.qty}</span><button type="button" data-qty="${i}" data-delta="1" aria-label="زيد الكمية">+</button></div></div><div><strong>${money(x.price*x.qty)}</strong><button class="remove" type="button" data-remove="${i}">حذف</button></div></div>`).join(''):`<div class="empty-cart"><span>◈</span><strong>السلة باقية خاوية</strong><p>زيد شي قطعة عجبتك وبدا حضّر الطلب ديالك.</p></div>`;
  $('#shipping-note').textContent='التوصيل مجاني لجميع المدن خلال 24–48 ساعة بعد تأكيد الطلب. طريقة أداء التسبيق كنأكدوها فواتساب.';
  $('#subtotal-label').textContent='مجموع الطلب';
  $('#whatsapp-order').disabled=!count;
}
function orderText(){
  const lines=['سلام، بغيت نكمل طلب من NOXwear:',''];
  cart.forEach((x,i)=>{lines.push(`${i+1}. ${x.name}`);lines.push(`   المقاس/القياس: ${x.size||'يتحدد لاحقاً'} | اللون/الإطار: ${x.color||'يتحدد لاحقاً'}`);lines.push(`   الكمية: ${x.qty} | الثمن: ${money(x.price*x.qty)}`);if(x.desc)lines.push(`   الفكرة: ${x.desc}`)});
  const pricing=cartPricing();
  lines.push('',`ثمن القطع: ${money(pricing.itemsTotal)}`);
  if(pricing.discount)lines.push(`خصم جوج هوديات: −${money(pricing.discount)}`);
  lines.push(`المجموع: ${money(pricing.total)}`,`التسبيق لتأكيد الطلب: ${money(pricing.deposit)} على الطلب كامل (طريقة الأداء كتتأكد فواتساب)`,`الباقي عند التسليم: ${money(pricing.balance)}`,'التوصيل: مجاني لجميع المدن خلال 24–48 ساعة بعد تأكيد الطلب','تبديل المقاس: متاح');
  const form=$('#checkout-form');if(form){const name=$('#checkout-name').value.trim(),city=$('#checkout-city').value.trim(),address=$('#checkout-address').value.trim();if(name)lines.push(`الاسم: ${name}`);if(city)lines.push(`المدينة: ${city}`);if(address)lines.push(`العنوان: ${address}`);}
  return lines.join('\n');
}
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
$('#checkout-form').addEventListener('submit',e=>{if(!cart.length){e.preventDefault();return;}$('#checkout-text').value=orderText();});
$('.dialog-close').addEventListener('click',()=>$('#product-dialog').close());
$('#product-dialog').addEventListener('close',()=>document.body.classList.remove('locked'));
$('#product-dialog').addEventListener('click',e=>{if(e.target===$('#product-dialog'))$('#product-dialog').close()});
if($('#custom-form')) $('#custom-form').addEventListener('submit',e=>{e.preventDefault();const type=$('#custom-type').value,style=$('#custom-style').value,desc=$('#custom-desc').value.trim();if(!desc)return;addItem({id:'custom-'+type,name:'طباعة خاصة — '+type,price:basePrices[type],image:'assets/hero.jpg',size:'يحدد لاحقاً',color:style,desc});e.target.reset();openCart();});
const menuToggle=$('.menu-toggle'), mobileMenu=$('#mobile-menu');
function closeMenu(returnFocus=true){
  if(!mobileMenu.open)return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.close();
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','افتح القائمة');
  if(returnFocus)menuToggle.focus({preventScroll:true});
}
menuToggle.addEventListener('click',()=>{
  if(mobileMenu.open){closeMenu();return;}
  mobileMenu.showModal();
  document.body.classList.add('menu-open');
  menuToggle.setAttribute('aria-expanded','true');
  menuToggle.setAttribute('aria-label','سدّ القائمة');
  requestAnimationFrame(()=>mobileMenu.classList.add('is-open'));
  $('.mobile-menu-close').focus({preventScroll:true});
});
$('.mobile-menu-close').addEventListener('click',()=>closeMenu());
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>closeMenu(false)));
mobileMenu.addEventListener('cancel',e=>{e.preventDefault();closeMenu()});
mobileMenu.addEventListener('click',e=>{const r=mobileMenu.getBoundingClientRect();if(e.target===mobileMenu&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeMenu()});
matchMedia('(min-width: 821px)').addEventListener('change',e=>{if(e.matches)closeMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#cart-drawer').classList.contains('open'))closeCart()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.09});$$('.reveal').forEach(el=>observer.observe(el));
renderWelcomeOffers();setFilter(document.body.dataset.world || 'all');renderCart();
const styleMarquee=$('.style-marquee');
if(styleMarquee){
  let marqueeVisible=false;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const syncMarquee=()=>styleMarquee.classList.toggle('is-playing',marqueeVisible&&!document.hidden&&!reducedMotion.matches);
  new IntersectionObserver(entries=>{marqueeVisible=entries[0].isIntersecting;syncMarquee()},{threshold:.05}).observe(styleMarquee);
  document.addEventListener('visibilitychange',syncMarquee);
  reducedMotion.addEventListener('change',syncMarquee);
}
