(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{40:function(e,t,a){e.exports=a(57)},45:function(e,t,a){},49:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(35),c=a.n(o),r=(a(45),a(17)),s=a(69),u=a(71),m=a(72),i=a(38),E=a(70);a(49);function g(e){let{setShowRegister:t}=e;const[a,o]=Object(n.useState)(!1),[c,r]=Object(n.useState)(!1),u=Object(n.useRef)(),i=Object(n.useRef)(),g=Object(n.useRef)();return l.a.createElement("div",{className:"registerContainer"},l.a.createElement("div",{className:"logo"},l.a.createElement(s.a,{className:"logoIcon"}),l.a.createElement("span",null,"LamaPin")),l.a.createElement("form",{onSubmit:async e=>{e.preventDefault();const t={username:u.current.value,email:i.current.value,password:g.current.value};try{await m.a.post("/users/register",t),r(!1),o(!0)}catch(a){r(!0)}}},l.a.createElement("input",{autoFocus:!0,placeholder:"username",ref:u}),l.a.createElement("input",{type:"email",placeholder:"email",ref:i}),l.a.createElement("input",{type:"password",min:"6",placeholder:"password",ref:g}),l.a.createElement("button",{className:"registerBtn",type:"submit"},"Register"),a&&l.a.createElement("span",{className:"success"},"Successfull. You can login now!"),c&&l.a.createElement("span",{className:"failure"},"Something went wrong!")),l.a.createElement(E.a,{className:"registerCancel",onClick:()=>t(!1)}))}a(56);function p(e){let{setShowLogin:t,setCurrentUsername:a,myStorage:o}=e;const[c,r]=Object(n.useState)(!1),u=Object(n.useRef)(),i=Object(n.useRef)();return l.a.createElement("div",{className:"loginContainer"},l.a.createElement("div",{className:"logo"},l.a.createElement(s.a,{className:"logoIcon"}),l.a.createElement("span",null,"LamaPin")),l.a.createElement("form",{onSubmit:async e=>{e.preventDefault();const n={username:u.current.value,password:i.current.value};try{const e=await m.a.post("/users/login",n);a(e.data.username),o.setItem("user",e.data.username),t(!1)}catch(l){r(!0)}}},l.a.createElement("input",{autoFocus:!0,placeholder:"username",ref:u}),l.a.createElement("input",{type:"password",min:"6",placeholder:"password",ref:i}),l.a.createElement("button",{className:"loginBtn",type:"submit"},"Login"),c&&l.a.createElement("span",{className:"failure"},"Something went wrong!")),l.a.createElement(E.a,{className:"loginCancel",onClick:()=>t(!1)}))}var d=function(){const e=window.localStorage,[t,a]=Object(n.useState)(e.getItem("user")),[o,c]=Object(n.useState)([]),[E,d]=Object(n.useState)(null),[b,f]=Object(n.useState)(null),[S,h]=Object(n.useState)(null),[v,O]=Object(n.useState)(null),[w,y]=Object(n.useState)(0),[C,N]=Object(n.useState)({latitude:47.040182,longitude:17.071727,zoom:4}),[j,k]=Object(n.useState)(!1),[R,_]=Object(n.useState)(!1);return Object(n.useEffect)(()=>{(async()=>{try{const e=await m.a.get("/pins");c(e.data)}catch(e){console.log(e)}})()},[]),l.a.createElement("div",{style:{height:"100vh",width:"100%"}},l.a.createElement(r.c,Object.assign({},C,{mapboxApiAccessToken:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_MAPBOX,width:"100%",height:"100%",transitionDuration:"200",mapStyle:"mapbox://styles/safak/cknndpyfq268f17p53nmpwira",onViewportChange:e=>N(e),onDblClick:t&&(e=>{const[t,a]=e.lngLat;f({lat:a,long:t})})}),o.map(e=>l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{latitude:e.lat,longitude:e.long,offsetLeft:-3.5*C.zoom,offsetTop:-7*C.zoom},l.a.createElement(s.a,{style:{fontSize:7*C.zoom,color:t===e.username?"tomato":"slateblue",cursor:"pointer"},onClick:()=>{return t=e._id,a=e.lat,n=e.long,d(t),void N({...C,latitude:a,longitude:n});var t,a,n}})),e._id===E&&l.a.createElement(r.b,{key:e._id,latitude:e.lat,longitude:e.long,closeButton:!0,closeOnClick:!1,onClose:()=>d(null),anchor:"left"},l.a.createElement("div",{className:"card"},l.a.createElement("label",null,"Place"),l.a.createElement("h4",{className:"place"},e.title),l.a.createElement("label",null,"Review"),l.a.createElement("p",{className:"desc"},e.desc),l.a.createElement("label",null,"Rating"),l.a.createElement("div",{className:"stars"},Array(e.rating).fill(l.a.createElement(u.a,{className:"star"}))),l.a.createElement("label",null,"Information"),l.a.createElement("span",{className:"username"},"Created by ",l.a.createElement("b",null,e.username)),l.a.createElement("span",{className:"date"},Object(i.a)(e.createdAt)))))),b&&l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{latitude:b.lat,longitude:b.long,offsetLeft:-3.5*C.zoom,offsetTop:-7*C.zoom},l.a.createElement(s.a,{style:{fontSize:7*C.zoom,color:"tomato",cursor:"pointer"}})),l.a.createElement(r.b,{latitude:b.lat,longitude:b.long,closeButton:!0,closeOnClick:!1,onClose:()=>f(null),anchor:"left"},l.a.createElement("div",null,l.a.createElement("form",{onSubmit:async e=>{e.preventDefault();const a={username:t,title:S,desc:v,rating:w,lat:b.lat,long:b.long};try{const e=await m.a.post("/pins",a);c([...o,e.data]),f(null)}catch(n){console.log(n)}}},l.a.createElement("label",null,"Title"),l.a.createElement("input",{placeholder:"Enter a title",autoFocus:!0,onChange:e=>h(e.target.value)}),l.a.createElement("label",null,"Description"),l.a.createElement("textarea",{placeholder:"Say us something about this place.",onChange:e=>O(e.target.value)}),l.a.createElement("label",null,"Rating"),l.a.createElement("select",{onChange:e=>y(e.target.value)},l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5")),l.a.createElement("button",{type:"submit",className:"submitButton"},"Add Pin"))))),t?l.a.createElement("button",{className:"button logout",onClick:()=>{a(null),e.removeItem("user")}},"Log out"):l.a.createElement("div",{className:"buttons"},l.a.createElement("button",{className:"button login",onClick:()=>_(!0)},"Log in"),l.a.createElement("button",{className:"button register",onClick:()=>k(!0)},"Register")),j&&l.a.createElement(g,{setShowRegister:k}),R&&l.a.createElement(p,{setShowLogin:_,setCurrentUsername:a,myStorage:e})))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(d,null)),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.b2323af7.chunk.js.map