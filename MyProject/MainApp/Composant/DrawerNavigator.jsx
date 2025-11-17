import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Catalogue from '../Screen/Catalogue';
import Menu from '../Screen/Menu';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ panier, setPanier }) {
  return (
    <Drawer.Navigator initialRouteName="Catalogue" screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Catalogue" options={{ drawerItemStyle: { display: 'none' } }}>
        {(props) => <Catalogue {...props} panier={panier} setPanier={setPanier} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Accueil"
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      >
        {(props) => <Menu {...props} panier={panier} setPanier={setPanier} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
