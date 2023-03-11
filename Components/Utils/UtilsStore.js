import AsyncStorage from "@react-native-async-storage/async-storage";

const saveArticle = async(key,value)=>{
    try {
        await AsyncStorage.setItem(key,value);
    } catch (error) {
        console.log(error.message);
    }
}

const getAllData=()=>{
    AsyncStorage.getAllKeys().then(async (keys)=>{
        return AsyncStorage.multiGet(keys)
        .then((result)=>console.log(result))
        .catch((e)=>console.log(e.message))
    })
}

const getElemento=async(keys)=>{
    return await AsyncStorage.getItem(keys);
}

export default {saveArticle,getAllData,getElemento}