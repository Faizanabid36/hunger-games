<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Query;
use App\Models\QueryExtra;
use App\Models\QueryResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QueryController extends Controller
{

    public function query($id)
    {
        $query = Query::whereId($id)->with(['extra', 'responses'])->first();

        $contact = Contact::whereEmail($query->sender_email)->first();
        $contactExists = !!$contact;
        return compact('query', 'contact', 'contactExists');
    }

    public function queries()
    {
        $queries = Query::with('extra')->withCount('responses')->orderBy('created_at', 'DESC')->get();
        return compact('queries');
    }

    public function queries_by_users()
    {
        $users = \Illuminate\Support\Facades\DB::table('queries')
            ->selectRaw('count(id) as queries_count,id , sender_email, sender_first_name, sender_last_name')
            ->groupBy('sender_email')
            ->get();

        return compact('users');
    }
    public function user_queries($id)
    {
        $queries = \Illuminate\Support\Facades\DB::table('queries as q1')
            ->select('*')
            ->join('queries AS q2', 'q2.sender_email', '=', 'q1.sender_email')
            ->where('q1.id', $id)
            ->get();
        return compact('queries');
    }

    public function save_query(Request $request)
    {
        $this->validate($request, [
            'subject' => 'required',
            'body' => 'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|email',
        ]);
        $query = Query::create([
            'subject' => $request->subject,
            'body' => $request->body,
            'sender_first_name' => ucfirst($request->firstName),
            'sender_last_name' => ucfirst($request->lastName),
            'sender_email' => strtolower($request->email),
        ])->searchable();
        return ['success' => true, 'message' => 'Query has been created', 'query' => $query];
    }

    public function toggle_sensitivity(Request $request, $id)
    {
        QueryExtra::whereId($id)->update(['is_sensitive' => $request->isSensitive]);
        $operation = $request->isSensitive ? 'marked' : 'unmarked';
        return ['success' => true, 'message' => 'Query ' . $operation . ' as sensitive'];
    }

    public function reply(Request $request)
    {
        if (empty($request->email))
            $replyBy = strtolower(auth()->user()->email);
        else
            $replyBy = strtolower($request->email);


        if ($replyBy == strtolower($request->queryBy))
            $queryBy = 'info@gmail.com';
        else
            $queryBy = strtolower($request->queryBy);

        QueryResponse::create([
            'query_id' => $request->id,
            'from' => $replyBy,
            'to' => $queryBy,
            'body' => $request->body
        ])->searchable();

        QueryExtra::whereQueryId($request->id)->update(['status' => 'In process']);

        return ['success' => true, 'message' => 'Response is successfully sent   to query'];
    }

    public function responses($id)
    {
        $responses = QueryResponse::whereQueryId($id)->orderBy('created_at', 'ASC')->get();
        return \compact('responses');
    }

    public function resolve_query(Request $request, $id)
    {
        QueryExtra::whereQueryId($id)->update(['status' => $request->type]);
        return ['success' => true, 'message' => 'Query is now ' . $request->type];
    }

    public function emails($id)
    {
        $query = Query::whereId($id)->with('responses')->first();
        $res = QueryResponse::whereQueryId($query->id)->select('from', 'to')->get();
        $emails = collect($res->toArray())->flatten()->unique()->values();
        return compact('emails');
    }

    public function search($query)
    {

        $queryResults = Query::search($query)->get();
        $responseResults = QueryResponse::search($query)->get();
        $results = collect([$queryResults, $responseResults])->flatten()->all();
        return compact('results');
    }
}
