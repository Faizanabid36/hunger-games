import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const Searchbar: React.FC = (): JSX.Element => {
    const [text, setText] = useState<string>("");
    const searchQueries = (): void => {
        window.location.href = `/q/${text}`;
    };
    return (
        <>
            <InputGroup
                style={{ width: "75%", marginTop: "10px", marginBottom: "8px" }}
            >
                <Form.Control
                    className="shadow-sm"
                    placeholder="Enter text here..."
                    onChange={(event) => setText(event.target.value)}
                    type="search"
                />
                <Button
                    variant="outline-success"
                    id="button-addon1"
                    onClick={searchQueries}
                >
                    Search
                </Button>
            </InputGroup>
        </>
    );
};

export default Searchbar;
