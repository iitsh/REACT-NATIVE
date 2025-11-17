import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from '../Screen/Menu';
import Connexion from '../Screen/Connexion';
import Inscription from '../Screen/Inscirption';
import DrawerNavigator from './DrawerNavigator';
import Panier from '../Screen/Panier';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [panier, setPanier] = useState([]);

  return (
    <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu">
        {(props) => <Menu {...props} panier={panier} setPanier={setPanier} />}
      </Stack.Screen>
      <Stack.Screen name="Catalogue">
        {(props) => <DrawerNavigator {...props} panier={panier} setPanier={setPanier} />}
      </Stack.Screen>
      <Stack.Screen name="Panier">
        {(props) => <Panier {...props} panier={panier} setPanier={setPanier} />}
      </Stack.Screen>
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Inscription" component={Inscription} />
    </Stack.Navigator>
  );
}
