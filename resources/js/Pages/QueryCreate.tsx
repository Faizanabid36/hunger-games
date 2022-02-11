import React, { SyntheticEvent, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const QueryCreate: React.FC = (): JSX.Element => {
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const submitForm = (e: SyntheticEvent): void => {
        e.preventDefault();
        axios
            .post("/save_query", { firstName, lastName, email, subject, body })
            .then((res) => {
                if (res.data.success) {
                    setSuccess(true);
                    setError(false);
                    window.location.reload();
                    setMessage(res.data.message);
                }
            })
            .catch((err) => {
                setError(true);
                setSuccess(false);
                setMessage(err.response.data.message);
            });
    };
    return (
        <>
            {success && <Alert variant={"success"}>{message}</Alert>}
            {error && <Alert variant={"warning"}>{message}</Alert>}

            <Card style={{ width: "85%", margin: "0 auto" }}>
                <Card.Body>
                    <Card.Title>Add new query</Card.Title>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setSubject(event.target.value)
                                }
                                type="text"
                                value={subject}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formDescription"
                        >
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setBody(event.target.value)
                                }
                                value={body}
                                as="textarea"
                                placeholder="Start writing Query here"
                                style={{ height: "100px" }}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Form.Group
                                className="mb-3 w-25"
                                controlId="firstName"
                            >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    value={firstName}
                                    onChange={(event) =>
                                        setFirstName(event.target.value)
                                    }
                                    placeholder="First name"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 w-25"
                                controlId="lastName"
                            >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    value={lastName}
                                    onChange={(event) =>
                                        setLastName(event.target.value)
                                    }
                                    placeholder="Last name"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 w-25" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Email"
                                    type="email"
                                />
                            </Form.Group>
                        </div>
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

export default QueryCreate;
