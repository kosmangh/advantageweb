import { HeaderRequest } from "../header.request";

export class ReversePayBillRequest {
    headerRequest: HeaderRequest;
    billId: string;
    ledgerId: string;
    modifiedBy: string;
}
