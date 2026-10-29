const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const photos=[
 {name:'discover',url:'https://images.pexels.com/photos/5256993/pexels-photo-5256993.jpeg?auto=compress&cs=tinysrgb&w=1400',source:'https://www.pexels.com/photo/businessmen-writing-and-discussing-5256993/',credit:'Thirdman / Pexels'},
 {name:'prototype',url:'https://images.pexels.com/photos/9317525/pexels-photo-9317525.jpeg?auto=compress&cs=tinysrgb&w=1400',source:'https://www.pexels.com/photo/laptop-with-video-editing-software-9317525/',credit:'Adam Sondel / Pexels'},
 {name:'refine',url:'https://images.pexels.com/photos/39219944/pexels-photo-39219944/free-photo-of-diverse-team-analyzing-data-on-laptop-in-modern-office.jpeg?auto=compress&cs=tinysrgb&w=1400',source:'https://www.pexels.com/photo/diverse-team-analyzing-data-on-laptop-in-modern-office-39219944/',credit:'Vitaly Gariev / Pexels'},
 {name:'launch',url:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',source:'https://images.unsplash.com/photo-1551288049-bebda4e38f71',credit:'Unsplash'}
];
(async()=>{
 fs.mkdirSync(path.join(root,'assets/process'),{recursive:true});
 for(const photo of photos){
  const response=await fetch(photo.url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw Error(photo.name+': '+response.status);
  const bytes=Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(path.join(root,'assets/process',photo.name+'.jpg'),bytes);
  console.log(photo.name+': '+bytes.length+' bytes');
 }
 const creditPath=path.join(root,'photo-credits.json');
 const credits=JSON.parse(fs.readFileSync(creditPath,'utf8'));credits.process=photos;
 fs.writeFileSync(creditPath,JSON.stringify(credits,null,2)+'\n');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
