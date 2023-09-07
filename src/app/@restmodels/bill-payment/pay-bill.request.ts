import { HeaderRequest } from './../header.request';
export class PayBillRequest {

    headerRequest: HeaderRequest;
    dateOfPayment: Date;
    datePaid: Date=new Date();
    modeOfPayment: string;
    modeOfPaymentNo: string;
    receiptNo: string;
    amountInvolved: number;
    propertyId: string;
    occupantId: string;
    recordId: number;
    createdBy: string;
    paymentType: string;


}
