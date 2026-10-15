import {useState} from "react";import {useNavigate} from "react-router-dom";
import {ArrowLeft,ArrowRight,Briefcase,Camera,Check,Film,Gamepad2,Globe,GraduationCap,HardDrive,Headphones,Home,IndianRupee,Loader2,RotateCcw,Scale,ShieldCheck,Store,Video,Zap} from "lucide-react";
import {DEFAULT,useApp} from "../context/AppContext";import {NumField,Title} from "../components/ui";
const PLACES=[["home","Home","Family internet and work from home",Home],["shop","Shop","Billing, cameras and customer Wi-Fi",Store],["office","Small office","Several staff and video meetings",Briefcase],["lab","College or computer lab","Many devices at the same time",GraduationCap]];
const ACTS=[["browse","Browsing and email",Globe],["stream","HD/4K streaming",Film],["calls","Video calls and online classes",Video],["gaming","Gaming",Gamepad2],["nas","File sharing and backups",HardDrive],["cctv","CCTV cameras",Camera]];
const PRIOS=[["cost","Lowest cost","Cheapest setup that still works",IndianRupee],["bal","Balanced performance","A bit of everything",Scale],["speed","Highest speed","Fast downloads and calls",Zap],["rel","Reliability","Fewest breakdowns",ShieldCheck],["sup","Customer support","Quick help when something breaks",Headphones]];
const TITLES=["Where will you use the internet?","People and devices","What will you do online?","Space and budget","What matters most?"];
const Opt=({on,I,l,d,click})=><button type="button" aria-pressed={on} onClick={click} className={`sel flex w-full items-start gap-3 ${on?"sel-on":""}`}><I className="mt-0.5 shrink-0 text-indigo-500" size={22}/><span><b className="block">{l}</b>{d&&<span className="muted">{d}</span>}</span>{on&&<Check className="ml-auto shrink-0 text-indigo-500" size={18}/>}</button>;
export default function Find(){
 const {answers,setAnswers,notify}=useApp();const nav=useNavigate();
 const [a,setA]=useState({...answers,done:false}),[i,setI]=useState(0),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 const set=p=>{setErr("");setA(s=>({...s,...p}));};
 const toggle=k=>set({acts:a.acts.includes(k)?a.acts.filter(x=>x!==k):[...a.acts,k]});
 const next=()=>{
  if(i===1&&a.d<a.u)return setErr("Connected devices must be at least the number of people using the network.");
  if(i===2&&!a.acts.length)return setErr("Select at least one online activity.");
  if(i<4)return setI(i+1);
  setBusy(true);setTimeout(()=>{setAnswers({...a,done:true});notify("Recommendation ready");nav("/recommendations");},900);
 };
 const reset=()=>{setA({...DEFAULT});setAnswers({...DEFAULT});setI(0);setErr("");notify("Answers reset");};
 if(busy)return <div className="card grid place-items-center gap-3 py-16 text-center" role="status"><Loader2 className="animate-spin text-indigo-500" size={32}/><b>Comparing plans and equipment</b><span className="muted">Estimating speed, checking budget and ranking your options.</span></div>;
 return <div className="mx-auto max-w-2xl">
  <Title t="Find My Internet" sub="Answer five questions. You can go back and change any answer."><button className="btn2" onClick={reset}><RotateCcw size={16}/>Start again</button></Title>
  <div className="mb-4" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={i+1} aria-label="Wizard progress"><div className="muted mb-1">Step {i+1} of 5</div><div className="h-2 rounded bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded bg-indigo-600 transition-all" style={{width:`${(i+1)*20}%`}}/></div></div>
  <div className="card"><h2 className="mb-4 text-lg font-semibold">{TITLES[i]}</h2>
   {i===0&&<div className="grid gap-3 sm:grid-cols-2">{PLACES.map(([k,l,d,I])=><Opt key={k} on={a.use===k} I={I} l={l} d={d} click={()=>set({use:k})}/>)}</div>}
   {i===1&&<><NumField label="People using it at the same time" v={a.u} min={1} max={30} unit="people" on={v=>set({u:v})}/><NumField label="Connected devices" v={a.d} min={1} max={100} unit="devices" on={v=>set({d:v})}/><p className="muted">Type a number. Count phones, laptops, TVs, smart bulbs and cameras.</p></>}
   {i===2&&<div className="grid gap-3 sm:grid-cols-2">{ACTS.map(([k,l,I])=><Opt key={k} on={a.acts.includes(k)} I={I} l={l} click={()=>toggle(k)}/>)}</div>}
   {i===3&&<><NumField label="Coverage area" v={a.size} min={200} max={5000} unit="sq ft" on={v=>set({size:v})}/><NumField label="Monthly internet budget" v={a.bm} min={300} max={3000} pre="₹" on={v=>set({bm:v})}/><NumField label="One-time equipment budget" v={a.bu} min={0} max={50000} pre="₹" on={v=>set({bu:v})}/><p className="muted">Spaces over 5,000 sq ft need a professionally designed network, so the area is limited to 5,000.</p></>}
   {i===4&&<div className="grid gap-3 sm:grid-cols-2">{PRIOS.map(([k,l,d,I])=><Opt key={k} on={a.prio===k} I={I} l={l} d={d} click={()=>set({prio:k})}/>)}</div>}
   {err&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{err}</p>}
  </div>
  <div className="mt-4 flex justify-between"><button className="btn2" disabled={i===0} onClick={()=>{setErr("");setI(i-1);}}><ArrowLeft size={16}/>Back</button><button className="btn" onClick={next}>{i===4?"Show my recommendation":"Next"}<ArrowRight size={16}/></button></div>
 </div>;
}
