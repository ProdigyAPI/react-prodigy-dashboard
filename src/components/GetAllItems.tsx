import type { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import React, { useRef, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

export default function GetAllItems ({ gameData, player }: { gameData: GameData, player: Player }) {
    const [done, setDone] = useState(false)
    const amountRef = useRef<HTMLInputElement>(null)

    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"] as const

    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const amount = parseInt(amountRef.current!.value)
        ids.forEach(id => {
            gameData[id].forEach(item => {
                player.backpack?.add(id, item.ID, undefined, amount ?? undefined)
            })
        })
        setDone(true)
    }

    return (
        done
            ? (
                <Modal.Header closeButton>
                    <Modal.Title>All items added to your backpack!</Modal.Title>
                </Modal.Header>
            )
            : <>
                <Modal.Header closeButton>
                    <Modal.Title>Get All Pets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control ref={amountRef} type="number" min="1" max="99" defaultValue="1" />
                        </Form.Group>
                        <Button type="submit" className="mt-3" style={{ color: "white" }}>Get All Items</Button>
                    </Form>
                </Modal.Body>
            </>
    )
}
