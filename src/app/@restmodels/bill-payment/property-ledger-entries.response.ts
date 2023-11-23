import { PropertyLedger } from "src/app/@models/estate-billing/property-ledger";
import { HeaderResponse } from "../header.response";

export class PropertyLedgerEntriesResponse {
     headerResponse: HeaderResponse;
     propertyLedgers: PropertyLedger[];
     totalCredit: number;
     totalDebit: number;
     currentBalance: number;
}