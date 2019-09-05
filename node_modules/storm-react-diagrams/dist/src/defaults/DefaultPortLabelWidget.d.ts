/// <reference types="react" />
import * as React from "react";
import { DefaultPortModel } from "./DefaultPortModel";
export interface DefaultPortLabelProps {
    model?: DefaultPortModel;
    in?: boolean;
    label?: string;
}
export interface DefaultPortLabelState {
}
/**
 * @author Dylan Vorster
 */
export declare class DefaultPortLabel extends React.Component<DefaultPortLabelProps, DefaultPortLabelState> {
    static defaultProps: DefaultPortLabelProps;
    render(): JSX.Element;
}
