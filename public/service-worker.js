if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let o={};const t=e=>n(e,c),f={module:{uri:c},exports:o,require:t};s[c]=Promise.all(i.map((e=>f[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-0549d621"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"build/bundle.css",revision:"6e4a62bb71787c425ff22faebe1f89e2"},{url:"build/bundle.js",revision:"81d6fbf0d3fa4427496c24584750955b"},{url:"config.json",revision:"d2902e848cdc17466eb1ff774d2c401a"},{url:"global.css",revision:"b3fe753a5f22f77603dfc2556263fc28"},{url:"index.html",revision:"8ec54d08d6cdd910414213b53b9d7c74"},{url:"manifest.json",revision:"619f3ef1538b0d821152e0471130ef03"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg|webp)$/,new e.NetworkFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/\.(?:js|css)$/,new e.NetworkFirst({cacheName:"assets",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/\.(?:html)$/,new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map