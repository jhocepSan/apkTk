import { Button, Alert,TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Components/LoginUser/Login';
import PrincipalMando from './Components/Mando/PrincipalMando';
import VistaConfig from './Components/Mando/VistaConfig';
import MandoPelea from './Components/Mando/MandoPelea';
import MandoPeleaDoble from './Components/Mando/MandoPeleaDoble';
import PrinciparRegistro from './Components/RegistroCompetidor/PrinciparRegistro';
import AddEditCompetidor from './Components/RegistroCompetidor/AddEditCompetidor';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
        <Stack.Screen name='RegComp' component={PrinciparRegistro} options={({navigation})=>({
          title: 'Registrar Competidor',
          headerStyle: { backgroundColor: '#2E64FE' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>navigation.navigate('AddEditC')}
            >
              <Icon name="user-plus" size={25} style={{paddingRight:5,color:'#BCF5A9'}} color="white" />
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name='AddEditC' component={AddEditCompetidor} options={{
          title: 'Datos Competidor',
          headerStyle: { backgroundColor: '#2E64FE' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
