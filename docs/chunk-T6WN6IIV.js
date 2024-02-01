import{a as X,b as Q,c as W}from"./chunk-QQMX5O62.js";import{a as Be}from"./chunk-IP4FBAZW.js";import{b as Ne,c as Fe,d as ke}from"./chunk-7PQCCLGB.js";import{a as Ie}from"./chunk-T45HSKH6.js";import{d as Y}from"./chunk-WH3N5QDN.js";import{i as Ce,s as Ee,t as Pe}from"./chunk-KPCRGR73.js";import{h as K,i as Me}from"./chunk-543WOPA4.js";import"./chunk-5WO4BOAD.js";import{a as be}from"./chunk-NEQ5BFSP.js";import{b as me,c as z,e as F,f as L,g as de,k as ce,l as ue,m as ge,n as fe,o as he,p as ye,q as U,r as D,s as $,u as ve,v as j,w as _e,x as J}from"./chunk-B2QESFZG.js";import"./chunk-Y725X6Z7.js";import{b as Se,c as H}from"./chunk-R55IMLXW.js";import"./chunk-LPKVFVKE.js";import{b as V,d as G,g as q}from"./chunk-IHPVOZWG.js";import"./chunk-HPGLX4ZN.js";import{m as pe}from"./chunk-7DWKZ4XI.js";import{Ab as te,Bb as oe,Eb as p,Fb as _,Gb as C,Ic as le,Kc as T,Lc as A,Mb as x,Nb as ne,Ob as E,Qc as O,Sa as a,Ta as f,Tc as se,Uc as R,Wb as b,Xb as N,Yb as ae,bb as l,ib as c,la as w,nb as r,ob as i,pb as d,qa as y,qb as k,ra as v,rb as B,tb as S,wb as g,xb as u}from"./chunk-QRSQYA3Q.js";import{d as re,e as ie}from"./chunk-5FZOKLP6.js";var xe=re(Se());var I=re(Se());function De(o,m){if(o&1&&(r(0,"ng-option",37),p(1),i()),o&2){let n=m.$implicit;l("value",n.recordId),a(1),C(" ",n.estateName," ")}}function $e(o,m){o&1&&(r(0,"div"),d(1,"app-required-field"),i())}function je(o,m){if(o&1&&(r(0,"ng-option",37),p(1),i()),o&2){let n=m.$implicit;l("value",n.recordId),a(1),C(" ",n.block," ")}}function He(o,m){o&1&&(r(0,"div",38),d(1,"app-required-field"),i())}function Je(o,m){o&1&&(r(0,"div"),d(1,"app-required-field"),i())}function Ke(o,m){o&1&&(r(0,"div"),d(1,"app-required-field"),i())}function Ye(o,m){o&1&&(r(0,"div"),d(1,"app-required-field"),i())}function Xe(o,m){if(o&1&&(r(0,"option",37),p(1),i()),o&2){let n=m.$implicit;l("value",n.dataValue),a(1),C(" ",n.dataLabel," ")}}function Qe(o,m){o&1&&(r(0,"div"),d(1,"app-required-field"),i())}var M=o=>({"is-invalid":o});function We(o,m){if(o&1&&(r(0,"li")(1,"div",39),d(2,"input",40),r(3,"label",41),p(4),i()()()),o&2){let n=m.$implicit,t=u();a(2),te("value",n.dataValue),l("id",n.dataValue)("ngClass",E(5,M,((t.propertyForm.category==null?null:t.propertyForm.category.touched)||(t.propertyForm.category==null?null:t.propertyForm.category.dirty)||t.submitted)&&(t.propertyForm.category==null?null:t.propertyForm.category.errors))),a(1),te("for",n.dataValue),a(1),_(n.dataLabel)}}function Ze(o,m){o&1&&(r(0,"div",42),d(1,"app-required-field"),i())}function et(o,m){o&1&&(k(0),r(1,"div",43),d(2,"input",44),r(3,"label",45),p(4," Save & create new property "),i()(),B())}function tt(o,m){if(o&1){let n=S();r(0,"div",34)(1,"button",46),g("click",function(){y(n);let s=u();return v(s.deleteBlock())}),p(2," Delete "),i()()}if(o&2){let n=u();a(1),l("disabled",!n.propertyFormGroup.valid)("title",n.propertyFormGroup.invalid?"There must be errors on the form":"")}}function rt(o,m){if(o&1){let n=S();r(0,"div",34)(1,"button",47),g("click",function(){y(n);let s=u();return v(s.updateBlock())}),p(2," Update "),i()()}if(o&2){let n=u();a(1),l("title",n.propertyFormGroup.invalid?"There must be errors on the form":"")}}function it(o,m){if(o&1){let n=S();r(0,"div",34)(1,"button",47),g("click",function(){y(n);let s=u();return v(s.saveBlock())}),p(2," Save "),i()()}if(o&2){let n=u();a(1),l("title",n.propertyFormGroup.invalid?"There must be errors on the form":"")}}var we=(()=>{let m=class m{constructor(t,s,e,h,P,Z,ee){this.title=t,this.addEstateBsModalRef=s,this.fb=e,this.accountService=h,this.alertService=P,this.logger=Z,this.settingsService=ee,this.submitted=!1,this.accountService.currentUser.subscribe(Te=>this.currentUser=Te)}ngOnInit(){this.submitted=!1,this.createNewForm(),this.isAddMode?(this.estateHeaderMsg="New estate property",this.title.setTitle(this.estateHeaderMsg)):(this.estateHeaderMsg="Edit "+this.estateProperty.propertyName,this.title.setTitle(this.estateHeaderMsg),this.propertyFormGroup.patchValue(this.estateProperty)),this.listOfCategories=this.settingsService.getPropertyCategories(),this.listOfUsages=this.settingsService.getPropertyUsage(),this.addEstateBsModalRef.setClass("gray modal-md modal-dialog-top"),this.fetchEstates(),this.fetchBlocks()}createNewForm(){this.propertyFormGroup=this.fb.group({estateId:["",[F.required]],blockId:["",[F.required]],propertyNo:["",{updateOn:"blur",validators:[F.required]}],propertyName:["",{updateOn:"blur",validators:[F.required]}],propertySize:["",{updateOn:"blur",validators:[F.required]}],usage:["",[F.required]],category:["",[F.required]],description:["",""],recordId:[""],saveAndNew:[!1]})}get propertyForm(){return this.propertyFormGroup.controls}fetchEstates(){this.listOfEstates=[],this.settingsService.getEstates().subscribe({next:t=>{if(this.logger.info("getEstates response "+JSON.stringify(t)),t.headerResponse.responseCode!=="000"){this.alertService.error(t.headerResponse.responseMessage);return}if(t.estates.length<=0){this.alertService.showInfoMsgGeneral("No zones found"),this.logger.info("No zones found");return}this.listOfEstates=t.estates},error:t=>{this.logger.error(t),this.alertService.showInfoMsg(t)}})}fetchBlocks(){this.listOfBlocks=[],this.settingsService.getEstateBlocks(this.currentUser,this.propertyForm.estateId.value).subscribe({next:t=>{if(this.logger.info("getEstateBlocks response "+JSON.stringify(t)),t.headerResponse.responseCode!=="000"){this.alertService.error(t.headerResponse.responseMessage);return}if(t.estateBlocks.length<=0){this.alertService.showInfoMsgGeneral("No blocks found"),this.logger.info("No blocks found");return}this.listOfBlocks=t.estateBlocks},error:t=>{this.logger.error(t),this.alertService.showInfoMsg(t)}})}saveBlock(){if(this.alertService.clear(),this.submitted=!0,!this.propertyFormGroup.valid)return;let t=this.propertyForm.propertyName.value;I.default.fire({title:"Confirmation",text:`Do you want to save property  ${t}?`,icon:"question",position:"top",showCancelButton:!0,confirmButtonText:"Yes, create",cancelButtonText:"No, cancel"}).then(s=>{if(s.value){if(this.alertService.clear(),this.propertyFormGroup.invalid)return;this.settingsService.createEstateProperty(this.currentUser,this.propertyFormGroup.value).subscribe({next:e=>{if(e.headerResponse.responseCode!=="000"){this.alertService.showErrorMsg(e.headerResponse.responseMessage);return}this.alertService.showSuccessMsg(`${t} created successfully`),this.propertyForm.saveAndNew.value||(this.addEstateBsModalRef.hide(),this.accountService.reloadCurrentRoute()),this.propertyFormGroup.reset(),this.submitted=!1,this.logAction(`created estateId ${t}`,G.SETTINGS)},error:e=>{this.alertService.showInfoMsg(e)}})}else s.dismiss,I.default.DismissReason.cancel})}updateBlock(){if(this.alertService.clear(),this.submitted=!0,!this.propertyFormGroup.valid)return;let t=this.propertyForm.propertyName.value;I.default.fire({position:"top",title:"Confirmation",text:`Do you want to update property ${t}?`,icon:"question",showCancelButton:!0,cancelButtonText:"No, cancel",confirmButtonText:"Yes, update"}).then(s=>{if(s.value){if(this.alertService.clear(),this.propertyFormGroup.invalid)return;this.settingsService.updateEstateProperty(this.currentUser,this.propertyFormGroup.value).subscribe({next:e=>{if(this.logger.info("updateEstateProperty response:"+JSON.stringify(e)),e.headerResponse.responseCode!=="000"){this.alertService.showErrorMsg(e.headerResponse.responseMessage);return}this.alertService.showSuccessMsg(`${t} updated successfully`),this.addEstateBsModalRef.hide(),localStorage.setItem("estate",this.propertyFormGroup.value.estateId),localStorage.setItem("estateBlock",this.propertyFormGroup.value.blockId),this.logAction(`Updated ${t}`,G.SETTINGS),this.accountService.reloadCurrentRoute()},error:e=>{this.alertService.showInfoMsg(e.message)}})}else s.dismiss,I.default.DismissReason.cancel})}deleteBlock(){if(this.alertService.clear(),this.submitted=!0,!this.propertyFormGroup.valid)return;let t=this.propertyForm.propertyName.value;I.default.fire({position:"top",title:"Confirmation",text:`Do you want to delete property ${t}?`,icon:"question",showCancelButton:!0,cancelButtonText:"No, cancel",confirmButtonText:"Yes, delete"}).then(s=>{if(s.value){if(this.alertService.clear(),this.propertyFormGroup.invalid)return;this.settingsService.updateEstateProperty(this.currentUser,this.propertyForm.estateId.value).subscribe({next:e=>{if(this.logger.info("delete blockId response:"+JSON.stringify(e)),e.headerResponse.responseCode!=="000"){this.alertService.showErrorMsg(e.headerResponse.responseMessage);return}this.alertService.showSuccessMsg(`${t} deleted successfully`),this.addEstateBsModalRef.hide(),this.logAction(`Deleted ${t}`,G.SETTINGS),this.accountService.reloadCurrentRoute()},error:e=>{this.alertService.showInfoMsg(e.message)}})}else s.dismiss,I.default.DismissReason.cancel})}logAction(t,s){return ie(this,null,function*(){yield this.accountService.logUserAudit(t,s)})}};m.\u0275fac=function(s){return new(s||m)(f(pe),f(K),f(ve),f(q),f(H),f(V),f(Y))},m.\u0275cmp=w({type:m,selectors:[["ng-component"]],standalone:!0,features:[x],decls:82,vars:51,consts:[["novalidate","",3,"formGroup"],[1,"modal-header"],[1,"modal-title"],["type","button btn-xs","aria-label","Close",1,"close","btn-close","pull-right","border","border-gray",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[1,"row","gy-3","mt-3"],[1,"col-sm-6"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["id","estateid","formControlName","estateId",3,"clearable","ngClass","change"],["value","","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],[1,"invalid-feedback"],[4,"ngIf"],["id","estateid","formControlName","blockId",3,"clearable","ngClass"],["class","text-danger",4,"ngIf"],["type","number","formControlName","propertyNo","id","blockId","autocomplete","off",1,"form-control",3,"ngClass"],["labelName","Property Name",3,"labelForName"],["type","text","formControlName","propertyName","id","propertyName","autocomplete","off",1,"form-control",3,"ngClass"],["labelName","Property Size",3,"labelForName"],[1,"form-text-hint"],[1,"overline-title"],["type","number","formControlName","propertySize","id","propertySize","autocomplete","off",1,"form-control",3,"ngClass"],[1,"form-control-select"],["id","usage","formControlName","usage",1,"form-control",3,"ngClass"],["value","","selected","","disabled","",1,"fs-6"],[1,"form-check-label",3,"labelForName","labelName"],[1,"custom-control-group"],[4,"ngFor","ngForOf"],["class","text-danger mt-1",4,"ngIf"],[1,"col-sm-12"],[1,"row","my-3","mx-2","mb-3","justify-content-end"],[1,"col-auto"],["data-bs-dismiss","modal",1,"btn","btn-outline-light","btn-sm",3,"click"],["class","col-auto",4,"ngIf"],[3,"value"],[1,"text-danger"],[1,"custom-control","custom-radio","custom-control-pro","no-control"],["formControlName","category","name","category","type","radio",1,"custom-control-input","form-check-input",3,"id","value","ngClass"],[1,"custom-control-label","form-check-label",3,"for"],[1,"text-danger","mt-1"],[1,"custom-control","custom-control-sm","custom-checkbox","checked"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew","id","saveAndNew",1,"custom-control-input"],["for","saveAndNew",1,"custom-control-label","fw-bolder"],[1,"btn","btn-outline-danger","btn-sm",3,"disabled","title","click"],[1,"btn","btn-primary","btn-sm",3,"title","click"]],template:function(s,e){s&1&&(r(0,"form",0)(1,"div",1)(2,"h6",2),p(3),b(4,"titlecase"),i(),r(5,"button",3),g("click",function(){return e.addEstateBsModalRef==null?null:e.addEstateBsModalRef.hide()}),r(6,"span",4),p(7,"\xD7"),i()()(),r(8,"div",5),d(9,"app-required-fields-notice"),r(10,"div",6)(11,"div",7)(12,"div",8),d(13,"app-form-label",9),r(14,"div",10)(15,"ng-select",11),g("change",function(){return e.fetchBlocks()}),r(16,"ng-option",12),p(17,"Select One"),i(),c(18,De,2,2,"ng-option",13),i(),r(19,"span",14),c(20,$e,2,0,"div",15),i()()()(),r(21,"div",7)(22,"div",8),d(23,"app-form-label",9),r(24,"div",10)(25,"ng-select",16)(26,"ng-option",12),p(27,"Select One"),i(),c(28,je,2,2,"ng-option",13),i(),r(29,"span",14),c(30,He,2,0,"div",17),i()()()(),r(31,"div",7)(32,"div",8),d(33,"app-form-label",9),r(34,"div",10),d(35,"input",18),r(36,"span",14),c(37,Je,2,0,"div",15),i()()()(),r(38,"div",7)(39,"div",8),d(40,"app-form-label",19),r(41,"div",10),d(42,"input",20),r(43,"span",14),c(44,Ke,2,0,"div",15),i()()()(),r(45,"div",7)(46,"div",8),d(47,"app-form-label",21),r(48,"div",10)(49,"div",22)(50,"span",23),p(51,"Acre(s)"),i()(),d(52,"input",24),r(53,"span",14),c(54,Ye,2,0,"div",15),i()()()(),r(55,"div",7)(56,"div",8),d(57,"app-form-label",9),r(58,"div",10)(59,"div",25)(60,"select",26)(61,"option",27),p(62,"Select One"),i(),c(63,Xe,2,2,"option",13),i(),r(64,"span",14),c(65,Qe,2,0,"div",15),i()()()()(),r(66,"div",7)(67,"div",8),d(68,"app-form-label",28),r(69,"div",10)(70,"ul",29),c(71,We,5,7,"li",30),i(),c(72,Ze,2,0,"div",31),i()()(),r(73,"div",32),c(74,et,5,0,"ng-container",15),i()()(),r(75,"div",33)(76,"div",34)(77,"button",35),g("click",function(){return e.addEstateBsModalRef==null?null:e.addEstateBsModalRef.hide()}),p(78," Close "),i()(),c(79,tt,3,2,"div",36)(80,rt,3,1,"div",36)(81,it,3,1,"div",36),i()()),s&2&&(l("formGroup",e.propertyFormGroup),a(3),C("",N(4,37,e.estateHeaderMsg)," Block"),a(10),l("labelForName","estateId")("labelName","Estate"),a(2),l("clearable",!0)("ngClass",E(39,M,((e.propertyForm.estateId==null?null:e.propertyForm.estateId.touched)||(e.propertyForm.estateId==null?null:e.propertyForm.estateId.dirty)||e.submitted)&&(e.propertyForm.estateId==null?null:e.propertyForm.estateId.errors))),a(3),l("ngForOf",e.listOfEstates),a(2),l("ngIf",(e.propertyForm.estateId==null||e.propertyForm.estateId.errors==null?null:e.propertyForm.estateId.errors.required)||e.submitted),a(3),l("labelForName","blockId")("labelName","Block"),a(2),l("clearable",!0)("ngClass",E(41,M,((e.propertyForm.blockId==null?null:e.propertyForm.blockId.touched)||(e.propertyForm.blockId==null?null:e.propertyForm.blockId.dirty)||e.submitted)&&(e.propertyForm.blockId==null?null:e.propertyForm.blockId.errors))),a(3),l("ngForOf",e.listOfBlocks),a(2),l("ngIf",e.propertyForm.blockId==null||e.propertyForm.blockId.errors==null?null:e.propertyForm.blockId.errors.required),a(3),l("labelForName","propertyNo")("labelName","Property No."),a(2),l("ngClass",E(43,M,((e.propertyForm.propertyNo==null?null:e.propertyForm.propertyNo.touched)||(e.propertyForm.propertyNo==null?null:e.propertyForm.propertyNo.dirty)||e.submitted)&&(e.propertyForm.propertyNo==null?null:e.propertyForm.propertyNo.errors))),a(2),l("ngIf",e.propertyForm.propertyNo==null||e.propertyForm.propertyNo.errors==null?null:e.propertyForm.propertyNo.errors.required),a(3),l("labelForName","propertyName"),a(2),l("ngClass",E(45,M,((e.propertyForm.propertyName==null?null:e.propertyForm.propertyName.touched)||(e.propertyForm.propertyName==null?null:e.propertyForm.propertyName.dirty)||e.submitted)&&(e.propertyForm.propertyName==null?null:e.propertyForm.propertyName.errors))),a(2),l("ngIf",e.propertyForm.propertyName==null||e.propertyForm.propertyName.errors==null?null:e.propertyForm.propertyName.errors.required),a(3),l("labelForName","propertySize"),a(5),l("ngClass",E(47,M,((e.propertyForm.propertySize==null?null:e.propertyForm.propertySize.touched)||(e.propertyForm.propertySize==null?null:e.propertyForm.propertySize.dirty)||e.submitted)&&(e.propertyForm.propertySize==null?null:e.propertyForm.propertySize.errors))),a(2),l("ngIf",e.propertyForm.propertySize==null||e.propertyForm.propertySize.errors==null?null:e.propertyForm.propertySize.errors.required),a(3),l("labelForName","usage")("labelName","Usage"),a(3),l("ngClass",E(49,M,((e.propertyForm.usage==null?null:e.propertyForm.usage.touched)||(e.propertyForm.usage==null?null:e.propertyForm.usage.dirty)||e.submitted)&&(e.propertyForm.usage==null?null:e.propertyForm.usage.errors))),a(3),l("ngForOf",e.listOfUsages),a(2),l("ngIf",e.propertyForm.usage==null||e.propertyForm.usage.errors==null?null:e.propertyForm.usage.errors.required),a(3),l("labelForName","category")("labelName","Category"),a(3),l("ngForOf",e.listOfCategories),a(1),l("ngIf",e.submitted&&(e.propertyForm.category.errors==null?null:e.propertyForm.category.errors.required)),a(2),l("ngIf",e.isAddMode),a(5),l("ngIf",!e.isAddMode),a(1),l("ngIf",!e.isAddMode),a(1),l("ngIf",e.isAddMode))},dependencies:[R,le,T,A,O,j,ue,D,$,z,ge,me,U,fe,L,de,_e,he,ye,W,Q,X,Ee,Ie,J,be],encapsulation:2});let o=m;return o})();function ot(o,m){if(o&1){let n=S();r(0,"div",5)(1,"div",8)(2,"label",29),p(3),i(),d(4,"br"),r(5,"input",30),g("ngModelChange",function(s){y(n);let e=u(2);return v(e.searchValue=s)}),i()()()}if(o&2){let n=u(2);a(3),_(n.searchParameterLabel),a(2),oe("placeholder","Enter ",n.searchParameterLabel,""),l("ngModel",n.searchValue)}}function nt(o,m){if(o&1){let n=S();k(0),r(1,"div",5)(2,"div",6)(3,"label",24),p(4,"Search By"),i(),d(5,"br"),r(6,"div",8)(7,"div",9)(8,"select",25),g("ngModelChange",function(s){y(n);let e=u();return v(e.searchBy=s)})("change",function(){y(n);let s=u();return v(s.searchParameterListener())}),r(9,"option",26),p(10,"Property Name"),i(),r(11,"option",27),p(12,"Property No."),i()()()()()(),c(13,ot,6,3,"div",28),B()}if(o&2){let n=u();a(8),l("ngModel",n.searchBy),a(5),l("ngIf",n.searchBy)}}function at(o,m){if(o&1&&(r(0,"ng-option",37),p(1),i()),o&2){let n=m.$implicit;l("value",n.recordId),a(1),C(" ",n.estateName," ")}}function lt(o,m){if(o&1&&(r(0,"ng-option",37),p(1),i()),o&2){let n=m.$implicit;l("value",n.recordId),a(1),C(" ",n.block," ")}}function st(o,m){if(o&1){let n=S();k(0),r(1,"div",31)(2,"div",6),d(3,"app-form-label",32),r(4,"div",8)(5,"ng-select",33),g("ngModelChange",function(s){y(n);let e=u();return v(e.estate=s)})("change",function(){y(n);let s=u();return v(s.fetchEstateBlocks())}),r(6,"ng-option",34),p(7,"Select Estate"),i(),c(8,at,2,2,"ng-option",35),i()()()(),r(9,"div",31)(10,"div",6),d(11,"app-form-label",32),r(12,"div",8)(13,"ng-select",36),g("ngModelChange",function(s){y(n);let e=u();return v(e.block=s)})("change",function(){y(n);let s=u();return v(s.fetchEstateProperties())}),r(14,"ng-option",34),p(15,"Select Block"),i(),c(16,lt,2,2,"ng-option",35),i()()()(),B()}if(o&2){let n=u();a(3),l("labelForName","estate")("labelName","Estates"),a(2),l("clearable",!1)("ngModel",n.estate),a(3),l("ngForOf",n.listOfEstates),a(3),l("labelForName","block")("labelName","Blocks"),a(2),l("clearable",!1)("ngModel",n.block),a(3),l("ngForOf",n.listOfEstateBlocks)}}function pt(o,m){o&1&&(r(0,"tr")(1,"th"),p(2,"SN"),i(),r(3,"th"),p(4,"Property"),i(),r(5,"th"),p(6,"Property No."),i(),r(7,"th"),p(8,"Property Size"),i(),r(9,"th"),p(10,"Estate"),i(),r(11,"th"),p(12,"Block"),i(),r(13,"th"),p(14,"Usage"),i(),r(15,"th"),p(16,"Category"),i(),r(17,"th"),p(18,"Actions"),i()())}function mt(o,m){if(o&1){let n=S();r(0,"tr")(1,"td"),p(2),i(),r(3,"td"),p(4),i(),r(5,"td"),p(6),b(7,"number"),i(),r(8,"td"),p(9),b(10,"number"),i(),r(11,"td"),p(12),i(),r(13,"td"),p(14),i(),r(15,"td"),p(16),b(17,"removeHyphen"),b(18,"titlecase"),i(),r(19,"td"),p(20),b(21,"titlecase"),i(),r(22,"td")(23,"div",38),g("click",function(){let e=y(n).$implicit,h=u();return v(h.openEstateModalComponent(e,!1))}),r(24,"div",39)(25,"span"),d(26,"em",40),i()()()()()}if(o&2){let n=m.$implicit,t=m.rowIndex;a(2),_(t+1),a(2),_(n.propertyName),a(2),_(N(7,8,n.propertyNo)),a(3),_(N(10,10,n.propertySize)),a(3),_(n==null?null:n.estateName),a(2),_(n.block),a(2),_(N(17,12,N(18,14,n.usage))),a(4),_(N(21,16,n.category))}}var dt=()=>[5,10,25,50],zt=(()=>{let m=class m{constructor(t,s,e,h,P,Z){this.addPropertyBsModalRef=t,this.addPropertyModalService=s,this.accountService=e,this.settingsService=h,this.alertService=P,this.logger=Z,this.accountService.currentUser.subscribe(ee=>this.currentUser=ee)}ngOnInit(){this.block=localStorage.getItem("estateBlock")??"A",this.block!=="A"?(this.searchParameter="BAB",this.searchBy="estateBlock.recordId",this.searchBy=this.estate,this.estate=localStorage.getItem("estate"),this.fetchEstateBlocks(),this.fetchEstates(),this.fetchEstateProperties()):(this.estate="A",this.block="A",this.searchParameter="PROP",this.searchBy=="PNAM",this.searchParameterListener())}ngOnDestroy(){this.addPropertyModalService.hide(),xe.default.close()}refreshButton(){this.fetchEstateProperties()}searchByListener(){this.searchParameter=="BAB"&&(this.estate="A",this.block="A",this.fetchEstates(),this.listOfEstateBlocks=[]),this.listOfProperties=[]}searchParameterListener(){if(this.searchValue="",this.searchBy=="PNAM"){this.searchParameterLabel="Property Name";return}this.searchBy=="PNUM"&&(this.searchParameterLabel="Property Number")}fetchEstates(){this.listOfEstates=[],this.settingsService.getEstates().subscribe({next:t=>{if(this.logger.info("getEstates response "+JSON.stringify(t)),t.headerResponse.responseCode!=="000"){this.alertService.error(t.headerResponse.responseMessage);return}if(t.estates.length<=0){this.alertService.showInfoMsgGeneral("No zones found"),this.logger.info("No zones found");return}this.listOfEstates=t.estates},error:t=>{this.logger.error(t),this.alertService.showInfoMsg(t)}})}fetchEstateBlocks(){this.block="A",this.listOfEstateBlocks=[],this.settingsService.getEstateBlocks(this.currentUser,this.estate).subscribe({next:t=>{if(this.logger.info("getEstates response "+JSON.stringify(t)),t.headerResponse.responseCode!=="000"){this.alertService.error(t.headerResponse.responseMessage);return}if(t.estateBlocks.length<=0){this.block="No blocks found",this.alertService.showInfoMsgGeneral("No blocks found"),this.logger.info("No blocks found ");return}this.listOfEstateBlocks=t.estateBlocks},error:t=>{this.logger.error(t.message),this.alertService.showInfoMsg(t.message)}})}fetchEstateProperties(){this.listOfProperties=[],this.searchParameter=="BAB"&&(this.searchValue=this.block,this.searchBy="BAB"),this.settingsService.getProperties(this.currentUser,this.searchBy,this.searchValue).subscribe({next:t=>{if(this.logger.info("getEstateProperties response "+JSON.stringify(t)),t.headerResponse.responseCode!=="000"){this.alertService.error(t.headerResponse.responseMessage);return}if(t.properties.length<=0){this.alertService.showInfoMsgGeneral("No properties found"),this.logger.info("No properties found ");return}this.listOfProperties=t.properties},error:t=>{this.logger.error(t),this.alertService.showInfoMsg(t)}})}openEstateModalComponent(t,s){let e={initialState:{isAddMode:s,estateProperty:t}};this.addPropertyModalService.config.ignoreBackdropClick=!0,this.addPropertyModalService.config.animated=!0,this.addPropertyBsModalRef=this.addPropertyModalService.show(we,e),this.addPropertyBsModalRef.content.closeBtnName="Close"}};m.\u0275fac=function(s){return new(s||m)(f(K),f(Me),f(q),f(Y),f(H),f(V))},m.\u0275cmp=w({type:m,selectors:[["app-estate-properties"]],standalone:!0,features:[x],decls:35,vars:17,consts:[[3,"pageTitleName","description"],[1,"newItemName"],[1,"btn","btn-primary",3,"click"],[1,"icon","ni","ni-plus"],[1,"row","gy-2","gx-3","mb-4","align-items-center"],[1,"col-sm-2"],[1,"form-group"],["for","searchParameter",1,"form-label","pt-0"],[1,"form-control-wrap"],[1,"form-control-select"],["id","searchParameter",1,"form-control",3,"ngModel","ngModelChange","change"],["value","PROP","selected","",1,"fs-6"],["value","BAB"],[4,"ngIf"],[1,"col-auto"],["type","button","title","",1,"btn","btn-dim","btn-primary","mt-4",3,"click"],[1,"row","gy-2","gx-3","my-3"],[1,"form-icon","form-icon-right"],[1,"icon","ni","ni-search"],["type","text","autocomplete","off","id","default-04","placeholder","Quick search",1,"form-control",3,"ngModel","ngModelChange"],["responsiveLayout","scroll","sortMode","multiple","responsiveLayout","scroll","styleClass","p-datatable-sm p-datatable-striped","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","scrollDirection","both",3,"value","paginator","rows","showCurrentPageReport","rowsPerPageOptions","resizableColumns","autoLayout"],["dt1",""],["pTemplate","header"],["pTemplate","body"],["for","searchBy",1,"form-label","pt-0"],["id","searchBy",1,"form-control",3,"ngModel","ngModelChange","change"],["value","PNAM","selected","",1,"fs-6"],["value","PNUM"],["class","col-sm-2",4,"ngIf"],["for","searchParameterLabel",1,"form-label","pt-0"],["type","text","autocomplete","off","id","searchParameterLabel",1,"form-control",3,"placeholder","ngModel","ngModelChange"],[1,"col-sm-3"],[3,"labelForName","labelName"],["id","estate",3,"clearable","ngModel","ngModelChange","change"],["value","A","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],["id","block",3,"clearable","ngModel","ngModelChange","change"],[3,"value"],[1,"align-center","select-cursor",3,"click"],[1,"user-avatar","user-avatar-sm","bg-light"],[1,"icon","ni","ni-edit"]],template:function(s,e){s&1&&(r(0,"app-add-item",0)(1,"span",1)(2,"a",2),g("click",function(){return e.openEstateModalComponent(null,!0)}),d(3,"em",3),r(4,"span"),p(5,"Add estate property"),i()()()(),r(6,"div",4)(7,"div",5)(8,"div",6)(9,"label",7),p(10,"Search Parameter"),i(),d(11,"br"),r(12,"div",8)(13,"div",9)(14,"select",10),g("ngModelChange",function(P){return e.searchParameter=P})("change",function(){return e.searchByListener()}),r(15,"option",11),p(16,"Property"),i(),r(17,"option",12),p(18,"Estate & block"),i()()()()()(),c(19,nt,14,2,"ng-container",13)(20,st,17,10,"ng-container",13),r(21,"div",14)(22,"button",15),g("click",function(){return e.refreshButton()}),p(23," Search "),i()()(),r(24,"div",16)(25,"div",14)(26,"div",8)(27,"div",17),d(28,"em",18),i(),r(29,"input",19),g("ngModelChange",function(P){return e.searchedKeyword=P}),i()()()(),r(30,"p-table",20,21),b(32,"filter"),c(33,pt,19,0,"ng-template",22)(34,mt,27,18,"ng-template",23),i()),s&2&&(l("pageTitleName","Estate properties")("description","Setup properties estate blocks"),a(14),l("ngModel",e.searchParameter),a(5),l("ngIf",e.searchParameter=="PROP"),a(1),l("ngIf",e.searchParameter=="BAB"),a(9),l("ngModel",e.searchedKeyword),a(1),l("value",ae(32,13,e.listOfProperties,e.searchedKeyword))("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",ne(16,dt))("resizableColumns",!0)("autoLayout",!0))},dependencies:[R,T,A,se,O,Fe,Ne,Ce,j,D,$,z,U,L,ce,W,Q,X,Pe,ke,J,Be],encapsulation:2});let o=m;return o})();export{zt as EstatePropertiesComponent};
