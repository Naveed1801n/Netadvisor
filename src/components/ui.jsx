import {useState} from "react";import {Link} from "react-router-dom";import {Inbox} from "lucide-react";
export const Title=({t,sub,children})=><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{t}</h1>{sub&&<p className="muted mt-1">{sub}</p>}</div><div className="flex flex-wrap gap-2 print:hidden">{children}</div></div>;
export const Bar=({label,text,pct,ok=true})=><div className="my-2"><div className="flex justify-between text-sm"><span>{label}</span><b>{text}</b></div><div className="h-2 rounded bg-slate-200 dark:bg-slate-800" role="img" aria-label={`${label}: ${text}`}><div className={`h-2 rounded ${ok?"bg-emerald-500":"bg-amber-500"}`} style={{width:`${Math.min(100,Math.max(3,pct))}%`}}/></div></div>;
export const Stat=({l,v,I})=><div className="card flex items-center gap-3">{I&&<I className="shrink-0 text-indigo-500" size={22}/>}<div><div className="muted">{l}</div><div className="text-xl font-semibold">{v}</div></div></div>;
export const Empty=({t,d,to,cta})=><div className="card py-10 text-center"><Inbox className="mx-auto mb-2 text-slate-400"/><h2 className="font-semibold">{t}</h2><p className="muted mb-4">{d}</p>{to&&<Link to={to} className="btn">{cta}</Link>}</div>;
export const Disclaimer=()=><p className="muted rounded-lg border border-amber-300/70 bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-950/20">Provider data, prices and availability are estimates from public listings (snapshot 14 October 2026) and may be outdated or differ in Telangana. Only the ACT and Hi Reach plans come from Warangal listings. Review and support scores are judgements from benchmarks and complaint data, not a Warangal survey, and a fit score is a relative ranking, not a quality rating. Verify everything with the provider before buying. NetAdvisor does not connect to routers or provider systems.</p>;
export function NumField({label,v,min,max,pre,unit,on}){
 const id=label.replace(/\W+/g,"-"),[dr,setDr]=useState(null),t=dr??String(v),n=t===""?NaN:+t,bad=!(n>=min&&n<=max);
 const f=x=>(pre||"")+x.toLocaleString("en-IN")+(unit?" "+unit:"");
 return <div className="py-3"><label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
  <div className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-slate-900 ${t!==""&&bad?"border-red-500":"border-slate-300 dark:border-slate-700"}`}>{pre&&<span className="text-slate-500">{pre}</span>}
   <input id={id} inputMode="numeric" autoComplete="off" className="w-full bg-transparent text-base outline-none" value={t} aria-invalid={bad} aria-describedby={id+"-h"}
    onFocus={()=>setDr(String(v))} onChange={e=>{const s=e.target.value.replace(/\D/g,"").slice(0,6);setDr(s);if(s!==""&&+s>=min&&+s<=max)on(+s);}}
    onBlur={()=>{if(dr!==null&&dr!=="")on(Math.min(max,Math.max(min,+dr)));setDr(null);}}/>
   {unit&&<span className="text-slate-500">{unit}</span>}</div>
  <p id={id+"-h"} className={`mt-1 text-xs ${bad?"text-red-600 dark:text-red-400":"muted"}`}>{bad?`Enter a number from ${f(min)} to ${f(max)}.`:`Between ${f(min)} and ${f(max)}`}</p></div>;
}
