<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function save_note(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required'
        ]);

        Note::create([
            'title' => $request->title,
            'description' => $request->description,
            'meeting_id' => $request->parentId,
        ]);
        return ['success' => true, 'message' => 'Note Created'];
    }


    public function delete_note(Request $request)
    {
        Note::whereId($request->id)->delete();
        return ['success' => true, 'message' => 'Note Deleted'];
    }
}
