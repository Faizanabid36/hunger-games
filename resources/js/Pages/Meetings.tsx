import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { MeetingsType, MeetingType } from "../types";
import ModalForm from "../components/ModalForm";

const Meetings: React.FC = (): JSX.Element => {
    const [meetings, setMeetings] = useState<MeetingsType>([]);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number>(0);
    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        fetch();
    }, [modalShow]);

    const fetch = (): void => {
        axios
            .get("/api/meetings")
            .then((res) => {
                setMeetings(res.data.meetings);
            })
            .catch((err) => console.log(err));
    };
    const onClickHandler = (e: any): void => {
        if (e.target.nodeName === "BUTTON") return;
        const hiddenElement = e.currentTarget.nextSibling;
        hiddenElement.className.indexOf("collapse show") > -1
            ? hiddenElement.classList.remove("show")
            : hiddenElement.classList.add("show");
    };

    const deleteNote = (id: number): void => {
        axios
            .post(`/delete_note`, { id })
            .then((res) => {
                if (res.data.success) {
                    setMessage(res.data.message);
                    fetch();
                }
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <>
            {message && <Alert variant={"success"}>{message}</Alert>}
            <div className="d-flex justify-content-between">
                <h1>Meetings</h1>
                <Button variant="primary" size={"sm"}>
                    <Link
                        className="text-white text-decoration-none py-0"
                        to="/meeting/create"
                    >
                        Add Meeting
                    </Link>
                </Button>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                    <Table striped responsive bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Organizor</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Notes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.map(
                                (item: MeetingType, index: number) => {
                                    return (
                                        <>
                                            <tr
                                                key={index}
                                                onClick={onClickHandler}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{item.organizor}</td>
                                                <td>{item.start_time}</td>
                                                <td>{item.end_time}</td>
                                                <td>{item.notes_count}</td>
                                                <td>
                                                    <Button
                                                        color="success"
                                                        variant="success"
                                                        onClick={() => {
                                                            setModalShow(true);
                                                            setSelectedId(
                                                                item.id
                                                            );
                                                        }}
                                                    >
                                                        Add Note
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr className="collapse">
                                                {item.notes_count ? (
                                                    <td colSpan={6}>
                                                        {item.notes &&
                                                            item.notes.map(
                                                                (
                                                                    note,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            className="container"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <h3>
                                                                                {
                                                                                    note.title
                                                                                }
                                                                            </h3>
                                                                            <p>
                                                                                {
                                                                                    note.description
                                                                                }
                                                                            </p>
                                                                            <Button
                                                                                color="danger"
                                                                                variant="danger"
                                                                                onClick={() =>
                                                                                    deleteNote(
                                                                                        note.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                Delete
                                                                            </Button>
                                                                            <hr />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </td>
                                                ) : (
                                                    <td colSpan={6}>
                                                        <div className="container">
                                                            <div className="d-flex justify-content-between">
                                                                <h2 className="text-danger">
                                                                    No note
                                                                    attached
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        </>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <ModalForm
                title={"Create Note"}
                url={"save_note"}
                id={selectedId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default Meetings;
