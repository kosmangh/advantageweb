import { EstateBlock } from "src/app/@models/settings/estate-block";
import { HeaderRequest } from "../header.request";

export class EstateBlockRequest extends EstateBlock {
    headerRequest: HeaderRequest;

}
