import type { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import { CombatFormulas } from "prodigy-player-api-to-prodigys-format/dist/CombatFormulas"
import { Creature } from "prodigy-player-api-to-prodigys-format/dist/Creature"
import React, { useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import SearchableDropdown from "./SearchableDropdown"

export default function AddPet ({ gameData, player }: { gameData: GameData, player: Player }) {
    const [petID, setPetID] = useState<number>(1)
    const levelRef = React.useRef<HTMLInputElement>(null)
    const nicknameRef = React.useRef<HTMLInputElement>(null)
    const [finished, setFinished] = useState(false)
    const [epic, setEpic] = useState(false)

    function getPet (petId: number) {
        return gameData.pet.find(pet => pet.ID === petId)
    }

    function displayPet (pet: any) {
        if (!pet) return <></>

        return (
            <>
                <img src={`https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${pet.type}-${pet.ID}/${pet.metadata.vIcon}/icon-${pet.type}-${pet.ID}.png`} alt={pet.data.name} />
                <span className="ms-3">[{pet.ID}] {pet.data.name}</span>
            </>
        )
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if ([125, 126, 127, 128, 129, 130, 131, 132, 133].includes(petID)) {
            setEpic(true)
        }

        const pet = getPet(petID)
        if (!pet) return
        const level = parseInt(levelRef.current?.value ?? "1")
        // @ts-ignore
        player.kennel?.addPet(petID, CombatFormulas.getHPFromParams(level, pet.data?.statHealth ?? 0), Creature.starsToLevel(level), level, nicknameRef.current?.value || null)
        setFinished(true)
    }

    return (
        finished
            ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Pet added!</Modal.Title>
                    </Modal.Header>
                    {epic
                        ? <Modal.Body>
                            <p>
                                <b>Warning: </b> Epics are discontinued/deprecated. Saving might not work.
                            </p>
                        </Modal.Body>
                        : ""}
                </>
            )
            : (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Pet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Dropdown>
                                <Dropdown.Toggle style={{ color: "white" }}>
                                    Select Pet
                                </Dropdown.Toggle>

                                <Dropdown.Menu as={SearchableDropdown}>
                                    {gameData.pet.filter(e => ![152, 153, 154].includes(e.ID)).map(pet => (
                                        <Dropdown.Item onClick={() => setPetID(pet.ID)} key={pet.ID} value={pet.ID}>
                                            {displayPet(pet)}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                                <span className="ms-3">{displayPet(getPet(petID))}</span>
                            </Dropdown>
                            <Form.Group>
                                <Form.Label>Pet Level</Form.Label>
                                <Form.Control ref={levelRef} type="number" min="1" max="100" defaultValue="100" required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control ref={nicknameRef} placeholder="Give your pet a nickname..." />
                            </Form.Group>
                            <Button type="submit" className="mt-3" style={{ color: "white" }}>Add Pet</Button>
                        </Form>
                    </Modal.Body>
                </>
            )
    )
}
