export class HeaderRequest {
    requestId!: string;
    zone!: string;
    requestToken!: string;
    sourceCode!: string;
    sourceChannelId!: string;
    requestType!: string;
    ipAddress!: string;
    region!: string;

    toString(): string {
        return '' +
            this.zone
            + this.ipAddress
            + this.requestId
            + this.requestToken
            + this.requestType
            + this.sourceChannelId
            + this.sourceCode;
    }

}