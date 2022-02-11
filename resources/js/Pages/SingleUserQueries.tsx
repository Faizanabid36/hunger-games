import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { QueriesType, QueryType } from "../types";

const Queries: React.FC = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();

    const [queries, setQueries] = useState<QueriesType>([]);
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        axios
            .get(`/api/user_queries/${params.id}`)
            .then((res) => setQueries(res.data.queries))
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <>
            {message && <Alert variant={"success"}>{message}</Alert>}
            <div className="d-flex justify-content-between">
                <Button
                    variant="primary"
                    size={"sm"}
                    onClick={() => navigate(-1)}
                >
                    Go back
                </Button>
            </div>

            <div className="row mt-2">
                <div className="col-md-12">
                    <Table striped responsive bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Subject</th>
                                <th>Sender</th>
                                <th>Sender Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((item: QueryType, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.subject}</td>
                                        <td>
                                            {item.sender_first_name +
                                                " " +
                                                item.sender_last_name}
                                        </td>
                                        <td>{item.sender_email}</td>
                                        <td>
                                            <Button
                                                color="success"
                                                variant="success"
                                            >
                                                <Link
                                                    className="text-white text-decoration-none py-0"
                                                    to={`/query/${item.id}`}
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

export default Queries;
