import { HeaderRequest } from "../header.request";

export class OccupantPropertyListRequest {
    headerRequest: HeaderRequest;
    searchBy: string;
    searchParameter: string;
    searchValue: string;
    block: string;
}
