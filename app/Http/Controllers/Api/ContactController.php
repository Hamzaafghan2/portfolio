<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::first());
    }

    public function update(Request $request)
    {
        $contact = Contact::first();
        
        if (!$contact) {
            $contact = Contact::create($request->all());
        } else {
            $contact->update($request->all());
        }

        return response()->json(['message' => 'Contact updated!', 'data' => $contact]);
    }
}