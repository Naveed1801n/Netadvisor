import {createContext,useCallback,useContext,useEffect,useMemo,useState} from "react";
import {recommend,toInputs} from "../utils/engine";import {DEFAULT} from "../utils/defaults";import {cleanAnswers,cleanFeedback,cleanSessions,cleanTheme} from "../utils/storage";
const Ctx=createContext(null);
export const useApp=()=>useContext(Ctx);
export {DEFAULT};
const PLACE={home:"Home",shop:"Shop",office:"Office",lab:"Lab"},LIMIT=30;
const sig=o=>JSON.stringify([o.use,o.u,o.d,o.acts,o.size,o.bm,o.bu,o.prio]);
function useLS(k,init,clean){
 const [v,setV]=useState(()=>{try{const s=localStorage.getItem(k);return s?clean(JSON.parse(s)):init;}catch{return init;}});
 useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{/* storage unavailable */}},[k,v]);
 return [v,setV];
}
export function AppProvider({children}){
 const [theme,setTheme]=useLS("na_theme","light",cleanTheme),[answers,setAnswers]=useLS("na_answers",DEFAULT,cleanAnswers),[sessions,setSessions]=useLS("na_sessions",[],cleanSessions),[feedback,setFeedback]=useLS("na_feedback",[],cleanFeedback);
 const [toast,setToast]=useState(null),[dialog,setDialog]=useState(null);
 useEffect(()=>{document.documentElement.classList.toggle("dark",theme==="dark");},[theme]);
 const notify=useCallback((m)=>{setToast(m);setTimeout(()=>setToast(null),2800);},[]);
 const result=useMemo(()=>answers.done?recommend(toInputs(answers)):null,[answers]);
 const confirm=(msg,fn)=>setDialog({msg,fn});
 const saveSession=()=>{if(!result)return;const x=result.top[0],pick=`${x.p.n} with ${x.h.n}`;
  if(sessions.some(s=>s.pick===pick&&sig(s.answers)===sig(answers))){notify("This recommendation is already saved");return;}
  setSessions(s=>[{id:Date.now(),t:new Date().toISOString(),name:`${PLACE[answers.use]}, ${answers.u} people`,answers:{...answers},pick,m:x.monthly,u:x.upfront},...s].slice(0,LIMIT));
  notify(sessions.length>=LIMIT?`Session saved. The oldest session was removed (limit ${LIMIT}).`:"Session saved");};
 return <Ctx.Provider value={{theme,setTheme,answers,setAnswers,result,sessions,setSessions,feedback,setFeedback,toast,notify,dialog,setDialog,confirm,saveSession}}>{children}</Ctx.Provider>;
}
