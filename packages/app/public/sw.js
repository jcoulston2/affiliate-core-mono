if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise((async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()}))),c.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},c=(c,s)=>{Promise.all(c.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(c)};self.define=(c,n,i)=>{s[c]||(s[c]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+c.slice(1)};return Promise.all(n.map((c=>{switch(c){case"exports":return s;case"module":return a;default:return e(c)}}))).then((e=>{const c=i(...e);return s.default||(s.default=c),s}))})))}}define("./sw.js",["./workbox-c3c683e6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/4.2a57cfdbbdf482f3860f.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/405b121b71be1c7d52c0af8ec1487e5cb1bd6446.2ebd5a38563377e153a9.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/882b1b68c6e414f5f2ad8b62939a0c79bf92c107.a033b8206da7828fdcbc.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/commons.5b5280086e8597b6015d.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/ebfe28635fec4a150ca686a9405c58efc9a2aed4.38ddff2bbd934c77c766.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/framework.fb62450ddadc42e4b469.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/main-a70e510b482529e9a418.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/%5B...cms%5D-bdc620e8eabb161c0d51.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/404-f17515bb9a99664cca6e.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/_app-8156280d28ea8ce22d13.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/_error-69a3fbaf90c409c7ab52.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/index-d25f82e6d2aa64768eb0.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/product-listing/%5B...slug%5D-d0d1884d1125ebfd7a31.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/pages/search/params-e3653e71c60319827c48.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/polyfills-5cc501cae5c0ca9593b5.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/styles.a83a6a4548b93404854d.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/chunks/webpack-f29f399e79898ec031d4.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/css/styles.810f3bf4.chunk.css",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/qyupRsXMZaTfXpQhqBGcb/_buildManifest.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/_next/static/qyupRsXMZaTfXpQhqBGcb/_ssgManifest.js",revision:"qyupRsXMZaTfXpQhqBGcb"},{url:"/favicon.ico",revision:"5c1cac35cb8f0c263d8e658d7dca4386"},{url:"/icons/backup/icon-144x144.jpg",revision:"056ad0d9c5fbdf3d9d59b99685ca0b9e"},{url:"/icons/backup/icon-144x144.png",revision:"6bcbb416a2fab45b3d2227a15f94eb67"},{url:"/icons/backup/icon-192x192.jpg",revision:"df982a13fabc218667efe63416f587f1"},{url:"/icons/backup/icon-192x192.png",revision:"05404cca4cdc2610c03ce6de9eeae2f9"},{url:"/icons/backup/icon-256x256.jpg",revision:"6da8bb8dc37127ab5468651b07a302f1"},{url:"/icons/backup/icon-256x256.png",revision:"030fcbb8b8fd2579b6711aeffae496d3"},{url:"/icons/backup/icon-384x384.jpg",revision:"6ba13e6d2f75611da961ce0e48ee28f2"},{url:"/icons/backup/icon-384x384.png",revision:"c4d1c04edf97c88bb386b3587310a7ca"},{url:"/icons/backup/icon-48x48.jpg",revision:"b319520f6e81870416fa6f68fd4aa0b6"},{url:"/icons/backup/icon-48x48.png",revision:"b911f53d89fbe8967fc63c3dffbe0d27"},{url:"/icons/backup/icon-512x512.jpg",revision:"086101a866046cc591e67c26c20bdbf8"},{url:"/icons/backup/icon-512x512.png",revision:"fe64ca133a50389eca7fb3f5cdf88ceb"},{url:"/icons/backup/icon-72x72.jpg",revision:"062bddd9192a8b4e3b1b6c2ccc7e319b"},{url:"/icons/backup/icon-72x72.png",revision:"8b98306a2c1a70a5cbf74b8db7be6d66"},{url:"/icons/backup/icon-96x96.jpg",revision:"cbc763a8d23610dd17b6da8ae6dfbc5d"},{url:"/icons/backup/icon-96x96.png",revision:"ddbf6ec3d705d34d1c62344072929d3b"},{url:"/icons/icon-144x144.jpg",revision:"dd3f02075200a3ec369d03bc10c07b91"},{url:"/icons/icon-144x144.png",revision:"19f0b86df8d57dc85024b8651f3ba4d6"},{url:"/icons/icon-192x192.jpg",revision:"8baa921779682c8a3dab7a59e371b01e"},{url:"/icons/icon-192x192.png",revision:"658ab7319f1de4c6e0d4a8aae8ee92db"},{url:"/icons/icon-256x256.jpg",revision:"8842d6ac86d029697f180ff350540cff"},{url:"/icons/icon-256x256.png",revision:"5b733938a117a5ffe9518ce80d740003"},{url:"/icons/icon-384x384.jpg",revision:"72dd8cd1e841ad258676f7dbfee78797"},{url:"/icons/icon-384x384.png",revision:"b77fe5181ea38b1243a4972d047915d3"},{url:"/icons/icon-48x48.jpg",revision:"a50ffb782a23c3d296e6dc3730349a85"},{url:"/icons/icon-48x48.png",revision:"4bc619522ce562ababc12a524feb3514"},{url:"/icons/icon-512x512.jpg",revision:"8d7f4831fa1e216ced26d3915daa9aa4"},{url:"/icons/icon-512x512.png",revision:"0c6ff655317d7a4720eae3e74b38180a"},{url:"/icons/icon-72x72.jpg",revision:"b06a5d17231c859531efd2492bab7496"},{url:"/icons/icon-72x72.png",revision:"ff54c0efa2884780e4c8c5f3a68e0b4c"},{url:"/icons/icon-96x96.jpg",revision:"ac87edb2bba654fe32b2824a9219a2a3"},{url:"/icons/icon-96x96.png",revision:"90a220fb5f8e20dcd741e4377d5a9f61"},{url:"/manifest.json",revision:"7377f0233d17854c36efa2790dd534ae"},{url:"/robots.txt",revision:"6e61660b670d2ee75dfd6453c1d96af3"},{url:"/sitemap.xml",revision:"f2d6c36fde745842231203f41f1a4880"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:s,state:n})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
