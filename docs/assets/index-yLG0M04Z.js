var G=Object.defineProperty;var j=(t,e,o)=>e in t?G(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var h=(t,e,o)=>(j(t,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();class z{constructor(e,o,i){h(this,"x");h(this,"y");h(this,"color");h(this,"lifeSpan");h(this,"velocity");h(this,"size");this.x=e,this.y=o,this.color=i,this.lifeSpan=200,this.velocity=this.randomVelocity(),this.size=Math.random()*3+1}randomVelocity(){return{x:(Math.random()-.5)*5,y:(Math.random()-.5)*5}}update(){this.x+=this.velocity.x,this.y+=this.velocity.y,this.lifeSpan-=1,this.size*=.96}draw(e){e.beginPath(),e.arc(this.x,this.y,this.size,0,Math.PI*2,!1),e.fillStyle=this.color,e.fill()}isAlive(){return this.lifeSpan>0}}const w={LinkWater:"#DDE6ED",DarkBlueGrey:"#27374D"},n=document.getElementById("mainCanvas"),a=n.getContext("2d"),F=document.getElementById("score"),l=26,M=n.width/l,D=n.height/l,S=l/2,N=10,b=w.LinkWater,R=w.DarkBlueGrey,T=w.DarkBlueGrey,W=w.LinkWater;let d=[],P=[];for(let t=0;t<M;t++){d[t]=[];for(let e=0;e<D;e++)d[t][e]=t<M/2?b:R}let A=n.width/4,E=n.height/2,m=12.5,p=-12.5,O=n.width/4*3,x=n.height/2,g=-12.5,L=12.5,I=0;const H=(t,e,o)=>{const i=(t+.5)*l,r=(e+.5)*l;for(let s=0;s<N;s++)P.push(new z(i,r,o))},q=(t,e,o)=>{a.beginPath(),a.arc(t,e,S,0,Math.PI*2,!1),a.fillStyle=o,a.fill()},K=()=>{for(let t=0;t<M;t++){const e=t*l;for(let o=0;o<D;o++){const i=o*l;a.fillStyle=d[t][o],a.fillRect(e,i,l,l)}}},v=(t,e,o,i,r)=>{let s=o,c=i;for(let u=0;u<Math.PI*2;u+=Math.PI/4){let _=t+Math.cos(u)*(l/2),k=e+Math.sin(u)*(l/2),f=Math.floor(_/l),y=Math.floor(k/l);f>=0&&f<M&&y>=0&&y<D&&d[f][y]!==r&&(d[f][y]=r,H(f,y,d[f][y]),Math.abs(Math.cos(u))>Math.abs(Math.sin(u))?s=-s:c=-c)}return{dx:s,dy:c}},U=()=>{let t=0,e=0;for(let i=0;i<M;i++)for(let r=0;r<D;r++){const s=d[i][r];s===b?t++:s===R&&e++}const o=`Light ${t} | Dark ${e}`;F.textContent=o},B=(t,e,o,i)=>(o=t+o>n.width-S||t+o<S?-o:o,i=e+i>n.height-S||e+i<S?-i:i,{dx:o,dy:i}),C=()=>{a.clearRect(0,0,n.width,n.height),K(),P=P.filter(r=>r.isAlive()),P.forEach(r=>{r.update(),r.draw(a)}),q(A,E,T);let t=v(A,E,m,p,b);m=t.dx,p=t.dy,q(O,x,W);let e=v(O,x,g,L,R);g=e.dx,L=e.dy;let o=B(A,E,m,p);m=o.dx,p=o.dy;let i=B(O,x,g,L);g=i.dx,L=i.dy,A+=m,E+=p,O+=g,x+=L,I++,I%1e3===0&&console.log("iteration",I),U(),requestAnimationFrame(C)};requestAnimationFrame(C);
