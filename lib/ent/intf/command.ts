import { CommandProps, InternalCommandProps } from "./commandProps";

export interface Command {
    /**
     * 
     */
    props: CommandProps;
    execute(): boolean | void;
    internalProps: InternalCommandProps;
}