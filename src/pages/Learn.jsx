import {useState} from "react";import {Link} from "react-router-dom";
import {BookOpen,Building2,Cable,Gauge,Globe,Hash,ListChecks,Map as MapIcon,Network,Plug,Radio,Router,Scale,Server,Share2,ShieldCheck,Timer,Wifi} from "lucide-react";
import {useApp} from "../context/AppContext";import {GLOSSARY,LAYERS} from "../data/learn";import {BASICS,OSIX} from "../data/basics";import {osiLayers} from "../utils/engine";import {tabKeys} from "../utils/a11y";import {Title} from "../components/ui";
const ICON={Network,Globe,Building2,Gauge,Timer,Router,Plug,Wifi,Cable,Hash,BookOpen,ListChecks,Server,Radio,ShieldCheck,Map:MapIcon,Scale,Share2};
const TABS=[["basics","Networking Basics"],["osi","OSI Model"],["terms","Terms Dictionary"]];
const WALK=["Your browser asks for a page.","The request is encrypted (the padlock).","A session with the website is opened.","The request is split into pieces and tracked.","Each piece is routed to the website's address.","Your Wi-Fi or cable carries it to the router.","Radio waves, light and cables carry the signal."];
export default function Learn(){
 const {result:r}=useApp();const [tab,setTab]=useState("basics"),[n,setN]=useState(7),[q,setQ]=useState(""),[bq,setBq]=useState("");
 const L=LAYERS.find(l=>l[0]===n),X=OSIX[n],mine=r?osiLayers(r.f,r.top[0],r.req).find(l=>l[0]===String(n)):null;
 const g=GLOSSARY.filter(([t,d])=>(t+" "+d).toLowerCase().includes(q.toLowerCase()));
 const bs=BASICS.filter(b=>b.slice(1,3).join(" ").toLowerCase().includes(bq.toLowerCase()));
 return <div className="space-y-6">
  <Title t="Learn Networking" sub="Start with the basics, then explore the seven layers of the OSI model."/>
  <div role="tablist" aria-label="Learning sections" className="flex flex-wrap gap-2">{TABS.map(([k,l],ix)=><button key={k} role="tab" tabIndex={tab===k?0:-1} onKeyDown={e=>tabKeys(e,TABS.length,ix,i=>setTab(TABS[i][0]))} id={"t-"+k} aria-selected={tab===k} aria-controls={"p-"+k} onClick={()=>setTab(k)} className={tab===k?"btn":"btn2"}>{l}</button>)}</div>
  {tab==="basics"&&<section id="p-basics" role="tabpanel" aria-labelledby="t-basics" className="space-y-4">
   <input className="inp max-w-sm" aria-label="Search basics" placeholder="Search basics, for example router or DNS" value={bq} onChange={e=>setBq(e.target.value)}/>
   <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{bs.map(([ic,t,d,ex,why,more])=>{const I=ICON[ic]||Network;return <article key={t} className="card flex flex-col gap-2"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"><I size={20}/></span><h2 className="font-semibold">{t}</h2></div><p className="text-sm">{d}</p><p className="muted"><b>Example:</b> {ex}</p><p className="muted"><b>Why it matters:</b> {why}</p><details className="mt-auto text-sm"><summary className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-300">Learn more</summary><p className="muted mt-1">{more}</p></details></article>;})}</div>
   {!bs.length&&<p className="muted">No topics match your search.</p>}
   <p className="muted">Looking for equipment? Open the <Link className="text-indigo-600 underline" to="/hardware">Hardware Catalog</Link>. Ready for more? <button className="text-indigo-600 underline" onClick={()=>setTab("osi")}>Study the OSI model</button>.</p></section>}
  {tab==="osi"&&<section id="p-osi" role="tabpanel" aria-labelledby="t-osi" className="space-y-4">
   <div className="card"><h2 className="font-semibold">Why the OSI model exists</h2><p className="mt-1 text-sm">The OSI model splits networking into seven layers so each part can be understood, built and fixed on its own. A message travels down the layers on the sending device and back up on the receiving device.</p>
    <details className="mt-3 text-sm"><summary className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-300">Example: opening a website</summary><ol className="muted mt-2 list-decimal space-y-1 pl-5">{WALK.map((t,i)=><li key={t}><b>Layer {7-i}:</b> {t}</li>)}</ol></details></div>
   <div className="grid gap-4 lg:grid-cols-3">
    <div className="grid gap-2" role="tablist" aria-label="OSI layers" aria-orientation="vertical">{LAYERS.map(([num,name],ix)=><button key={num} role="tab" aria-selected={n===num} tabIndex={n===num?0:-1} onKeyDown={e=>tabKeys(e,LAYERS.length,ix,i=>setN(LAYERS[i][0]),true)} onClick={()=>setN(num)} className={`sel flex items-center gap-3 py-3 ${n===num?"sel-on":""}`}><span className="grid h-7 w-7 place-items-center rounded-md bg-indigo-600 text-sm text-white">{num}</span><b>{name}</b></button>)}</div>
    <div className="card lg:col-span-2" role="tabpanel"><h2 className="text-lg font-semibold">Layer {L[0]}: {L[1]}</h2><p className="mt-2">{L[2]}</p>
     <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">{[["Everyday example",X[0]],["Common protocols",X[1]],["Hardware",X[2]]].map(([a,b])=><div key={a} className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800"><dt className="muted">{a}</dt><dd className="font-medium">{b}</dd></div>)}</dl>
     <h3 className="mt-5 font-semibold">{mine?"Tips for your recommended setup":"Tips for your setup"}</h3>
     {mine?<ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{mine[3].map(t=><li key={t}>{t}</li>)}</ul>:<p className="muted mt-1">Complete the guide to see advice for this layer tailored to your network. <Link className="text-indigo-600 underline" to="/find">Find My Internet</Link></p>}</div>
   </div></section>}
  {tab==="terms"&&<section id="p-terms" role="tabpanel" aria-labelledby="t-terms" className="card"><h2 className="mb-3 font-semibold">Common networking terms</h2><input className="inp mb-3 max-w-sm" aria-label="Search terms" placeholder="Search terms" value={q} onChange={e=>setQ(e.target.value)}/><dl className="grid gap-x-8 gap-y-3 md:grid-cols-2">{g.map(([t,d])=><div key={t}><dt className="font-medium">{t}</dt><dd className="muted">{d}</dd></div>)}</dl>{!g.length&&<p className="muted">No terms match your search.</p>}</section>}
 </div>;
}
