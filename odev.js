import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as c,S as d}from"./assets/vendor-BI_19Wih.js";const h="25016149-459cc745d60a20aa9a47a0430",p="https://pixabay.com/api/";async function m(e,a){const t={key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:40};return(await c.get(p,{params:t})).data}let s="",r=1,n=0;const y=document.querySelector("#search-form"),i=document.querySelector(".gallery"),o=document.querySelector(".load-more");o.style.display="none";let u=new d(".gallery a");y.addEventListener("submit",f);o.addEventListener("click",g);async function f(e){e.preventDefault(),s=e.currentTarget.elements.searchQuery.value.trim(),s&&(r=1,n=0,i.innerHTML="",o.style.display="none",await l())}async function g(){r+=1,await l(),b()}async function l(){try{const e=await m(s,r);v(e.hits),n+=e.hits.length,u.refresh(),n>=e.totalHits||e.hits.length<40?(o.style.display="none",iziToast.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):o.style.display="block"}catch(e){console.error("Hata:",e),iziToast.error({message:"Something went wrong!"})}}function v(e){const a=e.map(t=>`
    <div class="photo-card">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${t.likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${t.views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${t.comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${t.downloads}</span>
        </div>
      </div>
    </div>
  `).join("");i.insertAdjacentHTML("beforeend",a)}function b(){const e=document.querySelector(".gallery");if(e.firstElementChild){const{height:a}=e.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}}
//# sourceMappingURL=odev.js.map
