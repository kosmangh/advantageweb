import { HeaderRequest } from './../header.request';
export class GroundRentBillRequest {
    headerRequest: HeaderRequest;
    estateId: string;
    blockId: string;
    billingType: string;
    propertyId: string;
    chargeYear: number;
    createdBy: string;
}
