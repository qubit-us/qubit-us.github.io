const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
for(const file of ['index.html','rydes/index.html','wecarevets/index.html']){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 const stylesheet=html.match(/href="(\/assets\/css\/(?:home|rydes|wecarevets)\.([a-f0-9]{12})\.css)"/);
 if(!stylesheet)throw Error(file+': stylesheet must have a content hash so stale CSS cannot hide new UI');
 const css=fs.readFileSync(path.join(root,stylesheet[1]),'utf8');
 const cssHash=crypto.createHash('sha256').update(css).digest('hex').slice(0,12);
 if(stylesheet[2]!==cssHash)throw Error(file+': stylesheet hash does not match its contents');
 if(file==='index.html'){
  if(!css.includes('.process-grid{display:grid')||!css.includes('.process-photo{')||!css.includes('.product-title{'))throw Error('Homepage photographic process or logo layout styles are missing');
  if((html.match(/src="\/assets\/process\/[^\"]+\.jpg"/g)||[]).length!==4)throw Error('All four process steps must have real photographic assets');
 }
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(ids.length!==new Set(ids).size)throw Error(file+': duplicate element ids');
 if(/127\.0\.0\.1|localhost|p\.superdesign\.dev|cdn\.tailwindcss\.com|hmac-uploads/.test(html))throw Error(file+': preview dependency remains');
 for(const [,href]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   if(href.startsWith('#')&&href.length>1&&!ids.includes(href.slice(1)))throw Error(file+': broken anchor '+href);
   if(href.startsWith('/')){
     let local=path.join(root,href);
     if(fs.existsSync(local)&&fs.statSync(local).isDirectory())local=path.join(local,'index.html');
     if(!fs.existsSync(local))throw Error(file+': missing local asset '+href);
   }
 }
 for(const [,attrs,code]of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!attrs.includes('src='))new vm.Script(code,{filename:file});
 console.log(file+': assets, links and inline JavaScript verified');
}
if(fs.readFileSync(path.join(root,'CNAME'),'utf8').trim()!=='qubit-us.com')throw Error('Custom domain changed');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const href of ['/rydes/','/wecarevets/','https://sportsdibs.com/','mailto:qubit.usa@gmail.com'])if(!home.includes('href="'+href+'"'))throw Error('Missing required link '+href);
console.log('Custom domain, required product routes and contact links verified');
require('./verify-formfidence.cjs');
