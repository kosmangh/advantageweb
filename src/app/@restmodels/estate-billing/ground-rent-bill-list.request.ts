import { HeaderRequest } from "../header.request";

export class GroundRentBillListRequest {
    headerRequest: HeaderRequest;
    blockId: string;
    chargeYear: number;
}
