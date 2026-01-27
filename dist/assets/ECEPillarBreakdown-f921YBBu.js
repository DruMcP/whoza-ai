import{r as x,j as e}from"./react-vendor-ZcgRNTHg.js";import{g as p}from"./ecePillars-Cqc21qRE.js";import{P as m}from"./PillarTooltip-5ZqWslZ9.js";function g({pillarScores:t,loading:s=!1}){const o=p(),a=r=>{if(!t||!t[r])return 0;const{score:i,maxScore:n}=t[r];return n>0?Math.round(i/n*100):0},l=r=>r>=75?"#84cc16":r>=50?"#eab308":r>=25?"#f97316":"#ef4444",d=r=>r>=75?"Strong":r>=50?"Good":r>=25?"Fair":"Needs Work";return s?e.jsxs("div",{className:"ece-pillar-breakdown loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Loading ECE™ breakdown..."})]}):e.jsxs("div",{className:"ece-pillar-breakdown",children:[e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"var(--spacing-lg)"},children:e.jsxs("div",{children:[e.jsx("h2",{style:{margin:0,fontSize:"24px",marginBottom:"var(--spacing-xs)"},children:"ECE Pillar Breakdown"}),e.jsx("p",{style:{margin:0,fontSize:"14px",color:"var(--color-text-secondary)"},children:"Entity Confidence Engineering™ across 5 key pillars"})]})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"var(--spacing-lg)"},children:o.map(r=>{const i=a(r.id),n=l(i),c=d(i);return e.jsx("div",{className:"pillar-card",style:{backgroundColor:"var(--color-surface)",border:"1px solid var(--color-border)",borderRadius:"var(--radius-lg)",padding:"var(--spacing-lg)",transition:"all 0.2s ease",cursor:"help"},children:e.jsxs(m,{pillarId:r.id,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"var(--spacing-md)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--spacing-sm)"},children:[e.jsx("span",{style:{fontSize:"24px",lineHeight:1},children:r.icon}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"16px",fontWeight:600,color:"var(--color-text)"},children:r.name}),e.jsx("p",{style:{margin:0,fontSize:"12px",color:"var(--color-text-secondary)"},children:r.description})]})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontSize:"28px",fontWeight:700,lineHeight:1,color:n,marginBottom:"2px"},children:i}),e.jsx("div",{style:{fontSize:"11px",fontWeight:600,color:n,textTransform:"uppercase",letterSpacing:"0.5px"},children:c})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"var(--color-border)",borderRadius:"var(--radius-full)",overflow:"hidden",position:"relative"},children:e.jsx("div",{style:{width:`${i}%`,height:"100%",backgroundColor:n,borderRadius:"var(--radius-full)",transition:"width 0.6s ease",position:"relative",overflow:"hidden"},children:e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",animation:"shimmer 2s infinite"}})})}),t&&t[r.id]&&e.jsxs("div",{style:{marginTop:"var(--spacing-sm)",fontSize:"12px",color:"var(--color-text-secondary)",display:"flex",justifyContent:"space-between"},children:[e.jsxs("span",{children:[t[r.id].score," / ",t[r.id].maxScore," points"]}),e.jsx("span",{style:{fontStyle:"italic"},children:"Hover for details"})]})]})},r.id)})}),e.jsx("style",{jsx:!0,children:`
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
      `})]})}const u=x.memo(g);export{u as E};
//# sourceMappingURL=ECEPillarBreakdown-f921YBBu.js.map
