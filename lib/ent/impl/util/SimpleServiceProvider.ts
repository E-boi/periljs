import { ISimpleServiceProvider } from "../../intf/util/ISimpleServiceProvider";

/**
 * Implementation of C#'s `Microsoft.Extensions.DependencyInjection.ServiceProvider` on a need-to-do basis
 * @date 8/8/2021 - 7:57:14 PM
 *
 * @export
 * @class SimpleServiceProvider
 * @typedef {SimpleServiceProvider}
 * @implements {ISimpleServiceProvider}
 */
export class SimpleServiceProvider implements ISimpleServiceProvider {
    private _singletons: {[key: string]: any}={} ;
    // private _transients: any[] = [];

    addSingleton<T>(service: T, id: string): ISimpleServiceProvider {
        if (this._singletons[id]) {
            throw new Error("Service already registered.");
        }
        this._singletons[id] = service;
        return this;
    }
    get<T>(id: string): T {
        if (this._singletons[id]) {
            return this._singletons[id];
        }
        throw new Error("Service not registered. ( Transients are currently not supported or processed. )");
    }
    addTransient<T>(service: T, id: string): ISimpleServiceProvider {
        throw new Error("Method not implemented.");
    }
    
}