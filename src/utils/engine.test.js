import test from "node:test";import assert from "node:assert/strict";import {bom,need,recommend,toInputs} from "./engine.js";
const base={use:"home",u:4,d:12,acts:["browse","stream","calls"],size:1000,bm:1000,bu:10000,prio:"bal"};
const run=o=>recommend(toInputs({...base,...o}));
const ACTS=["browse","stream","calls","gaming","nas","cctv"],PR=["cost","bal","speed","rel","sup"];
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const mk=r=>{const R=(a,b)=>a+Math.floor(r()*(b-a+1));return()=>({use:"home",u:R(1,30),d:R(1,100),acts:ACTS.filter(()=>r()<.5),size:R(200,5000),bm:R(300,3000),bu:R(0,50000),prio:PR[R(0,4)]});};

test("very low budget stays affordable and compatible",()=>{const r=run({bm:600,bu:4000});assert.equal(r.near,false);const t=r.top[0];assert.ok(t.monthly<=600&&t.upfront<=4000&&t.eff>=r.req);});
test("high speed requirement is met",()=>{const r=run({u:30,d:80,acts:ACTS,bm:3000,bu:50000,size:3000});assert.ok(r.top[0].eff>=r.req);});
test("large coverage area gets enough coverage",()=>{const r=run({size:3500,bm:2000,bu:30000});assert.ok(r.top[0].h.area>=3500);});
test("largest supported area (5,000 sq ft) is still coverable",()=>{const r=run({size:5000,d:100,u:30,bm:3000,bu:50000});assert.equal(r.near,false);assert.ok(r.top[0].h.area>=5000);});
test("many devices fit equipment capacity",()=>{const r=run({d:90,u:10,bm:2000,bu:30000});assert.ok(r.top[0].h.dev>=90);});
test("low equipment budget avoids expensive hardware",()=>{const r=run({bu:2000});assert.ok(r.top.every(x=>x.upfront<=2000));});
test("no feasible option is reported with limitations",()=>{const r=run({bm:300,bu:0});assert.equal(r.near,true);assert.ok(r.relax);assert.ok(r.top.every(x=>x.limits.length>0));});
test("excess speed is not rewarded",()=>{const r=run({bm:3000,bu:50000});assert.ok(r.top[0].eff<=r.req*8);});
test("top picks come from different providers where possible",()=>{assert.ok(new Set(run({}).top.map(x=>x.p.isp)).size>=2);});
test("top provider is not the same at every budget",()=>{const s=new Set([400,600,900,1500,3000].map(b=>run({bm:b,u:8,d:30,bu:50000}).top[0].p.isp));assert.ok(s.size>=2,[...s].join());});
test("priority changes the result: speed priority never picks a slower plan than cost priority",()=>{const a=run({prio:"cost",u:12,d:40,acts:ACTS,bm:3000,bu:50000}).top[0],b=run({prio:"speed",u:12,d:40,acts:ACTS,bm:3000,bu:50000}).top[0];assert.ok(b.eff>=a.eff);assert.ok(b.eff>a.eff||b.monthly>=a.monthly);});
test("a single qualifying option gets a full fit score, not 0%",()=>{const g=mk(rng(7));let found=null;for(let i=0;i<30000&&!found;i++){const r=recommend(toInputs(g()));if(!r.near&&r.pool.length===1)found=r;}assert.ok(found,"expected at least one single-option scenario");assert.equal(found.top[0].score,1);});
test("weights are reported and sum to about 100%",()=>{const r=run({});const sum=r.weights.reduce((s,w)=>s+w[1],0);assert.ok(sum>=98&&sum<=102,String(sum));assert.ok(r.weights.some(w=>w[0]==="Price data confidence"));});
test("seeded fuzz: results are valid, ranked and budget-monotonic",()=>{const g=mk(rng(42));
 for(let i=0;i<3000;i++){const a=g(),r=recommend(toInputs(a)),t=r.top[0];
  assert.ok([r.req,t.eff,t.monthly,t.upfront,t.score].every(Number.isFinite),JSON.stringify(a));
  assert.ok(r.top.every(x=>x.score>=0&&x.score<=1));
  if(r.near)assert.ok(r.top.every(x=>x.limits.length>0));
  else{assert.equal(t.limits.length,0);assert.ok(t.score>=Math.max(...r.pool.map(x=>x.score))-1e-9);
   assert.equal(recommend(toInputs({...a,bm:a.bm+500,bu:a.bu+5000})).near,false,"more budget must not remove every option");}}});
test("realistic inputs rarely end with no feasible option",()=>{const g=mk(rng(99));let n=0,near=0;
 while(n<1500){const a=g();if(a.u>30||a.d>60||a.size>3000||a.bm<1000||a.bu<10000)continue;n++;if(recommend(toInputs(a)).near)near++;}
 assert.ok(near/n<0.1,`near share ${(near/n*100).toFixed(1)}%`);});
test("bandwidth estimate is sensible at both extremes",()=>{assert.equal(need(1,1,[]),5);assert.ok(need(4,12,["browse","stream","calls"])<80);assert.ok(need(30,100,ACTS)<400);});
test("extras list has unique items and numeric costs",()=>{const f=run({use:"office",acts:ACTS,d:40}).f,it=bom(f);assert.equal(new Set(it.map(x=>x[0])).size,it.length);assert.ok(it.every(x=>Number.isFinite(x[3])));});
