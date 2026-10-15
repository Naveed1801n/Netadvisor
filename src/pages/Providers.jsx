import {useMemo,useState} from "react";
import {useApp} from "../context/AppContext";import {PLANS,PROV,SRC} from "../data/plans";import {inr} from "../utils/format";import {Disclaimer,Empty,Title} from "../components/ui";
export default function Providers(){
 const {notify}=useApp();
 const [q,setQ]=useState(""),[type,setType]=useState("all"),[min,setMin]=useState(0),[max,setMax]=useState(5000),[sort,setSort]=useState("cost"),[sel,setSel]=useState([]);
 const types=[...new Set(PLANS.map(p=>p.t))];
 const rows=useMemo(()=>PLANS.filter(p=>(p.isp+" "+p.n).toLowerCase().includes(q.toLowerCase())&&(type==="all"||p.t===type)&&p.mbps>=min&&p.cost<=max).sort((a,b)=>sort==="cost"?a.cost-b.cost:sort==="speed"?b.mbps-a.mbps:sort==="rel"?b.rel-a.rel:b.sup-a.sup),[q,type,min,max,sort]);
 const pick=n=>setSel(s=>s.includes(n)?s.filter(x=>x!==n):s.length>=3?(notify("Select up to 3 plans to compare"),s):[...s,n]);
 const chosen=PLANS.filter(p=>sel.includes(p.n));
 return <div className="space-y-6">
  <Title t="Compare Providers" sub="Plans, prices and review information from public listings. Prices are estimates."/>
  <div className="card grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
   <label className="text-sm lg:col-span-2">Search provider or plan<input className="inp mt-1" value={q} onChange={e=>setQ(e.target.value)} placeholder="For example ACT or 100 Mbps"/></label>
   <label className="text-sm">Connection type<select className="inp mt-1" value={type} onChange={e=>setType(e.target.value)}><option value="all">All</option>{types.map(t=><option key={t}>{t}</option>)}</select></label>
   <label className="text-sm">Minimum speed<select className="inp mt-1" value={min} onChange={e=>setMin(+e.target.value)}>{[0,50,100,200,500].map(v=><option key={v} value={v}>{v?v+" Mbps":"Any"}</option>)}</select></label>
   <label className="text-sm">Sort by<select className="inp mt-1" value={sort} onChange={e=>setSort(e.target.value)}><option value="cost">Lowest price</option><option value="speed">Highest speed</option><option value="rel">Review score</option><option value="sup">Support score</option></select></label>
   <label className="text-sm sm:col-span-2 lg:col-span-5">Maximum monthly price: <b>{inr(max)}</b><input type="range" className="mt-1 w-full accent-indigo-600" min={400} max={5000} step={100} value={max} onChange={e=>setMax(+e.target.value)}/></label>
  </div>
  {chosen.length>0&&<div className="card"><h2 className="mb-3 font-semibold">Comparing {chosen.length} plan{chosen.length>1?"s":""}</h2><div className="grid gap-3 sm:grid-cols-3">{chosen.map(p=><div key={p.n} className="rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800"><b>{p.n}</b><div className="muted">{p.isp} · {p.t}</div><div>{p.mbps} Mbps · {inr(p.cost)}/month</div><div>Review {p.rel}/5 · Support {p.sup}/5</div><div className="muted">{p.note}</div></div>)}</div><button className="btn2 mt-3" onClick={()=>setSel([])}>Clear selection</button></div>}
  {rows.length?<div className="card overflow-x-auto"><table className="w-full min-w-[820px] text-sm"><caption className="sr-only">Internet plans</caption><thead><tr>{["Compare","Provider","Plan","Type","Speed","Per month","Review","Support","Price source and review confidence"].map(h=><th key={h} className="th">{h}</th>)}</tr></thead><tbody>{rows.map(p=><tr key={p.n}><td className="td"><input type="checkbox" aria-label={`Compare ${p.n}`} checked={sel.includes(p.n)} onChange={()=>pick(p.n)}/></td><td className="td">{p.isp}</td><td className="td"><b>{p.n}</b><div className="muted">{p.note}</div></td><td className="td">{p.t}</td><td className="td">{p.mbps} Mbps</td><td className="td">{inr(p.cost)}</td><td className="td">{p.rel}/5</td><td className="td">{p.sup}/5</td><td className="td">{SRC[p.src]}<div className="muted">Review evidence confidence: {PROV[p.isp].conf}</div></td></tr>)}</tbody></table></div>:<Empty t="No plans match" d="Try a lower minimum speed or a higher maximum price."/>}
  <section><h2 className="mb-3 text-lg font-semibold">What reviews and tests say</h2><div className="grid gap-4 md:grid-cols-2">{Object.entries(PROV).sort((a,b)=>b[1].score-a[1].score).map(([k,p])=><div key={k} className="card text-sm"><div className="flex justify-between"><b>{k}</b><span>{p.score}/5 · {p.conf} confidence</span></div><p className="muted mt-2"><b>Speed:</b> {p.spd}</p><p className="muted"><b>Quality:</b> {p.q}</p><p className="muted"><b>Service:</b> {p.svc}</p><p className="muted"><b>When something breaks:</b> {p.resp} (support {p.sup}/5{/^No repair-time data/.test(p.resp)?", a cautious score because no data was found":""})</p></div>)}</div></section>
  <Disclaimer/>
 </div>;
}
