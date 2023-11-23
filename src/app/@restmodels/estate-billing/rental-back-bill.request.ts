import { HeaderRequest } from "../header.request";

export class RentalBillBackRequest {
    headerRequest: HeaderRequest;
    propertyId: string;
    rentAmount: number;
    billingType: string;
    startMonth: string;
    startYear: number;
    endMonth: string;
    endYear: number;
    createdBy: string;
    estateId: string;
    blockId: string;
}