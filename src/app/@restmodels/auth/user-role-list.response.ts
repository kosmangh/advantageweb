import { UserRole } from './../../@models/userRole';
import { HeaderResponse } from "../header.response";

export class UserRoleListResponse {
    headerResponse: HeaderResponse;
    userRoles: UserRole[];
}
