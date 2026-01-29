import{r as e,j as i,L as a}from"./react-vendor-CnOlrB0I.js";import{I as o}from"./Icon-BD9tpDN5.js";import"./vendor-DjvxAnNl.js";import"./analytics-vendor-BocwnPCo.js";import"./SearchIcon-D9B65esp.js";import"./ExternalLinkIcon-DSlBpA03.js";function f(){const[s,n]=e.useState(!1);return e.useEffect(()=>{const t=()=>{const r=window.scrollY;n(r>500)};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}},[]),s?i.jsxs("div",{style:{position:"fixed",bottom:0,left:0,right:0,backgroundColor:"rgba(15, 23, 42, 0.95)",backdropFilter:"blur(10px)",borderTop:"2px solid var(--color-primary-600)",boxShadow:"0 -4px 20px rgba(0, 0, 0, 0.3)",padding:"var(--spacing-md) var(--spacing-lg)",zIndex:999,animation:"slideUp 0.3s ease-out",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--spacing-md)",flexWrap:"wrap"},children:[i.jsxs("div",{style:{flex:"1",minWidth:"200px",color:"white"},children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:600,marginBottom:"4px"},children:"Ready to improve your AI visibility?"}),i.jsx("div",{style:{fontSize:"14px",color:"#F3F4F6"},children:"Get your free AI Visibility Score in 60 seconds"})]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-md)",flexWrap:"wrap"},children:[i.jsxs("div",{style:{fontSize:"14px",color:"#84CC16",fontWeight:600,display:"flex",alignItems:"center",gap:"6px"},children:[i.jsx(o,{name:"check-circle",size:18}),"From £59/month"]}),i.jsxs(a,{to:"/free-score",className:"button btn-hover",style:{fontSize:"16px",padding:"var(--spacing-sm) var(--spacing-lg)",display:"inline-flex",alignItems:"center",gap:"var(--spacing-sm)",whiteSpace:"nowrap"},children:["See if AI would recommend you",i.jsx(o,{name:"arrow-right",size:18})]})]}),i.jsx("style",{children:`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Mobile-first responsive design - reduce sticky footer height */
        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="bottom: 0"] {
            padding: 12px 16px !important;
            max-height: 25vh !important;
            overflow: hidden;
          }
          
          div[style*="position: fixed"] > div:first-child {
            min-width: 100% !important;
            margin-bottom: 8px;
          }
          
          div[style*="position: fixed"] > div:first-child > div:first-child {
            font-size: 16px !important;
            margin-bottom: 2px !important;
          }
          
          div[style*="position: fixed"] > div:first-child > div:last-child {
            font-size: 13px !important;
            display: none; /* Hide secondary text on mobile to save space */
          }
          
          div[style*="position: fixed"] > div:last-child {
            width: 100%;
            justify-content: center;
            gap: 8px !important;
          }
          
          div[style*="position: fixed"] > div:last-child > div {
            display: none; /* Hide pricing text on mobile */
          }
          
          div[style*="position: fixed"] a.button {
            font-size: 15px !important;
            padding: 10px 20px !important;
            width: 100%;
            justify-content: center;
          }
        }
        
        /* Ensure no horizontal overflow */
        @media (max-width: 768px) {
          div[style*="position: fixed"] {
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `})]}):null}export{f as default};
//# sourceMappingURL=StickyCTABar-Dw2ekt1j.js.map
