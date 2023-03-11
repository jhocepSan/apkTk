import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'

const PrincipalMando = (props) => {
  const { navigation } = props;
  const irConfiguraciones = () => {
    console.log("hola")
    navigation.navigate('Config');
  }
  const irMandoPelea = ()=>{
    navigation.navigate('MandoP');
  }
  const onPress = () => {
    alert("hola mundo");
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={irConfiguraciones}>
        <Icon name="cog" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Configurar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irMandoPelea}>
        <Icon name="user" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Mando Pelea</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="chart-pie" size={25} style={styles.buttonImageIconStyle} color="white" />
        <Text style={styles.text}>Mando Poomse</Text>
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