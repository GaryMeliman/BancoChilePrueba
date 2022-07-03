import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icon, ListItem } from "@react-native-material/core";
import React from "react";
import { TouchableOpacity, TouchableOpacityBase, TouchableOpacityComponent, View } from "react-native";

export class IndicadoresItem extends React.Component {


    render(): React.ReactNode {
        const { name, currency, icon } = (this.props as any).indicador;
        const { navigator } = this.props as any;
        console.log(name, currency, icon);

        return (
            <ListItem
                onPress={() => navigator.navigate("Details", { name, currency, icon })}
                title={name}
                secondaryText="Pesos"
                leading={<FontAwesomeIcon icon={icon} size={20} style={{ marginTop: 3 }} />}
                trailing={<TouchableOpacity
                    onPress={() => navigator.navigate("Indicador", { name, currency, icon })}>
                    <FontAwesomeIcon icon="chart-line" />
                </TouchableOpacity>}
            />
        );
    }
}