import { Bills } from 'src/app/@models/bill-payment/bills';
import { HeaderRequest } from './../header.request';
import { PropertyLedger } from 'src/app/@models/bill-payment/property-ledger';
export class PayBillRequest {

    headerRequest: HeaderRequest;
    dateOfPayment: Date;
    datePaid: Date = new Date();
    modeOfPayment: string;
    modeOfPaymentNo: string;
    receiptNumber: string;
    amountPaid: number;
    billYear: number;
    propertyId: string;
    occupantId: string;
    billId: string;
    recordId: string;
    createdBy: string;
    paymentType: string;
    payerName: string;
    occupantName: string;
    dateOfTransaction: Date;
    spreadAmtForOccupantProperties: boolean;
    billAmount: number;


    constructor(bill: Bills, ledger: PropertyLedger) {
        if (bill) {
            //this is for new bill payment
            this.billId = bill.recordId;
            this.billAmount = bill.billAmount; // amount of bill to be paid
            this.billYear = bill.billYear;
            this.propertyId = bill.property;
            this.occupantId = bill.occupant;
            this.paymentType = 'PICK FROM OUTSTANDING BILLS';
            this.payerName = 'PICK FROM OUTSTANDING BILLS';
        } else {
            //This is for edit bill payment
            this.recordId = ledger.recordId;
            this.amountPaid = ledger.amountPaid;
            this.billAmount = ledger.billAmount; // amount of bill to be paid
            this.billYear = ledger.ledgerYear;
            this.propertyId = ledger.propertyId;
            this.occupantId = ledger.occupant;
            this.paymentType = ledger.paymentType;
            this.receiptNumber = ledger.receiptNumberIssued;
            this.modeOfPayment = ledger.mediumOfPayment;
            this.modeOfPaymentNo = ledger.mediumOfPaymentNumber;
            this.billId = ledger.bill;
            this.payerName = ledger.payeeName
            this.occupantName = ledger.occupantName
            this.dateOfTransaction = ledger.dateOfRecordTransaction;
        }
    }

}
