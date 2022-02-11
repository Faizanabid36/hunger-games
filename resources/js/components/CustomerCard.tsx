import axios from "axios";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";

type CustomerCardProps = {
    children?: React.ReactNode;
    contactExists: boolean;
    firstName: string;
    lastName: string;
    email: string;
    toggleContactExists: (arg: boolean) => void;
};
const CustomerCard: React.FC<CustomerCardProps> = ({
    firstName,
    lastName,
    email,
    contactExists,
    toggleContactExists,
}: CustomerCardProps): JSX.Element => {
    const [success, setSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const storeContact = () => {
        axios
            .post("/save_contact", { firstName, lastName, email })
            .then((res) => {
                setSuccess(true);
                setMessage(res.data.message);
                toggleContactExists(true);
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <>
            <Card className="shadow">
                <Card.Body>
                    {success && <Alert variant={"success"}>{message}</Alert>}
                    <Card.Title>Customer</Card.Title>
                    <hr />
                    {!contactExists ? (
                        <>
                            <Card.Text>
                                This customer is not present in contacts.
                            </Card.Text>
                            <Button
                                className="shadow-sm"
                                variant="success"
                                onClick={storeContact}
                            >
                                Click to Add
                            </Button>
                        </>
                    ) : (
                        <div className="container">
                            <div className="row mt-2">
                                <div className="col-md-5">
                                    <strong>First Name:</strong>
                                </div>
                                <div className="col-md-7">{firstName}</div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-5">
                                    <strong>Last Name:</strong>
                                </div>
                                <div className="col-md-7">{lastName}</div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-5">
                                    <strong>Email:</strong>
                                </div>
                                <div className="col-md-7">{email}</div>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default CustomerCard;
