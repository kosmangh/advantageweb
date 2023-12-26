import { PropertyLedger } from "src/app/@models/bill-payment/property-ledger";
import { HeaderResponse } from "../header.response";

export class GroundRentalBillListResponse {
    headerResponse: HeaderResponse;
    propertyLedgers: PropertyLedger[];
}
