import { HeaderResponse } from '../header.response';
import { Department } from 'src/app/@models/user-accounts/department';
export class DepartmentListResponse {
    headerResponse: HeaderResponse;
    departments: Department[];
}
