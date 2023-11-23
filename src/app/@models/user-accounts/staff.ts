import { CommonFields } from "../common-fields";

export class Staff extends CommonFields {
    firstName: string;
    lastName: string;
    fullName: string;
    otherNames: string;
    gender: string;
    dob: Date;
    email: string;
    mobileNo: string;
    address: string;

    regionId: string;
    regionName: string;

    departmentId: string;
    departmentName: string;

    officeContactNo: string;
    status: string;

    lastLoginDate: string;

    userRole: string;
    username: string;
    password: string;
    accountCreatedBy: string;
    accountCreatedDate: string;

}
