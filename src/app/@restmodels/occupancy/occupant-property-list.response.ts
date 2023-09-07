import { Occupant } from "src/app/@models/occupancy/occupant";
import { HeaderResponse } from "../header.response";
import { OccupantProperty } from "src/app/@models/occupancy/occupant-property";

export class OccupantPropertyListResponse {
    headerResponse: HeaderResponse;
    occupantProperties: OccupantProperty[];
}
