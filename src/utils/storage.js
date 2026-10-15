import {DEFAULT} from "./defaults.js";
const ACTS=["browse","stream","calls","gaming","nas","cctv"],PRIOS=["cost","bal","speed","rel","sup"],PLACES=["home","shop","office","lab"];
const obj=x=>x&&typeof x==="object"&&!Array.isArray(x)?x:{};
const num=(v,min,max,d)=>v!==null&&v!==""&&v!==undefined&&Number.isFinite(+v)?Math.min(max,Math.max(min,Math.round(+v))):d;
const str=(v,n)=>(typeof v==="string"?v:"").slice(0,n);
// Saved data may come from an older version or be damaged, so every field is checked and repaired on load.
export function cleanAnswers(x){const o=obj(x);
 return {use:PLACES.includes(o.use)?o.use:DEFAULT.use,u:num(o.u,1,30,DEFAULT.u),d:num(o.d,1,100,DEFAULT.d),
  acts:Array.isArray(o.acts)?o.acts.filter(a=>ACTS.includes(a)):[...DEFAULT.acts],size:num(o.size,200,5000,DEFAULT.size),
  bm:num(o.bm,300,3000,DEFAULT.bm),bu:num(o.bu,0,50000,DEFAULT.bu),prio:PRIOS.includes(o.prio)?o.prio:DEFAULT.prio,done:o.done===true};}
export const cleanSessions=x=>(Array.isArray(x)?x:[]).filter(s=>s&&typeof s==="object").map(s=>({id:num(s.id,0,Number.MAX_SAFE_INTEGER,Date.now()),t:str(s.t,40)||new Date(0).toISOString(),name:str(s.name,60)||"Saved session",answers:{...cleanAnswers(s.answers),done:true},pick:str(s.pick,160),m:num(s.m,0,1e7,0),u:num(s.u,0,1e7,0)}));
export const cleanFeedback=x=>(Array.isArray(x)?x:[]).filter(f=>f&&typeof f==="object").map(f=>({id:num(f.id,0,Number.MAX_SAFE_INTEGER,Date.now()),t:str(f.t,40)||new Date(0).toISOString(),clear:num(f.clear,0,5,0),useful:num(f.useful,0,5,0),follow:["Yes","Maybe","No"].includes(f.follow)?f.follow:"Yes",name:str(f.name,60),review:str(f.review,1000)}));
export const cleanTheme=x=>x==="dark"?"dark":"light";
