import { HeaderRequest } from './header.request';
export class GeneralDeleteRequest {
    headerRequest!: HeaderRequest;
    recordId!: string;
    deletedBy!: string;
}
