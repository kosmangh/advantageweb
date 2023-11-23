import { PropertyCharge } from 'src/app/@models/estate-billing/property-charge';
import { HeaderRequest } from '../header.request';
export class PropertyChargeRequest extends PropertyCharge{
    headerRequest: HeaderRequest
}
