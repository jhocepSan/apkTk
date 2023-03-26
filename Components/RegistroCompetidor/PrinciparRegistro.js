import {
    StyleSheet, View, SafeAreaView, TouchableOpacity, ActivityIndicator,
    Text, Alert, ScrollView, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import UtilsStore from '../Utils/UtilsStore';
import CompetidorItem from './CompetidorItem';
import InfoCompetidor from './InfoCompetidor';

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)
const Col = ({ numRows, children }) => {
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}
const PrinciparRegistro = (props) => {
    const { navigation } = props;
    const [servidor, setServidor] = useState('');
    const [competidores, setCompetidores] = useState([]);
    const [infoCa, setInfoCa] = useState({});
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([{ label: 'Combates', value: 'C' }, { label: 'Poomse', value: 'P' }, { label: 'Rompimineto', value: 'R' }, { label: 'Demostracion', value: 'D' }]);
    const [openG, setOpenG] = useState(false);
    const [valueG, setValueG] = useState(null);
    const [generos, setGeneros] = useState([{ label: 'Masculino', value: 'M' }, { label: 'Femenino', value: 'F' }]);
    const [loading, setLoading] = useState(false);
    const [itemSelect, setItemSelect] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState('');
    const getCompetidores = () => {
        if (value !== null && valueG !== null) {
            setLoading(true);
            fetch(`http://${servidor}/competidor/getCompetidores`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idCampeonato": infoCa.idcampeonato,
                    "club": infoCa.idclub,
                    "tipo": value,
                    "genero": valueG
                }),
            }).then(res => res.json())
                .then(data => {
                    setLoading(false);
                    if (data.ok) {
                        console.log(data.ok);
                        setCompetidores(data.ok);
                    } else {
                        Alert.alert(
                            'Ingreso Incorrecto',
                            'Contraseña o correo, incorrecto',
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
                        'Servidor No Valido',
                        'No esta en funcionamiento, el servidor o verifique el codigo, gracias ...' + error.message,
                        [
                            {
                                text: 'ACEPTAR'
                            }
                        ]
                    )
                })
        } else {
            Alert.alert(
                'Datos Invalidos',
                'Seleccione el tipo de participación y el genero para listar los resgistros ...'
                [
                {
                    text: 'ACEPTAR'
                }
                ]
            )
        }
    }
    const getInfoServer = async () => {
        var server = await UtilsStore.getElemento('servidor');
        var info = await UtilsStore.getElemento('info');
        if (server !== null && server !== undefined) {
            setServidor(server);
            setInfoCa(JSON.parse(info));
        }
    }
    const eliminarCompetidor = () => {
        fetch(`http://${servidor}/competidor/deleteCompetidor`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "estado": 'E',
                "idcompetidor":itemSelect.idcompetidor
            }),
        }).then(res => res.json())
            .then(data => {
                setModalVisible(false);
                setItemSelect({});
                if (data.ok) {
                    getCompetidores();
                } else {
                    Alert.alert(
                        'Ingreso Incorrecto',
                        'Contraseña o correo, incorrecto',
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
                    'Servidor No Valido',
                    'No esta en funcionamiento, el servidor o verifique el codigo, gracias ...' + error.message,
                    [
                        {
                            text: 'ACEPTAR'
                        }
                    ]
                )
            })
    }
    useEffect(() => {
        getInfoServer();
    }, [])
    return (
        <SafeAreaView style={styles.contenedor}>
            <Row>
                <Col numRows={2}>
                    <DropDownPicker
                        placeholder="Tipo de Participación"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </Col>
                <Col numRows={2}>
                    <DropDownPicker
                        placeholder="Genero"
                        open={openG}
                        value={valueG}
                        items={generos}
                        setOpen={setOpenG}
                        setValue={setValueG}
                        setItems={setGeneros}
                    />
                </Col>
            </Row>
            <Row>
                <Col numRows={2}>
                    <Text style={styles.textInfo}>{`Lista ${infoCa.nombrecampeonato}`}</Text>
                </Col>
                <Col numRows={2}>
                    <TouchableOpacity style={styles.button} onPress={getCompetidores}>
                        <Icon name="address-book" size={25} style={styles.buttonImageIconStyle} color="white" />
                        <Text style={styles.text}>Listar</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
            <ScrollView style={styles.scrollView}>
                {loading && <ActivityIndicator size="large" color="#00ff00" />}
                {competidores.length !== 0 &&
                    competidores.map((item, index) => {
                        return (<CompetidorItem key={index} item={item}
                            setTipoModal={setTipoModal}
                            setItemSelect={setItemSelect}
                            setModalVisible={setModalVisible}></CompetidorItem>)
                    })
                }
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {tipoModal === 'I' && <InfoCompetidor item={itemSelect} />}
                        {tipoModal === 'E' &&
                            <View style={{ paddingBottom: 10 }}>
                                <Text style={styles.modalText}>Seguro de que quiere eliminar el estudiante ?</Text>
                                <TouchableOpacity style={styles.button} onPress={() => eliminarCompetidor()}>
                                    <Icon name="trash" size={25} style={styles.buttonImageIconStyle} color="white" />
                                    <Text style={styles.text}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>}
                        <TouchableOpacity style={styles.buttonSalir} onPress={() => setModalVisible(false)}>
                            <Icon name="cube" size={25} style={styles.buttonImageIconStyle} color="white" />
                            <Text style={styles.text}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default PrinciparRegistro

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#AFB2B4',
        height: '74%'
    },
    contenedor: {
        backgroundColor: '#AFB2B4',
        height: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 5,
        backgroundColor: '#819FF7',
        borderRadius: 20,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        width:'100%'
    },
    row: {
        flexDirection: "row",
        height: '8%'
    },
    "2col": {
        padding: 2,
        flex: 2,
        height: '100%',
        width: '100%',
    },
    text: {
        color: 'white',
        width: '80%',
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#088A4B',
        borderRadius: 10,
        fontSize: 18,
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    buttonSalir: {
        alignItems: 'center',
        backgroundColor: '#FA5858',
        borderRadius: 10,
        fontSize: 18,
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    buttonImageIconStyle: {
        textAlign: 'center',
        resizeMode: 'stretch',
        paddingLeft: 15
    },
    textInfo: {
        color: 'Dark',
        width: '100%',
        fontSize: 18,
        textAlign: 'center'
    },
})