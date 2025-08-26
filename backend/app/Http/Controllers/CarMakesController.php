<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CarMakesController extends Controller
{
    /**
     * Display a list of all car makes.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $carMakes = CarMake::all();

        return response()->json($carMakes);
    }

    /**
     * Store a newly created car make.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:car_makes,name',
            'slug' => 'required|string|max:255|unique:car_makes,slug',
        ]);

        $carMake = CarMake::create($request->all());

        return response()->json($carMake, 201);
    }

    /**
     * Update the specified car make.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $carMake = CarMake::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('car_makes')->ignore($carMake->id)],
            'slug' => ['required', 'string', 'max:255', Rule::unique('car_makes')->ignore($carMake->id)],
        ]);

        $carMake->update($request->all());

        return response()->json($carMake);
    }

    /**
     * Remove the specified car make.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $carMake = CarMake::findOrFail($id);
        $carMake->delete();

        return response()->json(null, 204);
    }
}