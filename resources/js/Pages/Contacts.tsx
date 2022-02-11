import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { ContactType } from "../types";

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [message, setMessage] = useState<string>("");

    const deleteContact = (id: number): void => {
        if (id === 0) return;
        axios
            .post(`contact/delete/${id}`)
            .then((res) => {
                setMessage(res.data.message);
                fetch();
            })
            .catch((err) => setMessage(err.response.data.message));
    };

    const fetch = (): void => {
        axios
            .get("api/contacts")
            .then((res) => setContacts(res.data.contacts))
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            {message && <Alert variant={"success"}>{message}</Alert>}
            <div className="d-flex justify-content-between">
                <h1>Contacts</h1>
                <Button variant="primary" size={"sm"}>
                    <Link
                        className="text-white text-decoration-none py-0"
                        to="/contact/create"
                    >
                        Add Contact
                    </Link>
                </Button>
            </div>

            <div className="row mt-2">
                <div className="col-md-12">
                    <Table striped responsive bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts &&
                                contacts.map(
                                    (item: ContactType, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.first_name}</td>
                                                <td>{item?.last_name}</td>
                                                <td>{item?.email}</td>
                                                <td>
                                                    <Button
                                                        color="danger"
                                                        variant="danger"
                                                        onClick={() =>
                                                            deleteContact(
                                                                item?.id ?? 0
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Contacts;
