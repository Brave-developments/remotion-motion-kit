import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const catalogue=JSON.parse(fs.readFileSync(path.join(root,'assets/brands/index.json'),'utf8'));
const mapping=JSON.parse(fs.readFileSync(path.join(root,'assets/brands/aliases.json'),'utf8'));
const query=process.argv.slice(2).join(' ').trim().toLowerCase();
if(!query){console.error('Usage: node scripts/find-brand-asset.mjs "Claude Code"');process.exit(2);}
const normalized=query.replace(/[^a-z0-9]/g,'');
const alias=mapping.aliases.find(a=>a.terms.some(t=>t.replace(/[^a-z0-9]/g,'')===normalized));
const key=alias?alias.assetSlug:normalized;
const results=catalogue.brands.filter(b=>b.slug.replace(/[^a-z0-9]/g,'')===key);
if(!results.length){
 const approximate=catalogue.brands.filter(b=>b.slug.toLowerCase().includes(query.replace(/\s+/g,''))).slice(0,20);
 console.log(JSON.stringify({query,found:false,approximate},null,2));
 process.exit(1);
}
results.sort((a,b)=>((a.provider==='lobe')?0:1)-((b.provider==='lobe')?0:1));
console.log(JSON.stringify({query,matchedSlug:key,aliasNote:alias?.note||null,matches:results},null,2));
