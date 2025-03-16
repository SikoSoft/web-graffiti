(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const me=globalThis,lt=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),vt=new WeakMap;let Lt=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(lt&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=vt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&vt.set(t,e))}return e}toString(){return this.cssText}};const Zt=s=>new Lt(typeof s=="string"?s:s+"",void 0,at),T=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[n+1],s[0]);return new Lt(t,s,at)},Jt=(s,e)=>{if(lt)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=me.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},mt=lt?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Zt(t)})(s):s;const{is:Yt,defineProperty:Qt,getOwnPropertyDescriptor:es,getOwnPropertyNames:ts,getOwnPropertySymbols:ss,getPrototypeOf:is}=Object,U=globalThis,_t=U.trustedTypes,os=_t?_t.emptyScript:"",Ce=U.reactiveElementPolyfillSupport,oe=(s,e)=>s,ge={toAttribute(s,e){switch(e){case Boolean:s=s?os:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ct=(s,e)=>!Yt(s,e),gt={attribute:!0,type:String,converter:ge,reflect:!1,hasChanged:ct};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),U.litPropertyMetadata??(U.litPropertyMetadata=new WeakMap);class G extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=gt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&Qt(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=es(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const l=i==null?void 0:i.call(this);n.call(this,r),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??gt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=is(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const t=this.properties,o=[...ts(t),...ss(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(mt(i))}else e!==void 0&&t.push(mt(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var n;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const r=(((n=o.converter)==null?void 0:n.toAttribute)!==void 0?o.converter:ge).toAttribute(t,o.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=o.getPropertyOptions(i),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:ge;this._$Em=i,this[i]=l.fromAttribute(t,r.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??ct)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i)r.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],r)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[oe("elementProperties")]=new Map,G[oe("finalized")]=new Map,Ce==null||Ce({ReactiveElement:G}),(U.reactiveElementVersions??(U.reactiveElementVersions=[])).push("2.0.4");const ne=globalThis,$e=ne.trustedTypes,$t=$e?$e.createPolicy("lit-html",{createHTML:s=>s}):void 0,It="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+L,ns=`<${Ut}>`,z=document,re=()=>z.createComment(""),le=s=>s===null||typeof s!="object"&&typeof s!="function",dt=Array.isArray,rs=s=>dt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",xe=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,Et=/>/g,H=RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,At=/"/g,Dt=/^(?:script|style|textarea|title)$/i,ls=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),$=ls(1),D=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),St=new WeakMap,B=z.createTreeWalker(z,129);function Rt(s,e){if(!dt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(e):e}const as=(s,e)=>{const t=s.length-1,o=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=se;for(let l=0;l<t;l++){const a=s[l];let d,m,c=-1,f=0;for(;f<a.length&&(r.lastIndex=f,m=r.exec(a),m!==null);)f=r.lastIndex,r===se?m[1]==="!--"?r=bt:m[1]!==void 0?r=Et:m[2]!==void 0?(Dt.test(m[2])&&(i=RegExp("</"+m[2],"g")),r=H):m[3]!==void 0&&(r=H):r===H?m[0]===">"?(r=i??se,c=-1):m[1]===void 0?c=-2:(c=r.lastIndex-m[2].length,d=m[1],r=m[3]===void 0?H:m[3]==='"'?At:yt):r===At||r===yt?r=H:r===bt||r===Et?r=se:(r=H,i=void 0);const u=r===H&&s[l+1].startsWith("/>")?" ":"";n+=r===se?a+ns:c>=0?(o.push(d),a.slice(0,c)+It+a.slice(c)+L+u):a+L+(c===-2?l:u)}return[Rt(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class ae{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,r=0;const l=e.length-1,a=this.parts,[d,m]=as(e,t);if(this.el=ae.createElement(d,o),B.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=B.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(It)){const f=m[r++],u=i.getAttribute(c).split(L),g=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:g[2],strings:u,ctor:g[1]==="."?ds:g[1]==="?"?hs:g[1]==="@"?us:Ae}),i.removeAttribute(c)}else c.startsWith(L)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(Dt.test(i.tagName)){const c=i.textContent.split(L),f=c.length-1;if(f>0){i.textContent=$e?$e.emptyScript:"";for(let u=0;u<f;u++)i.append(c[u],re()),B.nextNode(),a.push({type:2,index:++n});i.append(c[f],re())}}}else if(i.nodeType===8)if(i.data===Ut)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(L,c+1))!==-1;)a.push({type:7,index:n}),c+=L.length-1}n++}}static createElement(e,t){const o=z.createElement("template");return o.innerHTML=e,o}}function Q(s,e,t=s,o){var r,l;if(e===D)return e;let i=o!==void 0?(r=t._$Co)==null?void 0:r[o]:t._$Cl;const n=le(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=Q(s,i._$AS(s,e.values),i,o)),e}let cs=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??z).importNode(t,!0);B.currentNode=i;let n=B.nextNode(),r=0,l=0,a=o[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new ee(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new ps(n,this,e)),this._$AV.push(d),a=o[++l]}r!==(a==null?void 0:a.index)&&(n=B.nextNode(),r++)}return B.currentNode=z,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}};class ee{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),le(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):rs(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&le(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ae.createElement(Rt(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new cs(i,this),l=r.u(this.options);r.p(t),this.T(l),this._$AH=r}}_$AC(e){let t=St.get(e.strings);return t===void 0&&St.set(e.strings,t=new ae(e)),t}k(e){dt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new ee(this.O(re()),this.O(re()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=v}_$AI(e,t=this,o,i){const n=this.strings;let r=!1;if(n===void 0)e=Q(this,e,t,0),r=!le(e)||e!==this._$AH&&e!==D,r&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=Q(this,l[o+a],t,a),d===D&&(d=this._$AH[a]),r||(r=!le(d)||d!==this._$AH[a]),d===v?e=v:e!==v&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ds extends Ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class hs extends Ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class us extends Ae{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??v)===D)return;const o=this._$AH,i=e===v&&o!==v||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==v&&(o===v||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ps{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const fs={I:ee},Pe=ne.litHtmlPolyfillSupport;Pe==null||Pe(ae,ee),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.2.1");const vs=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new ee(e.insertBefore(re(),n),n,void 0,t??{})}return i._$AI(s),i};let A=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=vs(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var Nt;A._$litElement$=!0,A.finalized=!0,(Nt=globalThis.litElementHydrateSupport)==null||Nt.call(globalThis,{LitElement:A});const Te=globalThis.litElementPolyfillSupport;Te==null||Te({LitElement:A});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const O=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};const ms={attribute:!0,type:String,converter:ge,reflect:!1,hasChanged:ct},_s=(s=ms,e,t)=>{const{kind:o,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(t.name,s),o==="accessor"){const{name:r}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,a,s)},init(l){return l!==void 0&&this.P(r,void 0,s),l}}}if(o==="setter"){const{name:r}=t;return function(l){const a=this[r];e.call(this,l),this.requestUpdate(r,a,s)}}throw Error("Unsupported decorator location: "+o)};function h(s){return(e,t)=>typeof t=="object"?_s(s,e,t):((o,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,r?{...o,wrapped:!0}:o),r?Object.getOwnPropertyDescriptor(i,n):void 0})(s,e,t)}function S(s){return h({...s,state:!0,attribute:!1})}const gs=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);function pe(s,e){return(t,o,i)=>{const n=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(s))??null};return gs(t,o,{get(){return n(this)}})}}const te=T`
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
`;var _;(function(s){s.OPEN="open",s.CLOSE_BUTTON="closeButton",s.CLOSE_ON_OUTSIDE_CLICK="closeOnOutsideClick",s.CLOSE_ON_ESC="closeOnEsc"})(_||(_={}));const ve={[_.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[_.CLOSE_BUTTON]:{default:!1,control:"boolean",description:"Whether to show the close button"},[_.CLOSE_ON_OUTSIDE_CLICK]:{default:!1,control:"boolean",description:"Whether to close the pop-up when clicking outside of it"},[_.CLOSE_ON_ESC]:{default:!1,control:"boolean",description:"Whether to close the pop-up when pressing the ESC key"}};const Mt={ATTRIBUTE:1,CHILD:2},jt=s=>(...e)=>({_$litDirective$:s,values:e});class Ht{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const ht=jt(class extends Ht{constructor(s){var e;if(super(s),s.type!==Mt.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var o,i;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((o=this.nt)!=null&&o.has(n))&&this.st.add(n);return this.render(e)}const t=s.element.classList;for(const n of this.st)n in e||(t.remove(n),this.st.delete(n));for(const n in e){const r=!!e[n];r===this.st.has(n)||(i=this.nt)!=null&&i.has(n)||(r?(t.add(n),this.st.add(n)):(t.remove(n),this.st.delete(n)))}return D}}),$s="pop-up-closed";class Ne extends CustomEvent{constructor(e){super($s,{bubbles:!0,composed:!0,detail:e})}}var M=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Me,je,He,ke,q;let x=(q=class extends A{constructor(){super(...arguments),this[Me]=ve[_.OPEN].default,this[je]=ve[_.CLOSE_BUTTON].default,this[He]=ve[_.CLOSE_ON_OUTSIDE_CLICK].default,this[ke]=ve[_.CLOSE_ON_ESC].default,this.newlyOpened=!1,this._handleClickOutside=e=>{!this.newlyOpened&&this[_.CLOSE_ON_OUTSIDE_CLICK]&&this[_.OPEN]&&!e.composedPath().includes(this.container)&&this.dispatchEvent(new Ne({}))},this._handleKeyDown=e=>{this[_.CLOSE_ON_ESC]&&e.key==="Escape"&&this.dispatchEvent(new Ne({}))}}get classes(){return{"pop-up":!0,open:this.open}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._handleKeyDown),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("click",this._handleClickOutside)}updated(e){super.updated(e),e.has(_.OPEN)&&(this[_.OPEN]?(this.newlyOpened=!0,setTimeout(()=>{this.newlyOpened=!1},100)):this.newlyOpened=!1)}render(){return $`
      <div class=${ht(this.classes)}>
        <div class="inner">
          ${this[_.CLOSE_BUTTON]?$`
                <div
                  class="close-button"
                  @click=${()=>{this.dispatchEvent(new Ne({}))}}
                >
                  &#215;
                </div>
              `:v}
          <slot></slot>
        </div>
      </div>
    `}},Me=_.OPEN,je=_.CLOSE_BUTTON,He=_.CLOSE_ON_OUTSIDE_CLICK,ke=_.CLOSE_ON_ESC,q.styles=[te,T`
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
    `],q);M([h({type:Boolean})],x.prototype,Me,void 0);M([h({type:Boolean})],x.prototype,je,void 0);M([h({type:Boolean})],x.prototype,He,void 0);M([h({type:Boolean})],x.prototype,ke,void 0);M([S()],x.prototype,"newlyOpened",void 0);M([pe(".pop-up")],x.prototype,"container",void 0);M([S()],x.prototype,"classes",null);x=M([O("pop-up")],x);const Le=s=>s??v;var be;(function(s){s.TEXT="text",s.DATE="date",s.DATETIME_LOCAL="datetime-local",s.PASSWORD="password",s.NUMBER="number"})(be||(be={}));const bs="input-submitted";class Es extends CustomEvent{constructor(e){super(bs,{bubbles:!0,composed:!0,detail:e})}}const ys="input-changed";class Ie extends CustomEvent{constructor(e){super(ys,{bubbles:!0,composed:!0,detail:e})}}const{I:As}=fs,wt=()=>document.createComment(""),ie=(s,e,t)=>{var n;const o=s._$AA.parentNode,i=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=o.insertBefore(wt(),i),l=o.insertBefore(wt(),i);t=new As(r,l,s,s.options)}else{const r=t._$AB.nextSibling,l=t._$AM,a=l!==s;if(a){let d;(n=t._$AQ)==null||n.call(t,s),t._$AM=s,t._$AP!==void 0&&(d=s._$AU)!==l._$AU&&t._$AP(d)}if(r!==i||a){let d=t._$AA;for(;d!==r;){const m=d.nextSibling;o.insertBefore(d,i),d=m}}}return t},k=(s,e,t=s)=>(s._$AI(e,t),s),Ss={},ws=(s,e=Ss)=>s._$AH=e,Os=s=>s._$AH,Ue=s=>{var o;(o=s._$AP)==null||o.call(s,!1,!0);let e=s._$AA;const t=s._$AB.nextSibling;for(;e!==t;){const i=e.nextSibling;e.remove(),e=i}};const Ot=(s,e,t)=>{const o=new Map;for(let i=e;i<=t;i++)o.set(s[i],i);return o},kt=jt(class extends Ht{constructor(s){if(super(s),s.type!==Mt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const i=[],n=[];let r=0;for(const l of s)i[r]=o?o(l,r):r,n[r]=t(l,r),r++;return{values:n,keys:i}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,o]){const i=Os(s),{values:n,keys:r}=this.dt(e,t,o);if(!Array.isArray(i))return this.ut=r,n;const l=this.ut??(this.ut=[]),a=[];let d,m,c=0,f=i.length-1,u=0,g=n.length-1;for(;c<=f&&u<=g;)if(i[c]===null)c++;else if(i[f]===null)f--;else if(l[c]===r[u])a[u]=k(i[c],n[u]),c++,u++;else if(l[f]===r[g])a[g]=k(i[f],n[g]),f--,g--;else if(l[c]===r[g])a[g]=k(i[c],n[g]),ie(s,a[g+1],i[c]),c++,g--;else if(l[f]===r[u])a[u]=k(i[f],n[u]),ie(s,i[c],i[f]),f--,u++;else if(d===void 0&&(d=Ot(r,u,g),m=Ot(l,c,f)),d.has(l[c]))if(d.has(l[f])){const C=m.get(r[u]),Oe=C!==void 0?i[C]:null;if(Oe===null){const ft=ie(s,i[c]);k(ft,n[u]),a[u]=ft}else a[u]=k(Oe,n[u]),ie(s,i[c],Oe),i[C]=null;u++}else Ue(i[f]),f--;else Ue(i[c]),c++;for(;u<=g;){const C=ie(s,a[g+1]);k(C,n[u]),a[u++]=C}for(;c<=f;){const C=i[c++];C!==null&&Ue(C)}return this.ut=r,ws(s,a),D}}),Cs="suggestion-submitted";class xs extends CustomEvent{constructor(e){super(Cs,{bubbles:!0,composed:!0,detail:e})}}const Ps="suggestion-changed";class Ts extends CustomEvent{constructor(e){super(Ps,{bubbles:!0,composed:!0,detail:e})}}var V=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},W;let R=(W=class extends A{constructor(){super(...arguments),this.input="",this.maxMatches=5,this.minInput=1,this.suggestions=[],this.selectedIndex=-1}get show(){return this.suggestions.length>0&&this.input.length>=this.minInput}get maxSelectedIndex(){return this.suggestions.length-1}connectedCallback(){super.connectedCallback(),this.addEventListener("select-up",()=>{this._adjustSelectedIndex(-1)}),this.addEventListener("select-down",()=>{this._adjustSelectedIndex(1)}),this.addEventListener("select",()=>{this.suggestions.length&&this.selectedIndex!==-1?this._sendSelectedEvent(this.suggestions[this.selectedIndex]):this._sendSubmitEvent()})}_adjustSelectedIndex(e){let t=this.selectedIndex+e;t<-1&&(t=this.maxSelectedIndex),t>this.maxSelectedIndex&&(t=-1),this.selectedIndex=t}_sendSelectedEvent(e){this.dispatchEvent(new Ts({value:e}))}_sendSubmitEvent(){this.dispatchEvent(new xs({selectedIndex:this.selectedIndex}))}render(){return $`
      <div>
        ${this.show?$` <ul class="box">
              ${kt(this.suggestions,e=>e,(e,t)=>$`
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
    `}},W.styles=[te,T`
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
    `],W);V([h()],R.prototype,"input",void 0);V([h({type:Number})],R.prototype,"maxMatches",void 0);V([h({type:Number})],R.prototype,"minInput",void 0);V([h({type:Array})],R.prototype,"suggestions",void 0);V([S()],R.prototype,"selectedIndex",void 0);V([S()],R.prototype,"show",null);R=V([O("ss-input-auto")],R);var p;(function(s){s.TYPE="type",s.VALUE="value",s.AUTO_COMPLETE="autoComplete",s.PLACEHOLDER="placeholder",s.SUGGESTIONS="suggestions",s.MIN="min",s.MAX="max",s.STEP="step"})(p||(p={}));const N={[p.TYPE]:{default:be.TEXT,description:"What form element type the input behaves as",control:"text"},[p.VALUE]:{default:"",description:"The value as set from the data model",control:"text"},[p.AUTO_COMPLETE]:{default:!1,description:"Should the field provide auto-completion suggestions",control:"boolean"},[p.PLACEHOLDER]:{default:"",description:"Text to display in the field when no value is present",control:"text"},[p.SUGGESTIONS]:{default:[],description:"An array of suggestions used for auto-completion",control:"text"},[p.MIN]:{default:0,description:"The minimum value for a number input",control:"number"},[p.MAX]:{default:100,description:"The maximum value for a number input",control:"number"},[p.STEP]:{default:1,description:"The step value for a number input",control:"number"}};var E=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Be,ze,Fe,Ve,Ge,Bt,zt,Ft,K;let b=(K=class extends A{constructor(){super(...arguments),this.clickFocusHandler=e=>{},this[Be]=N[p.TYPE].default,this[ze]=N[p.VALUE].default,this[Fe]=N[p.AUTO_COMPLETE].default,this[Ve]=N[p.PLACEHOLDER].default,this[Ge]=N[p.SUGGESTIONS].default,this._value=this.value,this.hasFocus=!1,this.autoDismissed=!1,this._handleChange=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this._value=t,e.target instanceof HTMLInputElement&&(e.target.value=this._value),e.preventDefault(),!1},this._handleKeyDown=e=>{if(e.target instanceof HTMLInputElement)switch(e.code){case"Tab":this.autoDismissed=!0;return;case"ArrowUp":this._sendSuggestionUpEvent(),e.preventDefault();return;case"ArrowDown":this._sendSuggestionDownEvent(),e.preventDefault();return;case"Enter":this.showAutoComplete?this._sendSuggestionSelectEvent():this._sendSubmittedEvent(),e.preventDefault();return}},this._handleInput=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this.dispatchEvent(new Ie({value:t})),this._value=t,this.autoDismissed=!1,!0},this._handleFocus=e=>{this.hasFocus=!0,this.autoDismissed=!1},this._handleBlur=e=>{setTimeout(()=>{this.hasFocus=!1},200)},this._suggestionSelectHandler=e=>{this.autoDismissed=!0,this.inputField.value=e.detail.value,this.inputField.dispatchEvent(new Ie({value:e.detail.value}))}}get showAutoComplete(){return this.autoComplete&&!this.autoDismissed&&this.value.length>0}connectedCallback(){super.connectedCallback(),this.clickFocusHandler=e=>{e.composedPath().includes(this.container)||(this.autoDismissed=!0),this.type===be.NUMBER&&(this.min=N[p.MIN].default,this.max=N[p.MAX].default,this.step=N[p.STEP].default)},window.addEventListener("mousedown",this.clickFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousedown",this.clickFocusHandler)}updated(e){super.updated(e),e.has("value")&&(this.inputField.value=this.value)}focus(){this.inputField.focus()}clear(){this.inputField.value="",this.dispatchEvent(new Ie({value:""}))}_sendSuggestionUpEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-up"))}_sendSuggestionDownEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-down"))}_sendSuggestionSelectEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select"))}_sendSubmittedEvent(){this.inputField.dispatchEvent(new Es({value:this._value}))}_handleSubmit(){this._sendSubmittedEvent()}render(){return $`
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
    `}},Be=p.TYPE,ze=p.VALUE,Fe=p.AUTO_COMPLETE,Ve=p.PLACEHOLDER,Ge=p.SUGGESTIONS,Bt=p.MIN,zt=p.MAX,Ft=p.STEP,K.styles=[te,T`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `],K);E([h()],b.prototype,Be,void 0);E([h()],b.prototype,ze,void 0);E([h({type:Boolean})],b.prototype,Fe,void 0);E([h()],b.prototype,Ve,void 0);E([h({type:Array})],b.prototype,Ge,void 0);E([h({type:Number,reflect:!0})],b.prototype,Bt,void 0);E([h({type:Number,reflect:!0})],b.prototype,zt,void 0);E([h({type:Number,reflect:!0})],b.prototype,Ft,void 0);E([S()],b.prototype,"_value",void 0);E([pe("#input-field")],b.prototype,"inputField",void 0);E([pe("ss-input-auto")],b.prototype,"autoCompleteNode",void 0);E([pe("span")],b.prototype,"container",void 0);E([S()],b.prototype,"hasFocus",void 0);E([S()],b.prototype,"autoDismissed",void 0);E([S()],b.prototype,"showAutoComplete",null);b=E([O("ss-input")],b);var ce;(function(s){s.PADDED="padded"})(ce||(ce={}));const Ns={[ce.PADDED]:{default:!1,description:"Whether to provide padding around the loader",control:"boolean"}};var ut=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},qe,X;let Ee=(X=class extends A{constructor(){super(...arguments),this[qe]=Ns[ce.PADDED].default}get classes(){return{container:!0,padded:this.padded}}render(){return $`<div class=${ht(this.classes)}>
      <span class="loader"></span>
    </div>`}},qe=ce.PADDED,X.styles=T`
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
  `,X);ut([h({type:Boolean})],Ee.prototype,qe,void 0);ut([S()],Ee.prototype,"classes",null);Ee=ut([O("ss-loader")],Ee);var y;(function(s){s.TEXT="text",s.DISABLED="disabled",s.LOADING="loading",s.POSITIVE="positive",s.NEGATIVE="negative",s.CLASS="class"})(y||(y={}));y.TEXT+"",y.DISABLED+"",y.LOADING+"",y.POSITIVE+"",y.NEGATIVE+"",y.CLASS+"";var j=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},We,Ke,Xe,Ze,Je,Ye,Z;let P=(Z=class extends A{constructor(){super(...arguments),this[We]="",this[Ke]=!1,this[Xe]=!1,this[Ze]=!1,this[Je]=!1,this[Ye]="",this._handleClick=e=>{this.dispatchEvent(new CustomEvent("ss-button-clicked",{bubbles:!0,composed:!0}))}}get classes(){const e={loading:this.loading,disabled:this.disabled,positive:this.positive,negative:this.negative};return this.class.split(" ").forEach(t=>{e[t]=!0}),e}render(){return $`
      <button
        class=${ht(this.classes)}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
      >
        ${this.loading?$` <ss-loader></ss-loader> `:this.text?this.text:$`<slot></slot>`}
      </button>
    `}},We=y.TEXT,Ke=y.DISABLED,Xe=y.LOADING,Ze=y.POSITIVE,Je=y.NEGATIVE,Ye=y.CLASS,Z.styles=[te,T`
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
    `],Z);j([h()],P.prototype,We,void 0);j([h({type:Boolean})],P.prototype,Ke,void 0);j([h({type:Boolean})],P.prototype,Xe,void 0);j([h({type:Boolean})],P.prototype,Ze,void 0);j([h({type:Boolean})],P.prototype,Je,void 0);j([h()],P.prototype,Ye,void 0);j([S()],P.prototype,"classes",null);P=j([O("ss-button")],P);var Ls=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};let Ct=class extends A{render(){return $`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </svg>
    `}};Ct=Ls([O("svg-profile")],Ct);var ye;(function(s){s.PROFILE="profile"})(ye||(ye={}));var w;(function(s){s.NAME="name",s.SIZE="size",s.COLOR="color"})(w||(w={}));const De={[w.NAME]:{default:ye.PROFILE,description:"The name of the icon to display",control:"text"},[w.SIZE]:{default:24,description:"The size of the icon in pixels",control:"number"},[w.COLOR]:{default:"#000",description:"The color of the icon",control:"text"}};ye.PROFILE+"";var Se=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Qe,et,tt,J;let de=(J=class extends A{constructor(){super(...arguments),this[Qe]=De[w.NAME].default,this[et]=De[w.COLOR].default,this[tt]=De[w.SIZE].default}render(){return $`
      <span
        class="icon"
        style="--color: ${this[w.COLOR]}; --size: ${this[w.SIZE]}px;"
      >
        <svg-profile></svg-profile>
      </span>
    `}},Qe=w.NAME,et=w.COLOR,tt=w.SIZE,J.styles=[te,T`
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
    `],J);Se([h()],de.prototype,Qe,void 0);Se([h()],de.prototype,et,void 0);Se([h({type:Number})],de.prototype,tt,void 0);de=Se([O("ss-icon")],de);const Is=s=>typeof s!="string"&&"strTag"in s,Us=(s,e,t)=>{let o=s[0];for(let i=1;i<s.length;i++)o+=e[i-1],o+=s[i];return o};const Ds=s=>Is(s)?Us(s.strings,s.values):s;let Re=Ds;class Rs{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let s=0;s<256;s++)(s>>4&15).toString(16)+(s&15).toString(16);let Ms=new Rs;Ms.resolve();const js="select-changed";class Hs extends CustomEvent{constructor(e){super(js,{bubbles:!0,composed:!0,detail:e})}}var I;(function(s){s.OPTIONS="options",s.SELECTED="selected"})(I||(I={}));const xt={[I.OPTIONS]:{default:[],description:"The options to display in the select",control:"text"},[I.SELECTED]:{default:"",description:"The value of the selected option",control:"text"}};var we=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(r=s[l])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},st,it,Y;let he=(Y=class extends A{constructor(){super(...arguments),this[st]=xt[I.OPTIONS].default,this[it]=xt[I.SELECTED].default}get value(){return this.selectNode.value}_handleSelectChanged(){this.dispatchEvent(new Hs({value:this.selectNode.value}))}render(){return $`
      <select @change=${this._handleSelectChanged}>
        ${kt(this.options,e=>e.value,e=>$`
            <option
              value=${e.value}
              ?selected=${this.selected===e.value}
            >
              ${e.label}
            </option>
          `)}
      </select>
    `}},st=I.OPTIONS,it=I.SELECTED,Y.styles=[te],Y);we([h({type:Array})],he.prototype,st,void 0);we([h()],he.prototype,it,void 0);we([pe("select")],he.prototype,"selectNode",void 0);he=we([O("ss-select")],he);const ks="user-logged-in";var Vt=(s=>(s.USER_ID="userId",s.USERNAME="username",s.AUTH_TOKEN="authToken",s))(Vt||{});class Bs extends CustomEvent{constructor(e){super(ks,{bubbles:!0,composed:!0,detail:e})}}const Gt=T`
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
`,zs=[202,204];class qt{constructor(e){this.config=e,this.authToken=e.authToken}async httpRequest(e,t){let o;const i=new Headers(t.headers);i.append("authorization",this.authToken);const n=new URL(e,this.config.baseUrl),r=new Request(n,{...t,headers:i});try{const l=await fetch(r);return l.ok&&!zs.includes(l.status)&&(o=await l.json()),l.status===403&&this.config.errorHandler(),{status:l.status,response:o}}catch(l){console.error(`Api encountered an error performing request: ${l}`)}return null}async get(e,t){return await this.httpRequest(e,{method:"get",...t})}async post(e,t,o){return await this.httpRequest(e,{method:"post",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async put(e,t,o){return await this.httpRequest(e,{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async delete(e,t){return await this.httpRequest(e,{method:"delete",...t})}setAuthToken(e){this.authToken=e}}const Wt=new qt({authToken:"",baseUrl:"http://localhost:9999/api/",errorHandler:()=>{console.error("Api encountered an error")}}),Kt=new qt({authToken:"",baseUrl:"https://sikosoft2.azurewebsites.net/api/",errorHandler:()=>{console.error("Api encountered an error")}});console.log("API",Wt,Kt);const Xt="dev";var _e=(s=>(s.ENV="env",s))(_e||{});const Fs={env:{default:Xt,control:"text",description:"The environment to use for the API"}};var Vs=Object.defineProperty,Gs=Object.getOwnPropertyDescriptor,fe=(s,e,t,o)=>{for(var i=o>1?void 0:o?Gs(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Vs(e,t,i),i},ot,Pt;let F=class extends(Pt=A,ot=_e.ENV,Pt){constructor(){super(...arguments),this[ot]=Fs[_e.ENV].default,this.username="",this.password="",this.loading=!1}get api(){return this[_e.ENV]==="prod"?Kt:Wt}_handleUsernameChanged(s){this.username=s.detail.value}_handleUsernameSubmitted(s){this._login()}_handlePasswordChanged(s){this.password=s.detail.value}_handlePasswordSubmitted(s){this._login()}async _login(){this.loading=!0;const s=await this.api.post("login",{username:this.username,password:this.password});s&&s.status!==401&&this.dispatchEvent(new Bs({...s.response})),this.loading=!1}render(){return $`
      <form>
        <ss-input
          id="username"
          placeholder=${Re("Username")}
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${Re("Password")}
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this._login}
          text=${Re("Login")}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `}};F.styles=[Gt,T`
      form {
        ss-input,
        ss-button {
          display: block;
          margin: 0.5rem 0;
        }
      }
    `];fe([h()],F.prototype,ot,2);fe([S()],F.prototype,"username",2);fe([S()],F.prototype,"password",2);fe([S()],F.prototype,"loading",2);F=fe([O("login-form")],F);var nt=(s=>(s.ENV="env",s))(nt||{});const qs={env:{default:Xt,control:"text",description:"The environment to use for the API"}};var Ws=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,pt=(s,e,t,o)=>{for(var i=o>1?void 0:o?Ks(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&Ws(e,t,i),i},rt,Tt;let ue=class extends(Tt=A,rt=nt.ENV,Tt){constructor(){super(),this[rt]=qs[nt.ENV].default,this.popUpIsOpen=!1,this._injectGoogleFonts()}showLoginForm(){this.popUpIsOpen=!0}hideLoginForm(){this.popUpIsOpen=!1}async _handleUserLoggedIn(s){Object.values(Vt).forEach(e=>{sessionStorage.setItem(e,s.detail[e])}),this.hideLoginForm()}_togglePopUp(){this.popUpIsOpen=!this.popUpIsOpen}_injectGoogleFonts(){const s=document.createElement("link");s.rel="preconnect",s.href="https://fonts.googleapis.com",document.head.appendChild(s);const e=document.createElement("link");e.rel="preconnect",e.href="https://fonts.gstatic.com",e.crossOrigin="anonymous",document.head.appendChild(e);const t=document.createElement("link");t.href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",t.rel="stylesheet",document.head.appendChild(t)}render(){return $`
      <div>
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form
            env=${this.env}
            @user-logged-in=${this._handleUserLoggedIn}
          ></login-form>
        </pop-up>
        ${!1}
      </div>
    `}};ue.styles=[Gt];pt([h()],ue.prototype,rt,2);pt([S()],ue.prototype,"popUpIsOpen",2);ue=pt([O("user-portal")],ue);
