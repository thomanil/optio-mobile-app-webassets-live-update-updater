var d=(p,e,r)=>new Promise((t,i)=>{var n=o=>{try{a(r.next(o))}catch(c){i(c)}},s=o=>{try{a(r.throw(o))}catch(c){i(c)}},a=o=>o.done?t(o.value):Promise.resolve(o.value).then(n,s);a((r=r.apply(p,e)).next())});import{W as x,b as E,E as R}from"./mobile-CAWeu3tY.js";function P(p){const e=p.split("/").filter(t=>t!=="."),r=[];return e.forEach(t=>{t===".."&&r.length>0&&r[r.length-1]!==".."?r.pop():r.push(t)}),r.join("/")}function q(p,e){p=P(p),e=P(e);const r=p.split("/"),t=e.split("/");return p!==e&&r.every((i,n)=>i===t[n])}class m extends x{constructor(){super(...arguments),this.DB_VERSION=1,this.DB_NAME="Disc",this._writeCmds=["add","put","delete"],this.downloadFile=e=>d(this,null,function*(){var r,t;const i=E(e,e.webFetchExtra),n=yield fetch(e.url,i);let s;if(!e.progress)s=yield n.blob();else if(!(n!=null&&n.body))s=new Blob;else{const o=n.body.getReader();let c=0;const h=[],l=n.headers.get("content-type"),w=parseInt(n.headers.get("content-length")||"0",10);for(;;){const{done:y,value:b}=yield o.read();if(y)break;h.push(b),c+=(b==null?void 0:b.length)||0;const g={url:e.url,bytes:c,contentLength:w};this.notifyListeners("progress",g)}const f=new Uint8Array(c);let u=0;for(const y of h)typeof y!="undefined"&&(f.set(y,u),u+=y.length);s=new Blob([f.buffer],{type:l||void 0})}return{path:(yield this.writeFile({path:e.path,directory:(r=e.directory)!==null&&r!==void 0?r:void 0,recursive:(t=e.recursive)!==null&&t!==void 0?t:!1,data:s})).uri,blob:s}})}initDb(){return d(this,null,function*(){if(this._db!==void 0)return this._db;if(!("indexedDB"in window))throw this.unavailable("This browser doesn't support IndexedDB");return new Promise((e,r)=>{const t=indexedDB.open(this.DB_NAME,this.DB_VERSION);t.onupgradeneeded=m.doUpgrade,t.onsuccess=()=>{this._db=t.result,e(t.result)},t.onerror=()=>r(t.error),t.onblocked=()=>{console.warn("db blocked")}})})}static doUpgrade(e){const t=e.target.result;switch(e.oldVersion){case 0:case 1:default:t.objectStoreNames.contains("FileStorage")&&t.deleteObjectStore("FileStorage"),t.createObjectStore("FileStorage",{keyPath:"path"}).createIndex("by_folder","folder")}}dbRequest(e,r){return d(this,null,function*(){const t=this._writeCmds.indexOf(e)!==-1?"readwrite":"readonly";return this.initDb().then(i=>new Promise((n,s)=>{const c=i.transaction(["FileStorage"],t).objectStore("FileStorage")[e](...r);c.onsuccess=()=>n(c.result),c.onerror=()=>s(c.error)}))})}dbIndexRequest(e,r,t){return d(this,null,function*(){const i=this._writeCmds.indexOf(r)!==-1?"readwrite":"readonly";return this.initDb().then(n=>new Promise((s,a)=>{const l=n.transaction(["FileStorage"],i).objectStore("FileStorage").index(e)[r](...t);l.onsuccess=()=>s(l.result),l.onerror=()=>a(l.error)}))})}getPath(e,r){const t=r!==void 0?r.replace(/^[/]+|[/]+$/g,""):"";let i="";return e!==void 0&&(i+="/"+e),r!==""&&(i+="/"+t),i}clear(){return d(this,null,function*(){(yield this.initDb()).transaction(["FileStorage"],"readwrite").objectStore("FileStorage").clear()})}readFile(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path),t=yield this.dbRequest("get",[r]);if(t===void 0)throw Error("File does not exist.");return{data:t.content?t.content:""}})}writeFile(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path);let t=e.data;const i=e.encoding,n=e.recursive,s=yield this.dbRequest("get",[r]);if(s&&s.type==="directory")throw Error("The supplied path is a directory.");const a=r.substr(0,r.lastIndexOf("/"));if((yield this.dbRequest("get",[a]))===void 0){const l=a.indexOf("/",1);if(l!==-1){const w=a.substr(l);yield this.mkdir({path:w,directory:e.directory,recursive:n})}}if(!i&&!(t instanceof Blob)&&(t=t.indexOf(",")>=0?t.split(",")[1]:t,!this.isBase64String(t)))throw Error("The supplied data is not valid base64 content.");const c=Date.now(),h={path:r,folder:a,type:"file",size:t instanceof Blob?t.size:t.length,ctime:c,mtime:c,content:t};return yield this.dbRequest("put",[h]),{uri:h.path}})}appendFile(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path);let t=e.data;const i=e.encoding,n=r.substr(0,r.lastIndexOf("/")),s=Date.now();let a=s;const o=yield this.dbRequest("get",[r]);if(o&&o.type==="directory")throw Error("The supplied path is a directory.");if((yield this.dbRequest("get",[n]))===void 0){const l=n.indexOf("/",1);if(l!==-1){const w=n.substr(l);yield this.mkdir({path:w,directory:e.directory,recursive:!0})}}if(!i&&!this.isBase64String(t))throw Error("The supplied data is not valid base64 content.");if(o!==void 0){if(o.content instanceof Blob)throw Error("The occupied entry contains a Blob object which cannot be appended to.");o.content!==void 0&&!i?t=btoa(atob(o.content)+atob(t)):t=o.content+t,a=o.ctime}const h={path:r,folder:n,type:"file",size:t.length,ctime:a,mtime:s,content:t};yield this.dbRequest("put",[h])})}deleteFile(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path);if((yield this.dbRequest("get",[r]))===void 0)throw Error("File does not exist.");if((yield this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)])).length!==0)throw Error("Folder is not empty.");yield this.dbRequest("delete",[r])})}mkdir(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path),t=e.recursive,i=r.substr(0,r.lastIndexOf("/")),n=(r.match(/\//g)||[]).length,s=yield this.dbRequest("get",[i]),a=yield this.dbRequest("get",[r]);if(n===1)throw Error("Cannot create Root directory");if(a!==void 0)throw Error("Current directory does already exist.");if(!t&&n!==2&&s===void 0)throw Error("Parent directory must exist");if(t&&n!==2&&s===void 0){const h=i.substr(i.indexOf("/",1));yield this.mkdir({path:h,directory:e.directory,recursive:t})}const o=Date.now(),c={path:r,folder:i,type:"directory",size:0,ctime:o,mtime:o};yield this.dbRequest("put",[c])})}rmdir(e){return d(this,null,function*(){const{path:r,directory:t,recursive:i}=e,n=this.getPath(t,r),s=yield this.dbRequest("get",[n]);if(s===void 0)throw Error("Folder does not exist.");if(s.type!=="directory")throw Error("Requested path is not a directory");const a=yield this.readdir({path:r,directory:t});if(a.files.length!==0&&!i)throw Error("Folder is not empty");for(const o of a.files){const c=`${r}/${o.name}`;(yield this.stat({path:c,directory:t})).type==="file"?yield this.deleteFile({path:c,directory:t}):yield this.rmdir({path:c,directory:t,recursive:i})}yield this.dbRequest("delete",[n])})}readdir(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path),t=yield this.dbRequest("get",[r]);if(e.path!==""&&t===void 0)throw Error("Folder does not exist.");const i=yield this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)]);return{files:yield Promise.all(i.map(s=>d(this,null,function*(){let a=yield this.dbRequest("get",[s]);return a===void 0&&(a=yield this.dbRequest("get",[s+"/"])),{name:s.substring(r.length+1),type:a.type,size:a.size,ctime:a.ctime,mtime:a.mtime,uri:a.path}})))}})}getUri(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path);let t=yield this.dbRequest("get",[r]);return t===void 0&&(t=yield this.dbRequest("get",[r+"/"])),{uri:(t==null?void 0:t.path)||r}})}stat(e){return d(this,null,function*(){const r=this.getPath(e.directory,e.path);let t=yield this.dbRequest("get",[r]);if(t===void 0&&(t=yield this.dbRequest("get",[r+"/"])),t===void 0)throw Error("Entry does not exist.");return{type:t.type,size:t.size,ctime:t.ctime,mtime:t.mtime,uri:t.path}})}rename(e){return d(this,null,function*(){yield this._copy(e,!0)})}copy(e){return d(this,null,function*(){return this._copy(e,!1)})}requestPermissions(){return d(this,null,function*(){return{publicStorage:"granted"}})}checkPermissions(){return d(this,null,function*(){return{publicStorage:"granted"}})}_copy(e,r=!1){return d(this,null,function*(){let{toDirectory:t}=e;const{to:i,from:n,directory:s}=e;if(!i||!n)throw Error("Both to and from must be provided");t||(t=s);const a=this.getPath(s,n),o=this.getPath(t,i);if(a===o)return{uri:o};if(q(a,o))throw Error("To path cannot contain the from path");let c;try{c=yield this.stat({path:i,directory:t})}catch(f){const u=i.split("/");u.pop();const y=u.join("/");if(u.length>0&&(yield this.stat({path:y,directory:t})).type!=="directory")throw new Error("Parent directory of the to path is a file")}if(c&&c.type==="directory")throw new Error("Cannot overwrite a directory with a file");const h=yield this.stat({path:n,directory:s}),l=(f,u,y)=>d(this,null,function*(){const b=this.getPath(t,f),g=yield this.dbRequest("get",[b]);g.ctime=u,g.mtime=y,yield this.dbRequest("put",[g])}),w=h.ctime?h.ctime:Date.now();switch(h.type){case"file":{const f=yield this.readFile({path:n,directory:s});r&&(yield this.deleteFile({path:n,directory:s}));let u;!(f.data instanceof Blob)&&!this.isBase64String(f.data)&&(u=R.UTF8);const y=yield this.writeFile({path:i,directory:t,data:f.data,encoding:u});return r&&(yield l(i,w,h.mtime)),y}case"directory":{if(c)throw Error("Cannot move a directory over an existing object");try{yield this.mkdir({path:i,directory:t,recursive:!1}),r&&(yield l(i,w,h.mtime))}catch(u){}const f=(yield this.readdir({path:n,directory:s})).files;for(const u of f)yield this._copy({from:`${n}/${u.name}`,to:`${i}/${u.name}`,directory:s,toDirectory:t},r);r&&(yield this.rmdir({path:n,directory:s}))}}return{uri:o}})}isBase64String(e){try{return btoa(atob(e))==e}catch(r){return!1}}}m._debug=!0;export{m as FilesystemWeb};
//# sourceMappingURL=web-K8iNvzoc.js.map
