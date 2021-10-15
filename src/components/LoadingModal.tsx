import React from "react"
import { Modal } from "react-bootstrap"

export default function LoadingModal () {
    return (
        <>
            <Modal.Header>
                <Modal.Title>Loading...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Modal.Body>
        </>
    )
}
