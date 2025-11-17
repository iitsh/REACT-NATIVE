import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackNavigator from './MainApp/Composant/stacknavigator';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </SafeAreaView>

  )
}
