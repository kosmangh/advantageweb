import { Staff } from 'src/app/@models/user-accounts/staff';
import { HeaderResponse } from './../header.response';
export class StaffListResponse {
    headerResponse: HeaderResponse;
    staffs: Staff[];
}
