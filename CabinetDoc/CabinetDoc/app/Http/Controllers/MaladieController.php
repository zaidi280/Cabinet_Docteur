<?php

namespace App\Http\Controllers;

use App\Models\Maladie;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class MaladieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $nom_maladie = $request->query('nom_maladie');
    $name = $request->query('name');
    $description = $request->query('description');
    $medicament = $request->query('medicament');
    $dosage = $request->query('dosage');
    $pageSize = $request->query('pageSize', 10); // Default page size to 10 if not provided
    $page = $request->query('page', 1); // Default page to 1 if not provided

    $maladies = Maladie::with('patient')
        ->when($nom_maladie, function ($query) use ($nom_maladie) {
            return $query->where('nom_maladie', 'like', '%' . $nom_maladie . '%');
        })
        ->when($name, function ($query) use ($name) {
            return $query->whereHas('patient', function ($query) use ($name) {
                $query->where('nom', 'like', '%' . $name . '%')
                    ->orWhere('prenom', 'like', '%' . $name . '%');
            });
        })
        ->when($description, function ($query) use ($description) {
            return $query->where('description', 'like', '%' . $description . '%');
        })
        ->when($medicament, function ($query) use ($medicament) {
            return $query->where('medicament', 'like', '%' . $medicament . '%');
        })
        ->when($dosage, function ($query) use ($dosage) {
            return $query->where('dosage', 'like', '%' . $dosage . '%');
        })
        ->paginate($pageSize);

    return response()->json([
        'maladies' => $maladies->items(),  // Return the paginated items
        'totalPages' => $maladies->lastPage(),
        'totalMaladies' => $maladies->total(),
        'currentPage' => $maladies->currentPage(),
    ]);
}
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $maladie = new Maladie([
                "patient_id" => $request->input("patient_id"),
                "nom_maladie" => $request->input("nom_maladie"),
                "description" => $request->input("description"),
                "medicament" => $request->input("medicament"),
                "dosage" => $request->input("dosage"),


            ]);
            $maladie->save();
            return response()->json($maladie);
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
            // Load the rendez-vous with the related patient information
            $maladies = Maladie::with('patient')->findOrFail($id);

            // Return the rendez-vous data along with the patient's nom and prenom
            return response()->json([
                'maladies' => $maladies,
                'patient_nom' => $maladies->patient->nom, // Access the patient's nom
                'patient_prenom' => $maladies->patient->prenom // Access the patient's prenom
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
            $maladies = Maladie::findOrFail($id);
            $maladies->update([
                'nom_maladie' => $request->input('nom_maladie'),
                'description' => $request->input('description'),
                'medicament' => $request->input('medicament'),
                'dosage' => $request->input('dosage'),
            ]);
            return response()->json($maladies);
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
            $maladie = Maladie::findOrFail($id);
            $maladie->delete();
            return response()->json("maladie supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de recuperation des données");
        }
    }
    public function generatePdf($id)
    {
        try {
            $maladie = Maladie::findOrFail($id);
            $pdf = Pdf::loadView('maladies.pdf', compact('maladie'));
            return $pdf->download('maladie-' . $maladie->id . '.pdf');
        } catch (\Exception $e) {
            return response()->json("probléme de génération du PDF");
        }
    }
}
