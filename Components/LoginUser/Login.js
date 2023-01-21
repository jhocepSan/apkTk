import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Config from '../../Config';

const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const ingresarSistema = () => {
        if (correo !== '' && password != '') {
            console.log(Config.webService, correo, password)
            fetch(`${Config.webService}/login/iniciarSession`, {
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
                    console.log(data.ok);
                    navigation.navigate('Mando')
                })
                .catch(error => console.log(error))
        } else {
            console.log("campos vaciosassgi")
        }
    }
    return (
        <View style={styles.container}>
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
                <Text style={styles.text}>Ingresar</Text>
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
    button: {
        alignItems: 'center',
        backgroundColor: '#408300',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        fontSize: 18
    }
})

export default Login