var t=(d,i,n)=>new Promise((a,r)=>{var h=e=>{try{s(n.next(e))}catch(o){r(o)}},l=e=>{try{s(n.throw(e))}catch(o){r(o)}},s=e=>e.done?a(e.value):Promise.resolve(e.value).then(h,l);s((n=n.apply(d,i)).next())});import{W as m}from"./mobile-Dbm12HIy.js";class c extends m{constructor(){super(),this.handleVisibilityChange=()=>{const i={isActive:document.hidden!==!0};this.notifyListeners("appStateChange",i),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}getInfo(){return t(this,null,function*(){throw this.unimplemented("Not implemented on web.")})}getLaunchUrl(){return t(this,null,function*(){return{url:""}})}getState(){return t(this,null,function*(){return{isActive:document.hidden!==!0}})}minimizeApp(){return t(this,null,function*(){throw this.unimplemented("Not implemented on web.")})}}export{c as AppWeb};
//# sourceMappingURL=web-CuBNufPO.js.map
