import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert,Image } from 'react-native';
import UtilsStore from '../Utils/UtilsStore'
import Config from '../../Config';

const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [servidor,setServidor] = useState('');
    function configuracionSistema(){
        navigation.navigate('Config');
    }
    const ingresarSistema = async() => {
        if (correo !== '' && password != '') {
            if(servidor!==null&&servidor!==undefined){
            fetch(`http://${servidor}/login/iniciarSession`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo,
                    password
                }),
            }).then(res => res.json())
                .then(data => {
                    if(data.ok){
                        console.log(data.ok);
                        UtilsStore.saveArticle('info',JSON.stringify(data.ok));
                        navigation.navigate('Mando')
                    }else{
                        Alert.alert(
                            'Ingreso Incorrecto',
                            'Contraseña o correo, incorrecto',
                            [
                                {
                                    text:'ACEPTAR'
                                }
                            ]
                        )
                    }
                })
                .catch(error => {
                    Alert.alert(
                        'Servidor No Valido',
                        'No esta en funcionamiento, el servidor o verifique el codigo, gracias ...'+error.message,
                        [
                            {
                                text:'ACEPTAR'
                            }
                        ]
                    )
                })
            }else{
                getInformacion();
                Alert.alert(
                    'Intente Nuevamente',
                    'Estamos configurando la configuración, intente nuevamente',
                    [
                        {
                            text:'ACEPTAR'
                        }
                    ]
                )
            }
        } else {
            Alert.alert(
                'Campo Vacio',
                'Ingrese sus datos Por favor...',
                [
                    {
                        text:'ACEPTAR'
                    }
                ]
            )
        }
    }
    const getInformacion=async()=>{
        var server=await UtilsStore.getElemento('servidor');
        if(server!==null&&server!==undefined){
            setServidor(server);
        }
    }
    useEffect(()=>{
        getInformacion()
    },[])
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/login.png')}
                style={styles.ImageIconStyle}
                />
            <Text style={styles.text}>Correo</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCorreo}
                value={correo}
                placeholder="Correo electronico"
                keyboardType="text"
            />
            <Text style={styles.text}>Contraseña</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="PASSWORD"
                keyboardType="text"
            />
            <TouchableOpacity style={styles.button} onPress={ingresarSistema}>
                <Text style={styles.textBtn}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonC} onPress={()=>configuracionSistema()}>
                <Text style={styles.textBtn}>Configurar</Text>
            </TouchableOpacity>
        </View>
    );
}

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
        color: 'black',
        width: '80%',
        fontSize: 18
    },
    textBtn: {
        color: 'black',
        width: '80%',
        fontSize: 18,
        textAlign:'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#4CBD55',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 18,
        width: '80%',
        flexDirection: 'row',
    },
    buttonC: {
        alignItems: 'center',
        backgroundColor: '#5882FA',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 18,
        width: '80%',
        flexDirection: 'row',
    },
    ImageIconStyle:{
        width:'20%'
    }
})

export default Login