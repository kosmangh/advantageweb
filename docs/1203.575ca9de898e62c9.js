"use strict";(self.webpackChunkadvantageweb=self.webpackChunkadvantageweb||[]).push([[1203],{2187:(R,v,i)=>{i.d(v,{c:()=>a});var h=i(6814),c=i(1054),l=i(2868),o=i(5879);function f(g,p){if(1&g&&(o.TgZ(0,"div"),o.ALo(1,"avatarBg"),o.TgZ(2,"span"),o._uU(3),o.ALo(4,"avatarName"),o.qZA()()),2&g){const Z=o.oxw();o.Gre("user-avatar  d-none d-sm-flex ",o.lcZ(1,4,""),""),o.xp6(3),o.hij("",o.lcZ(4,6,Z.fullName)," ")}}function u(g,p){if(1&g&&(o.TgZ(0,"span"),o._UZ(1,"br"),o.TgZ(2,"span"),o._uU(3),o.qZA()()),2&g){const Z=o.oxw();o.xp6(3),o.Oqu(Z.otherFieldName)}}let a=(()=>{var g;class p{constructor(){this.showAvatar=!0}ngOnInit(){}}return(g=p).\u0275fac=function(_){return new(_||g)},g.\u0275cmp=o.Xpm({type:g,selectors:[["app-full-name"]],inputs:{fullName:"fullName",otherFieldName:"otherFieldName",showAvatar:"showAvatar"},standalone:!0,features:[o.jDz],decls:7,vars:3,consts:[[1,"user-card"],[3,"class",4,"ngIf"],[1,"user-info"],[1,"text-black"],[1,"dot","dot-success","d-md-none","ms-1"],[4,"ngIf"]],template:function(_,A){1&_&&(o.TgZ(0,"div",0),o.YNc(1,f,5,8,"div",1),o.TgZ(2,"div",2)(3,"span",3),o._uU(4),o._UZ(5,"span",4),o.qZA(),o.YNc(6,u,4,1,"span",5),o.qZA()()),2&_&&(o.xp6(1),o.Q6J("ngIf",A.showAvatar),o.xp6(3),o.hij(" ",A.fullName," "),o.xp6(2),o.Q6J("ngIf",A.otherFieldName))},dependencies:[h.ez,h.O5,c.b,l.M],encapsulation:2}),p})()},1054:(R,v,i)=>{i.d(v,{b:()=>c});var h=i(5879);let c=(()=>{var l;class o{transform(u){const a=["bg-info-dim","bg-warning-dim","bg-primary-dim","bg-success-dim","bg-danger-dim","bg-purple-dim","bg-indigo-dim"];return a[Math.floor(Math.random()*a.length)]}}return(l=o).\u0275fac=function(u){return new(u||l)},l.\u0275pipe=h.Yjl({name:"avatarBg",type:l,pure:!0,standalone:!0}),o})()},2868:(R,v,i)=>{i.d(v,{M:()=>c});var h=i(5879);let c=(()=>{var l;class o{transform(u){if(!u)return"NF";const a=u.split(" ");let g=a[0],p=a[1];return p?(g.charAt(0)+""+p.charAt(0)).toUpperCase():g.slice(0,2).toUpperCase()}}return(l=o).\u0275fac=function(u){return new(u||l)},l.\u0275pipe=h.Yjl({name:"avatarName",type:l,pure:!0,standalone:!0}),o})()},4874:(R,v,i)=>{i.d(v,{i:()=>c});var h=i(5879);let c=(()=>{var l;class o{transform(u){return u.trim().split("_").map(g=>g.trim()).join(" ")}}return(l=o).\u0275fac=function(u){return new(u||l)},l.\u0275pipe=h.Yjl({name:"removeHyphen",type:l,pure:!0,standalone:!0}),o})()},1085:(R,v,i)=>{i.d(v,{e:()=>c});var h=i(5879);let c=(()=>{var l;class o{constructor(u,a){this.changeDetectorRef=u,this.ngZone=a,this.timer=null}transform(u){this.removeTimer();let a=new Date(u),p=Math.round(Math.abs(((new Date).getTime()-a.getTime())/1e3)),Z=Number.isNaN(p)?1e3:1e3*this.getSecondsUntilUpdate(p);this.timer=this.ngZone.runOutsideAngular(()=>typeof window<"u"?window.setTimeout(()=>{this.ngZone.run(()=>this.changeDetectorRef.markForCheck())},Z):null);let _=Math.round(Math.abs(p/60)),A=Math.round(Math.abs(_/60)),T=Math.round(Math.abs(A/24)),M=Math.round(Math.abs(T/30.416)),b=Math.round(Math.abs(T/365));return Number.isNaN(p)?"":p<=45?"a few seconds ago":p<=90?"a minute ago":_<=45?_+" minutes ago":_<=90?"an hour ago":A<=22?A+" hours ago":A<=36?"a day ago":T<=25?T+" days ago":T<=45?"a month ago":T<=345?M+" months ago":T<=545?"a year ago":b+" years ago"}ngOnDestroy(){this.removeTimer()}removeTimer(){this.timer&&(window.clearTimeout(this.timer),this.timer=null)}getSecondsUntilUpdate(u){return u<60?2:u<3600?30:u<86400?300:3600}}return(l=o).\u0275fac=function(u){return new(u||l)(h.Y36(h.sBO,16),h.Y36(h.R0b,16))},l.\u0275pipe=h.Yjl({name:"timeAgo",type:l,pure:!1,standalone:!0}),o})()},1203:(R,v,i)=>{i.r(v),i.d(v,{RegionsComponent:()=>$});var h=i(5861),c=i(6814),l=i(995),o=i(3519),f=i.n(o),u=i(5176),a=i(95),g=i(2458),p=i(2187),Z=i(8624),_=i(1085),A=i(2735),T=i(1693),M=i(3221),b=i(4740),e=i(5879),O=i(6593),y=i(6842),F=i(7177),w=i(4981),x=i(7236),S=i(1449);function J(r,m){if(1&r&&(e.TgZ(0,"div",22),e._UZ(1,"br"),e._uU(2),e._UZ(3,"br"),e._uU(4),e._UZ(5,"br"),e._uU(6),e._UZ(7,"br"),e._uU(8),e.ALo(9,"json"),e.qZA()),2&r){const s=e.oxw();e.xp6(2),e.hij("Dirty: ",s.regionFormGroup.dirty," "),e.xp6(2),e.hij("Touched: ",s.regionFormGroup.touched," "),e.xp6(2),e.hij("Valid: ",s.regionFormGroup.valid," "),e.xp6(2),e.hij("Value: ",e.lcZ(9,4,s.regionFormGroup.value)," ")}}function B(r,m){if(1&r&&(e.TgZ(0,"ng-option",23),e._uU(1),e.qZA()),2&r){const s=m.$implicit;e.Q6J("value",s.recordId),e.xp6(1),e.hij(" ",s.zoneName," ")}}function D(r,m){1&r&&(e.TgZ(0,"span"),e._UZ(1,"app-required-field"),e.qZA())}function P(r,m){if(1&r&&(e.TgZ(0,"ng-option",23),e._uU(1),e.qZA()),2&r){const s=m.$implicit;e.Q6J("value",s.dataValue),e.xp6(1),e.hij(" ",s.dataLabel," ")}}function E(r,m){1&r&&(e.TgZ(0,"span"),e._UZ(1,"app-required-field"),e.qZA())}function G(r,m){1&r&&(e.ynx(0),e.TgZ(1,"div",24),e._UZ(2,"input",25),e.TgZ(3,"label",26),e._uU(4," Save & create new "),e.qZA()(),e.BQk())}function Y(r,m){if(1&r){const s=e.EpF();e.TgZ(0,"div",19)(1,"button",27),e.NdJ("click",function(){e.CHM(s);const t=e.oxw();return e.KtG(t.deleteRegion())}),e._uU(2," Delete "),e.qZA()()}if(2&r){const s=e.oxw();e.xp6(1),e.Q6J("title",s.regionFormGroup.invalid?"There must be errors on the form":"")}}function q(r,m){if(1&r){const s=e.EpF();e.TgZ(0,"div",19)(1,"button",28),e.NdJ("click",function(){e.CHM(s);const t=e.oxw();return e.KtG(t.updateRegion())}),e._uU(2," Update region "),e.qZA()()}if(2&r){const s=e.oxw();e.xp6(1),e.Q6J("title",s.regionFormGroup.invalid?"There must be errors on the form":"")}}function L(r,m){if(1&r){const s=e.EpF();e.TgZ(0,"div",19)(1,"button",28),e.NdJ("click",function(){e.CHM(s);const t=e.oxw();return e.KtG(t.saveRegion())}),e._uU(2," Create region "),e.qZA()()}if(2&r){const s=e.oxw();e.xp6(1),e.Q6J("title",s.regionFormGroup.invalid?"There must be errors on the form":"")}}const I=function(r){return{"is-invalid":r}};let z=(()=>{var r;class m{constructor(n,t,d,N,C,U,W){this.title=n,this.addRegionBsModalRef=t,this.fb=d,this.accountService=N,this.alertService=C,this.logger=U,this.settingsService=W,this.submitted=!1,this.accountService.currentUser.subscribe(V=>this.currentUser=V)}ngOnInit(){this.createNewForm(),this.isAddMode?(this.regionHeaderMsg="New region",this.title.setTitle(this.regionHeaderMsg)):(this.regionHeaderMsg="Edit "+this.region.regionName,this.title.setTitle(this.regionHeaderMsg),this.regionFormGroup.patchValue(this.region)),this.addRegionBsModalRef.setClass("gray modal-sm modal-dialog-top"),this.fetchZones(),this.listGhanaRegions=this.settingsService.getGhanaRegions()}createNewForm(){this.regionFormGroup=this.fb.group({regionName:["",{updateOn:"blur",validators:[a.kI.required,a.kI.minLength(3)]}],zoneId:["",[a.kI.required]],recordId:[""],saveAndNew:[!1]})}get regionForm(){return this.regionFormGroup.controls}fetchZones(){this.listOfZones=[],this.settingsService.getZones().subscribe({next:n=>{if(this.logger.info("getZones response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.zones.length<=0?(this.alertService.showInfoMsgGeneral("No zones found"),void this.logger.info("No zones found")):void(this.listOfZones=n.zones);this.alertService.error(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n),this.alertService.showInfoMsg(n)}})}saveRegion(){if(this.submitted=!0,this.alertService.clear(),this.regionFormGroup.invalid)return;let n=this.regionForm.regionName.value;f().fire({title:"Confirmation",text:`Do you want to create region  ${n}?`,icon:"question",position:"top",showCancelButton:!0,confirmButtonText:"Yes, create",cancelButtonText:"No, cancel"}).then(t=>{t.value?this.settingsService.createRegion(this.currentUser,this.regionFormGroup.value).subscribe({next:d=>{"000"===d.headerResponse.responseCode?(this.alertService.showSuccessMsg(`${n} created successfully`),this.regionForm.saveAndNew.value||(this.addRegionBsModalRef.hide(),setTimeout(()=>window.location.reload(),1500)),this.submitted=!1,this.regionFormGroup.reset(),this.logAction(`created region ${n}`,l.h.SETTINGS)):this.alertService.showErrorMsg(d.headerResponse.responseMessage)},error:d=>{this.alertService.showInfoMsg(d)}}):f()})}updateRegion(){if(this.submitted=!0,this.alertService.clear(),this.regionFormGroup.invalid)return;let n=this.regionForm.regionName.value;f().fire({position:"top",title:"Confirmation",text:`Do you want to update Region ${n}?`,icon:"question",showCancelButton:!0,cancelButtonText:"No, cancel",confirmButtonText:"Yes, update"}).then(t=>{if(t.value){if(this.alertService.clear(),this.regionFormGroup.invalid)return;this.settingsService.updateRegion(this.currentUser,this.regionFormGroup.value).subscribe({next:d=>{this.logger.info("updateUserAccount response:"+JSON.stringify(d)),"000"===d.headerResponse.responseCode?(this.alertService.showSuccessMsg(`${n} updated successfully`),this.addRegionBsModalRef.hide(),this.logAction(`Updated ${n}`,l.h.SETTINGS),setTimeout(()=>window.location.reload(),1500)):this.alertService.showErrorMsg(d.headerResponse.responseMessage)},error:d=>{this.alertService.showInfoMsg(d.message)}})}else f()})}deleteRegion(){this.submitted=!0,this.alertService.clear()}logAction(n,t){var d=this;return(0,h.Z)(function*(){yield d.accountService.logUserAudit(n,t)})()}}return(r=m).\u0275fac=function(n){return new(n||r)(e.Y36(O.Dx),e.Y36(y.UZ),e.Y36(a.qu),e.Y36(F.e),e.Y36(w.c),e.Y36(x.Kf),e.Y36(S.g))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:39,vars:25,consts:[["novalidate","",3,"formGroup"],[1,"modal-header"],[1,"modal-title"],["type","button btn-xs","aria-label","Close",1,"close","btn-close","pull-right",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],["class","p-10",4,"ngIf"],[1,"row","gy-2","mt-3"],[1,"col-sm-12"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["id","zoneId","formControlName","zoneId",3,"clearable","ngClass"],["value","","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],[1,"invalid-feedback"],[4,"ngIf"],["id","regionName","formControlName","regionName",3,"clearable","ngClass"],[1,"row","my-3","mx-2","mb-3","justify-content-end"],[1,"col-auto"],["data-bs-dismiss","modal",1,"btn","btn-outline-light","btn-sm",3,"click"],["class","col-auto",4,"ngIf"],[1,"p-10"],[3,"value"],[1,"custom-control","custom-control-sm","custom-checkbox","checked"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew","id","saveAndNew",1,"custom-control-input"],["for","saveAndNew",1,"custom-control-label","fw-bolder"],[1,"btn","btn-outline-danger","btn-sm",3,"title","click"],[1,"btn","btn-primary","btn-sm",3,"title","click"]],template:function(n,t){1&n&&(e.TgZ(0,"form",0)(1,"div",1)(2,"h6",2),e._uU(3),e.ALo(4,"titlecase"),e.qZA(),e.TgZ(5,"button",3),e.NdJ("click",function(){return null==t.addRegionBsModalRef?null:t.addRegionBsModalRef.hide()}),e.TgZ(6,"span",4),e._uU(7,"\xd7"),e.qZA()()(),e.TgZ(8,"div",5),e.YNc(9,J,10,6,"div",6),e._UZ(10,"app-required-fields-notice"),e.TgZ(11,"div",7)(12,"div",8)(13,"div",9),e._UZ(14,"app-form-label",10),e.TgZ(15,"div",11)(16,"ng-select",12)(17,"ng-option",13),e._uU(18,"Select One"),e.qZA(),e.YNc(19,B,2,2,"ng-option",14),e.qZA(),e.TgZ(20,"span",15),e.YNc(21,D,2,0,"span",16),e.qZA()()(),e.TgZ(22,"div",9),e._UZ(23,"app-form-label",10),e.TgZ(24,"div",11)(25,"ng-select",17)(26,"ng-option",13),e._uU(27,"Select One"),e.qZA(),e.YNc(28,P,2,2,"ng-option",14),e.qZA(),e.TgZ(29,"span",15),e.YNc(30,E,2,0,"span",16),e.qZA()()(),e.YNc(31,G,5,0,"ng-container",16),e.qZA()()(),e.TgZ(32,"div",18)(33,"div",19)(34,"button",20),e.NdJ("click",function(){return null==t.addRegionBsModalRef?null:t.addRegionBsModalRef.hide()}),e._uU(35," Close "),e.qZA()(),e.YNc(36,Y,3,1,"div",21),e.YNc(37,q,3,1,"div",21),e.YNc(38,L,3,1,"div",21),e.qZA()()),2&n&&(e.Q6J("formGroup",t.regionFormGroup),e.xp6(3),e.Oqu(e.lcZ(4,19,t.regionHeaderMsg)),e.xp6(6),e.Q6J("ngIf",!1),e.xp6(5),e.Q6J("labelForName","zoneId")("labelName","Zones"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(21,I,((null==t.regionForm.zoneId?null:t.regionForm.zoneId.touched)||(null==t.regionForm.zoneId?null:t.regionForm.zoneId.dirty)||t.submitted)&&(null==t.regionForm.zoneId?null:t.regionForm.zoneId.errors))),e.xp6(3),e.Q6J("ngForOf",t.listOfZones),e.xp6(2),e.Q6J("ngIf",null==t.regionForm.zoneId||null==t.regionForm.zoneId.errors?null:t.regionForm.zoneId.errors.required),e.xp6(2),e.Q6J("labelForName","regionName")("labelName","Region"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(23,I,((null==t.regionForm.regionName?null:t.regionForm.regionName.touched)||(null==t.regionForm.regionName?null:t.regionForm.regionName.dirty)||t.submitted)&&(null==t.regionForm.regionName?null:t.regionForm.regionName.errors))),e.xp6(3),e.Q6J("ngForOf",t.listGhanaRegions),e.xp6(2),e.Q6J("ngIf",null==t.regionForm.regionName||null==t.regionForm.regionName.errors?null:t.regionForm.regionName.errors.required),e.xp6(1),e.Q6J("ngIf",t.isAddMode),e.xp6(5),e.Q6J("ngIf",!t.isAddMode),e.xp6(1),e.Q6J("ngIf",!t.isAddMode),e.xp6(1),e.Q6J("ngIf",t.isAddMode))},dependencies:[c.ez,c.mk,c.sg,c.O5,c.Ts,c.rS,a.u5,a._Y,a.Wl,a.JJ,a.JL,a.UX,a.sg,a.u,b.A0,b.w9,b.jq,M.z,A.h,T.M],encapsulation:2}),m})();var Q=i(4874),j=i(9972);function K(r,m){1&r&&(e.TgZ(0,"tr")(1,"th"),e._uU(2,"SN"),e.qZA(),e.TgZ(3,"th"),e._uU(4,"Region"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Zone"),e.qZA(),e.TgZ(7,"th"),e._uU(8,"Created By"),e.qZA(),e.TgZ(9,"th"),e._uU(10,"Last Modified By"),e.qZA(),e.TgZ(11,"th"),e._uU(12,"Actions"),e.qZA()())}function k(r,m){if(1&r){const s=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"app-full-name",15),e.ALo(5,"titlecase"),e.ALo(6,"removeHyphen"),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.ALo(11,"lowercase"),e.TgZ(12,"div",16)(13,"small",17),e._uU(14),e.ALo(15,"date"),e.qZA(),e.TgZ(16,"small",18),e._uU(17),e.ALo(18,"timeAgo"),e.qZA()()(),e.TgZ(19,"td"),e._uU(20),e.ALo(21,"lowercase"),e.TgZ(22,"div",16)(23,"small",17),e._uU(24),e.ALo(25,"date"),e.qZA(),e.TgZ(26,"small",18),e._uU(27),e.ALo(28,"timeAgo"),e.qZA()()(),e.TgZ(29,"td")(30,"div",19),e.NdJ("click",function(){const d=e.CHM(s).$implicit,N=e.oxw();return e.KtG(N.openRegionModalComponent(d,!1))}),e.TgZ(31,"div",20)(32,"span"),e._UZ(33,"em",21),e.qZA()()()()()}if(2&r){const s=m.$implicit,n=m.rowIndex;e.xp6(2),e.Oqu(n+1),e.xp6(2),e.s9C("fullName",e.lcZ(5,9,e.lcZ(6,11,null==s?null:s.regionName))),e.xp6(4),e.Oqu(s.zoneName),e.xp6(2),e.hij(" ",e.lcZ(11,13,s.createdBy)," "),e.xp6(4),e.Oqu(e.xi3(15,15,s.createdDate,"medium")),e.xp6(3),e.hij(" ",e.lcZ(18,18,s.createdDate),""),e.xp6(3),e.hij(" ",e.lcZ(21,20,s.modifiedBy)," "),e.xp6(4),e.Oqu(e.xi3(25,22,s.lastModifiedDate,"medium")),e.xp6(3),e.Oqu(e.lcZ(28,25,s.lastModifiedDate))}}const H=function(){return[5,10,25,50]};let $=(()=>{var r;class m{constructor(n,t,d,N,C){this.accountService=n,this.alertService=t,this.logger=d,this.settings=N,this.regionModalService=C,this.accountService.currentUser.subscribe(U=>this.currentUser=U)}ngOnInit(){this.refreshButton(),this.logAction("Viewed regions page",l.h.SETTINGS)}ngOnDestroy(){this.regionModalService.hide(),f().close()}refreshButton(){this.fetchRegions()}fetchRegions(){this.listOfRegions=[],this.settings.getRegions().subscribe({next:n=>{if(this.logger.info("getRegions response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.regions.length<=0?(this.alertService.showInfoMsgGeneral("No regions found"),void this.logger.info("No regions found")):void(this.listOfRegions=n.regions);this.alertService.error(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n),this.alertService.showInfoMsg(n)}})}openRegionModalComponent(n,t){const d={initialState:{isAddMode:t,region:n}};this.regionModalService.config.ignoreBackdropClick=!0,this.regionModalService.config.animated=!0,this.addRegionBsModalRef=this.regionModalService.show(z,d),this.addRegionBsModalRef.content.closeBtnName="Close"}logAction(n,t){var d=this;return(0,h.Z)(function*(){yield d.accountService.logUserAudit(n,t)})()}}return(r=m).\u0275fac=function(n){return new(n||r)(e.Y36(F.e),e.Y36(w.c),e.Y36(x.Kf),e.Y36(S.g),e.Y36(y.tT))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:20,vars:14,consts:[[3,"pageTitleName","description"],[1,"newItemName"],[1,"btn","btn-primary",3,"click"],[1,"icon","ni","ni-plus"],[1,"row","gy-2","gx-3","mb-4","align-items-center"],[1,"col-auto"],[1,"form-control-wrap"],[1,"form-icon","form-icon-right"],[1,"icon","ni","ni-search"],["type","text","id","default-04","placeholder"," Search here",1,"form-control",3,"ngModel","ngModelChange"],["type","button","title","",1,"btn","btn-dim","btn-primary",3,"click"],["responsiveLayout","scroll","sortMode","multiple","responsiveLayout","scroll","styleClass","p-datatable-sm p-datatable-striped","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","scrollDirection","both",3,"value","paginator","rows","showCurrentPageReport","rowsPerPageOptions","resizableColumns","autoLayout"],["dt1",""],["pTemplate","header"],["pTemplate","body"],["otherFieldName","",3,"fullName"],[1,"fw-lighter"],[1,"d-block"],[1,"text-primary"],[1,"align-center","select-cursor",3,"click"],[1,"user-avatar","user-avatar-sm","bg-light"],[1,"icon","ni","ni-edit"]],template:function(n,t){1&n&&(e.TgZ(0,"app-add-item",0)(1,"span",1)(2,"a",2),e.NdJ("click",function(){return t.openRegionModalComponent(null,!0)}),e._UZ(3,"em",3),e.TgZ(4,"span"),e._uU(5,"Add region"),e.qZA()()()(),e.TgZ(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7),e._UZ(10,"em",8),e.qZA(),e.TgZ(11,"input",9),e.NdJ("ngModelChange",function(N){return t.searchedKeyword=N}),e.qZA()()(),e.TgZ(12,"div",5)(13,"button",10),e.NdJ("click",function(){return t.refreshButton()}),e._uU(14," Refresh "),e.qZA()()(),e.TgZ(15,"p-table",11,12),e.ALo(17,"filter"),e.YNc(18,K,13,0,"ng-template",13),e.YNc(19,k,34,27,"ng-template",14),e.qZA()),2&n&&(e.Q6J("pageTitleName","Region setup")("description","Setup state housing regions"),e.xp6(11),e.Q6J("ngModel",t.searchedKeyword),e.xp6(4),e.Q6J("value",e.xi3(17,10,t.listOfRegions,t.searchedKeyword))("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",e.DdM(13,H))("resizableColumns",!0)("autoLayout",!0))},dependencies:[c.ez,c.i8,c.rS,c.uU,g.U$,g.iA,j.jx,a.u5,a.Fj,a.JJ,a.On,p.c,u.L,Z.$,_.e,Q.i],encapsulation:2}),m})()}}]);