var f=Object.defineProperty;var g=(t,n,a)=>n in t?f(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a;var x=(t,n,a)=>g(t,typeof n!="symbol"?n+"":n,a);import{D as h,c as m,s as u,t as v,j as e,a as y,b as o,p as s,L as c,R as d,I as r,m as b}from"./index-BOmyO5iW.js";class w extends h{constructor(){super(...arguments);x(this,"state",{fees:!1,faq:null,sent:!1})}seedLang(){if(this.state.lang)return this.state.lang;if(typeof window>"u")return"en";if(window.__AG_I18N_CHOSEN)return window.__AG_I18N_CHOSEN;var a=(window.location.search||"").match(/[?&]lang=([a-z]{2})/i);if(a)return a[1].toLowerCase();try{return localStorage.getItem("ag-lang")||"en"}catch{return"en"}}componentDidMount(){var a=this,i=0,l=setInterval(function(){i++,window.AG_I18N&&window.AG_I18N.subscribe?(clearInterval(l),window.AG_I18N.subscribe(function(p){p!==a.state.lang&&a.setState({lang:p})})):i>40&&clearInterval(l)},100);this.langHook=l}componentWillUnmount(){clearInterval(this.langHook)}renderVals(){return{langValue:this.seedLang(),pickLang:a=>{const i=a.target.value;window.AG_I18N&&window.AG_I18N.set(i),this.setState({lang:i})},feesOpen:!!this.state.fees,feeToggleLabel:this.state.fees?"Hide what it covers":"What the fee covers →",toggleFees:()=>this.setState(a=>({fees:!a.fees})),sent:!!this.state.sent,notSent:!this.state.sent,submit:a=>{a.preventDefault();const i=m(a.currentTarget);u("admission",i).then(l=>this.setState({sent:!0,ref:l.reference})).catch(l=>v(l.message,!0))},resetForm:()=>this.setState({sent:!1}),steps:[{n:"01",title:"Enquire",body:"Leave your details here or telephone the office. We will call back within two working days."},{n:"02",title:"Visit a morning",body:"Come while classes are running. You will see the recitation period, meet the acharyas and walk the campus."},{n:"03",title:"Apply",body:"Submit the form with the documents listed below. Children joining above Grade 1 sit a short interaction."},{n:"04",title:"Confirm the seat",body:"Offers are made within a week of the interaction. The seat is held once the first instalment is paid."}],eligibility:[{cls:"Nursery",age:"3 years",seats:"20"},{cls:"LKG",age:"4 years",seats:"20"},{cls:"UKG",age:"5 years",seats:"20"},{cls:"Grade 1 – 5",age:"6 – 10 years",seats:"Limited"},{cls:"Grade 6 – 10",age:"11 – 15 years",seats:"On interaction"}],documents:[{text:"Child's birth certificate (original and a copy)"},{text:"Aadhaar of the child and both parents"},{text:"Transfer certificate from the previous school, for Grade 1 and above"},{text:"Report card for the last two years, where applicable"},{text:"Four passport photographs of the child"},{text:"Address proof and, if applicable, the caste or category certificate"}],fees:[{stage:"Nursery – UKG",amount:"₹ 48,000",note:"Per year, payable in two instalments. Includes books and the midday meal."},{stage:"Grade 1 – 5",amount:"₹ 62,000",note:"Per year, payable in two instalments. Includes books, meal and the Sanskrit course."},{stage:"Grade 6 – 10",amount:"₹ 78,000",note:"Per year, payable in two instalments. Board registration billed at cost."}],feeIncludes:[{text:"Tuition, including the Sanskrit and Veda periods"},{text:"Textbooks, notebooks and stationery"},{text:"The midday meal, cooked on the premises"},{text:"Music, art, yoga and games"},{text:"Library and laboratory use"},{text:"Festival days and the annual recitation evening"}],dates:[{when:"1 October",what:"Enquiries open for the following academic year"},{when:"15 November",what:"Application forms available at the office"},{when:"10 January",what:"Interactions for Grade 1 and above"},{when:"1 February",what:"Offers made; seats confirmed on payment"}],faqs:[["Does my child need to know Sanskrit before joining?","No. Sanskrit is taught from the beginning, by ear before by grammar. Children who join in later grades are given additional support to catch up with their class."],["Is there an entrance examination?","Not for Nursery to UKG. From Grade 1 upwards there is a short interaction — a conversation, some reading and a little arithmetic — to place the child correctly, not to filter."],["Which board does the school follow for Grade 10?","The state board, taken alongside the traditional curriculum. Send us your question about board choice and the principal will answer it directly."],["Can we visit before applying?","Yes, and we would prefer it. Weekday mornings while classes are running are best. Telephone the office a day ahead so an acharya is free to walk you through."]].map((a,i)=>({q:a[0],a:a[1],open:this.state.faq===i,sign:this.state.faq===i?"–":"+",toggle:()=>this.setState(l=>({faq:l.faq===i?null:i}))}))}}}function U(t){return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{background:"var(--color-bg)",color:"var(--color-text)",fontFamily:"var(--font-body)"},children:[" ",e.jsxs("div",{style:{background:"#1E120D",color:"var(--color-accent-2-200)"},children:[" ",e.jsxs("div",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"7px clamp(18px,3.4vw,52px)",display:"flex",gap:"8px 18px",alignItems:"center",flexWrap:"wrap",fontSize:"12.5px"},children:[" ",e.jsx("a",{href:"/",style:{color:"inherit",textDecoration:"none",whiteSpace:"nowrap",flex:"0 0 auto"},children:"← Home"})," ",e.jsxs("span",{style:{display:"flex",gap:"6px",alignItems:"center"},children:[" ",e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.75",strokeLinecap:"round",strokeLinejoin:"round",style:{opacity:".75"},children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M3.2 9h17.6"}),e.jsx("path",{d:"M3.2 15h17.6"}),e.jsx("path",{d:"M12 3a15 15 0 0 1 0 18"}),e.jsx("path",{d:"M12 3a15 15 0 0 0 0 18"})]})," ",e.jsxs("select",{"aria-label":"Choose a language",onChange:t.pickLang,value:y(t.langValue,""),style:{background:"#1E120D",border:"1px solid color-mix(in srgb,var(--color-accent-2-200) 30%,transparent)",borderRadius:"999px",font:"inherit",fontSize:"12.5px",fontWeight:"600",color:"var(--color-accent-2-200)",cursor:"pointer",padding:"4px 10px"},children:[" ",e.jsx("option",{value:"en",children:"English"})," ",e.jsx("option",{value:"hi",children:"हिंदी"})," ",e.jsx("option",{value:"kn",children:"ಕನ್ನಡ"})," ",e.jsx("option",{value:"ta",children:"தமிழ்"})," ",e.jsx("option",{value:"te",children:"తెలుగు"})," ",e.jsx("option",{value:"ml",children:"മലയാളം"})," ",e.jsx("option",{value:"mr",children:"मराठी"})," ",e.jsx("option",{value:"sa",children:"संस्कृतम्"})," "]})," "]})," ",e.jsxs("span",{style:{marginLeft:"auto",display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[" ",e.jsx("a",{href:"tel:+919686052212",style:{color:"inherit",textDecoration:"none"},children:"+91 96860 52212"})," ",e.jsx("a",{href:"/login",style:{color:"var(--color-accent-2-400)",textDecoration:"none",fontWeight:"600"},children:"Family Login"})," "]})," "]})," "]})," ",e.jsxs("div",{style:{background:"var(--color-bg)"},children:[" ",e.jsxs("div",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(12px,1.8vw,18px) clamp(18px,3.4vw,52px)",display:"flex",gap:"clamp(16px,3vw,32px)",alignItems:"center",flexWrap:"wrap"},children:[" ",e.jsxs("a",{href:"/",style:{display:"flex",alignItems:"center",gap:"14px",textDecoration:"none",color:"inherit"},children:[" ",e.jsx("img",{src:"/assets/img-03-55c76a.png",alt:"Arundhati Gurukulam",style:{height:"clamp(54px,9vw,74px)",width:"auto"}})," ",e.jsxs("span",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"clamp(18px,2vw,23px)",lineHeight:"1.05",color:"var(--color-accent-900)"},children:"Arundhati Gurukulam"})," ",e.jsx("span",{style:{fontFamily:"var(--font-devanagari)",fontSize:"13.5px",color:"var(--color-accent-700)"},children:"सुरक्षिता · सुशिक्षिता · सुशीला"})," "]})," "]})," ",e.jsx("a",{href:"#enquire",style:{marginLeft:"auto",borderRadius:"999px",whiteSpace:"nowrap",padding:"13px 26px",fontSize:"14.5px",background:"var(--color-accent)",color:"var(--color-accent-2-100)",borderColor:"var(--color-accent)"},className:o("btn",s("hover","background:var(--color-accent-700)")),children:"Enquire now"})," "]})," "]})," ",e.jsxs("div",{style:{position:"sticky",top:"0",zIndex:"60",background:"var(--color-accent)",borderTop:"1px solid color-mix(in srgb,var(--color-accent-900) 30%,transparent)"},children:[" ",e.jsxs("nav",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"0 clamp(18px,3.4vw,52px)",display:"flex",gap:"clamp(4px,1vw,14px)",alignItems:"stretch",fontSize:"14px",fontWeight:"600",flexWrap:"wrap"},children:[" ",e.jsx("a",{href:"/",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"Home"})," ",e.jsx("a",{href:"/#story",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"About Us"})," ",e.jsx("a",{href:"/#learning",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"Academics"})," ",e.jsx("a",{href:"/#life",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"Gurukulam Life"})," ",e.jsx("a",{href:"/admissions",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center",background:"var(--color-accent-800)",boxShadow:"inset 0 -3px 0 var(--color-accent-2-500)"},children:"Admissions"})," ",e.jsx("a",{href:"/#news",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"Media"})," ",e.jsx("a",{href:"/contact",style:{color:"var(--color-accent-2-100)",textDecoration:"none",padding:"14px 12px",display:"flex",alignItems:"center"},className:o(s("hover","background:var(--color-accent-800)")),children:"Contact"})," "]})," "]})," ",e.jsxs("section",{style:{position:"relative",overflow:"hidden",background:"var(--color-accent-900)",color:"var(--color-bg)",padding:"clamp(40px,4.6vw,76px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsx("img",{src:"/assets/img-01-961cb5.png",alt:"",style:{position:"absolute",right:"-10%",top:"-40%",width:"min(700px,70%)",opacity:".12",animation:"agni-spin 300s linear infinite",pointerEvents:"none"}})," ",e.jsxs("div",{style:{position:"relative",maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(330px,100%),1fr))",gap:"clamp(26px,4vw,56px)",alignItems:"center"},children:[" ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"18px",animation:"agni-rise .8s cubic-bezier(.22,1,.36,1) both"},children:[" ",e.jsx("span",{style:{background:"var(--color-accent-2-500)",color:"var(--color-accent-900)",borderRadius:"999px",alignSelf:"flex-start",padding:"7px 16px",fontSize:"11.5px",fontWeight:"700",letterSpacing:".12em",textTransform:"uppercase"},children:"Admissions 2027–28"})," ",e.jsx("h1",{style:{margin:"0",fontSize:"clamp(30px,3.6vw,48px)",lineHeight:"1.03",letterSpacing:"-.015em",color:"var(--color-bg)"},children:"Come and see a morning before you decide"})," ",e.jsx("p",{style:{margin:"0",maxWidth:"52ch",fontSize:"clamp(15.5px,1.2vw,17px)",lineHeight:"1.6",color:"var(--color-accent-2-200)"},children:"Applications are open for Nursery to Grade 10. Most families visit while classes are running, sit through a recitation period, and apply afterwards."})," ",e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",marginTop:"4px"},children:[" ",e.jsx("a",{href:"#enquire",style:{borderRadius:"999px",whiteSpace:"nowrap",padding:"14px 28px",fontSize:"15px",background:"var(--color-accent-2-500)",color:"var(--color-accent-900)",borderColor:"var(--color-accent-2-500)",fontWeight:"600"},className:o("btn"),children:"Start an enquiry"})," ",e.jsx("a",{href:"#fees",style:{borderRadius:"999px",whiteSpace:"nowrap",padding:"14px 28px",fontSize:"15px",background:"transparent",borderColor:"var(--color-accent-2-200)",color:"var(--color-bg)"},className:o("btn"),children:"Fee structure"})," "]})," "]})," ",e.jsxs("figure",{style:{minWidth:"0",margin:"0",borderRadius:"var(--radius-lg)",overflow:"hidden",aspectRatio:"4/3",background:"var(--color-accent-800)"},className:o("washed"),children:[" ",e.jsx("img",{src:"/images/hero-a.webp",alt:"Students walking across the gurukulam courtyard in the morning",decoding:"async",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"70% 50%",display:"block"}})," "]})," "]})," "]})," ",e.jsxs("section",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)",display:"flex",flexDirection:"column",gap:"clamp(24px,3vw,38px)"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"11px",maxWidth:"56ch"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"How to apply"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06"},children:"Four steps, start to seat"})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(196px,100%),1fr))",gap:"20px"},children:[" ",c(t.steps).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("article",{style:{minWidth:"0",borderTop:"3px solid var(--color-accent-2-500)",paddingTop:"20px",display:"flex",flexDirection:"column",gap:"9px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"32px",lineHeight:"1",color:"var(--color-accent-2-600)"},children:r(n==null?void 0:n.n)})," ",e.jsx("h3",{style:{margin:"0",fontSize:"20px"},children:r(n==null?void 0:n.title)})," ",e.jsx("p",{style:{margin:"0",fontSize:"15px",lineHeight:"1.6",color:"var(--color-neutral-800)"},children:r(n==null?void 0:n.body)})," "]})," "]},a))," "]})," "]})," ",e.jsxs("section",{style:{background:"var(--color-accent-2-100)",padding:"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(320px,100%),1fr))",gap:"clamp(26px,3.4vw,44px)",alignItems:"start"},children:[" ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"18px"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Eligibility"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06",color:"var(--color-accent-900)"},children:"Age on 1 June 2027"})," "]})," ",e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"15px"},className:o("table"),children:[" ",e.jsxs("thead",{children:[" ",e.jsxs("tr",{children:[" ",e.jsx("th",{style:{textAlign:"left",padding:"12px 14px",fontSize:"12px",letterSpacing:".12em",textTransform:"uppercase"},children:"Class"})," ",e.jsx("th",{style:{textAlign:"left",padding:"12px 14px",fontSize:"12px",letterSpacing:".12em",textTransform:"uppercase"},children:"Age"})," ",e.jsx("th",{style:{textAlign:"left",padding:"12px 14px",fontSize:"12px",letterSpacing:".12em",textTransform:"uppercase"},children:"Seats"})," "]})," "]})," ",e.jsxs("tbody",{children:[" ",c(t.eligibility).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("tr",{children:[" ",e.jsx("td",{style:{padding:"12px 14px",borderTop:"1px solid var(--color-divider)"},children:r(n==null?void 0:n.cls)})," ",e.jsx("td",{style:{padding:"12px 14px",borderTop:"1px solid var(--color-divider)"},children:r(n==null?void 0:n.age)})," ",e.jsx("td",{style:{padding:"12px 14px",borderTop:"1px solid var(--color-divider)"},children:r(n==null?void 0:n.seats)})," "]})," "]},a))," "]})," "]})," ",e.jsx("span",{style:{fontSize:"13px",lineHeight:"1.6",color:"var(--color-neutral-700)"},children:"Placeholder figures. The office will confirm the cut-off date and seat count for each class."})," "]})," ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"18px"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Documents"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06",color:"var(--color-accent-900)"},children:"What to bring"})," "]})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[" ",c(t.documents).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("span",{style:{display:"flex",gap:"12px",alignItems:"flex-start",padding:"12px 0",borderBottom:"1px solid var(--color-divider)",fontSize:"15px",lineHeight:"1.55"},children:[" ",e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"var(--color-accent)",strokeWidth:"2.9",strokeLinecap:"round",strokeLinejoin:"round",style:{flex:"0 0 auto",marginTop:"2px"},children:e.jsx("path",{d:"m4.5 12.5 4.5 4.5 10-10"})}),`
              `,r(n==null?void 0:n.text),`
            `]})," "]},a))," "]})," "]})," "]})," "]})," ",e.jsxs("section",{id:"fees",style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)",display:"flex",flexDirection:"column",gap:"clamp(24px,3vw,36px)"},children:[" ",e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"18px",alignItems:"flex-end",justifyContent:"space-between"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"50ch"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Fees"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06"},children:"Fee structure, 2027–28"})," "]})," ",e.jsx("button",{onClick:t.toggleFees,style:{fontSize:"15px",whiteSpace:"nowrap",cursor:"pointer"},className:o("btn btn-ghost"),children:r(t.feeToggleLabel)})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(260px,100%),1fr))",gap:"20px"},children:[" ",c(t.fees).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("article",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(22px,2.6vw,30px)",boxShadow:"var(--shadow-sm)",display:"flex",flexDirection:"column",gap:"12px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".16em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:r(n==null?void 0:n.stage)})," ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"clamp(24px,2.1vw,30px)",lineHeight:"1",color:"var(--color-accent-900)"},children:r(n==null?void 0:n.amount)})," ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.55",color:"var(--color-neutral-800)"},children:r(n==null?void 0:n.note)})," "]})," "]},a))," "]})," ",t.feesOpen?e.jsxs(e.Fragment,{children:[" ",e.jsxs("div",{style:{background:"var(--color-surface)",borderRadius:"var(--radius-lg)",padding:"clamp(20px,2.4vw,28px)",display:"flex",flexDirection:"column",gap:"14px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"19px"},children:"What the fee covers"})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(240px,100%),1fr))",gap:"10px 24px"},children:[" ",c(t.feeIncludes).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.55",padding:"8px 0",borderBottom:"1px solid var(--color-divider)"},children:r(n==null?void 0:n.text)})," "]},a))," "]})," ",e.jsx("span",{style:{fontSize:"13px",lineHeight:"1.6",color:"var(--color-neutral-700)"},children:"Transport, examination board charges and uniforms are billed separately. Figures are placeholders pending the school's fee circular."})," "]})," "]}):null," "]})," ",e.jsxs("section",{style:{background:"var(--color-accent-900)",color:"var(--color-accent-2-200)",padding:"clamp(34px,3.8vw,58px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"flex",flexDirection:"column",gap:"clamp(20px,2.6vw,30px)"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"50ch"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-2-500)"},children:"Key dates"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06",color:"var(--color-bg)"},children:"The admission year at a glance"})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(210px,100%),1fr))",gap:"1px",background:"color-mix(in srgb,var(--color-accent-2-200) 22%,transparent)",borderRadius:"var(--radius-lg)",overflow:"hidden"},children:[" ",c(t.dates).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("div",{style:{minWidth:"0",background:"var(--color-accent-900)",padding:"20px",display:"flex",flexDirection:"column",gap:"7px"},children:[" ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"21px",color:"var(--color-accent-2-400)"},children:r(n==null?void 0:n.when)})," ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.5"},children:r(n==null?void 0:n.what)})," "]})," "]},a))," "]})," "]})," "]})," ",e.jsxs("section",{id:"enquire",style:{position:"relative",overflow:"hidden",background:"var(--color-marigold-soft)",padding:"clamp(38px,4.4vw,68px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsx("img",{src:"/assets/img-01-961cb5.png",alt:"",style:{position:"absolute",left:"50%",top:"50%",width:"min(900px,110%)",opacity:".10",animation:"agni-spin 300s linear infinite reverse",pointerEvents:"none"}})," ",e.jsxs("div",{style:{position:"relative",maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(320px,100%),1fr))",gap:"clamp(26px,4vw,52px)",alignItems:"start"},children:[" ",e.jsxs("div",{style:{minWidth:"0",display:"flex",flexDirection:"column",gap:"16px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-800)"},children:"Enquiry"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06",color:"var(--color-accent-900)"},children:"Leave your details and the office will call"})," ",e.jsx("p",{style:{margin:"0",maxWidth:"46ch",fontSize:"15.5px",lineHeight:"1.62",color:"var(--color-accent-900)"},children:"Or telephone +91 96860 52212 between 9 am and 4 pm on a weekday. Visits are welcome on weekday mornings while classes are running."})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",fontSize:"15px",color:"var(--color-accent-900)"},children:[" ",e.jsx("span",{children:"No.2, Raghavasadanam, Pampa Mahakavi Road"})," ",e.jsx("span",{children:"Uttaradi Math compound, Shankarapuram, Basavanagudi"})," ",e.jsx("span",{children:"Bengaluru 560004"})," "]})," "]})," ",t.sent?e.jsxs(e.Fragment,{children:[" ",e.jsxs("div",{style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(24px,3vw,34px)",boxShadow:"var(--shadow-md)",display:"flex",flexDirection:"column",gap:"14px",alignItems:"flex-start"},children:[" ",e.jsxs("span",{style:{width:"52px",height:"52px",borderRadius:"999px",background:"var(--color-accent-2-300)",color:"var(--color-accent-900)",display:"flex",alignItems:"center",justifyContent:"center"},children:[" ",e.jsx("svg",{width:"26",height:"26",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.9",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m4.5 12.5 4.5 4.5 10-10"})})," "]})," ",e.jsx("span",{style:{fontFamily:"var(--font-heading)",fontSize:"23px"},children:"Thank you — we have your enquiry"})," ",e.jsx("p",{style:{margin:"0",fontSize:"15.5px",lineHeight:"1.6",color:"var(--color-neutral-800)"},children:"The office will telephone within two working days to arrange a morning visit."})," ",e.jsx("button",{onClick:t.resetForm,style:{fontSize:"15px",cursor:"pointer",whiteSpace:"nowrap"},className:o("btn btn-ghost"),children:"Send another enquiry"})," "]})," "]}):null," ",t.notSent?e.jsxs(e.Fragment,{children:[" ",e.jsxs("form",{onSubmit:t.submit,style:{minWidth:"0",background:"var(--color-neutral-100)",borderRadius:"var(--radius-lg)",padding:"clamp(24px,3vw,34px)",boxShadow:"var(--shadow-md)",display:"flex",flexDirection:"column",gap:"16px"},children:[" ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Parent's name"})," ",e.jsx("input",{type:"text",required:!0,style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)"},className:o("input")})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(160px,100%),1fr))",gap:"16px"},children:[" ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Mobile"})," ",e.jsx("input",{type:"tel",required:!0,style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)"},className:o("input")})," "]})," ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Email"})," ",e.jsx("input",{type:"email",style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)"},className:o("input")})," "]})," "]})," ",e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(160px,100%),1fr))",gap:"16px"},children:[" ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Child's name"})," ",e.jsx("input",{type:"text",style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)"},className:o("input")})," "]})," ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px",minWidth:"0"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Class applying for"})," ",e.jsxs("select",{style:{borderRadius:"999px",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)",background:"var(--color-neutral-100)"},className:o("input"),children:[" ",e.jsx("option",{children:"Nursery"})," ",e.jsx("option",{children:"LKG"})," ",e.jsx("option",{children:"UKG"})," ",e.jsx("option",{children:"Grade 1 – 5"})," ",e.jsx("option",{children:"Grade 6 – 8"})," ",e.jsx("option",{children:"Grade 9 – 10"})," "]})," "]})," "]})," ",e.jsxs("label",{style:{display:"flex",flexDirection:"column",gap:"7px"},children:[" ",e.jsx("span",{style:{fontSize:"13px",fontWeight:"600"},children:"Anything you would like us to know"})," ",e.jsx("textarea",{rows:"3",style:{borderRadius:"var(--radius-md)",padding:"12px 18px",fontSize:"15px",border:"1px solid var(--color-divider)",fontFamily:"inherit",resize:"vertical"},className:o("input")})," "]})," ",e.jsx("button",{type:"submit",style:{borderRadius:"999px",padding:"14px 28px",fontSize:"15px",fontWeight:"600",cursor:"pointer",justifyContent:"center",background:"var(--color-accent)",color:"var(--color-accent-2-100)",borderColor:"var(--color-accent)"},className:o("btn",s("hover","background:var(--color-accent-700)")),children:"Send enquiry"})," ",e.jsx("span",{style:{fontSize:"12.5px",lineHeight:"1.55",color:"var(--color-neutral-700)"},children:"We use these details only to contact you about admission."})," "]})," "]}):null," "]})," "]})," ",e.jsxs("section",{style:{maxWidth:"calc(1200px + 2*clamp(18px,3.4vw,52px))",margin:"0 auto",padding:"clamp(38px,4.2vw,64px) clamp(18px,3.4vw,52px)",display:"flex",flexDirection:"column",gap:"clamp(20px,2.6vw,30px)"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",maxWidth:"52ch"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".2em",textTransform:"uppercase",color:"var(--color-accent-700)"},children:"Parents ask"})," ",e.jsx("h2",{style:{margin:"0",fontSize:"clamp(23px,2.2vw,31px)",lineHeight:"1.06"},children:"Questions about admission"})," "]})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0"},children:[" ",c(t.faqs).map((n,a)=>e.jsxs(d.Fragment,{children:[" ",e.jsxs("div",{style:{borderBottom:"1px solid var(--color-divider)"},children:[" ",e.jsxs("button",{onClick:n==null?void 0:n.toggle,style:{width:"100%",background:"none",border:"0",padding:"19px 0",font:"inherit",textAlign:"left",cursor:"pointer",display:"flex",gap:"18px",alignItems:"baseline",color:"inherit"},children:[" ",e.jsx("span",{style:{flex:"1 1 auto",fontSize:"17px",fontWeight:"600",lineHeight:"1.4"},children:r(n==null?void 0:n.q)})," ",e.jsx("span",{style:{flex:"0 0 auto",fontFamily:"var(--font-heading)",fontSize:"23px",color:"var(--color-accent)"},children:r(n==null?void 0:n.sign)})," "]})," ",n!=null&&n.open?e.jsxs(e.Fragment,{children:[" ",e.jsx("p",{style:{margin:"0",padding:"0 0 20px",maxWidth:"70ch",fontSize:"15.5px",lineHeight:"1.62",color:"var(--color-neutral-800)"},children:r(n==null?void 0:n.a)})," "]}):null," "]})," "]},a))," "]})," "]})," ",e.jsxs("footer",{style:{background:"#1E120D",color:"var(--color-accent-2-200)",padding:"clamp(34px,3.8vw,56px) clamp(18px,3.4vw,52px)"},children:[" ",e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",display:"flex",flexWrap:"wrap",gap:"clamp(24px,4vw,56px)",justifyContent:"space-between",alignItems:"flex-start"},children:[" ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px",maxWidth:"38ch"},children:[" ",e.jsx("img",{src:"/assets/img-06-f5e5bb.png",alt:"Arundhati Gurukulam",style:{height:"62px",width:"auto"}})," ",e.jsx("span",{style:{fontSize:"14.5px",lineHeight:"1.6"},children:"No.2, Raghavasadanam, Pampa Mahakavi Road, Shankarapuram, Basavanagudi, Bengaluru 560004"})," "]})," ",e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"11px",fontSize:"14.5px"},children:[" ",e.jsx("span",{style:{fontSize:"11.5px",letterSpacing:".18em",textTransform:"uppercase",color:"var(--color-accent-2-500)"},children:"Admissions"})," ",e.jsx("a",{href:"#enquire",style:{color:"inherit",textDecoration:"none"},children:"Enquiry form"})," ",e.jsx("a",{href:"#fees",style:{color:"inherit",textDecoration:"none"},children:"Fee structure"})," ",e.jsx("a",{href:"/login",style:{color:"inherit",textDecoration:"none"},children:"Family Login"})," ",e.jsx("a",{href:"/contact",style:{color:"inherit",textDecoration:"none"},children:"Contact"})," ",e.jsx("a",{href:"/",style:{color:"inherit",textDecoration:"none"},children:"Back to home"})," "]})," "]})," "]})]})})}const j=`/* Organic — design-system tokens and component classes. This file is the source of truth for the system's look; retune it here and see readme.md. */
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
@keyframes agni-spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes agni-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
`,k=b(w,U,j,{},"AdmissionsPage");export{k as default};
