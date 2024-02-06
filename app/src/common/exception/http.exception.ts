import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseDto } from '../dto/response.dto';
import { instanceToPlain } from 'class-transformer';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const request = ctx.getRequest<Request>();
        const message = exception.message;
        const exceptionBody = {
            statusCode: status,
            path: request.url,
            requestBody: request.body,
        };
        const responseBody = ResponseDto.exception(message, exceptionBody);
        const plainResponse = instanceToPlain(responseBody, {
            excludeExtraneousValues: true,
        });
        response.status(status).json(plainResponse);
    }
}
