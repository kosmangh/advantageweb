import { HeaderRequest } from "../header.request";
export class DemandNoticeRequest {
    headerRequest: HeaderRequest;
    searchParameter: string;
    searchValue: string;
    chargeYear: number;
}