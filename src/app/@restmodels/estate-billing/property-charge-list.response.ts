import { PropertyCharge } from "src/app/@models/estate-billing/property-charge";
import { HeaderResponse } from "../header.response";

export class PropertyChargeListResponse {
    headerResponse: HeaderResponse;
    propertyCharges: PropertyCharge[];
}
