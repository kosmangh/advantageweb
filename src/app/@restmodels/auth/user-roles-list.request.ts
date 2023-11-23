import { HeaderRequest } from '../header.request';

export class UserRoleListRequest {
    headerRequest: HeaderRequest;
    roleLevel: string;
    portal: string;
}
