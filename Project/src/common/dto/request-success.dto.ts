export class RequestSuccessDto {
    message: string = "";

    constructor(message: string = "Request Success") {
        this.message = message;
    }
}