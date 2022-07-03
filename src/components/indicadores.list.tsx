import React from "react";
import { IndicadoresItem } from "./indicadores.item";

export class IndicadoresList extends React.PureComponent {
    render(): React.ReactNode {
        const { indicadores, navigator } = this.props as any;
        return (
            <>
                {indicadores.map((i: any, index: number) => <IndicadoresItem key={index} indicador={i} navigator={navigator} />)}
            </>
        );
    }
}