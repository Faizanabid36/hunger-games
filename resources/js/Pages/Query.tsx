import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactType, QueryType } from "../types";
import { Card, Form, Button, Alert, Badge, InputGroup } from "react-bootstrap";
import CustomerCard from "../components/CustomerCard";
import Sensitive from "../components/Sensitive";
import EmailCard from "../components/EmailCard";
import Thread from "../components/Thread";

const Query: React.FC = (): JSX.Element => {
    const params = useParams();
    const [query, setQuery] = useState<QueryType | null>(null);
    const [contact, setContact] = useState<ContactType>(null);
    const [contactExists, setContactExists] = useState<boolean>(true);
    const [usePersonalEmail, setUsePersonalEmail] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [refetchThreads, setRefetchThreads] = useState<number>(0);

    const toggleContactExists = (value: boolean): void => {
        setContactExists(value);
    };

    const refetch = (): void => {
        fetch();
    };

    const fetch = (): void => {
        axios
            .get(`/api/query/${params.id}`)
            .then((res) => {
                setQuery(res.data.query);
                setContactExists(res.data.contactExists);
                setContact(res.data.contact);
            })
            .catch((err) => console.log(err));
    };

    const replyToThread = (e: SyntheticEvent): void => {
        e.preventDefault();
        if (query === null) return;
        axios
            .post("reply", {
                email,
                body,
                id: query.id,
                queryBy: query.sender_email,
            })
            .then((res) => {
                setSuccess(true);
                setError(false);
                setMessage(res.data.message);
                let num = refetchThreads;
                setRefetchThreads(++num);
                window.location.reload()
            })
            .catch((err) => {
                setSuccess(false);
                setError(true);
                setMessage(err.response.data.message);
            });
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    {success && <Alert variant={"success"}>{message}</Alert>}
                    {error && <Alert variant={"warning"}>{message}</Alert>}

                    <Card className="shadow">
                        <Card.Body>
                            <Card.Header>
                                <blockquote className="blockquote my-1">
                                    <Card.Title>
                                        <i>{query?.subject}</i>
                                    </Card.Title>
                                    <hr />
                                    <footer className="my-1">
                                        {query?.body}{" "}
                                    </footer>
                                </blockquote>
                            </Card.Header>
                            {query && (
                                <Thread
                                    refetchThreads={refetchThreads}
                                    sender={query.sender_email}
                                    id={query.id}
                                />
                            )}
                            <Card.Footer>
                                <Form onSubmit={replyToThread}>
                                    <Form.Group
                                        className="mb-1"
                                        controlId="formtitle"
                                    >
                                        <Form.Control
                                            onChange={(event) =>
                                                setBody(event.target.value)
                                            }
                                            placeholder="Enter Your Message Here ..."
                                            as="textarea"
                                            value={body}
                                            style={{ height: "100px" }}
                                        />
                                    </Form.Group>
                                    <Form.Check
                                        type={"checkbox"}
                                        id={`default-checkbox`}
                                        label={`Use My Personal Email`}
                                        className="mb-1"
                                        defaultChecked={usePersonalEmail}
                                        onChange={(e) =>
                                            setUsePersonalEmail(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {!usePersonalEmail ? (
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">
                                                @
                                            </InputGroup.Text>
                                            <Form.Control
                                                placeholder="Email"
                                                aria-label="email"
                                                defaultValue={email}
                                                aria-describedby="basic-addon1"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <Button
                                                className="ms-5 shadow-sm float-end"
                                                variant="success"
                                                onClick={(e) => {
                                                    replyToThread(e);
                                                }}
                                                color={"success"}
                                                type="submit"
                                            >
                                                Reply
                                            </Button>
                                        </InputGroup>
                                    ) : (
                                        <Button
                                            className="ms-5 shadow-sm float-end"
                                            variant="success"
                                            onClick={(e) => {
                                                replyToThread(e);
                                            }}
                                            color={"success"}
                                            type="submit"
                                        >
                                            Reply
                                        </Button>
                                    )}
                                </Form>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    {query && query.extra && (
                        <Sensitive
                            isSensitive={query.extra.is_sensitive}
                            id={query.extra.id}
                            type={query.extra.status}
                            refetch={refetch}
                        />
                    )}
                    {query && query.extra && (
                        <CustomerCard
                            firstName={query.sender_first_name}
                            lastName={query.sender_last_name}
                            email={query.sender_email}
                            contactExists={contactExists}
                            toggleContactExists={toggleContactExists}
                        />
                    )}
                    {query && <EmailCard id={query.id} />}
                </div>
            </div>
        </>
    );
};

export default Query;
