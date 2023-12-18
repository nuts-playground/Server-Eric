import { ResponseStatus } from '../enum/response-status';
import { Exclude, Expose } from 'class-transformer';
import { DateTimeUtil } from '../utils/date.util';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    @Exclude() private readonly _status: string;
    @Exclude() private readonly _message: string;
    @Exclude() private readonly _serverDatetime: string;
    @Exclude() private readonly _data: T;

    constructor(status: ResponseStatus, message: string, serverDateTime: string, data: T) {
        this._status = ResponseStatus[status];
        this._message = message;
        this._serverDatetime = serverDateTime;
        this._data = data;
    }

    static success(): ResponseDto<string> {
        return new ResponseDto<string>(ResponseStatus.SUCCESS, '', DateTimeUtil.now(), '');
    }

    static successData<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>(ResponseStatus.SUCCESS, '', DateTimeUtil.now(), data);
    }

    static error(message: string): ResponseDto<string> {
        return new ResponseDto<string>(ResponseStatus.ERROR, message, DateTimeUtil.now(), '');
    }

    static errorData<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>(ResponseStatus.ERROR, '', DateTimeUtil.now(), data);
    }

    static badParam<T>(data: T): ResponseDto<T> {
        return new ResponseDto<T>(ResponseStatus.BAD_PARAM, '', DateTimeUtil.now(), data);
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
    //
    // static error(): ResponseDto<string> {}
    //
    // static errorData<T>(): ResponseDto<T> {}
    //
    // get status(): string {}
    //
    // get message(): string {}
    //
    // get data(): T {}
}
