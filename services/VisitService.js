import AsyncStorage from '@react-native-async-storage/async-storage'

const host = "http://localhost:8000/api/visits"
const startArriving = async () => {
    const url = host
    let rendiId = await AsyncStorage.getItem("rendiId")
    console.log(rendiId)
    let res = await fetch(url + "/" + rendiId)
    let response = await res.json()
    response.data.id == rendiId
        ? updateArrival(response.data) 
        : console.error("Hiba")
}
const updateArrival = async (data) => {
    const url = host + "/" + data.id
    let response = await fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  
            arrived: true,
        })
    })
    let res = await response.json()
    console.log(res.data)
}
export default startArriving()