import {Suspense,useEffect,useRef,useState} from "react";
import {Link,NavLink,Outlet,useLocation} from "react-router-dom";
import {MotionConfig,motion} from "framer-motion";
import {Bookmark,BookOpen,Cpu,Info,LayoutDashboard,Menu,MessageSquare,Moon,Scale,Search,Settings,Star,Sun,User,Wifi,Wrench,X} from "lucide-react";
import {useApp} from "../context/AppContext";import {Disclaimer} from "./ui";import useFocusTrap from "../utils/useFocusTrap";
export const NAV=[["/","Overview",LayoutDashboard],["/find","Find My Internet",Search],["/recommendations","Recommendations",Star],["/providers","Compare Providers",Scale],["/hardware","Hardware Catalog",Cpu],["/troubleshooting","Network Troubleshooting",Wrench],["/learn","Learn Networking",BookOpen],["/sessions","My Saved Sessions",Bookmark],["/feedback","Feedback",MessageSquare],["/settings","Settings",Settings]];
const Brand=()=><Link to="/" className="flex items-center gap-2 px-4 py-4 text-lg font-semibold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"><Wifi size={18}/></span>NetAdvisor</Link>;
const Side=({close})=><nav aria-label="Main" className="flex flex-col gap-1 p-3">{NAV.map(([to,l,I])=><NavLink key={to} to={to} end={to==="/"} onClick={close} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive?"bg-indigo-600 text-white":"text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}><I size={18}/>{l}</NavLink>)}</nav>;
function Modal({title,children,onClose}){
 const ref=useRef(null);useFocusTrap(ref,onClose);
 return <div ref={ref} tabIndex={-1} className="fixed inset-0 z-50 grid place-items-center p-4 outline-none" role="dialog" aria-modal="true" aria-label={title}><button type="button" tabIndex={-1} aria-label="Close dialog" className="absolute inset-0 cursor-default bg-black/50" onClick={onClose}/><div className="card relative w-full max-w-md"><h2 className="mb-2 font-semibold">{title}</h2>{children}</div></div>;
}
function Drawer({onClose}){
 const ref=useRef(null);useFocusTrap(ref,onClose);
 return <div ref={ref} tabIndex={-1} className="fixed inset-0 z-40 outline-none lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu"><button type="button" tabIndex={-1} aria-label="Close menu overlay" className="absolute inset-0 cursor-default bg-black/50" onClick={onClose}/><aside className="absolute inset-y-0 left-0 w-64 overflow-y-auto bg-white dark:bg-slate-900"><div className="flex items-center justify-between pr-2"><Brand/><button aria-label="Close menu" className="btn2" onClick={onClose}><X size={16}/></button></div><Side close={onClose}/></aside></div>;
}
export default function Layout(){
 const [open,setOpen]=useState(false),[menu,setMenu]=useState(false),[info,setInfo]=useState(false);
 const {theme,setTheme,toast,dialog,setDialog}=useApp();const loc=useLocation(),mref=useRef(null);
 const title=(NAV.find(([t])=>t===loc.pathname)||NAV[0])[1];
 useEffect(()=>{if(!menu)return;
  const out=e=>{if(mref.current&&!mref.current.contains(e.target))setMenu(false);},esc=e=>{if(e.key==="Escape")setMenu(false);};
  document.addEventListener("mousedown",out);document.addEventListener("keydown",esc);
  return()=>{document.removeEventListener("mousedown",out);document.removeEventListener("keydown",esc);};},[menu]);
 return <MotionConfig reducedMotion="user"><div className="min-h-screen lg:pl-64">
  <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white print:hidden dark:border-slate-800 dark:bg-slate-900 lg:block"><Brand/><Side/></aside>
  {open&&<Drawer onClose={()=>setOpen(false)}/>}
  <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur print:hidden dark:border-slate-800 dark:bg-slate-900/90">
   <button aria-label="Open menu" className="btn2 lg:hidden" onClick={()=>setOpen(true)}><Menu size={18}/></button>
   <nav aria-label="Breadcrumb" className="text-sm"><span className="text-slate-500">NetAdvisor</span> <span className="text-slate-400">/</span> <b>{title}</b></nav>
   <div className="ml-auto flex items-center gap-2">
    <button aria-label="About this data" className="btn2" onClick={()=>setInfo(true)}><Info size={18}/></button>
    <button aria-label={`Switch to ${theme==="dark"?"light":"dark"} theme`} className="btn2" onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
    <div className="relative" ref={mref}><button aria-label="Profile menu" aria-haspopup="menu" aria-expanded={menu} className="btn2" onClick={()=>setMenu(!menu)}><User size={18}/></button>
     {menu&&<div role="menu" className="card absolute right-0 mt-2 w-48 space-y-1 p-2">{[["/sessions","My Saved Sessions"],["/feedback","Feedback"],["/settings","Settings"]].map(([to,l])=><Link key={to} to={to} role="menuitem" onClick={()=>setMenu(false)} className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">{l}</Link>)}</div>}</div>
   </div>
  </header>
  <main className="mx-auto max-w-6xl p-4 sm:p-6"><motion.div key={loc.pathname} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2}}><Suspense fallback={<p role="status" className="muted p-6">Loading...</p>}><Outlet/></Suspense></motion.div></main>
  {info&&<Modal title="About this data" onClose={()=>setInfo(false)}><Disclaimer/><button className="btn mt-4" onClick={()=>setInfo(false)}>Close</button></Modal>}
  {dialog&&<Modal title="Please confirm" onClose={()=>setDialog(null)}><p className="muted mb-4">{dialog.msg}</p><div className="flex justify-end gap-2"><button className="btn2" onClick={()=>setDialog(null)}>Cancel</button><button className="btn" onClick={()=>{dialog.fn();setDialog(null);}}>Confirm</button></div></Modal>}
  {toast&&<div role="status" className="fixed bottom-4 right-4 z-50 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">{toast}</div>}
 </div></MotionConfig>;
}
