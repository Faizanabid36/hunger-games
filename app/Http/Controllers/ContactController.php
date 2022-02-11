<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function contacts()
    {
        $contacts = Contact::all();
        return compact('contacts');
    }

    public function save_contact(Request $request)
    {
        $contact = Contact::create([
            'first_name' => ucfirst($request->firstName),
            'last_name' => ucfirst($request->lastName),
            'email' => strtolower($request->email),
        ]);
        return ['success' => true, 'message' => 'Contact saved successfully', 'contact' => $contact];
    }

    public function delete_contact($id)
    {
        Contact::whereId($id)->delete();
        $contacts = Contact::all();
        $message = 'Contact Deleted';
        return compact('contacts', 'message');
    }
}
