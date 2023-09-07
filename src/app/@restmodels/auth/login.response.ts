import { HeaderResponse } from "../header.response";

export class LoginResponse {
    headerResponse!: HeaderResponse;
    fullName!: string;
    emailAddress!: string;
    status?: string;
    userRole?: string;
    username!: string;
    lastLoginDate!: string;
    departmentName!: string;
    regionName!: string;
    regionId!: string;
    passwordReset!: string;
    zoneName!: string;
    zoneId!: string;
    zoneContact!: string;
    zoneAddress!: string


    logo!: string;
    branchCode?: string;
    branchName?: string;
    language?: string;
    userRoleName!: string;
    userType!: string;
}
