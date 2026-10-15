import {useState} from "react";import {useNavigate} from "react-router-dom";
import {FolderOpen,Pencil,Trash2} from "lucide-react";
import {useApp} from "../context/AppContext";import {dt,inr} from "../utils/format";import {Empty,Title} from "../components/ui";
export default function Sessions(){
 const {sessions,setSessions,setAnswers,confirm,notify}=useApp();const nav=useNavigate();const [ed,setEd]=useState(null),[name,setName]=useState("");
 const open=s=>{setAnswers({...s.answers,done:true});nav("/recommendations");};
 const rename=()=>{const v=name.trim();if(!v){notify("Enter a name for this session");return;}setSessions(a=>a.map(s=>s.id===ed?{...s,name:v.slice(0,60)}:s));setEd(null);notify("Session renamed");};
 return <div><Title t="My Saved Sessions" sub="Saved only in this browser. Opening a session recalculates it with the current plan data.">{sessions.length>0&&<button className="btn2" onClick={()=>confirm("Delete all saved sessions? This cannot be undone.",()=>{setSessions([]);notify("All sessions deleted");})}><Trash2 size={16}/>Delete all</button>}</Title>
  {!sessions.length?<Empty t="No saved sessions" d="Finish the guide and select Save recommendation to keep a result here." to="/find" cta="Find My Internet"/>:<div className="grid gap-4 md:grid-cols-2">{sessions.map(s=><div key={s.id} className="card">
   {ed===s.id?<form className="flex gap-2" onSubmit={e=>{e.preventDefault();rename();}}><input className="inp" ref={el=>{if(el)el.focus();}} aria-label="Session name" maxLength={60} value={name} onChange={e=>setName(e.target.value)}/><button className="btn">Save</button><button type="button" className="btn2" onClick={()=>setEd(null)}>Cancel</button></form>:<div className="flex items-start justify-between gap-2"><div><b>{s.name}</b><div className="muted">{dt(s.t)}</div></div><button aria-label={`Rename ${s.name}`} className="btn2" onClick={()=>{setEd(s.id);setName(s.name);}}><Pencil size={14}/></button></div>}
   <p className="mt-2 text-sm">{s.pick}</p><p className="muted">{inr(s.m)} a month, {inr(s.u)} once. {s.answers.u} people, {s.answers.d} devices, {s.answers.size} sq ft.</p>
   <div className="mt-3 flex gap-2"><button className="btn" onClick={()=>open(s)}><FolderOpen size={16}/>Open</button><button className="btn2" onClick={()=>confirm(`Delete "${s.name}"?`,()=>{setSessions(a=>a.filter(x=>x.id!==s.id));notify("Session deleted");})}><Trash2 size={16}/>Delete</button></div></div>)}</div>}
 </div>;
}
