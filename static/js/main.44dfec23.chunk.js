(this["webpackJsonpfe-2"]=this["webpackJsonpfe-2"]||[]).push([[0],{41:function(e,t,n){e.exports=n(68)},68:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(33),o=n.n(i),c=n(12),l=n(2),u=n(78),s=n(1),f=n(19),d=function(){return{"-webkit-tap-highlight-color":"transparent"}},m=function(e){var t=e.to,n=e.className,i=void 0===n?"":n,o=(e.isActive,Object(a.useContext)(ie)),c=Object(s.f)(),l=Object(u.a)().css;var m={to:t,onClick:function(e){e.preventDefault(),o(!1),setTimeout((function(){c(t),o(!0)}),350)},className:"".concat(l(d)," ").concat(i)};return r.a.createElement(f.b,m,e.children)};var b=function(e){var t=e.to,n=e.className;return r.a.createElement(m,{to:t,className:n,NavLink:!0,isActive:function(e,t){console.log(e,t)}},e.children)},v=function(){return{fontFamily:"test",padding:"10px",position:"sticky",top:0}},p=function(){return{}},h=function(){return{":before":{content:'", "'}}},g=function(){return{display:"flex",flexDirection:"row"}};var O=function(e){var t=Object(a.useRef)(),n=e.setNavHeight,i=e.filterRoutes,o=Object(u.a)().css,c=Object(s.e)();function l(){var e=t.current.getBoundingClientRect().height;console.log(e),n(e+20)}return Object(a.useEffect)((function(){l()}),[c]),Object(a.useEffect)((function(){return l(),window.addEventListener("resize",l),function(){window.removeEventListener("resize",l)}}),[]),r.a.createElement("nav",{className:o(v)},r.a.createElement("ul",null,r.a.createElement("li",{ref:t,className:o(p)},r.a.createElement("ul",{className:o(g)},r.a.createElement("li",null,r.a.createElement(b,{to:"/"},"no design foundry")),("/"===c.pathname||"/about"===c.pathname)&&r.a.createElement("li",null,r.a.createElement(b,{to:"/about",className:o(h)},"about")))),"/"!==c.pathname&&i.map((function(e,t){return r.a.createElement("li",{key:"nav_".concat(t)},r.a.createElement("ul",{className:o(g)},r.a.createElement("li",{className:o(p)},r.a.createElement(b,{to:e.route},e.title)),c.pathname.startsWith(e.route)&&r.a.createElement("li",null,r.a.createElement(b,{to:"".concat(e.route,"/about"),className:o(h)},"about"))))}))))},j=[{type:"filterListView",route:"/"},{type:"filterDetailView",title:"Rotorizer",filterIdentifier:"rotorizer",route:"/rotorizer",numberOfLayers:2,layerColors:["gray","#000"],variableFontControlSliders:[{label:"rotation",tag:"RTTX",min:0,max:360,default:0}],inputs:[{type:"range",label:"depth",name:"depth",min:2,max:600,default:20}]},{type:"filterDetailView",title:"Rastr",filterIdentifier:"rasterizer",route:"/rasterizer",numberOfLayers:1,layerColors:["#000"],inputs:[{type:"range",label:"resolution",name:"resolution",min:10,max:150,default:20}]}],E=n(37),y=function(e){return function(){return{gridColumn:e}}},w=function(e){e.fileIsDragged;return{position:"fixed",fontSize:"4em",top:0,backgroundColor:"#fff",opacity:1,left:0,right:0,bottom:0}},x=function(){return{position:"absolute"}};var S=function(e){var t,n=e.label,i=Object(a.useRef)(),o=Object(a.useRef)(),c=Object(a.useState)({}),s=Object(l.a)(c,2),f=s[0],d=s[1],m=Object(a.useContext)(ne),b=m.inputFont,v=m.setInputFont,p=Object(a.useState)(!1),h=Object(l.a)(p,2),g=h[0],O=h[1],j=Object(u.a)({fileIsDragged:g}).css;function E(e){var t;e.preventDefault(),e.stopPropagation(),1===(null===(t=e.dataTransfer)||void 0===t?void 0:t.files.length)&&(v(e.dataTransfer.files[0]),o.current=null),O(!1)}function S(e){o.current="entered",e.preventDefault(),e.stopPropagation(),O(!0)}function C(e){"moving"===o.current&&(e.preventDefault(),e.stopPropagation(),O(!1),o.current="left")}function N(e){var t=e.clientX,n=e.clientY;d({left:t,top:n}),e.preventDefault(),e.stopPropagation()}return Object(a.useEffect)((function(){g?(document.body.querySelector("#root").style.pointerEvents="none",o.current="moving"):document.body.querySelector("#root").style.removeProperty("pointer-events")}),[g]),Object(a.useEffect)((function(){return document.body.addEventListener("dragenter",S),document.body.addEventListener("dragleave",C),document.body.addEventListener("dragover",N),document.body.addEventListener("drop",E),function(){document.body.removeEventListener("dragleave",C),document.body.removeEventListener("dragenter",S),document.body.removeEventListener("dragover",N),document.body.removeEventListener("drop",E)}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:j(y(1))},n),r.a.createElement("input",{ref:i,type:"file",onChange:function(e){1===e.target.files.length&&v(e.target.files[0])},style:{display:"none"},accept:".ttf,.otf,woff,woff2"}),r.a.createElement("button",{className:j(y(3)),onClick:function(e){i.current.click()}},null!==(t=null===b||void 0===b?void 0:b.name)&&void 0!==t?t:"select file or drop it"),g&&r.a.createElement("div",{className:j(w)},r.a.createElement("span",{className:j(x),style:f},"Drop it")))},C=function(){return{fontVariantNumeric:"tabular-nums",padding:"0 .2em"}},N=function(){return{height:"100%",display:"flex",flexDirection:"column"}},F=function(){return{visibility:"hidden"}},k=function(){return{"::-webkit-slider-thumb, ::-moz-range-thumb, ::-ms-thumb":{appearance:"none","-webkit-appearance":"none",width:"20px",height:"20px"}}};var z=function(e){var t=e.label,n=e.name,i=e.min,o=e.max,c=(e.tag,e.defaultValue),s=e.onChange,f=e.animatable,d=void 0!==f&&f,m=e.disabled,b=void 0!==m&&m,v=Object(a.useRef)(),p=Object(a.useRef)(),h=Object(a.useState)(),g=Object(l.a)(h,2),O=g[0],j=g[1],E=Object(a.useContext)(B).filterIdentifier,w=Object(a.useContext)(te),x=w.formInputValues,S=w.setFormInputValue,z=Object(a.useState)(x[E][n]),I=Object(l.a)(z,2),V=I[0],L=I[1],D=Object(u.a)({animating:O}).css;return Object(a.useEffect)((function(){v.current.value=V||c,V||L(c)}),[]),Object(a.useEffect)((function(){v.current.value!==V&&(v.current.value=V,s&&s(V))}),[V]),r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:D(y(1))},t),d&&r.a.createElement("button",{className:D(N,y(2)),onClick:function(){if(!0===O)clearInterval(p.current);else{var e=0,t=V;p.current=setInterval((function(){var n=(t+e)%720,a=Math.round(n-360<0?n:360-n%360);L(a);var r=10-(Math.cos(Math.PI*n/180)+1)/2*9;e+=r}),1e3/30)}j(!O)}},r.a.createElement("span",null,O?"stop":"play"),r.a.createElement("span",{className:D(F),"aria-label":"hidden"},"play"),r.a.createElement("span",{className:D(F),"aria-label":"hidden"},"stop")),r.a.createElement("input",{ref:v,className:D(k,y(3)),type:"range",onChange:function(e){if(v.current.checkValidity()){var t=parseInt(e.target.value);L(t),n&&S(E,n,t)}},min:i,max:o,disabled:b}),r.a.createElement("div",{className:D(C),disabled:b},V))},I=function(){return{background:"transparent",outline:"none",border:"none"}};var V=function(e){var t=e.label,n=e.defaultValue,i=e.onChange,o=e.disabled,c=Object(a.useRef)(),l=Object(u.a)().css;return Object(a.useEffect)((function(){n&&(c.current.value=n)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:l(y(1))},t),r.a.createElement("input",{ref:c,className:l(I,y(3)),type:"text",onChange:function(){c.current.checkValidity()&&i&&i(c.current.value)},disabled:o}))},L=function(e){var t=e.previewedFontFamily,n=e.visible,a=e.color;return{userSelect:"none",transitionDuration:"".concat(350,"ms"),transitionProperty:"opacity, filter",transitionTimingFunction:"ease-in",extend:[{condition:t,style:{fontFamily:t}},{condition:a,style:{color:a}},{condition:!n,style:{opacity:0,filter:"blur(.025em)"}}]}},D=function(){return{whiteSpace:"nowrap",transform:"translateZ(0)"}},P=function(e){return{zIndex:-1,userSelect:"none",pointerEvents:"none",position:"absolute",top:0,left:0,width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",flexGrow:1,extend:[{condition:e.inListView,style:{alignItems:"flex-start",height:"100%"}}]}};var R=function(e){var t=e.fontSize,n=e.inListView,i=void 0!==n&&n,o=e.fontFamily,c=e.fontVariations,s=void 0===c?{}:c,f=e.color,d=e.onMount,m=Object(a.useRef)(!1),b=Object(a.useRef)(),v=Object(a.useState)(!0),p=Object(l.a)(v,2),h=p[0],g=p[1],O=Object(a.useState)(o),j=Object(l.a)(O,2),E=j[0],y=j[1],w=Object(a.useState)(e.children),x=Object(l.a)(w,2),S=x[0],C=x[1];Object(a.useEffect)((function(){!m.current&&d&&(d(b.current.offsetWidth),m.current=!0)}),[t,d]),Object(a.useEffect)((function(){o!==E&&(g(!1),setTimeout((function(){y(o),C(e.children),g(!0)}),400))}),[o]);var N=Object(u.a)({visible:h,inListView:i,previewedFontFamily:E,color:f}).css;return r.a.createElement("div",{className:N(P),style:{fontSize:"".concat(t,"px")}},r.a.createElement("div",null,r.a.createElement("div",{className:N(L)},r.a.createElement("span",{ref:b,className:N(D),style:{fontVariationSettings:Object.keys(s).map((function(e){return'"'.concat(e,'" ').concat(s[e])})).join(", ")}},S))))},T=n(20),H=n.n(T);var A,_=function(e){var t=e.content;return r.a.createElement("ul",null,t.map((function(e,t){return r.a.createElement("li",{key:t},e)})))},B=Object(a.createContext)(),W=function(){return{marginTop:"auto"}},M=function(){return{pointerEvents:"all",display:"grid",gridTemplateColumns:["min-content min-content auto 3ch","repeat(4, min-content) 3ch"],width:["100%","auto"],gap:"0px 6px",gridAutoRows:"1.2em",whiteSpace:"nowrap",alignItems:"center",bottom:0,left:0}},X=function(e){e.navHeight;return{minHeight:"100vh",top:0,position:"absolute",width:"100%",display:"flex",flexDirection:"column",padding:"10px",pointerEvents:"none"}},Z=function(){return{display:"flex",alignItems:"flex-end",flexDirection:"row"}},q=function(e){return{display:"block",animationName:{"0%":{paddingBottom:".5em"},"40%":{paddingBottom:"0"},"100%":{paddingBottom:"0"}},animationDuration:"1s",animationIterationCount:"infinite",animationDirection:"alternate-reverse",animationPlayState:e.isProcessing?"processing":"paused"}},J=H.a.CancelToken;var Y=function(e){var t,n=e.inputs,i=e.variableFontControlSliders,o=e.filterIdentifier,c=e.navHeight,s=Object(a.useContext)(oe),f=s.previewedInputFont,d=s.setPreviewedInputFont,m=Object(a.useState)([]),b=Object(l.a)(m,2),v=b[0],p=b[1],h=Object(a.useContext)(ce).setPreviewedOutputFonts,g=Object(a.useContext)(te).formInputValues,O=Object(a.useContext)(re),j=O.fontSize,w=O.setFontSize,x=Object(a.useContext)(ne).inputFont,C=Object(a.useRef)(!1),N=Object(a.useRef)(200),F=Object(a.useRef)(void 0),k=Object(a.useContext)(ae),I=k.previewStrings,L=k.setPreviewString,D=Object(a.useState)(I[o]),P=Object(l.a)(D,2),T=P[0],Y=P[1],G=Object(a.useState)(!1),U=Object(l.a)(G,2),K=U[0],Q=U[1],$=Object(a.useState)(!1),ee=Object(l.a)($,2),ie=ee[0],ue=ee[1],se=Object(a.useContext)(le),fe=se.fontVariations,de=se.setFontVariations,me=Object(u.a)({navHeight:c,isProcessing:ie}).css;return Object(a.useEffect)((function(){if(C.current&&x){var e=Date.now();A=e,setTimeout((function(){e===A&&(L(o,T),function(){var e=new FormData;e.append("font_file",x),e.append("preview_string",T),Object.keys(g[o]).forEach((function(t){return e.append(t,g[o][t])})),ue(!0),H()({method:"post",cancelToken:new J((function(e){F.current=e})),url:"http://0.0.0.0:5000/filters/".concat(o),data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){p(e.data.warnings);var t=e.data.fonts.map((function(e){return Uint8Array.from(atob(e),(function(e){return e.charCodeAt(0)}))}));return Promise.all([x.arrayBuffer(),t])})).then((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return[new FontFace("preview-input-font-".concat(Date.now()),n),a.map((function(e,t){return new FontFace("preview-output-font-".concat(Date.now(),"-").concat(t),e)}))]})).then((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];return document.fonts.add(n),a.map((function(e){return document.fonts.add(e)})),[n,a]})).then((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1];d(n.family),h(o,a.map((function(e){return e.family})))})).catch((function(e){var t,n,a;t=null===e||void 0===e||null===(n=e.response)||void 0===n||null===(a=n.data)||void 0===a?void 0:a.detail;H.a.isCancel(e)?console.log(e.message):console.log(e)})).finally((function(){ue(!1)}))}())}),500)}}),[g,x,T,o]),Object(a.useEffect)((function(){return C.current=!0,function(){C.current=!1,Q(!1),void 0!==F.current&&(ue(!1),F.current("cancelled by user"),F.current=void 0)}}),[]),r.a.createElement(B.Provider,{value:{filterIdentifier:o}},r.a.createElement("div",{className:me(X)},r.a.createElement(R,{fontFamily:f,fontSize:j,onMount:function(e){var t=document.body.clientWidth-20;if(e>t){var n=j*(t/e);n<N.current&&(N.current=n)}}},I[o]),r.a.createElement("div",{className:me(W)},ie&&r.a.createElement("div",{className:me(Z)},Object(E.a)("loading...........").map((function(e,t){return r.a.createElement("span",{key:"loading-".concat(t),className:me(q,(function(){return{animationDelay:"".concat(t/10,"s")}}))},e)}))),r.a.createElement(_,{content:v}),r.a.createElement("div",{className:me(M)},null===i||void 0===i?void 0:i.map((function(e,t){return r.a.createElement(z,{label:e.label,key:"font_ui_".concat(t),min:e.min,max:e.max,tag:e.tag,defaultValue:fe[o][e.tag],onChange:function(t){return de(o,e.tag,t)},animatable:!0})})),r.a.createElement(z,{label:"font size",min:20,max:400,defaultValue:200,onChange:function(e){return w(e)}}),r.a.createElement(V,{label:"preview",defaultValue:I[o],onChange:function(e){return Y(e)},disabled:!Boolean(x)}),r.a.createElement(S,{label:"font file"}),n.map((function(e,t){switch(e.type){case"range":return r.a.createElement(z,{label:e.label,name:e.name,key:"input_".concat(o,"_").concat(t),min:e.min,max:e.max,disabled:!Boolean(x)});default:throw new Error("component not found")}})),r.a.createElement("button",{className:me(y(1)),onClick:function(){return Q(!K)},disabled:!Boolean(x)},K?"hide":"get"),K&&r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",{className:me(y("1 / span 5"),(t="100%",function(){return{width:t}}))}),r.a.createElement(V,{label:"font name"}),r.a.createElement("button",{className:me(y("5"))},"download"),r.a.createElement(V,{label:"email"}),r.a.createElement("button",{className:me(y("5"))},"send"))))))},G=function(e){var t=e.navHeight;return{marginTop:"".concat(t,"px")}};var U=function(e){var t=e.filterIdentifier,n=e.navHeight,i=e.layerColors,o=Object(a.useContext)(re).fontSize,c=Object(a.useContext)(ae).previewStrings,l=Object(a.useContext)(ce).previewedOutputFonts,s=Object(a.useContext)(le).fontVariations,f=Object(u.a)({navHeight:n}).css;return r.a.createElement("div",{className:f(G)},r.a.createElement("div",null,i.map((function(e,n){return r.a.createElement(R,{key:"".concat(t,"-overlay-").concat(n),fontFamily:l[t][n],fontSize:o,fontVariations:s[t],color:e},c[t])}))))},K=function(e){var t=e.fontSize;return{position:"relative",height:"".concat(1.1*t,"px")}};var Q=function(e){var t=e.filterRoutes,n=e.fontSize,i=e.setFontSize,o=Object(u.a)({fontSize:n}).css,c=Object(a.useRef)(200);function l(e){var t=document.body.clientWidth-20;if(e>t){var a=n*(t/e);a<c.current&&(i(a),c.current=a)}}return r.a.createElement("ul",null,t.map((function(e,t){return r.a.createElement("li",{key:"list-view-".concat(e.route)},r.a.createElement(m,{to:e.route},r.a.createElement("div",{className:o(K)},r.a.createElement(R,{fontSize:n,inListView:!0,onMount:l},e.title))))})))},$=function(e){var t=e.navHeight;return{marginTop:"".concat(t,"px")}};var ee=function(e){var t=e.filterRoutes,n=e.navHeight,a=e.fontSize,i=Object(u.a)({navHeight:n,fontSize:a}).css;return r.a.createElement("ul",{className:i($)},t.map((function(e){return r.a.createElement("li",{key:"overlay-link-".concat(e.route)},r.a.createElement(m,{to:e.route},r.a.createElement("div",{className:i(K)},r.a.createElement(R,{fontSize:a,inListView:!0},e.title))))})))},te=Object(a.createContext)(),ne=Object(a.createContext)(),ae=Object(a.createContext)(),re=Object(a.createContext)(),ie=Object(a.createContext)(),oe=Object(a.createContext)(),ce=Object(a.createContext)(),le=Object(a.createContext)(),ue=j.filter((function(e){return"filterDetailView"===e.type})),se=ue.reduce((function(e,t){return e[t.filterIdentifier]=t.inputs.reduce((function(e,t){return e[t.name]=t.default,e}),{}),e}),{}),fe=function(e){var t=e.contentIsVisible,n=e.navHeight;return{position:"fixed",bottom:0,width:"100%",height:"0px",left:0,background:"#ccc",transition:"height ".concat(350,"ms"),transform:"translateZ(0)",transitionTimingFunction:t?"cubic-bezier(.55,0,1,.45)":"cubic-bezier(0,.55,.45,1)",extend:[{condition:!t,style:{height:"calc(100% - ".concat(n,"px)")}}]}},de=function(e){var t=e.isTouching;return{zIndex:-1,top:0,left:0,width:"100%",position:"absolute",background:"#eee",overflow:"hidden",transform:"translateZ(0)",extend:[{condition:t,style:{height:"100%"}},{condition:!t,style:{width:"100%"}},{condition:e.transitionWidth,style:{transition:"width .15s ease-in"}}]}},me=function(e){return{fontSize:["22px","18px"],extend:[{condition:!e.touchAction,style:{touchAction:"none"}}]}};var be=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)(null),f=Object(l.a)(o,2),d=f[0],m=f[1],b=Object(a.useState)(document.body.clientWidth/4),v=Object(l.a)(b,2),p=v[0],h=v[1],g=Object(a.useState)(se),E=Object(l.a)(g,2),y=E[0],w=E[1],x=Object(a.useState)(!0),S=Object(l.a)(x,2),C=S[0],N=S[1],F=Object(a.useState)(0),k=Object(l.a)(F,2),z=k[0],I=k[1],V=Object(a.useState)(!1),L=Object(l.a)(V,2),D=L[0],P=L[1],R=Object(a.useState)(!0),T=Object(l.a)(R,2),H=T[0],A=T[1],_=Object(a.useState)(!1),B=Object(l.a)(_,2),W=B[0],M=B[1],X=Object(a.useState)(0),Z=Object(l.a)(X,2),q=Z[0],J=Z[1],G=Object(a.useState)(0),K=Object(l.a)(G,2),$=K[0],be=K[1],ve=Object(a.useState)(200),pe=Object(l.a)(ve,2),he=pe[0],ge=pe[1],Oe=Object(a.useState)(200),je=Object(l.a)(Oe,2),Ee=(je[0],je[1],Object(u.a)({contentIsVisible:C,navHeight:z,touchAction:H,isTouching:D,transitionWidth:W}).css),ye=Object(a.useRef)(),we=Object(a.useRef)(Date.now()),xe=Object(a.useState)(ue.reduce((function(e,t){return e[t.filterIdentifier]=Array(t.numberOfLayers),e}),{})),Se=Object(l.a)(xe,2),Ce=Se[0],Ne=Se[1],Fe=Object(a.useState)(ue.reduce((function(e,t){return t.variableFontControlSliders&&(e[t.filterIdentifier]=t.variableFontControlSliders.reduce((function(e,t){return e[t.tag]=t.default,e}),{})),e}),{})),ke=Object(l.a)(Fe,2),ze=ke[0],Ie=ke[1];function Ve(e){Date.now()-we.current>500&&(M(!1),P(!1),J(e.pageY))}function Le(e){we.current=Date.now(),M(!0),P(!0),1===e.touches.length&&be(e.touches[0].pageX)}function De(e){}function Pe(e){}function Re(e){if(M(!1),1===e.touches.length){e.touches[0];be(e.touches[0].pageX)}else A(!0)}Object(a.useEffect)((function(){return window.addEventListener("mousemove",Ve),window.addEventListener("touchstart",Le),window.addEventListener("touchmove",Re),window.addEventListener("touchend",De),window.addEventListener("touchcancel",Pe),function(){window.removeEventListener("mousemove",Ve),window.removeEventListener("touchstart",Le),window.removeEventListener("touchmove",Re),window.removeEventListener("touchend",De),window.removeEventListener("touchcancel",Pe)}}),[]);var Te=Object(a.useState)(ue.reduce((function(e,t){return e[t.filterIdentifier]=t.title,e}),{})),He=Object(l.a)(Te,2),Ae=He[0],_e=He[1];return r.a.createElement("div",{className:Ee(me)},r.a.createElement(re.Provider,{value:{fontSize:p,setFontSize:h}},r.a.createElement(ae.Provider,{value:{previewStrings:Ae,setPreviewString:function(e,t){var n=Object(c.a)({},Ae);n[e]=t,_e(n)}}},r.a.createElement(ce.Provider,{value:{previewedOutputFonts:Ce,setPreviewedOutputFonts:function(e,t){var n={};n[e]=t,Ne(Object(c.a)(Object(c.a)({},Ce),n))}}},r.a.createElement(le.Provider,{value:{fontVariations:ze,setFontVariations:function(e,t,n){var a=Object(c.a)({},ze);a[e][t]=parseInt(n),Ie(a)}}},r.a.createElement(ie.Provider,{value:N},r.a.createElement(O,{setNavHeight:I,filterRoutes:ue}),r.a.createElement(te.Provider,{value:{formInputValues:y,setFormInputValue:function(e,t,n){var a=Object(c.a)({},y);a[e][t]=n,w(a)}}},r.a.createElement(ne.Provider,{value:{inputFont:n,setInputFont:i}},r.a.createElement(oe.Provider,{value:{previewedInputFont:d,setPreviewedInputFont:m}},r.a.createElement("main",{className:Ee((function(){return{}}))},r.a.createElement(s.c,null,j.map((function(e,t){var n;switch(e.type){case"filterDetailView":n=r.a.createElement(Y,Object.assign({},e,{navHeight:z,key:e.route}));break;case"filterListView":n=r.a.createElement(Q,Object.assign({},e,{filterRoutes:ue,fontSize:he,setFontSize:ge}));break;default:throw new Error("view not matched")}return r.a.createElement(s.a,{path:e.route,element:n,key:"route_".concat(t)})})))))))),r.a.createElement("div",{className:Ee(fe)}),r.a.createElement("div",{ref:ye,className:Ee(de),style:Object(c.a)({},D?{width:"".concat($,"px")}:{height:"".concat(q,"px")})},r.a.createElement(s.c,null,j.map((function(e,t){var n;switch(e.type){case"filterDetailView":n=r.a.createElement(U,Object.assign({},e,{navHeight:z,key:e.route}));break;default:n=r.a.createElement(ee,Object.assign({},e,{filterRoutes:ue,navHeight:z,fontSize:he}))}return r.a.createElement(s.a,{path:e.route,element:n,key:"overlay_route_".concat(t)})})))))))))},ve=n(77),pe=n(76),he=n(34),ge=n(35),Oe=n(36),je=n(38),Ee=Object(pe.a)({plugins:[Object(he.a)(),Object(ge.a)(),Object(je.a)(),Object(Oe.a)((function(e,t){switch(e.length){case 2:return["@media (min-width: 570px)"];default:return[]}}),{padding:!0,margin:!0,display:!0,fontSize:!0,gridTemplateColumns:!0,width:!0})]});Ee.renderStatic({padding:0,margin:0,boxSizing:"border-box",textDecoration:"None",fontFamily:"inherit",fontSize:"inherit",color:"inherit","-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"},"html,body,div,input,label,a,button");Ee.renderStatic({fontFamily:"'Times New Roman', serif",maxWidth:"100vw",minHeight:"100vh",position:"relative"},"body");Ee.renderStatic({overflowX:"hidden"},"html");Ee.renderStatic({margin:0,listStyleType:"None",padding:0},"ul");Ee.renderStatic({whiteSpace:"nowrap",background:"transparent",outline:"none",border:"none",appearance:"none",textAlign:"left",textDecoration:"underline"},"button");Ee.renderStatic({color:"gray",userSelect:"none",pointerEvents:"none"},"*[disabled]");Ee.renderStatic({minWidth:"100px"},"input"),o.a.render(r.a.createElement(f.a,null,r.a.createElement(ve.a,{renderer:Ee},r.a.createElement(r.a.StrictMode,null,r.a.createElement(be,null)))),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.44dfec23.chunk.js.map