import { UserAccess } from "./userAccess";

export class User {

    company!:string;
    companyName!:string;
    logo!:string;
    branchCode!:string;
    branchName!:string;
    emailAddress!:string;
    fullName!:string;
    language!:string;
    lastLoginDate!:string;
    status!:string;
    userRole!:string;
    userRoleName!:string;
    username!:string;
    userType!:string;
    contactNo!:string;
    location!:string
    userAccess!: UserAccess;
    token: User;
    regionId:string;
    regionName: string;
    zoneId: string;
    zoneName: string;
}
