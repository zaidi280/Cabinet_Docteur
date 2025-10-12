<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $prescriptions = Prescription::all();
            return response()->json($prescriptions); //iraja3 lel user
        } catch (\Exception $e) {
            return response()->json("probléme de récupération de la liste des prescriptions");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $prescription = new Prescription([
                "maladie_id" => $request->input("maladie_id"),
                "medicament" => $request->input("medicament"),
                "dosage" => $request->input("dosage"),


            ]);
            $prescription->save();
            return response()->json($prescription);
        } catch (\Exception $e) {
            return response()->json("insertion impossible");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $prescription = Prescription::findOrFail($id);
            return response()->json($prescription);
        } catch (\Exception $e) {
            return response()->json("probleme de recuperation des données");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $prescription = Prescription::findOrFail($id);
            $prescription->update($request->all());
            return response()->json($prescription);
        } catch (\Exception $e) {
            return response()->json("probleme de modification");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $prescription = Prescription::findOrFail($id);
            $prescription->delete();
            return response()->json("prescription supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de recuperation des données");
        }
    }
}
