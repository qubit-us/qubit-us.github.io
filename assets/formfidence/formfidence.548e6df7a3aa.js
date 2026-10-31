'use strict';
const menu=document.querySelector('.menu-button');
const nav=document.getElementById('site-navigation');
if(menu&&nav){
  function closeMenu(returnFocus=false){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');if(returnFocus)menu.focus();}
  menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';nav.classList.toggle('is-open',!expanded);menu.setAttribute('aria-expanded',String(!expanded));});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
  window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
}
const tabs=[...document.querySelectorAll('[role="tab"]')];
function activateTab(tab,moveFocus=false){
  tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;});
  if(moveFocus)tab.focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateTab(tab));
  tab.addEventListener('keydown',event=>{
    let target;
    if(event.key==='ArrowRight')target=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')target=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')target=0;
    if(event.key==='End')target=tabs.length-1;
    if(target!==undefined){event.preventDefault();activateTab(tabs[target],true);}
  });
});
document.querySelectorAll('input[name="research-mode"]').forEach(input=>input.addEventListener('change',()=>{
  const reviewing=input.value==='review';
  document.getElementById('research-heading').textContent=reviewing?'Preview the question before choosing to send.':'Continue with downloaded guidance.';
  document.getElementById('research-copy').textContent=reviewing?'Example: “Find official instructions about address history for this form.” Only the reviewed question would leave the device. The topic may still reveal an interest.':'Keep working locally. The workspace should show what remains unresolved and when its guidance was retrieved.';
}));
