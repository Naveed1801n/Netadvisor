import {useState} from "react";
import {AlertTriangle,Check,Gauge,Globe,RotateCcw,SignalLow,Unplug,WifiOff} from "lucide-react";
import {Bar,Title} from "../components/ui";
const S={
 dev:["Test another device","Open a website on a different phone or laptop.","If only one device fails, the problem is that device's Wi-Fi settings or software, not the internet line."],
 restart:["Restart the router","Switch it off, wait 30 seconds, switch it on, then wait 2 to 3 minutes.","A restart clears the router's memory and renews the connection with your provider."],
 lights:["Check the lights","A steady power light is normal. A red light on the fiber box usually means the line has lost signal.","Fiber boxes (ONT) show a red LOS (loss of signal) light when light from the line is missing, often from a loose or damaged line."],
 cables:["Check the cables","Make sure every cable is firmly plugged in and not bent or cut.","Loose or damaged cables cause drops and slow speeds, especially the fiber line and the cable between the box and the router."],
 closer:["Move closer or use a cable","Stand near the router, or connect a laptop with a cable.","Walls and distance weaken Wi-Fi. A cable shows whether the problem is the wireless part or the line."],
 band:["Switch to the 5 GHz Wi-Fi","Connect to the 5 GHz network name if your router offers one.","2.4 GHz travels further but is slower and more crowded. 5 GHz is faster at short range."],
 speed:["Run a speed test","Use a free speed test site close to the router and note the result.","Compare it with your plan speed. Results far below it at quiet times point to the line or the provider."],
 dns:["Try other sites and apps","Check whether only some sites fail.","If only some sites fail, DNS (the internet address book) may be the cause. You can try a public DNS such as 1.1.1.1 or 8.8.8.8 in the router settings."],
 call:["Contact your provider","Call or use the provider app, note the complaint number and the time, and ask for the repair-time commitment.","If it is not fixed, escalate to the provider's nodal officer, then the appellate authority, then the National Consumer Helpline (1915)."]};
const PROBLEMS=[["down","Internet is not working",["dev","restart","lights","cables","call"],WifiOff],["slow","Wi-Fi is slow",["dev","restart","closer","band","speed","call"],Gauge],["weak","Wi-Fi signal is weak",["closer","band","restart","call"],SignalLow],["drops","Frequent disconnections",["restart","cables","lights","speed","call"],Unplug],["sites","Some websites are not opening",["dev","dns","restart","call"],Globe],["light","Router or fiber box shows a warning light",["lights","cables","restart","call"],AlertTriangle]];
export default function Troubleshooting(){
 const [pid,setPid]=useState(null),[k,setK]=useState(0),[state,setState]=useState("run");
 const prob=PROBLEMS.find(p=>p[0]===pid);
 const reset=()=>{setPid(null);setK(0);setState("run");};
 if(!prob)return <div><Title t="Network Troubleshooting" sub="What problem are you experiencing?"/><div className="grid gap-3 sm:grid-cols-2">{PROBLEMS.map(([id,l,,I])=><button key={id} className="sel flex items-center gap-3" onClick={()=>setPid(id)}><I className="text-indigo-500"/><b>{l}</b></button>)}</div><p className="muted mt-4">This guide gives general advice. It does not scan or diagnose your devices.</p></div>;
 const steps=prob[2].map(s=>S[s]),st=steps[k];
 return <div className="mx-auto max-w-2xl"><Title t={prob[1]} sub="Try one step at a time."><button className="btn2" onClick={reset}><RotateCcw size={16}/>Choose another problem</button></Title>
  {state==="ok"&&<div className="card text-center" role="status"><Check className="mx-auto text-emerald-500" size={32}/><h2 className="mt-2 font-semibold">Glad that worked</h2><p className="muted mb-4">If the problem returns, run the steps again or contact your provider.</p><button className="btn" onClick={reset}>Fix another problem</button></div>}
  {state==="stuck"&&<div className="card" role="status"><h2 className="font-semibold">Time to contact your provider</h2><p className="muted mt-2">{S.call[1]}</p><p className="muted mt-2">{S.call[2]}</p><button className="btn2 mt-4" onClick={reset}>Start over</button></div>}
  {state==="run"&&<><Bar label={`Step ${k+1} of ${steps.length}`} text={`${Math.round((k+1)/steps.length*100)}%`} pct={(k+1)/steps.length*100}/><div className="card"><h2 className="text-lg font-semibold">{st[0]}</h2><p className="mt-2">{st[1]}</p><details className="mt-3"><summary className="cursor-pointer text-sm font-medium">Why this helps</summary><p className="muted mt-2">{st[2]}</p></details><div className="mt-5 flex flex-wrap gap-2"><button className="btn" onClick={()=>setState("ok")}><Check size={16}/>This worked</button><button className="btn2" onClick={()=>k<steps.length-1?setK(k+1):setState("stuck")}>Still having the problem</button></div></div></>}
 </div>;
}
