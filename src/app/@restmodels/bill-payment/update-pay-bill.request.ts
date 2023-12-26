import { HeaderRequest } from "../header.request";

export class UpdatePayBillRequest {
    headerRequest: HeaderRequest;
    billId: string;
    ledgerId: string;
    modeOfPayment: string;
    modeOfPaymentNo: string;
    receiptNumber: string;
    modifiedBy: string;
    amountPaid:number
}
