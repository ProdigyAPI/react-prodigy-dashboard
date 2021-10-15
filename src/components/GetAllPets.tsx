import type { GameData } from "prodigy-api/lib/GameData"
import type { Player } from "prodigy-player-api-to-prodigys-format"
import React, { useRef } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { CombatFormulas } from "prodigy-player-api-to-prodigys-format/dist/CombatFormulas"
import { Creature } from "prodigy-player-api-to-prodigys-format/dist/Creature"

export default function GetAllPets ({ player, gameData, closeModal }: { player: Player, gameData: GameData, closeModal: () => void }) {
    const levelRef = useRef<HTMLInputElement>(null)

    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const level = parseInt(levelRef.current!.value)

        gameData.pet.filter(e => ![125, 126, 127, 128, 129, 130, 131, 132, 133].includes(e.ID)).forEach(pet => {
            // @ts-ignore
            player.kennel?.addPet(pet.ID, CombatFormulas.getHPFromParams(level, pet.data?.statHealth ?? 0), Creature.starsToLevel(level), level, null)
        })
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Get All Pets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Level</Form.Label>
                        <Form.Control ref={levelRef} type="number" min="1" max="100" defaultValue="100" />
                    </Form.Group>
                    <Button type="submit" className="mt-3" style={{ color: "white" }}>Get All Pets</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
