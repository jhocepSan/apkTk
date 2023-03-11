import { StyleSheet, View, TouchableOpacity, Image,Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonMove from './ButtonMove';
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
  ImageIconStyle: {
    width: '90%',
    height: '25%',
    transform: [{ rotate: '90deg' }],
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


const MandoPelea = () => {
  const [info, setInfo] = useState({});
  const [servidor, setServidor] = useState('');
  const getInformacion = async () => {
    var datos = await UtilsStore.getElemento('info');
    var srv = await UtilsStore.getElemento('servidor');
    setServidor(srv);
    setInfo(JSON.parse(datos));
    console.log(datos);
  }
  const enviarDato = async (dato) => {
    var datos = await UtilsStore.getElemento('info');
    var srv = await UtilsStore.getElemento('servidor');
    fetch(`http://${srv}:4000/mandojuec/enviarDatos`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "info":datos, dato
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
  const obtenerDato=async(dato)=>{
    console.log('dato info giro',dato,servidor);
    await enviarDato(dato);
  }
  useEffect(() => {
    getInformacion();
  }, [])
  return (
    <View style={styles.app}>
      <Row>
        <Col numRows={3}>
          <TouchableOpacity onPress={() => enviarDato('c')}>
            <ButtonMove positionInitialX={0} positionInitialY={0} tipo={'C'} img={false} handleButton={async()=>await obtenerDato('C')}/>
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
          <TouchableOpacity onPress={() => enviarDato('d')}>
            <ButtonMove positionInitialX={0} positionInitialY={0} tipo={'D'} img={true} handleButton={async()=>await obtenerDato('D')}/>
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <ColRed numRows={3}>
          <TouchableOpacity onPress={() => enviarDato('a')}>
            <ButtonMove positionInitialX={0} positionInitialY={0} tipo={'A'} img={false} handleButton={async()=>await obtenerDato('A')}/>
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
          <TouchableOpacity onPress={() => enviarDato('b')}>
            <ButtonMove positionInitialX={0} positionInitialY={0} tipo={'B'} img={true} handleButton={async()=>await obtenerDato('B')}/>
          </TouchableOpacity>
        </ColRed>
      </Row>
    </View>
  )
}

export default MandoPelea

