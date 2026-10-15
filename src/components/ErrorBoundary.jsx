import {Component} from "react";
export default class ErrorBoundary extends Component{
 state={err:null};
 static getDerivedStateFromError(err){return {err};}
 reset=()=>{try{Object.keys(localStorage).filter(k=>k.startsWith("na_")).forEach(k=>localStorage.removeItem(k));}catch{/* ignore */}window.location.reload();};
 render(){return this.state.err?<div role="alert" className="grid min-h-screen place-items-center p-6"><div className="card max-w-md text-center"><h1 className="text-xl font-semibold">Something went wrong</h1><p className="muted my-3">NetAdvisor hit an unexpected error. Your saved data may be damaged. You can reload, or clear the saved NetAdvisor data and start fresh.</p><div className="flex justify-center gap-2"><button className="btn2" onClick={()=>window.location.reload()}>Reload</button><button className="btn" onClick={this.reset}>Clear saved data and reload</button></div></div></div>:this.props.children;}
}
