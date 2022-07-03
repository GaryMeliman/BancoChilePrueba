import { useNavigation } from "@react-navigation/native"
import React from "react"
import { IndicadoresList } from "../../components/indicadores.list"
import { indicadores } from "../../utils/data"
export const IndicadoresView = () => {
    const navigator = useNavigation();

    return (
        <IndicadoresList indicadores={indicadores} navigator={navigator} />
    )
}