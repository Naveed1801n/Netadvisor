import {Link} from "react-router-dom";
import {Suspense,lazy} from "react";
import {BookOpen,Bookmark,Cpu,Gauge,IndianRupee,Smartphone,Sparkles,Wrench} from "lucide-react";
import {useApp} from "../context/AppContext";import {PLANS,PROV} from "../data/plans";import {need} from "../utils/engine";import {dt,inr} from "../utils/format";import {Disclaimer,Stat} from "../components/ui";
const ProviderChart=lazy(()=>import("../components/ProviderChart.jsx"));
export default function Overview(){
 const {answers,sessions,result}=useApp();
 const req=result?result.req:need(answers.u,Math.max(answers.d,answers.u),answers.acts);
 const chart=Object.keys(PROV).map(k=>{const L=PLANS.filter(p=>p.isp===k);return {name:k.replace(" Broadband","").replace(" Bharat Fibre","").replace(" Fibernet",""),price:Math.min(...L.map(p=>p.cost)),speed:Math.max(...L.map(p=>p.mbps))};});
 const top=Object.entries(PROV).sort((a,b)=>b[1].score-a[1].score).slice(0,4);
 return <div className="space-y-6">
  <div className="card flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-semibold">Find the right internet for your home, shop or office</h1><p className="muted mt-1 max-w-xl">Answer five questions. NetAdvisor ranks listed plans and equipment by your needs, budget and priorities.</p></div><Link to="/find" className="btn"><Sparkles size={16}/>Find My Best Internet Setup</Link></div>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat I={Gauge} l="Estimated speed need" v={req+" Mbps"}/><Stat I={IndianRupee} l="Monthly budget" v={inr(answers.bm)}/><Stat I={Smartphone} l="Connected devices" v={Math.max(answers.d,answers.u)}/><Stat I={Bookmark} l="Saved recommendations" v={sessions.length}/></div>
  <div className="grid gap-6 lg:grid-cols-3">
   <div className="card lg:col-span-2"><h2 className="mb-3 font-semibold">Cheapest plan price and fastest listed speed, by provider</h2><Suspense fallback={<div className="h-[280px] animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800"/>}><ProviderChart data={chart}/></Suspense></div>
   <div className="card"><h2 className="mb-3 font-semibold">Provider comparison preview</h2><ul className="space-y-3">{top.map(([k,p])=><li key={k} className="flex justify-between gap-2 text-sm"><span>{k}</span><span className="muted">Review {p.score}/5 · Support {p.sup}/5</span></li>)}</ul><Link to="/providers" className="btn2 mt-4 w-full">Compare all providers</Link></div>
  </div>
  <div className="grid gap-6 lg:grid-cols-2">
   <div className="card"><h2 className="mb-3 font-semibold">Recent saved sessions</h2>{sessions.length?<ul className="space-y-2">{sessions.slice(0,3).map(s=><li key={s.id} className="text-sm"><b>{s.name}</b> <span className="muted">{dt(s.t)}</span><div className="muted">{s.pick}</div></li>)}</ul>:<p className="muted">Nothing saved yet. Finish the guide, then save your recommendation.</p>}<Link to="/sessions" className="btn2 mt-4">Open saved sessions</Link></div>
   <div className="grid gap-3 sm:grid-cols-3">{[["/troubleshooting","Fix a problem",Wrench],["/hardware","Choose hardware",Cpu],["/learn","Learn networking",BookOpen]].map(([to,l,I])=><Link key={to} to={to} className="card flex flex-col items-start gap-2 hover:border-indigo-400"><I className="text-indigo-500"/><b>{l}</b></Link>)}</div>
  </div>
  <Disclaimer/>
 </div>;
}
