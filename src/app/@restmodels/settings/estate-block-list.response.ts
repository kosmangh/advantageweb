import { HeaderResponse } from "../header.response";
import { EstateBlock } from "src/app/@models/settings/estate-block";

export class EstateBlockListResponse {
    headerResponse: HeaderResponse;
    estateBlocks: EstateBlock[];
}
