import { ListItem, Text } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Indicadores } from "../../services/axios";

export const Details = ({ route: { params: { currency } } }: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<boolean | string>(false);
    const [items, setItems] = useState<{ Valor: string, Fecha: string }[]>();

    useEffect(() => {
        getIndicador();
    }, []);

    const getIndicador = async () => {
        let period = '';
        const date = new Date();
        if (currency === "dolar" || currency === "euro" || currency === "uf") {
            date.setDate(date.getDate() - 30);
            period = `posteriores/${date.getFullYear()}/${date.getUTCMonth() + 1}/dias/${date.getUTCDate()}`;
        } else {
            period = `${date.getFullYear()}`;
            console.log(period);
        }
        try {
            const resp = await Indicadores.getIndicador(currency, period);
            setItems(Object.values(resp)[0]);
        } catch (error: any) {
            setLoading(false);
            setApiError(error.code)
        }
    }

    useEffect(() => {
        if (items) {
            setLoading(false);
            setApiError(false);
        }
    }, [items]);
    return (
        <ScrollView>
            {items?.reverse().map((i, index) => <ListItem key={index} title={'$' + i.Valor} secondaryText={i.Fecha} />)}
        </ScrollView>
    )
}