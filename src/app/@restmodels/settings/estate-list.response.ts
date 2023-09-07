import { HeaderRequest } from "../header.request";
import { Estate } from "src/app/@models/settings/estate";
import { HeaderResponse } from "../header.response";

export class EstateListResponse {
    headerResponse: HeaderResponse;
    estates: Estate[];
}
