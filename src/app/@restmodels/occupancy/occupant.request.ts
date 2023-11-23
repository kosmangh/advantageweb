import { Occupant } from "src/app/@models/occupancy/occupant";
import { HeaderRequest } from "../header.request";

export class OccupantRequest extends Occupant {
    headerRequest: HeaderRequest;

}
