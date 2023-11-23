import { HeaderRequest } from './../header.request';
import { Staff } from "src/app/@models/user-accounts/staff";

export class StaffRequest extends Staff{
    headerRequest: HeaderRequest;

}