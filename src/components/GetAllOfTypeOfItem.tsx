import type { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import React, { useRef, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import SearchableDropdown from "./SearchableDropdown"

export default function GetAllOfTypeOfItem ({ gameData, player }: { gameData: GameData, player: Player }) {
    const [type, setType] = useState<"boots" | "follow" | "fossil" | "hat" | "item" | "key" | "mathTownFrame" | "mathTownInterior" | "mount" | "outfit" | "spellRelic" | "weapon" | "currency">("boots")
    const [done, setDone] = useState(false)
    const amountRef = useRef<HTMLInputElement>(null)

    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"] as const
    const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"]

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        gameData[type].forEach(item => {
            player.backpack?.add(type, item.ID, undefined, parseInt(amountRef.current?.value ?? "") ?? undefined)
        })
        setDone(true)
    }

    return (
        done
            ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Added!</Modal.Title>
                    </Modal.Header>
                </>
            )
            : <>
                <Modal.Header closeButton>
                    <Modal.Title>Get all {type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ color: "white" }}>
                            Select type of item
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={SearchableDropdown}>
                                {names.map((name, i) => (
                                    <Dropdown.Item key={i} onClick={() => setType(ids[i])}>
                                        {name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                            <span className="ms-3">{names[ids.indexOf(type)]}</span>
                        </Dropdown>
                        <Form.Group className="mt-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" ref={amountRef} min="1" defaultValue="1" required />
                        </Form.Group>
                        <Button className="mt-3" type="submit" style={{ color: "white" }}>Get all {type}</Button>
                    </Form>
                </Modal.Body>
            </>
    )
}
