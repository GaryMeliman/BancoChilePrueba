import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { IndicadoresView } from "../views/indicadores/indicadores";
import React from "react";
import { Headers } from "../components/headers";
import { IndicadorView } from "../views/indicador/indicador";
import { Details } from "../views/details/details";

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ header: () => <Headers title="Indicadores"></Headers> }} name="Indicadores" component={IndicadoresView} />
        <Stack.Screen options={{ header: (props) => <Headers {...props} hasBackDrop={true} title="Indicador" ></Headers> }} name="Indicador" component={IndicadorView} />
        <Stack.Screen options={{ header: (props) => <Headers {...props} hasBackDrop={true} title="Indicador" ></Headers> }} name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
