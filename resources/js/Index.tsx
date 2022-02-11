import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import MeetingCreate from "./Pages/MeetingCreate";
import Meetings from "./Pages/Meetings";
import Query from "./Pages/Query";
import QueryCreate from "./Pages/QueryCreate";
import Contacts from "./Pages/Contacts";
import ContactCreate from "./Pages/ContactCreate";
import Queries from "./Pages/Queries";
import UserQueries from "./Pages/UserQueries";
import SingleUserQueries from "./Pages/SingleUserQueries";
import SearchResults from "./Pages/SearchResults";

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<App />} />
                <Route path="queries" element={<Queries />} />
                <Route path="q/:text" element={<SearchResults />} />
                <Route path="meetings" element={<Meetings />} />
                <Route path="query/:id" element={<Query />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="contact/create" element={<ContactCreate />} />
                <Route path="query/create" element={<QueryCreate />} />
                <Route path="user_queries" element={<UserQueries />} />
                <Route
                    path="user/queries/:id"
                    element={<SingleUserQueries />}
                />
                <Route path="meeting/create" element={<MeetingCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById("root")) {
    ReactDOM.render(<Index />, document.getElementById("root"));
}
