const $=s=>document.querySelector(s),cv=$('#sc'),g=cv.getContext('2d'),W=600,H=300,nav=$('#nav');
let tp,A,ST,BASE,OUT=[],PH='',TT=0;
const sp=i=>Math.min(240,15+45*Math.sqrt(Math.abs(i))),fmt=x=>(+x).toLocaleString('en-IN',{maximumFractionDigits:2});
const mk=p=>{const L=[0];for(let i=1;i<p.length;i++)L.push(L[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]));return{p,L,n:L[L.length-1]}};
const pt=(P,d)=>{d=((d%P.n)+P.n)%P.n;let i=1;while(i<P.L.length-1&&P.L[i]<d)i++;const f=(d-P.L[i-1])/(P.L[i]-P.L[i-1]||1),a=P.p[i-1],b=P.p[i];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]};
const ln=(p,c='#5b7391',w=3)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()};
const cr=(x,y,r,f,s)=>{g.beginPath();g.arc(x,y,r,0,7);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=2;g.stroke()}};
const tx=(s,x,y,c='#cfe0f5',f=13,al='center')=>{g.fillStyle=c;g.font=f+'px "Noto Sans Gujarati",sans-serif';g.textAlign=al;g.fillText(s,x,y)};
const dots=(p,v,c='#ffd23f',gap=22)=>{if(!v)return;const P=mk(p);for(let d=(TT*v)%gap;d<P.n;d+=gap){const[x,y]=pt(P,d);cr(x,y,3.5,c)}};
const bulb=(x,y,gl,lb)=>{g.save();g.shadowColor='#ffd23f';g.shadowBlur=30*gl;cr(x,y,17,`rgba(255,210,60,${.12+.88*gl})`);g.restore();cr(x,y,17,0,'#cfe0f5');tx(lb,x,y+36)};
const gl=p=>1-Math.exp(-p/25);
const K={};
K.circ=v=>{const{V,R1}=v,R2=v.R2||0,m=v.m;ln([[58,145],[82,145]],'#fff',4);ln([[64,157],[76,157]],'#fff',4);tx('+',45,142,'#ff8a8a',16);tx(V+' V',45,175);
 if(m=='p'){const I1=V/R1,I2=V/R2;ln([[70,145],[70,70],[530,70]]);ln([[70,157],[70,230],[530,230]]);ln([[250,70],[250,230]]);ln([[420,70],[420,230]]);
  dots([[70,145],[70,70],[250,70],[250,230],[70,230],[70,157]],sp(I1));dots([[70,145],[70,70],[420,70],[420,230],[70,230],[70,157]],sp(I2));
  bulb(250,150,gl(V*I1),'R1 '+fmt(I1)+' A');bulb(420,150,gl(V*I2),'R2 '+fmt(I2)+' A');tx('સમાંતર: દરેક શાખામાં અલગ કરંટ',300,275,'#9fb4cc')}
 else{const I=V/(R1+R2),P=[[70,145],[70,70],[530,70],[530,230],[70,230],[70,157]];ln(P);dots(P,sp(I));
  if(m=='s'){bulb(230,70,gl(I*I*R1),'R1');bulb(390,70,gl(I*I*R2),'R2')}else bulb(300,70,gl(I*I*R1),'R');
  tx(m=='s'?'શ્રેણી: બધે એક જ કરંટ '+fmt(I)+' A':'કરંટ '+fmt(I)+' A',300,275,'#9fb4cc');
  if(v.mt){cr(530,150,17,'#16304f','#cfe0f5');tx('A',530,155);tx(fmt(I),530,185);const x=m=='s'?230:300;ln([[x-30,70],[x-30,150],[x-17,150]],'#7ecbff',2);ln([[x+30,70],[x+30,150],[x+17,150]],'#7ecbff',2);cr(x,150,17,'#16304f','#7ecbff');tx('V',x,155);tx(fmt(I*R1),x,185,'#7ecbff')}}};
K.room=v=>{const o=tp,N=o.nm.length,V=o.V||230,r=o.r||1;ST.on=ST.on||o.nm.map(()=>1);
 const w=o.nm.map((_,i)=>ST.on[i]?o.w[i]:0),sw=w.reduce((a,b)=>a+b,0),I=sw/(V*r),trip=I>v.mcb;
 ln([[60,60],[570,60]]);ln([[60,250],[570,250]]);ln([[60,60],[60,130]]);ln([[60,170],[60,250]]);cr(60,150,20,'#16304f','#cfe0f5');tx('~',60,157,'#fff',20);tx(V+' V',60,200,'#cfe0f5',12);
 g.fillStyle=trip?'#c0392b':'#1f8a4c';g.fillRect(105,48,34,24);tx('MCB '+v.mcb+'A',122,40);if(trip)tx('ટ્રિપ!',122,92,'#ff8a8a',14);
 o.nm.forEach((n,i)=>{const x=150+i*(400/N)+20;ln([[x,60],[x,250]]);
  if(ST.on[i])ln([[x,60],[x,110]],'#cfe0f5',4);else{ln([[x,60],[x,95]],'#cfe0f5',4);ln([[x,95],[x+16,108]],'#cfe0f5',4)}
  tx(ST.on[i]?'ON':'OFF',x+30,100,ST.on[i]?'#7bd88f':'#999',12);
  bulb(x,170,ST.on[i]&&!trip?Math.min(1,.4+o.w[i]/3000):0,n);tx(o.w[i]+' W',x,215,'#9fb4cc',12);
  if(ST.on[i]&&!trip)dots([[60,250],[60,60],[x,60],[x,250],[60,250]],sp(o.w[i]/(V*r)))});
 if(trip)tx('ઓવરલોડ → બ્રેકર ટ્રિપ, સર્કિટ બંધ',330,285,'#ff8a8a',15);else tx('ચિત્ર પર ક્લિક કરી લોડ ચાલુ-બંધ કરો',330,285,'#9fb4cc');
 OUT.push(['કુલ કરંટ',I,'A'],['કુલ પાવર',sw/1000,'kW'])};
K.room.c=x=>{const N=tp.nm.length;tp.nm.forEach((_,i)=>{if(Math.abs(x-(170+i*(400/N)))<45)ST.on[i]^=1})};
K.wave=v=>{const ph=v.ph||1,f=v.f,t0=TT*2.2,C=['#ff5d5d','#ffd23f','#4aa3ff'],R=v.rect!=null;
 cr(100,150,70,0,'#5b7391');for(let k=0;k<ph;k++){const a=t0-k*2.094;ln([[100,150],[100+70*Math.cos(a),150-70*Math.sin(a)]],C[ph==3?k:1],4)}tx(ph==3?'ફરતા ફેઝર R Y B':'ફરતો ફેઝર',100,250,'#9fb4cc');
 const cy=R?85:150,am=R?45:80;ln([[200,cy],[580,cy]],'#3b5069',1);if(R)ln([[200,225],[580,225]],'#3b5069',1);
 for(let k=0;k<ph;k++){const p=[],q=[];for(let x=200;x<=580;x+=4){const s=Math.sin(6.283*f*(x-200)/380-t0-k*2.094);p.push([x,cy-am*s]);q.push([x,225-am*(v.rect==1?Math.max(0,s):Math.abs(s))])}ln(p,C[ph==3?k:1],3);if(R)ln(q,'#fff',3)}
 if(R){tx('ઇનપુટ AC',390,28,'#ffd23f');tx(v.rect==1?'આઉટપુટ: હાફ-વેવ DC':'આઉટપુટ: ફુલ-વેવ DC',390,160,'#fff')}else tx('સમય →',560,285,'#9fb4cc',12)};
K.coil=v=>{const fl=Math.min(1,v.Vp/v.Np/.5),Vs=v.Vp*v.Ns/v.Np,core=[[210,60],[390,60],[390,240],[210,240],[210,60]];
 ln(core,'#4b5d73',26);const P=mk(core);for(let d=0;d<P.n;d+=26){const[x,y]=pt(P,d+70*fl*Math.sin(TT*3));cr(x,y,3.5,'#4aa3ff')}
 const turns=(n,x)=>{for(let i=0;i<Math.min(13,Math.max(2,Math.round(n/150)));i++){ln([[x-16,95+i*8.5],[x+16,100+i*8.5]],'#ff9f40',4)}};turns(v.Np,210);turns(v.Ns,390);
 ln([[194,100],[120,100],[120,200],[194,200]]);tx('Vp '+v.Vp+' V',120,225);tx('Np '+v.Np,210,285,'#ff9f40');
 ln([[406,100],[480,100],[480,133]]);ln([[406,200],[480,200],[480,167]]);bulb(480,150,Math.min(1,Math.pow(Vs/230,2)),'Vs '+fmt(Vs)+' V');tx('Ns '+v.Ns,390,285,'#ff9f40');tx('ફ્લક્સ (વાદળી ટપકાં)',300,155,'#4aa3ff',12)};
K.rot=v=>{const cx=220,cy=150,p=v.p||2,k=3.2/1500;g.lineWidth=14;cr(cx,cy,118,0,'#5b7391');
 for(let i=0;i<p;i++){const a=i*6.283/p;g.save();g.translate(cx,cy);g.rotate(a);g.fillStyle=i%2?'#4aa3ff':'#ff5d5d';g.fillRect(72,-14,30,28);g.restore();tx(i%2?'S':'N',cx+87*Math.cos(a),cy+87*Math.sin(a)+5,'#fff',14)}
 g.save();g.translate(cx,cy);g.rotate(TT*v.rpm*k);cr(0,0,58,'#aab7c4');g.fillStyle='#ffd23f';g.fillRect(-54,-5,108,10);g.fillStyle='#c0392b';g.fillRect(34,-5,20,10);g.restore();
 if(v.ns){const a=TT*v.ns*k;ln([[cx,cy],[cx+100*Math.cos(a),cy+100*Math.sin(a)]],'#ff8a8a',3);tx('ફરતું ક્ષેત્ર',cx,285,'#ff8a8a',12)}
 tx(Math.round(v.rpm)+' rpm',cx,cy+4,'#0d1b2a',14);
 if(v.glow!=null){ln([[340,150],[480,150]]);bulb(500,150,v.glow,'લોડ');dots([[340,150],[480,150]],sp(v.glow*30))}};
K.flow=v=>{const s=tp.st,N=s.length,bw=96,gp=(560-N*bw)/(N-1),h=v.hot?'#ff7a2f':'#5b7391';ln([[20,150],[580,150]],h,v.hot?7:4);dots([[20,150],[580,150]],sp(v.I),v.hot?'#ffe0b0':'#ffd23f',18);
 s.forEach((n,i)=>{const x=20+i*(bw+gp);g.fillStyle='#16304f';g.fillRect(x,118,bw,64);g.strokeStyle=v.hot&&i==1&&tp.k=='flow'?'#ff7a2f':'#8aa0b8';g.lineWidth=2;g.strokeRect(x,118,bw,64);
  const w=n.split(' ');if(w.length>1){tx(w[0],x+bw/2,146,'#fff',12);tx(w.slice(1).join(' '),x+bw/2,164,'#fff',12)}else tx(n,x+bw/2,154,'#fff',12);tx(tp.lb[i],x+bw/2,205,'#9fb4cc',12)});
 if(v.hot)tx('ગરમી / નુકસાન વધુ!',300,60,'#ff7a2f',16)};
K.rc=v=>{const tau=v.R*v.C/1000,u=(TT/2.5)%6,vc=v.V*(1-Math.exp(-u)),i=(v.V-vc)/v.R,P=[[70,145],[70,70],[530,70],[530,125],[530,175],[530,230],[70,230],[70,157]];
 ln([[58,145],[82,145]],'#fff',4);ln([[64,157],[76,157]],'#fff',4);ln(P.slice(0,4));ln(P.slice(4));dots(P,i>.03*v.V/v.R?sp(i):0);
 bulb(300,70,Math.min(1,i/(v.V/v.R)),'R');g.fillStyle=`rgba(255,93,93,${vc/v.V})`;g.fillRect(505,119,50,8);g.fillStyle=`rgba(74,163,255,${vc/v.V})`;g.fillRect(505,173,50,8);ln([[510,125],[550,125]],'#fff',4);ln([[510,175],[550,175]],'#fff',4);
 tx('Vc = '+fmt(vc)+' V',440,155,'#fff',15);tx('t = '+fmt(u*tau)+' s  ('+fmt(u)+' τ)',300,275,'#9fb4cc');tx('કરંટ ઘટતો જાય છે: '+fmt(i)+' mA',300,250,'#ffd23f',12);
 OUT.push(['Vc',vc,'V',0,1],['કરંટ',i,'mA',0,1])};
K.mat=v=>{const n=nf(v),d=v.V*3;for(let r=0;r<4;r++)for(let c=0;c<8;c++){cr(60+c*70,70+r*55,14,'#4a5d75');tx('+',60+c*70,75+r*55,'#fff',14)}
 for(let i=0;i<n;i++){const x=560-((i*37.3+TT*d*(.4+.1*(i%3)))%520),y=45+((i*53)%215)+Math.sin(TT*4+i)*9;cr(x,y,4.5,'#ffd23f')}
 tx(['કંડક્ટર: ઘણા મુક્ત ઇલેક્ટ્રોન','સેમી-કંડક્ટર: તાપમાન વધે તો વધુ','ઇન્સ્યુલેટર: મુક્ત ઇલેક્ટ્રોન નથી'][v.type],300,290,'#9fb4cc')};
K.layers=v=>{const L=tp.ly,z=1.4;ST.sel=Math.min(ST.sel??L.length-1,v.k-1);for(let i=v.k-1;i>=0;i--)cr(190,150,L[i][2]*z,L[i][1],i==ST.sel?'#ffd23f':'#000');
 const l=L[ST.sel];tx(l[0],340,120,'#ffd23f',16,'left');l[3].split('|').forEach((s,j)=>tx(s,340,150+j*20,'#cfe0f5',13,'left'))};
K.layers.c=(x,y)=>{const d=Math.hypot(x-190,y-150)/1.4;let b=-1;tp.ly.forEach((l,i)=>{if(i<A.k&&d<=l[2]&&b<0)b=i});if(b>=0)ST.sel=b};
const SY=[(x,y)=>ln([[x-30,y],[x-20,y],[x-15,y-10],[x-5,y+10],[x+5,y-10],[x+15,y+10],[x+20,y],[x+30,y]],'#fff',2),
(x,y)=>{ln([[x-30,y],[x-5,y]],'#fff',2);ln([[x+5,y],[x+30,y]],'#fff',2);ln([[x-5,y-14],[x-5,y+14]],'#fff',3);ln([[x+5,y-14],[x+5,y+14]],'#fff',3)},
(x,y)=>{ln([[x-30,y],[x-8,y]],'#fff',2);ln([[x+4,y],[x+30,y]],'#fff',2);ln([[x-8,y-14],[x-8,y+14]],'#fff',3);ln([[x+4,y-8],[x+4,y+8]],'#fff',3)},
(x,y)=>{ln([[x,y-22],[x,y]],'#fff',2);ln([[x-16,y],[x+16,y]],'#fff',2);ln([[x-10,y+7],[x+10,y+7]],'#fff',2);ln([[x-4,y+14],[x+4,y+14]],'#fff',2)},
(x,y)=>{ln([[x-30,y],[x-12,y]],'#fff',2);ln([[x-12,y],[x+14,y-14]],'#fff',2);ln([[x+18,y],[x+30,y]],'#fff',2)},
(x,y)=>{cr(x,y,14,0,'#fff');ln([[x-10,y-10],[x+10,y+10]],'#fff',2);ln([[x-10,y+10],[x+10,y-10]],'#fff',2);ln([[x-30,y],[x-14,y]],'#fff',2);ln([[x+14,y],[x+30,y]],'#fff',2)},
(x,y)=>{ln([[x-10,y-12],[x-10,y+12],[x+10,y],[x-10,y-12]],'#fff',2);ln([[x+10,y-12],[x+10,y+12]],'#fff',3);ln([[x-30,y],[x-10,y]],'#fff',2);ln([[x+10,y],[x+30,y]],'#fff',2)},
(x,y)=>{g.strokeStyle='#fff';g.lineWidth=2;for(let i=0;i<4;i++){g.beginPath();g.arc(x-21+i*14,y,7,Math.PI,0);g.stroke()}},
(x,y)=>{g.strokeStyle='#fff';g.lineWidth=2;g.strokeRect(x-18,y-7,36,14);ln([[x-30,y],[x+30,y]],'#fff',2)},
(x,y)=>{g.strokeStyle='#fff';g.lineWidth=2;for(let i=0;i<3;i++){g.beginPath();g.arc(x-10,y-16+i*14,7,-1.57,1.57);g.stroke();g.beginPath();g.arc(x+10,y-16+i*14,7,1.57,4.71);g.stroke()}}];
const cell=i=>[25+(i%4)*140,15+Math.floor(i/4)*85];
K.cards=v=>{ST.sel=ST.sel??-1;tp.it.forEach((it,i)=>{const[x,y]=cell(i);g.fillStyle=i==ST.sel?'#ffd23f':'#16304f';g.fillRect(x,y,125,72);g.strokeStyle='#8aa0b8';g.strokeRect(x,y,125,72);
  if(tp.sym)SY[i](x+62,y+36);else tx(it[0],x+62,y+42,i==ST.sel?'#0d1b2a':'#fff',14)});
 if(ST.sel>=0){const it=tp.it[ST.sel];tx(it[0]+(it[1]?' — '+it[1]:''),300,285,'#ffd23f',16)}else tx('કાર્ડ પર ક્લિક કરો',300,285,'#9fb4cc')};
K.cards.c=(x,y)=>tp.it.forEach((_,i)=>{const[a,b]=cell(i);if(x>a&&x<a+125&&y>b&&y<b+72)ST.sel=i});
K.bin=v=>{ST.b=ST.b||[0,0,0,0,0,0,0,0];const d=ST.b.reduce((a,b)=>a*2+b,0);tx(String(d),300,70,'#ffd23f',44);
 ST.b.forEach((b,i)=>{const x=40+i*68;cr(x+28,150,10,b?'#ffd23f':'#2a3d57');g.fillStyle=b?'#ffd23f':'#16304f';g.fillRect(x,190,56,56);g.strokeStyle='#8aa0b8';g.strokeRect(x,190,56,56);tx(b,x+28,228,b?'#0d1b2a':'#fff',26);tx(String(128>>i),x+28,180,'#9fb4cc',12)});
 tx('દરેક બિટનું સ્થાનમૂલ્ય ઉપર લખ્યું છે; ચાલુ બિટનો સરવાળો = દશાંકી સંખ્યા',300,280,'#9fb4cc',12);OUT.push(['દશાંકી સંખ્યા',d,''])};
K.bin.c=(x,y)=>{if(y>185)ST.b[Math.floor((x-40)/68)]^=1};
K.calc=v=>{const c=tp.cv,N=100,xs=i=>c.x0+(c.x1-c.x0)*i/N,ys=c.f.map(f=>Array.from({length:N+1},(_,i)=>f(xs(i),v)));
 const all=ys.flat().concat(c.dl?[c.dl*1.3]:[]),mx=Math.max(...all)*1.1||1,mn=Math.min(0,...all),X=x=>50+(x-c.x0)/(c.x1-c.x0)*520,Y=y=>255-(y-mn)/(mx-mn)*215;
 ln([[50,20],[50,255],[570,255]],'#8aa0b8',2);tx(c.xl,310,285,'#9fb4cc');
 if(c.dl){g.setLineDash([6,5]);ln([[50,Y(c.dl)],[570,Y(c.dl)]],'#ff5d5d',2);g.setLineDash([]);tx('ખતરો',540,Y(c.dl)-6,'#ff5d5d',12)}
 ys.forEach((y,k)=>{ln(y.map((u,i)=>[X(xs(i)),Y(u)]),c.c[k],3);tx(c.lb[k],65,20+k*18,c.c[k],13,'left');if(v[c.x]!=null)cr(X(v[c.x]),Y(c.f[k](v[c.x],v)),7,'#fff')})};
function frame(ms){TT=ms/1000;g.fillStyle='#0d1b2a';g.fillRect(0,0,W,H);const v={m:tp.m,...(tp.vis?tp.vis(A):A)};
 OUT=(tp.o||[]).map(([l,f,u,d])=>[l,f(A),u,d]);K[tp.k](v);paint();requestAnimationFrame(frame)}
function paint(){if(!BASE)BASE=OUT.map(o=>o[1]);
 const h=OUT.map((o,i)=>{const b=BASE[i],d=b==null?0:(o[1]-b)/(Math.abs(b)||1)*100,ar=o[4]||Math.abs(d)<1?'':d>0?`<em class=u>▲ ${d.toFixed(0)}%</em>`:`<em class=d>▼ ${Math.abs(d).toFixed(0)}%</em>`;
  return`<div class="${o[3]&&o[1]>o[3]?'bad':''}">${o[0]} <strong>${fmt(o[1])}</strong> ${o[2]||''}${ar}</div>`}).join('');if(h!=PH){PH=h;$('#out').innerHTML=h}}
cv.onclick=e=>{const r=cv.getBoundingClientRect();K[tp.k].c&&K[tp.k].c((e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height)};
function show(k){tp=D[k];ST={};A={};BASE=null;PH='';[...nav.children].forEach((b,i)=>b.classList.toggle('on',i==k-1));
 $('#ti').textContent=k+'. '+T[k-1][0];$('#tx').textContent=tp.t;$('#th').textContent=TH[k-1];fm(k);
 $('#ct').innerHTML=tp.s.map((x,i)=>{A[x[0]]=x[4];return`<div class="ctl"><label>${x[1]}</label><input type="range" min="${x[2]}" max="${x[3]}" step="${x[5]}" value="${x[4]}" data-i="${i}"><span id="v${i}">${x[4]} ${x[6]||''}</span></div>`}).join('');
 document.querySelectorAll('#ct input').forEach(r=>{const x=tp.s[r.dataset.i];r.oninput=()=>{A[x[0]]=+r.value;$('#v'+r.dataset.i).textContent=r.value+' '+(x[6]||'')};r.onpointerdown=()=>{BASE=OUT.map(o=>o[1])}})}
T.forEach((t,k)=>{const b=document.createElement('button');b.innerHTML=`<b>${k+1}</b>${t[0]}`;b.onclick=()=>show(k+1);nav.append(b)});
show(10);requestAnimationFrame(frame);

document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x==b));['lab','th','fm'].forEach(i=>$('#'+i).hidden=i!=b.dataset.t)});
