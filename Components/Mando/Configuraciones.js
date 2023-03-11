import React, { useEffect, useState } from 'react';
import { StyleSheet, Text,SafeAreaView,TextInput  } from 'react-native';
import UtilsStore from '../Utils/UtilsStore';

const Configuraciones = (props) => {
    console.log(props);
    const [servidor,setServidor] = useState('');
    const servidorNombre=async()=>{
        var info= await UtilsStore.getElemento('servidor');
        console.log(info,"informacion");
        if(info!==undefined||info!==null){
            setServidor(info);
        }
    }
    useEffect(()=>{
        servidorNombre()
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Ip Servidor</Text>
            <TextInput
                style={styles.input}
                placeholder="servidor"
                keyboardType="text"
            />
        </SafeAreaView>
    )
}

export default Configuraciones

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
        color: '#2E2E2E',
        fontVariant: 'bold',
        width: '80%',
        fontSize: 18,
        textAlign: 'left'
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





