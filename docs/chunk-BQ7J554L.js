import{a as q}from"./chunk-Y725X6Z7.js";import{c as z}from"./chunk-R55IMLXW.js";import"./chunk-LPKVFVKE.js";import{b as F,d as T,e as y,f as O,g as R}from"./chunk-IHPVOZWG.js";import{a as H}from"./chunk-HPGLX4ZN.js";import{g as j}from"./chunk-7DWKZ4XI.js";import{Cb as k,Eb as i,Fb as v,Gb as s,Kc as w,Mb as M,Sa as n,Ta as h,Tc as C,Uc as N,Wb as l,Xb as o,Yb as b,bb as B,ca as x,gb as D,ia as S,ib as P,la as I,nb as e,ob as t,pb as c,s as E,wb as A}from"./chunk-QRSQYA3Q.js";import"./chunk-5FZOKLP6.js";var f=class{};var G=(()=>{let m=class m{constructor(d,r,a){this.utilsService=d,this.http=r,this.logger=a}getDashboardSummary(d){let r=new f;return r.searchValue=d.zoneId,r.headerRequest=this.utilsService.getRequestHeader(d.zoneId,d.regionId,"DASHBOARD"),this.logger.info("getDashboardSummary request "+JSON.stringify(r)),this.http.post(`${y.url+T.API_DASH}dashboard`,r).pipe(E(y.timeout))}};m.\u0275fac=function(r){return new(r||m)(S(O),S(j),S(F))},m.\u0275prov=x({token:m,factory:m.\u0275fac,providedIn:"root"});let u=m;return u})();function $(u,m){if(u&1&&(e(0,"div",25)(1,"div",26)(2,"div",8)(3,"div",27)(4,"div",28)(5,"div"),l(6,"avatarBg"),e(7,"span"),i(8),t()(),e(9,"div",29)(10,"h6"),i(11),t()()(),e(12,"ul",30)(13,"li")(14,"span"),i(15,"Blocks"),t(),e(16,"span"),i(17),l(18,"number"),t()(),e(19,"li")(20,"span"),i(21,"Properties"),t(),e(22,"span"),i(23),l(24,"number"),t()(),e(25,"li")(26,"span"),i(27,"Inactive Prop"),t(),e(28,"span"),i(29),l(30,"number"),t()(),e(31,"li")(32,"span"),i(33,"Prop. Allocated"),t(),e(34,"span"),i(35),l(36,"number"),t()(),e(37,"li")(38,"span"),i(39,"Prop. Available"),t(),e(40,"span"),i(41),l(42,"number"),t()()()()()()()),u&2){let p=m.$implicit;n(5),D("user-avatar md ",o(6,10,""),""),n(3),v(p.recordId),n(3),v(p.estateName),n(6),s(" ",o(18,12,p==null?null:p.blocks),""),n(6),s(" ",o(24,14,p==null?null:p.properties),""),n(6),s(" ",o(30,16,p==null?null:p.inactiveProperties),""),n(6),s(" ",o(36,18,p==null?null:p.allocatedProperties),""),n(6),s(" ",o(42,20,p==null?null:p.availableProperties),"")}}var oe=(()=>{let m=class m{constructor(d,r,a){this.accountService=d,this.alertService=r,this.dashboardService=a,this.accountService.currentUser.subscribe(g=>this.currentUser=g)}ngOnInit(){this.findDay(),this.fetchDashboardSummary()}ngOnDestroy(){}findDay(){let r=new Date().getHours();r<12?this.greetMsg="Good Morning":r>=12&&r<=17?this.greetMsg="Good Afternoon":r>=17&&r<=24&&(this.greetMsg="Good Evening")}fetchDashboardSummary(){this.dashboardService.getDashboardSummary(this.currentUser).subscribe({next:d=>{if(d.headerResponse.responseCode!=="000"){this.alertService.showErrorMsg(d.headerResponse.responseMessage);return}this.dashboardSummary=d},error:d=>{this.alertService.showInfoMsg(d)}})}};m.\u0275fac=function(r){return new(r||m)(h(R),h(z),h(G))},m.\u0275cmp=I({type:m,selectors:[["app-dashboard-old"]],standalone:!0,features:[M],decls:114,vars:42,consts:[["pageTitleName","Dashboard",3,"description"],[1,"newButtonName"],[1,"btn","btn-dim","btn-primary",3,"click"],[1,"icon","ni","ni-reload"],[1,"nk-block"],[1,"row","g-gs"],[1,"col-md-4"],[1,"card","card-bordered","card-full"],[1,"card-inner"],[1,"card-title-group","align-start","mb-0","text-center"],[1,"card-title"],[1,"title","text-uppercase","fs-12px"],[1,"card-amount","text-center"],[1,"amount","fw-bold"],[1,"fs-11px","sub-text-sm","text-uppercase",2,"letter-spacing",".1em","color","#8094ae"],[1,"invest-data"],[1,"invest-data-amount","g-2"],[1,"invest-data-history"],[1,"title"],[1,"invest-data-ck"],["src","assets/images/graphs.png","alt",""],[1,"card-title-group","align-start","mb-0"],[1,"title","fw-bold"],[1,"card-amount"],["class","col-md-3 col-lg-3",4,"ngFor","ngForOf"],[1,"col-md-3","col-lg-3"],[1,"card","card-bordered"],[1,"team"],[1,"user-card","user-card-s2"],[1,"user-info"],[1,"team-info"]],template:function(r,a){r&1&&(e(0,"app-page-title",0)(1,"span",1)(2,"a",2),A("click",function(){return a.fetchDashboardSummary()}),c(3,"em",3),e(4,"span"),i(5,"Refresh"),t()()()(),e(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8)(11,"div",9)(12,"div",10)(13,"h6",11),i(14,"Estates"),t()()(),e(15,"div",12)(16,"div",13),i(17),l(18,"number"),e(19,"span",14),i(20," arches "),t()()(),e(21,"div",15)(22,"div",16)(23,"div",17)(24,"div",18),i(25,"Total"),t(),e(26,"div",13),i(27),l(28,"number"),t()(),e(29,"div",17)(30,"div",18),i(31,"Allocated"),t(),e(32,"div",13),i(33),l(34,"number"),t()(),e(35,"div",17)(36,"div",18),i(37,"Available"),t(),e(38,"div",13),i(39),l(40,"number"),t()()(),e(41,"div",19),c(42,"img",20),t()()()()(),e(43,"div",6)(44,"div",7)(45,"div",8)(46,"div",21)(47,"div",10)(48,"h6",22),i(49,"Blocks"),t()()(),e(50,"div",23)(51,"span",13),i(52),l(53,"number"),e(54,"span",14),i(55," arches "),t()()(),e(56,"div",15)(57,"div",16)(58,"div",17)(59,"div",18),i(60,"Total"),t(),e(61,"div",13),i(62),l(63,"number"),t()(),e(64,"div",17)(65,"div",22),i(66,"Allocated"),t(),e(67,"div",13),i(68),l(69,"number"),t()(),e(70,"div",17)(71,"div",18),i(72,"Available"),t(),e(73,"div",13),i(74),l(75,"number"),t()()(),e(76,"div",19),c(77,"img",20),t()()()()(),e(78,"div",6)(79,"div",7)(80,"div",8)(81,"div",21)(82,"div",10)(83,"h6",18),i(84,"Properties"),t()()(),e(85,"div",23)(86,"span",13),i(87),l(88,"number"),e(89,"span",14),i(90," arches "),t()()(),e(91,"div",15)(92,"div",16)(93,"div",17)(94,"div",18),i(95,"Total"),t(),e(96,"div",13),i(97),l(98,"number"),t()(),e(99,"div",17)(100,"div",18),i(101,"Allocated"),t(),e(102,"div",13),i(103),l(104,"number"),t()(),e(105,"div",17)(106,"div",18),i(107,"Available"),t(),e(108,"div",13),i(109),l(110,"number"),t()()(),e(111,"div",19),c(112,"img",20),t()()()()(),P(113,$,43,22,"div",24),t()()),r&2&&(k("description","",a.greetMsg," "," "+a.currentUser.fullName,"."),n(17),s(" ",b(18,15,a.dashboardSummary==null?null:a.dashboardSummary.totalEstateSize,".2-2")," "),n(10),v(o(28,18,(a.dashboardSummary==null?null:a.dashboardSummary.occupiedEstates)+(a.dashboardSummary==null?null:a.dashboardSummary.availableEstates))),n(6),v(o(34,20,a.dashboardSummary==null?null:a.dashboardSummary.occupiedEstates)),n(6),v(o(40,22,a.dashboardSummary==null?null:a.dashboardSummary.availableEstates)),n(13),s(" ",b(53,24,a.dashboardSummary==null?null:a.dashboardSummary.totalBlockSize,".2-2")," "),n(10),v(o(63,27,(a.dashboardSummary==null?null:a.dashboardSummary.occupiedBlocks)+(a.dashboardSummary==null?null:a.dashboardSummary.availableBlocks))),n(6),s(" ",o(69,29,a.dashboardSummary==null?null:a.dashboardSummary.occupiedBlocks)," "),n(6),s(" ",o(75,31,a.dashboardSummary==null?null:a.dashboardSummary.availableBlocks)," "),n(13),s(" ",b(88,33,a.dashboardSummary==null?null:a.dashboardSummary.totalPropertySize,".2-2")," "),n(10),v(o(98,36,(a.dashboardSummary==null?null:a.dashboardSummary.occupiedProperties)+(a.dashboardSummary==null?null:a.dashboardSummary.availableProperties))),n(6),s(" ",o(104,38,a.dashboardSummary==null?null:a.dashboardSummary.occupiedProperties)," "),n(6),s(" ",o(110,40,a.dashboardSummary==null?null:a.dashboardSummary.availableProperties)," "),n(4),B("ngForOf",a.dashboardSummary==null?null:a.dashboardSummary.estateSummary))},dependencies:[N,w,C,H,q],encapsulation:2});let u=m;return u})();export{oe as DashboardComponent};