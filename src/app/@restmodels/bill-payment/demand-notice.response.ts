import { DemandNotice } from "src/app/@models/bill-payment/demand-notice";
import { HeaderResponse } from "../header.response";

export class DemandNoticeResponse {
  headerResponse: HeaderResponse;
  demandNotices: DemandNotice[];
  totalCurrentCharge: number;
  totalArrears: number;
  totalAmountDue: number;
  constructor() { }

}
