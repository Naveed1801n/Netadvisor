import {useEffect,useRef} from "react";
// Keeps keyboard focus inside a dialog, closes it on Escape, and returns focus to the opener afterwards.
export default function useFocusTrap(ref,onClose){
 const cb=useRef(onClose);useEffect(()=>{cb.current=onClose;});
 useEffect(()=>{const el=ref.current,prev=document.activeElement;
  const items=()=>[...el.querySelectorAll('a[href],button:not([disabled]):not([tabindex="-1"]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])')];
  (items()[0]||el).focus();
  const h=e=>{if(e.key==="Escape"){e.stopPropagation();cb.current();return;}
   if(e.key!=="Tab")return;const f=items();if(!f.length)return;const a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}};
  document.addEventListener("keydown",h);
  return()=>{document.removeEventListener("keydown",h);if(prev&&prev.focus)prev.focus();};},[ref]);
}
