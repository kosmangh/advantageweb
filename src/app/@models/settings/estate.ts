import { CommonFields } from "../common-fields";

export class Estate extends CommonFields {
    estateName: string;
    estateClass: string;
    landSize: number;
    landSizeLeft: number;
    totalBlocks: number;
    properties: number;
    estateLocation: string;
    leaseStartDate: Date;
    leaseEndDate: Date;
    additionalInfo: string;
    region: string;
    regionName: string;
    durationLeft: string;
    testDate: Date;
    freshDate: Date;

    constructor() {
        super();
        this.leaseStartDate = this.cleanDate(this.leaseStartDate);
        this.leaseEndDate = this.cleanDate(this.leaseEndDate);
    }


    private cleanDate(newDate: Date): Date {
        if (newDate) {
            let cleanedDate = newDate.toString().replace("[UTC]", "");
            return new Date(cleanedDate);
        }
        return null;
    }


}

