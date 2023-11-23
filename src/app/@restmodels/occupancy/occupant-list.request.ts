import { Occupant } from "src/app/@models/occupancy/occupant";
import { HeaderRequest } from "../header.request";

export class OccupantListRequest {
    headerRequest: HeaderRequest;
    occupantType: string;
    startDate: Date;
    endDate: Date;
    dateRange: boolean;
}
