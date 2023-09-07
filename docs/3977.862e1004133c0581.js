"use strict";(self.webpackChunkadvantageweb=self.webpackChunkadvantageweb||[]).push([[3977],{3977:(x,g,a)=>{a.r(g),a.d(g,{BackRentalBillingComponent:()=>w});var c=a(5861),u=a(6814),i=a(95),m=a(4740),B=a(4647),h=a(1392),f=a(995),v=a(2735),F=a(1693),Z=a(3221),M=a(3519),_=a.n(M),I=a(5176),e=a(5879),T=a(7962),b=a(7467),A=a(1449),C=a(6842),E=a(7177),N=a(4981),O=a(7236);function U(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o.recordId),e.xp6(1),e.hij(" ",o.estateName," ")}}function R(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function Y(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o.recordId),e.xp6(1),e.hij(" ",o.block," ")}}function q(r,t){1&r&&(e.TgZ(0,"div",35),e._UZ(1,"app-required-field"),e.qZA())}function P(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o.recordId),e.xp6(1),e.AsE(" ",o.propertyName," ",o.recordId," ")}}function k(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function y(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function J(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function D(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function S(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function Q(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function K(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function L(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}function W(r,t){if(1&r&&(e.TgZ(0,"ng-option",34),e._uU(1),e.qZA()),2&r){const o=t.$implicit;e.Q6J("value",o),e.xp6(1),e.hij(" ",o," ")}}function V(r,t){1&r&&(e.TgZ(0,"div"),e._UZ(1,"app-required-field"),e.qZA())}const d=function(r){return{"is-invalid":r}},p=function(r){return{"is-valid":r}};let w=(()=>{var r;class t{constructor(n,l,s,j,G,$,z,X){this.rentBillingService=n,this.utilsService=l,this.settingsService=s,this.addRentalBillBsModalRef=j,this.fb=G,this.accountService=$,this.alertService=z,this.logger=X,this.submitted=!1,this.accountService.currentUser.subscribe(H=>this.currentUser=H)}ngOnInit(){this.fetchEstates(),this.createNewForm(),this.listOfChargeYears=this.utilsService.getChargeYears(),this.listOfMonths=this.utilsService.getMonthsOfYear()}createNewForm(){this.rentalBillFormGroup=this.fb.group({estateId:["",[i.kI.required]],blockId:["",[i.kI.required]],propertyId:["",[i.kI.required]],rentAmount:["",[i.kI.required]],startYear:["",[i.kI.required]],startMonth:["",[i.kI.required]],endMonth:["",[i.kI.required]],endYear:["",[i.kI.required]],recordId:[""],billingType:["PROP"],saveAndNew:[!1]}),this.rentalBillForm.startMonth.setValue(this.utilsService.getLastMonthName()),this.rentalBillForm.startYear.setValue(this.utilsService.getLastDayOfPreviousMonth().getFullYear()),this.rentalBillForm.endMonth.setValue(this.utilsService.getCurrentMonthName()),this.rentalBillForm.endYear.setValue((new Date).getFullYear())}get rentalBillForm(){return this.rentalBillFormGroup.controls}resetRentalBill(){this.createNewForm()}applyBackRentalBill(){if(this.submitted=!0,this.rentalBillFormGroup.invalid)return;let n=this.listOfProperties.find(l=>l.recordId===this.rentalBillForm.propertyId.value)?.propertyName;_().fire({title:"Confirmation",text:`Do you want to apply ground rent bill for  ${n} property?`,icon:"question",position:"top",showCancelButton:!0,confirmButtonText:"Yes, create",cancelButtonText:"No, cancel"}).then(l=>{l.value?(this.alertService.clear(),this.rentBillingService.applyBackRentalBill(this.currentUser,this.rentalBillFormGroup.value).subscribe({next:s=>{"000"===s.headerResponse.responseCode?(this.alertService.showSuccessMsg(s.headerResponse.responseMessage),this.submitted=!1,this.logAction(`Applied ground rent bill for ${n}`,f.h.ESTATE_BILLING)):this.alertService.showErrorMsg(s.headerResponse.responseMessage)},error:s=>{this.alertService.showInfoMsg(s)}})):_()})}fetchEstates(){this.listOfEstates=[],this.settingsService.getEstates().subscribe({next:n=>{if(this.logger.info("getEstates response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.estates.length<=0?(this.alertService.showInfoMsgGeneral("No zones found"),void this.logger.info("No zones found")):void(this.listOfEstates=n.estates);this.alertService.error(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n),this.alertService.showInfoMsg(n)}})}fetchBlocks(){this.listOfBlocks=[],this.settingsService.getEstateBlocks(this.currentUser,this.rentalBillForm.estateId.value).subscribe({next:n=>{if(this.logger.info("getEstateBlocks response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.estateBlocks.length<=0?(this.alertService.showInfoMsgGeneral("No blocks found"),void this.logger.info("No blocks found")):void(this.listOfBlocks=n.estateBlocks);this.alertService.error(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n),this.alertService.showInfoMsg(n)}})}fetchEstateProperties(){this.listOfProperties=[],this.settingsService.getEstateProperties(this.currentUser,this.rentalBillForm.blockId.value,!0,"RENTAL").subscribe({next:n=>{if(this.logger.info("getEstateProperties response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.properties.length<=0?(this.alertService.showInfoMsgGeneral("No properties found"),this.logger.info("No properties found "),void this.rentalBillForm.propertyId.setValue("No properties found")):void(this.listOfProperties=n.properties);this.alertService.error(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n.message),this.alertService.showInfoMsg(n.message)}})}logAction(n,l){var s=this;return(0,c.Z)(function*(){yield s.accountService.logUserAudit(n,l)})()}}return(r=t).\u0275fac=function(n){return new(n||r)(e.Y36(T.r),e.Y36(b.F),e.Y36(A.g),e.Y36(C.UZ),e.Y36(i.qu),e.Y36(E.e),e.Y36(N.c),e.Y36(O.Kf))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:101,vars:80,consts:[[1,"card","card-no-border"],[1,"card-inner"],["novalidate","",3,"formGroup"],[1,"row"],[1,"col-2"],[1,"col-8"],[3,"pageTitleName","description"],[1,"card-bordered"],[1,"row","gy-4"],[1,"col-sm-6"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["id","estateid","formControlName","estateId",3,"clearable","ngClass","change"],["value","","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],[1,"invalid-feedback"],[4,"ngIf"],["id","estateid","formControlName","blockId",3,"clearable","ngClass","change"],["class","text-danger",4,"ngIf"],["id","propertyId","formControlName","propertyId",3,"clearable","ngClass"],["type","number","formControlName","rentAmount","id","rentAmount","autocomplete","off",1,"form-control",3,"ngClass"],["id","startMonth","formControlName","startMonth",3,"clearable","ngClass"],["id","startYear","formControlName","startYear",3,"clearable","ngClass"],["id","endMonth","formControlName","endMonth",3,"clearable","ngClass"],["id","endYear","formControlName","endYear",3,"clearable","ngClass"],[1,"col-sm-12"],[1,"custom-control","custom-control-sm","custom-checkbox","checked"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew","id","saveAndNew",1,"custom-control-input"],["for","saveAndNew",1,"custom-control-label","fw-bolder"],[1,"row","my-3","mb-3","justify-content-end"],[1,"col-auto"],["data-bs-dismiss","modal",1,"btn","btn-outline-light","btn-sm",3,"click"],[1,"btn","btn-primary","btn-sm",3,"click"],[3,"value"],[1,"text-danger"]],template:function(n,l){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"form",2)(3,"div",3),e._UZ(4,"div",4),e.TgZ(5,"div",5),e._UZ(6,"app-add-item",6),e.TgZ(7,"div",7)(8,"div",1)(9,"div",8),e._UZ(10,"app-required-fields-notice"),e.TgZ(11,"div",9)(12,"div",10),e._UZ(13,"app-form-label",11),e.TgZ(14,"div",12)(15,"ng-select",13),e.NdJ("change",function(){return l.fetchBlocks()}),e.TgZ(16,"ng-option",14),e._uU(17,"Select Estate"),e.qZA(),e.YNc(18,U,2,2,"ng-option",15),e.qZA(),e.TgZ(19,"span",16),e.YNc(20,R,2,0,"div",17),e.qZA()()()(),e.TgZ(21,"div",9)(22,"div",10),e._UZ(23,"app-form-label",11),e.TgZ(24,"div",12)(25,"ng-select",18),e.NdJ("change",function(){return l.fetchEstateProperties()}),e.TgZ(26,"ng-option",14),e._uU(27,"Select Block"),e.qZA(),e.YNc(28,Y,2,2,"ng-option",15),e.qZA(),e.TgZ(29,"span",16),e.YNc(30,q,2,0,"div",19),e.qZA()()()(),e.TgZ(31,"div",9)(32,"div",10),e._UZ(33,"app-form-label",11),e.TgZ(34,"div",12)(35,"ng-select",20)(36,"ng-option",14),e._uU(37,"Select Property"),e.qZA(),e.YNc(38,P,2,3,"ng-option",15),e.qZA(),e.TgZ(39,"span",16),e.YNc(40,k,2,0,"div",17),e.qZA()()()(),e.TgZ(41,"div",9)(42,"div",10),e._UZ(43,"app-form-label",11),e.TgZ(44,"div",12),e._UZ(45,"input",21),e.TgZ(46,"span",16),e.YNc(47,y,2,0,"div",17),e.qZA()()()(),e.TgZ(48,"div",9)(49,"div",10),e._UZ(50,"app-form-label",11),e.TgZ(51,"div",12)(52,"ng-select",22)(53,"ng-option",14),e._uU(54,"Select Start Month"),e.qZA(),e.YNc(55,J,2,2,"ng-option",15),e.qZA(),e.TgZ(56,"span",16),e.YNc(57,D,2,0,"div",17),e.qZA()()()(),e.TgZ(58,"div",9)(59,"div",10),e._UZ(60,"app-form-label",11),e.TgZ(61,"div",12)(62,"ng-select",23)(63,"ng-option",14),e._uU(64,"Select Property"),e.qZA(),e.YNc(65,S,2,2,"ng-option",15),e.qZA(),e.TgZ(66,"span",16),e.YNc(67,Q,2,0,"div",17),e.qZA()()()(),e.TgZ(68,"div",9)(69,"div",10),e._UZ(70,"app-form-label",11),e.TgZ(71,"div",12)(72,"ng-select",24)(73,"ng-option",14),e._uU(74,"Select Property"),e.qZA(),e.YNc(75,K,2,2,"ng-option",15),e.qZA(),e.TgZ(76,"span",16),e.YNc(77,L,2,0,"div",17),e.qZA()()()(),e.TgZ(78,"div",9)(79,"div",10),e._UZ(80,"app-form-label",11),e.TgZ(81,"div",12)(82,"ng-select",25)(83,"ng-option",14),e._uU(84,"Select Property"),e.qZA(),e.YNc(85,W,2,2,"ng-option",15),e.qZA(),e.TgZ(86,"span",16),e.YNc(87,V,2,0,"div",17),e.qZA()()()(),e.TgZ(88,"div",26)(89,"div",27),e._UZ(90,"input",28),e.TgZ(91,"label",29),e._uU(92," Save & select new property "),e.qZA()()()(),e.TgZ(93,"div",30)(94,"div",31)(95,"button",32),e.NdJ("click",function(){return l.resetRentalBill()}),e._uU(96," Reset "),e.qZA()(),e.TgZ(97,"div",31)(98,"button",33),e.NdJ("click",function(){return l.applyBackRentalBill()}),e._uU(99," Apply back billing "),e.qZA()()()()()(),e._UZ(100,"div",4),e.qZA()()()()),2&n&&(e.xp6(2),e.Q6J("formGroup",l.rentalBillFormGroup),e.xp6(4),e.Q6J("pageTitleName","Back Rental Billing")("description","Apply rental bill for previous months and years"),e.xp6(7),e.Q6J("labelForName","estateId")("labelName","Estate"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(54,d,((null==l.rentalBillForm.estateId?null:l.rentalBillForm.estateId.touched)||(null==l.rentalBillForm.estateId?null:l.rentalBillForm.estateId.dirty)||l.submitted)&&(null==l.rentalBillForm.estateId?null:l.rentalBillForm.estateId.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfEstates),e.xp6(2),e.Q6J("ngIf",(null==l.rentalBillForm.estateId||null==l.rentalBillForm.estateId.errors?null:l.rentalBillForm.estateId.errors.required)||l.submitted),e.xp6(3),e.Q6J("labelForName","blockId")("labelName","Block"),e.xp6(2),e.Q6J("clearable",!0)("ngClass",e.VKq(56,d,((null==l.rentalBillForm.blockId?null:l.rentalBillForm.blockId.touched)||(null==l.rentalBillForm.blockId?null:l.rentalBillForm.blockId.dirty)||l.submitted)&&(null==l.rentalBillForm.blockId?null:l.rentalBillForm.blockId.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfBlocks),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.blockId||null==l.rentalBillForm.blockId.errors?null:l.rentalBillForm.blockId.errors.required),e.xp6(3),e.Q6J("labelForName","propertyId")("labelName","Estate Properties"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(58,p,null==l.rentalBillForm.propertyId?null:l.rentalBillForm.propertyId.valid))("ngClass",e.VKq(60,d,((null==l.rentalBillForm.propertyId?null:l.rentalBillForm.propertyId.touched)||(null==l.rentalBillForm.propertyId?null:l.rentalBillForm.propertyId.dirty)||l.submitted)&&(null==l.rentalBillForm.propertyId?null:l.rentalBillForm.propertyId.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfProperties),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.propertyId||null==l.rentalBillForm.propertyId.errors?null:l.rentalBillForm.propertyId.errors.required),e.xp6(3),e.Q6J("labelForName","rentAmount")("labelName","Rent Charge"),e.xp6(2),e.Q6J("ngClass",e.VKq(62,d,((null==l.rentalBillForm.rentAmount?null:l.rentalBillForm.rentAmount.touched)||(null==l.rentalBillForm.rentAmount?null:l.rentalBillForm.rentAmount.dirty)||l.submitted)&&(null==l.rentalBillForm.rentAmount?null:l.rentalBillForm.rentAmount.errors))),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.rentAmount||null==l.rentalBillForm.rentAmount.errors?null:l.rentalBillForm.rentAmount.errors.required),e.xp6(3),e.Q6J("labelForName","startMonth")("labelName","Start Month"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(64,p,null==l.rentalBillForm.startMonth?null:l.rentalBillForm.startMonth.valid))("ngClass",e.VKq(66,d,((null==l.rentalBillForm.startMonth?null:l.rentalBillForm.startMonth.touched)||(null==l.rentalBillForm.startMonth?null:l.rentalBillForm.startMonth.dirty)||l.submitted)&&(null==l.rentalBillForm.startMonth?null:l.rentalBillForm.startMonth.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfMonths),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.startMonth||null==l.rentalBillForm.startMonth.errors?null:l.rentalBillForm.startMonth.errors.required),e.xp6(3),e.Q6J("labelForName","startYear")("labelName","Start Year"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(68,p,null==l.rentalBillForm.startYear?null:l.rentalBillForm.startYear.valid))("ngClass",e.VKq(70,d,((null==l.rentalBillForm.startYear?null:l.rentalBillForm.startYear.touched)||(null==l.rentalBillForm.startYear?null:l.rentalBillForm.startYear.dirty)||l.submitted)&&(null==l.rentalBillForm.startYear?null:l.rentalBillForm.startYear.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfChargeYears),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.startYear||null==l.rentalBillForm.startYear.errors?null:l.rentalBillForm.startYear.errors.required),e.xp6(3),e.Q6J("labelForName","endMonth")("labelName","End Month"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(72,p,null==l.rentalBillForm.endMonth?null:l.rentalBillForm.endMonth.valid))("ngClass",e.VKq(74,d,((null==l.rentalBillForm.endMonth?null:l.rentalBillForm.endMonth.touched)||(null==l.rentalBillForm.endMonth?null:l.rentalBillForm.endMonth.dirty)||l.submitted)&&(null==l.rentalBillForm.endMonth?null:l.rentalBillForm.endMonth.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfMonths),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.endMonth||null==l.rentalBillForm.endMonth.errors?null:l.rentalBillForm.endMonth.errors.required),e.xp6(3),e.Q6J("labelForName","endYear")("labelName","End Year"),e.xp6(2),e.Q6J("clearable",!1)("ngClass",e.VKq(76,p,null==l.rentalBillForm.endYear?null:l.rentalBillForm.endYear.valid))("ngClass",e.VKq(78,d,((null==l.rentalBillForm.endYear?null:l.rentalBillForm.endYear.touched)||(null==l.rentalBillForm.endYear?null:l.rentalBillForm.endYear.dirty)||l.submitted)&&(null==l.rentalBillForm.endYear?null:l.rentalBillForm.endYear.errors))),e.xp6(3),e.Q6J("ngForOf",l.listOfChargeYears),e.xp6(2),e.Q6J("ngIf",null==l.rentalBillForm.endYear||null==l.rentalBillForm.endYear.errors?null:l.rentalBillForm.endYear.errors.required))},dependencies:[u.ez,u.mk,u.sg,u.O5,i.u5,i._Y,i.Fj,i.wV,i.Wl,i.JJ,i.JL,i.UX,i.sg,i.u,Z.z,h._8,v.h,F.M,m.A0,m.w9,m.jq,B.P4,I.L],encapsulation:2}),t})()}}]);