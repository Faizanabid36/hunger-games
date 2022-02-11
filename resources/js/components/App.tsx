import React from "react";
import { Link } from "react-router-dom";
import { cards } from "../links";

export default function App() {
    return (
        <div className="row mt-5">
            {cards.map((item: any, index: number) => {
                return (
                    <div className="col-md-4" key={index}>
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.text}</p>
                                <button className="btn btn-primary">
                                    <Link
                                        className="text-white text-decoration-none"
                                        to={item.link}
                                    >
                                        {item.linkText}
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
