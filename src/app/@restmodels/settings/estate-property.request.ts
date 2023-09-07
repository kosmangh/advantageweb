import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { HeaderRequest } from '../header.request';
export class EstatePropertyRequest extends EstateProperty {
    headerRequest: HeaderRequest;

}
