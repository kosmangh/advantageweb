import { HeaderRequest } from "../header.request";

export class RentalBillRequest {
    headerRequest: HeaderRequest;
    propertyId: string;
    billDate: Date;
    rentAmount: number;
    billingType: string;
    createdBy: string;
    estateId: string;
    blockId: string;
}