import { Department } from "src/app/@models/user-accounts/department";
import { HeaderRequest } from "../header.request";

export class LoginAccountRequest {
    headerRequest: HeaderRequest;
    recordId: string;
    password: string;
    userRole: string;
    status: string;
    createdBy: string;

}
