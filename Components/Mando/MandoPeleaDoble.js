import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import UtilsStore from '../Utils/UtilsStore';

const styles = StyleSheet.create({
  app: {
    marginTop: 25,
    flex: 3, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    backgroundColor: "red",
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: "row",
    height: '50%'
  },
  "3col": {
    backgroundColor: "#0080FF",
    borderColor: "#fff",
    borderWidth: 2,
    flex: 3,
    height: '100%',
    width: '100%',
  },
  "3colr": {
    backgroundColor: "#FE2E2E",
    borderColor: "#fff",
    borderWidth: 2,
    flex: 3,
    height: '100%',
    width: '100%',
  },
  botonPunio: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDoble: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#fff',
  },
  ImageIconStyle: {
    width: '90%',
    height: '25%',
    transform: [{ rotate: '90deg' }],
  },
  ImageIconStyleD:{
    width: '80%',
    height: '50%',
    transform: [{ rotate: '90deg' }],
  },
  ImageIconStyleDd:{
    width: '80%',
    height: '50%',
    transform: [{ rotate: '115deg' }],
  }
})

const Col = ({ numRows, children }) => {
  return (
    <View style={styles[`${numRows}col`]}>{children}</View>
  )
}
const ColRed = ({ numRows, children }) => {
  return (
    <View style={styles[`${numRows}colr`]}>{children}</View>
  )
}
const Row = ({ children }) => (
  <View style={styles.row}>{children}</View>
)
let servidorG=''

const MandoPeleaDoble = () => {
  const [info, setInfo] = useState({});
  const [servidor, setServidor] = useState('');
  const [sector,setSector] = useState('');
  const getInformacion = async () => {
    var datos = await UtilsStore.getElemento('info');
    var srv = await UtilsStore.getElemento('servidor');
    var sectorp = await UtilsStore.getElemento('sector'); 
    setServidor(srv);
    setInfo(JSON.parse(datos));
    setSector(sectorp);
    servidorG=srv;
    console.log(datos,srv,sectorp)
  }
  const enviarDato = async (dato) => {
    fetch(`http://${servidor}:4000/mandojuec/enviarDatos`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "info": info, dato,sector
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log(data.ok)
        } else {
          Alert.alert(
            'Envio Incorrecto',
            'Ocurrio un problema, Verificación de la Configuracion: ' + data.error,
            [
              {
                text: 'ACEPTAR'
              }
            ]
          )
        }
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Ocurrio: ' + error,
          [
            {
              text: 'ACEPTAR'
            }
          ]
        )
      })
  }
  const obtenerDato = async (dato) => {
    console.log('dato info giro', dato, servidor);
    await enviarDato(dato);
  }
  useEffect(() => {
    getInformacion();
  }, [])
  return (
    <View style={styles.app}>
      <Row>
        <Col numRows={3}>
          <TouchableOpacity style={styles.botonDoble} onPress={() => enviarDato('c')}>
            <Image
              source={require('../../assets/cuerpo.png')}
              style={styles.ImageIconStyleD}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonDoble} onPress={() => enviarDato('C')}>
            <Image
              source={require('../../assets/peto.png')}
              style={styles.ImageIconStyleDd}
            />
          </TouchableOpacity>
        </Col>
        <Col numRows={3}>
          <TouchableOpacity style={styles.botonPunio}
            onPress={() => enviarDato('P')}>
            <Image
              source={require('../../assets/punio.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </Col>
        <Col numRows={3}>
        <TouchableOpacity onPress={() => enviarDato('d')} style={styles.botonDoble}>
            <Image
              source={require('../../assets/cabeza.png')}
              style={styles.ImageIconStyleD}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => enviarDato('D')} style={styles.botonDoble}>
            <Image
              source={require('../../assets/head.png')}
              style={styles.ImageIconStyleDd}
            />
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <ColRed numRows={3}>
          <TouchableOpacity style={styles.botonDoble} onPress={() => enviarDato('A')}>
            <Image
              source={require('../../assets/peto.png')}
              style={styles.ImageIconStyleDd}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonDoble} onPress={() => enviarDato('a')}>
            <Image
              source={require('../../assets/cuerpo.png')}
              style={styles.ImageIconStyleD}
            />
          </TouchableOpacity>
        </ColRed>
        <ColRed numRows={3}>
          <TouchableOpacity style={styles.botonPunio}
            onPress={() => enviarDato('E')}>
            <Image
              source={require('../../assets/punio.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </ColRed>
        <ColRed numRows={3}>
          <TouchableOpacity onPress={() => enviarDato('B')} style={styles.botonDoble}>
            <Image
              source={require('../../assets/head.png')}
              style={styles.ImageIconStyleDd}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => enviarDato('b')} style={styles.botonDoble}>
            <Image
              source={require('../../assets/cabeza.png')}
              style={styles.ImageIconStyleD}
            />
          </TouchableOpacity>
        </ColRed>
      </Row>
    </View>
  )
}

export default MandoPeleaDoble

