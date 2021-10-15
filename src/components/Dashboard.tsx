import { GameData } from "prodigy-api/lib/GameData"
import { Player } from "prodigy-player-api-to-prodigys-format"
import { CombatFormulas } from "prodigy-player-api-to-prodigys-format/dist/CombatFormulas"
import React, { useRef, useState } from "react"
import { Button, Card, Container, Form, Modal } from "react-bootstrap"
import DashboardLoader from "./DashboardLoader"
import { updatePlayerData } from "../tools/api"
import LoadingModal from "./LoadingModal"
import ErrorModal from "./ErrorModal"
import SavedSuccessfully from "./SavedSuccessfully"
import AddPet from "./AddPet"
import ViewPets from "./ViewPets"
import GetAllPets from "./GetAllPets"
import AddItem from "./AddItem"
import GetAllOfTypeOfItem from "./GetAllOfTypeOfItem"
import GetAllItems from "./GetAllItems"

export default function Dashboard ({ username, password }: { username: string, password: string }) {
    const [token, setToken] = useState<{ token: string } | null>(null)
    const [gameData, setGameData] = useState<GameData | null>(null)
    const [playerData, setPlayerData] = useState<Player | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [addPetModalOpen, setAddPetModalOpen] = useState(false)
    const [viewPetsModalOpen, setViewPetsModalOpen] = useState(false)
    const [getAllPetsModalOpen, setGetAllPetsModalOpen] = useState(false)
    const [addItemModalOpen, setAddItemModalOpen] = useState(false)
    const [getAllOfTypeOfItemModalOpen, setGetAllOfTypeOfItemModalOpen] = useState(false)
    const [getAllItemsModalOpen, setGetAllItemsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [saved, setSaved] = useState(false)
    const [saveButtonClicked, setSaveButtonClicked] = useState(false)
    const levelRef = useRef<HTMLInputElement>(null)
    const goldRef = useRef<HTMLInputElement>(null)
    const memberStarsRef = useRef<HTMLInputElement>(null)
    const bountyPointsRef = useRef<HTMLInputElement>(null)
    const winsRef = useRef<HTMLInputElement>(null)
    const lossesRef = useRef<HTMLInputElement>(null)
    const darkTowerRef = useRef<HTMLInputElement>(null)
    const gradeRef = useRef<HTMLInputElement>(null)

    async function handleSubmit (event: React.FormEvent) {
        event.preventDefault()

        if (!saveButtonClicked || !token || !playerData) return

        setSaveButtonClicked(false)

        setLoading(true)
        setModalOpen(true)

        // Level
        playerData.data.level = parseInt(levelRef.current!.value)
        playerData.data.stars = CombatFormulas.xpRequiredForLevel(playerData.data.level)
        // Gold
        playerData.data.gold = parseInt(goldRef.current!.value)
        // Member Stars
        playerData.data.storedMemberStars = parseInt(memberStarsRef.current!.value)
        // Bounty Points
        playerData.data.bountyScore = parseInt(bountyPointsRef.current!.value)
        // Wins
        playerData.data.win = parseInt(winsRef.current!.value)
        // Losses
        playerData.data.loss = parseInt(lossesRef.current!.value)
        // Dark Tower
        playerData.data.tower = parseInt(darkTowerRef.current!.value)
        // Grade
        playerData.data.grade = parseInt(gradeRef.current!.value)

        try {
            const response = await updatePlayerData(token.token, playerData)
            if (response.status === 418) {
                throw new Error("SavingError. Was a Epic added?")
            }
        } catch (e) {
            setLoading(false)
            setError((e as Error).message)
        }
        setLoading(false)
        setSaved(true)
    }

    return (
        <DashboardLoader username={username} password={password} setToken={setToken} setGameData={setGameData} setPlayerData={setPlayerData}>
            {gameData && playerData && (
                <Container className="text-align-center">
                    <h1>Prodigy Account Hacker</h1>
                    <h2>User: {username}</h2>
                    <br />
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Player Data</Card.Title>
                                <Card.Text>
                                    <Form.Group>
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control ref={levelRef} type="number" defaultValue={playerData.getLevel()} max="100" min="1" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Gold</Form.Label>
                                        <Form.Control ref={goldRef} type="number" defaultValue={playerData.getGold()} min="0" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Member Stars</Form.Label>
                                        <Form.Control ref={memberStarsRef} type="number" defaultValue={playerData.data.storedMemberStars} min="0" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Bounty Points</Form.Label>
                                        <Form.Control ref={bountyPointsRef} type="number" defaultValue={playerData.data.bountyScore} max="100" min="0" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Wins</Form.Label>
                                        <Form.Control ref={winsRef} type="number" defaultValue={playerData.getWins()} min="0" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Losses</Form.Label>
                                        <Form.Control ref={lossesRef} type="number" defaultValue={playerData.getLosses()} min="0" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Dark Tower Floor</Form.Label>
                                        <Form.Control ref={darkTowerRef} type="number" defaultValue={playerData.data.tower} max="100" min="1" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Grade</Form.Label>
                                        <Form.Control ref={gradeRef} type="number" defaultValue={playerData.data.grade} max="8" min="1" required />
                                    </Form.Group>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Pets</Card.Title>
                                <Card.Text>
                                    <Button className="me-3" onClick={() => { setAddPetModalOpen(true) }}>Add Pet</Button>
                                    <Modal show={addPetModalOpen} onHide={() => setAddPetModalOpen(false)}>
                                        <AddPet gameData={gameData} player={playerData} />
                                    </Modal>
                                    <Button className="me-3" onClick={() => { setViewPetsModalOpen(true) }}>View and Edit Pets</Button>
                                    <Modal show={viewPetsModalOpen} onHide={() => setViewPetsModalOpen(false)}>
                                        <ViewPets gameData={gameData} player={playerData} />
                                    </Modal>
                                    <Button className="me-3" onClick={() => { setGetAllPetsModalOpen(true) }}>Get All Pets</Button>
                                    <Modal show={getAllPetsModalOpen} onHide={() => setGetAllPetsModalOpen(false)}>
                                        <GetAllPets gameData={gameData} player={playerData} closeModal={() => setGetAllPetsModalOpen(false)} />
                                    </Modal>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <Card.Text>
                                    <Button className="me-3" onClick={() => { setAddItemModalOpen(true) }}>Add Item</Button>
                                    <Modal show={addItemModalOpen} onHide={() => setAddItemModalOpen(false)}>
                                        <AddItem gameData={gameData} player={playerData} />
                                    </Modal>
                                    <Button className="me-3" onClick={() => { setGetAllOfTypeOfItemModalOpen(true) }}>Get All Of...</Button>
                                    <Modal show={getAllOfTypeOfItemModalOpen} onHide={() => setGetAllOfTypeOfItemModalOpen(false)}>
                                        <GetAllOfTypeOfItem gameData={gameData} player={playerData}/>
                                    </Modal>
                                    <Button className="me-3" onClick={() => { setGetAllItemsModalOpen(true) }}>Get All Items</Button>
                                    <Modal show={getAllItemsModalOpen} onHide={() => setGetAllItemsModalOpen(false)}>
                                        <GetAllItems gameData={gameData} player={playerData}/>
                                    </Modal>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Button type="submit" className="mt-3 me-3" onClick={() => setSaveButtonClicked(true)}>Save</Button>
                        <Button className="mt-3" onClick={() => {
                            localStorage.removeItem("username")
                            localStorage.removeItem("password")
                            window.location.reload()
                        }}>Logout</Button>
                    </Form>
                    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                        {loading || error === null ? (saved ? <SavedSuccessfully /> : <LoadingModal />) : <ErrorModal errorMessage={error}/>}
                    </Modal>
                </Container>
            )}
        </DashboardLoader>
    )
}
