import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { QueriesType, QueryType } from "../types";
import Searchbar from "../components/Searchbar";

const Queries: React.FC = (): JSX.Element => {
    const [queries, setQueries] = useState<QueriesType>([]);
    const [message, setMessage] = useState<string>("");

    const badgeColor = (item: string): string => {
        let badge = "dark";
        switch (item) {
            case "Open":
                badge = "warning";
                break;
            case "Closed":
                badge = "success";
                break;
            case "In process":
                badge = "primary";
                break;
            case "Blocked":
                badge = "danger";
                break;
        }
        return badge;
    };

    useEffect(() => {
        axios
            .get("api/queries")
            .then((res) => setQueries(res.data.queries))
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <>
            {message && <Alert variant={"success"}>{message}</Alert>}
            <div className="d-flex justify-content-between">
                <h1>Queries</h1>
                <Searchbar />
                <Button
                    variant="primary"
                    size={"sm"}
                    className="shadow-sm"
                    style={{ height: "40px", marginTop: "10px" }}
                >
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
                                <th>Subject</th>
                                <th>Sender</th>
                                <th>Sender Email</th>
                                <th>Status</th>
                                <th>Info</th>
                                <th>Query Responses</th>
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
                                            <Badge
                                                className="p-2"
                                                bg={badgeColor(
                                                    item.extra?.status ?? ""
                                                )}
                                            >
                                                {item.extra?.status ?? ""}
                                            </Badge>
                                        </td>
                                        <td>
                                            {item.extra && (
                                                <Badge
                                                    className="p-2"
                                                    bg={
                                                        item.extra?.is_sensitive
                                                            ? "danger"
                                                            : "dark"
                                                    }
                                                    pill
                                                >
                                                    {item.extra?.is_sensitive
                                                        ? "Sensitive"
                                                        : "Normal"}
                                                </Badge>
                                            )}
                                        </td>
                                        <td>{item.responses_count}</td>
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
