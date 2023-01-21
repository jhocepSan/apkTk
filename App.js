import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/LoginUser/Login';
import PrincipalMando from './Components/Mando/PrincipalMando';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Login} />
        <Stack.Screen name='Mando' component={PrincipalMando}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
