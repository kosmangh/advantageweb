import { AuditLog } from "src/app/@models/auditLog";
import { HeaderRequest } from "../header.request";

export class AuditLogRequest {
    headerRequest!: HeaderRequest;
    fullName!: string;
    username!: string;
    userActivity!: string;
    userRole!: string;
    ui!: string;
    
    branch!: string;
    recordDate!: Date;
    
}
