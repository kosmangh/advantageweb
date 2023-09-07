"use strict";(self.webpackChunkadvantageweb=self.webpackChunkadvantageweb||[]).push([[7964],{7964:(B,c,o)=>{o.r(c),o.d(c,{AuditLogsComponent:()=>y});var m=o(5861),e=o(5879),u=o(6814),l=o(95),f=o(7236),g=o(1392),p=o(2458),A=o(4981),h=o(7177),v=o(7467),M=o(5176),Z=o(2187),T=o(8624),D=o(1085),C=o(8352),d=o(6842),E=o(9972);function U(a,_){if(1&a){const t=e.EpF();e.TgZ(0,"div",3)(1,"div",4)(2,"label",5),e._uU(3),e.qZA(),e._UZ(4,"br"),e.TgZ(5,"div",6)(6,"input",26),e.NdJ("ngModelChange",function(s){e.CHM(t);const r=e.oxw();return e.KtG(r.searchValue=s)}),e.qZA()()()()}if(2&a){const t=e.oxw();e.xp6(3),e.Oqu(t.searchValueLabel),e.xp6(3),e.s9C("placeholder",t.searchPlaceholder),e.Q6J("ngModel",t.searchValue)}}function O(a,_){1&a&&(e.TgZ(0,"tr")(1,"th"),e._uU(2,"SN"),e.qZA(),e.TgZ(3,"th"),e._uU(4,"Full Name"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Username"),e.qZA(),e.TgZ(7,"th"),e._uU(8,"Activity"),e.qZA(),e.TgZ(9,"th"),e._uU(10,"IP Address"),e.qZA(),e.TgZ(11,"th"),e._uU(12,"Log Date"),e.qZA()())}function L(a,_){if(1&a&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._UZ(4,"app-full-name",27),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"div",28)(11,"small",29),e._uU(12),e.ALo(13,"date"),e.qZA(),e.TgZ(14,"small",30),e._uU(15),e.ALo(16,"timeAgo"),e.qZA()()(),e.TgZ(17,"td"),e._uU(18),e.qZA()()),2&a){const t=_.$implicit,n=_.rowIndex;e.xp6(2),e.Oqu(n+1),e.xp6(2),e.s9C("fullName",null==t?null:t.fullName),e.s9C("otherFieldName",null==t?null:t.email),e.xp6(2),e.Oqu(null==t?null:t.username),e.xp6(2),e.Oqu(null==t?null:t.userActivity),e.xp6(4),e.Oqu(e.xi3(13,8,t.createdDate,"medium")),e.xp6(3),e.hij(" ",e.lcZ(16,11,t.createdDate),""),e.xp6(3),e.Oqu(null==t?null:t.ip)}}const P=function(){return[5,10,25,50]};let y=(()=>{var a;class _{constructor(n,s,r,i){this.addStaffBsModalRef=n,this.viewStaffBsModalRef=s,this.loginAccountBsModalRef=r,this.adminPasswordResetBsModalRef=i,this.authService=(0,e.f3M)(h.e),this.accountService=(0,e.f3M)(h.e),this.alertService=(0,e.f3M)(A.c),this.utilsService=(0,e.f3M)(v.F),this.excelExporterService=(0,e.f3M)(C.h),this.logger=(0,e.f3M)(f.Kf),this.accountService.currentUser.subscribe(R=>this.currentUser=R)}ngOnInit(){this.searchBy="DR",this.startDate=this.utilsService.getFirstDayDate(),this.endDate=new Date,this.fetchAudits()}ngOnDestroy(){}searchByListener(){if(this.searchValue="","username"===this.searchBy)return this.searchValueLabel="Username",void(this.searchPlaceholder=" Enter username")}fetchAudits(){this.listOfAudits=[],this.authService.searchAuditLogs(this.currentUser,this.searchBy,this.searchValue,this.startDate,this.endDate).subscribe({next:n=>{if(this.logger.info("search audit logs response "+JSON.stringify(n)),"000"===n.headerResponse.responseCode)return n.auditLogs.length<=0?(this.alertService.showInfoMsgGeneral("No audits found"),void this.logger.info("No audits found")):void(this.listOfAudits=n.auditLogs);this.alertService.showErrorMsg(n.headerResponse.responseMessage)},error:n=>{this.logger.error(n),this.alertService.showInfoMsg(n)}})}exportAudits(){this.excelExporterService.exportAsExcelFile(this.listOfAudits,"audit_logs")}logAction(n,s){var r=this;return(0,m.Z)(function*(){yield r.accountService.logUserAudit(n,s)})()}}return(a=_).\u0275fac=function(n){return new(n||a)(e.Y36(d.UZ),e.Y36(d.UZ),e.Y36(d.UZ),e.Y36(d.UZ))},a.\u0275cmp=e.Xpm({type:a,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:47,vars:20,consts:[[3,"pageTitleName","description"],[1,"newItemName"],[1,"row","gy-2","gx-3","mt-5","mb-4","align-items-center"],[1,"col-sm-2"],[1,"form-group"],["for","startDate",1,"form-label","pt-0"],[1,"form-control-wrap"],[1,"form-control-select"],["id","searchBy",1,"form-control",3,"ngModel","ngModelChange","change"],["value","username","selected","",1,"fs-6"],["value","DR","selected","",1,"fs-6"],["class","col-sm-2",4,"ngIf"],[1,"col-auto"],["styleClass","\u201dform-control\u201d","dateFormat","dd-mm-yy",3,"showIcon","ngModel","ngModelChange"],["for","endDate",1,"form-label","pt-0"],["type","button","title","",1,"btn","btn-dim","btn-primary","mt-4",3,"click"],[1,"btn","mt-4","btn-outline-light",3,"click"],[1,"icon","ni","ni-download"],[1,"row","gy-2","gx-3","my-3"],[1,"form-icon","form-icon-right"],[1,"icon","ni","ni-search"],["type","text","id","default-04","placeholder","Quick search",1,"form-control",3,"ngModel","ngModelChange"],["responsiveLayout","scroll","sortMode","multiple","responsiveLayout","scroll","styleClass","p-datatable-sm p-datatable-striped","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","scrollDirection","both",3,"value","paginator","rows","showCurrentPageReport","rowsPerPageOptions","resizableColumns","autoLayout"],["dt1",""],["pTemplate","header"],["pTemplate","body"],["id","searchBy",1,"form-control",3,"ngModel","placeholder","ngModelChange"],[3,"fullName","otherFieldName"],[1,"fw-lighter"],[1,"d-block"],[1,"text-primary"]],template:function(n,s){1&n&&(e.TgZ(0,"app-add-item",0),e._UZ(1,"span",1),e.qZA(),e.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"label",5),e._uU(6,"Search Type"),e.qZA(),e._UZ(7,"br"),e.TgZ(8,"div",6)(9,"div",7)(10,"select",8),e.NdJ("ngModelChange",function(i){return s.searchBy=i})("change",function(){return s.searchByListener()}),e.TgZ(11,"option",9),e._uU(12,"Username"),e.qZA(),e.TgZ(13,"option",10),e._uU(14,"Date Range"),e.qZA()()()()()(),e.YNc(15,U,7,3,"div",11),e.TgZ(16,"div",12)(17,"div",6)(18,"div",4)(19,"label",5),e._uU(20,"Start Date"),e.qZA(),e._UZ(21,"br"),e.TgZ(22,"p-calendar",13),e.NdJ("ngModelChange",function(i){return s.startDate=i}),e.qZA()()()(),e.TgZ(23,"div",12)(24,"label",14),e._uU(25,"End Date"),e.qZA(),e._UZ(26,"br"),e.TgZ(27,"p-calendar",13),e.NdJ("ngModelChange",function(i){return s.endDate=i}),e.qZA()(),e.TgZ(28,"div",12)(29,"button",15),e.NdJ("click",function(){return s.fetchAudits()}),e._uU(30," Search "),e.qZA()(),e.TgZ(31,"div",12)(32,"a",16),e.NdJ("click",function(){return s.exportAudits()}),e._UZ(33,"em",17),e.TgZ(34,"span"),e._uU(35,"Export"),e.qZA()()()(),e.TgZ(36,"div",18)(37,"div",12)(38,"div",6)(39,"div",19),e._UZ(40,"em",20),e.qZA(),e.TgZ(41,"input",21),e.NdJ("ngModelChange",function(i){return s.searchedKeyword=i}),e.qZA()()()(),e.TgZ(42,"p-table",22,23),e.ALo(44,"filter"),e.YNc(45,O,13,0,"ng-template",24),e.YNc(46,L,19,13,"ng-template",25),e.qZA()),2&n&&(e.Q6J("pageTitleName","Audit Logs")("description","User activities"),e.xp6(10),e.Q6J("ngModel",s.searchBy),e.xp6(5),e.Q6J("ngIf","DR"!==s.searchBy),e.xp6(7),e.Q6J("showIcon",!0)("ngModel",s.startDate),e.xp6(5),e.Q6J("showIcon",!0)("ngModel",s.endDate),e.xp6(14),e.Q6J("ngModel",s.searchedKeyword),e.xp6(1),e.Q6J("value",e.xi3(44,16,s.listOfAudits,s.searchedKeyword))("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",e.DdM(19,P))("resizableColumns",!0)("autoLayout",!0))},dependencies:[u.ez,u.O5,u.uU,l.u5,l.YN,l.Kr,l.Fj,l.EJ,l.JJ,l.On,g._8,g.f,E.jx,M.L,p.U$,p.iA,T.$,Z.c,D.e],encapsulation:2}),_})()}}]);