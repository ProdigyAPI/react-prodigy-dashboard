import React from "react"
import { Modal } from "react-bootstrap"

export default function SavedSuccessfully () {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Saved Successfully!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Your changes have been saved successfully!</p>
            </Modal.Body>
        </>
    )
}
