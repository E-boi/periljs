import { ISuccess } from "../../intf/ISuccess";

export class ExpectMessageSuccess implements ISuccess
{
    get code(): number {
        return this._code;
    }
    get value(): any {
        return this._value;
    }
    _code: number;
    _value: any;
    constructor(value=null, code=0){
        this._code = code;
        this._value = value
    }
}