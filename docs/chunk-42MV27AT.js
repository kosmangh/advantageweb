import"./chunk-7PXYQJAM.js";import{a as Ce,b as ke,c as Ee,d as Ne}from"./chunk-PLAPZAN2.js";import{a as H,b as z,c as J}from"./chunk-QQMX5O62.js";import{a as Le}from"./chunk-IP4FBAZW.js";import{b as Re,c as Te,d as Ye,e as Pe}from"./chunk-7PQCCLGB.js";import{a as Me}from"./chunk-T45HSKH6.js";import{d as V}from"./chunk-WH3N5QDN.js";import{i as Ge,t as Ae}from"./chunk-KPCRGR73.js";import{h as we,i as Oe}from"./chunk-543WOPA4.js";import"./chunk-5WO4BOAD.js";import{a as Ie}from"./chunk-NEQ5BFSP.js";import{b as ue,c as ge,e as y,f as j,g as fe,k as he,l as ve,o as be,p as Be,u as Se,v as D,w as ye,x as U}from"./chunk-B2QESFZG.js";import{b as Fe}from"./chunk-Y725X6Z7.js";import{b as _e,c as $}from"./chunk-R55IMLXW.js";import"./chunk-LPKVFVKE.js";import{b as C,d as F,e as G,f as k,g as q}from"./chunk-IHPVOZWG.js";import"./chunk-HPGLX4ZN.js";import{g as ce}from"./chunk-7DWKZ4XI.js";import{Ab as N,Eb as p,Fb as _,Gb as v,Ic as ae,Kc as Y,Lc as P,Mb as w,Nb as oe,Ob as B,Pc as se,Qc as pe,Rc as de,Sa as n,Ta as h,Tc as me,Uc as L,Wb as b,Xb as S,Yb as O,bb as o,ca as ne,ia as A,ib as u,la as M,nb as t,ob as i,pb as c,qa as ee,ra as te,s as Z,tb as ie,wb as g,xb as E}from"./chunk-QRSQYA3Q.js";import{a as R,d as le,e as T}from"./chunk-5FZOKLP6.js";var Ve=le(_e());var re=le(_e());var K=class{};var x=(()=>{let a=class a{constructor(r,d,e){this.utilsService=r,this.http=d,this.logger=e}saveGroupRentBill(r,d){return d.createdBy=r.username,d.headerRequest=this.utilsService.getRequestHeader(r.zoneId,r.regionId,"SAVE_GROUND_RENT_BILL"),d.headerRequest.region=r.regionId,this.logger.info("saveGroupRentBill request "+JSON.stringify(d)),this.http.post(`${G.url+F.API_ESTATE_BILLING}applygroundrentbill`,d).pipe(Z(G.timeout))}getGroundRentBills(r,d,e){let m=new K;return m.blockId=d,m.chargeYear=e,m.headerRequest=this.utilsService.getRequestHeader(r.zoneId,r.regionId,"GROUND_RENT_BILL_LIST"),this.logger.info("getGroundRentBills list request "+JSON.stringify(m)),this.http.post(`${G.url+F.API_ESTATE_BILLING}groundrentbills`,m).pipe(Z(G.timeout))}};a.\u0275fac=function(d){return new(d||a)(A(k),A(ce),A(C))},a.\u0275prov=ne({token:a,factory:a.\u0275fac,providedIn:"root"});let l=a;return l})();function Ze(l,a){l&1&&(t(0,"span"),c(1,"em",43),p(2," Estate Billing"),i())}function et(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.estateName," ")}}function tt(l,a){l&1&&(t(0,"div"),c(1,"app-required-field"),i())}function it(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s),n(1),v(" ",s," ")}}function rt(l,a){l&1&&(t(0,"span"),c(1,"app-required-field"),i())}function lt(l,a){l&1&&(t(0,"span"),c(1,"em",45),p(2," Block Billing"),i())}function nt(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.estateName," ")}}function ot(l,a){l&1&&(t(0,"div"),c(1,"app-required-field"),i())}function at(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.block," ")}}function st(l,a){l&1&&(t(0,"div",46),c(1,"app-required-field"),i())}function pt(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s),n(1),v(" ",s," ")}}function dt(l,a){l&1&&(t(0,"span"),c(1,"app-required-field"),i())}function mt(l,a){l&1&&(t(0,"span"),c(1,"em",47),p(2,"Property Billing"),i())}function ct(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.estateName," ")}}function ut(l,a){l&1&&(t(0,"div"),c(1,"app-required-field"),i())}function gt(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.block," ")}}function ft(l,a){l&1&&(t(0,"div",46),c(1,"app-required-field"),i())}function ht(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.propertyName," ")}}function vt(l,a){l&1&&(t(0,"div"),c(1,"app-required-field"),i())}function bt(l,a){if(l&1&&(t(0,"ng-option",44),p(1),i()),l&2){let s=a.$implicit;o("value",s),n(1),v(" ",s," ")}}function Bt(l,a){l&1&&(t(0,"span"),c(1,"app-required-field"),i())}var I=l=>({"is-invalid":l}),St=l=>({"is-valid":l}),Ue=(()=>{let a=class a{constructor(r,d,e,m,f,X,Q,W){this.groupRentBillingService=r,this.utilsService=d,this.settingsService=e,this.addGroundRentBillBsModalRef=m,this.fb=f,this.accountService=X,this.alertService=Q,this.logger=W,this.estateSubmitted=!1,this.blockSubmitted=!1,this.propertySubmitted=!1,this.estateId="",this.blockId="",this.propertyId="",this.accountService.currentUser.subscribe(He=>this.currentUser=He)}ngOnInit(){this.createNewForm(),this.addGroundRentBillBsModalRef.setClass("gray modal-md modal-dialog-top"),this.listOfChargeYears=this.utilsService.getChargeYears(),this.value="EST"}onSelect(r){this.value=r.id,this.listOfBlocks=[],this.listOfProperties=[],this.createNewForm()}createNewForm(){this.estateBillFormGroup=this.fb.group({estateId:["",[y.required]],chargeYear:["",[y.required]],blockId:["A"],propertyId:["A"],billingType:["EST"],saveAndNew:[!1]}),this.blockBillFormGroup=this.fb.group({estateId:["",[y.required]],blockId:["",[y.required]],chargeYear:["",[y.required]],propertyId:["A"],billingType:["BLK"],saveAndNew:[!1]}),this.propertyBillFormGroup=this.fb.group({estateId:["",[y.required]],blockId:["",[y.required]],propertyId:["",[y.required]],chargeYear:["",[y.required]],billingType:["PROP"],saveAndNew:[!1]}),this.fetchEstates()}get estateBillForm(){return this.estateBillFormGroup.controls}get blockBillForm(){return this.blockBillFormGroup.controls}get propertyBillForm(){return this.propertyBillFormGroup.controls}saveGroundRentBill(){let r,d,e=!1;if(this.value==="EST"){if(this.estateSubmitted=!0,this.estateBillFormGroup.invalid)return;r=R({},this.estateBillFormGroup.value),d="estate "+this.listOfEstates.find(m=>m.recordId===this.estateBillForm.estateId.value)?.estateName,e=this.estateBillForm.saveAndNew.value}else if(this.value==="BLK"){if(this.blockSubmitted=!0,this.blockBillFormGroup.invalid)return;r=R({},this.blockBillFormGroup.value),d="block "+this.listOfBlocks.find(m=>m.recordId===this.blockBillForm.blockId.value)?.block,e=this.blockBillForm.saveAndNew.value}else if(this.value==="PROP"){if(this.propertySubmitted=!0,this.propertyBillFormGroup.invalid)return;r=R({},this.propertyBillFormGroup.value),d="property "+this.listOfProperties.find(m=>m.recordId===this.propertyBillForm.propertyId.value)?.propertyName,e=this.propertyBillForm.saveAndNew.value}re.default.fire({title:"Confirmation",text:`Do you want to apply ground rent bill for  ${d}?`,icon:"question",position:"top",showCancelButton:!0,confirmButtonText:"Yes, create",cancelButtonText:"No, cancel"}).then(m=>{m.value?(this.alertService.clear(),this.groupRentBillingService.saveGroupRentBill(this.currentUser,r).subscribe({next:f=>{if(f.headerResponse.responseCode!=="000"){this.alertService.showErrorMsg(f.headerResponse.responseMessage);return}this.alertService.showSuccessMsgAndStay(f.headerResponse.responseMessage),e||(this.addGroundRentBillBsModalRef.hide(),this.accountService.reloadCurrentRoute()),this.createNewForm(),this.estateSubmitted=!1,this.blockSubmitted=!1,this.propertySubmitted=!1,this.logAction(`Applied ground rent bill for ${d}`,F.ESTATE_BILLING)},error:f=>{this.alertService.showInfoMsg(f)}})):(m.dismiss,re.default.DismissReason.cancel)})}fetchEstates(){this.listOfEstates=[],this.settingsService.getEstates().subscribe({next:r=>{if(this.logger.info("getEstates response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.estates.length<=0){this.alertService.showInfoMsgGeneral("No zones found"),this.logger.info("No zones found");return}this.listOfEstates=r.estates},error:r=>{this.logger.error(r),this.alertService.showInfoMsg(r)}})}fetchBlocks(){this.listOfBlocks=[],this.value==="EST"?this.estateId=this.estateBillForm.estateId.value:this.value==="BLK"?this.estateId=this.blockBillForm.estateId.value:this.value==="PROP"&&(this.estateId=this.propertyBillForm.estateId.value),this.settingsService.getEstateBlocks(this.currentUser,this.estateId).subscribe({next:r=>{if(this.logger.info("getEstateBlocks response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.estateBlocks.length<=0){this.alertService.showInfoMsgGeneral("No blocks found"),this.logger.info("No blocks found");return}this.listOfBlocks=r.estateBlocks},error:r=>{this.logger.error(r),this.alertService.showInfoMsg(r)}})}fetchEstateProperties(){this.listOfProperties=[],this.value==="EST"?this.blockId=this.estateBillForm.blockId.value:this.value==="BLK"?this.blockId=this.blockBillForm.blockId.value:this.value==="PROP"&&(this.blockId=this.propertyBillForm.blockId.value),this.settingsService.getEstateProperties(this.currentUser,this.blockId,!0,"LEASEHOLD").subscribe({next:r=>{if(this.logger.info("getEstateProperties response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.properties.length<=0){this.alertService.showInfoMsgGeneral("No properties found"),this.logger.info("No properties found "),this.propertyBillForm.propertyId.setValue("No properties found");return}this.listOfProperties=r.properties},error:r=>{this.logger.error(r.message),this.alertService.showInfoMsg(r.message)}})}logAction(r,d){return T(this,null,function*(){yield this.accountService.logUserAudit(r,d)})}};a.\u0275fac=function(d){return new(d||a)(h(x),h(k),h(V),h(we),h(Se),h(q),h($),h(C))},a.\u0275cmp=M({type:a,selectors:[["app-add-rental-bill"]],standalone:!0,features:[w],decls:149,vars:80,consts:[[1,"modal-header"],[1,"modal-title"],["type","button btn-xs","aria-label","Close",1,"close","btn-close","pull-right","border","border-gray",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[3,"justified"],["id","EST",3,"selectTab"],["tabHeading",""],["novalidate","",3,"formGroup"],[1,"row","gy-3","mt-3"],[1,"col-sm-6"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["id","estateid","formControlName","estateId",3,"clearable","ngClass"],["value","ALL","disabled","","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],[1,"invalid-feedback"],[4,"ngIf"],["id","chargeYear","formControlName","chargeYear",3,"clearable","ngClass"],[1,"col-sm-12"],[1,"custom-control","custom-control-sm","custom-checkbox","checked"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew1","id","saveAndNew1",1,"custom-control-input"],["for","saveAndNew1",1,"custom-control-label","fw-bolder"],[1,"row","my-3","mb-3","justify-content-end"],[1,"col-auto"],["data-bs-dismiss","modal",1,"btn","btn-outline-light","btn-sm",3,"click"],[1,"btn","btn-primary","btn-sm",3,"click"],["id","BLK",3,"selectTab"],["id","estateid","formControlName","estateId",3,"clearable","ngClass","change"],["value","ALL","selected","","disabled","",1,"fs-6"],["id","blockId","formControlName","blockId",3,"clearable","ngClass"],["value","ALL","selected","",1,"fs-6"],["class","text-danger",4,"ngIf"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew2","id","saveAndNew2",1,"custom-control-input"],["for","saveAndNew2",1,"custom-control-label","fw-bolder"],[1,"btn","btn-primary","btn-sm",3,"title","click"],["id","PROP",3,"selectTab"],["id","estateid","formControlName","blockId",3,"clearable","ngClass","change"],["id","propertyId","formControlName","propertyId",3,"clearable","ngClass"],["value","","selected","",1,"fs-6"],["type","checkbox","formControlName","saveAndNew","id","saveAndNew3","id","saveAndNew3",1,"custom-control-input"],["for","saveAndNew3",1,"custom-control-label","fw-bolder"],[1,"icon","ni","ni-home"],[3,"value"],[1,"icon","ni","ni-brick"],[1,"text-danger"],[1,"icon","ni","ni-property-blank"]],template:function(d,e){d&1&&(t(0,"div",0)(1,"h6",1),p(2,"Ground rent billing"),i(),t(3,"button",2),g("click",function(){return e.addGroundRentBillBsModalRef==null?null:e.addGroundRentBillBsModalRef.hide()}),t(4,"span",3),p(5,"\xD7"),i()()(),t(6,"div",4)(7,"div")(8,"tabset",5),c(9,"app-required-fields-notice")(10,"br"),t(11,"tab",6),g("selectTab",function(f){return e.onSelect(f)}),u(12,Ze,3,0,"ng-template",7),t(13,"form",8)(14,"div",9)(15,"div",10)(16,"div",11),c(17,"app-form-label",12),t(18,"div",13)(19,"ng-select",14)(20,"ng-option",15),p(21,"Select One"),i(),u(22,et,2,2,"ng-option",16),i(),t(23,"span",17),u(24,tt,2,0,"div",18),i()()()(),t(25,"div",10)(26,"div",11),c(27,"app-form-label",12),t(28,"div",13)(29,"ng-select",19)(30,"ng-option",15),p(31,"Select One"),i(),u(32,it,2,2,"ng-option",16),i(),t(33,"span",17),u(34,rt,2,0,"span",18),i()()()(),t(35,"div",20)(36,"div",21),c(37,"input",22),t(38,"label",23),p(39," Save & create new "),i()()()(),t(40,"div",24)(41,"div",25)(42,"button",26),g("click",function(){return e.addGroundRentBillBsModalRef==null?null:e.addGroundRentBillBsModalRef.hide()}),p(43," Close "),i()(),t(44,"div",25)(45,"button",27),g("click",function(){return e.saveGroundRentBill()}),p(46," Apply estate billing "),i()()()()(),t(47,"tab",28),g("selectTab",function(f){return e.onSelect(f)}),u(48,lt,3,0,"ng-template",7),t(49,"form",8)(50,"div",9)(51,"div",10)(52,"div",11),c(53,"app-form-label",12),t(54,"div",13)(55,"ng-select",29),g("change",function(){return e.fetchBlocks()}),t(56,"ng-option",30),p(57,"Select One"),i(),u(58,nt,2,2,"ng-option",16),i(),t(59,"span",17),u(60,ot,2,0,"div",18),i()()()(),t(61,"div",10)(62,"div",11),c(63,"app-form-label",12),t(64,"div",13)(65,"ng-select",31)(66,"ng-option",32),p(67,"Select One"),i(),u(68,at,2,2,"ng-option",16),i(),t(69,"span",17),u(70,st,2,0,"div",33),i()()()(),t(71,"div",10)(72,"div",11),c(73,"app-form-label",12),t(74,"div",13)(75,"ng-select",19)(76,"ng-option",32),p(77,"Select One"),i(),u(78,pt,2,2,"ng-option",16),i(),t(79,"span",17),u(80,dt,2,0,"span",18),i()()()(),t(81,"div",20)(82,"div",21),c(83,"input",34),t(84,"label",35),p(85," Save & create new "),i()()()(),t(86,"div",24)(87,"div",25)(88,"button",26),g("click",function(){return e.addGroundRentBillBsModalRef==null?null:e.addGroundRentBillBsModalRef.hide()}),p(89," Close "),i()(),t(90,"div",25)(91,"button",36),g("click",function(){return e.saveGroundRentBill()}),p(92," Apply block billing "),i()()()()(),t(93,"tab",37),g("selectTab",function(f){return e.onSelect(f)}),u(94,mt,3,0,"ng-template",7),t(95,"form",8)(96,"div",9)(97,"div",10)(98,"div",11),c(99,"app-form-label",12),t(100,"div",13)(101,"ng-select",29),g("change",function(){return e.fetchBlocks()}),t(102,"ng-option",32),p(103,"Select One"),i(),u(104,ct,2,2,"ng-option",16),i(),t(105,"span",17),u(106,ut,2,0,"div",18),i()()()(),t(107,"div",10)(108,"div",11),c(109,"app-form-label",12),t(110,"div",13)(111,"ng-select",38),g("change",function(){return e.fetchEstateProperties()}),t(112,"ng-option",32),p(113,"Select One"),i(),u(114,gt,2,2,"ng-option",16),i(),t(115,"span",17),u(116,ft,2,0,"div",33),i()()()(),t(117,"div",10)(118,"div",11),c(119,"app-form-label",12),t(120,"div",13)(121,"ng-select",39)(122,"ng-option",30),p(123,"Select Property"),i(),u(124,ht,2,2,"ng-option",16),i(),t(125,"span",17),u(126,vt,2,0,"div",18),i()()()(),t(127,"div",10)(128,"div",11),c(129,"app-form-label",12),t(130,"div",13)(131,"ng-select",19)(132,"ng-option",40),p(133,"Select One"),i(),u(134,bt,2,2,"ng-option",16),i(),t(135,"span",17),u(136,Bt,2,0,"span",18),i()()()(),t(137,"div",20)(138,"div",21),c(139,"input",41),t(140,"label",42),p(141," Save & create new "),i()()()(),t(142,"div",24)(143,"div",25)(144,"button",26),g("click",function(){return e.addGroundRentBillBsModalRef==null?null:e.addGroundRentBillBsModalRef.hide()}),p(145," Close "),i()(),t(146,"div",25)(147,"button",27),g("click",function(){return e.saveGroundRentBill()}),p(148," Apply property billing "),i()()()()()()()()),d&2&&(n(8),o("justified",!0),n(5),o("formGroup",e.estateBillFormGroup),n(4),o("labelForName","estateId")("labelName","Estate"),n(2),o("clearable",!1)("ngClass",B(60,I,((e.estateBillForm.estateId==null?null:e.estateBillForm.estateId.touched)||(e.estateBillForm.estateId==null?null:e.estateBillForm.estateId.dirty)||e.estateSubmitted)&&(e.estateBillForm.estateId==null?null:e.estateBillForm.estateId.errors))),n(3),o("ngForOf",e.listOfEstates),n(2),o("ngIf",e.estateBillForm.estateId==null||e.estateBillForm.estateId.errors==null?null:e.estateBillForm.estateId.errors.required),n(3),o("labelForName","chargeYear")("labelName","Charge Year"),n(2),o("clearable",!1)("ngClass",B(62,I,((e.estateBillForm.chargeYear==null?null:e.estateBillForm.chargeYear.touched)||(e.estateBillForm.chargeYear==null?null:e.estateBillForm.chargeYear.dirty)||e.estateSubmitted)&&(e.estateBillForm.chargeYear==null?null:e.estateBillForm.chargeYear.errors))),n(3),o("ngForOf",e.listOfChargeYears),n(2),o("ngIf",e.estateBillForm.chargeYear==null||e.estateBillForm.chargeYear.errors==null?null:e.estateBillForm.chargeYear.errors.required),n(15),o("formGroup",e.blockBillFormGroup),n(4),o("labelForName","estateId")("labelName","Estate"),n(2),o("clearable",!1)("ngClass",B(64,I,((e.blockBillForm.estateId==null?null:e.blockBillForm.estateId.touched)||(e.blockBillForm.estateId==null?null:e.blockBillForm.estateId.dirty)||e.blockSubmitted)&&(e.blockBillForm.estateId==null?null:e.blockBillForm.estateId.errors))),n(3),o("ngForOf",e.listOfEstates),n(2),o("ngIf",e.blockBillForm.estateId==null||e.blockBillForm.estateId.errors==null?null:e.blockBillForm.estateId.errors.required),n(3),o("labelForName","blockId")("labelName","Block"),n(2),o("clearable",!0)("ngClass",B(66,I,((e.blockBillForm.blockId==null?null:e.blockBillForm.blockId.touched)||(e.blockBillForm.blockId==null?null:e.blockBillForm.blockId.dirty)||e.blockSubmitted)&&(e.blockBillForm.blockId==null?null:e.blockBillForm.blockId.errors))),n(3),o("ngForOf",e.listOfBlocks),n(2),o("ngIf",e.blockBillForm.blockId==null||e.blockBillForm.blockId.errors==null?null:e.blockBillForm.blockId.errors.required),n(3),o("labelForName","chargeYear")("labelName","Charge Year"),n(2),o("clearable",!1)("ngClass",B(68,I,((e.blockBillForm.chargeYear==null?null:e.blockBillForm.chargeYear.touched)||(e.blockBillForm.chargeYear==null?null:e.blockBillForm.chargeYear.dirty)||e.blockSubmitted)&&(e.blockBillForm.chargeYear==null?null:e.blockBillForm.chargeYear.errors))),n(3),o("ngForOf",e.listOfChargeYears),n(2),o("ngIf",e.blockBillForm.chargeYear==null||e.blockBillForm.chargeYear.errors==null?null:e.blockBillForm.chargeYear.errors.required),n(11),o("title",e.blockBillFormGroup.invalid?"There must be errors on the form":""),n(4),o("formGroup",e.propertyBillFormGroup),n(4),o("labelForName","estateId")("labelName","Estate"),n(2),o("clearable",!1)("ngClass",B(70,I,((e.propertyBillForm.estateId==null?null:e.propertyBillForm.estateId.touched)||(e.propertyBillForm.estateId==null?null:e.propertyBillForm.estateId.dirty)||e.propertySubmitted)&&(e.propertyBillForm.estateId==null?null:e.propertyBillForm.estateId.errors))),n(3),o("ngForOf",e.listOfEstates),n(2),o("ngIf",e.propertyBillForm.estateId==null||e.propertyBillForm.estateId.errors==null?null:e.propertyBillForm.estateId.errors.required),n(3),o("labelForName","blockId")("labelName","Block"),n(2),o("clearable",!0)("ngClass",B(72,I,((e.propertyBillForm.blockId==null?null:e.propertyBillForm.blockId.touched)||(e.propertyBillForm.blockId==null?null:e.propertyBillForm.blockId.dirty)||e.propertySubmitted)&&(e.propertyBillForm.blockId==null?null:e.propertyBillForm.blockId.errors))),n(3),o("ngForOf",e.listOfBlocks),n(2),o("ngIf",e.propertyBillForm.blockId==null||e.propertyBillForm.blockId.errors==null?null:e.propertyBillForm.blockId.errors.required),n(3),o("labelForName","propertyId")("labelName","Estate Properties"),n(2),o("clearable",!1)("ngClass",B(74,St,e.propertyBillForm.propertyId==null?null:e.propertyBillForm.propertyId.valid))("ngClass",B(76,I,((e.propertyBillForm.propertyId==null?null:e.propertyBillForm.propertyId.touched)||(e.propertyBillForm.propertyId==null?null:e.propertyBillForm.propertyId.dirty)||e.propertySubmitted)&&(e.propertyBillForm.propertyId==null?null:e.propertyBillForm.propertyId.errors))),n(3),o("ngForOf",e.listOfProperties),n(2),o("ngIf",e.propertyBillForm.propertyId==null||e.propertyBillForm.propertyId.errors==null?null:e.propertyBillForm.propertyId.errors.required),n(3),o("labelForName","chargeYear")("labelName","Charge Year"),n(2),o("clearable",!1)("ngClass",B(78,I,((e.propertyBillForm.chargeYear==null?null:e.propertyBillForm.chargeYear.touched)||(e.propertyBillForm.chargeYear==null?null:e.propertyBillForm.chargeYear.dirty)||e.propertySubmitted)&&(e.propertyBillForm.chargeYear==null?null:e.propertyBillForm.chargeYear.errors))),n(3),o("ngForOf",e.listOfChargeYears),n(2),o("ngIf",e.propertyBillForm.chargeYear==null||e.propertyBillForm.chargeYear.errors==null?null:e.propertyBillForm.chargeYear.errors.required))},dependencies:[L,ae,Y,P,D,ve,ue,j,fe,ye,be,Be,Me,U,Ie,J,z,H,Ne,ke,Ce,Ee],encapsulation:2});let l=a;return l})();function yt(l,a){if(l&1&&(t(0,"ng-option",24),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.regionName," ")}}function _t(l,a){if(l&1){let s=ie();t(0,"div",14)(1,"div",8),c(2,"app-form-label",9),t(3,"div",10)(4,"ng-select",23),g("ngModelChange",function(d){ee(s);let e=E();return te(e.regionId=d)}),t(5,"ng-option",12),p(6,"Select Region"),i(),u(7,yt,2,2,"ng-option",13),i()()()()}if(l&2){let s=E();n(2),o("labelForName","regionId")("labelName","Region"),n(2),o("clearable",!1)("ngModel",s.regionId),n(3),o("ngForOf",s.listOfRegions)}}function It(l,a){if(l&1&&(t(0,"ng-option",24),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.estateName," ")}}function Ft(l,a){if(l&1&&(t(0,"ng-option",24),p(1),i()),l&2){let s=a.$implicit;o("value",s.recordId),n(1),v(" ",s.block," ")}}function Ct(l,a){if(l&1&&(t(0,"ng-option",24),p(1),i()),l&2){let s=a.$implicit;o("value",s),n(1),v(" ",s," ")}}function kt(l,a){if(l&1){let s=ie();t(0,"div",14)(1,"div",25)(2,"div",26),c(3,"em",27),i(),t(4,"input",28),g("ngModelChange",function(d){ee(s);let e=E();return te(e.searchedKeyword=d)}),i()()()}if(l&2){let s=E();n(4),o("ngModel",s.searchedKeyword)}}function Et(l,a){l&1&&(t(0,"tr")(1,"th"),p(2,"SN"),i(),t(3,"th"),p(4,"Occupant"),i(),t(5,"th"),p(6,"Property"),i(),t(7,"th",29),p(8,"Property No"),i(),t(9,"th"),p(10,"Usage"),i(),t(11,"th"),p(12,"Occupation Type"),i(),t(13,"th",29),p(14,"Charge Year"),i(),t(15,"th",29),p(16,"Amount"),i(),t(17,"th"),p(18,"Bill Type"),i(),t(19,"th"),p(20,"Bill Date"),i()())}function Nt(l,a){if(l&1&&(t(0,"tr")(1,"td"),p(2),i(),t(3,"td"),c(4,"app-full-name",30),i(),t(5,"td"),c(6,"app-full-name",31),b(7,"removeHyphen"),b(8,"titlecase"),i(),t(9,"td",29),p(10),i(),t(11,"td",32),p(12),b(13,"removeHyphen"),b(14,"titlecase"),i(),t(15,"td"),p(16),b(17,"titlecase"),i(),t(18,"td",29),p(19),i(),t(20,"td",29),p(21),b(22,"number"),i(),t(23,"td",32),p(24),b(25,"removeHyphen"),b(26,"titlecase"),i(),t(27,"td"),p(28),b(29,"lowercase"),t(30,"div",33)(31,"small",34),p(32),b(33,"date"),i(),t(34,"small",35),p(35),b(36,"timeAgo"),i()()()()),l&2){let s=a.$implicit,r=a.rowIndex;n(2),_(r+1),n(2),N("fullName",s==null?null:s.occupantName),N("otherFieldName",s==null?null:s.institutionalDisplayName),n(2),N("fullName",s==null?null:s.propertyName),N("otherFieldName",S(7,15,S(8,17,s==null?null:s.propertyId))),o("showAvatar",!1),n(4),_(s.propertyNo),n(2),_(S(13,19,S(14,21,s.propertyUsage))),n(4),_(S(17,23,s.occupationType)),n(3),_(s.ledgerYear),n(2),_(O(22,25,s.amountPaid,".2-2")),n(3),_(S(25,28,S(26,30,s.paymentType))),n(4),v(" ",S(29,32,s.createdBy)," "),n(4),_(O(33,34,s.createdDate,"medium")),n(3),v(" ",S(36,37,s.createdDate),"")}}var Gt=()=>[5,10,25,50],mi=(()=>{let a=class a{constructor(r,d,e,m,f,X,Q){this.groupRentBillingService=r,this.utilsService=d,this.accountService=e,this.alertService=m,this.settingService=f,this.logger=X,this.addGroundRentBillModalService=Q,this.accountService.currentUser.subscribe(W=>this.currentUser=W)}ngOnInit(){this.estate="A",this.block="A",this.logAction("Viewed property charges page",F.ESTATE_BILLING),this.regionId=this.currentUser.regionId,this.chargeYear=new Date().getFullYear(),this.listOfChargeYears=this.utilsService.getChargeYears(),this.fetchEstates()}ngOnDestroy(){this.addGroundRentBillModalService.hide(),Ve.default.close()}fetchEstates(){this.listOfEstates=[],this.settingService.getEstates().subscribe({next:r=>{if(this.logger.info("getEstates response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.estates.length<=0){this.alertService.showInfoMsgGeneral("No zones found"),this.logger.info("No zones found");return}this.listOfEstates=r.estates},error:r=>{this.logger.error(r),this.alertService.showInfoMsg(r)}})}fetchEstateBlocks(){this.listOfEstateBlocks=[],this.settingService.getEstateBlocks(this.currentUser,this.estate).subscribe({next:r=>{if(this.logger.info("getEstates response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.estateBlocks.length<=0){this.alertService.showInfoMsgGeneral("No blocks found"),this.logger.info("No blocks found ");return}this.listOfEstateBlocks=r.estateBlocks},error:r=>{this.logger.error(r.message),this.alertService.showInfoMsg(r.message)}})}fetchRegions(){this.listOfRegions=[],this.settingService.getRegions().subscribe({next:r=>{if(this.logger.info("getRegions response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.regions.length<=0){this.alertService.showInfoMsgGeneral("No regions found"),this.logger.info("No regions found");return}this.listOfRegions=r.regions},error:r=>{this.logger.error(r),this.alertService.showInfoMsg(r)}})}refreshButton(){this.fetchPropertyCharges()}fetchPropertyCharges(){this.listOfPropertyCharges=[],this.groupRentBillingService.getGroundRentBills(this.currentUser,this.block,this.chargeYear).subscribe({next:r=>{if(this.logger.info("getGroundRentBills response "+JSON.stringify(r)),r.headerResponse.responseCode!=="000"){this.alertService.error(r.headerResponse.responseMessage);return}if(r.propertyLedgers.length<=0){this.alertService.showInfoMsgGeneral("No ground rent bills found"),this.logger.info("No ground rent bills found");return}this.listOfPropertyCharges=r.propertyLedgers},error:r=>{this.logger.error(r),this.alertService.showInfoMsg(r)}})}openGroundRentBillModalComponent(){this.addGroundRentBillModalService.config.ignoreBackdropClick=!0,this.addGroundRentBillModalService.config.animated=!0,this.addGroundRentBillBsModalRef=this.addGroundRentBillModalService.show(Ue),this.addGroundRentBillBsModalRef.content.closeBtnName="Close"}logAction(r,d){return T(this,null,function*(){yield this.accountService.logUserAudit(r,d)})}};a.\u0275fac=function(d){return new(d||a)(h(x),h(k),h(q),h($),h(V),h(C),h(Oe))},a.\u0275cmp=M({type:a,selectors:[["ng-component"]],standalone:!0,features:[w],decls:40,vars:30,consts:[[3,"pageTitleName","description"],[1,"newItemName"],[1,"dropdown"],[1,"btn","btn-primary",3,"click"],[1,"icon","ni","ni-plus"],[1,"row","gy-2","gx-3","mb-4","align-items-center"],["class","col-sm-2",4,"ngIf"],[1,"col-sm-3"],[1,"form-group"],[3,"labelForName","labelName"],[1,"form-control-wrap"],["id","estate",3,"clearable","ngModel","ngModelChange","change"],["value","A","selected","",1,"fs-6"],[3,"value",4,"ngFor","ngForOf"],[1,"col-sm-2"],["id","block",3,"clearable","ngModel","ngModelChange"],["id","chargeYear",3,"clearable","ngModel","ngModelChange"],[1,"col-auto"],["type","button","title","",1,"btn","btn-dim","btn-primary","mt-4",3,"click"],["responsiveLayout","scroll","sortMode","multiple","responsiveLayout","scroll","styleClass","p-datatable-sm p-datatable-striped","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","scrollDirection","both",3,"value","paginator","rows","showCurrentPageReport","rowsPerPageOptions","resizableColumns","autoLayout"],["dt1",""],["pTemplate","header"],["pTemplate","body"],["id","regionId",3,"clearable","ngModel","ngModelChange"],[3,"value"],[1,"form-control-wrap","mt-4"],[1,"form-icon","form-icon-right"],[1,"icon","ni","ni-search"],["type","text","id","default-04","placeholder"," Search property here",1,"form-control",3,"ngModel","ngModelChange"],[1,"text-end"],[3,"fullName","otherFieldName"],[1,"text-uppercase",3,"showAvatar","fullName","otherFieldName"],[1,"text-capitalize"],[1,"fw-lighter"],[1,"d-block"],[1,"text-primary"]],template:function(d,e){d&1&&(t(0,"app-add-item",0)(1,"span",1)(2,"div",2)(3,"a",3),g("click",function(){return e.openGroundRentBillModalComponent()}),c(4,"em",4),t(5,"span"),p(6,"Bill ground rent"),i()()()()(),t(7,"div",5),u(8,_t,8,5,"div",6),t(9,"div",7)(10,"div",8),c(11,"app-form-label",9),t(12,"div",10)(13,"ng-select",11),g("ngModelChange",function(f){return e.estate=f})("change",function(){return e.fetchEstateBlocks()}),t(14,"ng-option",12),p(15,"Select Estate"),i(),u(16,It,2,2,"ng-option",13),i()()()(),t(17,"div",14)(18,"div",8),c(19,"app-form-label",9),t(20,"div",10)(21,"ng-select",15),g("ngModelChange",function(f){return e.block=f}),t(22,"ng-option",12),p(23,"Select Block"),i(),u(24,Ft,2,2,"ng-option",13),i()()()(),t(25,"div",14)(26,"div",8),c(27,"app-form-label",9),t(28,"div",10)(29,"ng-select",16),g("ngModelChange",function(f){return e.chargeYear=f}),u(30,Ct,2,2,"ng-option",13),i()()()(),u(31,kt,5,1,"div",6),t(32,"div",17)(33,"button",18),g("click",function(){return e.refreshButton()}),p(34," Search "),i()()(),t(35,"p-table",19,20),b(37,"filter"),u(38,Et,21,0,"ng-template",21)(39,Nt,37,39,"ng-template",22),i()),d&2&&(o("pageTitleName","Ground Rent Billing")("description","Apply yearly ground rent to estates,properties and occupants"),n(8),o("ngIf",!1),n(3),o("labelForName","estate")("labelName","Estates"),n(2),o("clearable",!1)("ngModel",e.estate),n(3),o("ngForOf",e.listOfEstates),n(3),o("labelForName","block")("labelName","Blocks"),n(2),o("clearable",!1)("ngModel",e.block),n(3),o("ngForOf",e.listOfEstateBlocks),n(3),o("labelForName","chargeYear")("labelName","Charge Year"),n(2),o("clearable",!1)("ngModel",e.chargeYear),n(1),o("ngForOf",e.listOfChargeYears),n(1),o("ngIf",(e.listOfPropertyCharges==null?null:e.listOfPropertyCharges.length)>0),n(4),o("value",O(37,26,e.listOfPropertyCharges,e.searchedKeyword))("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",oe(29,Gt))("resizableColumns",!0)("autoLayout",!0))},dependencies:[L,Y,P,se,me,pe,de,Te,Re,Ge,D,ge,j,he,J,z,H,Fe,Ae,Ye,Pe,U,Le],encapsulation:2});let l=a;return l})();export{mi as GroundRentBillingComponent};
