import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ContextGlobal } from '../../App';

const VentanaPresentation = (props) => {
    const { navigation } = props;
    const {puntoPoomse,setPuntoPoomse} = useContext(ContextGlobal);
    const [valorPre, setValorPre] = useState(parseFloat(6.0));
    const [speedPower,setSpeedPower] = useState(2);
    const [rhythmTempo,setRhythmTempo] = useState(2);
    const [expreEnergy,setExpreEnergy] = useState(2);
    function GuardarPuntage(){
        setPuntoPoomse({...puntoPoomse,"PRESENTATION":parseFloat(valorPre)});
        navigation.navigate('resultadoPoomse');
    }
    return (
        <View style={styles.contenedor}>
            <TouchableOpacity style={styles.button} onPress={() => GuardarPuntage()}>
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.puntaje}>
                <Text style={styles.textp} >{valorPre.toString()}</Text>
            </TouchableOpacity>
            <View style={styles.contenedorPa}>
                <Text style={styles.textPorc}>Speed & Power</Text>
                <Text style={styles.textPorc}>{speedPower.toString()}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={2}
                    value={speedPower}
                    onValueChange={(e)=>{
                        setSpeedPower(e.toFixed(2));
                        var datoN=parseFloat(rhythmTempo)+parseFloat(expreEnergy)+parseFloat(e.toFixed(2));
                        setValorPre(datoN.toFixed(2));
                    }}
                    minimumTrackTintColor="#0080FF"
                    maximumTrackTintColor="#000000"
                />
            </View>
            <View style={styles.contenedorPa}>
                <Text style={styles.textPorc}>Rhythm & Tempo</Text>
                <Text style={styles.textPorc}>{rhythmTempo.toString()}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={2}
                    value={rhythmTempo}
                    onValueChange={(e)=>{
                        setRhythmTempo(e.toFixed(2));
                        var valorN = parseFloat(speedPower)+parseFloat(expreEnergy)+parseFloat(e.toFixed(2));
                        setValorPre(valorN.toFixed(2));
                    }}
                    minimumTrackTintColor="#0080FF"
                    maximumTrackTintColor="#000000"
                />
            </View>
            <View style={styles.contenedorPa}>
                <Text style={styles.textPorc}>Expression of Energy</Text>
                <Text style={styles.textPorc}>{expreEnergy.toString()}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={2}
                    value={expreEnergy}
                    onValueChange={(e)=>{
                        setExpreEnergy(e.toFixed(2));
                        var valorN = parseFloat(speedPower)+parseFloat(rhythmTempo)+parseFloat(e.toFixed(2));
                        setValorPre(valorN.toFixed(2));
                    }}
                    minimumTrackTintColor="#0080FF"
                    maximumTrackTintColor="#000000"
                />
            </View>
        </View>
    )
}

export default VentanaPresentation

const styles = StyleSheet.create({
    text: {
        color: 'white',
        width: '95%',
        fontSize: 18,
        textAlign: 'center'
    },
    textPorc: {
        color: '#0101DF',
        width: '95%',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
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
    slider:{
        width:'100%',
        height:50,
        fontSize:18
    },
    contenedor: {
        alignItems: 'center',
        backgroundColor: '#848282',
        height: '100%'
    },
    contenedorPa:{
        backgroundColor:'#ffffff',
        width:'90%',
        alignItems:'center',
        marginBottom:20
    },
    puntaje: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 1,
        marginTop: 6,
        width: '95%',
        flexDirection: 'row',
        marginBottom: 25
    },
    textp: {
        color: '#192AC5',
        width: '95%',
        fontSize: 55,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})