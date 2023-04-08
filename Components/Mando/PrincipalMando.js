import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react'
import UtilsStore from '../Utils/UtilsStore';

const PrincipalMando = (props) => {
  const { navigation } = props;
  const [session,setSession] = useState({})
  const irConfiguraciones = () => {
    console.log("hola")
    navigation.navigate('Config');
  }
  const irMandoPelea = ()=>{
    navigation.navigate('MandoP');
  }
  const irAMandos = ()=>{
    navigation.navigate('MandoPDos');
  }
  const onPress = () => {
    alert("hola mundo");
  }
  const irRegistroCompetidor = ()=> {
    navigation.navigate('RegComp');
  }
  async function getinformacion(){
    var datos = await UtilsStore.getElemento('info');
    console.log(datos);
    setSession(JSON.parse(datos));
  }
  useEffect(()=>{
    getinformacion()
  },[])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={irRegistroCompetidor}>
        <Icon name="users" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Registrar Competidor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irConfiguraciones}>
        <Icon name="cog" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Configurar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irMandoPelea} disabled={session.albitro!=='A'?true:false}>
        <Icon name="user" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Mando Pelea</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={session.albitro!=='A'?true:false}>
        <Icon name="chart-pie" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Mando Poomse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irAMandos} disabled={session.albitro!=='A'?true:false}>
        <Icon name="user" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Mando Pelea Dos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PrincipalMando

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFB2B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    color: 'black',
    fontSize: 18
  },
  text: {
    color: 'white',
    width: '80%',
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5882FA',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 18,
    width: '80%',
    flexDirection: 'row',
  },
  buttonImageIconStyle: {
    textAlign: 'center',
    resizeMode: 'stretch',
  },
})