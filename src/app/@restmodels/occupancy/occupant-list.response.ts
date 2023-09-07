import { Occupant } from "src/app/@models/occupancy/occupant";
import { HeaderResponse } from "../header.response";

export class OccupantListResponse {
    headerResponse: HeaderResponse;
    occupants: Occupant[];
}
