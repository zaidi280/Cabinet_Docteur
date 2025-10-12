<?php

namespace App\Http\Controllers;

use App\Models\Benefice;
use App\Models\Depense;
use App\Models\Revenu;
use Illuminate\Http\Request;

class BeneficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getLatestBenefice()
    {
        try {
            // Get the latest benefit (monthly and total)
            $latestBenefice = Benefice::latest()->first(); // Fetch the most recent benefice record

            return response()->json($latestBenefice);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Problème de récupération des données', 'message' => $e->getMessage()], 500);
        }
    }
    public function getMonthlyBenefice(Request $request)
{
    try {
        // Récupérer le mois et l'année depuis la requête
        $month = $request->input('month');
        $year = $request->input('year');

        // Vérifier que les paramètres existent
        if (!$month || !$year) {
            return response()->json(['error' => 'Veuillez fournir un mois et une année.'], 400);
        }

        // Calculer les revenus et dépenses du mois sélectionné
        $monthlyRevenue = Revenu::whereMonth('daterev', $month)
            ->whereYear('daterev', $year)
            ->sum('amountrev');

        $monthlyDepenses = Depense::whereMonth('date', $month)
            ->whereYear('date', $year)
            ->sum('amount');

        // Calculer le bénéfice mensuel
        $monthlyBenefice = $monthlyRevenue - $monthlyDepenses;

        return response()->json(['monthlyBenefice' => $monthlyBenefice]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Erreur lors du calcul du bénéfice.', 'message' => $e->getMessage()], 500);
    }
}
public function getTotalBenefice()
{
    try {
        // Calcul du bénéfice total basé sur les revenus et dépenses enregistrés
        $totalRevenue = Revenu::sum('amountrev');
        $totalDepenses = Depense::sum('amount');
        $totalBenefice = $totalRevenue - $totalDepenses;

        return response()->json(['totalBenefice' => $totalBenefice]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Problème de récupération des données', 'message' => $e->getMessage()], 500);
    }
}

}
