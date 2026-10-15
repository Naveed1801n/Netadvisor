// Downloads one Creative Commons photo per hardware type from Wikimedia Commons into public/hardware
// and records the credit in src/data/hardwareCredits.json. Review the results: search can return a poor match.
// Delete any photo you do not like and the app falls back to its illustration.
import {mkdir,writeFile} from "node:fs/promises";
const UA="NetAdvisorStudentProject/1.0 (replace-with-your-email@example.com)";
const Q={router:"Wi-Fi router",mesh:"mesh Wi-Fi system",modem:"DSL modem",ap:"wireless access point",switch:"Ethernet network switch",poe:"PoE injector",cable:"Ethernet patch cable",nic:"network interface card",adapter:"USB Wi-Fi adapter",nas:"network attached storage",ups:"uninterruptible power supply",firewall:"network firewall appliance",camera:"IP security camera",rack:"network patch panel rack",server:"mini PC server"};
const okLicense=l=>/^(CC BY|CC BY-SA|CC0|Public domain|PD)/i.test(l||"")&&!/NC|ND/i.test(l);
const strip=h=>String(h||"").replace(/<[^>]*>/g,"").trim();
await mkdir("public/hardware",{recursive:true});
const credits={};
for(const [k,q] of Object.entries(Q)){
 try{
  const url="https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=25&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=640&gsrsearch="+encodeURIComponent(q+" filetype:bitmap");
  const data=await (await fetch(url,{headers:{"User-Agent":UA}})).json();
  const pages=Object.values(data.query?.pages||{}).sort((a,b)=>a.index-b.index);
  const hit=pages.find(p=>{const i=p.imageinfo?.[0];return i&&i.mime==="image/jpeg"&&okLicense(i.extmetadata?.LicenseShortName?.value);});
  if(!hit){console.log(k,": no suitable Creative Commons photo found");continue;}
  const i=hit.imageinfo[0],img=await fetch(i.thumburl,{headers:{"User-Agent":UA}});
  await writeFile(`public/hardware/${k}.jpg`,Buffer.from(await img.arrayBuffer()));
  credits[k]={author:strip(i.extmetadata?.Artist?.value)||"Unknown",license:i.extmetadata.LicenseShortName.value,source:i.descriptionurl};
  console.log(k,":",hit.title);
 }catch(e){console.log(k,": failed",e.message);}
 await new Promise(r=>setTimeout(r,500));
}
await writeFile("src/data/hardwareCredits.json",JSON.stringify(credits,null,1)+"\n");
console.log("Done. Check public/hardware and delete any photo that does not match.");
