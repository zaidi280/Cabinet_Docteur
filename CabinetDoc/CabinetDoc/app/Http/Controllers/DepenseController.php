<?php

namespace App\Http\Controllers;

use App\Models\Benefice;
use App\Models\Depense;
use App\Models\Revenu;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DepenseController extends Controller
{


    public function index(Request $request)
    {
        try {
            // Retrieve the `pageSize` parameter from the request, default to 10
            $pageSize = $request->input('pageSize', 10);

            // Fetch paginated data
            $depenses = Depense::paginate($pageSize);

            // Return paginated data as a JSON response
            return response()->json($depenses);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des dépenses");
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $depenses = new Depense([
                "description" => $request->input("description"),
                "amount" => $request->input("amount"),
                "date" => $request->input("date"),
            ]);
            $depenses->save();
            $this->calculateAndStoreBenefice($depenses->date);
            return response()->json($depenses);
        } catch (\Exception $e) {
            return response()->json('Problème lors de la création de la catégorie');
        }
    }

    private function calculateAndStoreBenefice($expenseDate)
    {
        // Get the current month and year from the expense date
        $month = Carbon::parse($expenseDate)->format('m');
        $year = Carbon::parse($expenseDate)->format('Y');

        // Calculate monthly revenue and monthly expenses
        $monthlyRevenue = Revenu::whereMonth('daterev', $month)
            ->whereYear('daterev', $year)
            ->sum('amountrev');
        $monthlyDepenses = Depense::whereMonth('date', $month)
            ->whereYear('date', $year)
            ->sum('amount');

        // Calculate the monthly benefit
        $monthlyBenefice = $monthlyRevenue - $monthlyDepenses;

        // Calculate the total revenue and total expenses
        $totalRevenue = Revenu::sum('amountrev');
        $totalDepenses = Depense::sum('amount');
        $totalBenefice = $totalRevenue - $totalDepenses;

        // Store the benefit in the Benefice table
        Benefice::create([
            'monthlyBenefice' => $monthlyBenefice,
            'date' => Carbon::parse($expenseDate)->format('Y-m-d'),
            'totalBenefice' => $totalBenefice,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $depense = Depense::findOrFail($id);
            return response()->json($depense);
        } catch (\Exception $e) {
            return response()->json('Problème de récupération des données');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $depense = Depense::findOrFail($id);
            $depense->update($request->all());
    
            // Recalculer les bénéfices après mise à jour
            $this->calculateAndStoreBenefice($depense->date);
    
            return response()->json($depense);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Problème de mise à jour de la dépense'], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    try {
        $depense = Depense::findOrFail($id);
        $date = $depense->date; // Sauvegarder la date avant suppression

        $depense->delete();

        // Recalculer les bénéfices après suppression
        $this->calculateAndStoreBenefice($date);

        return response()->json('Dépense supprimée avec succès !');
    } catch (\Exception $e) {
        return response()->json(['error' => 'Problème de suppression de la dépense'], 500);
    }
}

}
