/* Wallpaper Studio v4 — deterministic, dependency-free Canvas drawing engine. */
(function (root) {
  'use strict';
  const palettes = [
    {id:'ocean',name:'Midnight Blue',swatch:'#144a82',dark:['#030c1b','#0b1a30','#0f2543','#103258','#10416c','#11517d','#15658d','#1979a0','#228eae'],light:['#ffffff','#eef6fa','#e1eef5','#d2e4ee','#c2d9e6','#acc9db','#93b6cb','#789db8','#537b9e']},
    {id:'graphite',name:'Graphite',swatch:'#55585c',dark:['#050608','#131518','#292b2d','#404244','#595c5e','#757779','#96999a','#b1b3b4','#c8cbcc'],light:['#ffffff','#f4f5f6','#e6e8ea','#d6d9dc','#c5c9cd','#aeb3b9','#9299a1','#747d87','#56616c']},
    {id:'sand',name:'Warm Stone',swatch:'#86796d',dark:['#161312','#24201e','#332e2b','#48423e','#625a52','#7a7268','#9b9083','#baaea0','#d2c7b9'],light:['#eee9e1','#d9d2c8','#c8c0b4','#b4ab9f','#a0978b','#888075','#6c665e','#48433e','#272321']},
    {id:'cobalt',name:'Cobalt',swatch:'#3165cd',dark:['#050b26','#111b41','#192b60','#213d82','#2c54a4','#396ac2','#5586d5','#82a8e8','#acc7ee'],light:['#f8fbff','#e5edff','#cadbfc','#aac7f8','#82aaf3','#598fe7','#3b73ce','#2d5ba7','#223e7f']},
    {id:'coral',name:'Coral',swatch:'#c95f3b',dark:['#210c13','#3b1723','#612434','#883541','#b24d4c','#d56b57','#ed8d66','#f3b182','#f7cd9f'],light:['#fff2be','#f8b77b','#ef925e','#db6f50','#c45345','#a73a40','#802533','#571824','#310d16']},
    {id:'ember',name:'Ember',swatch:'#db690b',dark:['#1d0a03','#41120b','#6e2414','#a13b1c','#cc5b22','#ef812e','#f9a64b','#fbc573','#ffe2a2'],light:['#fff3c4','#ffce88','#ffaf5f','#f58b40','#df672c','#b84620','#8e2d18','#602018','#361512']},
    {id:'orchid',name:'Orchid',swatch:'#8c3ccf',dark:['#150924','#261039','#421a61','#622b8b','#813da9','#9d55bf','#b874d3','#d09aeb','#e9c6f6'],light:['#fffaff','#f5e8ff','#ebd0fa','#dab0f2','#bd8de2','#9c67cc','#7e4ead','#603987','#442c61']},
    {id:'forest',name:'Forest',swatch:'#315b3b',dark:['#05130d','#0e2619','#173923','#204d2d','#2f6638','#478048','#60975e','#85af7a','#acd0a0'],light:['#f9fdf7','#eaf6e8','#d3e9ce','#b8d9b2','#99c594','#76ac71','#588e5a','#397042','#215032']},
    {id:'steel',name:'Steel Blue',swatch:'#6a879a',dark:['#07121d','#122535','#1c3548','#29465d','#355e78','#4c7890','#6895aa','#8bb3c4','#bbd1db'],light:['#ffffff','#eff5f7','#e1ebf0','#d2e2e9','#bdd2dd','#a5c0cf','#83a6b9','#5d879c','#375d72']},
    {id:'deepsea',name:'Deep Sea',swatch:'#176da2',dark:['#03111a','#062b3a','#084253','#0a5a6c','#0b7685','#128f9e','#3ba8b5','#68c4cc','#a2dce0'],light:['#f7ffff','#e6f8fa','#c8edf0','#a9dfe5','#82ced8','#55b7c7','#2b96aa','#18798d','#0b556a']},
    {id:'ruby',name:'Ruby',swatch:'#a03938',dark:['#190609','#310c10','#56151b','#79232a','#9e353c','#be4c4d','#d96e67','#e99b8a','#f1c5ac'],light:['#fff5ee','#f9dcd3','#f1b9b0','#e89591','#d57172','#b7515b','#923640','#6c252f','#45171e']},
    {id:'jade',name:'Jade',swatch:'#27816b',dark:['#031915','#0c3028','#124638','#1b614e','#247d62','#3b9776','#65b497','#92cbb5','#b9dfd0'],light:['#f9fffc','#e3f7ef','#c8eddd','#a4dcc6','#7bc9aa','#52b28f','#329671','#1b775b','#10533f']},
    {id:'plum',name:'Plum',swatch:'#80305f',dark:['#170917','#2c122b','#4b1b45','#6b285c','#8a3b72','#a9568d','#c374a8','#d59dbd','#e9c7d6'],light:['#fff8fc','#f5e6f0','#ebd1e3','#dfb4d1','#c88fb9','#aa6a9a','#8d4b7d','#69335f','#4b2546']},
    {id:'wine',name:'Wine',swatch:'#80090e',dark:['#140204','#2b0308','#450810','#660b18','#861625','#ac2f3c','#cf5158','#e58183','#f1b2b2'],light:['#fff7f4','#f9e2df','#edc5c4','#dca0a1','#c7787f','#a94c5a','#832735','#5b1824','#360d16']}
  ];
  const styles = [
    {id:'terrain',label:'Terrain',category:'classic',subtitle:'Layered silhouettes'},
    {id:'gradient',label:'Gradient',category:'classic',subtitle:'Soft horizon'},
    {id:'dunes',label:'Soft Dunes',category:'classic',subtitle:'Smooth hills'},
    {id:'landscape',label:'Landscapes',category:'classic',subtitle:'Organic layers'},
    {id:'arcs',label:'Concentric Arcs',category:'classic',subtitle:'Perfectly spaced'},
    {id:'contours',label:'Contours',category:'classic',subtitle:'Abstract lines'},
    {id:'aurora',label:'Aurora',category:'advanced',subtitle:'Luminous curtains'},
    {id:'amoled',label:'AMOLED Neon',category:'advanced',subtitle:'True black glow'},
    {id:'glass',label:'Glass Forms',category:'advanced',subtitle:'Translucent shapes'}
  ];
  const defaults = {style:'terrain',palette:'graphite',mode:'dark',seed:6172,layers:7,curve:53,height:47,detail:55,glow:56};
  function rng(s) {let a=(s>>>0)||1;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
  function clamp(a,min,max){return Math.max(min,Math.min(max,a))}
  function hexToRGB(str){return [1,3,5].map(k=>parseInt(str.slice(k,k+2),16))}
  function mixHex(a,b,t){let x=hexToRGB(a),y=hexToRGB(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')}
  function getColors(conf){let pal=palettes.find(p=>p.id===conf.palette)||palettes[0];return pal[conf.mode==='light'?'light':'dark']}
  function sample(colors,i,n){let t=i*(colors.length-1)/(Math.max(1,n-1));let k=Math.floor(t);return mixHex(colors[k],colors[Math.min(k+1,colors.length-1)],t-k)}
  function finishPath(ctx,w,h){ctx.lineTo(w,h+2);ctx.lineTo(0,h+2);ctx.closePath();ctx.fill()}
  function arcs(ctx,w,h,c,colors,r){const n=c.layers;const top=h*(.40+(100-c.height)*.0028);const radius=Math.max(w*.71,h*.60)*(1.0+(c.curve-50)*.002);const cx=w*(.5+(r()-.5)*.09),cy=top+radius;ctx.fillStyle=colors[0];ctx.fillRect(0,0,w,h);const spacing=(h-top)/(n+.13);for(let i=0;i<n;i++){let rad=radius-i*spacing;if(rad<=0)continue;ctx.beginPath();ctx.arc(cx,cy,rad,0,Math.PI*2);ctx.fillStyle=sample(colors,i+1,n+1);ctx.fill()}}
  function terrain(ctx,w,h,c,colors,r){let n=c.layers,base=h*(.36+(100-c.height)*.0022),span=h*(.50+(c.height-45)*.0014),d=c.detail/100;ctx.fillStyle=colors[0];ctx.fillRect(0,0,w,h);for(let i=0;i<n;i++){const y=base+(i/(n-1))*span;let phases=Array.from({length:5},()=>r()*Math.PI*2),freq=1.5+i*.2, amp=h*(.035+(1-i/n)*.032)*(0.35+d);ctx.beginPath();for(let k=0;k<=340;k++){let x=w*k/340;let nx=k/340;let wave=Math.sin(nx*Math.PI*2*freq+phases[0])*.40+Math.sin(nx*Math.PI*2*(freq*2.16)+phases[1])*.22+Math.sin(nx*Math.PI*2*(freq*3.97)+phases[2])*.13+Math.sin(nx*Math.PI*2*(freq*11.8)+phases[3])*.105+Math.sin(nx*Math.PI*2*(freq*42.1)+phases[4])*.09;let yy=y+amp*wave*(.8+.4*Math.sin(nx*4));if(k===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy)}ctx.fillStyle=sample(colors,i+1,n+1);finishPath(ctx,w,h)}}
  function drawWave(ctx,w,h,c,colors,r,kind){let n=c.layers,top=h*(.40+(100-c.height)*.0027),step=(h-top)/(n+.30),wiggle=c.curve/100;ctx.fillStyle=colors[0];ctx.fillRect(0,0,w,h);let shifts=Array.from({length:n},()=>r());for(let i=0;i<n;i++){let y=top+i*step,offset=(shifts[i]-.5)*step*.85;let amp=(kind==='dunes'?.05:.095)*h*(.20+.8*wiggle),phase=(shifts[i]*2-1);ctx.beginPath();ctx.moveTo(-w*.03,y+offset);if(kind==='dunes'){
   ctx.bezierCurveTo(w*.26,y-amp*.75+offset+phase*amp,w*.61,y+amp*.64+offset,w*1.03,y+offset-amp*.20);
  }else{
   // Catmull-Rom interpolation produces tangent-continuous hills (no sharp corners).
   let s=shifts[i],positions=[-.03,.19,.45,.71,1.03];
   let ys=[y+offset,y-amp*(.45+s*.45),y+amp*(s-.60),y-amp*(.20+s*.32),y+amp*(.28-s*.4)];
   for(let k=0;k<positions.length-1;k++){
    const prev=Math.max(0,k-1),next=Math.min(positions.length-1,k+2);
    const x1=positions[k]*w,x2=positions[k+1]*w;
    const cp1x=x1+(positions[k+1]-positions[prev])*w/6,cp1y=ys[k]+(ys[k+1]-ys[prev])/6;
    const cp2x=x2-(positions[next]-positions[k])*w/6,cp2y=ys[k+1]-(ys[next]-ys[k])/6;
    ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,ys[k+1]);
   }
  }ctx.fillStyle=sample(colors,i+1,n+1);finishPath(ctx,w,h)}}
  function gradient(ctx,w,h,c,colors,r){ctx.fillStyle=colors[0];ctx.fillRect(0,0,w,h);const start=.27+(100-c.height)*.0033;let g=ctx.createLinearGradient(0,h*start,0,h);for(let i=0;i<colors.length;i++)g.addColorStop(i/(colors.length-1),colors[i]);ctx.fillStyle=g;ctx.fillRect(0,h*start,w,h*(1-start));let n=Math.max(3,c.layers-2);for(let i=0;i<n;i++){let y=h*(.75+i*.047),a=(.07+i*.03)*c.curve/80;ctx.beginPath();ctx.ellipse(w*(.5+(r()-.5)*.22),y,w*(.75+i*.03),h*(.12+i*.03),0,Math.PI,2*Math.PI);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fillStyle=sample(colors,Math.min(i+3,colors.length-1),colors.length);ctx.globalAlpha=Math.min(.35,a);ctx.fill();ctx.globalAlpha=1}}
  function contours(ctx,w,h,c,colors,r){ctx.fillStyle=colors[0];ctx.fillRect(0,0,w,h);let n=Math.floor(35+c.detail*1.7);let offset=c.seed*.025;ctx.save();ctx.lineWidth=Math.max(1,Math.min(w,h)*.0016);for(let i=0;i<n;i++){let start=(i+.5)/n,centerX=w*(.48+Math.sin(i*.43+offset)*.17),centerY=h*(.46+Math.cos(i*.32+offset)*.18);let radius=(.035+i/n*.64)*Math.min(w,h)*1.25;ctx.beginPath();let steps=200;for(let j=0;j<=steps;j++){let theta=j/steps*Math.PI*2,dist=radius*(1+.14*Math.sin(theta*4+i*.11)+.09*Math.sin(theta*7.0-i*.18)+.05*Math.sin(theta*13+i*.04));let x=centerX+Math.cos(theta)*dist*1.32,y=centerY+Math.sin(theta)*dist*1.1;if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.strokeStyle=sample(colors,Math.round(start*(colors.length-1)),colors.length);ctx.globalAlpha=.18+start*.60;ctx.stroke()}ctx.restore()}
  function aurora(ctx,w,h,c,colors,r){ctx.fillStyle='#030a14';ctx.fillRect(0,0,w,h);let n=4+(c.layers>>1);ctx.save();ctx.globalCompositeOperation='screen';for(let j=0;j<n;j++){let start=w*(.12+r()*.80),amp=w*(.04+r()*.12),y0=h*(-.15+r()*.24),y1=h*(.6+r()*.4);for(let i=0;i<70;i++){let t=i/69,y=y0+(y1-y0)*t,x=start+Math.sin(t*5.0+j*1.74)*amp+Math.sin(t*12+j)*amp*.16;let alpha=(.014+.024*(c.glow/100))*Math.sin(Math.PI*t);ctx.lineWidth=Math.max(1,w*.009);ctx.strokeStyle=(j%2===0?colors[5]:colors[7]);ctx.globalAlpha=Math.max(0,alpha);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sin(t*5+j)*amp*.35,y+(y1-y0)/38);ctx.stroke()}}ctx.restore()}
  function amoled(ctx,w,h,c,colors,r){ctx.fillStyle='#000000';ctx.fillRect(0,0,w,h);let colorset=[colors[5],colors[7],colors[4]];let n=Math.min(8,c.layers+1);for(let j=0;j<n;j++){let y=h*(.2+j*.12),start=w*(r()*.6-.2),end=w*(1.1+r()*.2);let path=new Path2D();path.moveTo(start,y);path.bezierCurveTo(w*.28,y-h*(.13+r()*.15),w*.56,y+h*(.13+r()*.15),end,y-h*.1);let col=colorset[j%3];ctx.save();ctx.strokeStyle=col;ctx.globalAlpha=.36*c.glow/75;ctx.shadowColor=col;ctx.shadowBlur=w*.045;ctx.lineWidth=Math.max(3,w*.015);ctx.stroke(path);ctx.globalAlpha=.9;ctx.shadowBlur=w*.014;ctx.lineWidth=Math.max(1,w*.003);ctx.stroke(path);ctx.restore()}}
  function glass(ctx,w,h,c,colors,r){let bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,colors[0]);bg.addColorStop(1,colors[3]);ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);let n=3+Math.floor(c.layers/2),unit=Math.min(w,h);for(let j=0;j<n;j++){let x=w*(.16+r()*.65),y=h*(.10+r()*.78),sz=unit*(.12+r()*.29),ang=(r()-.5)*.9;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.shadowColor=colors[7];ctx.shadowBlur=sz*.3;let g=ctx.createLinearGradient(-sz,-sz,sz,sz);g.addColorStop(0,colors[8]+'bb');g.addColorStop(.3,'#ffffff11');g.addColorStop(.67,colors[5]+'44');g.addColorStop(1,colors[7]+'88');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(-sz*.65,-sz,sz*1.3,sz*2,sz*.5);ctx.fill();ctx.shadowBlur=0;ctx.lineWidth=sz*.027;ctx.strokeStyle='#ffffff66';ctx.stroke();ctx.beginPath();ctx.moveTo(-sz*.45,-sz*.66);ctx.quadraticCurveTo(-sz*.3,-sz*.85,sz*.3,-sz*.76);ctx.strokeStyle='#ffffff99';ctx.lineWidth=sz*.036;ctx.stroke();ctx.restore()}}
  function draw(ctx,w,h,raw={}){const c={...defaults,...raw},colors=getColors(c),r=rng(c.seed);if(!ctx||!w||!h)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';if(c.style==='arcs')arcs(ctx,w,h,c,colors,r);else if(c.style==='dunes')drawWave(ctx,w,h,c,colors,r,'dunes');else if(c.style==='landscape')drawWave(ctx,w,h,c,colors,r,'landscape');else if(c.style==='terrain')terrain(ctx,w,h,c,colors,r);else if(c.style==='gradient')gradient(ctx,w,h,c,colors,r);else if(c.style==='contours')contours(ctx,w,h,c,colors,r);else if(c.style==='aurora')aurora(ctx,w,h,c,colors,r);else if(c.style==='amoled')amoled(ctx,w,h,c,colors,r);else if(c.style==='glass')glass(ctx,w,h,c,colors,r);ctx.restore()}
  root.WallpaperEngine={draw,styles,palettes,defaults,getColors,rng};
})(window);
