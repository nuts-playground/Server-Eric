import { Exclude, Expose } from 'class-transformer';
import { DateUtil } from '../utils/date.util';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from '../enum/response-status';

export class ResponseDto<T> {
    @Exclude() private readonly _status: string;
    @Exclude() private readonly _message: string;
    @Exclude() private readonly _serverDatetime: string;
    @Exclude() private readonly _data: T;

    constructor(status: ResponseStatus, message: string, serverDateTime: string, data: T) {
        this._status = status;
        this._message = message;
        this._serverDatetime = serverDateTime;
        this._data = data;
    }

    static success(): ResponseDto<string> {
        return new ResponseDto<string>('success', '', DateUtil.now(), '');
    }

    static successData<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>('success', '', DateUtil.now(), data);
    }

    static error(message: string): ResponseDto<string> {
        return new ResponseDto<string>('error', message, DateUtil.now(), '');
    }

    static errorData<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>('error', '', DateUtil.now(), data);
    }

    static badParam<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>('bad_param', '', DateUtil.now(), data);
    }

    static exception<T>(message: string, data: T): ResponseDto<T> {
        return new ResponseDto<T>('exception', message, DateUtil.now(), data);
    }

    @ApiProperty()
    @Expose()
    get status(): string {
        return this._status;
    }

    @ApiProperty()
    @Expose()
    get message(): string {
        return this._message;
    }

    @ApiProperty()
    @Expose()
    get serverDateTime(): string {
        return this._serverDatetime;
    }

    @ApiProperty()
    @Expose()
    get data(): T {
        return this._data;
    }
}
