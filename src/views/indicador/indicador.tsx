import { ActivityIndicator, Button, Divider, ListItem, Surface, Text } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Indicador, Indicadores } from "../../services/axios";

export const IndicadorView = ({ route: { params: { name, currency, icon } } }: any) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<boolean | string>(false);
    const [items, setItems] = useState<{ Valor: string, Fecha: string }[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        getIndicador();
    }, []);

    const getIndicador = async () => {
        let period = '';
        const date = new Date();
        if (currency === "dolar" || currency === "euro" || currency === "uf") {
            date.setDate(date.getDate() - 10);
            period = `posteriores/${date.getFullYear()}/${date.getUTCMonth() + 1}/dias/${date.getUTCDate()}`;
        } else {
            date.setMonth(date.getMonth() - 12);
            period = `posteriores/${date.getFullYear()}/${date.getUTCMonth() + 1}`;
        }        
        try {
            const resp = await Indicadores.getIndicador(currency, period);
            setItems(Object.values(resp)[0].slice(-10));
        } catch (error: any) {
            setLoading(false);
            setApiError(error.code)
        }
    }

    useEffect(() => {        
        if (items) {
            setLoading(false);
            setApiError(false);
            setLabels(items.map(i => i.Fecha));
            setData(items.map(i => Number(i.Valor.replace('.','').replace(',', '.'))));
        }
    }, [items]);

    return (
        <View style={{ padding: 15 }}>
            {(loading && !apiError) && <ActivityIndicator size="large" />}
            {(!loading && !apiError) && (
                <>
                    <Surface
                        elevation={6}
                        category="large"
                    >
                        {
                            items !== undefined && (
                                <View style={{ paddingVertical: 17 }}>
                                    <Text variant="h4" color="blue" style={{ textAlign: "center" }}>${items[items.length - 1].Valor}</Text>
                                    <View style={{ justifyContent: "space-between", flexDirection: "row", padding: 5, paddingHorizontal: 20, marginTop: 10 }}>
                                        <Text variant="subtitle1">Nombre</Text>
                                        <Text variant="subtitle1" color="black" style={{ fontWeight: "bold" }}>{name}</Text>
                                    </View>
                                    <Divider style={{ marginVertical: 10 }} />
                                    <View style={{ justifyContent: "space-between", flexDirection: "row", padding: 5, paddingHorizontal: 20 }}>
                                        <Text variant="subtitle1">Fecha</Text>
                                        <Text variant="subtitle1" color="black" style={{ fontWeight: "bold" }}>{items[items.length - 1].Fecha}</Text>
                                    </View>
                                    <Divider style={{ marginVertical: 10 }} />
                                    <View style={{ justifyContent: "space-between", flexDirection: "row", padding: 5, paddingHorizontal: 20 }}>
                                        <Text variant="subtitle1">Unidad de medida</Text>
                                        <Text variant="subtitle1" color="black" style={{ fontWeight: "bold" }}>Pesos</Text>
                                    </View>
                                </View>)
                        }
                    </Surface>
                    <LineChart
                        data={{
                            labels,
                            datasets: [
                                {
                                    data
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width - 30}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#673AB7",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 10
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#e26a00"
                            }
                        }}

                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </>
            )}
            {(!loading && apiError) && (
                <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ alignSelf: "center" }}>Error {apiError}</Text>
                    <Button onPress={() => {
                        setApiError(false);
                        setLoading(true);
                        getIndicador();
                    }} title="Inentar de nuevo"></Button>
                </View>
            )}
        </View>
    );
}