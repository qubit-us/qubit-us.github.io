const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const files=['formfidence/index.html',...['01-workspace','02-interview','03-review','04-updates'].map(n=>'formfidence/demo/'+n+'.html')];
for(const name of files){
  const html=fs.readFileSync(path.join(root,name),'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)throw Error(name+': duplicate ids');
  if(/p\.superdesign\.dev|hmac-uploads|cdn\.tailwindcss\.com|localhost|127\.0\.0\.1/.test(html))throw Error(name+': preview reference left in production');
  for(const[,value]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(value.startsWith('#')){if(value.length>1&&!ids.includes(value.slice(1)))throw Error(name+': missing anchor '+value);continue;}
    if(/^(https?:|mailto:|data:)/.test(value))continue;
    let target=value.startsWith('/')?path.join(root,value):path.resolve(root,path.dirname(name),value);
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
    if(!fs.existsSync(target))throw Error(name+': missing local resource '+value);
  }
  for(const[,attrs,code]of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!attrs.includes('src='))new vm.Script(code,{filename:name});
  console.log(name+': local resources, anchors and script syntax verified');
}
const html=fs.readFileSync(path.join(root,files[0]),'utf8');
for(const ext of ['css','js']){
  const match=html.match(new RegExp('/assets/formfidence/formfidence\.([a-f0-9]{12})\.'+ext));
  if(!match)throw Error('Missing hashed Formfidence '+ext);
  const bytes=fs.readFileSync(path.join(root,match[0]));
  if(crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12)!==match[1])throw Error('Wrong '+ext+' content hash');
  if(ext==='js')new vm.Script(bytes.toString(),{filename:match[0]});
}
for(const token of ['In development','intended design','No research request is sent','qubit.usa@gmail.com'])if(!html.includes(token))throw Error('Missing material disclosure or verified contact: '+token);
if(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('href="/formfidence/"'))throw Error('Missing homepage discovery route');
if(!fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('https://qubit-us.com/formfidence/'))throw Error('Missing sitemap route');
console.log('Formfidence routes, cache versions and material product boundaries verified');
