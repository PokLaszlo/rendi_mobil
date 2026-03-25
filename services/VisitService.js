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

async function save(name, email) {
    console.log("Mentés folyamatban...")
    const url = host
    try {
        let response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                eventId: 1
            })
        })
        let res = await response.json()
        console.log("Hozzáadás sikeres: \n", res.data)
        AsyncStorage.setItem("rendiId", res.data.id)
    } catch (error) {
        console.error("Hozzáadás sikertelen: \n", error)
    }
}

export { startArriving, save }