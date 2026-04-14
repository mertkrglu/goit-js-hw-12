import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as d,S as y,i as l}from"./assets/vendor-iB-pPhnc.js";const p="25016149-459cc745d60a20aa9a47a0430",h="https://pixabay.com/api/";async function u(e,r){const t={key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40};return(await d.get(h,{params:t})).data}let n="",a=1,s=0;const m=document.querySelector("#search-form"),i=document.querySelector(".gallery"),o=document.querySelector(".load-more");o.style.display="none";let f=new y(".gallery a");m.addEventListener("submit",g);o.addEventListener("click",b);async function g(e){e.preventDefault(),n=e.currentTarget.elements.searchQuery.value.trim(),n&&(a=1,s=0,i.innerHTML="",o.style.display="none",await c())}async function b(){a+=1,await c(),S()}async function c(){try{document.querySelector(".loader").style.display="block";const e=await u(n,a);if(e.hits.length===0&&a===1){l.error({message:"Sorry, no images found."});return}w(e.hits),s+=e.hits.length,f.refresh(),s>=e.totalHits||e.hits.length<40?(o.style.display="none",l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):o.style.display="block"}catch(e){console.error("Hata:",e)}finally{document.querySelector(".loader").style.display="none"}}function w(e){const r=e.map(t=>`
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
  `).join("");i.insertAdjacentHTML("beforeend",r)}function S(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=odev.js.map
