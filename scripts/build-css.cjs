const path=require('node:path');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
for(const name of ['home','rydes','wecarevets']){
 const result=spawnSync(process.execPath,[require.resolve('tailwindcss/lib/cli.js'),'-i','assets/css/input.css','-o','assets/css/'+name+'.css','-c','config/tailwind-'+name+'.cjs','--minify'],{cwd:root,stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
 const css=fs.readFileSync(path.join(root,'assets/css/'+name+'.css'));
 const hash=crypto.createHash('sha256').update(css).digest('hex').slice(0,12);
 const asset='/assets/css/'+name+'.'+hash+'.css';
 fs.writeFileSync(path.join(root,asset),css);
 const page=path.join(root,name==='home'?'index.html':name+'/index.html');
 const html=fs.readFileSync(page,'utf8');
 const stylesheet=new RegExp('href="/assets/css/'+name+'(?:\\.[a-f0-9]{12})?\\.css"','g');
 if(!stylesheet.test(html))throw Error('Missing stylesheet link in '+page);
 fs.writeFileSync(page,html.replace(stylesheet,'href="'+asset+'"'));
 console.log(name+': '+asset);
}
