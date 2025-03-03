import {
    Injectable,
    Catch,
    Inject,
    ExceptionFilter,
    ArgumentsHost,
    HttpException
} from "@nestjs/common";
import { TypeORMError  } from "typeorm";
import { ServiceException } from "../errors/service-exception";
import { Request, Response } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { LoggerService } from "@nestjs/common";
import { TypeHelperService } from "../../shared/type-helper.service";
import { RequestFailedDto } from "../dto/request-failed.dto";

@Injectable()
@Catch()
export class ResponseExceptionLoggingFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: LoggerService,
        private readonly typeHelper: TypeHelperService
    ) {}

    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response: Response = context.getResponse();
        const request: Request = context.getRequest();

        const result = this.handleException(exception);
        const dto = result.dto;
        const message = result.message;

        this.logger.error(`${request.method} ${request.url} ${ dto.statusCode }: ${ message }`, "ResponseExceptionLoggingFilter");
        response.status(dto.statusCode).json(dto);
    }

    private handleException(exception: any) {
        const dto = new RequestFailedDto();
        let error = "";

        dto.response = { message: "Error processing request" };

        if(exception instanceof HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse();

            dto.statusCode = status;

            if(this.typeHelper.isString(response)) {
                error = response;
            } else {
                dto.response = response;
                error = exception.message;
            }
        } else if(exception instanceof ServiceException) {
            const status = exception.status;
            const message = exception.message;

            dto.statusCode = status;
            error = message;
        } else if(exception instanceof TypeORMError) {
            let status = 500;
            const message = exception.message;

            if(message.includes("ER_DUP_ENTRY")) {
                status = 400;
            }

            dto.statusCode = status;
            error = message;
        } else {
            const message = exception.message;

            dto.statusCode = 500;
            error = message;
        }

        return { dto: dto, message: error };
    }
}

