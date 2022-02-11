import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { QueriesType } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";

const SearchResults: React.FC = (): JSX.Element => {
    const params = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState<QueriesType>([]);

    const badgeColor = (item: string): string => {
        let badge = "dark";
        switch (item) {
            case "query":
                badge = "primary";
                break;
            case "sub-query":
                badge = "success";
                break;
        }
        return badge;
    };

    useEffect(() => {
        axios
            .get(`/search/${params.text}`)
            .then((res) => setResults(res.data.results))
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between">
                <Button
                    variant="outline-dark"
                    style={{ height: "40px", marginTop: "10px" }}
                    onClick={() => navigate(-1)}
                >
                    Go back
                </Button>
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
                                <th>Link</th>
                                <th>Subject</th>
                                <th>Body</th>
                                <th>Query/Sub-Query</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link
                                                to={`/query/${
                                                    item.query_id ?? item.id
                                                }`}
                                            >
                                                Query#{" "}
                                                {item.query_id ?? item.id}
                                            </Link>
                                        </td>
                                        <td>{item?.subject ?? "---"}</td>
                                        <td>{item?.body ?? "---"}</td>
                                        <td>
                                            <Badge
                                                className="p-2"
                                                bg={badgeColor(
                                                    item.query_id
                                                        ? "sub-query"
                                                        : "query"
                                                )}
                                            >
                                                {item.query_id
                                                    ? "Sub-query"
                                                    : "Query"}
                                            </Badge>
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

export default SearchResults;
