import { Region } from "src/app/@models/settings/region";
import { HeaderRequest } from "../header.request";

export class RegionRequest extends Region {
    headerRequest: HeaderRequest;

}
