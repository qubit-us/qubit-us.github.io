const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'formfidence/index.html');
let html=fs.readFileSync(file,'utf8');
for(const ext of ['css','js']){
  const source=path.join(root,'assets/formfidence/formfidence.'+ext);
  const bytes=fs.readFileSync(source);
  const hash=crypto.createHash('sha256').update(bytes).digest('hex').slice(0,12);
  const url='/assets/formfidence/formfidence.'+hash+'.'+ext;
  fs.writeFileSync(path.join(root,url),bytes);
  const pattern=new RegExp('/assets/formfidence/formfidence(?:\\.[a-f0-9]{12})?\\.'+ext,'g');
  if(!pattern.test(html))throw Error('Missing Formfidence '+ext+' reference');
  html=html.replace(pattern,url);
  console.log('Formfidence: '+url);
}
fs.writeFileSync(file,html);
