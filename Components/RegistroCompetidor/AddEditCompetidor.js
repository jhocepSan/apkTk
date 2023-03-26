import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { DateTimePicker, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker'

const AddEditCompetidor = (props) => {
    const { navigation } = props;
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [openG, setOpenG] = useState(false);
    const [valueG, setValueG] = useState(null);
    const [generos, setGeneros] = useState([{ label: 'Masculino', value: 'M' }, { label: 'Femenino', value: 'F' }]);
    const [edad, setEdad] = useState('');
    const [peso,setPeso] = useState('');
    const [ciUser,setCiUser] = useState('');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(currentDate)
        var fechaHoy= new Date();
        var fechaEle=new Date(currentDate);
        var edadm=0;
        if(fechaHoy.getMonth()<fechaEle.getMonth()){
            edadm=fechaHoy.getFullYear()-fechaEle.getFullYear()-1;
        }else{
            edadm=fechaHoy.getFullYear()-fechaEle.getFullYear();
        }
        setEdad(edadm);
        setFecha(currentDate);
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: fecha,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    function getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return 'Nacio: ' + month + '/' + day + '/' + year;
    }
    return (
        <View style={styles.contenedor}>
            <TextInput
                style={styles.input}
                onChangeText={setNombres}
                value={nombres}
                placeholder="Nombres"
                keyboardType="text"
            />
            <TextInput
                style={styles.input}
                onChangeText={setApellidos}
                value={apellidos}
                placeholder="Apellidos"
                keyboardType="text"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCiUser}
                value={ciUser}
                placeholder="Cedula identidad"
                keyboardType="number"
            />
            <View style={styles.row}>
                <View style={{ backgroundColor: '#FAFAFA', alignItems: 'center', borderRadius: 5, ...styles.col }}>
                    <Text style={{ width: '100%', alignItems: 'center' }}>{getFormattedDate(fecha)}</Text>
                    <TouchableOpacity
                        onPress={() => showMode('date')}
                    >
                        <Icon name="calendar" size={25} style={{ paddingRight: 5, color: '#2E2EFE' }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.col}>
                    <DropDownPicker
                        placeholder="Genero"
                        open={openG}
                        value={valueG}
                        items={generos}
                        setOpen={setOpenG}
                        setValue={setValueG}
                        setItems={setGeneros}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput
                        style={styles.inputNum}
                        onChangeText={setEdad}
                        value={edad}
                        placeholder="Edad"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.col}>
                    <TextInput
                        style={styles.inputNum}
                        onChangeText={setPeso}
                        value={peso}
                        placeholder="Peso"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    )
}

export default AddEditCompetidor

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#AFB2B4',
        alignItems: 'center',
        paddingTop: 5
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        color: 'black',
        fontSize: 18
    },
    inputNum: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        color: 'black',
        fontSize: 18
    },
    row: {
        flexDirection: "row",
        width:'90%',
        marginBottom:4
    },
    col: {
        flex: 2,
        height: '100%',
        width: '100%',
    },
})