import { HeaderRequest } from "../header.request";

export class AuditLogListRequest {
    headerRequest: HeaderRequest;
    searchBy: string;
    searchValue: string;
    startDate: Date;
    endDate: Date;
}
