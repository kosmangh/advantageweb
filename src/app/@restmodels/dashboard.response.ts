import { EstateSummary } from "../@models/estate-summary";
import { HeaderResponse } from "./header.response";

export class DashboardResponse {
    headerResponse: HeaderResponse;
    totalEstateSize: number = 0;
    totalBlockSize: number = 0;
    totalPropertySize: number = 0;

    availableEstates: number = 0;
    availableProperties: number = 0;
    availableBlocks: number = 0;

    occupiedEstates: number = 0;
    occupiedBlocks: number = 0;
    occupiedProperties: number = 0;


    estateSummary: EstateSummary[];

}
