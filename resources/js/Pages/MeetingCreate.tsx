import React, { SyntheticEvent, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const MeetingCreate: React.FC = () => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [organizor, setOrganizor] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        axios
            .post("/save_meeting", { organizor, startTime, endTime })
            .then((res) => {
                if (res.data.success) {
                    setSuccess(true);
                    setMessage(res.data.message);
                }
            })
            .catch((err) => {
                setError(true);
                setMessage(err.response.data.message);
            });
    };
    return (
        <>
            {success && <Alert variant={"success"}>{message}</Alert>}
            {error && <Alert variant={"warning"}>{message}</Alert>}

            <Card style={{ width: "90%", margin: "0 auto" }}>
                <Card.Body>
                    <Card.Title>Add new meeting</Card.Title>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="organizor">
                            <Form.Label>Organizor</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setOrganizor(event.target.value)
                                }
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setStartTime(event.target.value)
                                }
                                type="datetime-local"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEndTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setEndTime(event.target.value)
                                }
                                type="datetime-local"
                            />
                        </Form.Group>
                        <Button
                            onClick={() => submitForm}
                            variant="success"
                            color={"success"}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default MeetingCreate;
