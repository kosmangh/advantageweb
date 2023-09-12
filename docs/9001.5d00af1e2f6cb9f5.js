"use strict";(self.webpackChunkadvantageweb=self.webpackChunkadvantageweb||[]).push([[9001],{3056:(Z,N,r)=>{r.d(N,{K:()=>d});class d{}},6763:(Z,N,r)=>{r.d(N,{k:()=>b});var d=r(5178),e=r(553),c=r(5109);class s{}var h=r(5879),F=r(7467),C=r(9862),f=r(7236);let b=(()=>{var _;class T{constructor(o,n,a){this.utilsService=o,this.http=n,this.logger=a,this.OCCUPANCY="/occupancy/"}createOccupant(o,n){return n.createdBy=o.username,n.nationality="GHANAIAN",n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"CREATE_OCCUPANT"),this.logger.info("create occupant request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}createoccupant`,n).pipe((0,d.V)(e.N.timeout))}updateOccupant(o,n){return n.lastModifiedBy=o.username,n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"UPDATE_OCCUPANT"),this.logger.info("update occupant request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}updateoccupant`,n).pipe((0,d.V)(e.N.timeout))}deleteOccupant(o,n){let a=new c.V;return a.recordId=n,a.deletedBy=o.username,a.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"DELETE_OCCUPANT"),this.logger.info("delete occupant request "+JSON.stringify(a)),this.http.post(`${e.N.url+this.OCCUPANCY}deleteoccupant`,a).pipe((0,d.V)(e.N.timeout))}searchOccupants(o,n){return n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"OCCUPANTS_LIST"),this.logger.info("searchOccupants request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}occupants`,n).pipe((0,d.V)(e.N.timeout))}searchOccupantProperties(o,n){return n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"OCCUPANT_PROPERTIES_LIST"),this.logger.info("searchOccupantProperties request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}occupantproperties`,n).pipe((0,d.V)(e.N.timeout))}quickSearchOccupantProperties(o,n,a){let A=new s;return A.searchText=n,A.occupationType=a,A.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"OCCUPANT_PROPERTIES_LIST"),this.http.post(`${e.N.url+this.OCCUPANCY}occupiedpropertiesquicksearch`,A)}createOccupantProperty(o,n){return n.createdBy=o.username,n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"CREATE_OCCUPANT_PROPERTY"),this.logger.info("create create occupantProperty request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}createoccupantproperty`,n).pipe((0,d.V)(e.N.timeout))}updateOccupantProperty(o,n){return n.lastModifiedBy=o.username,n.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"UPDATE_OCCUPANT_PROPERTY"),this.logger.info(" updateOccupantProperty request "+JSON.stringify(n)),this.http.post(`${e.N.url+this.OCCUPANCY}updateoccupantproperty`,n).pipe((0,d.V)(e.N.timeout))}deleteOccupantProperty(o,n){let a=new c.V;return a.recordId=n,a.deletedBy=o.username,a.headerRequest=this.utilsService.getRequestHeader(o.zoneId,o.regionId,"DELETE_OCCUPANT_PROPERTY"),this.logger.info("deleteOccupantProperty request "+JSON.stringify(a)),this.http.post(`${e.N.url+this.OCCUPANCY}deleteoccupantproperty`,a).pipe((0,d.V)(e.N.timeout))}}return(_=T).\u0275fac=function(o){return new(o||_)(h.LFG(F.F),h.LFG(C.eN),h.LFG(f.Kf))},_.\u0275prov=h.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),T})()},4874:(Z,N,r)=>{r.d(N,{i:()=>e});var d=r(5879);let e=(()=>{var c;class s{transform(F){return F.trim().split("_").map(f=>f.trim()).join(" ")}}return(c=s).\u0275fac=function(F){return new(F||c)},c.\u0275pipe=d.Yjl({name:"removeHyphen",type:c,pure:!0,standalone:!0}),s})()},1456:(Z,N,r)=>{r.d(N,{m:()=>$});var d=r(5861),e=r(5879),c=r(6814),s=r(95),h=r(995),F=r(1449),C=r(3519),f=r.n(C),b=r(2735),_=r(1392),T=r(1693),I=r(3221),o=r(6763),n=r(4782),a=r(6593),A=r(6842),M=r(7177),P=r(4981),U=r(7236);function q(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}const g=function(i){return{"is-invalid":i}};function S(i,u){if(1&i&&(e.TgZ(0,"li")(1,"div",54),e._UZ(2,"input",55),e.TgZ(3,"label",56),e._uU(4),e.qZA()()()),2&i){const p=u.$implicit,l=e.oxw();e.xp6(2),e.s9C("value",p.dataValue),e.Q6J("id",p.dataValue)("ngClass",e.VKq(5,g,((null==l.institutionForm.occupantType?null:l.institutionForm.occupantType.touched)||(null==l.institutionForm.occupantType?null:l.institutionForm.occupantType.dirty))&&!(null!=l.institutionForm.occupantType&&l.institutionForm.occupantType.valid))),e.xp6(1),e.s9C("for",p.dataValue),e.xp6(1),e.Oqu(p.dataLabel)}}function R(i,u){1&i&&(e.TgZ(0,"div",57),e._UZ(1,"app-required-field"),e.qZA())}function B(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function J(i,u){1&i&&(e.TgZ(0,"div"),e._uU(1," * Invalid mobile number "),e.qZA())}function D(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function Q(i,u){1&i&&(e.TgZ(0,"span"),e._UZ(1,"app-required-field"),e.qZA())}function Y(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function K(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function L(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function k(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function G(i,u){1&i&&(e.TgZ(0,"div"),e._uU(1," * Invalid mobile number "),e.qZA())}function V(i,u){1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function w(i,u){1&i&&(e.ynx(0),e.TgZ(1,"div",58),e._UZ(2,"input",59),e.TgZ(3,"label",60),e._uU(4," Save & create new occupant "),e.qZA()(),e.BQk())}function W(i,u){if(1&i){const p=e.EpF();e.TgZ(0,"div",41)(1,"button",61),e.NdJ("click",function(){e.CHM(p);const t=e.oxw();return e.KtG(t.updateOccupant())}),e._uU(2," Update occupant "),e.qZA()()}if(2&i){const p=e.oxw();e.xp6(1),e.Q6J("disabled",!p.supervisorFormGroup.valid)("title",p.supervisorFormGroup.invalid?"There must be errors on the form":"")}}function H(i,u){if(1&i){const p=e.EpF();e.TgZ(0,"div",41)(1,"button",61),e.NdJ("click",function(){e.CHM(p);const t=e.oxw();return e.KtG(t.saveOccupant())}),e._uU(2," Create occupant "),e.qZA()()}if(2&i){const p=e.oxw();e.xp6(1),e.Q6J("disabled",!p.supervisorFormGroup.valid)("title",p.supervisorFormGroup.invalid?"There must be errors on the form":"")}}const y=function(i,u){return{current:i,done:u}},E=function(i,u){return{"active ":i,done:u}},O=function(i){return{"is-valid":i}};let $=(()=>{var i;class u{constructor(l,t,v,m,z,j){this.title=l,this.addInstitutionOccupantBsModalRef=t,this.fb=v,this.accountService=m,this.alertService=z,this.logger=j,this.currentStep=1,this.personalSubmitted=!1,this.settingsService=(0,e.f3M)(F.g),this.occupantsService=(0,e.f3M)(o.k),this.router=(0,e.f3M)(n.F0),this.accountService.currentUser.subscribe(X=>this.currentUser=X)}continueStep(){this.currentStep<=3&&this.currentStep++}previousStep(){(this.currentStep<=3||this.currentStep<=0)&&this.currentStep--}ngOnInit(){if(this.currentStep=1,this.createPersonalInfoForm(),this.createSupervisorForm(),this.isAddMode)this.headerMsg="New estate block",this.title.setTitle(this.headerMsg);else if(this.headerMsg="Edit "+this.occupant.occupantName,this.title.setTitle(this.headerMsg),this.institutionFormGroup.patchValue(this.occupant),this.supervisorFormGroup.patchValue(this.occupant),this.occupant.dateOfBirth){let l=this.occupant.dateOfBirth.toString().replace("[UTC]","");this.institutionForm.dateOfBirth.setValue(new Date(l))}this.addInstitutionOccupantBsModalRef.setClass("gray modal-xl modal-dialog-top"),this.listOfGenders=this.settingsService.getGender(),this.listOfMaritalStatus=this.settingsService.getMaritalStatus(),this.listOfRelationship=this.settingsService.getRelationships(),this.listOfIdTypes=this.settingsService.getIdTypes(),this.listOfOccupantTypes=this.settingsService.getOccupantType()}createPersonalInfoForm(){this.institutionFormGroup=this.fb.group({occupantName:["",{updateOn:"blur",validators:[s.kI.required]}],mobileNo:["",{updateOn:"blur",validators:[s.kI.required,s.kI.minLength(10),s.kI.minLength(12)]}],emailAddress:["",[s.kI.required]],occupantType:["",[s.kI.required]],localAddress:["",[s.kI.required]],dateOfBirth:["",[s.kI.required]],occupation:["",[s.kI.required]],institutional:[!0],recordId:[""]})}createSupervisorForm(){this.supervisorFormGroup=this.fb.group({supervisorName:["",[s.kI.required]],supervisorMobileNo:["",[s.kI.required]],supervisorEmail:["",[s.kI.required]],supervisorAddress:["",[s.kI.required]],saveAndNew:[!1]})}get institutionForm(){return this.institutionFormGroup.controls}get supervisorForm(){return this.supervisorFormGroup.controls}saveOccupant(){let l=this.institutionForm.occupantName.value;f().fire({title:"Confirmation",text:`Do you want to create occupant  ${l}?`,icon:"question",position:"top",showCancelButton:!0,confirmButtonText:"Yes, create",cancelButtonText:"No, cancel"}).then(t=>{if(t.value){if(this.alertService.clear(),this.supervisorFormGroup.invalid)return;let v={...this.institutionFormGroup.value,...this.supervisorFormGroup.value};this.occupantsService.createOccupant(this.currentUser,v).subscribe({next:m=>{"000"===m.headerResponse.responseCode?(this.alertService.showSuccessMsg(`${l} created successfully`),this.supervisorForm.saveAndNew.value||(this.addInstitutionOccupantBsModalRef.hide(),this.accountService.reloadCurrentRoute()),this.institutionFormGroup.reset(),this.supervisorFormGroup.reset(),this.currentStep=1,this.logAction(`created institution occupant ${l}`,h.h.OCCUPANCY)):this.alertService.showErrorMsg(m.headerResponse.responseMessage)},error:m=>{this.alertService.showInfoMsg(m.message)}})}else f()})}updateOccupant(){let l=this.institutionForm.occupantName.value;f().fire({position:"top",title:"Confirmation",text:`Do you want to update ${l}?`,icon:"question",showCancelButton:!0,cancelButtonText:"No, cancel",confirmButtonText:"Yes, update"}).then(t=>{if(t.value){let v=Object.assign(this.institutionFormGroup.value,this.supervisorFormGroup.value);this.occupantsService.updateOccupant(this.currentUser,v).subscribe({next:m=>{this.logger.info("updateOccupant response:"+JSON.stringify(m)),"000"===m.headerResponse.responseCode?(this.alertService.showSuccessMsg(`${l} updated successfully`),this.addInstitutionOccupantBsModalRef.hide(),this.logAction(`Updated ${l}`,h.h.OCCUPANCY),this.accountService.reloadCurrentRoute()):this.alertService.showErrorMsg(m.headerResponse.responseMessage)},error:m=>{this.alertService.showInfoMsg(m.message)}})}else f()})}logAction(l,t){var v=this;return(0,d.Z)(function*(){yield v.accountService.logUserAudit(l,t)})()}}return(i=u).\u0275fac=function(l){return new(l||i)(e.Y36(a.Dx),e.Y36(A.UZ),e.Y36(s.qu),e.Y36(M.e),e.Y36(P.c),e.Y36(U.Kf))},i.\u0275cmp=e.Xpm({type:i,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:141,vars:104,consts:[[1,"modal-header"],[1,"modal-title"],["type","button btn-xs","aria-label","Close",1,"close","btn-close","pull-right",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[1,"card","card-bordered"],["id","stepper-create-profile","data-step-current","4","novalidate","novalidate",1,"nk-stepper","stepper-init","is-alter","nk-stepper-s1",2,"display","block"],[1,"row","g-0","col-sep","col-sep-md","col-sep-xl"],[1,"col-md-5","col-xl-5"],[1,"card-inner"],[1,"nk-stepper-nav","nk-stepper-nav-s1","stepper-nav","is-vr"],[3,"ngClass"],[1,"step-item"],[1,"step-text"],[1,"lead-text"],[1,"sub-text"],[1,"col-md-7","col-xl-7"],[1,"nk-stepper-content"],[1,"nk-stepper-steps","stepper-steps"],[1,"nk-stepper-step",3,"ngClass"],[1,"title","mb-2"],["novalidate","",3,"formGroup"],[1,"row","gy-2","mt-1"],[1,"col-sm-6"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["type","text","formControlName","occupantName","id","occupantName","autocomplete","off",1,"form-control",3,"ngClass"],[1,"invalid-feedback"],[4,"ngIf"],[1,"form-check-label",3,"labelForName","labelName"],[1,"custom-control-group"],[4,"ngFor","ngForOf"],["class","text-danger mt-1",4,"ngIf"],["type","tel","formControlName","mobileNo","id","mobileNo","autocomplete","off",1,"form-control",3,"ngClass"],["type","email","formControlName","emailAddress","id","emailAddress","autocomplete","off",1,"form-control",3,"ngClass"],["styleClass","w-100","formControlName","dateOfBirth","id","dateOfBirth","dateFormat","dd-mm-yy",3,"showIcon","ngClass"],["type","text","formControlName","occupation","id","occupation","autocomplete","off",1,"form-control",3,"ngClass"],[1,"col-sm-12"],["type","text","formControlName","localAddress","id","localAddress","autocomplete","off",1,"form-control",2,"min-height","30px",3,"ngClass"],[1,"row","gx-3","align-items-center","mt-2"],[1,"col-auto"],["type","button","title","",1,"btn","btn-outline-primary","mt-4",3,"click"],["type","button","title","",1,"btn","btn-primary","mt-4",3,"disabled","click"],[1,"title","mb-3"],[1,"row","gy-3","mt-1"],["type","text","formControlName","supervisorName","id","supervisorName","autocomplete","off",1,"form-control",3,"ngClass"],["type","tel","formControlName","supervisorMobileNo","id","supervisorMobileNo","autocomplete","off",1,"form-control",3,"ngClass"],["type","email","formControlName","supervisorEmail","id","supervisorMobileNo","autocomplete","off",1,"form-control",3,"ngClass"],[3,"labelForName","showRequired","labelName"],["type","supervisorAddress","formControlName","supervisorAddress","id","supervisorAddress",1,"form-control",2,"min-height","30px"],[1,"row","gx-3","align-items-center","mt-5"],["type","button","title","",1,"btn","btn-outline-primary",3,"click"],["class","col-auto",4,"ngIf"],[1,"custom-control","custom-radio","custom-control-pro","no-control"],["formControlName","occupantType","name","occupantType","type","radio",1,"custom-control-input","form-check-input",3,"id","value","ngClass"],[1,"custom-control-label","form-check-label",3,"for"],[1,"text-danger","mt-1"],[1,"custom-control","custom-control-sm","custom-checkbox","checked"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew",1,"custom-control-input"],["for","saveAndNew",1,"custom-control-label","fw-bolder"],[1,"btn","btn-primary",3,"disabled","title","click"]],template:function(l,t){1&l&&(e.TgZ(0,"div",0)(1,"h6",1),e._uU(2),e.ALo(3,"titlecase"),e.qZA(),e.TgZ(4,"button",2),e.NdJ("click",function(){return null==t.addInstitutionOccupantBsModalRef?null:t.addInstitutionOccupantBsModalRef.hide()}),e.TgZ(5,"span",3),e._uU(6,"\xd7"),e.qZA()()(),e.TgZ(7,"div",4)(8,"div",5)(9,"form",6)(10,"div",7)(11,"div",8)(12,"div",9)(13,"ul",10)(14,"li",11)(15,"div",12)(16,"div",13)(17,"div",14),e._uU(18,"Institution Information"),e.qZA(),e.TgZ(19,"div",15),e._uU(20," Institution details of occupant "),e.qZA()()()(),e.TgZ(21,"li",11)(22,"div",12)(23,"div",13)(24,"div",14),e._uU(25,"Supervisor/Top Role"),e.qZA(),e.TgZ(26,"div",15),e._uU(27,"Supervisor or top person details. "),e.qZA()()()()()()(),e.TgZ(28,"div",16)(29,"div",9)(30,"div",17)(31,"div",18)(32,"div",19)(33,"h5",20),e._uU(34,"Institution Information"),e.qZA(),e.TgZ(35,"p"),e._uU(36," Provide the institution information "),e.qZA(),e._UZ(37,"app-required-fields-notice"),e.TgZ(38,"form",21)(39,"div",22)(40,"div",23)(41,"div",24),e._UZ(42,"app-form-label",25),e.TgZ(43,"div",26),e._UZ(44,"input",27),e.TgZ(45,"span",28),e.YNc(46,q,2,0,"div",29),e.qZA()()()(),e.TgZ(47,"div",23)(48,"div",24),e._UZ(49,"app-form-label",30),e.TgZ(50,"div",26)(51,"ul",31),e.YNc(52,S,5,7,"li",32),e.qZA(),e.YNc(53,R,2,0,"div",33),e.qZA()()(),e.TgZ(54,"div",23)(55,"div",24),e._UZ(56,"app-form-label",25),e.TgZ(57,"div",26),e._UZ(58,"input",34),e.TgZ(59,"span",28),e.YNc(60,B,2,0,"div",29),e.YNc(61,J,2,0,"div",29),e.qZA()()()(),e.TgZ(62,"div",23)(63,"div",24),e._UZ(64,"app-form-label",25),e.TgZ(65,"div",26),e._UZ(66,"input",35),e.TgZ(67,"span",28),e.YNc(68,D,2,0,"div",29),e.qZA()()()(),e.TgZ(69,"div",23)(70,"div",24),e._UZ(71,"app-form-label",25)(72,"p-calendar",36),e.TgZ(73,"span",28),e.YNc(74,Q,2,0,"span",29),e.qZA()()(),e.TgZ(75,"div",23)(76,"div",24),e._UZ(77,"app-form-label",25),e.TgZ(78,"div",26),e._UZ(79,"input",37),e.TgZ(80,"span",28),e.YNc(81,Y,2,0,"div",29),e.qZA()()()(),e.TgZ(82,"div",38)(83,"div",24),e._UZ(84,"app-form-label",25),e.TgZ(85,"div",26)(86,"textarea",39),e._uU(87,"                                                        "),e.qZA(),e.TgZ(88,"span",28),e.YNc(89,K,2,0,"div",29),e.qZA()()()()(),e.TgZ(90,"div",40)(91,"div",41)(92,"button",42),e.NdJ("click",function(){return null==t.addInstitutionOccupantBsModalRef?null:t.addInstitutionOccupantBsModalRef.hide()}),e._uU(93," Cancel "),e.qZA()(),e.TgZ(94,"div",41)(95,"button",43),e.NdJ("click",function(){return t.continueStep()}),e._uU(96," Continue "),e.qZA()()()()(),e.TgZ(97,"div",19)(98,"h5",44),e._uU(99,"Supervisor/Top Role"),e.qZA(),e.TgZ(100,"p"),e._uU(101," Provide supervisor or a top role details "),e.qZA(),e._UZ(102,"app-required-fields-notice"),e.TgZ(103,"form",21)(104,"div",45)(105,"div",23)(106,"div",24),e._UZ(107,"app-form-label",25),e.TgZ(108,"div",26),e._UZ(109,"input",46),e.TgZ(110,"span",28),e.YNc(111,L,2,0,"div",29),e.qZA()()()(),e.TgZ(112,"div",23)(113,"div",24),e._UZ(114,"app-form-label",25),e.TgZ(115,"div",26),e._UZ(116,"input",47),e.TgZ(117,"span",28),e.YNc(118,k,2,0,"div",29),e.YNc(119,G,2,0,"div",29),e.qZA()()()(),e.TgZ(120,"div",23)(121,"div",24),e._UZ(122,"app-form-label",25),e.TgZ(123,"div",26),e._UZ(124,"input",48),e.TgZ(125,"span",28),e.YNc(126,V,2,0,"div",29),e.qZA()()()(),e.TgZ(127,"div",23)(128,"div",24),e._UZ(129,"app-form-label",49),e.TgZ(130,"div",26)(131,"textarea",50),e._uU(132,"                                                        "),e.qZA()()()(),e.TgZ(133,"div",38),e.YNc(134,w,5,0,"ng-container",29),e.qZA()(),e.TgZ(135,"div",51)(136,"div",41)(137,"button",52),e.NdJ("click",function(){return t.previousStep()}),e._uU(138," Back "),e.qZA()(),e.YNc(139,W,3,2,"div",53),e.YNc(140,H,3,2,"div",53),e.qZA()()()()()()()()()()()),2&l&&(e.xp6(2),e.hij("",e.lcZ(3,62,t.headerMsg)," Occupant"),e.xp6(12),e.Q6J("ngClass",e.WLB(64,y,1===t.currentStep,t.currentStep>1)),e.xp6(7),e.Q6J("ngClass",e.WLB(67,y,2===t.currentStep,t.currentStep>2)),e.xp6(11),e.Q6J("ngClass",e.WLB(70,E,1===t.currentStep,2===t.currentStep)),e.xp6(6),e.Q6J("formGroup",t.institutionFormGroup),e.xp6(4),e.Q6J("labelForName","occupantName")("labelName","Institution Name"),e.xp6(2),e.Q6J("ngClass",e.VKq(73,O,null==t.institutionForm.occupantName?null:t.institutionForm.occupantName.valid))("ngClass",e.VKq(75,g,((null==t.institutionForm.occupantName?null:t.institutionForm.occupantName.touched)||(null==t.institutionForm.occupantName?null:t.institutionForm.occupantName.dirty))&&!(null!=t.institutionForm.occupantName&&t.institutionForm.occupantName.valid))),e.xp6(2),e.Q6J("ngIf",null==t.institutionForm.occupantName||null==t.institutionForm.occupantName.errors?null:t.institutionForm.occupantName.errors.required),e.xp6(3),e.Q6J("labelForName","occupantType")("labelName","Occupant Type"),e.xp6(3),e.Q6J("ngForOf",t.listOfOccupantTypes),e.xp6(1),e.Q6J("ngIf",((null==t.institutionForm.gender?null:t.institutionForm.gender.touched)||(null==t.institutionForm.gender?null:t.institutionForm.gender.dirty))&&!(null!=t.institutionForm.gender&&t.institutionForm.gender.valid)),e.xp6(3),e.Q6J("labelForName","mobileNo")("labelName","Phone Number"),e.xp6(2),e.Q6J("ngClass",e.VKq(77,O,null==t.institutionForm.mobileNo?null:t.institutionForm.mobileNo.valid))("ngClass",e.VKq(79,g,((null==t.institutionForm.mobileNo?null:t.institutionForm.mobileNo.touched)||(null==t.institutionForm.mobileNo?null:t.institutionForm.mobileNo.dirty))&&!(null!=t.institutionForm.mobileNo&&t.institutionForm.mobileNo.valid))),e.xp6(2),e.Q6J("ngIf",null==t.institutionForm.mobileNo||null==t.institutionForm.mobileNo.errors?null:t.institutionForm.mobileNo.errors.required),e.xp6(1),e.Q6J("ngIf",(null==t.institutionForm.mobileNo||null==t.institutionForm.mobileNo.errors?null:t.institutionForm.mobileNo.errors.minlength)||(null==t.institutionForm.mobileNo||null==t.institutionForm.mobileNo.errors?null:t.institutionForm.mobileNo.errors.maxlength)),e.xp6(3),e.Q6J("labelForName","emailAddress")("labelName","Email"),e.xp6(2),e.Q6J("ngClass",e.VKq(81,O,null==t.institutionForm.emailAddress?null:t.institutionForm.emailAddress.valid))("ngClass",e.VKq(83,g,((null==t.institutionForm.emailAddress?null:t.institutionForm.emailAddress.touched)||(null==t.institutionForm.emailAddress?null:t.institutionForm.emailAddress.dirty))&&!(null!=t.institutionForm.emailAddress&&t.institutionForm.emailAddress.valid))),e.xp6(2),e.Q6J("ngIf",null==t.institutionForm.emailAddress||null==t.institutionForm.emailAddress.errors?null:t.institutionForm.emailAddress.errors.required),e.xp6(3),e.Q6J("labelForName","dateOfBirth")("labelName","Business Registration Date"),e.xp6(1),e.Q6J("showIcon",!0)("ngClass",e.VKq(85,g,((null==t.institutionForm.dateOfBirth?null:t.institutionForm.dateOfBirth.touched)||(null==t.institutionForm.dateOfBirth?null:t.institutionForm.dateOfBirth.dirty))&&!(null!=t.institutionForm.dateOfBirth&&t.institutionForm.dateOfBirth.valid))),e.xp6(2),e.Q6J("ngIf",null==t.institutionForm.dateOfBirth||null==t.institutionForm.dateOfBirth.errors?null:t.institutionForm.dateOfBirth.errors.required),e.xp6(3),e.Q6J("labelForName","occupation")("labelName","Core Business"),e.xp6(2),e.Q6J("ngClass",e.VKq(87,O,null==t.institutionForm.occupation?null:t.institutionForm.occupation.valid))("ngClass",e.VKq(89,g,((null==t.institutionForm.occupation?null:t.institutionForm.occupation.touched)||(null==t.institutionForm.occupation?null:t.institutionForm.occupation.dirty))&&!(null!=t.institutionForm.occupation&&t.institutionForm.occupation.valid))),e.xp6(2),e.Q6J("ngIf",null==t.institutionForm.occupation||null==t.institutionForm.occupation.errors?null:t.institutionForm.occupation.errors.required),e.xp6(3),e.Q6J("labelForName","localAddress")("labelName","Address"),e.xp6(2),e.Q6J("ngClass",e.VKq(91,O,null==t.institutionForm.localAddress?null:t.institutionForm.localAddress.valid))("ngClass",e.VKq(93,g,((null==t.institutionForm.localAddress?null:t.institutionForm.localAddress.touched)||(null==t.institutionForm.localAddress?null:t.institutionForm.localAddress.dirty))&&!(null!=t.institutionForm.localAddress&&t.institutionForm.localAddress.valid))),e.xp6(3),e.Q6J("ngIf",null==t.institutionForm.localAddress||null==t.institutionForm.localAddress.errors?null:t.institutionForm.localAddress.errors.required),e.xp6(6),e.Q6J("disabled",!t.institutionFormGroup.valid),e.xp6(2),e.Q6J("ngClass",e.WLB(95,E,2===t.currentStep,3===t.currentStep)),e.xp6(6),e.Q6J("formGroup",t.supervisorFormGroup),e.xp6(4),e.Q6J("labelForName","supervisorName")("labelName","Full Name"),e.xp6(2),e.Q6J("ngClass",e.VKq(98,g,((null==t.supervisorForm.supervisorName?null:t.supervisorForm.supervisorName.touched)||(null==t.supervisorForm.supervisorName?null:t.supervisorForm.supervisorName.dirty))&&!(null!=t.supervisorForm.supervisorName&&t.supervisorForm.supervisorName.valid))),e.xp6(2),e.Q6J("ngIf",null==t.supervisorForm.supervisorName||null==t.supervisorForm.supervisorName.errors?null:t.supervisorForm.supervisorName.errors.required),e.xp6(3),e.Q6J("labelForName","supervisorMobileNo")("labelName","Phone No."),e.xp6(2),e.Q6J("ngClass",e.VKq(100,g,((null==t.supervisorForm.supervisorMobileNo?null:t.supervisorForm.supervisorMobileNo.touched)||(null==t.supervisorForm.supervisorMobileNo?null:t.supervisorForm.supervisorMobileNo.dirty))&&!(null!=t.supervisorForm.supervisorMobileNo&&t.supervisorForm.supervisorMobileNo.valid))),e.xp6(2),e.Q6J("ngIf",null==t.supervisorForm.supervisorMobileNo||null==t.supervisorForm.supervisorMobileNo.errors?null:t.supervisorForm.supervisorMobileNo.errors.required),e.xp6(1),e.Q6J("ngIf",(null==t.supervisorForm.supervisorMobileNo||null==t.supervisorForm.supervisorMobileNo.errors?null:t.supervisorForm.supervisorMobileNo.errors.minlength)||(null==t.supervisorForm.supervisorMobileNo||null==t.supervisorForm.supervisorMobileNo.errors?null:t.supervisorForm.supervisorMobileNo.errors.maxlength)),e.xp6(3),e.Q6J("labelForName","supervisorEmail")("labelName","Email"),e.xp6(2),e.Q6J("ngClass",e.VKq(102,g,((null==t.supervisorForm.supervisorEmail?null:t.supervisorForm.supervisorEmail.touched)||(null==t.supervisorForm.supervisorEmail?null:t.supervisorForm.supervisorEmail.dirty))&&!(null!=t.supervisorForm.supervisorEmail&&t.supervisorForm.supervisorEmail.valid))),e.xp6(2),e.Q6J("ngIf",null==t.supervisorForm.supervisorEmail||null==t.supervisorForm.supervisorEmail.errors?null:t.supervisorForm.supervisorEmail.errors.required),e.xp6(3),e.Q6J("labelForName","supervisorAddress")("showRequired",!1)("labelName","Address"),e.xp6(5),e.Q6J("ngIf",t.isAddMode),e.xp6(5),e.Q6J("ngIf",!t.isAddMode),e.xp6(1),e.Q6J("ngIf",t.isAddMode))},dependencies:[c.ez,c.mk,c.sg,c.O5,c.rS,s.UX,s._Y,s.Fj,s.Wl,s._,s.JJ,s.JL,s.sg,s.u,I.z,s.u5,s.F,b.h,T.M,_._8,_.f],encapsulation:2}),u})()}}]);