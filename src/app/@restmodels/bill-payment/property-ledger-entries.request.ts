import { HeaderRequest } from "../header.request";

export class PropertyLedgerEntriesRequest {
     headerRequest: HeaderRequest;
     propertyId: string;
     occupantId: string;
     searchBy: string;
     searchValue: string;
     startDate: Date;
     endDate: Date;
}