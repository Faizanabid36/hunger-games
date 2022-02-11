import React, { useState, useEffect, SyntheticEvent } from "react";
import { Modal, ModalProps, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

interface ExtendedModalProps extends ModalProps {
    title: string;
    id?: number;
    url?: string;
}
const ModalForm: React.FC<ExtendedModalProps> = (
    props: ExtendedModalProps
): JSX.Element => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const submitForm = (e: SyntheticEvent): void => {
        e.preventDefault();

        if (props.url) {
            axios
                .post(props.url, { title, description, parentId: props.id })
                .then((res) => {
                    if (res.data.success) {
                        setSuccess(true);
                        setMessage(res.data.message);
                    }
                    if (props.onHide) props.onHide();
                })
                .catch((err) => {
                    setError(true);
                    setMessage(err.response.data.message);
                    console.log("err", err.response);
                });
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success && <Alert variant={"success"}>{message}</Alert>}
                {error && <Alert variant={"warning"}>{message}</Alert>}
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="organizor">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formtitle">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            as="textarea"
                            style={{ height: "125px" }}
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
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        setSuccess(false);
                        setError(false);
                        setMessage("");
                        props.onHide;
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalForm;
