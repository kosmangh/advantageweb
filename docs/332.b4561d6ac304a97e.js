"use strict";(self.webpackChunkadvantageweb=self.webpackChunkadvantageweb||[]).push([[332],{7962:(C,p,c)=>{c.d(p,{r:()=>v});var t=c(5178),o=c(553),h=c(995);class m{}class _{}var f=c(5879),T=c(7467),y=c(9862),b=c(7236);let v=(()=>{var u;class g{constructor(a,e,s){this.utilsService=a,this.http=e,this.logger=s}saveRentalBill(a,e){return e.createdBy=a.username,e.billingType="PROP",e.estateId="ALL",e.headerRequest=this.utilsService.getRequestHeader(a.zoneId,a.regionId,"SAVE_RENTAL_BILL"),this.logger.info("saveRentalBill request "+JSON.stringify(e)),this.http.post(`${o.N.url+h.h.API_ESTATE_BILLING}applyrentalbill`,e).pipe((0,t.V)(o.N.timeout))}applyBackRentalBill(a,e){return e.createdBy=a.username,e.headerRequest=this.utilsService.getRequestHeader(a.zoneId,a.regionId,"APPLY_BACK_RENTAL_BILL"),this.logger.info("applyBackRentalBill request "+JSON.stringify(e)),this.http.post(`${o.N.url+h.h.API_ESTATE_BILLING}applybackrentalbill`,e).pipe((0,t.V)(o.N.timeout))}applyLastRentBilled2CurrentMonth(a){const e=new m;return e.createdBy=a.username,e.billingType="PROP",e.estateId="ALL",e.headerRequest=this.utilsService.getRequestHeader(a.zoneId,a.regionId,"SAVE_RENTAL_BILL"),this.logger.info("saveRentalBill request "+JSON.stringify(e)),this.http.post(`${o.N.url+h.h.API_ESTATE_BILLING}applylastrentalbill`,e).pipe((0,t.V)(o.N.timeout))}getRentalBills(a,e,s){const i=new _;return i.rentMonth=e,i.rentYear=s,i.headerRequest=this.utilsService.getRequestHeader(a.zoneId,a.regionId,"RENTAL_BILL_LIST"),this.logger.info("getGroundRentBills list request "+JSON.stringify(i)),this.http.post(`${o.N.url+h.h.API_ESTATE_BILLING}rentalbills`,i).pipe((0,t.V)(o.N.timeout))}}return(u=g).\u0275fac=function(a){return new(a||u)(f.LFG(T.F),f.LFG(y.eN),f.LFG(b.Kf))},u.\u0275prov=f.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),g})()},4647:(C,p,c)=>{c.d(p,{AH:()=>b,P4:()=>g,wW:()=>v,y3:()=>u});var t=c(5879),o=c(6814);function h(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"span",7),t.NdJ("click",function(i){t.CHM(e);const l=t.oxw().$implicit,r=t.oxw();return i.preventDefault(),t.KtG(r.removeTab(l))}),t._uU(1," \u274c"),t.qZA()}}const m=function(n){return["nav-item",n]};function _(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"li",3),t.NdJ("keydown",function(i){const r=t.CHM(e).index,d=t.oxw();return t.KtG(d.keyNavActions(i,r))}),t.TgZ(1,"a",4),t.NdJ("click",function(){const l=t.CHM(e).$implicit;return t.KtG(l.active=!0)}),t.TgZ(2,"span",5),t._uU(3),t.qZA(),t.YNc(4,h,2,0,"span",6),t.qZA()()}if(2&n){const e=a.$implicit;t.ekj("active",e.active)("disabled",e.disabled),t.Q6J("ngClass",t.VKq(15,m,e.customClass||"")),t.xp6(1),t.ekj("active",e.active)("disabled",e.disabled),t.uIk("aria-controls",e.id?e.id:"")("aria-selected",!!e.active)("id",e.id?e.id+"-link":""),t.xp6(1),t.Q6J("ngTransclude",e.headingRef),t.xp6(1),t.Oqu(e.heading),t.xp6(1),t.Q6J("ngIf",e.removable)}}const f=["*"];let T=(()=>{class n{constructor(e){this.viewRef=e}set ngTransclude(e){this._ngTransclude=e,e&&this.viewRef.createEmbeddedView(e)}get ngTransclude(){return this._ngTransclude}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.s_b))},n.\u0275dir=t.lG2({type:n,selectors:[["","ngTransclude",""]],inputs:{ngTransclude:"ngTransclude"}}),n})(),y=(()=>{class n{constructor(){this.type="tabs",this.isKeysAllowed=!0,this.ariaLabel="Tabs"}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),b=(()=>{class n{constructor(e,s,i){this.renderer=s,this.elementRef=i,this.clazz=!0,this.tabs=[],this.classMap={},this.ariaLabel="Tabs",this.isDestroyed=!1,this._vertical=!1,this._justified=!1,this._type="tabs",this._isKeysAllowed=!0,Object.assign(this,e)}get vertical(){return this._vertical}set vertical(e){this._vertical=e,this.setClassMap()}get justified(){return this._justified}set justified(e){this._justified=e,this.setClassMap()}get type(){return this._type}set type(e){this._type=e,this.setClassMap()}get isKeysAllowed(){return this._isKeysAllowed}set isKeysAllowed(e){this._isKeysAllowed=e}ngOnDestroy(){this.isDestroyed=!0}addTab(e){this.tabs.push(e),e.active=1===this.tabs.length&&!e.active}removeTab(e,s={reselect:!0,emit:!0}){const i=this.tabs.indexOf(e);if(-1!==i&&!this.isDestroyed){if(s.reselect&&e.active&&this.hasAvailableTabs(i)){const l=this.getClosestTabIndex(i);this.tabs[l].active=!0}s.emit&&e.removed.emit(e),this.tabs.splice(i,1),e.elementRef.nativeElement.parentNode&&this.renderer.removeChild(e.elementRef.nativeElement.parentNode,e.elementRef.nativeElement)}}keyNavActions(e,s){if(!this.isKeysAllowed)return;const i=Array.from(this.elementRef.nativeElement.querySelectorAll(".nav-link"));if(13===e.keyCode||"Enter"===e.key||32===e.keyCode||"Space"===e.key)return e.preventDefault(),void i[s%i.length].click();if(39!==e.keyCode&&"RightArrow"!==e.key)if(37!==e.keyCode&&"LeftArrow"!==e.key)if(36!==e.keyCode&&"Home"!==e.key)if(35!==e.keyCode&&"End"!==e.key){if((46===e.keyCode||"Delete"===e.key)&&this.tabs[s].removable){if(this.removeTab(this.tabs[s]),i[s+1])return void i[(s+1)%i.length].focus();i[i.length-1]&&i[0].focus()}}else{e.preventDefault();let l,r=1,d=s;do{d-r<0?(d=i.length-1,l=i[d],r=0):l=i[d-r],r++}while(l.classList.contains("disabled"));l.focus()}else{e.preventDefault();let l,r=0;do{l=i[r%i.length],r++}while(l.classList.contains("disabled"));l.focus()}else{let l,r=1,d=s;do{d-r<0?(d=i.length-1,l=i[d],r=0):l=i[d-r],r++}while(l.classList.contains("disabled"));l.focus()}else{let l,r=1;do{l=i[(s+r)%i.length],r++}while(l.classList.contains("disabled"));l.focus()}}getClosestTabIndex(e){const s=this.tabs.length;if(!s)return-1;for(let i=1;i<=s;i+=1){const l=e-i,r=e+i;if(this.tabs[l]&&!this.tabs[l].disabled)return l;if(this.tabs[r]&&!this.tabs[r].disabled)return r}return-1}hasAvailableTabs(e){const s=this.tabs.length;if(!s)return!1;for(let i=0;i<s;i+=1)if(!this.tabs[i].disabled&&i!==e)return!0;return!1}setClassMap(){this.classMap={"nav-stacked":this.vertical,"flex-column":this.vertical,"nav-justified":this.justified,[`nav-${this.type}`]:!0}}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(y),t.Y36(t.Qsj),t.Y36(t.SBq))},n.\u0275cmp=t.Xpm({type:n,selectors:[["tabset"]],hostVars:2,hostBindings:function(e,s){2&e&&t.ekj("tab-container",s.clazz)},inputs:{vertical:"vertical",justified:"justified",type:"type"},ngContentSelectors:f,decls:4,vars:3,consts:[["role","tablist",1,"nav",3,"ngClass","click"],[3,"ngClass","active","disabled","keydown",4,"ngFor","ngForOf"],[1,"tab-content"],[3,"ngClass","keydown"],["href","javascript:void(0);","role","tab",1,"nav-link",3,"click"],[3,"ngTransclude"],["class","bs-remove-tab",3,"click",4,"ngIf"],[1,"bs-remove-tab",3,"click"]],template:function(e,s){1&e&&(t.F$t(),t.TgZ(0,"ul",0),t.NdJ("click",function(l){return l.preventDefault()}),t.YNc(1,_,5,17,"li",1),t.qZA(),t.TgZ(2,"div",2),t.Hsn(3),t.qZA()),2&e&&(t.Q6J("ngClass",s.classMap),t.uIk("aria-label",s.ariaLabel),t.xp6(1),t.Q6J("ngForOf",s.tabs))},dependencies:[o.mk,o.sg,o.O5,T],styles:["[_nghost-%COMP%]   .nav-tabs[_ngcontent-%COMP%]   .nav-item.disabled[_ngcontent-%COMP%]   a.disabled[_ngcontent-%COMP%]{cursor:default}"]}),n})(),v=(()=>{class n{constructor(e,s,i){this.elementRef=s,this.renderer=i,this.disabled=!1,this.removable=!1,this.selectTab=new t.vpe,this.deselect=new t.vpe,this.removed=new t.vpe,this.addClass=!0,this.role="tabpanel",this._active=!1,this._customClass="",this.tabset=e,this.tabset.addTab(this)}get customClass(){return this._customClass}set customClass(e){this.customClass&&this.customClass.split(" ").forEach(s=>{this.renderer.removeClass(this.elementRef.nativeElement,s)}),this._customClass=e?e.trim():"",this.customClass&&this.customClass.split(" ").forEach(s=>{this.renderer.addClass(this.elementRef.nativeElement,s)})}get active(){return this._active}set active(e){if(this._active!==e){if(this.disabled&&e||!e)return void(this._active&&!e&&(this.deselect.emit(this),this._active=e));this._active=e,this.selectTab.emit(this),this.tabset.tabs.forEach(s=>{s!==this&&(s.active=!1)})}}get ariaLabelledby(){return this.id?`${this.id}-link`:""}ngOnInit(){this.removable=!!this.removable}ngOnDestroy(){this.tabset.removeTab(this,{reselect:!1,emit:!1})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(b),t.Y36(t.SBq),t.Y36(t.Qsj))},n.\u0275dir=t.lG2({type:n,selectors:[["tab"],["","tab",""]],hostVars:7,hostBindings:function(e,s){2&e&&(t.uIk("id",s.id)("role",s.role)("aria-labelledby",s.ariaLabelledby),t.ekj("active",s.active)("tab-pane",s.addClass))},inputs:{heading:"heading",id:"id",disabled:"disabled",removable:"removable",customClass:"customClass",active:"active"},outputs:{selectTab:"selectTab",deselect:"deselect",removed:"removed"},exportAs:["tab"]}),n})(),u=(()=>{class n{constructor(e,s){s.headingRef=e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.Rgc),t.Y36(v))},n.\u0275dir=t.lG2({type:n,selectors:[["","tabHeading",""]]}),n})(),g=(()=>{class n{static forRoot(){return{ngModule:n,providers:[]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[o.ez]}),n})()}}]);