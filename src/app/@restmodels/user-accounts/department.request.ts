import { Department } from "src/app/@models/user-accounts/department";
import { HeaderRequest } from "../header.request";

export class DepartmentRequest extends Department{
    headerRequest: HeaderRequest;
}
