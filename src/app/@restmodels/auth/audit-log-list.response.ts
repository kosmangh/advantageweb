import { AuditLog } from 'src/app/@models/auditLog';
import { HeaderResponse } from '../header.response';

export class AuditLogListResponse {
     headerResponse: HeaderResponse;
     auditLogs: AuditLog[];
}
