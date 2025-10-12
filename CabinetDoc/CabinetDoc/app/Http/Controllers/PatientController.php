<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

class PatientController extends Controller
{
 // 📌 Afficher la liste des patients avec recherche et pagination
 public function index(Request $request)
 {
     try {
         $perPage = $request->input('pageSize', 10);
         $query = Patient::query();

         if ($request->has('search')) {
             $search = $request->input('search');
             $query->where('nom', 'like', "%{$search}%")
                 ->orWhere('prenom', 'like', "%{$search}%")
                 ->orWhere('telephone', 'like', "%{$search}%");
         }

         $patients = $query->paginate($perPage);

         return response()->json([
             'patients' => $patients->items(),
             'totalPages' => $patients->lastPage(),
             'currentPage' => $patients->currentPage(),
             'totalPatients' => $patients->total(),
         ]);
     } catch (\Exception $e) {
         return response()->json(['error' => 'Problème de récupération des patients', 'details' => $e->getMessage()], 500);
     }
 }

 // 📌 Ajouter un nouveau patient
 public function store(Request $request)
 {
     try {
         // Vérification si le numéro de téléphone existe déjà
         if (Patient::where('telephone', $request->input("telephone"))->exists()) {
             return response()->json(["error" => "Le numéro de téléphone existe déjà."], 400);
         }

         $patient = Patient::create($request->all());
         return response()->json($patient);
     } catch (\Exception $e) {
         return response()->json(["error" => "Insertion impossible", "details" => $e->getMessage()], 500);
     }
 }

 // 📌 Afficher un patient spécifique
 public function show($id)
 {
     try {
         $patient = Patient::findOrFail($id);
         return response()->json($patient);
     } catch (\Exception $e) {
         return response()->json(["error" => "Problème de récupération des données", "details" => $e->getMessage()], 500);
     }
 }

 // 📌 Modifier un patient
 public function update(Request $request, $id)
 {
     try {
         $patient = Patient::findOrFail($id);

         // Vérification si le nouveau numéro de téléphone existe déjà chez un autre patient
         if (Patient::where('telephone', $request->input("telephone"))->where('id', '!=', $id)->exists()) {
             return response()->json(["error" => "Le numéro de téléphone est déjà utilisé par un autre patient."], 400);
         }

         $patient->update($request->all());
         return response()->json($patient);
     } catch (\Exception $e) {
         return response()->json(["error" => "Problème de modification", "details" => $e->getMessage()], 500);
     }
 }

 public function import(Request $request)
 {
     try {
         if (!$request->hasFile('file')) {
             return response()->json(["error" => "Aucun fichier fourni"], 400);
         }
 
         $file = $request->file('file');
         $extension = $file->getClientOriginalExtension();
         if (!in_array($extension, ['xls', 'xlsx'])) {
             return response()->json(["error" => "Format de fichier invalide. Veuillez envoyer un fichier Excel."], 400);
         }
 
         // Charger le fichier Excel
         $spreadsheet = IOFactory::load($file->getPathname());
         $worksheet = $spreadsheet->getActiveSheet();
         $rows = $worksheet->toArray();
 
         // Vérifier si le fichier est vide
         if (count($rows) < 2) {
             return response()->json(["error" => "Le fichier Excel est vide"], 400);
         }
 
         // Parcourir les lignes (sauf la première qui est l'en-tête)
         $countInserted = 0;
         $errors = [];
         for ($i = 1; $i < count($rows); $i++) {
             $row = $rows[$i];
 
             // Vérification si le téléphone existe déjà
             if (!Patient::where('telephone', $row[2])->exists()) {
                 try {
                     Patient::create([
                         'nom' => $row[0],
                         'prenom' => $row[1],
                         'telephone' => $row[2],
                         'date_naissance' => $row[3],
                         'adresse' => $row[4]
                     ]);
                     $countInserted++;
                 } catch (\Exception $e) {
                     $errors[] = [
                         'row' => $i + 1,
                         'data' => $row,
                         'error' => $e->getMessage()
                     ];
                 }
             } else {
                 $errors[] = [
                     'row' => $i + 1,
                     'data' => $row,
                     'error' => 'Le numéro de téléphone existe déjà'
                 ];
             }
         }
 
         return response()->json([
             "success" => "Importation réussie",
             "patients_ajoutes" => $countInserted,
             "errors" => $errors
         ]);
     } catch (\Exception $e) {
         return response()->json(["error" => "Erreur lors de l'importation", "details" => $e->getMessage()], 500);
     }
 }
}
