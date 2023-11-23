import { HeaderRequest } from './header.request';
export class GeneralSearchRequest {
    headerRequest!: HeaderRequest;
    searchBy: string;
    searchValue: string;
    occupiedProps: boolean = false;
    occupationType: string;
}
