import"./assets/modulepreload-polyfill-3cfb730f.js";import{a as f,S as v,i as p}from"./assets/vendor-c493984e.js";document.addEventListener("DOMContentLoaded",function(){const m=document.getElementById("searchForm"),y=document.getElementById("searchQuery"),r=document.getElementById("results"),l=document.getElementById("loader"),s=document.getElementById("loadMoreBtn");let n=1,i="",g=40;s.style.display="none",m.addEventListener("submit",e=>{e.preventDefault(),i=y.value,n=1,r.innerHTML="",s.style.display="inline-block",c(i,n)}),s.addEventListener("click",async()=>{n++,await c(i,n);const e=document.querySelector(".image-card");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*4,behavior:"smooth"})}});async function c(e,o){const a=`https://pixabay.com/api/?${new URLSearchParams({key:"44808922-f3ebf9148f40a6c297279d5b7",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:20})}`;l.style.display="block";try{const h=(await f.get(a)).data;u(h)}catch(d){console.log("Error:",d)}finally{l.style.display="none"}}function u(e){e.hits.length>0?(e.hits.forEach(t=>{const a=document.createElement("div");a.className="image-card",a.innerHTML=`<a href="${t.largeImageURL}" class="gallery-item">
                        <img src="${t.webformatURL}" alt="${t.tags}">
                    </a>
                    <div class="info">
                        <div><p>Likes</p><span>${t.likes}</span></div>
                        <div><p>Views</p><span>${t.views}</span></div>
                        <div><p>Comments</p><span>${t.comments}</span></div>
                        <div><p>Downloads</p><span>${t.downloads}</span></div>
                    </div>`,r.appendChild(a)}),new v(".gallery-item",{}).refresh(),e.hits.length<20?s.style.display="none":r.children.length>=g?(s.style.display="none",p.info({message:"We're sorry, but you've reached the end of search results.",progressBarColor:"#808080",displayMode:"replace",position:"topRight",zindex:"999",closeOnClick:"true"})):s.style.display="block"):(s.style.display="none",p.error({message:"Sorry, there are no images matching<br> your search query. Please try again!",progressBarColor:"#808080",displayMode:"replace",position:"topRight",zindex:"999",closeOnClick:"true"}))}});
//# sourceMappingURL=commonHelpers.js.map
