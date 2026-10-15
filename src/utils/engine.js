import {PLANS,HW,PROV,SRC} from "../data/plans.js";
import {inr,tco} from "./format.js";
// Copied from the original NetAdvisor source, with DOM code removed.
export function need(u,d,acts){
 const R={browse:3,stream:8,calls:4,gaming:5},us=acts.filter(a=>R[a]),top=Math.max(0,...us.map(a=>R[a])),rest=us.reduce((t,a)=>t+R[a],0)-top;
 const per=us.length?top+0.25*rest:3,share=u<=4?1:u<=10?0.7:u<=30?0.5:0.4;
 const fixed=(acts.includes("nas")?20:0)+(acts.includes("cctv")?16:0);
 return Math.max(5,Math.ceil((Math.ceil(u*share)*per+d*0.2+fixed)*1.25));
}
function topsis(rows,w,ben){
 const m=rows[0].length,nrm=[];
 for(let j=0;j<m;j++){nrm.push(Math.sqrt(rows.reduce((s,r)=>s+r[j]*r[j],0))||1);}
 const v=rows.map(r=>r.map((x,j)=>x/nrm[j]*w[j]));
 const best=[],worst=[];
 for(let j=0;j<m;j++){const c=v.map(r=>r[j]);best[j]=ben[j]?Math.max(...c):Math.min(...c);worst[j]=ben[j]?Math.min(...c):Math.max(...c);}
 return v.map(r=>{let a=0,b=0;for(let j=0;j<m;j++){a+=(r[j]-best[j])**2;b+=(r[j]-worst[j])**2;}a=Math.sqrt(a);b=Math.sqrt(b);return (a+b)===0?1:b/(a+b);});
}
export const PRI={cost:[9,4,3,2],bal:[6,6,5,5],speed:[3,10,4,2],rel:[3,5,10,4],sup:[3,4,5,10]};
export const toInputs=a=>({use:a.use,u:a.u,d:Math.max(a.d,a.u),area:a.size,bm:a.bm,bu:a.bu,acts:a.acts,prio:a.prio,ms:0});
const CRIT=["Monthly cost vs budget","Equipment cost vs budget","Speed fit","Provider reviews","Coverage and device fit","Support","Price data confidence"];
// How much each price source can be trusted (Warangal listing highest, estimate lowest).
const CONF={W:1,H:.9,G:.8,B:.75,E:.6};
const pickTop=pool=>{const seen=new Set(),top=[];
 for(const x of pool){if(!seen.has(x.p.isp)){seen.add(x.p.isp);top.push(x);}if(top.length===3)break;}
 for(const x of pool){if(top.length===3)break;if(!top.includes(x)&&!top.some(t=>t.p.n===x.p.n))top.push(x);}
 return top;};
// Ranking: hard budget and need limits first, then TOPSIS on budget-relative cost and saturating fit criteria,
// so extra speed or coverage beyond what is needed earns no credit and cost is judged against the user's own budget.
export function recommend(f){
 const req=Math.max(need(f.u,f.d,f.acts),f.ms||0),target=f.prio==="speed"?3:1.25,bu=Math.max(f.bu,1),all=[];
 PLANS.forEach(p=>HW.forEach(h=>{const eff=Math.min(p.mbps,h.mbps),limits=[];
  if(eff<req)limits.push("Speed is about "+Math.round(req-eff)+" Mbps below your estimated need");
  if(h.area<f.area)limits.push("Covers "+h.area+" of "+f.area+" sq ft");
  if(h.dev<f.d)limits.push("Handles "+h.dev+" of "+f.d+" devices");
  if(p.cost>f.bm)limits.push(inr(p.cost-f.bm)+" a month over your budget");
  if(h.cost>f.bu)limits.push(inr(h.cost-f.bu)+" over your equipment budget");
  all.push({p,h,eff,monthly:p.cost,upfront:h.cost,limits});}));
 let pool=all.filter(x=>!x.limits.length);
 if(!pool.length){
  all.forEach(x=>{x.pen=Math.max(0,(req-x.eff)/req)+Math.max(0,(f.area-x.h.area)/f.area)+Math.max(0,(f.d-x.h.dev)/f.d)+Math.max(0,(x.monthly-f.bm)/f.bm)+Math.max(0,(x.upfront-f.bu)/bu);x.score=1/(1+x.pen);});
  pool=all.slice().sort((a,b)=>a.pen-b.pen||tco(a)-tco(b));
  return {f,req,near:true,relax:"No option meets all your constraints. The closest options are shown with their limitations; consider raising a budget or reducing what you need.",top:pickTop(pool),pool,weights:[]};}
 const rows=pool.map(x=>[x.monthly/f.bm,x.upfront/bu,Math.min(x.eff/(req*target),1),(x.p.rel+x.h.rel)/2,(Math.min(x.h.area/(f.area*1.1),1)+Math.min(x.h.dev/(f.d*1.2),1))/2,x.p.sup,CONF[x.p.src]]);
 const [wc,ws,wr,wp]=PRI[f.prio]||PRI.bal,wt=[wc*.6,wc*.4,ws*.7,wr,ws*.3,wp,2],s=wt.reduce((a,b)=>a+b,0);
 const sc=topsis(rows,wt.map(v=>v/s),[0,0,1,1,1,1,1]);
 pool.forEach((x,i)=>{x.score=sc[i];});pool.sort((a,b)=>b.score-a.score||tco(a)-tco(b));
 return {f,req,near:false,relax:"",top:pickTop(pool),pool,weights:CRIT.map((c,i)=>[c,Math.round(wt[i]/s*100)])};
}
export function explain(x,r){
 const f=r.f,L=[];
 L.push("Budget: "+inr(x.monthly)+" a month is "+Math.round(x.monthly/f.bm*100)+"% of your "+inr(f.bm)+" monthly budget, and "+inr(x.upfront)+" for equipment is "+Math.round(x.upfront/Math.max(f.bu,1)*100)+"% of your "+inr(f.bu)+" equipment budget.");
 L.push("Speed: about "+x.eff+" Mbps available against an estimated need of "+r.req+" Mbps ("+(x.eff/r.req).toFixed(1)+"x). Speed beyond what you need earns no extra credit.");
 L.push("Coverage and devices: reaches about "+x.h.area+" sq ft (you need "+f.area+") and handles about "+x.h.dev+" devices (you have "+f.d+").");
 L.push("Reviews and support: provider review "+x.p.rel+"/5 and support "+x.p.sup+"/5 ("+(PROV[x.p.isp].resp.startsWith("No repair-time data")?"no repair-time data was found, so support is scored cautiously at 2.75":"from complaint and review data")+"). These are judgements, not verified ratings.");
 L.push("Price data: "+SRC[x.p.src]+(x.p.src==="W"||x.p.src==="H"?".":". Not verified for Warangal, so check the current price and availability."));
 const c=r.pool.filter(y=>!y.limits.length).sort((a,b)=>tco(a)-tco(b))[0];
 if(c&&c!==x)L.push("Trade-off: the lowest-cost option that meets every need is "+c.p.n+" with "+c.h.n+" ("+inr(tco(c))+" over 3 years). This setup costs "+inr(Math.abs(tco(x)-tco(c)))+(tco(x)>=tco(c)?" more":" less")+" over 3 years.");
 else if(c===x)L.push("Trade-off: this is also the lowest-cost option that meets every need.");
 x.limits.forEach(l=>L.push("Not met: "+l+"."));
 return L;
}
export function bom(f){const wired=f.use==="home"?3:Math.min(f.d,12),it=[];
 it.push(["Fiber ONT/modem","1","Supplied by ISP",0]);
 it.push(["Cat6 patch cords",wired,"For wired devices",wired*200]);
 if(wired>4||f.use!=="home")it.push(["8-port gigabit switch","1","More wired ports",1500]);
 if(f.use==="lab"||(f.use==="office"&&f.d>16))it.push(["Managed 24-port switch","1","VLANs and monitoring",12000],["Wall rack and 24-port patch panel","1","Tidy cabling",6500]);
 if(f.acts.includes("cctv"))it.push(["8-port PoE switch","1","Powers cameras",5000]);
 if(f.acts.includes("nas"))it.push(["2-bay NAS (diskless)","1","Files and backups",15000]);
 if(f.use==="office"||f.use==="lab")it.push(["Firewall/UTM appliance","1","Traffic filtering and VPN",12000]);
 it.push(["UPS for router and switch","1","Power-cut protection",f.use==="home"?2000:6000]);
  return it;
}
export function osiLayers(f,x,req){const A=f.acts,biz=f.use==="office"||f.use==="lab",big=f.area>x.h.area*0.8||f.area>1500;
 const L=[
 ["7","Application","the apps and websites you use",[
  A.includes("calls")?"Video calls: turn on the router's QoS (traffic priority) option so calls stay smooth while others download.":"Use a secure DNS service (such as DNS-over-HTTPS) to block known harmful sites.",
  A.includes("nas")?"File sharing: reach your NAS from outside only through a VPN, never by opening it to the internet.":"Keep your browser, apps and phone software updated.",
  A.includes("cctv")?"Cameras: change default camera passwords and switch off cloud features you do not use.":"Use a password manager and two-step login for important accounts."]],
 ["6","Presentation","how data is encrypted",[
  "Look for the padlock (HTTPS) before typing passwords.",
  "Set Wi-Fi security to WPA3, or WPA2-AES if WPA3 is not offered. Avoid WEP and old WPA.",
  biz?"Use a VPN with strong encryption for staff working from home.":"Encrypt laptops and phones so a lost device does not leak data."]],
 ["5","Session","keeping conversations open and closed safely",[
  "Use a strong router admin password and set the admin page to log out automatically.",
  biz?"Use a VPN for remote access so every session is verified and logged.":"Do not stay logged in to the router admin page on shared devices."]],
 ["4","Transport","how data is delivered reliably",[
  "You need about "+req+" Mbps and this setup gives about "+x.eff+" Mbps. Turn on QoS or smart queue management so big downloads do not slow everything else.",
  A.includes("gaming")||A.includes("calls")?"Games and calls are delay-sensitive: give them priority and use a cable or 5 GHz Wi-Fi.":"Normal browsing and downloads cope well with small delays.",
  "Open only the ports you really need on the firewall."]],
 ["3","Network","addresses and routing between devices",[
  "Let the router hand out addresses automatically (DHCP) and keep the default private range.",
  "Reserve fixed addresses for printers, NAS and cameras so they never change.",
  biz?"Split staff, guests and servers into separate subnets or VLANs with firewall rules between them.":"Turn on the guest network so visitors cannot reach your own devices.",
  "Turn on IPv6 if your provider supports it."]],
 ["2","Data link","Wi-Fi and cable links between nearby devices",[
  x.h.n+" works at this layer: use 5 GHz (or 6 GHz) for speed and 2.4 GHz only for older smart devices.",
  "Put TVs, PCs and cameras on cable where you can. It is faster and steadier than Wi-Fi.",
  f.d>x.h.dev*0.7?"You are close to this equipment's limit of "+x.h.dev+" devices, so consider a stronger option or an extra switch.":"Let the router pick the least crowded Wi-Fi channel (auto-channel does this)."]],
 ["1","Physical","cables, radios and power",[
  "You need to cover "+f.area+" sq ft and this equipment reaches about "+x.h.area+" sq ft"+(big?", so place the router centrally and add a wired access point on the far side or on each floor.":", so place the router centrally and off the floor."),
  "Use Cat6 cable for wired runs and keep it away from power cables.",
  "Add a small UPS so the router and fiber box stay on during power cuts."]]];
 return L;
}
