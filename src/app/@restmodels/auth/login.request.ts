import { HeaderRequest } from "../header.request";

export class LoginRequest {
    headerRequest!: HeaderRequest;
    username!: string;
    password!: string;
}
