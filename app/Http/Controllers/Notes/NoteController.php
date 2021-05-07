<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notes;

class NoteController extends Controller
{
    public function store(){
        $note = Notes::create([
            'subject_id' => request('subject_id'),
            'title' => request('title'),
            'slug' => \Str::slug(request('title')),
            'description' => request('description')
        ]);

        return response()->json([
            'message' => "your note was created",
            'note' => $note,
        ]);
    }
}
