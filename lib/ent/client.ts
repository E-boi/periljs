
import WebSocket from "ws";
import { EventEmitter } from "events";
import { WS_URI } from "../constants"
import { ClientOptions } from "./intf/clientoptions"
class Client extends EventEmitter {
    private token: string;
    private applicationId: string;
    private initializedOptions: ClientOptions;
    private ws: WebSocket;
    constructor(clientOptions: ClientOptions) {
        super();
        this.token = clientOptions.clientAuthentication.token;
        this.applicationId = clientOptions.clientAuthentication.applicationId;
        this.initializedOptions = clientOptions;
        this.ws = new WebSocket(clientOptions.discordWebsocket || WS_URI);
    }
    private isAsync(fn: Function): boolean {
        return (typeof fn).toLowerCase() === "function";
    }
}