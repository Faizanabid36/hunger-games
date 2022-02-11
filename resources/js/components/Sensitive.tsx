import axios from "axios";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";

type PropTypes = {
    isSensitive: boolean;
    id: number;
    children?: React.ReactNode;
    refetch: () => void;
    type: string;
};

const Sensitive: React.FC<PropTypes> = (props: PropTypes): JSX.Element => {
    const [message, setMessage] = useState<string>("");

    const toggleMarkSensitive = () => {
        axios
            .post(`/toggle_sensitivity/${props.id}`, {
                isSensitive: !props.isSensitive,
            })
            .then((res) => {
                setMessage(res.data.message);
                props.refetch();
            })
            .catch((err) => setMessage(err.response.data.message));
    };
    const toggleStatus = (type: string): void => {
        axios
            .post(`/resolve_query/${props.id}`, {
                type,
            })
            .then((res) => {
                setMessage(res.data.message);
                props.refetch();
            })
            .catch((err) => setMessage(err.response.data.message));
    };

    return (
        <>
            <Card className="mb-3 shadow">
                <Card.Body>
                    {message && <Alert variant={"success"}>{message}</Alert>}
                    <Card.Title>Info</Card.Title>
                    <hr />
                    <Card.Text>
                        This email is{" "}
                        {props.isSensitive ? "sensitive" : "not sensitive"}
                    </Card.Text>
                    <Button
                        variant={props.isSensitive ? "danger" : "primary"}
                        className="shadow-sm"
                        onClick={toggleMarkSensitive}
                    >
                        {props.isSensitive ? "Unmark" : "Mark"} as Sensitive
                    </Button>
                    <Button
                        className="ms-2"
                        variant="warning"
                        onClick={() =>
                            toggleStatus(
                                props.type === "Closed" ? "Open" : "Closed"
                            )
                        }
                    >
                        {props.type === "Closed" ? "Open Query" : "Close Query"}
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default Sensitive;
