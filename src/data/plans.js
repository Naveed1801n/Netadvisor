const PLANS=[
{isp:"ACT Fibernet",n:"ACT A-Max 499",t:"Fiber",mbps:40,cost:499,rel:4,src:"W",note:"6-month term, free router offer"},
{isp:"ACT Fibernet",n:"ACT A-Max 650 (bundle)",t:"Fiber",mbps:40,cost:650,rel:4,src:"W",note:"6-month term, OTT/TV bundle"},
{isp:"ACT Fibernet",n:"ACT Swift",t:"Fiber",mbps:100,cost:549,rel:4,src:"W",note:"1 month, install fee about 300"},
{isp:"ACT Fibernet",n:"ACT A-Max 800 Streaming",t:"Fiber",mbps:100,cost:800,rel:4,src:"W",note:"3-month term, streaming bundle"},
{isp:"ACT Fibernet",n:"ACT A-Max 849",t:"Fiber",mbps:200,cost:849,rel:4,src:"W",note:"1 month, free installation"},
{isp:"ACT Fibernet",n:"ACT Giga Entertainment+Streaming",t:"Fiber",mbps:1000,cost:1499,rel:4.5,src:"W",note:"3-month term"},
{isp:"Airtel Xstream",n:"Airtel Fiber 40 Mbps",t:"Fiber",mbps:40,cost:499,rel:4,src:"G",note:"unlimited data, plus GST"},
{isp:"Airtel Xstream",n:"Airtel Fiber 100 Mbps",t:"Fiber",mbps:100,cost:799,rel:4,src:"G",note:"plus GST; some sources list 699"},
{isp:"Airtel Xstream",n:"Airtel Fiber 200 Mbps",t:"Fiber",mbps:200,cost:999,rel:4,src:"G",note:"plus GST; OTT bundle"},
{isp:"Airtel Xstream",n:"Airtel Fiber 300 Mbps",t:"Fiber",mbps:300,cost:1499,rel:4,src:"G",note:"plus GST; OTT bundle"},
{isp:"Airtel Xstream",n:"Airtel Fiber 1 Gbps",t:"Fiber",mbps:1000,cost:3999,rel:4.5,src:"G",note:"plus GST"},
{isp:"Airtel AirFiber",n:"Airtel AirFiber 100 Mbps",t:"5G",mbps:100,cost:699,rel:3,src:"G",note:"5G wireless, about 1 TB then slow, plus GST"},
{isp:"Jio AirFiber",n:"Jio AirFiber 30 Mbps",t:"5G",mbps:30,cost:599,rel:3,src:"G",note:"5G wireless, plus GST"},
{isp:"Jio AirFiber",n:"Jio AirFiber 100 Mbps",t:"5G",mbps:100,cost:899,rel:3,src:"G",note:"5G wireless, 1,000 GB then very slow, plus GST"},
{isp:"Jio AirFiber",n:"Jio AirFiber Max 300 Mbps",t:"5G",mbps:300,cost:1499,rel:3.5,src:"G",note:"select areas only, plus GST"},
{isp:"Jio AirFiber",n:"Jio AirFiber Max 500 Mbps",t:"5G",mbps:500,cost:2499,rel:3.5,src:"G",note:"select areas only, plus GST"},
{isp:"Jio AirFiber",n:"Jio AirFiber Max 1 Gbps",t:"5G",mbps:1000,cost:3999,rel:3.5,src:"G",note:"select areas only, plus GST"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre Neo 50",t:"Fiber",mbps:50,cost:449,rel:3.5,src:"B",note:"3,300 GB then 4 Mbps"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre Basic 60",t:"Fiber",mbps:60,cost:499,rel:3.5,src:"B",note:"3,300 GB then 4 Mbps"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre Basic Plus 100",t:"Fiber",mbps:100,cost:599,rel:3.5,src:"B",note:"4,000 GB then 4 Mbps"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre TB 150",t:"Fiber",mbps:150,cost:799,rel:3.5,src:"B",note:"4,000 GB then 10 Mbps"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre Premium Plus OTT 250",t:"Fiber",mbps:250,cost:1499,rel:3.5,src:"B",note:"6,000 GB then 15 Mbps, OTT bundle"},
{isp:"BSNL Bharat Fibre",n:"BSNL Fibre Ultra OTT 300",t:"Fiber",mbps:300,cost:1799,rel:3.5,src:"B",note:"6,500 GB then 20 Mbps, OTT bundle"},
{isp:"Excitel",n:"Excitel Fiber 200 Mbps",t:"Fiber",mbps:200,cost:629,rel:3.5,src:"G",note:"unlimited, 1,887 for 3 months plus GST, other-city price"},
{isp:"Excitel",n:"Excitel Fiber 300 Mbps",t:"Fiber",mbps:300,cost:729,rel:3.5,src:"G",note:"unlimited, 2,187 for 3 months plus GST, other-city price"},
{isp:"Hi Reach Broadband",n:"Hi Reach 40 Mbps",t:"Fiber",mbps:40,cost:400,rel:3,src:"H",note:"listed 1,200 per 3 months, 4,500 per year"},
{isp:"Hi Reach Broadband",n:"Hi Reach 100 Mbps",t:"Fiber",mbps:100,cost:500,rel:3,src:"H",note:"listed 1,500 per 3 months, 4,000 per year"},
{isp:"Hi Reach Broadband",n:"Hi Reach 150 Mbps",t:"Fiber",mbps:150,cost:600,rel:3,src:"H",note:"listed 1,800 per 3 months, 4,800 per year"},
{isp:"Hi Reach Broadband",n:"Hi Reach Entertainment 50 Mbps",t:"Fiber",mbps:50,cost:600,rel:3,src:"H",note:"entertainment plan, monthly rental"},
{isp:"Hi Reach Broadband",n:"Hi Reach Entertainment 150 Mbps",t:"Fiber",mbps:150,cost:800,rel:3,src:"H",note:"entertainment plan, monthly rental"},
{isp:"Hi Reach Broadband",n:"Hi Reach Entertainment 200 Mbps",t:"Fiber",mbps:200,cost:1000,rel:3,src:"H",note:"entertainment plan, monthly rental"}];
const SRC={W:"Warangal listing, Oct 2026",G:"2026 provider or guide listing, not Warangal-specific",B:"BSNL tariff sheet, Chennai circle, Sep 2025",H:"Warangal bill-payment listing (third party, unverified)",E:"Estimate"};
const PROV={
"Excitel":{score:3,conf:"Medium",spd:"117 Mbps median (Ookla H2 2024)",q:"Best fixed network score and 88.7% consistency (Ookla H2 2024); led Hyderabad speeds (Opensignal Jan 2024)",svc:"Trustpilot 1.1/5 from 375 reviews, 98% one-star (self-selected). Recurring complaints: frequent disconnections, slow tickets, local installers asking for extra money. Warangal coverage unconfirmed"},
"Airtel Xstream":{score:3.5,conf:"Medium",spd:"63 Mbps avg (SpeedGeo Q1 2026); 75 Mbps median (Ookla H2 2024)",q:"Led 4 of 5 national fixed-broadband experience categories (Opensignal Jan 2024)",svc:"Trustpilot 1.1/5 from 1.9K reviews for Airtel India (self-selected); a few forum users criticise customer care"},
"ACT Fibernet":{score:3.5,conf:"Medium",spd:"118 Mbps avg (SpeedGeo Q1 2026); 88 Mbps median (Ookla H2 2024)",q:"Fastest fixed provider in the Q1 2026 report",svc:"Many forum and complaint-site posts cite slow complaint handling and long outages; 8,197 consumer helpline grievances Jan to Sep 2025, mostly refund-related; Trustpilot 1.5/5 from 31 reviews"},
"BSNL Bharat Fibre":{score:3.5,conf:"Medium",spd:"66 Mbps avg (SpeedGeo Q1 2026)",q:"Highest user rating among ISPs, 3.65 of 5 (Ookla H2 2024)",svc:"No Warangal-specific review data found"},
"Jio AirFiber":{score:3,conf:"Low",spd:"One reviewer measured about 91 Mbps (Oct 2026); no broad benchmark found",q:"No independent fixed-wireless benchmark found, so scored cautiously",svc:"Trustpilot 1.1/5 for Jio overall (1K reviews, not broadband-specific); speed depends on local 5G signal"},
"Airtel AirFiber":{score:3,conf:"Low",spd:"Plans up to 100 Mbps; no broad benchmark found",q:"No independent fixed-wireless benchmark found, so scored cautiously",svc:"Speed depends on local 5G signal"},
"Hi Reach Broadband":{score:2.5,conf:"Low",spd:"Plans from 40 to 200 Mbps listed; no independent speed benchmark found",q:"No independent quality benchmark found",svc:"consumercomplaints.in lists 263 reviews and complaints, including Warangal and Kothagudem; posts cite low speed, unanswered tickets and outages lasting days (user-posted, unverified)"}};
const SUP={
"Excitel":[2,"Tickets reported open for weeks; 48 working hours promised, longer waits reported (Trustpilot, 2026); local contractor technicians"],
"ACT Fibernet":[2.5,"Phone support 9am to 6pm plus a 24/7 app (older forum posts); complaints reported unresolved for weeks; 202 delay-in-resolution grievances Jan to Sep 2025"],
"Airtel Xstream":[2.75,"No repair-time data found, so support is scored cautiously"],
"BSNL Bharat Fibre":[2.75,"No repair-time data found, so support is scored cautiously"],
"Jio AirFiber":[2.75,"No repair-time data found, so support is scored cautiously"],
"Airtel AirFiber":[2.75,"No repair-time data found, so support is scored cautiously"],
"Hi Reach Broadband":[2,"Complaints say tickets go unanswered and outages last days (user-posted on complaint sites); head office is in Warangal"]};
Object.keys(PROV).forEach(k=>{PROV[k].sup=SUP[k][0];PROV[k].resp=SUP[k][1];});
PLANS.forEach(p=>{p.rel=PROV[p.isp].score;p.sup=PROV[p.isp].sup;});
const HW=[
{n:"ISP-supplied free router",cost:0,area:600,dev:15,rel:2.5,mbps:300},
{n:"Single Wi-Fi 5 router",cost:1800,area:900,dev:25,rel:3,mbps:400},
{n:"Single Wi-Fi 6 router",cost:3500,area:1300,dev:50,rel:3.5,mbps:900},
{n:"Wi-Fi 6 mesh (2 nodes)",cost:9000,area:3000,dev:80,rel:4,mbps:900},
{n:"Wi-Fi 6 mesh (3 nodes)",cost:14000,area:4500,dev:100,rel:4,mbps:900},
{n:"Wi-Fi 6 router + wired access point",cost:8000,area:3000,dev:80,rel:4.5,mbps:1000},
{n:"Wi-Fi 6 router + 1 wired access point",cost:6000,area:2000,dev:60,rel:4,mbps:1000},
{n:"Wi-Fi 7 router",cost:12000,area:1800,dev:100,rel:4,mbps:1000},
{n:"Business kit: router, managed switch, 2-3 access points",cost:28000,area:5000,dev:150,rel:5,mbps:1000}];
const CAT=[
["Modems and ISP gear",[["Fiber ONT/ONU (usually supplied by the ISP)","₹0 to rental","Ends the fiber line and gives an Ethernet port"],["DSL or cable modem","₹1,500 to 3,000","Needed for non-fiber lines"],["4G/5G CPE or hotspot","₹3,000 to 15,000","Internet over mobile networks"]]],
["Routers",[["Wi-Fi 5 router","₹1,500 to 2,500","Small homes"],["Wi-Fi 6 router","₹3,000 to 7,000","Most homes and small shops"],["Wi-Fi 7 router","₹9,000 to 25,000","Future-proofing, heavy users"],["Gigabit VPN/business router","₹4,000 to 15,000","Offices: VPN, VLANs, multi-WAN"]]],
["Wi-Fi coverage",[["Ceiling/wall access point","₹5,000 to 12,000","Large or multi-floor spaces, wired backhaul"],["Mesh kit (2-3 nodes)","₹8,000 to 25,000","Easy coverage extension"],["Range extender","₹1,500 to 3,500","Last resort, halves speed"],["Powerline adapter kit","₹2,500 to 5,000","Where cable cannot be run"]]],
["Switches",[["Unmanaged 5/8-port gigabit","₹700 to 2,000","More wired ports"],["PoE switch (8-port)","₹3,500 to 8,000","Powers cameras and access points"],["Managed 24-port","₹10,000 to 60,000","VLANs, monitoring, labs and offices"]]],
["Security",[["Firewall/UTM appliance","₹10,000 to 80,000","Office and lab traffic filtering, VPN"],["Multi-WAN load balancer","₹6,000 to 40,000","Two ISPs for failover"]]],
["Storage and servers",[["NAS (2-bay, diskless)","₹12,000 to 30,000","Shared files and backups"],["Mini PC or small server","₹20,000 and up","Local services, DNS, monitoring"]]],
["Power",[["UPS for router/switch","₹2,000 to 8,000","Keeps the network up in power cuts"],["PoE injector","₹800 to 2,000","Power one PoE device"],["Surge protector","₹500 to 1,500","Protects gear"]]],
["Cabling and racks",[["Cat6/Cat6a cable (box)","₹5,000 to 15,000","Permanent wiring"],["Patch cords","₹100 to 400","Device connections"],["Keystone jacks and faceplates","₹100 to 300 each","Wall outlets"],["Patch panel (24-port)","₹1,500 to 4,000","Neat rack wiring"],["Wall or floor rack","₹4,000 to 20,000","Houses switches and panels"],["Fiber patch cords, media converters, SFP modules","₹800 to 5,000","Fiber links between buildings or floors"],["Crimping and cable testing tools","₹800 to 6,000","Installation and troubleshooting"]]],
["Devices and others",[["USB Wi-Fi or Ethernet adapter","₹500 to 2,500","Older laptops and PCs"],["PCIe network card","₹800 to 5,000","Desktop upgrades"],["IP camera","₹2,000 to 6,000","CCTV"],["Point-to-point wireless bridge","₹4,000 to 12,000","Link two buildings"]]]];

export {PLANS,SRC,PROV,SUP,HW,CAT};
