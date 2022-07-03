import axios, { AxiosResponse } from "axios";

const apikey = "02d0bf2b11ad95fdb9f77b9e3213841d1d32e8a6";
const formato = "json";

type indicadorKeys = "Dolares" | "Euros" | "IPCs" | "UFs" | "UTMs";

export type Indicador = {
    [key in indicadorKeys]: {
        Valor: string,
        Fecha: string,
    }[];
};

const instance = axios.create({
    baseURL: 'https://api.sbif.cl/api-sbifv3/recursos_api/',
});

const responseBody = (response: AxiosResponse) => response.data;

// TODO: crear interfaces para errores

const indicadorRequests = {
    get: (type: string, period: string) => instance.get<Indicador>(`${type}/${period}?apikey=${apikey}&formato=${formato}`).then(responseBody),
};

export const Indicadores = {
    getIndicador: (type: string, period: string): Promise<Indicador> => indicadorRequests.get(type, period),
}