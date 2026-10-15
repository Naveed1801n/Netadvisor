import {useState} from "react";import {Star} from "lucide-react";
import {useApp} from "../context/AppContext";import {dt} from "../utils/format";import {Title} from "../components/ui";
const Rate=({label,v,on})=><fieldset><legend className="mb-1 text-sm font-medium">{label}</legend><div className="flex gap-1">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-label={`${n} out of 5`} aria-pressed={v===n} onClick={()=>on(n)} className="rounded p-1"><Star size={26} className={n<=v?"fill-amber-400 text-amber-400":"text-slate-400"}/></button>)}</div></fieldset>;
const EMPTY={clear:0,useful:0,follow:"Yes",name:"",review:""};
export default function Feedback(){
 const {feedback,setFeedback,notify}=useApp();const [f,setF]=useState(EMPTY),[err,setErr]=useState({});
 const submit=e=>{e.preventDefault();const x={};if(!f.clear)x.clear="Rate how clear the recommendation was.";if(!f.useful)x.useful="Rate how useful it was.";if(f.review.length>1000)x.review="Keep your review under 1000 characters.";setErr(x);if(Object.keys(x).length)return;
  setFeedback(a=>[{...f,name:f.name.trim(),review:f.review.trim(),id:Date.now(),t:new Date().toISOString()},...a]);setF(EMPTY);notify("Thank you. Your feedback is saved in this browser.");};
 const avg=k=>feedback.length?(feedback.reduce((s,x)=>s+x[k],0)/feedback.length).toFixed(1):"-";
 return <div className="grid gap-6 lg:grid-cols-2"><div className="lg:col-span-2"><Title t="Feedback" sub="Tell us how clear and useful the recommendation was."/></div>
  <form className="card space-y-4" onSubmit={submit} noValidate>
   <Rate label="How clear was the recommendation?" v={f.clear} on={n=>setF({...f,clear:n})}/>{err.clear&&<p role="alert" className="text-sm text-red-600">{err.clear}</p>}
   <Rate label="How useful was it?" v={f.useful} on={n=>setF({...f,useful:n})}/>{err.useful&&<p role="alert" className="text-sm text-red-600">{err.useful}</p>}
   <label className="block text-sm font-medium">Would you follow it?<select className="inp mt-1" value={f.follow} onChange={e=>setF({...f,follow:e.target.value})}><option>Yes</option><option>Maybe</option><option>No</option></select></label>
   <label className="block text-sm font-medium">Your name (optional)<input className="inp mt-1" maxLength={60} value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></label>
   <label className="block text-sm font-medium">Your review (optional)<textarea className="inp mt-1 min-h-28" value={f.review} onChange={e=>setF({...f,review:e.target.value})} placeholder="What worked, what confused you, or your experience with your provider"/></label>{err.review&&<p role="alert" className="text-sm text-red-600">{err.review}</p>}
   <p className="muted">Saved only in this browser. Please do not enter phone numbers or addresses.</p><button className="btn">Submit feedback</button></form>
  <div className="card"><h2 className="font-semibold">Feedback saved on this device</h2><p className="muted">{feedback.length} response{feedback.length===1?"":"s"} · average clarity {avg("clear")}/5 · average usefulness {avg("useful")}/5</p>
   {feedback.length?<ul className="mt-3 space-y-3">{feedback.slice(0,5).map(x=><li key={x.id} className="text-sm"><b>{x.name||"Anonymous"}</b> <span className="muted">{dt(x.t)} · clarity {x.clear}/5, useful {x.useful}/5</span>{x.review&&<p className="muted">{x.review}</p>}</li>)}</ul>:<p className="muted mt-3">No feedback yet. Your submissions will appear here.</p>}</div>
 </div>;
}
