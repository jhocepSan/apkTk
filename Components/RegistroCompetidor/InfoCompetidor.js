import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoCompetidor = (props) => {
    const {item}=props
    return (
        <View style={styles.contenedor}>
            <Text style={styles.modalText}>{item.nombres}</Text>
            <Text style={styles.modalText}>{item.apellidos}</Text>
            <Text style={styles.modalText}>{'Club: ' + item.club }</Text>
            <Text style={styles.modalText}>{'Peso: ' + item.peso + ' Kgr'}</Text>
            <Text style={styles.modalText}>{'Edad: ' + item.edad + ' Años'}</Text>
            <Text style={styles.modalText}>{'Cinturon: ' + item.cinturon }</Text>
            <Text style={styles.modalText}>{'Altura: ' + item.altura + ' Mtrs'}</Text>
            <Text style={styles.modalText}>{'Ci: ' + item.ci }</Text>
        </View>
    )
}

export default InfoCompetidor

const styles = StyleSheet.create({
    contenedor:{
        width:'100%'
    },  
    modalText: {
        marginBottom: 5,
        textAlign: 'left',
    },
})