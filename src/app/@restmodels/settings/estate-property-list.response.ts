import { EstateProperty } from "src/app/@models/settings/estate-property";
import { HeaderResponse } from "../header.response";

export class EstatePropertyListResponse {
    headerResponse: HeaderResponse;
    properties: EstateProperty[];
}
