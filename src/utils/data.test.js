import test from "node:test";import assert from "node:assert/strict";import {CAT,HW,PLANS,PROV,SRC} from "../data/plans.js";import {kindOf} from "./hardware.js";
test("plan names are unique and every plan has provider and source data",()=>{const n=PLANS.map(p=>p.n);assert.equal(new Set(n).size,n.length);
 assert.ok(PLANS.every(p=>PROV[p.isp]&&SRC[p.src]&&Number.isFinite(p.rel)&&Number.isFinite(p.sup)&&p.mbps>0&&p.cost>0));});
test("providers with no repair-time data are scored cautiously, not neutrally",()=>{const u=PLANS.filter(p=>PROV[p.isp].resp.startsWith("No repair-time data"));assert.ok(u.length>0);assert.ok(u.every(p=>p.sup===2.75&&p.sup<3));});
test("equipment bundle names are unique and include a mid-size option",()=>{const n=HW.map(h=>h.n);assert.equal(new Set(n).size,n.length);assert.ok(HW.some(h=>h.area>=2000&&h.cost<=6000));});
test("every catalogue item and bundle gets a specific picture",()=>{const names=[...CAT.flatMap(([,l])=>l.map(i=>i[0])),...HW.map(h=>h.n)];
 assert.deepEqual(names.filter(n=>kindOf(n)==="generic"),[]);const items=CAT.flatMap(([,l])=>l.map(i=>i[0]));assert.equal(new Set(items).size,items.length);});
test("specific hardware maps to the right picture",()=>{const k={"Range extender":"extender","Powerline adapter kit":"powerline","Surge protector":"surge","Keystone jacks and faceplates":"jack","UPS for router/switch":"ups","Patch panel (24-port)":"rack","Managed 24-port":"switch","Unmanaged 5/8-port gigabit":"switch","PoE injector":"poe","Wi-Fi 6 mesh (2 nodes)":"mesh","Wi-Fi 7 router":"router"};
 for(const [n,v] of Object.entries(k))assert.equal(kindOf(n),v,n);});
