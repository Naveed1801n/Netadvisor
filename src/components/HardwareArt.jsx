import {useState} from "react";import CREDITS from "../data/hardwareCredits.json";import {kindOf} from "../utils/hardware.js";
const B="#cbd5e1",S="#64748b",A="#6366f1",G="#22c55e";
const body=(x,y,w,h,r=6)=><rect x={x} y={y} width={w} height={h} rx={r} fill={B} stroke={S} strokeWidth="2"/>;
const leds=(x,y,n)=>Array.from({length:n},(_,i)=><circle key={i} cx={x+i*9} cy={y} r="2.5" fill={i?A:G}/>);
const ports=(x,y,n,s=12)=>Array.from({length:n},(_,i)=><rect key={i} x={x+i*s} y={y} width="8" height="7" rx="1" fill={S}/>);
const ART={
 router:<>{body(30,56,100,24)}<rect x="44" y="20" width="5" height="38" rx="2" fill={S}/><rect x="111" y="20" width="5" height="38" rx="2" fill={S}/>{leds(46,68,4)}{ports(90,64,3)}</>,
 mesh:<>{body(32,26,38,56,19)}{body(90,26,38,56,19)}<path d="M40 44h22M98 44h22" stroke={A} strokeWidth="3"/><circle cx="51" cy="66" r="3" fill={G}/><circle cx="109" cy="66" r="3" fill={G}/></>,
 modem:<>{body(38,38,84,38)}{leds(50,50,4)}<rect x="94" y="48" width="18" height="12" rx="2" fill={S}/><path d="M48 66h30" stroke={S} strokeWidth="2"/></>,
 ap:<><ellipse cx="80" cy="62" rx="50" ry="14" fill={B} stroke={S} strokeWidth="2"/><path d="M45 60a35 28 0 0 1 70 0" fill={B} stroke={S} strokeWidth="2"/><circle cx="80" cy="48" r="3" fill={G}/><path d="M62 30a26 20 0 0 1 36 0M70 38a14 10 0 0 1 20 0" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round"/></>,
 switch:<>{body(12,48,136,28)}{ports(24,56,8,14)}<circle cx="136" cy="58" r="2.5" fill={G}/></>,
 poe:<>{body(40,40,80,36)}{ports(52,56,3,14)}<path d="M96 46l-8 12h8l-6 12" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round"/></>,
 cable:<><path d="M24 70C50 20 70 90 100 40s30 10 40-10" fill="none" stroke={S} strokeWidth="6" strokeLinecap="round"/><rect x="12" y="62" width="20" height="16" rx="3" fill={A}/><rect x="130" y="20" width="20" height="16" rx="3" fill={A}/></>,
 nic:<>{body(22,30,116,42,4)}<rect x="40" y="72" width="70" height="8" fill="#eab308"/><rect x="22" y="20" width="8" height="64" fill={S}/><rect x="104" y="40" width="22" height="16" rx="2" fill={S}/><circle cx="60" cy="50" r="8" fill={A}/></>,
 adapter:<>{body(54,40,66,24,10)}<rect x="28" y="46" width="28" height="12" rx="2" fill={S}/><circle cx="104" cy="52" r="3" fill={G}/></>,
 nas:<>{body(46,16,68,70)}<rect x="54" y="26" width="52" height="16" rx="2" fill={S}/><rect x="54" y="48" width="52" height="16" rx="2" fill={S}/>{leds(58,76,3)}</>,
 ups:<>{body(42,18,76,66)}<rect x="52" y="28" width="30" height="14" rx="2" fill={A}/><circle cx="64" cy="62" r="6" fill={S}/><circle cx="96" cy="62" r="6" fill={S}/><path d="M100 30l-6 10h8l-6 10" fill="none" stroke={G} strokeWidth="3"/></>,
 firewall:<>{body(22,52,116,28)}{leds(34,66,4)}<path d="M80 12l24 8v14c0 14-10 22-24 28-14-6-24-14-24-28V20z" fill={A} opacity=".9"/><path d="M70 36l7 7 14-14" fill="none" stroke="#fff" strokeWidth="4"/></>,
 camera:<><path d="M30 20h100v14H30z" fill={S}/><circle cx="80" cy="56" r="26" fill={B} stroke={S} strokeWidth="2"/><circle cx="80" cy="56" r="13" fill="#1e293b"/><circle cx="76" cy="52" r="4" fill={A}/></>,
 rack:<>{body(38,10,84,80,4)}{[20,38,56,74].map(y=><rect key={y} x="46" y={y} width="68" height="12" rx="2" fill={S}/>)}{leds(52,26,2)}</>,
 server:<>{body(36,24,88,52)}<rect x="46" y="34" width="50" height="8" rx="2" fill={S}/><rect x="46" y="50" width="50" height="8" rx="2" fill={S}/>{leds(106,38,1)}</>,
 extender:<>{body(60,38,40,34)}<path d="M72 20a12 10 0 0 1 16 0M66 28a22 14 0 0 1 28 0" fill="none" stroke={A} strokeWidth="3"/><rect x="74" y="72" width="4" height="10" fill={S}/><rect x="84" y="72" width="4" height="10" fill={S}/><circle cx="80" cy="52" r="3" fill={G}/></>,
 powerline:<>{body(26,36,44,40,8)}{body(90,36,44,40,8)}<path d="M70 56h20" stroke={A} strokeWidth="3" strokeDasharray="4 3"/><circle cx="48" cy="66" r="3" fill={G}/><circle cx="112" cy="66" r="3" fill={G}/><rect x="40" y="26" width="4" height="10" fill={S}/><rect x="52" y="26" width="4" height="10" fill={S}/></>,
 surge:<>{body(16,44,128,26,8)}{[34,62,90,118].map(x=><rect key={x} x={x} y="52" width="16" height="10" rx="2" fill={S}/>)}<circle cx="26" cy="57" r="3" fill={G}/></>,
 jack:<>{body(50,20,60,60,6)}<rect x="66" y="36" width="28" height="22" rx="3" fill={S}/><path d="M72 42h16M72 48h16" stroke={B} strokeWidth="2"/><circle cx="58" cy="28" r="2" fill={S}/><circle cx="102" cy="72" r="2" fill={S}/></>,
 generic:<>{body(40,30,80,40)}{leds(52,50,3)}</>};
export default function HardwareArt({name,kind}){
 const k=kind||kindOf(name),[bad,setBad]=useState(false),c=CREDITS[k];
 return <><div className="grid aspect-[8/5] w-full place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
  {bad?<svg viewBox="0 0 160 100" role="img" aria-label={`Illustration of ${name}`} className="h-full w-full p-2">{ART[k]||ART.generic}</svg>
   :<img src={`${import.meta.env.BASE_URL}hardware/${k}.jpg`} alt={name} loading="lazy" onError={()=>setBad(true)} className="h-full w-full bg-white object-contain"/>}
 </div>{!bad&&c&&<p className="muted text-xs">Photo: {c.author}, {c.license}</p>}</>;
}
