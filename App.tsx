import { IconComponentProvider } from '@react-native-material/core';
import React from 'react';
import { Routes } from './src/routes/routes';
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome5";
import { faChevronRight, faChevronLeft, faDollar, faEuro, faCoins, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faChevronRight, faChevronLeft, faDollar, faEuro, faCoins, faChartLine);


const App = () => {

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <Routes></Routes>
    </IconComponentProvider>
  );
};

export default App;
