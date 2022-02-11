<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function save_meeting(Request $request)
    {
        $this->validate($request, [
            'organizor' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
        ]);
        $meeting = Meeting::create([
            'organizor' => $request->organizor,
            'start_time' => $request->startTime,
            'end_time' => $request->endTime,
        ]);
        return ['success' => true, 'message' => 'Meeting created', 'meeting' => $meeting];
    }

    public function meetings()
    {
        $meetings = Meeting::with('notes')->get();
        return compact('meetings');
    }
}
