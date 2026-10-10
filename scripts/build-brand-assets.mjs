
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import * as simpleIcons from 'simple-icons';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [sourceSvg,sourcePng]=process.argv.slice(2);
if(!sourceSvg||!sourcePng) throw new Error('Missing Lobe package source directories');
const assets=path.join(root,'assets');
const mkdir=(dir)=>fs.mkdirSync(dir,{recursive:true});
const put=(p,t)=>{mkdir(path.dirname(p));fs.writeFileSync(p,t);};
const copy=(s,d)=>{mkdir(path.dirname(d));fs.copyFileSync(s,d);};
const scan=(p,ext)=>{
  if(!fs.existsSync(p)) throw new Error('Missing package path: '+p);
  return fs.readdirSync(p).filter(n=>n.endsWith(ext)).sort();
};
const svgFiles=scan(path.join(sourceSvg,'icons'),'.svg');
const pngLight=scan(path.join(sourcePng,'light'),'.png');
const pngDark=scan(path.join(sourcePng,'dark'),'.png');
if(Math.min(svgFiles.length,pngLight.length,pngDark.length)<100) throw new Error('Incomplete Lobe asset distribution');
for(const name of svgFiles)copy(path.join(sourceSvg,'icons',name),path.join(assets,'brands/lobe/svg',name));
for(const name of pngLight)copy(path.join(sourcePng,'light',name),path.join(assets,'brands/lobe/png/light',name));
for(const name of pngDark)copy(path.join(sourcePng,'dark',name),path.join(assets,'brands/lobe/png/dark',name));
const light=new Set(pngLight),dark=new Set(pngDark);
const logos=svgFiles.map(file=>{
  const slug=file.slice(0,-4);
  return {slug,provider:'lobe',svg:'brands/lobe/svg/'+file,
    pngLight:light.has(slug+'.png')?'brands/lobe/png/light/'+slug+'.png':null,
    pngDark:dark.has(slug+'.png')?'brands/lobe/png/dark/'+slug+'.png':null};
});
const shortlist=[
'openai','anthropic','googlegemini','perplexity','deepseek','mistralai',
'github','githubcopilot','gitlab','git','githubactions','gitbook','figma',
'canva','adobeaftereffects','adobepremierepro','blender','obsstudio',
'discord','slack','reddit','instagram','facebook','threads','tiktok','youtube','twitch',
'x','linkedin','telegram','whatsapp','notion','linear','cursor','visualstudiocode',
'jetbrains','vscodium','docker','kubernetes','vercel','netlify','cloudflare',
'render','railway','supabase','firebase','postgresql','redis','mongodb','react',
'nextdotjs','vite','tailwindcss','typescript','javascript','python','nodedotjs',
'tensorflow','pytorch','huggingface','ollama','langchain','replicate',
'nvidia','amd','intel','google','googlechrome','apple','android',
'amazonaws','microsoftazure','linux','ubuntu','brave','firefox','unrealengine',
'unity','godotengine','steam','wordpress','framer','webflow',
'openrouter','elevenlabs','midjourney','stabilityai','cohere'];
const candidates=new Map();
for(const val of Object.values(simpleIcons)){
 if(val&&typeof val==='object'&&typeof val.slug==='string'&&typeof val.svg==='string'&&/^[a-fA-F0-9]{6}$/.test(val.hex||'')) candidates.set(val.slug,val);
}
const missing=[];
for(const slug of shortlist){
 const icon=candidates.get(slug);
 if(!icon){missing.push(slug);continue;}
 const svg=icon.svg.replace('<svg ','<svg fill="#'+icon.hex+'" ');
 const p='brands/simple-icons/svg/'+slug+'.svg';
 const q='brands/simple-icons/png/'+slug+'.png';
 put(path.join(assets,p),svg);
 mkdir(path.dirname(path.join(assets,q)));
 await sharp(Buffer.from(svg)).resize(512,512,{fit:'contain'}).png().toFile(path.join(assets,q));
 logos.push({slug,provider:'simple-icons',title:icon.title,hex:icon.hex,svg:p,pngLight:q,pngDark:q,source:icon.source,guidelines:icon.guidelines||null,license:icon.license||null});
}
const featuredSlugs=['chatgpt','openai','claude','claudecode','claude-code','anthropic','cursor',
'gemini','google-gemini','googlegemini','codex','deepseek','grok','perplexity',
'copilot','githubcopilot','github-copilot','midjourney','huggingface','hugging-face',
'mistral','mistralai','elevenlabs','ollama','notion','windsurf','v0','lovable',
'bolt','replit','sora','ideogram','runway','firefly','kling','pika','manus',
'openrouter','langchain','google','github','figma','youtube','discord','nvidia'];
const versions={
 generatedAt:new Date().toISOString(),
 sources:[
 {name:'Lobe Icons SVG',url:'https://github.com/lobehub/lobe-icons',package:'@lobehub/icons-static-svg',version:JSON.parse(fs.readFileSync(path.join(sourceSvg,'package.json'),'utf8')).version},
 {name:'Lobe Icons PNG',url:'https://github.com/lobehub/lobe-icons',package:'@lobehub/icons-static-png',version:JSON.parse(fs.readFileSync(path.join(sourcePng,'package.json'),'utf8')).version},
 {name:'Simple Icons',url:'https://github.com/simple-icons/simple-icons',version:JSON.parse(fs.readFileSync(path.join(root,'node_modules/simple-icons/package.json'),'utf8')).version,license:'CC0 (icon artwork); company trademarks still protected'}
 ],
 missingSimpleIcons:missing,
};
const totals={lobeSvg:svgFiles.length,lobePngLight:pngLight.length,lobePngDark:pngDark.length,simpleIcons:logos.filter(x=>x.provider==='simple-icons').length};
put(path.join(assets,'brands/index.json'),JSON.stringify({generatedAt:versions.generatedAt,totals,
 featured:logos.filter(x=>featuredSlugs.includes(x.slug)),brands:logos},null,2));
put(path.join(assets,'brands/source-versions.json'),JSON.stringify({...versions,totals},null,2));

const art=path.join(assets,'artwork');
mkdir(path.join(art,'png'));
const gallery=[];
const baseDefs='<defs><radialGradient id="a"><stop stop-color="#34c4e9" stop-opacity=".7"/><stop offset="1" stop-color="#273aa9" stop-opacity="0"/></radialGradient><linearGradient id="b" x2="1" y2="1"><stop stop-color="#69e6eb"/><stop offset="1" stop-color="#7966fb"/></linearGradient></defs>';
async function artwork(slug,shape){
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">'+baseDefs+shape+'</svg>';
 const vector='artwork/svg/'+slug+'.svg',raster='artwork/png/'+slug+'.png';
 put(path.join(assets,vector),svg);
 await sharp(Buffer.from(svg)).png().toFile(path.join(assets,raster));
 gallery.push({slug,svg:vector,png:raster,size:[1080,1920],background:'transparent'});
}
await artwork('aurora-halo','<ellipse cx="540" cy="870" rx="550" ry="700" fill="url(#a)"/>');
await artwork('orbit-rings',[225,345,455,580].map((r,i)=>'<circle cx="540" cy="960" r="'+r+'" stroke="url(#b)" stroke-width="'+(6-i)+'" fill="none" opacity="'+(.8-i*.14)+'"/>').join(''));
const dots=[];
for(let x=50;x<1080;x+=78)for(let y=80;y<1920;y+=78){
 const v=Math.abs(Math.sin(x*.037+y*.071));
 if(v>.69)dots.push('<circle cx="'+x+'" cy="'+y+'" r="'+(v*3.8).toFixed(1)+'" fill="#8bddff" opacity="'+(v*.62).toFixed(2)+'"/>');
}
await artwork('particle-field',dots.join(''));
const wire=[];
for(let i=0;i<18;i++){const y=75+i*94;wire.push('<path d="M0 '+y+'H'+(140+(i*47)%540)+'l90 '+(i%2?50:-50)+'H1080" fill="none" stroke="#58d7ed" stroke-width="3" stroke-opacity=".38"/>');}
await artwork('circuit-traces',wire.join(''));
await artwork('focus-target','<rect x="110" y="500" width="860" height="930" rx="45" fill="none" stroke="url(#b)" stroke-width="6"/><path d="M110 650V500h145M825 500h145v150M110 1280v150h145M825 1430h145v-150" fill="none" stroke="#81ebff" stroke-width="16" stroke-linecap="round"/>');
const links=[];
for(let i=0;i<30;i++){
 const x=120+(i*179)%850,y=185+(i*281)%1530,x2=120+((i+7)*179)%850,y2=185+((i+11)*281)%1530;
 links.push('<path d="M'+x+' '+y+'L'+x2+' '+y2+'" stroke="#66cced" stroke-width="3" stroke-opacity=".24"/>');
 links.push('<circle cx="'+x+'" cy="'+y+'" r="'+(4+i%7)+'" fill="#97eaff" opacity=".65"/>');
}
await artwork('neural-network',links.join(''));
await artwork('audio-waveform',Array.from({length:72},(_,i)=>{const h=28+Math.abs(Math.sin(i*.37)*Math.cos(i*.21))*350;return '<rect x="'+(22+i*14.4).toFixed(1)+'" y="'+(965-h/2).toFixed(1)+'" width="7.5" height="'+h.toFixed(1)+'" rx="4" fill="#59d6ec" opacity=".6"/>';}).join(''));
await artwork('glass-panel','<rect x="90" y="430" width="900" height="940" rx="60" fill="#406bc6" fill-opacity=".12" stroke="#91def2" stroke-opacity=".65" stroke-width="5"/><path d="M135 515H940" stroke="#bee9ff" stroke-opacity=".3" stroke-width="3"/>');
await artwork('kinetic-burst',Array.from({length:40},(_,i)=>{const angle=2*Math.PI*i/40,r1=170,r2=450+(i%4)*33;return '<path d="M'+(540+Math.cos(angle)*r1).toFixed(1)+' '+(940+Math.sin(angle)*r1).toFixed(1)+'L'+(540+Math.cos(angle)*r2).toFixed(1)+' '+(940+Math.sin(angle)*r2).toFixed(1)+'" stroke="#65d9fb" stroke-opacity=".5" stroke-width="'+(2+i%5)+'"/>';}).join(''));
put(path.join(assets,'artwork/index.json'),JSON.stringify({origin:'Original procedural artwork; no third-party brands embedded',assets:gallery},null,2));
console.log(JSON.stringify({success:true,totals,artwork:gallery.length,featured:featuredSlugs.filter(x=>logos.some(y=>y.slug===x)),missing},null,2));
