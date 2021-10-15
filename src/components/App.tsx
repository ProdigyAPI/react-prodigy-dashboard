import React from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import Login from "./Login"

export default function App () {
    const [username, setUsername] = useLocalStorage("username", "")
    const [password, setPassword] = useLocalStorage("password", "")

    return username && password ? <Dashboard username={username} password={password}/> : <Login setUsername={setUsername} setPassword={setPassword}/>
}
