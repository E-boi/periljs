import { ISuccess } from '../intf/ISuccess';

/**
 * Success object
 * @date 8/8/2021 - 11:31:34 AM
 *
 * @export
 * @class Success
 * @typedef {Success}
 * @implements {ISuccess}
 */
export class Success implements ISuccess {
	_code: number;
	_value: any;
	get code(): number {
		return this._code;
	}
	get value(): any {
		return this._value;
	}
	constructor(code: number = 0, value: any = null) {
		this._code = code;
		this._value = value;
	}
}
