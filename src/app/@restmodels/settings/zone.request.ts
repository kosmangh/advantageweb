import { Zone } from "src/app/@models/settings/zone";
import { HeaderRequest } from "../header.request";

export class ZoneRequest extends Zone{
    headerRequest:HeaderRequest;
}
