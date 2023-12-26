import { PropertyLedger } from "src/app/@models/bill-payment/property-ledger";
import { HeaderResponse } from "./header.response";
import { Dropdown } from "../@models/dropdown";

export class DropdownListResponse {
    headerResponse: HeaderResponse;
    dropdownList: Dropdown[];
}
