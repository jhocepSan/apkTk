import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UtilsStore from '../Utils/UtilsStore';
import { ContextGlobal } from '../../App';

const VistaConfig = () => {
    const {config,setConfig} =useContext(ContextGlobal);
    const [servidorIp, setServidorIp] = useState('');
    const [sector,setSector] = useState('');
    const [puerto,setPuerto] = useState(0);
    function validarConneccion() {
        console.log(servidorIp,"configuraciones ")
        if (servidorIp !== '') {
            fetch(`http://${servidorIp}/mandojuec/conectar`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        Alert.alert("Conección Correcta","CONECCION CORRECTA CON EL SERVIDOR");
                        UtilsStore.saveArticle('servidor', servidorIp);
                        UtilsStore.saveArticle('sector', sector);
                        setConfig({'servidor':servidorIp,'sector':sector});
                    } else {
                        Alert.alert('Conección Erronea',
                            'No es posible establecer la conección con el servidor ' + servidorIp + ' verifica el codigo, por favor...',
                            [
                                {
                                    text: 'ACEPTAR'
                                }
                            ])
                    }
                })
                .catch(error => {
                    Alert.alert(
                        'Servidor No Valido',
                        'No esta en funcionamiento, el servidor o verifique el codigo, gracias ...',
                        [
                            {
                                text:'ACEPTAR'
                            }
                        ]
                    )
                })
        } else {
            Alert.alert('Conección Erronea',
                'Colocar el codigo del servidor, por favor...',
                [
                    {
                        text: 'ACEPTAR'
                    }
                ])
        }
    }
    const servidorNombre=async()=>{
        if(config.servidor==undefined || config.servidor==null){
            var info= await UtilsStore.getElemento('servidor');
            var infoS= await UtilsStore.getElemento('sector');
            if((info!==undefined||info!==null)&&(infoS!==undefined||infoS!==null)){
                setServidorIp(info);
                setSector(infoS);
                setConfig({'servidor':info,'sector':infoS});
            }
        }else{
            setServidorIp(config.servidor);
            setSector(config.sector);
        }
    }
    useEffect(()=>{
        servidorNombre()
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ip Servidor</Text>
            <TextInput style={styles.inputText} keyboardType='text' value={servidorIp} onChangeText={setServidorIp} />
            <Text style={styles.text}>Zona Albitraje</Text>
            <TextInput style={styles.inputText} keyboardType='text' value={sector} onChangeText={setSector} />
            <TouchableOpacity style={styles.button} onPress={() => validarConneccion()}>
                <Icon name="server" size={25} style={styles.buttonImageIconStyle} color="white" />
                <Text style={styles.textButton}> Conectar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default VistaConfig

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AFB2B4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
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
        width: "80%",
        textAlign: 'left',
        fontSize: 18,
    },
    textButton: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ffffff'
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
    }
})