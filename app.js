'use strict';
/* ===== ثوابت ===== */
const DAYS=['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
const EN=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
const TY={code:['برمجة','💻'],study:['مذاكرة','📚'],lesson:['درس','🎓'],kuttab:['كُتّاب','📖'],prayer:['صلاة','🕌'],gym:['جيم','🏋️'],sleep:['نوم','😴'],wake:['استيقاظ','☀️'],rest:['راحة','🛋️'],meal:['وجبة','🍽️'],transport:['مواصلات','🚌']};
const CATS={work:'شغل',study:'دراسة',personal:'شخصي',health:'صحة',other:'أخرى'};
const PRI={high:'عالية',medium:'متوسطة',low:'منخفضة'};
const QUOTES=['ابدأ من حيث أنت، بما معك، وافعل ما تستطيع.','القليل الدائم خير من الكثير المنقطع.','اللي بيكمل هو اللي بيوصل.','ركّز على الإنجاز مش على الانشغال.','يوم واحد كويس بيبني عادة كويسة.','لا تؤجل عمل اليوم إلى الغد.'];
const W='09:00-09:30|wake|الاستيقاظ|إفطار وتجهيز لبدء اليوم',G='20:00-22:00|gym|الجيم|يبدأ 7:30 أو 8:00 — العودة تقريبًا 10:00',Z='23:00-23:30|sleep|النوم|الهدف: 11:00 أو 11:30 مساءً',
KU='|kuttab|الكُتّاب|الأحد والاثنين والأربعاء',ML='19:00-19:30|meal|الغداء|حوالي 7:00 مساءً',FE='جلسة برمجة متواصلة';
const RAW={
السبت:[W,'10:00-12:00|study|Arabic — مذاكرة|مذاكرة الجديد وحل الواجب','12:00-14:00|study|Science — مراجعة|مراجعة أو واجب متأخر','14:30-16:30|lesson|Studies — درس|ينتهي 4:00 وقد يمتد إلى 4:30','16:30-18:00|code|Frontend Recovery|'+FE,'18:00-19:30|rest|الوقت الحر + الغداء|الغداء حوالي 7:00',G,Z],
الأحد:[W,'10:00-12:00|study|English — مذاكرة|مذاكرة + حل واجب','12:00-13:30|study|Math — مراجعة|مراجعة خفيفة على القديم','13:30-14:00|transport|المواصلات إلى درس Math|حوالي 30 دقيقة','14:00-16:00|lesson|Math — درس|ساعتان','16:30-17:30'+KU,'17:30-19:00|study|تعلم إنجليزي|خارج المنهج','19:00-20:00|meal|الغداء + وقت العائلة|راحة',G,Z],
الاثنين:[W,'10:00-12:00|study|Studies — مذاكرة|مراجعة درس الأحد + الواجب','12:00-14:00|study|Science — مراجعة|مراجعة القديم','14:00-14:45|code|Frontend Recovery|'+FE,'14:45-15:00|transport|المواصلات إلى الكُتّاب|10–15 دقيقة','15:00-16:00'+KU,'16:00-16:15|transport|العودة من الكُتّاب|10–15 دقيقة','16:30-17:00|transport|المواصلات إلى درس Arabic|حوالي 30 دقيقة','17:00-18:30|lesson|Arabic — درس|ساعة ونصف','18:30-19:00|transport|العودة من درس Arabic|حوالي 30 دقيقة',ML,G,Z],
الثلاثاء:[W,'10:00-12:00|study|Arabic — مذاكرة|الدرس + الواجب','12:00-13:30|study|Studies — مراجعة|مراجعة دراسات','13:30-14:00|transport|المواصلات إلى درس Science|حوالي 15 دقيقة','14:00-17:00|lesson|Science — درس|ثلاث ساعات','17:00-17:30|transport|العودة من درس Science|حوالي 15 دقيقة','17:30-19:00|study|تعلم إنجليزي|خارج المنهج',ML,G,Z],
الأربعاء:[W,'10:00-12:00|study|Science — مذاكرة|الدرس الجديد + واجب','12:00-13:30|study|Math — مذاكرة|مذاكرة + حل الواجب','13:30-14:30'+KU,'14:30-15:00|transport|المواصلات إلى درس Studies|حوالي 15 دقيقة','15:00-17:00|lesson|Studies — درس|ينتهي 6:00 وقد يمتد إلى 6:30','17:30-19:00|code|Frontend Recovery|'+FE,ML,G,Z],
الخميس:[W,'10:00-12:00|study|English — مراجعة|مراجعة + واجب','12:00-14:00|study|Arabic — مراجعة|مراجعة','14:00-15:00|study|تعلم إنجليزي|خارج المنهج','15:00-15:30|transport|المواصلات إلى درس English|حوالي 30 دقيقة','15:30-17:00|lesson|English — درس|ساعة ونصف','17:00-18:30|lesson|Arabic — درس|مباشرة بعد English','18:30-19:00|transport|العودة بعد الدروس|حوالي 30 دقيقة',ML,G,Z],
الجمعة:[W,'11:00-12:30|prayer|صلاة الجمعة|','12:30-13:00|rest|وقت حر وراحة|ترفيه خفيف','13:00-15:00|study|Studies — مذاكرة|الجديد والواجب','15:00-17:00|study|English — مذاكرة|الجديد + الواجب','17:00-17:30|meal|الغداء|','18:00-19:30|study|تعلم إنجليزي|خارج المنهج',G,Z]};
const DEF=()=>Object.fromEntries(DAYS.map((d,di)=>[d,RAW[d].map((s,i)=>{const[p,t,n,dd]=s.split('|');const[a,b]=p.split('-');return{id:di+'_'+i,a,b,t,n,d:dd||''}})]));

/* ===== التخزين: مصدر واحد للبيانات بيربط الروتين بالمهام ===== */
const KEY='hayati-v1';
let S;
try{S=JSON.parse(localStorage.getItem(KEY))}catch{}
S=Object.assign({sched:DEF(),done:{},tasks:[],notes:[],theme:null,city:'',qi:0,name:'',pom:{},notif:false,hist:{},fs:16,hue:236,hab:{list:[{id:'w',n:'مياه',ic:'💧',g:8},{id:'r',n:'قراءة',ic:'📖',g:1}],log:{}}},S||{});
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};
if((S.v||0)<2){S.sched=DEF();S.done={};S.v=2;save()}/* ترحيل: الجدول الجديد يحل محل القديم مرة واحدة */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mm=t=>{const[h,m]=t.split(':').map(Number);return h*60+m};
const f12=t=>{const[h,m]=t.split(':').map(Number);return(h%12||12)+':'+String(m).padStart(2,'0')};
const ap=t=>mm(t)<720?'ص':'م';
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const sorted=d=>S.sched[d].map((r,i)=>({...r,i})).sort((p,q)=>mm(p.a)-mm(q.a));
function now(){const d=new Date(),o={timeZone:'Africa/Cairo'};
 const wd=new Intl.DateTimeFormat('en-US',{...o,weekday:'long'}).format(d),ymd=new Intl.DateTimeFormat('en-CA',o).format(d);
 const[h,m]=new Intl.DateTimeFormat('en-GB',{...o,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d).split(':').map(Number);
 const idx=EN.indexOf(wd),ws=new Date(ymd+'T00:00:00Z');ws.setUTCDate(ws.getUTCDate()-idx);
 return{idx,day:DAYS[idx],min:h*60+m,week:ws.toISOString().slice(0,10),h,ymd}}
const doneOf=(d)=>{const w=now().week;S.done[w]??={};Object.keys(S.done).sort().slice(0,-8).forEach(k=>delete S.done[k]);return S.done[w][d]??={}};
const dayTasks=d=>S.tasks.filter(t=>t.day===d);
function stat(d){const dn=doneOf(d),r=S.sched[d].filter(x=>x.t!='transport'),t=dayTasks(d);
 const got=r.filter(x=>dn[x.id]).length+t.filter(x=>x.done).length,tot=r.length+t.length;
 return{got,tot,pct:tot?Math.round(got/tot*100):0}}
const toast=(m,undo)=>{const e=$('#toast');e.textContent=m;if(undo){const b=document.createElement('button');b.textContent='تراجع';b.onclick=()=>{undo();save();render();e.className=''};e.append(b)}e.className='show'+(undo?' act':'');clearTimeout(toast.t);toast.t=setTimeout(()=>e.className='',undo?5000:2200)};
const ping=(t,b)=>{navigator.vibrate?.(200);if(!(S.notif&&window.Notification&&Notification.permission=='granted'))return;const sw=navigator.serviceWorker;if(sw&&sw.controller)sw.ready.then(r=>r.showNotification(t,{body:b,icon:'icon.svg',tag:'hayati'}));else new Notification(t,{body:b})};

/* ===== حالة الواجهة ===== */
let SNAP=1,page=location.hash.slice(1)||'dash',day=now().day,editing=false,filter='all',WX=null,TQ='';const POM={mode:25,left:1500,run:false};
const PAGES=[['dash','لوحة التحكم','🏠'],['routine','الجدول','🗓️'],['tasks','المهام','✅'],['notes','الملاحظات','📝']];
const chip=(c,x)=>`<span class="chip" style="--c:var(--${c})">${x}</span>`;

/* ===== لوحة التحكم ===== */
function ribbon(d,n){const rs=sorted(d),dn=doneOf(d);
 const seg=rs.filter(r=>r.t!='transport').map(r=>{const a=mm(r.a),b=mm(r.b);return`<i class="${dn[r.id]?'dn':''}" style="--c:var(--${r.t});inset-inline-start:${a/14.4}%;width:${(b-a)/14.4}%" title="${esc(r.n)}"></i>`}).join('');
 return`<div class="ribbon">${seg}${d==n.day?`<b style="inset-inline-start:${n.min/14.4}%"></b>`:''}</div><div class="ticks"><span>12 ص</span><span>6 ص</span><span>12 م</span><span>6 م</span><span>12 ص</span></div>`}
const fm=m=>m>=60?Math.floor(m/60)+'س'+(m%60?' '+m%60+'د':''):m+'د';
function dash(){const n=now(),td=stat(n.day),_h=(S.hist[n.ymd]=td.pct),rs=sorted(n.day),cur=rs.find(r=>n.min>=mm(r.a)&&n.min<mm(r.b)),nx=rs.find(r=>mm(r.a)>n.min);
 const wk=DAYS.map((d,i)=>({d,i,...(i<=n.idx?stat(d):{pct:0,tot:0})}));
 let stk=0;for(let k=0;k<60;k++){const d=new Date(n.ymd+'T00:00:00Z');d.setUTCDate(d.getUTCDate()-k);if(S.hist[d.toISOString().slice(0,10)]>=70)stk++;else if(k>0)break}
 const wp=Math.round(wk.filter(x=>x.i<=n.idx).reduce((s,x)=>s+x.pct,0)/(n.idx+1));
 const pend=S.tasks.filter(t=>!t.done).sort((a,b)=>'hml'.indexOf(a.pri[0])-'hml'.indexOf(b.pri[0]));
 const hrs={};DAYS.forEach(d=>S.sched[d].forEach(r=>{if(['code','study','lesson','kuttab','gym'].includes(r.t))hrs[r.t]=(hrs[r.t]||0)+(mm(r.b)-mm(r.a))/60}));
 const mx=Math.max(...Object.values(hrs),1);
 const g=n.h<12?'صباح الخير':n.h<17?'نهارك سعيد':'مساء الخير';
 return`<div class="hero"><div><div class="mut">${n.day}</div><h1>${g}${S.name?'، '+esc(S.name):''} 👋</h1></div><div id="clk"></div></div>
 ${S.name?'':'<div class="card f" style="grid-template-columns:1fr auto;margin-bottom:12px"><input id="nm" placeholder="اسمك إيه؟ (عشان أرحب بيك)" aria-label="اسمك"><button class="btn p" data-act="savename">حفظ</button></div>'}${nowCard(n,cur,nx,rs)}<div class="card"><div class="hero" style="margin:0 0 10px"><h2 style="margin:0">يومك على شريط واحد</h2><span class="sm mut">${cur?`دلوقتي: <b style="color:var(--${cur.t})">${esc(cur.n)}</b> (باقي ${fm(mm(cur.b)-n.min)})`:'مفيش نشاط حالياً'}${nx?` • التالي: ${esc(nx.n)} ${f12(nx.a)} ${ap(nx.a)} (بعد ${fm(mm(nx.a)-n.min)})`:''}</span></div>${ribbon(n.day,n)}</div>
 <div class="grid">
  <div class="card"><div class="mut sm">إنجاز النهارده</div><div class="big">${td.pct}%</div><div class="sm mut">${td.got} من ${td.tot} (روتين + مهام)</div><div class="bar"><u style="width:${td.pct}%"></u></div></div>
  <div class="card"><div class="mut sm">متوسط الأسبوع</div><div class="big">${wp}%</div><div class="bar"><u style="width:${wp}%;--c:var(--lesson)"></u></div></div>
  <div class="card"><div class="mut sm">مهام معلقة</div><div class="big">${pend.length}</div><div class="sm mut">${S.tasks.filter(t=>t.done).length} خلصت</div></div>
  <div class="card"><div class="mut sm">ملاحظات</div><div class="big">${S.notes.length}</div></div>${pomH()}</div>
 <div class="two"><div class="card"><h2>الأسبوع${stk?` <span class="chip" style="--c:var(--gym)">🔥 ${stk} أيام متتالية</span>`:''}</h2><div class="week">${wk.map(x=>`<div class="${x.i==n.idx?'td':''}"><b>${x.pct}%</b><span style="height:${Math.max(x.pct,3)}%"></span>${x.d.slice(0,3)}</div>`).join('')}</div></div>
  <div class="card"><h2>ساعات الأسبوع</h2><div class="hrs">${Object.entries(hrs).map(([k,v])=>`<div><span>${TY[k][1]} ${TY[k][0]}</span><div class="bar"><u style="width:${v/mx*100}%;--c:var(--${k})"></u></div><b>${v}س</b></div>`).join('')}</div></div></div>
 <div class="two"><div class="card"><h2>عادات النهارده</h2>${habRows()}</div><div class="card"><h2>آخر 14 يوم</h2>${histBars()}</div></div>
 <div class="two"><div class="card"><h2>أهم المهام</h2>${pend.slice(0,5).map(t=>`<div class="sm" style="margin-bottom:6px"><span style="color:var(--${t.pri})">●</span> ${esc(t.title)} ${t.day?chip('study',t.day):''}</div>`).join('')||'<div class="mut sm">مفيش مهام معلقة 🎉</div>'}<a class="btn" style="display:inline-block;margin-top:8px" href="#tasks">كل المهام</a></div>
  <div class="card"><h2>الطقس</h2><div class="f" style="grid-template-columns:1fr auto"><input id="city" placeholder="اسم المدينة" value="${esc(S.city)}" aria-label="المدينة"><button class="btn p" data-act="wx">عرض</button></div>${WX||'<div class="mut sm">اكتب مدينتك واضغط عرض.</div>'}
  <p class="q" style="margin:14px 0 4px">${QUOTES[S.qi%QUOTES.length]}</p><button class="btn" data-act="quote">عبارة جديدة</button></div></div><p class="sm mut" style="text-align:center;margin-top:16px">اختصارات: 1–4 للتنقل • N مهمة جديدة • T تبديل المظهر</p>`}
function nowCard(n,cur,nx,rs){const dn=doneOf(n.day),up=rs.filter(r=>mm(r.a)>n.min&&r.t!='transport').slice(0,3);let h;
 if(cur){const a=mm(cur.a),b=mm(cur.b),p=Math.round((n.min-a)/(b-a)*100);
  h=`<div class="nw-top"><span class="nw-ic">${TY[cur.t][1]}</span><div><div class="mut sm">دلوقتي • ${f12(cur.a)}–${f12(cur.b)} ${ap(cur.b)}</div><div class="nw-n">${esc(cur.n)}</div>${cur.d?`<div class="sm mut">${esc(cur.d)}</div>`:''}</div></div><div class="bar"><u style="width:${p}%"></u></div><div class="nw-f"><span class="sm mut">باقي ${fm(b-n.min)}</span>${cur.t!='transport'?`<button class="btn p" data-act="donenow" data-id="${cur.id}">${dn[cur.id]?'↩ إلغاء التم':'✓ خلّصت'}</button>`:''}</div>`}
 else h=`<div class="nw-n">فاضي دلوقتي ☕</div><div class="sm mut">${nx?`التالي: ${esc(nx.n)} الساعة ${f12(nx.a)} ${ap(nx.a)} (بعد ${fm(mm(nx.a)-n.min)})`:'خلصت جدول النهارده 🎉'}</div>`;
 return`<div class="card nw" style="--c:var(--${cur?cur.t:'rest'})">${h}${up.length?`<div class="chips nw-up">${up.map(r=>`<span class="chip" style="--c:var(--${r.t})">${f12(r.a)} ${esc(r.n)}</span>`).join('')}</div>`:''}</div>`}
const pf=()=>String(Math.floor(POM.left/60)).padStart(2,'0')+':'+String(POM.left%60).padStart(2,'0');
const today=()=>now().ymd;
const applyPrefs=()=>{const r=document.documentElement.style;r.setProperty('--fs',S.fs);r.setProperty('--h',S.hue)};
function habRows(){const l=S.hab.log[today()]||{};return S.hab.list.map(h=>{const c=l[h.id]||0,p=Math.min(100,Math.round(c/h.g*100));return`<div class="hb"><span>${h.ic} ${esc(h.n)}</span><div class="bar"><u style="width:${p}%;--c:var(--${p>=100?'low':'acc'})"></u></div><button class="btn sq" data-hb="${h.id}" data-hd="-1" aria-label="أقل">−</button><b>${c}/${h.g}</b><button class="btn sq" data-hb="${h.id}" data-hd="1" aria-label="أكتر">+</button><button class="x" data-hx="${h.id}" aria-label="حذف">✕</button></div>`}).join('')+'<button class="btn" data-act="addhab">＋ عادة جديدة</button>'}
function histBars(){const n=now(),a=[];for(let k=13;k>=0;k--){const d=new Date(n.ymd+'T00:00:00Z');d.setUTCDate(d.getUTCDate()-k);const v=S.hist[d.toISOString().slice(0,10)];a.push(`<div class="${k?'':'td'}"><b>${v??'–'}</b><span style="height:${Math.max(v||0,3)}%;${v==null?'opacity:.3':''}"></span></div>`)}return`<div class="week h14">${a.join('')}</div>`}
function pomH(){return`<div class="card"><div class="mut sm">تركيز (Pomodoro)</div><div class="pomt" id="pomt">${pf()}</div><div class="chips">${[25,50,5].map(m=>`<button class="chip${POM.mode==m?' on':''}" data-pm="${m}">${m}د</button>`).join('')}<button class="chip on" data-act="pgo">${POM.run?'⏸ إيقاف':'▶ ابدأ'}</button><button class="chip" data-act="prst">↺</button></div><div class="sm mut" style="margin-top:6px">جلسات النهارده: ${S.pom[today()]||0}</div></div>`}

/* ===== الجدول ===== */
function rowH(r,st,bad,nowF,dn){const ck=st!='future'&&r.t!='transport';
 return`<div class="row ${r.t}${ck?'':' nock'}${bad?' bad':''}${dn[r.id]?' done':''}${nowF?' now':''}" style="--c:var(--${r.t})">${ck?`<input type="checkbox" data-ck="${r.id}"${dn[r.id]?' checked':''}${st=='today'?'':' disabled'} aria-label="تم">`:''}<div class="tm"><span>${f12(r.a)}–${f12(r.b)}</span><small>${ap(r.b)}</small></div><div class="nm">${TY[r.t][1]} ${esc(r.n)}${nowF?'<span class="badge">دلوقتي</span>':''}</div>${r.d?`<div class="dt">${esc(r.d)}</div>`:''}</div>`}
function conflicts(d){const rs=sorted(d),b=new Set();rs.forEach((r,k)=>{if(mm(r.b)<=mm(r.a))b.add(r.i);const x=rs[k+1];if(x&&mm(r.b)>mm(x.a)){b.add(r.i);b.add(x.i)}});return b}
function routine(){const n=now(),di=DAYS.indexOf(day),st=di<n.idx?'past':di==n.idx?'today':'future',bad=conflicts(day),dn=doneOf(day),s=stat(day),tk=dayTasks(day);
 let h=`<div class="hero"><h1>الجدول</h1><div class="chips">${day!=n.day?`<button class="btn" data-day="${n.day}">↩ اليوم</button>`:''}<button class="btn${editing?' p':''}" data-act="edit">${editing?'✅ تم':'✏️ تعديل'}</button>${editing?'<button class="btn d" data-act="reset">↩︎ الجدول الأصلي</button>':''}</div></div>
 <div class="days">${DAYS.map((d,i)=>`<button class="pill${d==day?' on':''}" data-day="${d}">${d}${i==n.idx?' •':''}${i<=n.idx?` <small>${stat(d).pct}%</small>`:''}</button>`).join('')}</div>`;
 if(!editing)h+=st=='today'?`<div class="card" style="margin-bottom:10px"><b>تم ${s.got} من ${s.tot}</b><div class="bar"><u style="width:${s.pct}%;--c:var(--lesson)"></u></div></div>`:st=='past'?`<div class="lock">🔒 اليوم ده خلص — خلّصت ${s.got} من ${s.tot}.</div>`:'<div class="lock">⏳ اليوم ده لسه مجاش — الـcheckbox بتفتح أول ما يبدأ.</div>';
 if(bad.size)h+='<div class="sm" style="color:var(--bad);margin-bottom:8px">⚠️ في تعارض في المواعيد — الصفوف المحاطة بالأحمر.</div>';
 h+=sorted(day).map(r=>{if(!editing)return rowH(r,st,bad.has(r.i),st=='today'&&n.min>=mm(r.a)&&n.min<mm(r.b),dn);
  const o=Object.entries(TY).map(([k,v])=>`<option value="${k}"${k==r.t?' selected':''}>${v[0]}</option>`).join('');
  return`<div class="row ed${bad.has(r.i)?' bad':''}" style="--c:var(--${r.t})" data-i="${r.i}"><input type="time" data-f="a" value="${r.a}"><input type="time" data-f="b" value="${r.b}"><select class="w2" data-f="t">${o}</select><input class="w2" data-f="n" value="${esc(r.n)}"><input class="w2" data-f="d" value="${esc(r.d)}"><button class="btn d" data-del="${r.i}">🗑️ حذف</button></div>`}).join('');
 if(editing)h+='<button class="btn" data-act="add">＋ إضافة نشاط</button>';
 else if(tk.length)h+=`<h2 style="margin-top:18px">مهام ${day} <span class="sm mut">(من تبويب المهام)</span></h2>`+tk.map(taskH).join('');
 return h+'<div class="legend">'+Object.entries(TY).map(([k,v])=>`<span><i style="--c:var(--${k})"></i>${v[0]}</span>`).join('')+'</div>'}

/* ===== المهام ===== */
function taskH(t){const o='<option value="">بدون يوم</option>'+DAYS.map(d=>`<option${d==t.day?' selected':''}>${d}</option>`).join('');
 return`<div class="tk${t.done?' done':''}" style="--c:var(--${t.pri})"><input type="checkbox" data-tk="${t.id}"${t.done?' checked':''} aria-label="تم"><div><div class="t">${esc(t.title)}</div><div class="sm mut">${CATS[t.cat]||''} • ${PRI[t.pri]}</div></div><select data-tday="${t.id}" aria-label="اليوم">${o}</select><button class="x e" data-te="${t.id}" aria-label="تعديل">✎</button><button class="x" data-td="${t.id}" aria-label="حذف">✕</button></div>`}
function taskList(){const q=TQ.trim().toLowerCase(),l=S.tasks.filter(t=>(filter=='all'||(filter=='pending'?!t.done:filter=='done'?t.done:t.pri==filter))&&t.title.toLowerCase().includes(q));
 return l.map(taskH).join('')||`<div class="lock">${q||filter!='all'?'مفيش نتائج بالفلتر ده.':'مفيش مهام هنا. ضيف أول مهمة من فوق 👆'}</div>`}
function tasks(){
 const F=[['all','الكل'],['pending','معلقة'],['done','خلصت'],['high','عالية'],['medium','متوسطة'],['low','منخفضة']];
 return`<h1 style="margin-bottom:12px">المهام</h1><div class="f"><input id="tt" placeholder="إيه اللي لازم يتعمل؟" aria-label="المهمة"><select id="tp"><option value="medium">متوسطة</option><option value="high">عالية</option><option value="low">منخفضة</option></select><select id="tc">${Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><select id="tdy"><option value="">بدون يوم</option>${DAYS.map(d=>`<option>${d}</option>`).join('')}</select><button class="btn p" data-act="addtask">إضافة</button></div>
 <p class="sm mut">اختار يوم للمهمة وهتظهر تلقائي في جدول اليوم ده وتتحسب في نسبة إنجازه.</p>
 <div class="f" style="grid-template-columns:1fr auto"><input id="tq" type="search" placeholder="🔍 دوّر في المهام" value="${esc(TQ)}" aria-label="بحث"><button class="btn" data-act="clr">مسح اللي خلص</button></div><div class="chips" style="margin-bottom:12px">${F.map(([k,v])=>`<button class="chip${filter==k?' on':''}" data-filter="${k}">${v} <small>${S.tasks.filter(t=>k=='all'||(k=='pending'?!t.done:k=='done'?t.done:t.pri==k)).length}</small></button>`).join('')}</div><div id="tl">${taskList()}</div>`}

/* ===== الملاحظات ===== */
let NQ='';
function noteList(){const q=NQ.trim().toLowerCase(),l=S.notes.filter(n=>(n.title+n.body).toLowerCase().includes(q)).sort((a,b)=>(b.pin?1:0)-(a.pin?1:0));
 return l.map(n=>`<div class="nt${n.pin?' pin':''}" data-note="${n.id}"><div class="nh"><h3>${esc(n.title)}</h3><span><button class="x e" data-np="${n.id}" aria-label="تثبيت">${n.pin?'📌':'📍'}</button><button class="x" data-dn="${n.id}" aria-label="حذف">✕</button></span></div><p>${esc(n.body)}</p></div>`).join('')||`<div class="lock">${q?'مفيش نتائج.':'اكتب أول ملاحظة 👆'}</div>`}
function notes(){return`<h1 style="margin-bottom:16px">الملاحظات</h1><div class="f nf"><input id="nt1" placeholder="العنوان" aria-label="العنوان"><input id="nt2" placeholder="المحتوى" aria-label="المحتوى"><button class="btn p" data-act="addnote">إضافة</button></div><input id="nq" type="search" placeholder="🔍 دوّر في الملاحظات" value="${esc(NQ)}" style="margin-bottom:14px" aria-label="بحث"><div class="notes" id="nl">${noteList()}</div><p class="sm mut">اضغط على ملاحظة لتعديلها • 📍 لتثبيتها في الأول.</p>`}

/* ===== العرض ===== */
function render(){$('#nav').innerHTML=PAGES.map(([k,v,ic])=>`<a href="#${k}" class="${k==page?'on':''}"><span>${ic}</span>${v}</a>`).join('');
 $('#view').innerHTML=({dash,routine,tasks,notes}[page]||dash)();clock();if(SNAP&&page=='routine'){SNAP=0;$('.row.now')?.scrollIntoView({block:'center'})}}
function clock(){const e=$('#clk');if(e)e.textContent=new Date().toLocaleTimeString('en-US',{timeZone:'Africa/Cairo'})}
const weatherIcon=c=>c==113?'☀️':c<=122?'⛅':c>=386?'⛈️':c>=323&&c<=377?'❄️':'🌧️';
async function wx(){const c=$('#city').value.trim();if(!c)return;S.city=c;save();WX='<div class="mut sm">جاري التحميل…</div>';render();
 try{const r=await fetch('https://wttr.in/'+encodeURIComponent(c)+'?format=j1');if(!r.ok)throw 0;const d=await r.json(),k=d.current_condition[0];
  WX=`<div style="display:flex;gap:12px;align-items:center"><span style="font-size:42px">${weatherIcon(+k.weatherCode)}</span><div><b style="font-size:26px">${k.temp_C}°</b><div class="sm mut">${esc(d.nearest_area[0].areaName[0].value)} • رطوبة ${k.humidity}% • رياح ${k.windspeedKmph} كم/س</div></div></div>`}
 catch{WX='<div class="sm" style="color:var(--bad)">مقدرتش أجيب الطقس. اتأكد من اسم المدينة (بالإنجليزي) والإنترنت.</div>'}render()}

/* ===== الأحداث ===== */
addEventListener('hashchange',()=>{page=location.hash.slice(1)||'dash';editing=false;SNAP=1;scrollTo(0,0);render();const v=$('#view');v.classList.remove('fade');void v.offsetWidth;v.classList.add('fade')});
document.addEventListener('click',e=>{if(e.target.closest('.pop'))$('.menu').open=false;const t=e.target.closest('[data-act],[data-hb],[data-hx],[data-np],[data-day],[data-del],[data-td],[data-te],[data-pm],[data-filter],[data-dn],[data-note]');if(!t)return;
 const a=t.dataset.act,D=t.dataset;
 if(D.day)day=D.day;
 else if(D.del!==undefined){S.sched[day].splice(+D.del,1)}
 else if(D.td){const i=S.tasks.findIndex(x=>x.id==D.td),it=S.tasks.splice(i,1)[0];toast('اتمسحت المهمة',()=>S.tasks.splice(i,0,it))}
 else if(D.te){const t=S.tasks.find(x=>x.id==D.te),v=prompt('عدّل المهمة',t.title);if(v&&v.trim())t.title=v.trim()}
 else if(D.pm){POM.mode=+D.pm;POM.left=POM.mode*60;POM.run=false}
 else if(D.filter)filter=D.filter;
 else if(D.dn){e.stopPropagation();const i=S.notes.findIndex(x=>x.id==D.dn),it=S.notes.splice(i,1)[0];toast('اتمسحت الملاحظة',()=>S.notes.splice(i,0,it))}
 else if(D.note){const n=S.notes.find(x=>x.id==D.note),ti=prompt('العنوان',n.title);if(ti===null)return;const b=prompt('المحتوى',n.body);n.title=ti.trim()||n.title;if(b!==null)n.body=b}
 else if(D.hb){const l=(S.hab.log[today()]??={});l[D.hb]=Math.max(0,(l[D.hb]||0)+ +D.hd)}
 else if(D.hx){S.hab.list=S.hab.list.filter(x=>x.id!=D.hx)}
 else if(D.np){e.stopPropagation();const n=S.notes.find(x=>x.id==D.np);n.pin=!n.pin}
 else if(a=='addhab'){const n=prompt('اسم العادة؟');if(!n)return;S.hab.list.push({id:uid(),n:n.trim(),ic:'⭐',g:+prompt('الهدف اليومي (رقم)؟','1')||1})}
 else if(a=='fsu'){S.fs=Math.min(20,S.fs+1);applyPrefs()}
 else if(a=='fsd'){S.fs=Math.max(13,S.fs-1);applyPrefs()}
 else if(a=='acc'){const H=[236,262,172,24,330];S.hue=H[(H.indexOf(S.hue)+1)%H.length];applyPrefs()}
 else if(a=='pgo')POM.run=!POM.run;
 else if(a=='prst'){POM.run=false;POM.left=POM.mode*60}
 else if(a=='savename'){S.name=$('#nm').value.trim()}
 else if(a=='name'){const v=prompt('اسمك؟',S.name);if(v===null)return;S.name=v.trim()}
 else if(a=='clr'){const g=S.tasks.filter(x=>x.done);if(!g.length)return toast('مفيش مهام خلصانة');S.tasks=S.tasks.filter(x=>!x.done);toast('اتمسح '+g.length+' مهمة',()=>S.tasks.push(...g))}
 else if(a=='notif'){toggleNotif();return}
 else if(a=='donenow'){const dn=doneOf(now().day);dn[D.id]=!dn[D.id]}
 else if(a=='install'){if(DP){DP.prompt();DP.userChoice.finally(()=>{DP=null;$('#inst').hidden=true})}else alert('على الأيفون: اضغط زر المشاركة في سفاري ثم «إضافة إلى الشاشة الرئيسية».');return}
 else if(a=='edit')editing=!editing;
 else if(a=='add'){const l=sorted(day).slice(-1)[0];S.sched[day].push({id:'n'+uid(),a:l?l.b:'08:00',b:l?l.b:'08:30',t:'rest',n:'نشاط جديد',d:''})}
 else if(a=='reset'){if(!confirm('هترجع الجدول الأصلي وكل تعديلاتك على الجدول هتتمسح. متأكد؟'))return;S.sched=DEF()}
 else if(a=='addtask'){const v=$('#tt').value.trim();if(!v){$('#tt').focus();return}S.tasks.unshift({id:uid(),title:v,pri:$('#tp').value,cat:$('#tc').value,day:$('#tdy').value,done:false});toast('اتضافت المهمة ✅')}
 else if(a=='addnote'){const v=$('#nt1').value.trim();if(!v){$('#nt1').focus();return}S.notes.unshift({id:uid(),title:v,body:$('#nt2').value})}
 else if(a=='quote')S.qi=Math.floor(Math.random()*QUOTES.length);
 else if(a=='wx'){wx();return}
 else if(a=='theme'){S.theme=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=S.theme}
 else if(a=='print'){print();return}
 else if(a=='export'){const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'}));l.download='hayati-backup.json';l.click();toast('اتصدّرت نسخة احتياطية');return}
 save();render()});
document.addEventListener('change',e=>{const t=e.target,D=t.dataset;
 if(D.ck){const dn=doneOf(day);dn[D.ck]=t.checked}
 else if(D.tk){S.tasks.find(x=>x.id==D.tk).done=t.checked}
 else if(D.tday){S.tasks.find(x=>x.id==D.tday).day=t.value}
 else if(t.id=='imp'){const f=t.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{S=Object.assign(S,JSON.parse(r.result));save();render();toast('اتستورد بنجاح ✅')}catch{toast('الملف غير صالح')}};r.readAsText(f);return}
 else if(!t.closest('.ed'))return;
 save();render()});
document.addEventListener('input',e=>{if(e.target.id=='nq'){NQ=e.target.value;$('#nl').innerHTML=noteList();return}if(e.target.id=='tq'){TQ=e.target.value;$('#tl').innerHTML=taskList();return}const r=e.target.closest('.ed');if(!r||!e.target.dataset.f)return;S.sched[day][+r.dataset.i][e.target.dataset.f]=e.target.value;save()});
setInterval(clock,1000);
let lastMin=now().min;
setInterval(()=>{const n=now();if(S.notif&&n.min>=lastMin)sorted(n.day).forEach(r=>{if(mm(r.a)>lastMin&&mm(r.a)<=n.min&&r.t!='transport')ping(TY[r.t][1]+' '+r.n,'بدأ الآن'+(r.d?' • '+r.d:''))});lastMin=n.min;const a=document.activeElement;if(!editing&&!(a&&a.matches('input,select,textarea'))&&(page=='dash'||page=='routine'))render()},60000);
setInterval(()=>{if(!POM.run)return;POM.left--;document.title=pf()+' • حياتي';if(POM.left<=0){POM.run=false;if(POM.mode>=25){S.pom[today()]=(S.pom[today()]||0)+1;save()}toast(POM.mode>=25?'🎉 خلصت جلسة تركيز — خد استراحة':'☕ الاستراحة خلصت');ping('حياتي','انتهى الوقت');POM.left=POM.mode*60;document.title='حياتي';render()}else{const e=$('#pomt');if(e)e.textContent=pf()}},1000);
async function toggleNotif(){if(S.notif){S.notif=false;save();return toast('اتقفلت التنبيهات')}if(!window.Notification)return toast('المتصفح مش بيدعم التنبيهات');S.notif=(await Notification.requestPermission())=='granted';save();toast(S.notif?'🔔 التنبيهات شغالة (والموقع مفتوح)':'التنبيهات مش مسموحة من المتصفح')}
document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select'))return;const i='1234'.indexOf(e.key);if(i>=0)location.hash=PAGES[i][0];else if(e.key=='n'||e.key=='N'){e.preventDefault();location.hash='tasks';setTimeout(()=>$('#tt')?.focus(),60)}else if(e.key=='t'||e.key=='T')document.querySelector('[data-act=theme]').click()});
let DP=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DP=e;$('#inst').hidden=false});
addEventListener('appinstalled',()=>{DP=null;$('#inst').hidden=true;toast('اتثبّت التطبيق ✅')});
if(/iphone|ipad/i.test(navigator.userAgent)&&!navigator.standalone)$('#inst').hidden=false;
applyPrefs();document.documentElement.dataset.theme=S.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
render();

if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
