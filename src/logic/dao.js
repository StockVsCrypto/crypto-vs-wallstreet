const storageName = "crytoVSwallstreet";
const createNew = (date, sData,cData, timeframe)=>{
    let store ={
        "date":date,
        "data":{
        }
    }
    store["data"][timeframe] = {sData:sData, cData:cData}
    localStorage.setItem(storageName,JSON.stringify(store))
}

const getDate = ()=>{
    const store = JSON.parse(localStorage.getItem(storageName));
    if(store == null) return null
    return store.date;
}
const getStore = ()=>{
    return JSON.parse(localStorage.getItem(storageName));
}
const getTF = (timeframe) =>{
    const storeData = JSON.parse(localStorage.getItem(storageName)).data;
    // console.log(storeData)
    if(storeData == null) return null
    return storeData[timeframe]
}

const setTF=(timeframe, sData, cData)=>{
    let store = getStore()
    store["data"][timeframe] = {sData:sData, cData:cData}
    localStorage.setItem(storageName,JSON.stringify(store))
}
export default {
    createNew, 
    getDate,
    getStore,
    getTF,
    setTF
}