import { Zone } from "src/app/@models/settings/zone";
import { HeaderRequest } from "../header.request";
import { Region } from "src/app/@models/settings/region";
import { HeaderResponse } from "../header.response";

export class RegionListResponse {
    headerResponse: HeaderResponse;
    regions: Region[];

}
