<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Message::create($request->all());

        return response()->json(['message' => 'Message sent successfully!'], 201);
    }

    public function index()
    {
        return response()->json(Message::orderBy('created_at', 'desc')->get());
    }

    public function markRead($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['read' => true]);
        return response()->json(['message' => 'Marked as read']);
    }

    public function destroy($id)
    {
        Message::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

     public function reply(Request $request, $id)
    {
        $request->validate([
            'reply_message' => 'required|string',
        ]);

        $message = Message::findOrFail($id);

        // Send email
        Mail::raw($request->reply_message, function ($mail) use ($message) {
            $mail->to($message->email)
                 ->subject('Re: Your Message - Portfolio');
        });

        // Mark as read
        $message->update(['read' => true]);

        return response()->json(['message' => 'Reply sent successfully!']);
    }
}