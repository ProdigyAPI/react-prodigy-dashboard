import { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import React, { useRef, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import SearchableDropdown from "./SearchableDropdown"

export default function ViewPets ({ gameData, player }: { gameData: GameData, player: Player }) {
    const [petIndex, setPetIndex] = useState<number>(-1)
    const levelRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const resultRef = useRef<HTMLSpanElement>(null)

    function getPet (petId: number) {
        return gameData.pet.find(pet => pet.ID === petId)
    }

    function getSpell (spellId: number) {
        return gameData.spell.find(spell => spell.ID === spellId)
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

    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (petIndex === -1 || !player.kennel) return
        player.kennel.data[petIndex].level = parseInt(levelRef.current?.value || "0")
        player.kennel.data[petIndex].nickname = nameRef.current?.value || null
        resultRef.current && (resultRef.current.innerHTML = "Edited successfully!")
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Pets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle style={{ color: "white" }}>
                        Select Pet
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={SearchableDropdown}>
                        {player.kennel?.data.map((pet, index) => (
                            <Dropdown.Item onClick={() => setPetIndex(index)} key={index} value={index}>
                                {displayPet(getPet(pet.ID))}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    <span className="ms-3">{petIndex === -1 ? "" : displayPet(getPet(player.kennel!.data[petIndex].ID))}</span>
                </Dropdown>
                {petIndex !== -1 && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Pet Level</Form.Label>
                            <Form.Control ref={levelRef} type="number" defaultValue={player.kennel!.data[petIndex].level} max="100" min="1" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pet Nickname</Form.Label>
                            <Form.Control ref={nameRef} placeholder="Give your pet a nickname..." defaultValue={player.kennel!.data[petIndex].nickname || ""} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Spells</Form.Label>
                            <Form.Control value={getSpell(getPet(player.kennel!.data[petIndex].ID)!.data.nativeSpells[0].spell)?.data.name} disabled />
                            <Form.Control className="mt-3" value={getSpell(getPet(player.kennel!.data[petIndex].ID)!.data.nativeSpells[1].spell)?.data.name} disabled />
                            <Form.Control className="mt-3" value={getSpell(player.kennel!.data[petIndex].foreignSpells![0])!.data.name} disabled />
                            <Form.Control className="mt-3" value={getSpell(player.kennel!.data[petIndex].foreignSpells![1])!.data.name} disabled />
                        </Form.Group>
                        <Button type="submit" className="mt-3" style={{ color: "white" }}>Edit</Button>
                        <br/>
                        <span ref={resultRef}></span>
                    </Form>
                )}
            </Modal.Body>
        </>
    )
}
