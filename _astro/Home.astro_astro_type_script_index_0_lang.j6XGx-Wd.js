import{m as z,g,S as k}from"./scroll.CfnrQLcq.js";import{_ as ne}from"./preload-helper.BlTxHScW.js";function se(){const t=document.querySelector("[data-hero]");if(!t||!z())return;const a=t.querySelector(".hero__stage");if(!a)return;const m=()=>Math.min(window.innerWidth*.3,340);g.timeline({scrollTrigger:{trigger:t,start:"top top",end:"bottom bottom",scrub:.55,invalidateOnRefresh:!0}}).to(a,{"--panel-x":"100%",ease:"power1.inOut"},0).to(a,{"--word-scale":1.22,ease:"power1.out"},0).to(a,{"--word-track":"-0.065em",ease:"power1.out"},0).to(a,{"--word-x":()=>`${m()}px`,ease:"power1.inOut"},0).to(a,{"--img-scale":1,ease:"none"},0).to(a,{"--img-veil":.22,ease:"none"},0).to(a,{"--cue-opacity":0,ease:"none",duration:.25},0).to(a,{"--role-opacity":.55,ease:"none",duration:.6},.2)}const ie=42,ce=120,le=220,ue=.3;function me(t){if(typeof Intl<"u"&&"Segmenter"in Intl){const a=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(a.segment(t),m=>m.segment)}return Array.from(t)}function pe(t){const a=t.querySelector("[data-about-figure]");a&&g.fromTo(a,{scale:ue},{scale:1,ease:"none",scrollTrigger:{trigger:t,start:"top bottom",end:"center center",scrub:.5}})}function de(t){const a=t.querySelector("[data-about-text]"),m=Array.from(t.querySelectorAll("[data-about-para]"));if(!a||m.length===0)return;const p=m.map(s=>({el:s,chars:me(s.textContent??"")})).filter(s=>s.chars.length>0);if(p.length===0)return;const A=document.createElement("div");A.className="visually-hidden",p.forEach(s=>{const d=document.createElement("p");d.textContent=s.chars.join(""),A.append(d)}),a.before(A),a.setAttribute("aria-hidden","true");const y=document.createElement("span");y.className="caret";const P=p.map(s=>{const d=document.createElement("span");d.className="about__sizer",d.textContent=s.chars.join("");const I=document.createElement("span");return I.className="about__typed",s.el.textContent="",s.el.append(d,I),s.el.classList.add("is-waiting"),I}),v=()=>{p.forEach((s,d)=>{P[d].textContent=s.chars.join(""),s.el.classList.remove("is-waiting")}),y.remove()};let w=-1,h=null,x=0,n=0,o=0,e=0;const c=s=>{if(w+=1,w>=p.length){y.remove();return}const d=p[w];h=document.createTextNode(""),P[w].append(h,y),d.el.classList.remove("is-waiting"),x=0,n=s,e=requestAnimationFrame(r)},r=s=>{if(o){if(s<o){e=requestAnimationFrame(r);return}o=0,c(s);return}const d=p[w],I=w===0?ie:ce,T=Math.min(d.chars.length,Math.floor((s-n)/1e3*I));if(T>x&&(x=T,h.data=d.chars.slice(0,x).join("")),x<d.chars.length){e=requestAnimationFrame(r);return}if(w+1>=p.length){y.remove();return}o=s+le,e=requestAnimationFrame(r)};if(!("IntersectionObserver"in window)){v();return}const u=new IntersectionObserver(s=>{s.forEach(d=>{d.isIntersecting&&(u.disconnect(),c(performance.now()))})},{threshold:.25});u.observe(a),window.addEventListener("pagehide",()=>cancelAnimationFrame(e),{once:!0})}function fe(){const t=document.querySelector("[data-about]");!t||!z()||(pe(t),de(t))}const l={gap:{z:.1,x:.055,y:.032},travelZ:1,stackedGap:.002,camera:{start:{x:2.15,y:.78,z:2.45},end:{x:0,y:0,z:2.6},fov:45},duration:{reveal:1.25,stagger:.1,converge:1.7},image:{scale:1.18,shiftX:.06},overscan:1.02},V=.45,D=130,ge=`
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uSize;
  varying vec2 vUv;
  varying float vReveal;

  float easeOutCubic(float x) { return 1.0 - pow(1.0 - x, 3.0); }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // هرچه نقطه از مرکز دورتر، دیرتر باز می‌شود — شکفتن از یک نقطه
    vec2 fromCenter = (uv - 0.5) * uSize;
    float dist = clamp(length(fromCenter) / length(uSize * 0.5), 0.0, 1.0);
    float t = clamp((uProgress - dist * ${V.toFixed(2)}) / (1.0 - ${V.toFixed(2)}), 0.0, 1.0);
    t = easeOutCubic(t);
    vReveal = t;

    pos.xy *= t;

    // کشِ منحنی حینِ باز شدن — عمودی بیشتر از افقی
    float tension = (1.0 - t) * dist;
    pos.x *= 1.0 + tension * 0.18;
    pos.y *= 1.0 + tension * 0.42;

    // برآمدگیِ لحظه‌ی باز شدن و یک موجِ خیلی ریزِ همیشگی روی سطح
    pos.z += sin(t * 3.14159265) * dist * 0.06;
    pos.z += sin(uv.x * 3.14159265 * 12.0 + uTime * 0.6) * 0.004 * t;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,ve=`
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uGrayscale;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uImageScale;
  uniform vec2 uImageShift;
  varying vec2 vUv;
  varying float vReveal;

  // مثل object-fit: cover
  vec2 coverUv(vec2 uv, float imageAspect, float planeAspect) {
    vec2 s = planeAspect < imageAspect
      ? vec2(planeAspect / imageAspect, 1.0)
      : vec2(1.0, imageAspect / planeAspect);
    return (uv - 0.5) * s + 0.5;
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    vec2 uv = coverUv(vUv, uImageAspect, uPlaneAspect);
    uv = (uv - 0.5) / uImageScale + 0.5;
    uv -= uImageShift;

    vec4 tex = texture2D(uTexture, uv);
    float luma = dot(tex.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 color = mix(tex.rgb, vec3(luma), uGrayscale);

    // دانه‌ی فیلمیِ زنده — بدون فایل بافت
    float grain = hash(floor(gl_FragCoord.xy) + fract(uTime * 7.0) * 61.0);
    color += (grain - 0.5) * 0.05;

    float alpha = tex.a * smoothstep(0.0, 0.35, vReveal);
    if (alpha < 0.002) discard;

    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;function he(){const t=document.querySelector("[data-expertise]");if(!t||!z())return;const a=t.querySelector("[data-xp-stage]"),m=t.querySelector("[data-xp-canvas]"),p=t.querySelector("[data-xp-scrim]"),A=t.querySelector("[data-xp-kicker]"),y=Array.from(t.querySelectorAll("[data-xp-item]")),P=y.map(e=>e.querySelector("img")?.getAttribute("src")??"");if(!a||!m||!p||!A||!y.length||P.some(e=>!e))return;t.classList.add("is-gl");const v=Array.from(t.querySelectorAll(".xp__ci")),w=Array.from(t.querySelectorAll(".xp__ci, .xp__n, .xp__wi"));g.set(A,{opacity:0,y:12}),g.set(w,{yPercent:D});let h=()=>{};const x=()=>{h(),g.set([A,...w],{clearProps:"all"}),t.classList.remove("is-gl"),k.refresh()},n=async e=>{const c=new e.WebGLRenderer({canvas:m,alpha:!0,antialias:!0,powerPreference:"high-performance"});c.setClearColor(0,0),h=()=>c.dispose();const r=new e.Scene,u=new e.PerspectiveCamera(l.camera.fov,1,.01,50),s=new e.Vector3(0,0,0),d=new e.Group;r.add(d);const I={full:0},T=[],G=()=>{const i=a.clientWidth,f=a.clientHeight;c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(i,f,!1),u.aspect=i/f,u.fov=u.aspect<1?l.camera.fov+(1-u.aspect)*28:l.camera.fov,u.updateProjectionMatrix()};G();const X=Math.min(1,u.aspect),M={x:l.camera.start.x*Math.min(1,Math.max(.5,u.aspect*1.2)),y:l.camera.start.y,z:l.camera.start.z+(1-X)*1.4};u.position.set(M.x,M.y,M.z),u.lookAt(s);const $=new e.TextureLoader,Y=await Promise.all(P.map(i=>$.loadAsync(i))),K=new e.PlaneGeometry(1,1,64,64),J=c.capabilities.getMaxAnisotropy();Y.forEach((i,f)=>{i.colorSpace=e.SRGBColorSpace,i.minFilter=e.LinearFilter,i.generateMipmaps=!1,i.anisotropy=J;const b=i.image,F=new e.ShaderMaterial({vertexShader:ge,fragmentShader:ve,uniforms:{uTime:{value:0},uProgress:{value:0},uSize:{value:new e.Vector2(1,1)},uTexture:{value:i},uGrayscale:{value:1},uImageAspect:{value:b.width/b.height},uPlaneAspect:{value:1},uImageScale:{value:l.image.scale},uImageShift:{value:new e.Vector2(0,0)}},transparent:!0,depthWrite:!1,side:e.DoubleSide}),C=new e.Mesh(K,F);C.userData.targetZ=-f*l.gap.z,C.position.set(f*l.gap.x,f*l.gap.y,C.userData.targetZ+l.travelZ),d.add(C),T.push(C)});const O=T[0],R=T.length,{reveal:Q,stagger:H,converge:L}=l.duration,Z={x:-(R-1)*l.gap.x/2,y:-(R-1)*l.gap.y/2};d.position.set(Z.x,Z.y,0);const E=g.timeline({paused:!0});T.forEach((i,f)=>{const b=(R-1-f)*H;E.fromTo(i.material.uniforms.uProgress,{value:0},{value:1,duration:2,ease:"power3.out",immediateRender:!1},b),E.fromTo(i.position,{z:i.userData.targetZ+l.travelZ},{z:i.userData.targetZ,duration:Q*1.2,ease:"power4.out",immediateRender:!1},b)});const S=g.timeline({paused:!0}),q=.35,_={immediateRender:!1};T.forEach((i,f)=>{S.fromTo(i.position,{x:f*l.gap.x,y:f*l.gap.y,z:i.userData.targetZ},{x:0,y:0,z:-f*l.stackedGap,duration:L,ease:"power3.inOut",..._},q)}),S.fromTo(d.position,{...Z},{x:0,y:0,duration:L,ease:"power3.inOut",..._},q),S.fromTo(u.position,{...M},{...l.camera.end,duration:L,ease:"power3.inOut",..._},q),S.fromTo(O.material.uniforms.uImageShift.value,{x:0},{x:l.image.shiftX,duration:L-.2,ease:"power3.inOut",..._},q),S.fromTo(O.material.uniforms.uGrayscale,{value:1},{value:0,duration:L-.2,ease:"power3.inOut",..._},q),S.fromTo(I,{full:0},{full:1,duration:L,ease:"power3.inOut",..._},q),S.fromTo(p,{opacity:0},{opacity:1,duration:1.1,ease:"power2.inOut",..._},q+.7),S.fromTo(A,{opacity:0,y:12},{opacity:1,y:0,duration:.6,ease:"power2.out",..._},q+1),S.fromTo(v,{yPercent:D},{yPercent:0,duration:.9,ease:"power3.out",stagger:.03,..._},q+1),y.forEach((i,f)=>{const b=q+1.3+f*.09;S.fromTo(i.querySelector(".xp__n"),{yPercent:D},{yPercent:0,duration:.8,ease:"power3.out",..._},b),S.fromTo(i.querySelectorAll(".xp__wi"),{yPercent:D},{yPercent:0,duration:.8,ease:"power3.out",stagger:.025,..._},b+.05)}),S.to({},{duration:.5});const ee=k.create({trigger:t,start:"top 92%",end:"top 12%",scrub:.5,animation:E}),te=k.create({trigger:t,start:"top top",end:"bottom bottom",scrub:.6,animation:S}),re=()=>{const i=2*Math.tan(u.fov*Math.PI/360)*l.camera.end.z,f=i*u.aspect,b=I.full,F=1+(f*l.overscan-1)*b,C=1+(i*l.overscan-1)*b;O.scale.set(F,C,1),O.material.uniforms.uPlaneAspect.value=F/C},oe=performance.now();let W=0,j=!1;const U=i=>{const f=(i-oe)/1e3;T.forEach(b=>{b.material.uniforms.uTime.value=f}),re(),u.lookAt(s),c.render(r,u),W=requestAnimationFrame(U)},ae=()=>{j||(j=!0,W=requestAnimationFrame(U))},N=()=>{j=!1,cancelAnimationFrame(W)},B=new IntersectionObserver(i=>i.forEach(f=>f.isIntersecting?ae():N()),{rootMargin:"20% 0px"});B.observe(t),window.addEventListener("resize",G,{passive:!0}),window.addEventListener("pagehide",N,{once:!0}),h=()=>{N(),B.disconnect(),window.removeEventListener("resize",G),ee.kill(),te.kill(),E.kill(),S.kill(),c.dispose()},k.refresh()},o=new IntersectionObserver(e=>{e.some(c=>c.isIntersecting)&&(o.disconnect(),ne(()=>import("./three-lite.Do0a9cof.js"),[]).then(n).catch(x))},{rootMargin:"500% 0px"});o.observe(t)}const ye=1500;function we(){const t=document.querySelector("[data-portfolio]");if(!t||!z())return;const a=t.querySelector("[data-pf-word]"),m=t.querySelector("[data-pf-intro]"),p=Array.from(t.querySelectorAll(".pf__chi")),A=Array.from(t.querySelectorAll("[data-pf-item]"));if(!a||!m||!p.length||!A.length)return;g.set(p,{yPercent:115}),g.set(m,{opacity:0,y:14});const y=g.timeline({paused:!0,defaults:{ease:"power3.out"}}).to(p,{yPercent:0,duration:1,stagger:.045}).to(m,{opacity:1,y:0,duration:.7},"-=0.6");k.create({trigger:a,start:"top 85%",onEnter:()=>y.play(),onLeaveBack:()=>y.reverse()});const P=window.matchMedia("(min-width: 48rem)").matches,v={opacity:0,y:160,...P&&{filter:"blur(20px)"}},w={opacity:1,y:0,...P&&{filter:"blur(0px)"}},h=o=>o.querySelector("[data-pf-card]"),x=A.map(h).filter(o=>o!==null);g.set(x,v);const n=o=>{const e=o.querySelector("img");if(!e||e.complete&&e.naturalWidth>0)return Promise.resolve();const c=e.decode().catch(()=>{}),r=new Promise(u=>window.setTimeout(u,ye));return Promise.race([c,r]).then(()=>{})};k.batch(A,{start:"top 90%",onEnter:o=>o.forEach((e,c)=>{const r=h(e);r&&(r.dataset.pfState="in",n(r).then(()=>{r.dataset.pfState==="in"&&g.to(r,{...w,duration:1.2,ease:"power3.out",delay:c*.12,overwrite:!0})}))}),onLeaveBack:o=>o.forEach((e,c)=>{const r=h(e);r&&(r.dataset.pfState="out",g.to(r,{...v,duration:.45,ease:"power2.in",delay:c*.05,overwrite:!0}))})})}const Ae="(max-width: 47.99rem)";function Se(){const t=document.querySelector("[data-stepper]");if(!t)return;const a=Array.from(t.querySelectorAll("[data-step-tab]")),m=Array.from(t.querySelectorAll("[data-step-panel]")),p=a.length;if(!p||p!==m.length)return;const A=z(),y=window.matchMedia(Ae),P=document.documentElement.dir==="rtl";let v=0;t.classList.add("is-stepper");const w=()=>{a.forEach((n,o)=>{n.dataset.state=o===v?"active":o<v?"complete":"upcoming",n.setAttribute("aria-expanded",String(o===v)),o===v?n.setAttribute("aria-current","step"):n.removeAttribute("aria-current")}),m.forEach((n,o)=>{const e=o===v;n.classList.toggle("is-active",e),n.inert=!e})},h=n=>{n.classList.remove("is-leaving"),g.set(n,{clearProps:"opacity,transform,height"})},x=n=>{if(n<0||n>=p||n===v)return;const o=v,e=n>o;v=n;const c=m[o],r=m[n];if(w(),!A)return;if(g.killTweensOf([c,r]),c.classList.add("is-leaving"),y.matches){g.to(c,{height:0,opacity:0,duration:.4,ease:"power3.inOut",onComplete:()=>h(c)}),g.fromTo(r,{height:0,opacity:0},{height:"auto",opacity:1,duration:.55,ease:"power3.out",onComplete:()=>{h(r);const s=a[n].getBoundingClientRect().top;(s<72||s>window.innerHeight*.7)&&window.scrollBy({top:s-96,behavior:"smooth"})}});return}const u=24*(e?1:-1)*(P?-1:1);g.to(c,{opacity:0,x:-u,duration:.3,ease:"power2.in",onComplete:()=>h(c)}),g.fromTo(r,{opacity:0,x:u},{opacity:1,x:0,duration:.6,ease:"power3.out",delay:.12,onComplete:()=>h(r)})};a.forEach((n,o)=>{n.addEventListener("click",()=>x(o)),n.addEventListener("keydown",e=>{const c={ArrowDown:1,ArrowUp:-1,ArrowRight:P?-1:1,ArrowLeft:P?1:-1};let r=null;e.key in c?r=o+c[e.key]:e.key==="Home"?r=0:e.key==="End"&&(r=p-1),!(r===null||r<0||r>=p)&&(e.preventDefault(),x(r),a[r].focus())})}),t.addEventListener("click",n=>{const o=n.target.closest("[data-step-go]");o&&(x(v+(o.dataset.stepGo==="next"?1:-1)),m[v].querySelector(".st__heading")?.focus({preventScroll:!0}))}),y.addEventListener("change",()=>{g.killTweensOf(m),m.forEach(h)}),w()}se();fe();he();we();Se();
