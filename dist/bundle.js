(()=>{"use strict";class t{constructor(t){this.$el=document.getElementById(t),this.init()}init(){}onShow(){}onHide(){}hide(){this.$el.classList.add("hide"),this.onHide()}show(){this.$el.classList.remove("hide"),this.onShow()}}function e(){localStorage.setItem("visited",JSON.stringify(!0)),this.hide()}function s(t){if(t.preventDefault(),t.target.classList.contains("tab")){Array.from(this.$el.querySelectorAll(".tab")).forEach((t=>{t.classList.remove("active")})),t.target.classList.add("active");const e=this.tabs.find((e=>e.name===t.target.dataset.name));this.tabs.forEach((t=>t.component.hide())),e.component.show()}}class n{constructor(t,e){this.form=t,this.controls=e}value(){const t={};return Object.keys(this.controls).forEach((e=>{t[e]=this.form[e].value})),t}clear(){Object.keys(this.controls).forEach((t=>{this.form[t].value=""}))}isValid(){let t=!0;return Object.keys(this.controls).forEach((e=>{const s=this.controls[e];let n=!0;s.forEach((t=>{n=t(this.form[e].value)&&n})),n?i(this.form[e]):function(t){i(t);t.classList.add("invalid"),t.insertAdjacentHTML("afterend",'<p class="validation-error">Введите корректное значение</p>')}(this.form[e]),t=t&&n})),t}}function i(t){t.classList.remove("invalid"),t.nextSibling&&t.closest(".form-control").removeChild(t.nextSibling)}class a{static required(t=""){return t&&t.trim()}static minLength(t){return e=>e.length>=t}}async function o(t){const e=await fetch(t);return await e.json()}const r=new class{constructor(t){this.url=t}async createPost(t){try{return o(new Request(this.url+"/posts.json",{method:"post",body:JSON.stringify(t)}))}catch(t){console.error(t)}}async fetchPosts(){try{return o(new Request(`${this.url}/posts.json`,{method:"get"}))}catch(t){console.error("Cant to GET")}}async fetchPostById(t){try{return o(new Request(`${this.url}/posts/${t}.json`,{method:"get"}))}catch(t){console.error("Cant to GET")}}}("https://wfm-js-c61f1-default-rtdb.firebaseio.com");async function l(t){if(t.preventDefault(),this.form.isValid()){const t={type:this.$el.type.value,date:(new Date).toLocaleDateString(),...this.form.value()};await r.createPost(t),this.form.clear(),alert("Запись создана в базе данных")}}function c(t,e={}){const s="news"===t.type?'<li class="tag tag-blue tag-rounded">Новость</li>':'<li class="tag tag-rounded">Заметка</li>',n=(JSON.parse(localStorage.getItem("favorites"))||[]).includes(t.id)?`<button data-id="${t.id}" class="button-round button-small button-danger">Удалить</button>`:`<button data-id="${t.id}" class="button-round button-small button-primary">Сохранить</button>`;return`\n      <div class="panel">\n        <div class="panel-head">\n          <p class="panel-title">${t.title}</p>\n          <ul class="tags">\n            ${s}\n          </ul>\n        </div>\n        <div class="panel-body">\n          <p class="multi-line">${t.fulltext}</p>\n        </div>\n        <div class="panel-footer w-panel-footer">\n          <small>${t.date}</small>\n          ${e.widthButton?n:""}\n        </div>\n      </div>\n    `}class d{static fbObjectToArray(t){return Object.keys(t).map((e=>{const s=t[e];return s.id=e,s}))}}async function h(t){if(t.preventDefault(),t.target.classList.contains("js-link")){const e=t.target.dataset.id;console.log(e),this.$el.innerHTML="",this.loader.show();const s=await r.fetchPostById(e);this.loader.hide(),this.$el.insertAdjacentHTML("afterbegin",c(s,{widthButton:!1}))}}function u(t){const e=t.target,s=e.dataset.id;if(s){let t=JSON.parse(localStorage.getItem("favorites"))||[];t.includes(s)?(e.textContent="Сохранить",e.classList.add("button-primary"),e.classList.remove("button-danger"),t=t.filter((t=>t!==s))):(e.classList.remove("button-primary"),e.classList.add("button-danger"),e.textContent="Удалить",t.push(s)),localStorage.setItem("favorites",JSON.stringify(t))}}new class extends t{constructor(t){super(t)}init(){localStorage.getItem("visited")&&this.hide(),this.$el.querySelector(".js-header-start").addEventListener("click",e.bind(this))}}("header");const f=new class extends t{constructor(t){super(t),this.tabs=[]}init(){this.$el.addEventListener("click",s.bind(this))}registerTabs(t){this.tabs=t}}("navigation"),m=new class extends t{constructor(t){super(t)}}("loader"),b=new class extends t{constructor(t,{loader:e}){super(t),this.loader=e}init(){this.$el.addEventListener("click",u.bind(this))}async onShow(){this.loader.show();const t=await r.fetchPosts(),e=d.fbObjectToArray(t).map((t=>c(t,{widthButton:!0})));this.loader.hide(),this.$el.insertAdjacentHTML("afterbegin",e.join(" "))}onHide(){this.$el.innerHTML=""}}("posts",{loader:m}),g=new class extends t{constructor(t){super(t)}init(){this.$el.addEventListener("submit",l.bind(this)),this.form=new n(this.$el,{title:[a.required],fulltext:[a.required,a.minLength(10)]})}}("create"),p=new class extends t{constructor(t,e){super(t),this.loader=e.loader}init(){this.$el.addEventListener("click",h.bind(this))}async onShow(){this.loader.show();const t=JSON.parse(localStorage.getItem("favorites"));let e=d.fbObjectToArray(await r.fetchPosts());this.renderList(t,e),this.loader.hide()}renderList(t=[],e){t.length?e.forEach((e=>{let s="";t.includes(e.id)&&t.length&&(s=`\n            <ul>\n              <li><a href="#" data-id="${e.id}" class="js-link">${e.title}</a></li>\n            </ul>\n          `,this.$el.insertAdjacentHTML("afterbegin",s))})):this.$el.insertAdjacentHTML("afterbegin","Вы пока ничего не добавили")}onHide(){this.$el.innerHTML=""}}("favorite",{loader:m});f.registerTabs([{name:"create",component:g},{name:"posts",component:b},{name:"favorite",component:p}])})();