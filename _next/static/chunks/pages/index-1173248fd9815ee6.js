(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4400)}])},4400:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return ea},default:function(){return ei}});var r=n(5893),a=n(9008),i=n.n(a),o=n(7294),l=n(8776),s=n(8973),c=n(9089),d=n(8837),h=n(9757),u=n(1035),x=n(918),g=n(4177);function p(e){return"".concat(e,"px")}function m(e,t){return"translate(".concat(e,", ").concat(t,")")}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=Math.pow(10,t);return Math.round(e*n)/n}var y=n(990),j=n.n(y);function v(e){let{xScale:t,ticks:n,majorTicks:a,y:i=0,format:o=e=>e.toString(),tickLength:l=6}=e;void 0==n&&(n=t.ticks()),void 0==a&&(a=n);let s=t.range();return(0,r.jsxs)("g",{className:[j().axis,j().axisX].join(" "),transform:m(0,i),children:[(0,r.jsx)("line",{className:j().connector,x1:s[0],x2:s[1]}),n.map(e=>(0,r.jsx)(_,{x:t(e),length:l},e)),a.map(e=>(0,r.jsx)(_,{x:t(e),length:l,renderLine:!(null==n?void 0:n.includes(e)),children:(0,r.jsx)("text",{dy:"1em",transform:m(0,l),children:o(e)})},e))]})}let _=e=>{let{x:t,length:n,renderLine:a=!0,children:i}=e;return(0,r.jsxs)("g",{className:j().tick,transform:m(t,0),children:[a&&(0,r.jsx)("line",{y2:n}),i]})};function b(e){let{yScale:t,ticks:n,tickX:a=0,tickLength:i=6,format:o=e=>e.toString()}=e;return void 0==n&&(n=t.ticks()),(0,r.jsx)("g",{className:[j().axis,j().axisY].join(" "),children:n.map(e=>(0,r.jsx)(k,{x:a,y:t(e),length:i,children:o(e)},e))})}let k=e=>{let{x:t,y:n,length:a,className:i="",children:o}=e;return(0,r.jsxs)("g",{className:[j().tick,i].join(" "),transform:m(0,n),children:[(0,r.jsx)("line",{x2:a,className:j().mute}),(0,r.jsx)("text",{x:t,dy:"0.3em",children:o})]})};function w(e){let{x:t=0,y:n=0,dx:a=0,dy:i=0,xAlign:o="left",children:l}=e;return(0,r.jsx)("text",{className:[j().label,j()[o],"text-outline"].join(" "),x:t,y:n,dx:a,dy:i,children:l})}var N=n(7645),S=n.n(N);function Z(e){let{x:t,y:n,r:a=0,position:i="right",children:o}=e,l="0px",s="0px";return"right"===i?(t+=a,l="2px",s="0.35em"):"top"===i?(n-=a,l="-10px"):"bottom"===i&&(n+=a,s="1em"),(0,r.jsx)("text",{className:[S().annotation,"text-outline-sm"].join(" "),style:{textAnchor:{top:"end",right:"start",bottom:"middle"}[i]},x:t,y:n,dx:l,dy:s,children:o})}function A(e){let{x:t,y:n,r:a,color:i="var(--c-blue)"}=e;return(0,r.jsx)("circle",{cx:t,cy:n,r:a,stroke:"white",strokeWidth:"0.5",fill:i,fillOpacity:"0.8"})}function C(e){let{data:t,annotatedCountries:n=[],xGet:a,yGet:i,rGet:l,color:s=()=>"var(--c-blue)"}=e,c=(0,o.useMemo)(()=>t.filter(e=>n.includes(e.country)).sort((e,t)=>(0,h.Z)(e.population,t.population)),[t,n]);return(0,r.jsxs)("g",{children:[(0,r.jsx)("g",{children:t.map(e=>(0,r.jsx)(A,{x:a(e),y:i(e),r:l(e),color:s(e)},e.country))}),c.map(e=>(0,r.jsx)(Z,{x:a(e),y:i(e),r:l(e),position:"China"===e.country||"India"===e.country?"top":"right",children:e.country},e.country))]})}var M=n(2677),E=n(9671);function G(e){let{data:t}=e;if(0===t.length)return null;let n=(0,M.Z)(t,e=>e.gdp),a=(0,E.Z)(t,e=>e.gdp),i=(0,M.Z)(t,e=>e.lifeExpectancy),o=(0,E.Z)(t,e=>e.lifeExpectancy);return(0,r.jsxs)("p",{children:["Health and wealth of ",t.length," nations in ",t[0].year,". Average life expectancy reaches from ",t[i].lifeExpectancy," ","years in ",t[i].country," to"," ",t[o].lifeExpectancy," years in"," ",t[o].country,". Income per person reaches from $",f(t[n].gdp)," in ",t[n].country," to $",f(t[a].gdp)," in ",t[a].country,"."]})}var L=n(5668);function W(e){let{start:t,end:n,arrowHeadLength:a=6,arrowHeadRotation:i=45,color:o="var(--c-black)"}=e;return(0,r.jsx)("path",{d:function(e,t,n){let{arrowHeadLength:r=6,arrowHeadRotation:a=45}=n;return["M",e,"L",t].join(" ")+function(e,t){let{length:n=6,theta:r=45}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=t[0]-e[0],i=t[1]-e[1],o=n/Math.sqrt(Math.pow(a,2)+Math.pow(i,2)),l=[e[0]+a*o,e[1]+i*o];function s(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:45,r=n*Math.PI/180;return[t[0]+(e[0]-t[0])*Math.cos(r)-(e[1]-t[1])*Math.sin(r),t[1]+(e[0]-t[0])*Math.sin(r)+(e[1]-t[1])*Math.cos(r)]}return["M",s(l,e,r),"L",e,"L",s(l,e,-r)].join(" ")}(e,t,{length:r,theta:a})}(t,n,{arrowHeadLength:a,arrowHeadRotation:i}),stroke:o,fill:"none"})}function H(e){let{data:t,xGet:n,yGet:a,rGet:i,ticks:l=[],color:s="var(--c-black)",config:c}=e,d={arrowLength:24,annotationRadius:6,padding:4,...c},h=(0,L.Z)().x(n).y(a),u=t.length>=2&&t[0],x=t.length>0&&t[t.length-1];return(0,r.jsxs)("g",{children:[(0,r.jsx)("path",{d:h(t),stroke:s,strokeWidth:"2",fill:"none"}),u&&(0,r.jsxs)("g",{children:[(0,r.jsx)(A,{x:n(u),y:a(u),r:i(u),color:s}),(0,r.jsx)(Z,{x:n(u),y:a(u),r:i(u),position:"bottom",children:(0,r.jsx)("tspan",{style:{fontWeight:"bold"},children:u.year})})]}),x&&(0,r.jsx)(A,{x:n(x),y:a(x),r:i(x),color:s}),l.map(e=>(0,r.jsxs)(o.Fragment,{children:[(0,r.jsx)("circle",{cx:n(e),cy:a(e),r:d.annotationRadius,stroke:"var(--c-black)",fill:"none"}),(0,r.jsx)(W,{start:[n(e)+d.annotationRadius+d.padding,a(e)],end:[n(e)+d.annotationRadius+d.padding+d.arrowLength,a(e)]})]},e.year))]})}function I(e){let{data:t}=e;if(0===t.length)return null;let n=t[0].country,a=t.length>=2&&t[0],i=t[t.length-1];return(0,r.jsxs)("p",{children:["Health and Wealth of ",n,a&&" from ".concat(t[0].year," to ").concat(t[t.length-1].year),"."," ",a&&R(a)," ",R(i)]})}function R(e){return["In ".concat(e.year,","),"the average life expectancy was ".concat(e.lifeExpectancy," years"),"with an income per person of $".concat(f(e.gdp),".")].join(" ")}function X(e){let{dimensions:t,x:n,y:a,r:i=0,position:o="right",children:l}=e,s="0px",c="0px";return"right"===o&&(n+=i,s="2px",c="calc(-50% + ".concat(c,")")),(0,r.jsx)("div",{className:[S().annotation,"text-outline-sm"].join(" "),style:{left:p(n),top:p(a),transform:m(s,c),width:p(t.boundedWidth-n+t.margins.right)},children:l})}var z=n(8354);let T=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{initialWidth:t=800,ratio:n=16/9,minHeight:r=300,maxHeight:a=400}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=(0,o.useRef)(null),l={top:e.top||0,right:e.right||0,bottom:e.bottom||0,left:e.left||0},[s,c]=(0,o.useState)(t);(0,o.useEffect)(()=>{let e=i.current,t=new z.do(e=>{if(!Array.isArray(e)||0===e.length)return;let t=e[0];c(t.contentRect.width)});return t.observe(e),()=>t.unobserve(e)},[]);let d=Math.min(Math.max(1/n*s,r),a),h={margins:l,width:s,height:d,boundedHeight:Math.max(d-l.top-l.bottom,0),boundedWidth:Math.max(s-l.left-l.right,0)};return{ref:i,dimensions:h}};var F=n(9796),O=n.n(F);function P(e){let{data:t,annotatedCountries:n=[],highlightedCountry:a,year:i,domainX:s,domainY:f,domainR:y,rangeR:j=[2,10],minorTicksX:_,majorTicksX:k,ticksY:N,ticksZ:S=[],tickFormatX:Z=e=>e.toString(),tickFormatY:A=e=>e.toString(),tickFormatZ:M=e=>e.toString(),color:E=()=>"var(--c-blue)"}=e,L={ticksZ:{arrowLength:24,annotationRadius:6,padding:4}},{ref:W,dimensions:R}=T({bottom:20,left:20,right:60});i=i||(0,l.Z)(t,e=>e.year),s=s||(0,c.Z)(t,e=>e.gdp),f=f||(0,c.Z)(t,e=>e.lifeExpectancy),y=y||(0,c.Z)(t,e=>e.population);let z=(0,u.Z)().domain(s).range([0,R.boundedWidth]),F=(0,x.Z)().domain(f).range([R.boundedHeight,0]).nice(),P=(0,g._b)().domain(y).range(j),Q=e=>z(e.gdp),U=e=>F(e.lifeExpectancy),V=e=>P(e.population),Y=(0,o.useMemo)(()=>t.filter(e=>e.year===i).sort((e,t)=>(0,d.Z)(e.population,t.population)),[t,i]),$=(0,o.useMemo)(()=>{if(a)return t.filter(e=>e.country===a).sort((e,t)=>(0,h.Z)(e.year,t.year))},[t,a]),q=$&&$.length>=1;N=N||F.ticks();let B=N[N.length-1],D=[];if(q){let J=new Map($.map(e=>[e.year,e]));for(let K=0;K<S.length;K++){let ee=S[K];J.has(ee)&&D.push(J.get(ee))}}return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"visually-hidden",children:[(0,r.jsxs)("hgroup",{children:[(0,r.jsx)("h2",{children:"Scatter plot: Health and Wealth of Nations"}),(0,r.jsx)("p",{children:"Average life expectancy plotted against income per person"})]}),q?(0,r.jsx)(I,{data:$}):(0,r.jsx)(G,{data:Y})]}),(0,r.jsxs)("div",{className:O().chart,ref:W,"aria-hidden":"true",children:[(0,r.jsx)("svg",{className:O().svg,width:R.width,height:R.height,children:(0,r.jsxs)("g",{transform:m(R.margins.left,R.margins.top),children:[(0,r.jsx)(b,{yScale:F,ticks:N,tickX:-R.margins.left,tickLength:R.boundedWidth,format:A}),(0,r.jsx)(v,{xScale:z,ticks:_,majorTicks:k,y:R.boundedHeight,format:Z}),q?(0,r.jsx)(H,{data:$,xGet:Q,yGet:U,rGet:V,color:E($[0]),ticks:D,config:L.ticksZ}):(0,r.jsx)(C,{data:Y,xGet:Q,yGet:U,rGet:V,color:E,annotatedCountries:n}),(0,r.jsx)(w,{x:R.boundedWidth,y:R.boundedHeight,dy:"-8",xAlign:"right",children:"Income per person"}),(0,r.jsxs)(w,{x:-R.margins.left,y:F(B),dy:"0.3em",children:[A(B)," years",(0,r.jsx)("tspan",{x:-R.margins.left,dy:"1.1em",children:"Life expectancy"})]})]})}),(0,r.jsxs)("div",{className:O().htmlCanvas,style:{width:p(R.boundedWidth),height:p(R.boundedHeight),top:p(R.margins.top),left:p(R.margins.left)},children:[q&&(0,r.jsxs)(X,{dimensions:R,x:Q($[$.length-1]),y:U($[$.length-1]),r:V($[$.length-1]),children:[(0,r.jsx)("b",{children:$[$.length-1].year})," ",$[$.length-1].country]}),D.map(e=>(0,r.jsx)(X,{dimensions:R,x:Q(e)+L.ticksZ.arrowLength+L.ticksZ.annotationRadius+2*L.ticksZ.padding,y:U(e),children:(0,r.jsx)("span",{className:O().tickZ,children:M(e.year)})},e.year))]})]})]})}var Q=n(6318),U=n(8230),V=n(8670),Y=n.n(V);let $="#0f172a";var q=n(300),B=n.n(q);function D(e){let{id:t,label:n,placeholder:a,values:i,selectedValue:o,setSelectedValue:l,group:s,format:c=e=>e.toString(),color:d=()=>"var(--c-blue)",examples:h=[]}=e,u=(0,U.Q3)(i,e=>({label:s(e[0]),options:e.map(e=>({value:e,label:c(e)}))}),e=>s(e)).map(e=>{let[,t]=e;return t}),x=e=>(0,r.jsx)("div",{className:B().groupLabel,style:{color:d(e.options[0].value)},children:e.label});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{id:"".concat(t,"-label"),className:B().label,children:n}),(0,r.jsx)(Q.ZP,{instanceId:t,value:o?{label:c(o),value:o}:void 0,placeholder:a,options:u,formatGroupLabel:x,isClearable:!0,noOptionsMessage:()=>"No search results",onChange:e=>l(null==e?void 0:e.value),styles:{control:(e,t)=>({...e,fontSize:"var(--font-size-sm)",border:"1px solid var(--c-gray-400)","&:hover":{borderColor:"var(--c-gray-400)"},boxShadow:"none",outline:t.isFocused?"1.5px solid var(--c-focus)":"",outlineOffset:"0.1em"}),singleValue:(e,t)=>({...e,display:"flex",alignItems:"center",":before":{backgroundColor:d(t.data.value),borderRadius:"50%",content:'" "',display:"block",marginRight:"var(--s-px-2)",height:"0.6em",width:"0.6em"}}),option(e,t){let n=Y()(d(t.data.value)),r=Y().contrast(n,$)>=4.5?$:"rgb(255, 255, 255, 0.9)";return{...e,backgroundColor:t.isSelected?n.css():t.isFocused?n.alpha(.1).css():void 0,color:t.isSelected?r:"var(--c-black)",fontSize:"var(--font-size-sm)"}}},"aria-labelledby":"".concat(t,"-label")}),h.length>0&&(0,r.jsxs)("div",{className:B().examples,children:["Examples:"," ",(0,r.jsx)("div",{children:h.map(e=>(0,r.jsx)(J,{value:e,setValue:l,color:d(e),children:c(e)},e.toString()))})]})]})}function J(e){let{value:t,setValue:n,color:a=$,children:i}=e;return(0,r.jsx)("button",{type:"button",className:B().btnExample,onClick:()=>n(t),style:{"--color":a,"--color-light":Y()(a).alpha(.2).css()},children:i})}var K=n(3067),ee=n.n(K);function et(e){let{children:t}=e;return(0,r.jsx)("div",{className:ee().legend,children:t})}function en(e){let{color:t,children:n}=e;return(0,r.jsxs)("div",{className:ee().item,children:[(0,r.jsx)("span",{className:ee().shape,style:{backgroundColor:t}})," ",n]})}let er=e=>{let{data:t,continents:n}=e,[a,c]=(0,o.useState)(),d=new Map(n.map(e=>[e.country,e.continent])),h=[{continent:"Africa",color:"#4c3562"},{continent:"Asia",color:"#ea693e"},{continent:"Oceania",color:"#f2a335"},{continent:"North America",color:"#1f767a"},{continent:"South America",color:"#98cdaa"},{continent:"Europe",color:"#4a9dd9"},{continent:"Antarctica",color:"#aaa493"}],u=h.map(e=>e.continent),x=(0,s.Z)().domain(u).range(h.map(e=>e.color)).unknown($);return(0,r.jsxs)("div",{children:[(0,r.jsxs)(i(),{children:[(0,r.jsx)("title",{children:"Gapminder Chart"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("main",{children:[(0,r.jsx)("h1",{style:{marginBottom:"var(--s-rem-4)"},children:"Health and Wealth of Nations — Then and Now"}),(0,r.jsx)("div",{style:{marginBottom:"var(--s-rem-6)"},children:(0,r.jsx)(D,{id:"select-country",label:(0,r.jsxs)(r.Fragment,{children:["Explore how a country's health and wealth have"," ",(0,r.jsx)("b",{children:"changed over time:"})]}),placeholder:"Select a country...",values:[...new Set(t.map(e=>e.country))],selectedValue:a,setSelectedValue:c,group:e=>d.get(e),color:e=>x(d.get(e)),examples:["United States","United Kingdom","Italy","Qatar","South Africa"]})}),(0,r.jsxs)("div",{style:{marginBottom:"var(--s-rem-5)",color:"var(--c-gray-500)",fontSize:"var(--font-size-sm)"},"aria-hidden":"true",children:[(0,r.jsx)(et,{children:u.map(e=>(0,r.jsx)(en,{color:x(e),children:e},e))}),(0,r.jsx)("p",{style:{lineHeight:1,marginTop:"var(--s-rem-1)"},children:"Circles sized by population estimates"})]}),(0,r.jsx)(P,{data:t,annotatedCountries:["China","India","Russia","United States","Equatorial Guinea","Nigeria","North Korea","Central African Republic","Qatar"],highlightedCountry:a,domainX:[500,2e5],domainY:[10,(0,l.Z)(t,e=>e.lifeExpectancy)],rangeR:[4,40],minorTicksX:[1e3,2e3,3e3,4e3,5e3,6e3,7e3,8e3,9e3,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,9e4,1e5],majorTicksX:[1e3,1e4,1e5],ticksY:[20,30,40,50,60,70,80,90],ticksZ:[1918,1945],tickFormatX:e=>"$"+e/1e3+"k",tickFormatZ(e){switch(e){case 1918:return"End of World War I (".concat(e,")");case 1945:return"End of World War II (".concat(e,")");default:return e.toString()}},color:e=>x(d.get(e.country))}),(0,r.jsxs)("p",{style:{fontSize:"var(--font-size-xs)",color:"var(--c-gray-500)",lineHeight:1,marginTop:"var(--s-rem-2)"},children:["Source:"," ",(0,r.jsx)("a",{href:"https://www.gapminder.org/",target:"_blank",rel:"noreferrer",children:"Gapminder"})]})]})]})};var ea=!0,ei=er},7645:function(e){e.exports={annotation:"Annotation_annotation__8Dmvk"}},990:function(e){e.exports={axis:"Axis_axis__46Oy1",connector:"Axis_connector__HAoZw",tick:"Axis_tick__DeNe3",mute:"Axis_mute__4Pp1Q",axisX:"Axis_axisX__JyPlM",label:"Axis_label__xDFQg",left:"Axis_left__Ac7GQ",center:"Axis_center__duI3J",right:"Axis_right__Q4_aX"}},9796:function(e){e.exports={chart:"GapminderChart_chart__XfA_n",svg:"GapminderChart_svg__qaPwY",htmlCanvas:"GapminderChart_htmlCanvas__u2y5G",tickZ:"GapminderChart_tickZ__fgMaU"}},300:function(e){e.exports={label:"GroupedSelect_label__u3NdJ",groupLabel:"GroupedSelect_groupLabel__5wftr",examples:"GroupedSelect_examples__Cbezi",btnExample:"GroupedSelect_btnExample__hcZrg"}},3067:function(e){e.exports={legend:"Legend_legend__GsTrT",item:"Legend_item__N7npL",shape:"Legend_shape__HyfGl"}}},function(e){e.O(0,[57,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);