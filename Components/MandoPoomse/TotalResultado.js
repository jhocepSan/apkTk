import { StyleSheet, Text, View, TouchableOpacity,Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../App';
import UtilsStore from '../Utils/UtilsStore';

const TotalResultado = (props) => {
    const { navigation } = props;
    const { puntoPoomse, setPuntoPoomse,resetPoomse,setResetPoomse } = useContext(ContextGlobal);
    const [totalRes, setTotalRes] = useState(0);
    const [info, setInfo] = useState({});
    const [servidor, setServidor] = useState('');
    const [sector, setSector] = useState('');
    const getInformacion = async () => {
        var datos = await UtilsStore.getElemento('info');
        var srv = await UtilsStore.getElemento('servidor');
        var sectorp = await UtilsStore.getElemento('sector');
        setServidor(srv);
        setInfo(JSON.parse(datos));
        setSector(sectorp);
        console.log(datos, srv, sectorp)
    }
    function GuardarPuntage() {
        if (servidor != '') {
            fetch(`http://${servidor}/mandojuec/sendDatosPoomse`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": info.id,...puntoPoomse, sector, "albitro": info.albitro
                }),
            }).then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        setResetPoomse(true);
                        setTotalRes(0);
                        navigation.navigate('MandoPoomse');
                        
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
        }else{
            getInformacion()
            Alert.alert(
                'Error',
                'Intenta Nuevamente por favor' ,
                [
                    {
                        text: 'ACEPTAR'
                    }
                ]
            )
        }
    }
    useEffect(() => {
        var valor = parseFloat(puntoPoomse.ACCURACY) + parseFloat(puntoPoomse.PRESENTATION);
        setTotalRes(valor.toFixed(2))
        getInformacion()
    }, [])
    return (
        <View style={styles.contenedor}>
            <TouchableOpacity style={styles.button} onPress={() => GuardarPuntage()}>
                <Text style={styles.text}>Terminal Calificación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.puntaje}>
                <Text style={styles.textp} >{totalRes.toString()}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Puntuacion Final</Text>
            <View style={styles.row}>
                <View style={styles[`2col`]}>
                    <TouchableOpacity style={styles.puntaje}>
                        {puntoPoomse.ACCURACY!=undefined&&<Text style={styles.textpp} >{puntoPoomse.ACCURACY.toString()}</Text>}
                    </TouchableOpacity>
                    <Text style={styles.textt}>ACCURACY</Text>
                </View>
                <View style={styles[`2col`]}>
                    <TouchableOpacity style={styles.puntaje}>
                    {puntoPoomse.ACCURACY!=undefined&&<Text style={styles.textpp} >{puntoPoomse.PRESENTATION.toString()}</Text>}
                    </TouchableOpacity>
                    <Text style={styles.textt}>PRESENTATION</Text>
                </View>
            </View>
        </View>
    )
}

export default TotalResultado

const styles = StyleSheet.create({
    text: {
        color: 'white',
        width: '95%',
        fontSize: 18,
        textAlign: 'center'
    },
    textt: {
        color: 'black',
        width: '95%',
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
        width: '95%',
        flexDirection: 'row',
        marginBottom: 7
    },
    contenedor: {
        alignItems: 'center',
        backgroundColor: '#848282',
        height: '100%'
    },
    puntaje: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 1,
        marginTop: 6,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 7
    },
    textp: {
        color: '#192AC5',
        width: '95%',
        fontSize: 150,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textpp: {
        color: '#192AC5',
        width: '95%',
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        height: '20%',
        marginBottom: 10
    },
    "2col": {
        flex: 3,
        height: '100%',
        width: '100%',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#ffffff'
    },
})