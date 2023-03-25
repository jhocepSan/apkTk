import { Button, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Components/LoginUser/Login';
import PrincipalMando from './Components/Mando/PrincipalMando';
import VistaConfig from './Components/Mando/VistaConfig';
import MandoPelea from './Components/Mando/MandoPelea';
import MandoPeleaDoble from './Components/Mando/MandoPeleaDoble';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Login}
          options={{ title: 'Iniciar sessión', headerStyle: { backgroundColor: '#2E64FE' } }} />
        <Stack.Screen name='Mando' component={PrincipalMando}
          options={{
            title: 'Bienvenido', headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, 
             headerRight: () => (
              <Button
                onPress={() => Alert.alert(
                  'Mando Puntuación',
                  'Desarrollador Juan Jose Sanchez',
                  [
                    {
                      text: 'ACEPTAR'
                    }
                  ]
                )}
                title="Info"
                color="#B8CFF9"
              />
            )
          }} />
        <Stack.Screen name='Config' component={VistaConfig} 
          options={{ title: 'Configuración',
            headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }, 
          }}/>
        <Stack.Screen name='MandoP' component={MandoPelea} options={{headerShown:false}}/>
        <Stack.Screen name='MandoPDos' component={MandoPeleaDoble} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
