import { ClassLikeDeclaration, Type } from "typescript";

export interface IMessageCommandData {
    command?: string;
    description?: string;
    args?: IMessageCommandArgument[];
}
export interface IMessageCommandArgument {
    name: string;
    description?: string;
    type?: any;
}