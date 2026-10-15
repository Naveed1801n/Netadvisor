// Arrow-key, Home and End support for tab lists (roving tabindex).
export function tabKeys(e,count,index,set,vertical=false){
 const k=e.key,step={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[k];
 if(!step&&k!=="Home"&&k!=="End")return;
 if(vertical?(k==="ArrowRight"||k==="ArrowLeft"):(k==="ArrowUp"||k==="ArrowDown"))return;
 e.preventDefault();const i=k==="Home"?0:k==="End"?count-1:(index+step+count)%count;set(i);
 const tabs=e.currentTarget.parentElement.querySelectorAll('[role="tab"]');if(tabs[i])tabs[i].focus();
}
