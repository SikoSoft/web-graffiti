(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fe=globalThis,it=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol(),dt=new WeakMap;let wt=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(it&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=dt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&dt.set(t,e))}return e}toString(){return this.cssText}};const kt=s=>new wt(typeof s=="string"?s:s+"",void 0,ot),P=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[n+1],s[0]);return new wt(t,s,ot)},Bt=(s,e)=>{if(it)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=fe.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},ht=it?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return kt(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:zt,defineProperty:Ft,getOwnPropertyDescriptor:Vt,getOwnPropertyNames:Gt,getOwnPropertySymbols:qt,getPrototypeOf:Wt}=Object,U=globalThis,ut=U.trustedTypes,Kt=ut?ut.emptyScript:"",Oe=U.reactiveElementPolyfillSupport,oe=(s,e)=>s,ve={toAttribute(s,e){switch(e){case Boolean:s=s?Kt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},nt=(s,e)=>!zt(s,e),pt={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:nt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),U.litPropertyMetadata??(U.litPropertyMetadata=new WeakMap);class V extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=pt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&Ft(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=Vt(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const l=i==null?void 0:i.call(this);n.call(this,r),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=Wt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const t=this.properties,o=[...Gt(t),...qt(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(ht(i))}else e!==void 0&&t.push(ht(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Bt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var n;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const r=(((n=o.converter)==null?void 0:n.toAttribute)!==void 0?o.converter:ve).toAttribute(t,o.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=o.getPropertyOptions(i),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:ve;this._$Em=i,this[i]=l.fromAttribute(t,r.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??nt)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i)r.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],r)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[oe("elementProperties")]=new Map,V[oe("finalized")]=new Map,Oe==null||Oe({ReactiveElement:V}),(U.reactiveElementVersions??(U.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,me=ne.trustedTypes,ft=me?me.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ot="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+N,Xt=`<${Ct}>`,z=document,re=()=>z.createComment(""),le=s=>s===null||typeof s!="object"&&typeof s!="function",rt=Array.isArray,Zt=s=>rt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Ce=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vt=/-->/g,mt=/>/g,H=RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,gt=/"/g,xt=/^(?:script|style|textarea|title)$/i,Jt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),$=Jt(1),D=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),$t=new WeakMap,B=z.createTreeWalker(z,129);function Tt(s,e){if(!rt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ft!==void 0?ft.createHTML(e):e}const Yt=(s,e)=>{const t=s.length-1,o=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=se;for(let l=0;l<t;l++){const a=s[l];let d,m,c=-1,f=0;for(;f<a.length&&(r.lastIndex=f,m=r.exec(a),m!==null);)f=r.lastIndex,r===se?m[1]==="!--"?r=vt:m[1]!==void 0?r=mt:m[2]!==void 0?(xt.test(m[2])&&(i=RegExp("</"+m[2],"g")),r=H):m[3]!==void 0&&(r=H):r===H?m[0]===">"?(r=i??se,c=-1):m[1]===void 0?c=-2:(c=r.lastIndex-m[2].length,d=m[1],r=m[3]===void 0?H:m[3]==='"'?gt:_t):r===gt||r===_t?r=H:r===vt||r===mt?r=se:(r=H,i=void 0);const u=r===H&&s[l+1].startsWith("/>")?" ":"";n+=r===se?a+Xt:c>=0?(o.push(d),a.slice(0,c)+Ot+a.slice(c)+N+u):a+N+(c===-2?l:u)}return[Tt(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class ae{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,r=0;const l=e.length-1,a=this.parts,[d,m]=Yt(e,t);if(this.el=ae.createElement(d,o),B.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=B.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Ot)){const f=m[r++],u=i.getAttribute(c).split(N),g=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:g[2],strings:u,ctor:g[1]==="."?es:g[1]==="?"?ts:g[1]==="@"?ss:ye}),i.removeAttribute(c)}else c.startsWith(N)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(xt.test(i.tagName)){const c=i.textContent.split(N),f=c.length-1;if(f>0){i.textContent=me?me.emptyScript:"";for(let u=0;u<f;u++)i.append(c[u],re()),B.nextNode(),a.push({type:2,index:++n});i.append(c[f],re())}}}else if(i.nodeType===8)if(i.data===Ct)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(N,c+1))!==-1;)a.push({type:7,index:n}),c+=N.length-1}n++}}static createElement(e,t){const o=z.createElement("template");return o.innerHTML=e,o}}function Y(s,e,t=s,o){var r,l;if(e===D)return e;let i=o!==void 0?(r=t._$Co)==null?void 0:r[o]:t._$Cl;const n=le(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=Y(s,i._$AS(s,e.values),i,o)),e}let Qt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??z).importNode(t,!0);B.currentNode=i;let n=B.nextNode(),r=0,l=0,a=o[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new ee(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new is(n,this,e)),this._$AV.push(d),a=o[++l]}r!==(a==null?void 0:a.index)&&(n=B.nextNode(),r++)}return B.currentNode=z,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}};class ee{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),le(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Zt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&le(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ae.createElement(Tt(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new Qt(i,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=$t.get(e.strings);return t===void 0&&$t.set(e.strings,t=new ae(e)),t}k(e){rt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new ee(this.O(re()),this.O(re()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ye{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=v}_$AI(e,t=this,o,i){const n=this.strings;let r=!1;if(n===void 0)e=Y(this,e,t,0),r=!le(e)||e!==this._$AH&&e!==D,r&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=Y(this,l[o+a],t,a),d===D&&(d=this._$AH[a]),r||(r=!le(d)||d!==this._$AH[a]),d===v?e=v:e!==v&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class es extends ye{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class ts extends ye{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class ss extends ye{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??v)===D)return;const o=this._$AH,i=e===v&&o!==v||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==v&&(o===v||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class is{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const os={I:ee},xe=ne.litHtmlPolyfillSupport;xe==null||xe(ae,ee),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.2.1");const ns=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new ee(e.insertBefore(re(),n),n,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let A=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ns(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var St;A._$litElement$=!0,A.finalized=!0,(St=globalThis.litElementHydrateSupport)==null||St.call(globalThis,{LitElement:A});const Te=globalThis.litElementPolyfillSupport;Te==null||Te({LitElement:A});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rs={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:nt},ls=(s=rs,e,t)=>{const{kind:o,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(t.name,s),o==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,s)},init(l){return l!==void 0&&this.P(r,void 0,s),l}}}if(o==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,s)}}throw Error("Unsupported decorator location: "+o)};function h(s){return(e,t)=>typeof t=="object"?ls(s,e,t):((o,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,r?{...o,wrapped:!0}:o),r?Object.getOwnPropertyDescriptor(i,n):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(s){return h({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const as=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(s,e){return(t,o,i)=>{const n=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(s))??null};return as(t,o,{get(){return n(this)}})}}const te=P`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  input[type='password'],
  input[type='number'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }
`;var _;(function(s){s.OPEN="open",s.CLOSE_BUTTON="closeButton",s.CLOSE_ON_OUTSIDE_CLICK="closeOnOutsideClick",s.CLOSE_ON_ESC="closeOnEsc"})(_||(_={}));const pe={[_.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[_.CLOSE_BUTTON]:{default:!1,control:"boolean",description:"Whether to show the close button"},[_.CLOSE_ON_OUTSIDE_CLICK]:{default:!1,control:"boolean",description:"Whether to close the pop-up when clicking outside of it"},[_.CLOSE_ON_ESC]:{default:!1,control:"boolean",description:"Whether to close the pop-up when pressing the ESC key"}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt={ATTRIBUTE:1,CHILD:2},Lt=s=>(...e)=>({_$litDirective$:s,values:e});class Nt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=Lt(class extends Nt{constructor(s){var e;if(super(s),s.type!==Pt.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var o,i;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((o=this.nt)!=null&&o.has(n))&&this.st.add(n);return this.render(e)}const t=s.element.classList;for(const n of this.st)n in e||(t.remove(n),this.st.delete(n));for(const n in e){const r=!!e[n];r===this.st.has(n)||(i=this.nt)!=null&&i.has(n)||(r?(t.add(n),this.st.add(n)):(t.remove(n),this.st.delete(n)))}return D}}),cs="pop-up-closed";class Pe extends CustomEvent{constructor(e){super(cs,{bubbles:!0,composed:!0,detail:e})}}var M=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Re,Me,je,He,G;let x=(G=class extends A{constructor(){super(...arguments),this[Re]=pe[_.OPEN].default,this[Me]=pe[_.CLOSE_BUTTON].default,this[je]=pe[_.CLOSE_ON_OUTSIDE_CLICK].default,this[He]=pe[_.CLOSE_ON_ESC].default,this.newlyOpened=!1,this._handleClickOutside=e=>{!this.newlyOpened&&this[_.CLOSE_ON_OUTSIDE_CLICK]&&this[_.OPEN]&&!e.composedPath().includes(this.container)&&this.dispatchEvent(new Pe({}))},this._handleKeyDown=e=>{this[_.CLOSE_ON_ESC]&&e.key==="Escape"&&this.dispatchEvent(new Pe({}))}}get classes(){return{"pop-up":!0,open:this.open}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._handleKeyDown),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("click",this._handleClickOutside)}updated(e){super.updated(e),e.has(_.OPEN)&&(this[_.OPEN]?(this.newlyOpened=!0,setTimeout(()=>{this.newlyOpened=!1},100)):this.newlyOpened=!1)}render(){return $`
      <div class=${lt(this.classes)}>
        <div class="inner">
          ${this[_.CLOSE_BUTTON]?$`
                <div
                  class="close-button"
                  @click=${()=>{this.dispatchEvent(new Pe({}))}}
                >
                  &#215;
                </div>
              `:v}
          <slot></slot>
        </div>
      </div>
    `}},Re=_.OPEN,Me=_.CLOSE_BUTTON,je=_.CLOSE_ON_OUTSIDE_CLICK,He=_.CLOSE_ON_ESC,G.styles=[te,P`
      .pop-up {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .inner {
          padding: 3rem;
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          .close-button {
            position: absolute;
            top: 0rem;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    `],G);M([h({type:Boolean})],x.prototype,Re,void 0);M([h({type:Boolean})],x.prototype,Me,void 0);M([h({type:Boolean})],x.prototype,je,void 0);M([h({type:Boolean})],x.prototype,He,void 0);M([S()],x.prototype,"newlyOpened",void 0);M([ue(".pop-up")],x.prototype,"container",void 0);M([S()],x.prototype,"classes",null);x=M([O("pop-up")],x);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Le=s=>s??v;var _e;(function(s){s.TEXT="text",s.DATE="date",s.DATETIME_LOCAL="datetime-local",s.PASSWORD="password",s.NUMBER="number"})(_e||(_e={}));const ds="input-submitted";class hs extends CustomEvent{constructor(e){super(ds,{bubbles:!0,composed:!0,detail:e})}}const us="input-changed";class Ne extends CustomEvent{constructor(e){super(us,{bubbles:!0,composed:!0,detail:e})}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:ps}=os,bt=()=>document.createComment(""),ie=(s,e,t)=>{var n;const o=s._$AA.parentNode,i=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=o.insertBefore(bt(),i),l=o.insertBefore(bt(),i);t=new ps(r,l,s,s.options)}else{const r=t._$AB.nextSibling,l=t._$AM,a=l!==s;if(a){let d;(n=t._$AQ)==null||n.call(t,s),t._$AM=s,t._$AP!==void 0&&(d=s._$AU)!==l._$AU&&t._$AP(d)}if(r!==i||a){let d=t._$AA;for(;d!==r;){const m=d.nextSibling;o.insertBefore(d,i),d=m}}}return t},k=(s,e,t=s)=>(s._$AI(e,t),s),fs={},vs=(s,e=fs)=>s._$AH=e,ms=s=>s._$AH,Ie=s=>{var o;(o=s._$AP)==null||o.call(s,!1,!0);let e=s._$AA;const t=s._$AB.nextSibling;for(;e!==t;){const i=e.nextSibling;e.remove(),e=i}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=(s,e,t)=>{const o=new Map;for(let i=e;i<=t;i++)o.set(s[i],i);return o},It=Lt(class extends Nt{constructor(s){if(super(s),s.type!==Pt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const i=[],n=[];let r=0;for(const l of s)i[r]=o?o(l,r):r,n[r]=t(l,r),r++;return{values:n,keys:i}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,o]){const i=ms(s),{values:n,keys:r}=this.dt(e,t,o);if(!Array.isArray(i))return this.ut=r,n;const l=this.ut??(this.ut=[]),a=[];let d,m,c=0,f=i.length-1,u=0,g=n.length-1;for(;c<=f&&u<=g;)if(i[c]===null)c++;else if(i[f]===null)f--;else if(l[c]===r[u])a[u]=k(i[c],n[u]),c++,u++;else if(l[f]===r[g])a[g]=k(i[f],n[g]),f--,g--;else if(l[c]===r[g])a[g]=k(i[c],n[g]),ie(s,a[g+1],i[c]),c++,g--;else if(l[f]===r[u])a[u]=k(i[f],n[u]),ie(s,i[c],i[f]),f--,u++;else if(d===void 0&&(d=yt(r,u,g),m=yt(l,c,f)),d.has(l[c]))if(d.has(l[f])){const C=m.get(r[u]),we=C!==void 0?i[C]:null;if(we===null){const ct=ie(s,i[c]);k(ct,n[u]),a[u]=ct}else a[u]=k(we,n[u]),ie(s,i[c],we),i[C]=null;u++}else Ie(i[f]),f--;else Ie(i[c]),c++;for(;u<=g;){const C=ie(s,a[g+1]);k(C,n[u]),a[u++]=C}for(;c<=f;){const C=i[c++];C!==null&&Ie(C)}return this.ut=r,vs(s,a),D}}),_s="suggestion-submitted";class gs extends CustomEvent{constructor(e){super(_s,{bubbles:!0,composed:!0,detail:e})}}const $s="suggestion-changed";class bs extends CustomEvent{constructor(e){super($s,{bubbles:!0,composed:!0,detail:e})}}var F=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},q;let R=(q=class extends A{constructor(){super(...arguments),this.input="",this.maxMatches=5,this.minInput=1,this.suggestions=[],this.selectedIndex=-1}get show(){return this.suggestions.length>0&&this.input.length>=this.minInput}get maxSelectedIndex(){return this.suggestions.length-1}connectedCallback(){super.connectedCallback(),this.addEventListener("select-up",()=>{this._adjustSelectedIndex(-1)}),this.addEventListener("select-down",()=>{this._adjustSelectedIndex(1)}),this.addEventListener("select",()=>{this.suggestions.length&&this.selectedIndex!==-1?this._sendSelectedEvent(this.suggestions[this.selectedIndex]):this._sendSubmitEvent()})}_adjustSelectedIndex(e){let t=this.selectedIndex+e;t<-1&&(t=this.maxSelectedIndex),t>this.maxSelectedIndex&&(t=-1),this.selectedIndex=t}_sendSelectedEvent(e){this.dispatchEvent(new bs({value:e}))}_sendSubmitEvent(){this.dispatchEvent(new gs({selectedIndex:this.selectedIndex}))}render(){return $`
      <div>
        ${this.show?$` <ul class="box">
              ${It(this.suggestions,e=>e,(e,t)=>$`
                  <li
                    class=${t===this.selectedIndex?"selected":""}
                    @mouseover=${()=>this.selectedIndex=t}
                    @click=${()=>this._sendSelectedEvent(e)}
                  >
                    ${e}
                  </li>
                `)}
            </ul>`:v}
      </div>
    `}},q.styles=[te,P`
      div {
        position: relative;
      }

      ul {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      }

      li {
        padding: 0.5rem;
        background-color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        color: #888;
        text-align: left;
      }

      li.selected {
        color: #000;
        background-color: #ddd;
      }
    `],q);F([h()],R.prototype,"input",void 0);F([h({type:Number})],R.prototype,"maxMatches",void 0);F([h({type:Number})],R.prototype,"minInput",void 0);F([h({type:Array})],R.prototype,"suggestions",void 0);F([S()],R.prototype,"selectedIndex",void 0);F([S()],R.prototype,"show",null);R=F([O("ss-input-auto")],R);var p;(function(s){s.TYPE="type",s.VALUE="value",s.AUTO_COMPLETE="autoComplete",s.PLACEHOLDER="placeholder",s.SUGGESTIONS="suggestions",s.MIN="min",s.MAX="max",s.STEP="step"})(p||(p={}));const L={[p.TYPE]:{default:_e.TEXT,description:"What form element type the input behaves as",control:"text"},[p.VALUE]:{default:"",description:"The value as set from the data model",control:"text"},[p.AUTO_COMPLETE]:{default:!1,description:"Should the field provide auto-completion suggestions",control:"boolean"},[p.PLACEHOLDER]:{default:"",description:"Text to display in the field when no value is present",control:"text"},[p.SUGGESTIONS]:{default:[],description:"An array of suggestions used for auto-completion",control:"text"},[p.MIN]:{default:0,description:"The minimum value for a number input",control:"number"},[p.MAX]:{default:100,description:"The maximum value for a number input",control:"number"},[p.STEP]:{default:1,description:"The step value for a number input",control:"number"}};var y=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},ke,Be,ze,Fe,Ve,Ut,Dt,Rt,W;let b=(W=class extends A{constructor(){super(...arguments),this.clickFocusHandler=e=>{},this[ke]=L[p.TYPE].default,this[Be]=L[p.VALUE].default,this[ze]=L[p.AUTO_COMPLETE].default,this[Fe]=L[p.PLACEHOLDER].default,this[Ve]=L[p.SUGGESTIONS].default,this._value=this.value,this.hasFocus=!1,this.autoDismissed=!1,this._handleChange=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this._value=t,e.target instanceof HTMLInputElement&&(e.target.value=this._value),e.preventDefault(),!1},this._handleKeyDown=e=>{if(e.target instanceof HTMLInputElement)switch(e.code){case"Tab":this.autoDismissed=!0;return;case"ArrowUp":this._sendSuggestionUpEvent(),e.preventDefault();return;case"ArrowDown":this._sendSuggestionDownEvent(),e.preventDefault();return;case"Enter":this.showAutoComplete?this._sendSuggestionSelectEvent():this._sendSubmittedEvent(),e.preventDefault();return}},this._handleInput=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this.dispatchEvent(new Ne({value:t})),this._value=t,this.autoDismissed=!1,!0},this._handleFocus=e=>{this.hasFocus=!0,this.autoDismissed=!1},this._handleBlur=e=>{setTimeout(()=>{this.hasFocus=!1},200)},this._suggestionSelectHandler=e=>{this.autoDismissed=!0,this.inputField.value=e.detail.value,this.inputField.dispatchEvent(new Ne({value:e.detail.value}))}}get showAutoComplete(){return this.autoComplete&&!this.autoDismissed&&this.value.length>0}connectedCallback(){super.connectedCallback(),this.clickFocusHandler=e=>{e.composedPath().includes(this.container)||(this.autoDismissed=!0),this.type===_e.NUMBER&&(this.min=L[p.MIN].default,this.max=L[p.MAX].default,this.step=L[p.STEP].default)},window.addEventListener("mousedown",this.clickFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousedown",this.clickFocusHandler)}updated(e){super.updated(e),e.has("value")&&(this.inputField.value=this.value)}focus(){this.inputField.focus()}clear(){this.inputField.value="",this.dispatchEvent(new Ne({value:""}))}_sendSuggestionUpEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-up"))}_sendSuggestionDownEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-down"))}_sendSuggestionSelectEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select"))}_sendSubmittedEvent(){this.inputField.dispatchEvent(new hs({value:this._value}))}_handleSubmit(){this._sendSubmittedEvent()}render(){return $`
      <span>
        <input
          id="input-field"
          type=${this.type}
          value=${this.value}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          placeholder=${this.placeholder}
          min=${Le(this.min)}
          max=${Le(this.max)}
          step=${Le(this.step)}
          autocomplete="off"
          autocapitalize="off"
        />
        ${this.showAutoComplete?$`
              <ss-input-auto
                input=${this._value}
                .suggestions=${this.suggestions}
                @suggestion-submitted=${this._handleSubmit}
                @suggestion-changed=${this._suggestionSelectHandler}
              ></ss-input-auto>
            `:v}
      </span>
    `}},ke=p.TYPE,Be=p.VALUE,ze=p.AUTO_COMPLETE,Fe=p.PLACEHOLDER,Ve=p.SUGGESTIONS,Ut=p.MIN,Dt=p.MAX,Rt=p.STEP,W.styles=[te,P`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `],W);y([h()],b.prototype,ke,void 0);y([h()],b.prototype,Be,void 0);y([h({type:Boolean})],b.prototype,ze,void 0);y([h()],b.prototype,Fe,void 0);y([h({type:Array})],b.prototype,Ve,void 0);y([h({type:Number,reflect:!0})],b.prototype,Ut,void 0);y([h({type:Number,reflect:!0})],b.prototype,Dt,void 0);y([h({type:Number,reflect:!0})],b.prototype,Rt,void 0);y([S()],b.prototype,"_value",void 0);y([ue("#input-field")],b.prototype,"inputField",void 0);y([ue("ss-input-auto")],b.prototype,"autoCompleteNode",void 0);y([ue("span")],b.prototype,"container",void 0);y([S()],b.prototype,"hasFocus",void 0);y([S()],b.prototype,"autoDismissed",void 0);y([S()],b.prototype,"showAutoComplete",null);b=y([O("ss-input")],b);var ce;(function(s){s.PADDED="padded"})(ce||(ce={}));const ys={[ce.PADDED]:{default:!1,description:"Whether to provide padding around the loader",control:"boolean"}};var at=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Ge,K;let ge=(K=class extends A{constructor(){super(...arguments),this[Ge]=ys[ce.PADDED].default}get classes(){return{container:!0,padded:this.padded}}render(){return $`<div class=${lt(this.classes)}>
      <span class="loader"></span>
    </div>`}},Ge=ce.PADDED,K.styles=P`
    .container {
      text-align: center;
      height: 16px;
    }

    .container.padded {
      margin: 1rem;
    }

    .loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #000;
      box-shadow:
        32px 0 #000,
        -32px 0 #000;
      position: relative;
      animation: flash 0.5s ease-out infinite alternate;
      transform: skewX(50%);
    }

    @keyframes flash {
      0% {
        background-color: #0002;
        box-shadow:
          32px 0 #0002,
          -32px 0 #000;
      }
      50% {
        background-color: #000;
        box-shadow:
          32px 0 #0002,
          -32px 0 #0002;
      }
      100% {
        background-color: #0002;
        box-shadow:
          32px 0 #000,
          -32px 0 #0002;
      }
    }
  `,K);at([h({type:Boolean})],ge.prototype,Ge,void 0);at([S()],ge.prototype,"classes",null);ge=at([O("ss-loader")],ge);var E;(function(s){s.TEXT="text",s.DISABLED="disabled",s.LOADING="loading",s.POSITIVE="positive",s.NEGATIVE="negative",s.CLASS="class"})(E||(E={}));E.TEXT+"",E.DISABLED+"",E.LOADING+"",E.POSITIVE+"",E.NEGATIVE+"",E.CLASS+"";var j=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},qe,We,Ke,Xe,Ze,Je,X;let T=(X=class extends A{constructor(){super(...arguments),this[qe]="",this[We]=!1,this[Ke]=!1,this[Xe]=!1,this[Ze]=!1,this[Je]="",this._handleClick=e=>{this.dispatchEvent(new CustomEvent("ss-button-clicked",{bubbles:!0,composed:!0}))}}get classes(){const e={loading:this.loading,disabled:this.disabled,positive:this.positive,negative:this.negative};return this.class.split(" ").forEach(t=>{e[t]=!0}),e}render(){return $`
      <button
        class=${lt(this.classes)}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
      >
        ${this.loading?$` <ss-loader></ss-loader> `:this.text?this.text:$`<slot></slot>`}
      </button>
    `}},qe=E.TEXT,We=E.DISABLED,Ke=E.LOADING,Xe=E.POSITIVE,Ze=E.NEGATIVE,Je=E.CLASS,X.styles=[te,P`
      button {
        border-radius: 0.5rem;

        &.loading {
          min-width: 100px;
        }

        &.positive {
          background-color: var(--positive-background-color);
          color: var(--positive-color);
          border-color: var(--positive-color);
        }

        &.negative {
          background-color: var(--negative-background-color);
          color: var(--negative-color);
          border-color: var(--negative-color);
        }

        &.disabled {
          opacity: 0.5;
        }
      }
    `],X);j([h()],T.prototype,qe,void 0);j([h({type:Boolean})],T.prototype,We,void 0);j([h({type:Boolean})],T.prototype,Ke,void 0);j([h({type:Boolean})],T.prototype,Xe,void 0);j([h({type:Boolean})],T.prototype,Ze,void 0);j([h()],T.prototype,Je,void 0);j([S()],T.prototype,"classes",null);T=j([O("ss-button")],T);var Es=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};let Et=class extends A{render(){return $`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </svg>
    `}};Et=Es([O("svg-profile")],Et);var $e;(function(s){s.PROFILE="profile"})($e||($e={}));var w;(function(s){s.NAME="name",s.SIZE="size",s.COLOR="color"})(w||(w={}));const Ue={[w.NAME]:{default:$e.PROFILE,description:"The name of the icon to display",control:"text"},[w.SIZE]:{default:24,description:"The size of the icon in pixels",control:"number"},[w.COLOR]:{default:"#000",description:"The color of the icon",control:"text"}};$e.PROFILE+"";var Ee=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Ye,Qe,et,Z;let de=(Z=class extends A{constructor(){super(...arguments),this[Ye]=Ue[w.NAME].default,this[Qe]=Ue[w.COLOR].default,this[et]=Ue[w.SIZE].default}render(){return $`
      <span
        class="icon"
        style="--color: ${this[w.COLOR]}; --size: ${this[w.SIZE]}px;"
      >
        <svg-profile></svg-profile>
      </span>
    `}},Ye=w.NAME,Qe=w.COLOR,et=w.SIZE,Z.styles=[te,P`
      .icon {
        display: inline-block;
        width: var(--size, 24px);
        height: var(--size, 24px);

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: var(--color, #000);
        }
      }
    `],Z);Ee([h()],de.prototype,Ye,void 0);Ee([h()],de.prototype,Qe,void 0);Ee([h({type:Number})],de.prototype,et,void 0);de=Ee([O("ss-icon")],de);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const As=s=>typeof s!="string"&&"strTag"in s,Ss=(s,e,t)=>{let o=s[0];for(let i=1;i<s.length;i++)o+=e[i-1],o+=s[i];return o};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ws=s=>As(s)?Ss(s.strings,s.values):s;let De=ws;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Os{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let s=0;s<256;s++)(s>>4&15).toString(16)+(s&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Cs=new Os;Cs.resolve();const xs="select-changed";class Ts extends CustomEvent{constructor(e){super(xs,{bubbles:!0,composed:!0,detail:e})}}var I;(function(s){s.OPTIONS="options",s.SELECTED="selected"})(I||(I={}));const At={[I.OPTIONS]:{default:[],description:"The options to display in the select",control:"text"},[I.SELECTED]:{default:"",description:"The value of the selected option",control:"text"}};var Ae=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},tt,st,J;let he=(J=class extends A{constructor(){super(...arguments),this[tt]=At[I.OPTIONS].default,this[st]=At[I.SELECTED].default}get value(){return this.selectNode.value}_handleSelectChanged(){this.dispatchEvent(new Ts({value:this.selectNode.value}))}render(){return $`
      <select @change=${this._handleSelectChanged}>
        ${It(this.options,e=>e.value,e=>$`
            <option
              value=${e.value}
              ?selected=${this.selected===e.value}
            >
              ${e.label}
            </option>
          `)}
      </select>
    `}},tt=I.OPTIONS,st=I.SELECTED,J.styles=[te],J);Ae([h({type:Array})],he.prototype,tt,void 0);Ae([h()],he.prototype,st,void 0);Ae([ue("select")],he.prototype,"selectNode",void 0);he=Ae([O("ss-select")],he);const Ps="user-logged-in";var Mt=(s=>(s.USER_ID="userId",s.USERNAME="username",s.AUTH_TOKEN="authToken",s))(Mt||{});class Ls extends CustomEvent{constructor(e){super(Ps,{bubbles:!0,composed:!0,detail:e})}}const jt=P`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }
`,Ns=[202,204];class Is{constructor(e){this.config=e,this.authToken=e.authToken}async httpRequest(e,t){let o;const i=new Headers(t.headers);i.append("authorization",this.authToken);const n=new URL(e,this.config.baseUrl),r=new Request(n,{...t,headers:i});try{const l=await fetch(r);return l.ok&&!Ns.includes(l.status)&&(o=await l.json()),l.status===403&&this.config.errorHandler(),{status:l.status,response:o}}catch(l){console.error(`Api encountered an error performing request: ${l}`)}return null}async get(e,t){return await this.httpRequest(e,{method:"get",...t})}async post(e,t,o){return await this.httpRequest(e,{method:"post",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async put(e,t,o){return await this.httpRequest(e,{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async delete(e,t){return await this.httpRequest(e,{method:"delete",...t})}setAuthToken(e){this.authToken=e}}const Us=new Is({authToken:"",baseUrl:"http://localhost:9999/api/",errorHandler:()=>{console.error("Api encountered an error")}});var Ds=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,Se=(s,e,t,o)=>{for(var i=o>1?void 0:o?Rs(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ds(e,t,i),i};let Q=class extends A{constructor(){super(...arguments),this.username="",this.password="",this.loading=!1}_handleUsernameChanged(s){this.username=s.detail.value}_handleUsernameSubmitted(s){this._login()}_handlePasswordChanged(s){this.password=s.detail.value}_handlePasswordSubmitted(s){this._login()}async _login(){this.loading=!0;const s=await Us.post("login",{username:this.username,password:this.password});s&&s.status!==401&&this.dispatchEvent(new Ls({...s.response})),this.loading=!1}render(){return $`
      <form>
        <ss-input
          id="username"
          placeholder=${De("Username")}
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${De("Password")}
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this._login}
          text=${De("Login")}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `}};Q.styles=[jt,P`
      form {
        ss-input,
        ss-button {
          display: block;
          margin: 0.5rem 0;
        }
      }
    `];Se([S()],Q.prototype,"username",2);Se([S()],Q.prototype,"password",2);Se([S()],Q.prototype,"loading",2);Q=Se([O("login-form")],Q);var Ms=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Ht=(s,e,t,o)=>{for(var i=o>1?void 0:o?js(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ms(e,t,i),i};let be=class extends A{constructor(){super(),this.popUpIsOpen=!1,this._injectGoogleFonts()}showLoginForm(){this.popUpIsOpen=!0}hideLoginForm(){this.popUpIsOpen=!1}async _handleUserLoggedIn(s){Object.values(Mt).forEach(e=>{sessionStorage.setItem(e,s.detail[e])}),this.hideLoginForm()}_togglePopUp(){this.popUpIsOpen=!this.popUpIsOpen}_injectGoogleFonts(){const s=document.createElement("link");s.rel="preconnect",s.href="https://fonts.googleapis.com",document.head.appendChild(s);const e=document.createElement("link");e.rel="preconnect",e.href="https://fonts.gstatic.com",e.crossOrigin="anonymous",document.head.appendChild(e);const t=document.createElement("link");t.href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",t.rel="stylesheet",document.head.appendChild(t)}render(){return $`
      <div>
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form @user-logged-in=${this._handleUserLoggedIn}></login-form>
        </pop-up>
        ${!1}
      </div>
    `}};be.styles=[jt];Ht([S()],be.prototype,"popUpIsOpen",2);be=Ht([O("user-portal")],be);
