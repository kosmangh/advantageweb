import { HeaderResponse } from './../header.response';
import { Zone } from "src/app/@models/settings/zone";

export class ZoneListResponse {
    headerResponse: HeaderResponse;
    zones: Zone[];

}
