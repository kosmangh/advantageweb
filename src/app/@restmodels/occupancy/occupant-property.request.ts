import { OccupantProperty } from "src/app/@models/occupancy/occupant-property";
import { HeaderRequest } from "../header.request";

export class OccupantPropertyRequest extends OccupantProperty {
    headerRequest: HeaderRequest;

}
