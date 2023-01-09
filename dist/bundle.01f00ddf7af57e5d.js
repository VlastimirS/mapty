(()=>{"use strict";class t{date=new Date;id=(Date.now()+"").slice(-10);clicks=0;constructor(t,e,s){this.coords=t,this.distance=e,this.duration=s}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} ${this.date.getDate()}`}click(){this.clicks++}}class e extends t{type="running";constructor(t,e,s,o){super(t,e,s),this.cadence=o,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class s extends t{type="cycling";constructor(t,e,s,o){super(t,e,s),this.elevationGain=o,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=this.distance/(this.duration/60),this.speed}}const o=document.querySelector(".form"),n=document.querySelector(".workouts"),i=document.querySelector(".form__input--type"),a=document.querySelector(".form__input--distance"),r=document.querySelector(".form__input--duration"),c=document.querySelector(".form__input--cadence"),u=document.querySelector(".form__input--elevation");new class{#t;#e=13;#s;#o=[];constructor(){this._getPosition(),this._getLocalStorage(),o.addEventListener("submit",this._newWorkout.bind(this)),i.addEventListener("change",this._toggleElevationField),n.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),(function(){alert("Could not get your position")}))}_loadMap(t){const{latitude:e}=t.coords,{longitude:s}=t.coords,o=[e,s];this.#t=L.map("map").setView(o,this.#e),L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#o.forEach((t=>{this._renderWorkoutMarker(t)}))}_showForm(t){this.#s=t,o.classList.remove("hidden"),a.focus()}_hideForm(){a.value=r.value=c.value=u.value="",o.style.display="none",o.classList.add("hidden"),setTimeout((()=>o.style.display="grid"),1e3)}_toggleElevationField(){u.closest(".form__row").classList.toggle("form__row--hidden"),c.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){const o=(...t)=>t.every((t=>Number.isFinite(t))),n=(...t)=>t.every((t=>t>0));t.preventDefault();const l=i.value,p=+a.value,d=+r.value,{lat:_,lng:h}=this.#s.latlng;let m;if("running"===l){const t=+c.value;if(!o(p,d,t)||!n(p,d,t))return alert("Inputs have to be positive numbers!");m=new e([_,h],p,d,t)}if("cycling"===l){const t=+u.value;if(!o(p,d,t)||!n(p,d))return alert("Inputs have to be positive numbers!");m=new s([_,h],p,d,t)}this.#o.push(m),this._renderWorkoutMarker(m),this._renderWorkout(m),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){L.marker(t.coords).addTo(this.#t).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${"running"===t.type?"🏃‍♂️":"🚴‍♀️"} ${t.description}`).openPopup()}_renderWorkout(t){let e=`\n      <li class="workout workout--${t.type}" data-id="${t.id}">\n        <h2 class="workout__title">${t.description}</h2>\n        <div class="workout__details">\n          <span class="workout__icon">${"running"===t.type?"🏃‍♂️":"🚴‍♀️"}</span>\n          <span class="workout__value">${t.distance}</span>\n          <span class="workout__unit">km</span>\n        </div>\n        <div class="workout__details">\n          <span class="workout__icon">⏱</span>\n          <span class="workout__value">${t.duration}</span>\n          <span class="workout__unit">min</span>\n        </div>\n    `;"running"===t.type&&(e+=`\n        <div class="workout__details">\n          <span class="workout__icon">⚡️</span>\n          <span class="workout__value">${t.pace.toFixed(1)}</span>\n          <span class="workout__unit">min/km</span>\n        </div>\n        <div class="workout__details">\n          <span class="workout__icon">🦶🏼</span>\n          <span class="workout__value">${t.cadence}</span>\n          <span class="workout__unit">spm</span>\n        </div>\n      </li>\n      `),"cycling"===t.type&&(e+=`\n        <div class="workout__details">\n          <span class="workout__icon">⚡️</span>\n          <span class="workout__value">${t.speed.toFixed(1)}</span>\n          <span class="workout__unit">km/h</span>\n        </div>\n        <div class="workout__details">\n          <span class="workout__icon">⛰</span>\n          <span class="workout__value">${t.elevationGain}</span>\n          <span class="workout__unit">m</span>\n        </div>\n      </li>\n      `),o.insertAdjacentHTML("afterend",e)}_moveToPopup(t){if(!this.#t)return;const e=t.target.closest(".workout");if(!e)return;const s=this.#o.find((t=>t.id===e.dataset.id));this.#t.setView(s.coords,this.#e,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#o))}_getLocalStorage(){const t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#o=t,this.#o.forEach((t=>{this._renderWorkout(t)})))}reset(){localStorage.removeItem("workouts"),location.reload()}}})();
//# sourceMappingURL=bundle.01f00ddf7af57e5d.js.map