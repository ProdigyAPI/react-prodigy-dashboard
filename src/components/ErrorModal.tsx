import React from "react"
import { Modal } from "react-bootstrap"

export default function ErrorModal ({ errorMessage }: { errorMessage: string }) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>A error occurred</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please try again. If the error persists please ask for help in our <a href="https://discord.gg/XQDfbfq" target="_blank" rel="noreferrer">discord server.</a> <br/> The error is <code>{errorMessage}</code>.</p>
            </Modal.Body>
        </>
    )
}
