import { HeaderRequest } from './../header.request';
import { Estate } from "src/app/@models/settings/estate";

export class EstateRequest extends Estate {
    headerRequest: HeaderRequest
}
