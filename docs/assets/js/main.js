"use strict";const seriesList=document.querySelector(".series-list"),searchBtn=document.querySelector(".search-btn");let inputText=document.querySelector(".field__fill-series");const api="http://api.tvmaze.com/search/shows?q=";let favItem=document.querySelector(".fav-list-container"),favs=[];const btnReset=document.querySelector(".reset-btn");function reloadfav(){if(JSON.parse(localStorage.getItem("favorits"))){const e=JSON.parse(localStorage.getItem("favorits"));for(const s of e)favItem.innerHTML+=`<li class="fav-list">\n      <img class="img-fav" alt="Serie ${s.name}" src="${s.img}">\n      <h3>⭐️ ${s.name} ⭐️</h3>\n      <p class="id-list" >${s.id}</p>\n      </li>`}}function favSeries(e){const s=e.currentTarget,t=e.currentTarget.querySelector(".id-list").innerHTML,i=e.currentTarget.querySelector(".name-serie").innerHTML,a=e.currentTarget.querySelector(".img-list").src;s.classList.toggle("serie-fav");const r={id:t,name:i,img:a};if(JSON.parse(localStorage.getItem("favorits"))&&(favs=JSON.parse(localStorage.getItem("favorits"))),s.classList.contains("serie-fav"))!1===favs.includes(r)&&favs.push(r);else{let e=-1;for(let s=0;s<favs.length;s++)if(favs[s].id===t){e=s;break}e>-1&&favs.splice(e,1)}localStorage.setItem("favorits",JSON.stringify(favs)),favItem.innerHTML="";for(const e of favs)favItem.innerHTML+=`<li class="fav-list">\n    <img class="img-fav" alt="Serie ${e.name}" src="${e.img}">\n    <h3>⭐️ ${e.name} ⭐️</h3>\n    <p class="id-list" >${e.id}</p>\n    </li>`;0===favs.length&&localStorage.removeItem("favorits")}function seriesSearch(){const e=inputText.value;fetch(api+e).then(e=>e.json()).then(e=>{seriesList.innerHTML="";const s=[];0===e.length&&(seriesList.innerHTML="No se ha podido conseguir resultado de tu busqueda");for(const t of e)s.push(`${parseInt(t.show.id)}`),null===t.show.image?seriesList.innerHTML+=`\n          <li class="list-item" id:"${parseInt(t.show.id)}">\n          <img class="img-list" alt="Serie ${t.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV">\n          <h3 class="name-serie">${t.show.name}</h3>\n          <p class="id-list">${t.show.id}</p>\n          </li>`:seriesList.innerHTML+=`\n          <li class="list-item" id:"${parseInt(t.show.id)}">\n          <img class="img-list" alt="Serie ${t.show.name}" src="${t.show.image.medium}">\n          <h3 class="name-serie">${t.show.name}</h3>\n          <p class="id-list">${t.show.id}</p>\n          </li>`;const t=document.querySelectorAll(".list-item");if(JSON.parse(localStorage.getItem("favorits"))){const e=JSON.parse(localStorage.getItem("favorits"));for(let i=0;i<s.length;i++)for(const a of e)s[i]===a.id&&t[i].classList.add("serie-fav")}for(let e=0;e<t.length;e++)t[e].addEventListener("click",favSeries)})}function enterYes(e){13===e.keyCode&&seriesSearch()}function reset(){inputText.value="",seriesList.innerHTML="",localStorage.removeItem("favorits"),favs=[],favItem.innerHTML=""}reloadfav(),btnReset.addEventListener("click",reset),searchBtn.addEventListener("click",seriesSearch),inputText.addEventListener("keyup",enterYes);