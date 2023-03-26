import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'

const CompetidorItem = (props) => {
    const { item,setItemSelect,setModalVisible,setTipoModal} = props;
    function getInfoUsuario(tipo){
        setItemSelect(item);
        setModalVisible(true);
        setTipoModal(tipo);
    }
    return (
        <View style={styles.contenedor} >
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>getInfoUsuario('I')}>
                    <Text>{item.nombres + ' ' + item.apellidos}</Text>
                    <Text>{'Club ' + item.club}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowd}>
                <TouchableOpacity
                    onPress={() => console.log("oka")}
                >
                    <Icon name="pen" size={25} style={{ paddingRight: 5, color: '#FFBF00' }} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.rowd}>
                <TouchableOpacity
                    onPress={()=>getInfoUsuario('E')}
                >
                    <Icon name="trash" size={25} style={{ paddingRight: 5, color: '#FE2E2E' }} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CompetidorItem

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 10,
        width: '98%',
        height: 55,
        margin: 4,
        flex: 1,
    },
    row: {
        width: '79%',
    },
    rowd: {
        width: '10%'
    }
})