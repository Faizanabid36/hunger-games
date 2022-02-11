export type MeetingType = {
    id: number;
    start_time: string;
    end_time: string;
    organizor: string;
    created_at: string;
    updated_at: string;
    notes_count: number;
    notes?: Notes;
};

export type Note = {
    id: number;
    meeting_id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export type QueryType = {
    id: number;
    subject: string;
    body: string;
    sender_first_name: string;
    sender_last_name: string;
    sender_email: string;
    created_at: string;
    updated_at: string;
    responses_count?: number;
    queries_count?: number;
    extra?: QueryExtra;
    responses?: QueryResponses;
};

export type QueryResponse = {
    id: number;
    query_id: number;
    from: string;
    to: string;
    body: string;
    created_at: string;
    updated_at: string;
    subject?: string;
    parent_query: QueryType;
};

export type QueryExtra = {
    id: number;
    query_id: number;
    status: "Open" | "In process" | "Closed" | "Blocked";
    is_sensitive: boolean;
    created_at: string;
    updated_at: string;
};

export type ContactType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
} | null;

export type Notes = Array<Note>;
export type QueryResponses = Array<QueryResponse>;
export type QueriesType = Array<QueryType>;
export type MeetingsType = Array<MeetingType>;
