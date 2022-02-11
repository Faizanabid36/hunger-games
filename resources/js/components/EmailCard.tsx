import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

type PropsType = {
    id: number;
};

const EmailCard: React.FC<PropsType> = ({ id }: PropsType): JSX.Element => {
    const [emails, setEmails] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get(`/emails/${id}`)
            .then((res) => setEmails(res.data.emails))
            .catch((err) => console.log(err.response));
    }, []);
    return (
        <>
            <Card className="shadow mt-2">
                <Card.Body>
                    <Card.Title>Emails in thread</Card.Title>
                    <hr />
                    <div className="container">
                        {emails.map((item, index) => {
                            return (
                                <div key={index} className="row mt-2">
                                    <div className="col-md-12">
                                        <strong>{item}</strong>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default EmailCard;
