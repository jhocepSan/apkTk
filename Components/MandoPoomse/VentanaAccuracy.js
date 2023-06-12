import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ContextGlobal } from '../../App'

const Col = ({ numRows, children }) => {
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}
const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

const VentanaAccuracy = (props) => {
    const { navigation } = props;
    const {puntoPoomse,setPuntoPoomse,resetPoomse,setResetPoomse} = useContext(ContextGlobal);
    const [valorAcc, setValorAcc] = useState(4.0);
    function modificarPunto(tipo,valor){
        if(tipo){
            if(valorAcc<4.0){
                var numu = parseFloat(valorAcc) + parseFloat(valor);
                setValorAcc(numu.toFixed(1));
            }
        }else{
            if(valorAcc>0){
                var num = parseFloat(valorAcc) - parseFloat(valor);
                setValorAcc(num.toFixed(1));
            }
        }
    }
    function GuardarPuntage(){
        setPuntoPoomse({"ACCURACY":parseFloat(valorAcc)})
        navigation.navigate('MandoPoomseDos');
    }
    useEffect(()=>{
        if(resetPoomse){
            setValorAcc(4.0);
            setPuntoPoomse({});
            setResetPoomse(false);
        }
    },[resetPoomse])
    useEffect(()=>{
        if(puntoPoomse.ACCURACY!=undefined){
            setValorAcc(parseFloat(puntoPoomse.ACCURACY))
        }
    },[])
    return (
        <View style={styles.contenedor}>
            <TouchableOpacity style={styles.button} onPress={()=>GuardarPuntage()}>
                <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.puntaje}>
                <Text style={styles.textp} >{valorAcc.toString()}</Text>
            </TouchableOpacity>
            <Row>
                <Col numRows={2}>
                    <TouchableOpacity style={styles.deduccion} onPress={()=>modificarPunto(true,0.3)}>
                        <Text style={styles.textd} >+0.3</Text>
                    </TouchableOpacity>
                </Col>
                <Col numRows={2}>
                    <TouchableOpacity style={styles.deduccion} onPress={()=>modificarPunto(true,0.1)}>
                        <Text style={styles.textd} >+0.1</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
            <Row>
                <Col numRows={2}>
                    <TouchableOpacity style={styles.deduccionn} onPress={()=>modificarPunto(false,0.3)}>
                        <Text style={styles.textd} >-0.3</Text>
                    </TouchableOpacity>
                </Col>
                <Col numRows={2}>
                    <TouchableOpacity style={styles.deduccionn} onPress={()=>modificarPunto(false,0.1)}>
                        <Text style={styles.textd} >-0.1</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
        </View>
    )
}

export default VentanaAccuracy

const styles = StyleSheet.create({
    text: {
        color: 'white',
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
        width: '95%',
        flexDirection: 'row',
        marginBottom: 7
    },
    textp: {
        color: '#192AC5',
        width: '95%',
        fontSize: 55,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: "row",
        width:'100%',
        alignItems:'center',
        height:'35%',
        marginBottom:10
    },
    "2col": {
        flex: 3,
        height: '100%',
        width: '100%',
        marginLeft:5,
        marginRight:5,
    },
    deduccion: {
        alignItems: 'center',
        backgroundColor: '#1D8036',
        padding: 1,
        marginTop: 6,
        width: '100%',
        height:'100%',
        flexDirection: 'row',
        marginBottom: 7,
        borderRadius:20
    },
    deduccionn: {
        alignItems: 'center',
        backgroundColor: '#FD2E32',
        padding: 1,
        marginTop: 6,
        width: '100%',
        height:'100%',
        flexDirection: 'row',
        marginBottom: 7,
        borderRadius:20
    },
    textd: {
        color: '#ffffff',
        width: '100%',
        fontSize: 55,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})