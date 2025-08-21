<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarMake;
use Illuminate\Http\Request;

class CarMakeController extends Controller
{
    public function index()
    {
        return CarMake::orderBy('name')->get();
    }

    public function show(string $id)
    {
        return CarMake::with('carModels')->findOrFail($id);
    }
}
