import{j as r}from"./index-CwooE_6F.js";import{b as x}from"./react-vendor-W4wuewm-.js";import{g as m}from"./ecePillars-Cqc21qRE.js";import{P as p}from"./PillarTooltip-DW3jzAIg.js";function g({pillarScores:t,loading:s=!1}){const o=m(),a=e=>{if(!t||!t[e])return 0;const{score:i,maxScore:n}=t[e];return n>0?Math.round(i/n*100):0},l=e=>e>=75?"#84cc16":e>=50?"#eab308":e>=25?"#f97316":"#ef4444",d=e=>e>=75?"Strong":e>=50?"Good":e>=25?"Fair":"Needs Work";return s?r.jsxs("div",{className:"ece-pillar-breakdown loading",children:[r.jsx("div",{className:"loading-spinner"}),r.jsx("p",{children:"Loading ECE™ breakdown..."})]}):r.jsxs("div",{className:"ece-pillar-breakdown",children:[r.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"var(--spacing-lg)"},children:r.jsxs("div",{children:[r.jsx("h2",{style:{margin:0,fontSize:"24px",marginBottom:"var(--spacing-xs)"},children:"ECE Pillar Breakdown"}),r.jsx("p",{style:{margin:0,fontSize:"14px",color:"var(--color-text-secondary)"},children:"Entity Confidence Engineering™ across 5 key pillars"})]})}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"var(--spacing-lg)"},children:o.map(e=>{const i=a(e.id),n=l(i),c=d(i);return r.jsx("div",{className:"pillar-card",style:{backgroundColor:"var(--color-surface)",border:"1px solid var(--color-border)",borderRadius:"var(--radius-lg)",padding:"var(--spacing-lg)",transition:"all 0.2s ease",cursor:"help"},children:r.jsxs(p,{pillarId:e.id,children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"var(--spacing-md)"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm)"},children:[r.jsx("span",{style:{fontSize:"24px",lineHeight:1},children:e.icon}),r.jsxs("div",{children:[r.jsx("h3",{style:{margin:0,fontSize:"16px",fontWeight:600,color:"var(--color-text)"},children:e.name}),r.jsx("p",{style:{margin:0,fontSize:"12px",color:"var(--color-text-secondary)"},children:e.description})]})]}),r.jsxs("div",{style:{textAlign:"right"},children:[r.jsx("div",{style:{fontSize:"28px",fontWeight:700,lineHeight:1,color:n,marginBottom:"2px"},children:i}),r.jsx("div",{style:{fontSize:"11px",fontWeight:600,color:n,textTransform:"uppercase",letterSpacing:"0.5px"},children:c})]})]}),r.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"var(--color-border)",borderRadius:"var(--radius-full)",overflow:"hidden",position:"relative"},children:r.jsx("div",{style:{width:`${i}%`,height:"100%",backgroundColor:n,borderRadius:"var(--radius-full)",transition:"width 0.6s ease",position:"relative",overflow:"hidden"},children:r.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",animation:"shimmer 2s infinite"}})})}),t&&t[e.id]&&r.jsxs("div",{style:{marginTop:"var(--spacing-sm)",fontSize:"12px",color:"var(--color-text-secondary)",display:"flex",justifyContent:"space-between"},children:[r.jsxs("span",{children:[t[e.id].score," / ",t[e.id].maxScore," points"]}),r.jsx("span",{style:{fontStyle:"italic"},children:"Hover for details"})]})]})},e.id)})}),r.jsx("style",{jsx:!0,children:`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .pillar-card:hover {
          border-color: var(--color-primary-400);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .ece-pillar-breakdown {
            grid-template-columns: 1fr;
          }
        }
      `})]})}const y=x.memo(g);export{y as E};
//# sourceMappingURL=ECEPillarBreakdown-DqRGW5GB.js.map
