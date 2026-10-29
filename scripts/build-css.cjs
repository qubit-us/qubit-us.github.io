const path=require('node:path');
const {spawnSync}=require('node:child_process');
for(const name of ['home','rydes','wecarevets']){
 const result=spawnSync(process.execPath,[require.resolve('tailwindcss/lib/cli.js'),'-i','assets/css/input.css','-o','assets/css/'+name+'.css','-c','config/tailwind-'+name+'.cjs','--minify'],{cwd:path.resolve(__dirname,'..'),stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
}
