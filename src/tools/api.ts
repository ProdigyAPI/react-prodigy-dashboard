import { Player } from "prodigy-player-api-to-prodigys-format"
import { Items } from "prodigy-player-api-to-prodigys-format/dist/Items"

export const API_URL = "https://prodigy-api.hostedposted.com"

export const tokenify = async (username: string, password: string) =>
    await (await fetch(`${API_URL}/token`, {
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
    })).json()

export const getGameData = async () =>
    await (await fetch(`${API_URL}/gameData`)).json()

export const getPlayerData = async (token: { token: string }, gameData: {}) => {
    Items.parseData(gameData)
    const playerData = await (await fetch(`${API_URL}/player`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        }
    })).json()
    const playerObj = new Player()
    playerObj.init({ ...token, ...playerData })
    return playerObj
}

export const updatePlayerData = async (token: string, playerData: Player) =>
    await fetch(`${API_URL}/player/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9"
        },
        body: JSON.stringify(playerData.getUpdatedData(true))
    })

export const doAllRequests = async (username: string, password: string) => {
    const token = await tokenify(username, password)
    const gameData = await getGameData()
    const playerData = await getPlayerData(token, gameData)
    return { token, gameData, playerData }
}
