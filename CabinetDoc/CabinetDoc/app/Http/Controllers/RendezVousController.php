<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use Illuminate\Http\Request;

class RendezVousController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $date = $request->query('date');
        $name = $request->query('name');
        $montant = $request->query('montant');
        $status = $request->query('status');

        $pageSize = $request->query('pageSize', 10); // Default page size to 10 if not provided
        $page = $request->query('page', 1); // Default page to 1 if not provided

        // Query the rendezVous, including the patient data and applying filters
        $rendezVous = RendezVous::with('patient')
            ->when($date, function ($query) use ($date) {
                return $query->whereDate('date_time', $date);
            })
            ->when($name, function ($query) use ($name) {
                return $query->whereHas('patient', function ($query) use ($name) {
                    $query->where('nom', 'like', '%' . $name . '%')
                        ->orWhere('prenom', 'like', '%' . $name . '%');
                });
            })
            ->when($status, function ($query) use ($status) {
                return $query->where('statut', $status);
            })
            ->when($montant, function ($query) use ($montant) {
                return $query->where('montant', $montant);
            })
            ->paginate($pageSize);

        return response()->json([
            'rendezVous' => $rendezVous->items(),
            'totalPages' => $rendezVous->lastPage(),
            'totalrendezVous' => $rendezVous->total(),
            'currentPage' => $rendezVous->currentPage(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $dateTime = $request->input("date_time");

            // Vérifier si un rendez-vous existe déjà à la même date et heure
            $existingRdv = RendezVous::where('date_time', $dateTime)->first();

            if ($existingRdv) {
                return response()->json([
                    "error" => "Un rendez-vous existe déjà à cette date et heure."
                ], 400);
            }

            // Créer et enregistrer le rendez-vous
            $rendezVous = new RendezVous([
                "patient_id" => $request->input("patient_id"),
                "date_time" => $dateTime,
                "montant" => $request->input("montant"),
                "statut" => "planifié", // Default status
            ]);
            $rendezVous->save();

            return response()->json($rendezVous);
        } catch (\Exception $e) {
            return response()->json(["error" => "Insertion impossible"], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // Load the rendez-vous with the related patient information
            $rendezVous = RendezVous::with('patient')->findOrFail($id);

            // Return the rendez-vous data along with the patient's nom and prenom
            return response()->json([
                'rendezVous' => $rendezVous,
                'patient_nom' => $rendezVous->patient->nom, // Access the patient's nom
                'patient_prenom' => $rendezVous->patient->prenom // Access the patient's prenom
            ]);
        } catch (\Exception $e) {
            return response()->json("Probleme de recuperation des données");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $rendezVous = RendezVous::findOrFail($id);
            $rendezVous->update([
                'date_time' => $request->input('date_time'),
                'montant' => $request->input('montant'),
            ]);
            return response()->json($rendezVous);
        } catch (\Exception $e) {
            return response()->json("Problème de modification");
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $rendezVous = RendezVous::findOrFail($id);
            $rendezVous->delete();
            return response()->json("rendezVous supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de recuperation des données");
        }
    }
    public function markAsDone($id)
    {
        $rendezVous = RendezVous::findOrFail($id);
        $rendezVous->update(['statut' => 'terminé']);
        return response()->json($rendezVous);
    }
}
