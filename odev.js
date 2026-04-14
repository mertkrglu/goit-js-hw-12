import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as i,S as d}from"./assets/vendor-BI_19Wih.js";const p="25016149-459cc745d60a20aa9a47a0430",h="https://pixabay.com/api/";async function y(e,o){const t={key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40};return(await i.get(h,{params:t})).data}let n="",s=1,r=0;const u=document.querySelector("#search-form"),l=document.querySelector(".gallery"),a=document.querySelector(".load-more");a.style.display="none";let m=new d(".gallery a");u.addEventListener("submit",f);a.addEventListener("click",g);async function f(e){e.preventDefault(),n=e.currentTarget.elements.searchQuery.value.trim(),n&&(s=1,r=0,l.innerHTML="",a.style.display="none",await c())}async function g(){s+=1,await c(),w()}async function c(){try{const e=await y(n,s);if(e.hits.length===0)return;b(e.hits),r+=e.hits.length,m.refresh(),r>=e.totalHits?a.style.display="none":a.style.display="block"}catch(e){console.error("Hata:",e)}}function b(e){const o=e.map(t=>`
    <div class="photo-card">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t.likes}</p>
        <p><b>Views:</b> ${t.views}</p>
        <p><b>Comments:</b> ${t.comments}</p>
        <p><b>Downloads:</b> ${t.downloads}</p>
      </div>
    </div>
  `).join("");l.insertAdjacentHTML("beforeend",o)}function w(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=odev.js.map
