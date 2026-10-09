(()=>{'use strict';
const $=id=>document.getElementById(id), canvas=$('canvas');
const STYLES=[['glass','◇','Liquid Glass','Iridescent forms'],['aurora','≋','Aurora','Light curtains'],['amoled','✧','AMOLED','Pure black neon'],['chrome','◈','Chrome','Metallic ribbons'],['sculpt','◉','Soft Sculpture','Sculptural forms'],['fractal','❋','Fractal Flow','Fluid turbulence']];
const P=[['#c7d5ff','#b48eff','#101832'],['#79ffdb','#4d9dff','#071c2b'],['#ffbdcc','#ff7fa7','#201027'],['#ffda91','#e66eaa','#27153e'],['#c8ffff','#69c0c5','#071a30'],['#ffffff','#7a90ff','#03020d']];
const DEFAULT={style:'glass',colors:P[0].slice(),seed:1729,intensity:76,flow:54,detail:58,glow:68,grain:7,rotation:0,width:1080,height:2400};
let state=structuredClone(DEFAULT),undo=[],redo=[],locked=false,ctx2=null,gl=null,program=null,uniforms={},timer=0;
const frag=`#version 300 es
precision highp float;
uniform vec2 u_resolution;uniform float u_seed,u_intensity,u_flow,u_detail,u_glow,u_rotation;uniform vec3 u_c0,u_c1,u_c2;uniform int u_style;
out vec4 fragColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=0.,v=.5;for(int i=0;i<5;i++){a+=v*noise(p);p=p*2.02+vec2(11.1,5.7);v*=.5;}return a;}
vec3 pal(float t){return mix(mix(u_c2,u_c0,smoothstep(0.,.6,t)),u_c1,smoothstep(.35,1.,t));}
float sdRoundBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){
vec2 uv=gl_FragCoord.xy/u_resolution;vec2 p=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
float a=u_rotation*6.2831853;mat2 rot=mat2(cos(a),-sin(a),sin(a),cos(a));p=rot*p;
float time=u_seed*.0031, power=u_intensity, flow=u_flow;
vec3 col=u_c2*.18;float n=fbm(p*2.8+time);
if(u_style==0){
 col=pal(.23+uv.y*.28)*.43;
 vec2 q=p;float blobs=0.,edge=0.,shine=0.;
 for(int i=0;i<5;i++){
  float fi=float(i);vec2 center=vec2(sin(time*.7+fi*2.3)*.36,cos(time*.4+fi*1.7)*.65);
  vec2 z=q-center;float theta=fi*.66+time*.17;z=mat2(cos(theta),-sin(theta),sin(theta),cos(theta))*z;
  float r=.19+.075*sin(fi*2.1+time);
  float d=sdRoundBox(z,vec2(r*.9,r*1.35),r*.68);
  float rim=exp(-abs(d)*120.)*(.5+.5*power);
  float interior=smoothstep(.02,-.045,d);
  float spec=pow(max(0.,1.-length(z-vec2(-r*.3,r*.55))/(r*.95)),5.);
  col=mix(col, pal(.15+fi*.17+n*.16)+vec3(spec)*.34,interior*(.23+.22*power));
  edge+=rim;shine+=spec*interior;
  blobs+=interior;
 }
 col+=edge*(mix(u_c0,u_c1,.45)*.75+vec3(.22))*power;
 col+=shine*vec3(.52,.62,.9)*power*.28;
 col+=pow(max(0.,1.-length(p-vec2(-.35,.4))*.95),4.)*u_c1*.12;
}
else if(u_style==1){
 col=mix(u_c2*.18,u_c2*.06,uv.y);
 for(int i=0;i<6;i++){
  float fi=float(i);float phase=fi*1.6+time;
  float x=sin(p.y*(2.7+flow*5.)+phase)*(.18+flow*.17)+sin(p.y*9.+phase)*.04+sin(phase)*.32;
  float curtain=exp(-pow((p.x-x)* (4.5+fi*.4),2.));
  float texture=.35+.65*fbm(vec2(p.y*3.5+fi,p.x*5.+time));
  col+=mix(u_c0,u_c1,fi/6.)*curtain*texture*(.13+.27*power);
 }
 col+=pow(max(0.,1.-length(p-vec2(.05,-.1))),3.)*u_c0*.06;
}
else if(u_style==2){
 col=vec3(0.);
 for(int i=0;i<5;i++){
  float fi=float(i),phase=fi*1.33+time;
  float y=sin(p.x*(3.+flow*8.)+phase)*(.1+.15*flow)+sin(p.x*10.+phase)*.03+sin(phase)*.3;
  float d=abs(p.y-y);float line=exp(-d*(160.+u_detail*130.));
  float bloom=exp(-d*(8.+u_glow*15.));
  col+=mix(u_c0,u_c1,fi/5.)*(line*.68+bloom*.11)*power;
 }
 col=max(col,vec3(0.));
}
else if(u_style==3){
 col=pal(uv.y*.45+n*.2)*.20;
 for(int i=0;i<5;i++){
  float fi=float(i);float y=sin(p.x*(3.2+flow*4.)+fi*.9+time)*.16+fi*.18-.38;
  float d=abs(p.y-y);
  float stripe=exp(-d*(14.+u_detail*12.));
  float spec=exp(-abs(d-.018)*120.);
  vec3 metal=mix(u_c0,u_c1,sin(p.x*9.+fi)*.5+.5);
  col+=metal*stripe*(.18+.45*power)+vec3(.9,.95,1.)*spec*.18*power;
 }
}
else if(u_style==4){
 col=pal(.25+uv.y*.45)*.45;
 for(int i=0;i<7;i++){
  float fi=float(i);vec2 c=vec2(sin(fi*2.4+time)*.42,cos(fi*1.6+time)*.7);
  float d=length((p-c)*vec2(.95,1.15));
  float radius=.15+.09*sin(fi*1.9);
  float ball=smoothstep(radius+.02,radius-.035,d);
  float light=clamp(dot(normalize(vec3(p-c,sqrt(max(.001,radius*radius-d*d)))),normalize(vec3(-.5,.7,1.))),0.,1.);
  col=mix(col,mix(u_c0,u_c1,fi/7.)*(.3+light*.75)+vec3(.13),ball*(.48+.43*power));
 }
}
else{
 vec2 q=p* (2.5+flow*4.);float warp=fbm(q+time);
 float f=fbm(q+vec2(warp*3.,warp*2.));float g=fbm(q*1.8+vec2(f*3.,-f*2.)+time*.3);
 float ridge=pow(1.-abs(sin((f+g)*9.)),5.);
 col=pal(f*.7+g*.35)*(.22+.7*power)*(.55+.45*g)+u_c0*ridge*.24;
}
float vign=1.-.34*smoothstep(.28,1.2,length(p));col*=vign;
col=1.-exp(-col*(.9+u_glow*.65));
fragColor=vec4(clamp(col,0.,1.),1.);
}`;
function compileShader(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
function initGL(){try{gl=canvas.getContext('webgl2',{alpha:false,preserveDrawingBuffer:true,antialias:false});if(!gl)return false;const v=compileShader(gl.VERTEX_SHADER,`#version 300 es
in vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}`),f=compileShader(gl.FRAGMENT_SHADER,frag);program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);for(const key of ['resolution','seed','intensity','flow','detail','glow','rotation','c0','c1','c2','style'])uniforms[key]=gl.getUniformLocation(program,'u_'+key);canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();show('GPU context lost. Reload to restore.');});return true}catch(e){console.warn(e);gl=null;return false}}
function hexColor(c){return [1,3,5].map(i=>parseInt(c.slice(i,i+2),16)/255)}
function fallbackDraw(w,h){const c=ctx2||canvas.getContext('2d');if(!c)return;ctx2=c;const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,state.style==='amoled'?'#000':state.colors[2]);g.addColorStop(.5,state.style==='amoled'?'#000':state.colors[0]);g.addColorStop(1,state.style==='amoled'?'#000':state.colors[1]);c.fillStyle=g;c.fillRect(0,0,w,h);let seed=state.seed;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};for(let i=0;i<12;i++){let x=rand()*w,y=rand()*h,r=(.1+rand()*.3)*Math.min(w,h);const grad=c.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,state.colors[i%2]+'aa');grad.addColorStop(1,state.colors[i%2]+'00');c.fillStyle=grad;c.fillRect(x-r,y-r,r*2,r*2)}}
function draw(w,h){canvas.width=w;canvas.height=h;if(gl){gl.viewport(0,0,w,h);gl.useProgram(program);gl.uniform2f(uniforms.resolution,w,h);gl.uniform1f(uniforms.seed,state.seed);for(const key of ['intensity','flow','detail','glow','rotation'])gl.uniform1f(uniforms[key],state[key]/100);for(let i=0;i<3;i++)gl.uniform3fv(uniforms['c'+i],hexColor(state.colors[i]));gl.uniform1i(uniforms.style,STYLES.findIndex(x=>x[0]===state.style));gl.drawArrays(gl.TRIANGLES,0,6);gl.finish()}else fallbackDraw(w,h)}
function preview(){const ratio=state.width/state.height;let w,h;if(ratio<1){h=900;w=Math.round(h*ratio)}else{w=1100;h=Math.round(w/ratio)}draw(w,h);$('cornerlabel').textContent=state.width+' × '+state.height;$('styleTitle').textContent=STYLES.find(x=>x[0]===state.style)[2];$('status').textContent=(gl?'WebGL2':'Canvas fallback')+' · rendered locally'}
function schedule(){clearTimeout(timer);timer=setTimeout(preview,45)}
function snapshot(){undo.push(JSON.stringify(state));if(undo.length>50)undo.shift();redo=[]}
function change(fn){snapshot();fn();sync();schedule()}
function sync(){document.querySelectorAll('.style').forEach(b=>b.classList.toggle('active',b.dataset.style===state.style));document.querySelectorAll('.palette').forEach(b=>b.classList.toggle('active',Number(b.dataset.index)===P.findIndex(p=>p.every((c,i)=>c===state.colors[i]))));state.colors.forEach((v,i)=>$('c'+i).value=v);for(const key of ['intensity','flow','detail','glow','grain','rotation']){const el=$(key);if(el){el.value=state[key];$(key+'Value').textContent=state[key]+'%'}}$('width').value=state.width;$('height').value=state.height;const preset=state.width+'x'+state.height;$('resolution').value=Array.from($('resolution').options).some(o=>o.value===preset)?preset:'custom';$('dims').hidden=$('resolution').value!=='custom'}
function show(t){const el=$('toast');el.textContent=t;el.hidden=false;clearTimeout(show.timer);show.timer=setTimeout(()=>el.hidden=true,2800)}
function saveFile(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function tab(id){document.querySelectorAll('.tab').forEach(e=>e.classList.toggle('active',e.dataset.tab===id));document.querySelectorAll('.tabpage').forEach(e=>e.hidden=e.id!==id)}
function savedList(){const box=$('saved');box.replaceChildren();let data=[];try{data=JSON.parse(localStorage.getItem('ws3.saved')||'[]')}catch{}if(!data.length){box.textContent='No saved designs yet';return}data.forEach((item,i)=>{const row=document.createElement('div');row.className='actions';const load=document.createElement('button');load.className='btn quiet';load.textContent=(item.style||'Design')+' · '+new Date(item.savedAt).toLocaleDateString();load.onclick=()=>{change(()=>{state={...DEFAULT,...item,colors:item.colors.slice()}});tab('create')};const del=document.createElement('button');del.className='btn quiet';del.textContent='×';del.setAttribute('aria-label','Delete saved design');del.onclick=()=>{data.splice(i,1);localStorage.setItem('ws3.saved',JSON.stringify(data));savedList()};row.append(load,del);box.append(row)})}
function init(){
 const styles=$('styles');STYLES.forEach(([key,symbol,title,sub])=>{const b=document.createElement('button');b.className='style';b.dataset.style=key;b.innerHTML='<span class="symbol">'+symbol+'</span><strong>'+title+'</strong><small>'+sub+'</small>';b.onclick=()=>change(()=>{state.style=key});styles.append(b)});
 P.forEach((colors,i)=>{const b=document.createElement('button');b.className='palette';b.dataset.index=i;b.style.background=`linear-gradient(135deg,${colors[0]},${colors[1]},${colors[2]})`;b.setAttribute('aria-label','Palette '+(i+1));b.onclick=()=>change(()=>state.colors=colors.slice());$('palettes').append(b)});
 ['intensity','flow','detail','glow','grain','rotation'].forEach((key)=>{const wrap=document.createElement('div'),label=document.createElement('div');label.className='sliderhead';const title=document.createElement('span');title.textContent=({intensity:'Material intensity',flow:'Shape / motion flow',detail:'Surface detail',glow:'Light bloom',grain:'Texture grain',rotation:'Rotation'})[key];const output=document.createElement('output');output.id=key+'Value';label.append(title,output);const slider=document.createElement('input');slider.type='range';slider.min=0;slider.max=100;slider.id=key;slider.onpointerdown=()=>snapshot();slider.oninput=()=>{state[key]=+slider.value;output.textContent=slider.value+'%';schedule()};slider.onchange=()=>{redo=[]};wrap.append(label,slider);$('sliders').append(wrap)});
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
 [0,1,2].forEach(i=>$('c'+i).onchange=e=>change(()=>state.colors[i]=e.target.value));
 $('resolution').onchange=e=>change(()=>{if(e.target.value!=='custom'){[state.width,state.height]=e.target.value.split('x').map(Number)}});
 for(const key of ['width','height'])$(key).onchange=e=>change(()=>state[key]=Math.max(256,Math.min(7680,Number(e.target.value)||1080)));
 $('random').onclick=()=>change(()=>{state.seed=Math.floor(Math.random()*1e8)});
 $('reset').onclick=()=>change(()=>{state=structuredClone(DEFAULT)});
 $('undo').onclick=()=>{if(!undo.length)return show('Nothing to undo');redo.push(JSON.stringify(state));state=JSON.parse(undo.pop());sync();schedule()};
 $('redo').onclick=()=>{if(!redo.length)return show('Nothing to redo');undo.push(JSON.stringify(state));state=JSON.parse(redo.pop());sync();schedule()};
 $('lock').onclick=()=>{locked=!locked;$('lockOverlay').hidden=!locked;const d=new Date();$('date').textContent=d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});$('time').textContent=d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',hour12:false})};
 $('fullscreen').onclick=()=>{const e=$('viewport');if(document.fullscreenElement)document.exitFullscreen();else e.requestFullscreen?.().catch(()=>show('Fullscreen unavailable'))};
 $('download').onclick=async()=>{const w=state.width,h=state.height;if(w*h>22000000)return show('Too large: reduce resolution to 22 MP or less');const max=gl?gl.getParameter(gl.MAX_RENDERBUFFER_SIZE):8192;if(w>max||h>max)return show('GPU limit exceeded; select a smaller size');$('status').textContent='Rendering full resolution…';await new Promise(r=>setTimeout(r,30));try{draw(w,h);const fmt=$('format').value;const mime=fmt==='jpeg'?'image/jpeg':fmt==='webp'?'image/webp':'image/png';const blob=await new Promise(r=>canvas.toBlob(r,mime,+$('quality').value/100));if(!blob)throw Error('Export failed');saveFile(blob,'wallpaper-'+state.style+'-'+state.seed+'.'+(blob.type==='image/png'?'png':fmt==='jpeg'?'jpg':'webp'));show('Wallpaper downloaded')}catch(e){show(e.message)}finally{schedule()}};
 $('save').onclick=()=>{let items=[];try{items=JSON.parse(localStorage.getItem('ws3.saved')||'[]')}catch{}items.unshift({...state,savedAt:Date.now()});items=items.slice(0,30);try{localStorage.setItem('ws3.saved',JSON.stringify(items));savedList();show('Saved on this device')}catch{show('Storage unavailable')}};
 $('exportJson').onclick=()=>saveFile(new Blob([JSON.stringify({version:3,design:state},null,2)],{type:'application/json'}),'wallpaper-studio-project.json');
 $('importJson').onchange=async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text()),s=data.design||data;if(!STYLES.some(x=>x[0]===s.style)||!Array.isArray(s.colors)||s.colors.length!==3||!s.colors.every(c=>/^#[0-9a-f]{6}$/i.test(c)))throw Error();change(()=>{state={...DEFAULT,...s,colors:s.colors.slice()};for(const k of ['intensity','flow','detail','glow','grain','rotation'])state[k]=Math.max(0,Math.min(100,Number(state[k])||0));for(const k of ['width','height'])state[k]=Math.max(256,Math.min(7680,Number(state[k])||1080));state.seed=Math.max(0,Number(state.seed)||1729)});show('Project imported')}catch{show('Invalid project file')}e.target.value=''};
 sync();savedList();initGL();preview();if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
init();
})();