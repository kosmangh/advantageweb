import { CommonFields } from "../common-fields";

export class OccupantProperty extends CommonFields {

    estateId: string;
    blockId: string;
    propertyId: string;
    occupantId: string;
    firstDateOfOccupancy: Date;
    lastDateOfOccupancy: Date;
    occupationType: string;

    institutional: boolean=null;
    institutionalDisplayName: string;

    blockName: string;
    estateName: string;

    propertyName: string;
    propertySize: number;
    propertyNo: string;
    propertyUsage: string;
    propertyCategory: string;


    occupantName: string;
    institution: string;
    mobileNo: string;
    emailAddress: string;
    localAddress: string;
    duration: string;
    paymentType: string;
    validity: string;
    durationLeft: string;
    
}
