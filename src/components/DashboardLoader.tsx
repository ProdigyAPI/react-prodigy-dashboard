import React from "react"
import { useAsync } from "react-async-hook"
import { doAllRequests } from "../tools/api"

export default function DashboardLoader ({ username, password, children, setToken, setGameData, setPlayerData }: { username: string, password: string, children: any, setToken: React.Dispatch<React.SetStateAction<{ token: string } | null>>, setGameData: React.Dispatch<React.SetStateAction<any>>, setPlayerData: React.Dispatch<React.SetStateAction<any>> }) {
    const { loading, error, result } = useAsync(doAllRequests, [username, password])

    if (result) {
        setToken(result.token)
        setGameData(result.gameData)
        setPlayerData(result.playerData)
    }
    if (error) console.log(error)

    return (
        <div>
            {loading && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translateY(-50%)" }}>
                    <div style={{ color: "black" }} className="spinner-border" role="status">
                        <span style={{ color: "black" }} className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {error && <h1 className="d-flex justify-content-center">Error: {error.message}</h1>}
            {result && children}
        </div>
    )
}
