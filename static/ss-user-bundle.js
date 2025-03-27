(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const Se=globalThis,St=Se.ShadowRoot&&(Se.ShadyCSS===void 0||Se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),Nt=new WeakMap;let Xt=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(St&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Nt.set(t,e))}return e}toString(){return this.cssText}};const ds=s=>new Xt(typeof s=="string"?s:s+"",void 0,wt),C=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[n+1],s[0]);return new Xt(t,s,wt)},us=(s,e)=>{if(St)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=Se.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},Lt=St?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return ds(t)})(s):s;const{is:hs,defineProperty:ps,getOwnPropertyDescriptor:fs,getOwnPropertyNames:vs,getOwnPropertySymbols:ms,getPrototypeOf:gs}=Object,R=globalThis,Ut=R.trustedTypes,_s=Ut?Ut.emptyScript:"",je=R.reactiveElementPolyfillSupport,pe=(s,e)=>s,Oe={toAttribute(s,e){switch(e){case Boolean:s=s?_s:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Ot=(s,e)=>!hs(s,e),Rt={attribute:!0,type:String,converter:Oe,reflect:!1,hasChanged:Ot};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);class X extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Rt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&ps(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=fs(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const a=i==null?void 0:i.call(this);n.call(this,r),this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Rt}static _$Ei(){if(this.hasOwnProperty(pe("elementProperties")))return;const e=gs(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pe("properties"))){const t=this.properties,o=[...vs(t),...ms(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(Lt(i))}else e!==void 0&&t.push(Lt(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return us(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var n;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const r=(((n=o.converter)==null?void 0:n.toAttribute)!==void 0?o.converter:Oe).toAttribute(t,o.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=o.getPropertyOptions(i),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:Oe;this._$Em=i,this[i]=a.fromAttribute(t,r.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??Ot)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i)r.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],r)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[pe("elementProperties")]=new Map,X[pe("finalized")]=new Map,je==null||je({ReactiveElement:X}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.0.4");const fe=globalThis,Ce=fe.trustedTypes,Dt=Ce?Ce.createPolicy("lit-html",{createHTML:s=>s}):void 0,Yt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Zt="?"+L,$s=`<${Zt}>`,V=document,ve=()=>V.createComment(""),me=s=>s===null||typeof s!="object"&&typeof s!="function",Ct=Array.isArray,Es=s=>Ct(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",He=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mt=/-->/g,jt=/>/g,k=RegExp(`>|${He}(?:([^\\s"'>=/]+)(${He}*=${He}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Ft=/"/g,Jt=/^(?:script|style|textarea|title)$/i,bs=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),$=bs(1),D=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),kt=new WeakMap,z=V.createTreeWalker(V,129);function Qt(s,e){if(!Ct(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dt!==void 0?Dt.createHTML(e):e}const ys=(s,e)=>{const t=s.length-1,o=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=de;for(let a=0;a<t;a++){const l=s[a];let u,m,c=-1,f=0;for(;f<l.length&&(r.lastIndex=f,m=r.exec(l),m!==null);)f=r.lastIndex,r===de?m[1]==="!--"?r=Mt:m[1]!==void 0?r=jt:m[2]!==void 0?(Jt.test(m[2])&&(i=RegExp("</"+m[2],"g")),r=k):m[3]!==void 0&&(r=k):r===k?m[0]===">"?(r=i??de,c=-1):m[1]===void 0?c=-2:(c=r.lastIndex-m[2].length,u=m[1],r=m[3]===void 0?k:m[3]==='"'?Ft:Ht):r===Ft||r===Ht?r=k:r===Mt||r===jt?r=de:(r=k,i=void 0);const h=r===k&&s[a+1].startsWith("/>")?" ":"";n+=r===de?l+$s:c>=0?(o.push(u),l.slice(0,c)+Yt+l.slice(c)+L+h):l+L+(c===-2?a:h)}return[Qt(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class ge{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,r=0;const a=e.length-1,l=this.parts,[u,m]=ys(e,t);if(this.el=ge.createElement(u,o),z.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=z.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Yt)){const f=m[r++],h=i.getAttribute(c).split(L),E=/([.?@])?(.*)/.exec(f);l.push({type:1,index:n,name:E[2],strings:h,ctor:E[1]==="."?Ss:E[1]==="?"?ws:E[1]==="@"?Os:Ne}),i.removeAttribute(c)}else c.startsWith(L)&&(l.push({type:6,index:n}),i.removeAttribute(c));if(Jt.test(i.tagName)){const c=i.textContent.split(L),f=c.length-1;if(f>0){i.textContent=Ce?Ce.emptyScript:"";for(let h=0;h<f;h++)i.append(c[h],ve()),z.nextNode(),l.push({type:2,index:++n});i.append(c[f],ve())}}}else if(i.nodeType===8)if(i.data===Zt)l.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(L,c+1))!==-1;)l.push({type:7,index:n}),c+=L.length-1}n++}}static createElement(e,t){const o=V.createElement("template");return o.innerHTML=e,o}}function ne(s,e,t=s,o){var r,a;if(e===D)return e;let i=o!==void 0?(r=t._$Co)==null?void 0:r[o]:t._$Cl;const n=me(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=ne(s,i._$AS(s,e.values),i,o)),e}let As=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??V).importNode(t,!0);z.currentNode=i;let n=z.nextNode(),r=0,a=0,l=o[0];for(;l!==void 0;){if(r===l.index){let u;l.type===2?u=new ae(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new Cs(n,this,e)),this._$AV.push(u),l=o[++a]}r!==(l==null?void 0:l.index)&&(n=z.nextNode(),r++)}return z.currentNode=V,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}};class ae{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ne(this,e,t),me(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Es(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ge.createElement(Qt(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new As(i,this),a=r.u(this.options);r.p(t),this.T(a),this._$AH=r}}_$AC(e){let t=kt.get(e.strings);return t===void 0&&kt.set(e.strings,t=new ge(e)),t}k(e){Ct(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new ae(this.O(ve()),this.O(ve()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=v}_$AI(e,t=this,o,i){const n=this.strings;let r=!1;if(n===void 0)e=ne(this,e,t,0),r=!me(e)||e!==this._$AH&&e!==D,r&&(this._$AH=e);else{const a=e;let l,u;for(e=n[0],l=0;l<n.length-1;l++)u=ne(this,a[o+l],t,l),u===D&&(u=this._$AH[l]),r||(r=!me(u)||u!==this._$AH[l]),u===v?e=v:e!==v&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}r&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ss extends Ne{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class ws extends Ne{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class Os extends Ne{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=ne(this,e,t,0)??v)===D)return;const o=this._$AH,i=e===v&&o!==v||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==v&&(o===v||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Cs{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){ne(this,e)}}const xs={I:ae},Fe=fe.litHtmlPolyfillSupport;Fe==null||Fe(ge,ae),(fe.litHtmlVersions??(fe.litHtmlVersions=[])).push("3.2.1");const Ts=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new ae(e.insertBefore(ve(),n),n,void 0,t??{})}return i._$AI(s),i};let y=class extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ts(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return D}};var Kt;y._$litElement$=!0,y.finalized=!0,(Kt=globalThis.litElementHydrateSupport)==null||Kt.call(globalThis,{LitElement:y});const ke=globalThis.litElementPolyfillSupport;ke==null||ke({LitElement:y});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const x=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};const Ps={attribute:!0,type:String,converter:Oe,reflect:!1,hasChanged:Ot},Is=(s=Ps,e,t)=>{const{kind:o,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(t.name,s),o==="accessor"){const{name:r}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(r,l,s)},init(a){return a!==void 0&&this.P(r,void 0,s),a}}}if(o==="setter"){const{name:r}=t;return function(a){const l=this[r];e.call(this,a),this.requestUpdate(r,l,s)}}throw Error("Unsupported decorator location: "+o)};function d(s){return(e,t)=>typeof t=="object"?Is(s,e,t):((o,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,r?{...o,wrapped:!0}:o),r?Object.getOwnPropertyDescriptor(i,n):void 0})(s,e,t)}function S(s){return d({...s,state:!0,attribute:!1})}const Ns=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);function le(s,e){return(t,o,i)=>{const n=r=>{var a;return((a=r.renderRoot)==null?void 0:a.querySelector(s))??null};return Ns(t,o,{get(){return n(this)}})}}const j=C`
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
`;var g;(function(s){s.OPEN="open",s.CLOSE_BUTTON="closeButton",s.CLOSE_ON_OUTSIDE_CLICK="closeOnOutsideClick",s.CLOSE_ON_ESC="closeOnEsc"})(g||(g={}));const Ae={[g.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[g.CLOSE_BUTTON]:{default:!1,control:"boolean",description:"Whether to show the close button"},[g.CLOSE_ON_OUTSIDE_CLICK]:{default:!1,control:"boolean",description:"Whether to close the pop-up when clicking outside of it"},[g.CLOSE_ON_ESC]:{default:!1,control:"boolean",description:"Whether to close the pop-up when pressing the ESC key"}};const es={ATTRIBUTE:1,CHILD:2},ts=s=>(...e)=>({_$litDirective$:s,values:e});class ss{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Le=ts(class extends ss{constructor(s){var e;if(super(s),s.type!==es.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var o,i;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((o=this.nt)!=null&&o.has(n))&&this.st.add(n);return this.render(e)}const t=s.element.classList;for(const n of this.st)n in e||(t.remove(n),this.st.delete(n));for(const n in e){const r=!!e[n];r===this.st.has(n)||(i=this.nt)!=null&&i.has(n)||(r?(t.add(n),this.st.add(n)):(t.remove(n),this.st.delete(n)))}return D}}),Ls="pop-up-closed";class Be extends CustomEvent{constructor(e){super(Ls,{bubbles:!0,composed:!0,detail:e})}}var H=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Ke,Xe,Ye,Ze,Y;let P=(Y=class extends y{constructor(){super(...arguments),this[Ke]=Ae[g.OPEN].default,this[Xe]=Ae[g.CLOSE_BUTTON].default,this[Ye]=Ae[g.CLOSE_ON_OUTSIDE_CLICK].default,this[Ze]=Ae[g.CLOSE_ON_ESC].default,this.newlyOpened=!1,this._handleClickOutside=e=>{!this.newlyOpened&&this[g.CLOSE_ON_OUTSIDE_CLICK]&&this[g.OPEN]&&!e.composedPath().includes(this.container)&&this.dispatchEvent(new Be({}))},this._handleKeyDown=e=>{this[g.CLOSE_ON_ESC]&&e.key==="Escape"&&this.dispatchEvent(new Be({}))}}get classes(){return{"pop-up":!0,open:this.open}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._handleKeyDown),document.addEventListener("click",this._handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._handleKeyDown),document.removeEventListener("click",this._handleClickOutside)}updated(e){super.updated(e),e.has(g.OPEN)&&(this[g.OPEN]?(this.newlyOpened=!0,setTimeout(()=>{this.newlyOpened=!1},100)):this.newlyOpened=!1)}render(){return $`
      <div class=${Le(this.classes)} part="container">
        <div class="inner">
          ${this[g.CLOSE_BUTTON]?$`
                <div
                  class="close-button"
                  @click=${()=>{this.dispatchEvent(new Be({}))}}
                >
                  &#215;
                </div>
              `:v}
          <slot></slot>
        </div>
      </div>
    `}},Ke=g.OPEN,Xe=g.CLOSE_BUTTON,Ye=g.CLOSE_ON_OUTSIDE_CLICK,Ze=g.CLOSE_ON_ESC,Y.styles=[j,C`
      :host {
        display: block;
      }

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
    `],Y);H([d({type:Boolean})],P.prototype,Ke,void 0);H([d({type:Boolean})],P.prototype,Xe,void 0);H([d({type:Boolean})],P.prototype,Ye,void 0);H([d({type:Boolean})],P.prototype,Ze,void 0);H([S()],P.prototype,"newlyOpened",void 0);H([le(".pop-up")],P.prototype,"container",void 0);H([S()],P.prototype,"classes",null);P=H([x("pop-up")],P);const ze=s=>s??v;var xe;(function(s){s.TEXT="text",s.DATE="date",s.DATETIME_LOCAL="datetime-local",s.PASSWORD="password",s.NUMBER="number"})(xe||(xe={}));const Us="input-submitted";class Rs extends CustomEvent{constructor(e){super(Us,{bubbles:!0,composed:!0,detail:e})}}const Ds="input-changed";class Ge extends CustomEvent{constructor(e){super(Ds,{bubbles:!0,composed:!0,detail:e})}}const{I:Ms}=xs,Bt=()=>document.createComment(""),ue=(s,e,t)=>{var n;const o=s._$AA.parentNode,i=e===void 0?s._$AB:e._$AA;if(t===void 0){const r=o.insertBefore(Bt(),i),a=o.insertBefore(Bt(),i);t=new Ms(r,a,s,s.options)}else{const r=t._$AB.nextSibling,a=t._$AM,l=a!==s;if(l){let u;(n=t._$AQ)==null||n.call(t,s),t._$AM=s,t._$AP!==void 0&&(u=s._$AU)!==a._$AU&&t._$AP(u)}if(r!==i||l){let u=t._$AA;for(;u!==r;){const m=u.nextSibling;o.insertBefore(u,i),u=m}}}return t},B=(s,e,t=s)=>(s._$AI(e,t),s),js={},Hs=(s,e=js)=>s._$AH=e,Fs=s=>s._$AH,Ve=s=>{var o;(o=s._$AP)==null||o.call(s,!1,!0);let e=s._$AA;const t=s._$AB.nextSibling;for(;e!==t;){const i=e.nextSibling;e.remove(),e=i}};const zt=(s,e,t)=>{const o=new Map;for(let i=e;i<=t;i++)o.set(s[i],i);return o},xt=ts(class extends ss{constructor(s){if(super(s),s.type!==es.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const i=[],n=[];let r=0;for(const a of s)i[r]=o?o(a,r):r,n[r]=t(a,r),r++;return{values:n,keys:i}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,o]){const i=Fs(s),{values:n,keys:r}=this.dt(e,t,o);if(!Array.isArray(i))return this.ut=r,n;const a=this.ut??(this.ut=[]),l=[];let u,m,c=0,f=i.length-1,h=0,E=n.length-1;for(;c<=f&&h<=E;)if(i[c]===null)c++;else if(i[f]===null)f--;else if(a[c]===r[h])l[h]=B(i[c],n[h]),c++,h++;else if(a[f]===r[E])l[E]=B(i[f],n[E]),f--,E--;else if(a[c]===r[E])l[E]=B(i[c],n[E]),ue(s,l[E+1],i[c]),c++,E--;else if(a[f]===r[h])l[h]=B(i[f],n[h]),ue(s,i[c],i[f]),f--,h++;else if(u===void 0&&(u=zt(r,h,E),m=zt(a,c,f)),u.has(a[c]))if(u.has(a[f])){const T=m.get(r[h]),Me=T!==void 0?i[T]:null;if(Me===null){const It=ue(s,i[c]);B(It,n[h]),l[h]=It}else l[h]=B(Me,n[h]),ue(s,i[c],Me),i[T]=null;h++}else Ve(i[f]),f--;else Ve(i[c]),c++;for(;h<=E;){const T=ue(s,l[E+1]);B(T,n[h]),l[h++]=T}for(;c<=f;){const T=i[c++];T!==null&&Ve(T)}return this.ut=r,Hs(s,l),D}}),ks="suggestion-submitted";class Bs extends CustomEvent{constructor(e){super(ks,{bubbles:!0,composed:!0,detail:e})}}const zs="suggestion-changed";class Gs extends CustomEvent{constructor(e){super(zs,{bubbles:!0,composed:!0,detail:e})}}var K=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Z;let M=(Z=class extends y{constructor(){super(...arguments),this.input="",this.maxMatches=5,this.minInput=1,this.suggestions=[],this.selectedIndex=-1}get show(){return this.suggestions.length>0&&this.input.length>=this.minInput}get maxSelectedIndex(){return this.suggestions.length-1}connectedCallback(){super.connectedCallback(),this.addEventListener("select-up",()=>{this._adjustSelectedIndex(-1)}),this.addEventListener("select-down",()=>{this._adjustSelectedIndex(1)}),this.addEventListener("select",()=>{this.suggestions.length&&this.selectedIndex!==-1?this._sendSelectedEvent(this.suggestions[this.selectedIndex]):this._sendSubmitEvent()})}_adjustSelectedIndex(e){let t=this.selectedIndex+e;t<-1&&(t=this.maxSelectedIndex),t>this.maxSelectedIndex&&(t=-1),this.selectedIndex=t}_sendSelectedEvent(e){this.dispatchEvent(new Gs({value:e}))}_sendSubmitEvent(){this.dispatchEvent(new Bs({selectedIndex:this.selectedIndex}))}render(){return $`
      <div>
        ${this.show?$` <ul class="box">
              ${xt(this.suggestions,e=>e,(e,t)=>$`
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
    `}},Z.styles=[j,C`
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
    `],Z);K([d()],M.prototype,"input",void 0);K([d({type:Number})],M.prototype,"maxMatches",void 0);K([d({type:Number})],M.prototype,"minInput",void 0);K([d({type:Array})],M.prototype,"suggestions",void 0);K([S()],M.prototype,"selectedIndex",void 0);K([S()],M.prototype,"show",null);M=K([x("ss-input-auto")],M);var p;(function(s){s.TYPE="type",s.VALUE="value",s.AUTO_COMPLETE="autoComplete",s.PLACEHOLDER="placeholder",s.SUGGESTIONS="suggestions",s.MIN="min",s.MAX="max",s.STEP="step"})(p||(p={}));const N={[p.TYPE]:{default:xe.TEXT,description:"What form element type the input behaves as",control:"text"},[p.VALUE]:{default:"",description:"The value as set from the data model",control:"text"},[p.AUTO_COMPLETE]:{default:!1,description:"Should the field provide auto-completion suggestions",control:"boolean"},[p.PLACEHOLDER]:{default:"",description:"Text to display in the field when no value is present",control:"text"},[p.SUGGESTIONS]:{default:[],description:"An array of suggestions used for auto-completion",control:"text"},[p.MIN]:{default:0,description:"The minimum value for a number input",control:"number"},[p.MAX]:{default:100,description:"The maximum value for a number input",control:"number"},[p.STEP]:{default:1,description:"The step value for a number input",control:"number"}};var A=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},Je,Qe,et,tt,st,is,os,ns,J;let b=(J=class extends y{constructor(){super(...arguments),this.clickFocusHandler=e=>{},this[Je]=N[p.TYPE].default,this[Qe]=N[p.VALUE].default,this[et]=N[p.AUTO_COMPLETE].default,this[tt]=N[p.PLACEHOLDER].default,this[st]=N[p.SUGGESTIONS].default,this._value=this.value,this.hasFocus=!1,this.autoDismissed=!1,this._handleChange=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this._value=t,e.target instanceof HTMLInputElement&&(e.target.value=this._value),e.preventDefault(),!1},this._handleKeyDown=e=>{if(e.target instanceof HTMLInputElement)switch(e.code){case"Tab":this.autoDismissed=!0;return;case"ArrowUp":this._sendSuggestionUpEvent(),e.preventDefault();return;case"ArrowDown":this._sendSuggestionDownEvent(),e.preventDefault();return;case"Enter":this.showAutoComplete?this._sendSuggestionSelectEvent():this._sendSubmittedEvent(),e.preventDefault();return}},this._handleInput=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this.dispatchEvent(new Ge({value:t})),this._value=t,this.autoDismissed=!1,!0},this._handleFocus=e=>{this.hasFocus=!0,this.autoDismissed=!1},this._handleBlur=e=>{setTimeout(()=>{this.hasFocus=!1},200)},this._suggestionSelectHandler=e=>{this.autoDismissed=!0,this.inputField.value=e.detail.value,this.inputField.dispatchEvent(new Ge({value:e.detail.value}))}}get showAutoComplete(){return this.autoComplete&&!this.autoDismissed&&this.value.length>0}connectedCallback(){super.connectedCallback(),this.clickFocusHandler=e=>{e.composedPath().includes(this.container)||(this.autoDismissed=!0),this.type===xe.NUMBER&&(this.min=N[p.MIN].default,this.max=N[p.MAX].default,this.step=N[p.STEP].default)},window.addEventListener("mousedown",this.clickFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousedown",this.clickFocusHandler)}updated(e){super.updated(e),e.has("value")&&(this.inputField.value=this.value)}focus(){this.inputField.focus()}clear(){this.inputField.value="",this.dispatchEvent(new Ge({value:""}))}_sendSuggestionUpEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-up"))}_sendSuggestionDownEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select-down"))}_sendSuggestionSelectEvent(){this.autoCompleteNode.dispatchEvent(new CustomEvent("select"))}_sendSubmittedEvent(){this.inputField.dispatchEvent(new Rs({value:this._value}))}_handleSubmit(){this._sendSubmittedEvent()}render(){return $`
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
          min=${ze(this.min)}
          max=${ze(this.max)}
          step=${ze(this.step)}
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
    `}},Je=p.TYPE,Qe=p.VALUE,et=p.AUTO_COMPLETE,tt=p.PLACEHOLDER,st=p.SUGGESTIONS,is=p.MIN,os=p.MAX,ns=p.STEP,J.styles=[j,C`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `],J);A([d()],b.prototype,Je,void 0);A([d()],b.prototype,Qe,void 0);A([d({type:Boolean})],b.prototype,et,void 0);A([d()],b.prototype,tt,void 0);A([d({type:Array})],b.prototype,st,void 0);A([d({type:Number,reflect:!0})],b.prototype,is,void 0);A([d({type:Number,reflect:!0})],b.prototype,os,void 0);A([d({type:Number,reflect:!0})],b.prototype,ns,void 0);A([S()],b.prototype,"_value",void 0);A([le("#input-field")],b.prototype,"inputField",void 0);A([le("ss-input-auto")],b.prototype,"autoCompleteNode",void 0);A([le("span")],b.prototype,"container",void 0);A([S()],b.prototype,"hasFocus",void 0);A([S()],b.prototype,"autoDismissed",void 0);A([S()],b.prototype,"showAutoComplete",null);b=A([x("ss-input")],b);var _e;(function(s){s.PADDED="padded"})(_e||(_e={}));const Vs={[_e.PADDED]:{default:!1,description:"Whether to provide padding around the loader",control:"boolean"}};var Tt=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},it,Q;let Te=(Q=class extends y{constructor(){super(...arguments),this[it]=Vs[_e.PADDED].default}get classes(){return{container:!0,padded:this.padded}}render(){return $`<div class=${Le(this.classes)}>
      <span class="loader"></span>
    </div>`}},it=_e.PADDED,Q.styles=C`
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
  `,Q);Tt([d({type:Boolean})],Te.prototype,it,void 0);Tt([S()],Te.prototype,"classes",null);Te=Tt([x("ss-loader")],Te);var w;(function(s){s.TEXT="text",s.DISABLED="disabled",s.LOADING="loading",s.POSITIVE="positive",s.NEGATIVE="negative",s.CLASS="class"})(w||(w={}));w.TEXT+"",w.DISABLED+"",w.LOADING+"",w.POSITIVE+"",w.NEGATIVE+"",w.CLASS+"";var F=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},ot,nt,rt,at,lt,ct,ee;let I=(ee=class extends y{constructor(){super(...arguments),this[ot]="",this[nt]=!1,this[rt]=!1,this[at]=!1,this[lt]=!1,this[ct]="",this._handleClick=e=>{this.dispatchEvent(new CustomEvent("ss-button-clicked",{bubbles:!0,composed:!0}))}}get classes(){const e={loading:this.loading,disabled:this.disabled,positive:this.positive,negative:this.negative};return this.class.split(" ").forEach(t=>{e[t]=!0}),e}render(){return $`
      <button
        class=${Le(this.classes)}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
      >
        ${this.loading?$` <ss-loader></ss-loader> `:this.text?this.text:$`<slot></slot>`}
      </button>
    `}},ot=w.TEXT,nt=w.DISABLED,rt=w.LOADING,at=w.POSITIVE,lt=w.NEGATIVE,ct=w.CLASS,ee.styles=[j,C`
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
    `],ee);F([d()],I.prototype,ot,void 0);F([d({type:Boolean})],I.prototype,nt,void 0);F([d({type:Boolean})],I.prototype,rt,void 0);F([d({type:Boolean})],I.prototype,at,void 0);F([d({type:Boolean})],I.prototype,lt,void 0);F([d()],I.prototype,ct,void 0);F([S()],I.prototype,"classes",null);I=F([x("ss-button")],I);var Ws=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};let Gt=class extends y{render(){return $`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </svg>
    `}};Gt=Ws([x("svg-profile")],Gt);var Pe;(function(s){s.PROFILE="profile"})(Pe||(Pe={}));var O;(function(s){s.NAME="name",s.SIZE="size",s.COLOR="color"})(O||(O={}));const We={[O.NAME]:{default:Pe.PROFILE,description:"The name of the icon to display",control:"text"},[O.SIZE]:{default:24,description:"The size of the icon in pixels",control:"number"},[O.COLOR]:{default:"#000",description:"The color of the icon",control:"text"}};Pe.PROFILE+"";var Ue=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},dt,ut,ht,te;let $e=(te=class extends y{constructor(){super(...arguments),this[dt]=We[O.NAME].default,this[ut]=We[O.COLOR].default,this[ht]=We[O.SIZE].default}render(){return $`
      <span
        class="icon"
        style="--color: ${this[O.COLOR]}; --size: ${this[O.SIZE]}px;"
      >
        <svg-profile></svg-profile>
      </span>
    `}},dt=O.NAME,ut=O.COLOR,ht=O.SIZE,te.styles=[j,C`
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
    `],te);Ue([d()],$e.prototype,dt,void 0);Ue([d()],$e.prototype,ut,void 0);Ue([d({type:Number})],$e.prototype,ht,void 0);$e=Ue([x("ss-icon")],$e);var G;(function(s){s.MESSAGE_LIFE="messageLife"})(G||(G={}));const qs={[G.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"}};var Ee;(function(s){s.INFO="info",s.SUCCESS="success",s.WARNING="warning",s.ERROR="error"})(Ee||(Ee={}));var _;(function(s){s.NOTIFICATION_ID="notificationId",s.MESSAGE="message",s.TYPE="type",s.START_TIME="startTime",s.MESSAGE_LIFE="messageLife"})(_||(_={}));const he={[_.NOTIFICATION_ID]:{default:0,control:"number",description:"The id of the notification"},[_.MESSAGE]:{default:"",control:"text",description:"The message to display"},[_.TYPE]:{default:Ee.INFO,control:"text",description:"The type of message to display"},[_.START_TIME]:{default:new Date().getTime(),control:"number",description:"The time the message was created"},[_.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"}},Ks="notification-clicked";class Xs extends CustomEvent{constructor(e){super(Ks,{bubbles:!0,composed:!0,detail:e})}}var ce=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},pt,ft,vt,mt,gt,se;let W=(se=class extends y{constructor(){super(...arguments),this[pt]=he[_.NOTIFICATION_ID].default,this[ft]=he[_.MESSAGE].default,this[vt]=he[_.TYPE].default,this[mt]=he[_.START_TIME].default,this[gt]=he[_.MESSAGE_LIFE].default}get classes(){return{"notification-message":!0,[this[_.TYPE]]:!0}}render(){return $`
      <div
        @click=${()=>this.dispatchEvent(new Xs({id:this.notificationId}))}
        class=${Le(this.classes)}
        style=${`--message-life: ${this[_.MESSAGE_LIFE]}ms`}
      >
        <div class="time-indicator"></div>
        <div class="content">
          ${this[_.MESSAGE]}
          <slot></slot>
        </div>
      </div>
    `}},pt=_.NOTIFICATION_ID,ft=_.MESSAGE,vt=_.TYPE,mt=_.START_TIME,gt=_.MESSAGE_LIFE,se.styles=[j,C`
      .notification-message {
        position: relative;
        background-color: var(--color, #ddd);
        color: #333;
        text-align: center;
        padding: 0.25rem;
        animation: fade-out var(--message-life, 1000ms) linear forwards;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

        &.success {
          background-color: var(--color-success, #4caf50);
          color: #fff;
        }

        &.error {
          background-color: var(--color-error, #f44336);
          color: #fff;
        }

        &.info {
          background-color: var(--color-info, #2196f3);
          color: #fff;
        }

        .time-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.125),
            rgba(255, 255, 255, 0.25)
          );
          animation: time-elapsed var(--message-life, 1000ms) linear forwards;
        }

        .content {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 2;
        }
      }

      @keyframes time-elapsed {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `],se);ce([d({type:Number})],W.prototype,pt,void 0);ce([d()],W.prototype,ft,void 0);ce([d()],W.prototype,vt,void 0);ce([d({type:Number})],W.prototype,mt,void 0);ce([d({type:Number,reflect:!0})],W.prototype,gt,void 0);W=ce([x("notification-message")],W);var Pt=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},_t,ie;let Ie=(ie=class extends y{constructor(){super(...arguments),this.notificationId=0,this.notifications=[],this[_t]=qs[G.MESSAGE_LIFE].default}addNotification(e,t){const o=this.notificationId++,i={id:o,message:e,type:t,startTime:new Date,messageLife:this[G.MESSAGE_LIFE]};return this.notifications=[...this.notifications,i],setTimeout(()=>{this.removeNotification(o)},this[G.MESSAGE_LIFE]),o}removeNotification(e){this.notifications=this.notifications.filter(t=>t.id!==e)}render(){return $`
      <div class="notification-provider">
        ${xt(this.notifications,e=>e.id,e=>$` <notification-message
              @notification-clicked=${()=>this.removeNotification(e.id)}
              message=${e.message}
              type=${e.type}
              startTime=${e.startTime.getTime()}
              messageLife=${e.messageLife}
            ></notification-message>`)}
      </div>
    `}},_t=G.MESSAGE_LIFE,ie.styles=[j,C`
      .notification-provider {
        position: fixed;
        top: 0;
        left: 10vw;
        width: 80vw;
        z-index: 1000;
      }
    `],ie);Pt([S()],Ie.prototype,"notifications",void 0);Pt([d({type:Number,reflect:!0})],Ie.prototype,_t,void 0);Ie=Pt([x("notification-provider")],Ie);const Ys=s=>typeof s!="string"&&"strTag"in s,Zs=(s,e,t)=>{let o=s[0];for(let i=1;i<s.length;i++)o+=e[i-1],o+=s[i];return o};const Js=s=>Ys(s)?Zs(s.strings,s.values):s;let qe=Js;class Qs{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let s=0;s<256;s++)(s>>4&15).toString(16)+(s&15).toString(16);let ei=new Qs;ei.resolve();const ti="select-changed";class si extends CustomEvent{constructor(e){super(ti,{bubbles:!0,composed:!0,detail:e})}}var U;(function(s){s.OPTIONS="options",s.SELECTED="selected"})(U||(U={}));const Vt={[U.OPTIONS]:{default:[],description:"The options to display in the select",control:"text"},[U.SELECTED]:{default:"",description:"The value of the selected option",control:"text"}};var Re=function(s,e,t,o){var i=arguments.length,n=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,o);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(i<3?r(n):i>3?r(e,t,n):r(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n},$t,Et,oe;let be=(oe=class extends y{constructor(){super(...arguments),this[$t]=Vt[U.OPTIONS].default,this[Et]=Vt[U.SELECTED].default}get value(){return this.selectNode.value}_handleSelectChanged(){this.dispatchEvent(new si({value:this.selectNode.value}))}render(){return $`
      <select @change=${this._handleSelectChanged}>
        ${xt(this.options,e=>e.value,e=>$`
            <option
              value=${e.value}
              ?selected=${this.selected===e.value}
            >
              ${e.label}
            </option>
          `)}
      </select>
    `}},$t=U.OPTIONS,Et=U.SELECTED,oe.styles=[j],oe);Re([d({type:Array})],be.prototype,$t,void 0);Re([d()],be.prototype,Et,void 0);Re([le("select")],be.prototype,"selectNode",void 0);be=Re([x("ss-select")],be);const ii="user-logged-in";var rs=(s=>(s.USER_ID="userId",s.USERNAME="username",s.AUTH_TOKEN="authToken",s))(rs||{});class oi extends CustomEvent{constructor(e){super(ii,{bubbles:!0,composed:!0,detail:e})}}const ni="user-logged-in-failed";class ri extends CustomEvent{constructor(e){super(ni,{bubbles:!0,composed:!0,detail:e})}}const as=C`
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
`,ai=[202,204];class ls{constructor(e){this.config=e,this.authToken=e.authToken}async httpRequest(e,t){let o;const i=new Headers(t.headers);i.append("authorization",this.authToken);const n=new URL(e,this.config.baseUrl),r=new Request(n,{...t,headers:i});try{const a=await fetch(r);return a.ok&&!ai.includes(a.status)&&(o=await a.json()),a.status===403&&this.config.errorHandler(),{status:a.status,response:o}}catch(a){console.error(`Api encountered an error performing request: ${a}`)}return null}async get(e,t){return await this.httpRequest(e,{method:"get",...t})}async post(e,t,o){return await this.httpRequest(e,{method:"post",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async put(e,t,o){return await this.httpRequest(e,{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async delete(e,t){return await this.httpRequest(e,{method:"delete",...t})}setAuthToken(e){this.authToken=e}}const li=new ls({authToken:"",baseUrl:"http://localhost:9999/api/",errorHandler:()=>{console.error("Api encountered an error")}}),ci=new ls({authToken:"",baseUrl:"https://sikosoft2.azurewebsites.net/api/",errorHandler:()=>{console.error("Api encountered an error")}}),cs="dev";var we=(s=>(s.ENV="env",s))(we||{});const di={env:{default:cs,control:"text",description:"The environment to use for the API"}};var ui=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,ye=(s,e,t,o)=>{for(var i=o>1?void 0:o?hi(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&ui(e,t,i),i},bt,Wt;let q=class extends(Wt=y,bt=we.ENV,Wt){constructor(){super(...arguments),this[bt]=di[we.ENV].default,this.username="",this.password="",this.loading=!1}get api(){return this[we.ENV]==="prod"?ci:li}_handleUsernameChanged(s){this.username=s.detail.value}_handleUsernameSubmitted(s){this._login()}_handlePasswordChanged(s){this.password=s.detail.value}_handlePasswordSubmitted(s){this._login()}async _login(){this.loading=!0;const s=await this.api.post("login",{username:this.username,password:this.password});s&&s.status!==401&&this.dispatchEvent(new oi({...s.response})),s&&s.status===401&&this.dispatchEvent(new ri({})),this.loading=!1}render(){return $`
      <form part="container">
        <ss-input
          id="username"
          placeholder=${qe("Username")}
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${qe("Password")}
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this._login}
          text=${qe("Login")}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `}};q.styles=[as,C`
      form {
        ss-input,
        ss-button {
          display: block;
          margin: 0.5rem 0;
        }
      }
    `];ye([d()],q.prototype,bt,2);ye([S()],q.prototype,"username",2);ye([S()],q.prototype,"password",2);ye([S()],q.prototype,"loading",2);q=ye([x("login-form")],q);var yt=(s=>(s.ENV="env",s))(yt||{});const pi={env:{default:cs,control:"text",description:"The environment to use for the API"}},fi=[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossorigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"}];var vi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,De=(s,e,t,o)=>{for(var i=o>1?void 0:o?mi(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(o?r(e,t,i):r(i))||i);return o&&i&&vi(e,t,i),i},At,qt;let re=class extends(qt=y,At=yt.ENV,qt){constructor(){super(),this[At]=pi[yt.ENV].default,this.popUpIsOpen=!1,this._injectGoogleFonts()}showLoginForm(){this.popUpIsOpen=!0}hideLoginForm(){this.popUpIsOpen=!1}_notify(s,e){this.notificationProvider&&this.notificationProvider.addNotification(s,e)}async _handleUserLoggedIn(s){Object.values(rs).forEach(e=>{sessionStorage.setItem(e,s.detail[e])}),this.hideLoginForm(),this._notify("You are now logged in",Ee.SUCCESS)}async _handleUserLoggedInFailed(s){this._notify("Failed to log in",Ee.ERROR)}_togglePopUp(){this.popUpIsOpen=!this.popUpIsOpen}_injectGoogleFonts(){fi.forEach(s=>{const e=document.createElement("link");e.rel=s.rel,e.href=s.href,s.crossorigin&&(e.crossOrigin=s.crossorigin),document.head.appendChild(e)})}render(){return $`
      <div class="user-portal">
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
            @user-logged-in-failed=${this._handleUserLoggedInFailed}
          ></login-form>
        </pop-up>
        ${!1}
      </div>
    `}};re.styles=[as,C`
      ss-icon {
        vertical-align: middle;
      }
    `];De([d()],re.prototype,At,2);De([S()],re.prototype,"popUpIsOpen",2);De([le("notification-provider")],re.prototype,"notificationProvider",2);re=De([x("user-portal")],re);
