import { PropertyLedger } from "src/app/@models/estate-billing/property-ledger";
import { HeaderResponse } from "../header.response";

export class GroundRentalBillListResponse {
    headerResponse: HeaderResponse;
    propertyLedgers: PropertyLedger[];
}
