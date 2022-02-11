import React, { useEffect, useState, useRef } from "react";
import { QueryResponse, QueryResponses } from "../types";
import { Card } from "react-bootstrap";
import axios from "axios";

type PropsType = {
    id: number;
    sender: string;
    refetchThreads?: number;
    children?: React.ReactNode;
};

const Thread: React.FC<PropsType> = ({
    id,
    sender,
}: PropsType): JSX.Element => {
    const [responses, setResponses] = useState<QueryResponses>([]);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetch = (): void => {
        axios
            .get(`/api/query/${id}/respones`)
            .then((res) => {
                setResponses(res.data.responses);
                scrollToBottom();
            })
            .catch((err) => console.log(err.response));
    };
    useEffect(() => {
        fetch();
    }, []);

    return (
        <div
            className="container"
            style={{ height: "250px", overflowY: "scroll" }}
        >
            {responses.length > 0 ? (
                responses.map((item: QueryResponse, index: number) => {
                    return (
                        <div
                            key={item.id}
                            className={`my-3 d-flex justify-content-${
                                sender === item.from ? `start` : `end`
                            }`}
                        >
                            <Card.Text
                                className={`{
                                ${
                                    sender === item.from
                                        ? `bg-light `
                                        : `bg-dark text-white`
                                } p-3 border-bottom shadow-sm rounded`}
                                dangerouslySetInnerHTML={{ __html: item.body }}
                            />
                        </div>
                    );
                })
            ) : (
                <>
                    <Card.Text className="bg-light p-4 mt-1">
                        No one has responded to this query yet.
                    </Card.Text>
                </>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Thread;
