import { Bills } from "src/app/@models/bill-payment/bills";
import { HeaderResponse } from "../header.response";

export class BillsResponse {
  headerResponse: HeaderResponse;
  listOfBills: Bills[];
  constructor() { }

}
