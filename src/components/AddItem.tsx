import type { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import React, { useRef, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import SearchableDropdown from "./SearchableDropdown"

export default function AddItem ({ gameData, player }: { gameData: GameData, player: Player }) {
    const [itemId, setItemId] = useState<"boots" | "follow" | "fossil" | "hat" | "item" | "key" | "mathTownFrame" | "mathTownInterior" | "mount" | "outfit" | "spellRelic" | "weapon" | "currency">("boots")
    const [item, setItem] = useState<number>(-1)
    const [done, setDone] = useState<boolean>(false)
    const amountRef = useRef<HTMLInputElement>(null)

    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"] as const
    const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"]

    function getItem (id: number) {
        // @ts-ignore
        return gameData[itemId].find(i => i.ID === id)
    }

    function displayItem (item: any) {
        if (!item) return <></>

        return (
            <>
                <img src={`https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${item.type}-${item.ID}/${item.metadata.vIcon}/icon-${item.type}-${item.ID}.png`} alt={item.data.name} />
                <span className="ms-3">[{item.ID}] {item.data.name}</span>
            </>
        )
    }

    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (item === -1) return
        player.backpack?.add(itemId, item, undefined, parseInt(amountRef.current?.value ?? "") ?? undefined)
        setDone(true)
    }

    return done
        ? (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Item Added!</Modal.Title>
                </Modal.Header>
            </>
        )
        : (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ color: "white" }}>
                            Select type of item
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={SearchableDropdown}>
                                {names.map((name, i) => (
                                    <Dropdown.Item key={i} onClick={() => setItemId(ids[i])}>
                                        {name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                            <span className="ms-3">{names[ids.indexOf(itemId)]}</span>
                        </Dropdown>
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle style={{ color: "white" }}>
                            Select {names[ids.indexOf(itemId)]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={SearchableDropdown}>
                                {gameData[itemId].map(item => (
                                    <Dropdown.Item onClick={() => setItem(item.ID)} key={item.ID} value={item.ID}>
                                        {displayItem(item)}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                            <span className="ms-3">{displayItem(getItem(item))}</span>
                        </Dropdown>
                        <Form.Group className="mt-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" ref={amountRef} min="1" defaultValue="1" required />
                        </Form.Group>
                        <Button className="mt-3" type="submit" style={{ color: "white" }}>Add Item</Button>
                    </Form>
                </Modal.Body>
            </>
        )
}
