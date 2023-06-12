import { Button, Alert, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Components/LoginUser/Login';
import PrincipalMando from './Components/Mando/PrincipalMando';
import VistaConfig from './Components/Mando/VistaConfig';
import MandoPelea from './Components/Mando/MandoPelea';
import MandoPeleaDoble from './Components/Mando/MandoPeleaDoble';
import PrinciparRegistro from './Components/RegistroCompetidor/PrinciparRegistro';
import AddEditCompetidor from './Components/RegistroCompetidor/AddEditCompetidor';
import { createContext, useState } from 'react';
import VentanaAccuracy from './Components/MandoPoomse/VentanaAccuracy';
import VentanaPresentation from './Components/MandoPoomse/VentanaPresentation';
import TotalResultado from './Components/MandoPoomse/TotalResultado';

const Stack = createStackNavigator();
export const ContextGlobal = createContext();
export default function App() {
  const [initSession,setInitSession] = useState(false);
  const [puntoPoomse,setPuntoPoomse] = useState({});
  const [resetPoomse,setResetPoomse] = useState(false);
  const [config,setConfig]=useState({});
  return (
    <ContextGlobal.Provider value={{
      initSession,setInitSession,puntoPoomse,setPuntoPoomse,resetPoomse,setResetPoomse,config,setConfig
    }}>
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
            options={{
              title: 'Configuración',
              headerStyle: { backgroundColor: '#2E64FE' },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }} />
          <Stack.Screen name='MandoP' component={MandoPelea} options={{ headerShown: false }} />
          <Stack.Screen name='MandoPDos' component={MandoPeleaDoble} options={{ headerShown: false }} />
          <Stack.Screen name='AddEditC' component={AddEditCompetidor} options={{
            title: 'Datos Competidor',
            headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name='MandoPoomse' component={VentanaAccuracy} options={{
            title: 'Accaracy',
            headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
          <Stack.Screen name='MandoPoomseDos' component={VentanaPresentation} options={{
            title: 'Presentation',
            headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
          <Stack.Screen name='resultadoPoomse' component={TotalResultado} options={{
            title: 'Total Puntuación',
            headerStyle: { backgroundColor: '#2E64FE' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ContextGlobal.Provider>
  );
}
