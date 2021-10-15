import React, { useRef, FormEvent, useState } from "react"
import { Button, Container, Form, Modal } from "react-bootstrap"
import { tokenify } from "../tools/api"
import IncorrectLogin from "./IncorrectLogin"
import LoadingModal from "./LoadingModal"

export default function Login ({ setUsername, setPassword }: { setUsername: (username: string) => void, setPassword: (password: string) => void }) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!usernameRef.current || !passwordRef.current) return

        const username = (usernameRef.current as HTMLInputElement).value
        const password = (passwordRef.current as HTMLInputElement).value

        setLoading(true)
        setModalOpen(true)
        const result = await tokenify(username, password)
        setLoading(false)
        setModalOpen(false)
        if (!result.token) {
            return setModalOpen(true)
        }

        setUsername(username)
        setPassword(password)
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center">Login</h1>
            <Container className="align-items-center d-flex">
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={usernameRef} placeholder="Enter your prodigy username" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="Enter your prodigy password" required />
                    </Form.Group>
                    <Button type="submit" className="mt-3">Login</Button>
                </Form>
            </Container>
            <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                {loading ? <LoadingModal /> : <IncorrectLogin />}
            </Modal>
        </div>
    )
}
