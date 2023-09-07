import { HeaderRequest } from "../header.request";

export class RentalBillListRequest {
    headerRequest: HeaderRequest;
    rentMonth: string;
    rentYear: number;
}
