import {Moon,Sun,Trash2} from "lucide-react";
import {DEFAULT,useApp} from "../context/AppContext";import {Disclaimer,Title} from "../components/ui";
export default function Settings(){
 const {theme,setTheme,sessions,setSessions,feedback,setFeedback,setAnswers,confirm,notify}=useApp();
 return <div className="max-w-2xl space-y-6"><Title t="Settings" sub="Everything is stored in this browser only."/>
  <section className="card"><h2 className="mb-3 font-semibold">Appearance</h2><div className="flex gap-2">{[["light","Light",Sun],["dark","Dark",Moon]].map(([k,l,I])=><button key={k} aria-pressed={theme===k} onClick={()=>setTheme(k)} className={`sel flex items-center gap-2 ${theme===k?"sel-on":""}`}><I size={18}/>{l}</button>)}</div></section>
  <section className="card space-y-3"><h2 className="font-semibold">Your data</h2><p className="muted">{sessions.length} saved session{sessions.length===1?"":"s"} and {feedback.length} feedback response{feedback.length===1?"":"s"} are stored in this browser.</p>
   <div className="flex flex-wrap gap-2">
    <button className="btn2" disabled={!sessions.length} onClick={()=>confirm("Delete all saved sessions?",()=>{setSessions([]);notify("Sessions deleted");})}><Trash2 size={16}/>Delete sessions</button>
    <button className="btn2" disabled={!feedback.length} onClick={()=>confirm("Delete all saved feedback?",()=>{setFeedback([]);notify("Feedback deleted");})}><Trash2 size={16}/>Delete feedback</button>
    <button className="btn2" onClick={()=>confirm("Reset your wizard answers to the defaults?",()=>{setAnswers({...DEFAULT});notify("Answers reset");})}>Reset answers</button></div></section>
  <section className="card"><h2 className="mb-2 font-semibold">About</h2><p className="muted mb-3">NetAdvisor is a prototype built for a college research project. It does not connect to routers, provider systems or a server.</p><Disclaimer/></section>
 </div>;
}
