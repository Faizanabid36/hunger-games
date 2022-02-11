import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { QueriesType, QueryType } from "../types";

const UserQueries: React.FC = (): JSX.Element => {
    const [queries, setQueries] = useState<QueriesType>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        axios
            .get("/api/queries_by_users")
            .then((res) => setQueries(res.data.users))
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <>
            {message && <Alert variant={"success"}>{message}</Alert>}
            <div className="d-flex justify-content-between">
                <h1>Queries</h1>
                <Button variant="primary" size={"sm"}>
                    <Link
                        className="text-white text-decoration-none py-0"
                        to="/query/create"
                    >
                        Add Query
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
                                <th>Queries </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((item: QueryType, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.sender_first_name}</td>
                                        <td>{item.sender_last_name}</td>
                                        <td>{item.sender_email}</td>
                                        <td>{item.queries_count}</td>
                                        <td>
                                            <Button
                                                color="success"
                                                variant="success"
                                            >
                                                <Link
                                                    className="text-white text-decoration-none py-0"
                                                    to={`/user/queries/${item.id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default UserQueries;
