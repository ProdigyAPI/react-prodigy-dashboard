import React from "react"
import { Modal } from "react-bootstrap"

export default function IncorrectLogin () {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>Incorrect Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{ color: "black" }}>
                    Check your username and password and try again. If you still have issues try logging in on prodigy. Their might be a captcha you have to click. If errors persist after that, please contact us at our <a href="https://discord.gg/XQDfbfq" target="_blank" rel="noreferrer">discord</a>.
                </p>
            </Modal.Body>
        </>
    )
}
