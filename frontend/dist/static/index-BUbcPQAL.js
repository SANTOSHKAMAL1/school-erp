var y=Object.defineProperty;var b=(n,a,o)=>a in n?y(n,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[a]=o;var v=(n,a,o)=>b(n,typeof a!="symbol"?a+"":a,o);import{D as w,c as U,s as j,t as F,j as e,a as p,b as t,p as l,L as h,R as f,I as s,d as g,S as m,m as k}from"./index-DFAvIaoW.js";class C extends w{constructor(){super(...arguments);v(this,"state",{name:"",phone:"",note:"",touched:{},summary:!1,sent:!1,ref:""})}nameOk(){return(this.state.name||"").trim().length>1}phoneOk(){return/^[0-9]{10}$/.test((this.state.phone||"").replace(/\s|-/g,""))}submit(o){if(o.preventDefault(),!this.nameOk()||!this.phoneOk()){this.setState({touched:{name:!0,phone:!0},summary:!0});return}const c={...U(o.currentTarget),"Your name":this.state.name,Phone:this.state.phone,Note:this.state.note};j("contact",c).then(i=>this.setState({sent:!0,summary:!1,ref:i.reference})).catch(i=>F(i.message,!0))}seedLang(){if(this.state.lang)return this.state.lang;if(typeof window>"u")return"en";if(window.__AG_I18N_CHOSEN)return window.__AG_I18N_CHOSEN;var o=(window.location.search||"").match(/[?&]lang=([a-z]{2})/i);if(o)return o[1].toLowerCase();try{return localStorage.getItem("ag-lang")||"en"}catch{return"en"}}componentDidMount(){var o=this,c=0,i=setInterval(function(){c++,window.AG_I18N&&window.AG_I18N.subscribe?(clearInterval(i),window.AG_I18N.subscribe(function(d){d!==o.state.lang&&o.setState({lang:d})})):c>40&&clearInterval(i)},100);this.langHook=i}componentWillUnmount(){clearInterval(this.langHook)}renderVals(){const o=this.state.touched||{},c=!!o.name&&!this.nameOk(),i=!!o.phone&&!this.phoneOk(),d=(this.state.note||"").length,x="var(--color-accent)";return{langValue:this.seedLang(),pickLang:r=>{const u=r.target.value;window.AG_I18N&&window.AG_I18N.set(u),this.setState({lang:u})},directions:[{mode:"By road",note:"Off Pampa Mahakavi Road, inside the Uttaradi Math compound. The gate is beside the math entrance."},{mode:"Nearest metro",note:"National College station, about a ten-minute walk. Placeholder — confirm with the office."},{mode:"Bus",note:"Routes stopping at Basavanagudi and Shankarapuram. Placeholder pending the school’s note."},{mode:"Parking",note:"Limited space inside the compound; street parking on the approach road in the mornings."}],desks:[{name:"Admissions",scope:"Applications, eligibility, visits and fee queries for new families.",reach:"admissions@arundhatigurukulam.in"},{name:"School office",scope:"Attendance, certificates, transport and day-to-day matters.",reach:"+91 96860 52212"},{name:"Accounts",scope:"Fee instalments, receipts and refunds.",reach:"accounts@arundhatigurukulam.in"},{name:"Principal’s office",scope:"Academic matters and anything the office cannot settle.",reach:"By appointment through the office"}],hours:[{when:"Mon – Fri",what:"Visits from 9 am, best before the midday break"},{when:"Saturday",what:"Office open until noon; no classes running"},{when:"Telephone",what:"9 am to 4 pm on working days"}],nameValue:this.state.name,phoneValue:this.state.phone,noteValue:this.state.note,nameBad:c,phoneBad:i,nameBorder:c?x:"var(--color-divider)",phoneBorder:i?x:"var(--color-divider)",countLabel:d>400?d+" / 500":"",countColor:d>500?x:"var(--color-neutral-700)",showSummary:!!this.state.summary,setName:r=>this.setState({name:r.target.value,summary:!1}),setPhone:r=>this.setState({phone:r.target.value,summary:!1}),setNote:r=>this.setState({note:r.target.value.slice(0,500)}),touchName:()=>this.setState(r=>({touched:Object.assign({},r.touched,{name:!0})})),touchPhone:()=>this.setState(r=>({touched:Object.assign({},r.touched,{phone:!0})})),submit:r=>this.submit(r),sent:!!this.state.sent,notSent:!this.state.sent,ref:this.state.ref,reset:()=>this.setState({sent:!1,name:"",phone:"",note:"",touched:{},ref:""})}}}function D(n){return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{background:"var(--color-bg)",color:"var(--color-text)",fontFamily:"var(--font-body)"},children:[" ",e.jsxs("div",{style:{background:"#1E120D",color:"var(--color-accent-2-200)"},children:[" ",e.jsxs("div",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"7px clamp(18px,3.4vw,52px)",display:"flex",gap:"8px 18px",alignItems:"center",flexWrap:"wrap",fontSize:"12.5px"},children:[" ",e.jsx("a",{href:"/",style:{color:"inherit",textDecoration:"none",whiteSpace:"nowrap",flex:"0 0 auto"},children:"← Home"})," ",e.jsxs("span",{style:{display:"flex",gap:"6px",alignItems:"center"},children:[" ",e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:".75"},children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M3.2 9h17.6"}),e.jsx("path",{d:"M3.2 15h17.6"}),e.jsx("path",{d:"M12 3a15 15 0 0 1 0 18"}),e.jsx("path",{d:"M12 3a15 15 0 0 0 0 18"})]})," ",e.jsxs("select",{"aria-label":"Choose a language",onChange:n.pickLang,value:p(n.langValue,""),style:{background:"#1E120D",border:"1px solid color-mix(in srgb,var(--color-accent-2-200) 30%,transparent)",borderRadius:"999px",font:"inherit",fontSize:"12.5px",fontWeight:"600",color:"var(--color-accent-2-200)",cursor:"pointer",padding:"4px 10px"},children:[" ",e.jsx("option",{value:"en",children:"English"})," ",e.jsx("option",{value:"hi",children:"हिंदी"})," ",e.jsx("option",{value:"kn",children:"ಕನ್ನಡ"})," ",e.jsx("option",{value:"ta",children:"தமிழ்"})," ",e.jsx("option",{value:"te",children:"తెలుగు"})," ",e.jsx("option",{value:"ml",children:"മലയാളം"})," ",e.jsx("option",{value:"mr",children:"मराठी"})," ",e.jsx("option",{value:"sa",children:"संस्कृतम्"})," "]})," "]})," ",e.jsxs("span",{style:{marginLeft:"auto",display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[" ",e.jsx("a",{href:"tel:+919686052212",style:{color:"inherit",textDecoration:"none"},children:"+91 96860 52212"})," ",e.jsx("a",{href:"/login",style:{color:"var(--color-accent-2-400)",textDecoration:"none",fontWeight:"600"},children:"Family Login"})," "]})," "]})," "]})," ",e.jsxs("div",{style:{background:"var(--color-bg)"},children:[" ",e.jsxs("div",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(12px,1.8vw,18px) clamp(18px,3.4vw,52px)",display:"flex",gap:"clamp(16px,3vw,32px)",alignItems:"center",flexWrap:"wrap"},children:[" ",e.jsxs("a",{href:"/",style:{display:"flex",alignItems:"center",gap:"14px",textDecoration:"none",color:"inherit"},children:[" ",e.jsx("img",{src:"/assets/img-03-55c76a.png",alt:"Arundhati Gurukulam",style:{height:"clamp(54px,9vw,74px)",width:"auto"}})," ",e.jsxs("span",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"clamp(18px,2vw,23px)",lineHeight:"1.05",color:"var(--color-accent-900)"},children:"Arundhati Gurukulam"})," ",e.jsx("span",{style:{fontFamily:"var(--font-devanagari)",fontSize:"13.5px",color:"var(--color-accent-700)"},children:"सुरक्षिता · सुशिक्षिता · सुशीला"})," "]})," "]})," ",e.jsx("a",{href:"#visit",style:{marginLeft:"auto",borderRadius:"999px",whiteSpace:"nowrap",padding:"13px 26px",fontSize:"14.5px",background:"var(--color-accent)",color:"var(--color-accent-2-100)",borderColor:"var(--color-accent)"},className:t("btn",l("hover","background:var(--color-accent-700)")),children:"Request a visit"})," "]})," "]})," ",e.jsxs("div",{style:{position:"sticky",top:"0",zIndex:"60",background:"var(--color-accent)",borderTop:"1px solid color-mix(in srgb,var(--color-accent-900) 30%,transparent)"},children:[" ",e.jsxs("nav",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"0 clamp(18px,3.4vw,52px)",display:"flex",gap:"clamp(4px,1vw,14px)",alignItems:"stretch",fontSize:"14px",fontWeight:"600",flexWrap:"wrap"},children:[" ",e.jsx("a",{href:"/",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"Home"})," ",e.jsx("a",{href:"/#story",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"About Us"})," ",e.jsx("a",{href:"/#learning",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"Academics"})," ",e.jsx("a",{href:"/#life",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"Gurukulam Life"})," ",e.jsx("a",{href:"/admissions",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"Admissions"})," ",e.jsx("a",{href:"/#news",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:t(l("hover","background:var(--color-accent-800)")),children:"Media"})," ",e.jsx("a",{href:"/contact",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center",background:"var(--color-accent-800)",boxShadow:"inset 0 -3px 0 var(--color-accent-2-500)"},children:"Contact"})," "]})," "]})," ",e.jsxs("section",{style:{position:"relative",overflow:"hidden",background:"var(--color-marigold-soft)",padding:"clamp(34px,4vw,62px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsx("img",{src:"/assets/img-01-961cb5.png",alt:"",style:{position:"absolute",left:"50%",top:"50%",width:"min(900px,110%)",opacity:".10",animation:"agni-spin 300s linear infinite",pointerEvents:"none"}})," ",e.jsxs("div",{style:{position:"relative",maxWidth:"1200px",margin:"0 auto",display:"flex",flexDirection:"column",gap:"16px",animation:"agni-rise .8s cubic-bezier(.22,1,.36,1) both"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-800)"},children:"Contact"})," ",e.jsx("h1",{style:{margin:"0",fontSize:"clamp(30px,3.6vw,46px)",lineHeight:"1.03",letterSpacing:"-.015em",color:"var(--color-accent-900)",maxWidth:"26ch"},children:"The office answers between 9 am and 4 pm"})," ",e.jsx("p",{style:{margin:"0",maxWidth:"56ch",fontSize:"clamp(15.5px,1.2vw,17px)",lineHeight:"1.6",color:"var(--color-accent-900)"},children:"Telephone for anything urgent, write for anything that can wait a day, and come in person on a weekday morning if you would like to see the school at work."})," "]})," "]})," ",e.jsxs("section",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(258px,100%),1fr))",gap:"20px"},children:[" ",e.jsxs("article",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(20px,2.4vw,26px)",boxShadow:"var(--shadow-sm)",display:"flex",flexDirection:"column",gap:"12px"},children:[" ",e.jsxs("span",{style:{width:"44px",height:"44px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center",flex:"0 0 auto"},children:[" ",e.jsxs("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),e.jsx("circle",{cx:"12",cy:"10",r:"2.8"})]})," "]})," ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".16em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Address"})," ",e.jsxs("span",{style:{fontSize:"15.5px",lineHeight:"1.6",overflowWrap:"anywhere"},children:["No.2, Raghavasadanam",e.jsx("br",{}),"Pampa Mahakavi Road",e.jsx("br",{}),"Shankarapuram, Basavanagudi",e.jsx("br",{}),"Bengaluru 560004"]})," ",e.jsx("a",{href:"#map",style:{marginTop:"auto",fontSize:"14px",textDecoration:"none",borderBottom:"1px solid var(--color-accent-300)",alignSelf:"flex-start"},children:"Open directions"})," "]})," ",e.jsxs("article",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(20px,2.4vw,26px)",boxShadow:"var(--shadow-sm)",display:"flex",flexDirection:"column",gap:"12px"},children:[" ",e.jsxs("span",{style:{width:"44px",height:"44px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center",flex:"0 0 auto"},children:[" ",e.jsx("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z"})})," "]})," ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".16em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Telephone"})," ",e.jsx("span",{style:{fontSize:"15.5px",lineHeight:"1.6",overflowWrap:"anywhere"},children:"+91 96860 52212"})," ",e.jsx("a",{href:"tel:+919686052212",style:{marginTop:"auto",fontSize:"14px",textDecoration:"none",borderBottom:"1px solid var(--color-accent-300)",alignSelf:"flex-start"},children:"Call the office"})," "]})," ",e.jsxs("article",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(20px,2.4vw,26px)",boxShadow:"var(--shadow-sm)",display:"flex",flexDirection:"column",gap:"12px"},children:[" ",e.jsxs("span",{style:{width:"44px",height:"44px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center",flex:"0 0 auto"},children:[" ",e.jsxs("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"5",width:"18",height:"14",rx:"3"}),e.jsx("path",{d:"m3.8 7 8.2 6 8.2-6"})]})," "]})," ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".16em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Email"})," ",e.jsxs("span",{style:{fontSize:"15.5px",lineHeight:"1.6",overflowWrap:"anywhere"},children:["office@arundhatigurukulam.in",e.jsx("br",{}),"admissions@arundhatigurukulam.in"]})," ",e.jsx("a",{href:"mailto:office@arundhatigurukulam.in",style:{marginTop:"auto",fontSize:"14px",textDecoration:"none",borderBottom:"1px solid var(--color-accent-300)",alignSelf:"flex-start"},children:"Write to us"})," "]})," ",e.jsxs("article",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(20px,2.4vw,26px)",boxShadow:"var(--shadow-sm)",display:"flex",flexDirection:"column",gap:"12px"},children:[" ",e.jsxs("span",{style:{width:"44px",height:"44px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center",flex:"0 0 auto"},children:[" ",e.jsxs("svg",{width:"21",height:"21",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 7.5V12l3.5 2"})]})," "]})," ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".16em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Office hours"})," ",e.jsxs("span",{style:{fontSize:"15.5px",lineHeight:"1.6",overflowWrap:"anywhere"},children:["Monday to Friday, 9 am – 4 pm",e.jsx("br",{}),"Saturday, 9 am – 12 noon",e.jsx("br",{}),"Closed on Sundays and holidays"]})," ",e.jsx("a",{href:"/#notices",style:{marginTop:"auto",fontSize:"14px",textDecoration:"none",borderBottom:"1px solid var(--color-accent-300)",alignSelf:"flex-start"},children:"See the term calendar"})," "]})," "]})," ",e.jsxs("section",{style:{background:"var(--color-surface)",padding:"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(320px,100%),1fr))",gap:"clamp(24px,3.4vw,44px)",alignItems:"start"},children:[" ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"18px"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Finding us"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06"},children:"In the math compound at Shankarapuram"})," "]})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[" ",h(n.directions).map((a,o)=>e.jsxs(f.Fragment,{children:[" ",e.jsxs("div",{style:{display:"flex",gap:"14px",alignItems:"baseline",padding:"12px 0",borderBottom:"1px solid var(--color-divider)"},children:[" ",e.jsx("span",{style:{flex:"0 0 116px",fontSize:"12.5px",letterSpacing:".08em",textTransform:"uppercase",color:"var(--color-accent-700)",fontWeight:"600"},children:s(a==null?void 0:a.mode)})," ",e.jsx("span",{style:{minWidth:"0",fontSize:"15px",lineHeight:"1.55"},children:s(a==null?void 0:a.note)})," "]})," "]},o))," "]})," ",e.jsx("a",{href:"#map",style:{borderRadius:"999px",whiteSpace:"nowrap",padding:"13px 26px",fontSize:"14.5px",alignSelf:"flex-start",background:"var(--color-accent)",color:"var(--color-accent-2-100)",borderColor:"var(--color-accent)"},className:t("btn",l("hover","background:var(--color-accent-700)")),children:"Open directions"})," ",e.jsx("span",{style:{fontSize:"13px",lineHeight:"1.6",color:"var(--color-neutral-700)"},children:"Landmark and transit notes are placeholders — send the school's preferred wording and the map pin and I will set both exactly."})," "]})," ",e.jsxs("figure",{id:"map",style:{minWidth:"0",margin:"0",borderRadius:"var(--radius-lg)",overflow:"hidden",aspectRatio:"4/3",background:"var(--color-neutral-200)",boxShadow:"var(--shadow-md)"},className:t("washed"),children:[" ",e.jsx("image-slot",{id:"contact-map",shape:"rect",placeholder:"Map or street photograph of the entrance"})," "]})," "]})," "]})," ",e.jsxs("section",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(34px,4vw,58px) clamp(18px,3.4vw,52px)",display:"flex",flexDirection:"column",gap:"clamp(22px,2.6vw,32px)"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"52ch"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Who to ask"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06"},children:"Straight to the right desk"})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(194px,100%),1fr))",gap:"18px"},children:[" ",h(n.desks).map((a,o)=>e.jsxs(f.Fragment,{children:[" ",e.jsxs("div",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-sm)",padding:"22px",display:"flex",flexDirection:"column",gap:"8px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"18px"},children:s(a==null?void 0:a.name)})," ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.55",color:"var(--color-neutral-800)"},children:s(a==null?void 0:a.scope)})," ",e.jsx("span",{style:{fontSize:"14px",color:"var(--color-accent-700)",fontWeight:"600",overflowWrap:"anywhere"},children:s(a==null?void 0:a.reach)})," "]})," "]},o))," "]})," "]})," ",e.jsxs("section",{id:"visit",style:{background:"var(--color-accent-900)",color:"var(--color-accent-2-200)",padding:"clamp(36px,4.2vw,66px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(320px,100%),1fr))",gap:"clamp(26px,4vw,52px)",alignItems:"start"},children:[" ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"16px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-2-500)"},children:"Request a visit"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06",color:"var(--color-bg)"},children:"See a morning while classes are running"})," ",e.jsx("p",{style:{margin:"0",maxWidth:"46ch",fontSize:"15.5px",lineHeight:"1.62"},children:"Choose a weekday that suits you. The office will confirm by telephone and tell you which period to arrive for."})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"9px",paddingTop:"6px",fontSize:"14.5px"},children:[" ",h(n.hours).map((a,o)=>e.jsxs(f.Fragment,{children:[" ",e.jsxs("span",{style:{display:"flex",gap:"14px",alignItems:"baseline",paddingBottom:"9px",borderBottom:"1px solid color-mix(in srgb,var(--color-accent-2-200) 22%,transparent)"},children:[" ",e.jsx("span",{style:{flex:"0 0 132px",color:"var(--color-accent-2-400)",fontWeight:"600"},children:s(a==null?void 0:a.when)})," ",e.jsx("span",{style:{minWidth:"0"},children:s(a==null?void 0:a.what)})," "]})," "]},o))," "]})," "]})," ",n.sent?e.jsxs(e.Fragment,{children:[" ",e.jsxs("div",{style:{minWidth:"0",background:"var(--color-neutral-100)",color:"var(--color-text)",borderRadius:"var(--radius-lg)",padding:"clamp(24px,3vw,34px)",boxShadow:"var(--shadow-md)",display:"flex",flexDirection:"column",gap:"14px",alignItems:"flex-start"},children:[" ",e.jsxs("span",{style:{width:"52px",height:"52px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center"},children:[" ",e.jsx("svg",{width:"26",height:"26",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.9",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m4.5 12.5 4.5 4.5 10-10"})})," "]})," ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"23px"},children:"Request received"})," ",e.jsxs("span",{style:{fontSize:"13px",letterSpacing:".1em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:["Reference ",s(n.ref)]})," ",e.jsx("p",{style:{margin:"0",fontSize:"15.5px",lineHeight:"1.6",color:"var(--color-neutral-800)"},children:"The office will telephone within two working days to fix the morning. Keep the reference for any follow-up call."})," ",e.jsx("button",{onClick:n.reset,style:{fontSize:"15px",cursor:"pointer",whiteSpace:"nowrap"},className:t("btn btn-ghost"),children:"Send another request"})," "]})," "]}):null," ",n.notSent?e.jsxs(e.Fragment,{children:[" ",e.jsxs("form",{onSubmit:n.submit,style:{minWidth:"0",background:"var(--color-neutral-100)",color:"var(--color-text)",borderRadius:"var(--radius-lg)",padding:"clamp(24px,3vw,34px)",boxShadow:"var(--shadow-md)",display:"flex",flexDirection:"column",gap:"16px"},children:[" ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Your name"})," ",e.jsx("input",{type:"text",value:p(n.nameValue,""),onChange:n.setName,onBlur:n.touchName,style:g(`border-radius:999px;padding:12px 18px;font-size:15px;border:1px solid ${m(n.nameBorder)}`),className:t("input")})," ",n.nameBad?e.jsxs(e.Fragment,{children:[" ",e.jsx("span",{style:{fontSize:"13px",color:"var(--color-accent-700)"},children:"Please tell us your name."})," "]}):null," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(160px,100%),1fr))",gap:"16px"},children:[" ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Mobile"})," ",e.jsx("input",{type:"tel",value:p(n.phoneValue,""),onChange:n.setPhone,onBlur:n.touchPhone,placeholder:"10 digits",style:g(`border-radius:999px;padding:12px 18px;font-size:15px;border:1px solid ${m(n.phoneBorder)}`),className:t("input")})," ",n.phoneBad?e.jsxs(e.Fragment,{children:[" ",e.jsx("span",{style:{fontSize:"13px",color:"var(--color-accent-700)"},children:"Enter a ten-digit mobile number."})," "]}):null," "]})," ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Preferred day"})," ",e.jsxs("select",{style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)",background:"var(--color-neutral-100)"},className:t("input"),children:[" ",e.jsx("option",{children:"Monday"})," ",e.jsx("option",{children:"Tuesday"})," ",e.jsx("option",{children:"Wednesday"})," ",e.jsx("option",{children:"Thursday"})," ",e.jsx("option",{children:"Friday"})," "]})," "]})," "]})," ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px"},children:[" ",e.jsxs("span",{style:{display:"flex",gap:"10px",alignItems:"baseline",fontSize:"13px",fontWeight:"600"},children:["What would you like to see or ask? ",e.jsx("span",{style:g(`margin-left:auto;font-weight:400;color:${m(n.countColor)}`),children:s(n.countLabel)})]})," ",e.jsx("textarea",{rows:"3",value:p(n.noteValue,""),onChange:n.setNote,style:{borderRadius:"var(--radius-md)",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)",fontFamily:"inherit",resize:"vertical"},className:t("input")})," "]})," ",n.showSummary?e.jsxs(e.Fragment,{children:[" ",e.jsx("span",{style:{background:"var(--color-accent-200)",color:"var(--color-accent-800)",borderRadius:"var(--radius-md)",padding:"12px 16px",fontSize:"14px",lineHeight:"1.5"},children:"Check the highlighted fields and send again."})," "]}):null," ",e.jsx("button",{type:"submit",style:{borderRadius:"999px",padding:"14px 28px",fontSize:"15px",fontWeight:"600",cursor:"pointer",justifyContent:"center",whiteSpace:"nowrap",background:"var(--color-accent)",color:"var(--color-accent-2-100)",borderColor:"var(--color-accent)"},className:t("btn",l("hover","background:var(--color-accent-700)")),children:"Send request"})," ",e.jsx("span",{style:{fontSize:"12.5px",lineHeight:"1.55",color:"var(--color-neutral-700)"},children:"We use these details only to arrange your visit."})," "]})," "]}):null," "]})," "]})," ",e.jsxs("footer",{style:{background:"#1E120D",color:"var(--color-accent-2-200)",padding:"clamp(34px,3.8vw,56px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"flex",flexWrap:"wrap",gap:"clamp(24px,4vw,56px)",justifyContent:"space-between",alignItems:"flex-start"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px",maxWidth:"38ch"},children:[" ",e.jsx("img",{src:"/assets/img-06-f5e5bb.png",alt:"Arundhati Gurukulam",style:{height:"62px",width:"auto"}})," ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.6"},children:"No.2, Raghavasadanam, Pampa Mahakavi Road, Shankarapuram, Basavanagudi, Bengaluru 560004"})," "]})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"11px",fontSize:"14.5px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".18em",textTransform:"uppercase",color:"var(--color-accent-2-500)"},children:"Elsewhere"})," ",e.jsx("a",{href:"/",style:{color:"inherit",textDecoration:"none"},children:"Home"})," ",e.jsx("a",{href:"/admissions",style:{color:"inherit",textDecoration:"none"},children:"Admissions"})," ",e.jsx("a",{href:"/login",style:{color:"inherit",textDecoration:"none"},children:"Family Login"})," "]})," "]})," "]})]})})}const S=`/* Organic — design-system tokens and component classes. This file is the source of truth for the system's look; retune it here and see readme.md. */
/* latin-ext */
@font-face {
  font-family: 'Caprasimo';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-01-cafc19.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Caprasimo';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-02-c7371a.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-03-eca8d8.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-04-202cfb.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/assets/font-03-eca8d8.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("/assets/font-04-202cfb.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/assets/font-03-eca8d8.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/assets/font-04-202cfb.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}


:root {
  --color-bg: #f5ead8;
  --color-surface: #ebddc5;
  --color-text: #201e1d;
  --color-accent: #c67139;
  --color-accent-2: #7a8a5e;
  --color-divider: color-mix(in srgb, #201e1d 16%, transparent);

  /* Tonal ramps — generated in OKLCH on one shared lightness scale, so the
     same step of any role matches the others in visual value. */
  --color-neutral-100: #f9f4ed;
  --color-neutral-200: #eee7db;
  --color-neutral-300: #dcd3c4;
  --color-neutral-400: #c0b6a5;
  --color-neutral-500: #a19786;
  --color-neutral-600: #82796a;
  --color-neutral-700: #645c50;
  --color-neutral-800: #474238;
  --color-neutral-900: #2e2b25;

  --color-accent-100: #fff2eb;
  --color-accent-200: #ffe1d0;
  --color-accent-300: #ffc6a5;
  --color-accent-400: #f6a06b;
  --color-accent-500: #d67f48;
  --color-accent-600: #b2622d;
  --color-accent-700: #8c491a;
  --color-accent-800: #643312;
  --color-accent-900: #402310;

  --color-accent-2-100: #f0fae1;
  --color-accent-2-200: #e1eecc;
  --color-accent-2-300: #ccdbb2;
  --color-accent-2-400: #aebf92;
  --color-accent-2-500: #8fa073;
  --color-accent-2-600: #728157;
  --color-accent-2-700: #56633f;
  --color-accent-2-800: #3d472b;
  --color-accent-2-900: #272e1b;

  --font-heading: "Caprasimo", system-ui, sans-serif;
  --font-heading-weight: 400;
  --font-body: "Figtree", system-ui, sans-serif;

  --space-1: 4.4px;
  --space-2: 8.8px;
  --space-3: 13.2px;
  --space-4: 17.6px;
  --space-6: 26.4px;
  --space-8: 35.2px;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 28px;

  /* Elevation — derived from the ground: soft ink-tinted shadows on a
     light theme, a hairline edge + ambient darkness on a dark one. */
  --shadow-sm: 0 1px 2px color-mix(in srgb, #2e2b25 14%, transparent);
  --shadow-md: 0 3px 10px color-mix(in srgb, #2e2b25 16%, transparent);
  --shadow-lg: 0 12px 32px color-mix(in srgb, #2e2b25 22%, transparent);
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
}
h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: var(--font-heading-weight); }

.washed{filter:saturate(0.6) contrast(0.85) brightness(1.1) opacity(0.94)}

/* ══════════════════════════════════════════════════════════════════════════
   Components — built with the tokens above. Plain CSS
   on plain HTML: no JavaScript, no build step. Each class is documented in
   readme.md and demonstrated in foundations/ and components/.
   ══════════════════════════════════════════════════════════════════════ */

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-size: 15px; line-height: 1.55; font-weight: 400; }
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  line-height: 1.12; letter-spacing: -0.015em; margin: 0 0 var(--space-2);
}
h1 { font-size: 42px; }
h2 { font-size: 32px; }
h3 { font-size: 25px; }
h4 { font-size: 20px; }
h5 { font-size: 16px; }
h6 { font-size: 13px; }
h6 { letter-spacing: 0.08em; text-transform: uppercase; }
p { margin: 0 0 var(--space-3); }
a { color: var(--color-accent); text-underline-offset: 3px; }
img { display: block; max-width: 100%; }
figure { margin: 0; }
figcaption {
  font-size: 11px; margin-top: var(--space-1);
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
}
.text-muted { color: color-mix(in srgb, var(--color-text) 55%, transparent); }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
::selection { background: color-mix(in srgb, var(--color-accent) 30%, transparent); }

/* — rules — */
.hr {
  height: 1px; border: 0; margin: var(--space-4) 0;
  background: var(--color-divider);
}

/* — buttons — */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  cursor: pointer; text-decoration: none;
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 14px; line-height: 1.2; color: var(--color-text); /* matches the .input's 14px —
     the pair sits side by side in sign-up rows */
  background: transparent; border: 1px solid transparent;
  padding: var(--space-2) calc(var(--space-3) * 1.2);
  border-radius: var(--radius-md);
}
.btn svg { display: block; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-primary { background: var(--color-accent); color: var(--color-bg); }
.btn-primary:hover { background: var(--color-accent-600); }
.btn-primary:active { background: var(--color-accent-700); }
.btn-secondary { border-color: var(--color-divider); }
.btn-secondary:hover { background: color-mix(in srgb, var(--color-text) 7%, transparent); }
.btn-secondary:active { background: color-mix(in srgb, var(--color-text) 14%, transparent); }
.btn-ghost { color: var(--color-accent); padding-inline: var(--space-1); }
.btn-ghost:hover { background: color-mix(in srgb, var(--color-accent) 10%, transparent); }
.btn-ghost:active { background: color-mix(in srgb, var(--color-accent) 18%, transparent); }
.btn-icon { width: 36px; height: 36px; padding: 0; }
.btn-block { width: 100%; margin-top: var(--space-2); }

/* — forms — */
.field > label {
  display: block; font-size: 12px; margin-bottom: 5px;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}
.input {
  width: 100%; min-height: 36px; padding: 6px 10px; font: inherit;
  font-size: 14px; color: var(--color-text); caret-color: var(--color-accent);
  background: var(--color-surface);
  border: 1px solid var(--color-divider); border-radius: var(--radius-md);
}
.input:hover { border-color: color-mix(in srgb, var(--color-text) 45%, transparent); }
.input:focus-visible { border-color: var(--color-accent); outline-offset: 0; }
textarea.input { min-height: 90px; resize: vertical; }
.radio { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; }
.radio input, .seg-opt input {
  position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;
}
.radio .dot {
  width: 16px; height: 16px; flex: none; border-radius: 50%;
  border: 1.5px solid var(--color-divider);
}
.radio:hover .dot { border-color: var(--color-accent); }
.radio input:checked + .dot {
  border-color: var(--color-accent); background: var(--color-accent);
  box-shadow: inset 0 0 0 4px var(--color-bg);
}
.radio input:focus-visible + .dot { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.seg {
  display: inline-flex; overflow: hidden;
  border: 1px solid var(--color-divider); border-radius: var(--radius-md);
}
.seg-opt {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; font-size: 13px; cursor: pointer;
}
.seg-opt + .seg-opt { border-left: 1px solid var(--color-divider); }
.seg-opt:has(input:checked) { background: var(--color-accent); color: var(--color-bg); }
.seg-opt:not(:has(input:checked)):hover { background: color-mix(in srgb, var(--color-text) 7%, transparent); }
.seg-opt:has(input:focus-visible) { outline: 2px solid var(--color-accent); outline-offset: -2px; }

/* — cards — */
.card {
  display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-3); border-radius: var(--radius-md); background: var(--color-surface);
}
.card-kicker { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
.card-title {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 17px; line-height: 1.2;
}
.card-body { margin: 0; font-size: 13px; opacity: 0.8; flex: 1; }
.card-meta {
  display: flex; align-items: center; gap: 6px; font-size: 11px;
  color: color-mix(in srgb, var(--color-text) 50%, transparent);
}
.elev-sm { box-shadow: var(--shadow-sm); }
.elev-md { box-shadow: var(--shadow-md); }
.elev-lg { box-shadow: var(--shadow-lg); }

/* — tags — */
.tag {
  display: inline-flex; align-items: center; font-size: 11px;
  letter-spacing: 0.02em; padding: 3px 10px;
  border-radius: calc(var(--radius-md) * 0.75);
}
.tag-accent { background: var(--color-accent-100); color: var(--color-accent-800); }
.tag-accent-2 { background: var(--color-accent-2-100); color: var(--color-accent-2-800); }
.tag-neutral { background: var(--color-neutral-100); color: var(--color-neutral-800); }
.tag-outline { border: 1px solid var(--color-accent); color: var(--color-accent); }

/* — navigation — */
.nav {
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-bottom: none;
}
.nav-brand {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 18px; margin-right: auto;
}
.nav a { color: inherit; text-decoration: none; font-size: 14px; }
.nav a:hover, .nav a[aria-current='page'] { color: var(--color-accent); }

/* — tables — */
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th {
  text-align: left; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
  padding: var(--space-2); border-bottom: 1px solid var(--color-divider);
}
.table td {
  padding: var(--space-2);
  border-bottom: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
}
.table tbody tr:hover { background: color-mix(in srgb, var(--color-text) 4%, transparent); }

/* — dialog — */
.dialog-backdrop {
  position: fixed; inset: 0; display: grid; place-items: center;
  padding: var(--space-4);
  background: color-mix(in srgb, var(--color-neutral-900) 50%, transparent);
}
.dialog {
  width: min(440px, 100%); display: flex; flex-direction: column; gap: var(--space-3);
  padding: var(--space-4); border-radius: var(--radius-lg);
  background: var(--color-surface); box-shadow: var(--shadow-lg);
}
.dialog-title {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 20px;
}
.dialog-body { font-size: 14px; opacity: 0.85; }
.dialog-actions { display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-2); }

/* — rounded frame: everything softens, small controls go pill — */
.card, .dialog { border-radius: calc(var(--radius-lg) * 1.15); }
.btn, .tag, .seg, .input { border-radius: 999px; }
.input { padding-inline: 14px; }



/* devanagari */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-17-0941d9.woff2") format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
}
/* latin-ext */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-18-c2c6a8.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-19-7e823b.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* devanagari */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-20-b006a9.woff2") format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
}
/* latin-ext */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-21-d6b885.woff2") format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Tiro Devanagari Sanskrit';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/assets/font-22-ef1fba.woff2") format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}



:root{
  --color-bg:#FAF2E2;
  --color-surface:#F3E4C6;
  --color-text:#251611;
  --color-accent:#A03C1C;
  --color-accent-2:#E5B826;
  --color-divider:color-mix(in srgb,#251611 14%, transparent);
  --color-accent-100:#FDEEE6; --color-accent-200:#F8D9C9; --color-accent-300:#EFB69B;
  --color-accent-400:#DE8A63; --color-accent-500:#C4633A; --color-accent-600:#8C3116;
  --color-accent-700:#7D2C14; --color-accent-800:#5A1F0F; --color-accent-900:#3B160B;
  --color-marigold-soft:#F6E3AE;
  --color-accent-2-100:#FFF8E0; --color-accent-2-200:#FDEDB8; --color-accent-2-300:#F8DD88;
  --color-accent-2-400:#EFCA4E; --color-accent-2-500:#E5B826; --color-accent-2-600:#C79C13;
  --color-accent-2-700:#9C780C; --color-accent-2-800:#6F5508; --color-accent-2-900:#493806;
  --font-devanagari:"Tiro Devanagari Sanskrit", serif;
}
html{zoom:.9}
body{margin:0}
a{color:var(--color-accent-700)}
a:hover{color:var(--color-accent)}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid var(--color-accent);outline-offset:2px}
@keyframes agni-spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes agni-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`,B=k(C,D,S,{},"ContactPage");export{B as default};
