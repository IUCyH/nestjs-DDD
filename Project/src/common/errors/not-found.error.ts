import { ServiceException } from "./service-exception";

export class NotFound extends ServiceException {
    constructor(message: string = "Data Not Found") {
        super(404, message);
    }
}