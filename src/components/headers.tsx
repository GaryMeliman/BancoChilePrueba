import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppBar, IconButton } from "@react-native-material/core";
import React from "react";

export const Headers = ({ title, hasBackDrop, navigation }: any) => {
    return (
        <AppBar
            title={title} titleStyle={{ textAlign: "center", marginRight: hasBackDrop ? 50 : 0 }}
            leading={props => hasBackDrop ? (
                <IconButton
                    onPress={() => navigation?.navigate("Indicadores")}
                    icon={props => <FontAwesomeIcon color="white" icon="chevron-left" />} {...props} />
            ) : null}>
        </AppBar>
    )
}