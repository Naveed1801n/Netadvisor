export const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
export const dt=t=>new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
export const tco=x=>x.upfront+x.monthly*36;
