<?php

namespace App\Http\Controllers;

use App\Models\Benefice;
use App\Models\Depense;
use App\Models\Revenu;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RevenuController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Retrieve the `pageSize` parameter from the request, default to 10
            $pageSize = $request->input('pageSize', 10);

            // Fetch paginated data
            $revenues = Revenu::paginate($pageSize);

            // Return paginated data as a JSON response
            return response()->json($revenues);
        } catch (\Exception $e) {
            return response()->json("Problème de récupération de la liste des revenue");
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate input (optional but recommended)
            $validatedData = $request->validate([
                'descriptionrev' => 'required|string',
                'amountrev' => 'required|numeric',
                'daterev' => 'required|date',
            ]);

            // Create the revenue
            $revenues = new Revenu([
                'descriptionrev' => $validatedData['descriptionrev'],
                'amountrev' => $validatedData['amountrev'],
                'daterev' => $validatedData['daterev'],
            ]);



            $revenues->save();

            $this->calculateAndStoreBenefice($revenues->daterev);



            // Return the created revenue as JSON response
            return response()->json($revenues);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Problème lors de la création de la revenue', 'message' => $e->getMessage()], 500);
        }
    }


    private function calculateAndStoreBenefice($revenueDate)
    {
        // Get the current month and year from the revenue date
        $month = Carbon::parse($revenueDate)->format('m');
        $year = Carbon::parse($revenueDate)->format('Y');

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
            'date' => Carbon::parse($revenueDate)->format('Y-m-d'),
            'totalBenefice' => $totalBenefice,
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $revenue = Revenu::findOrFail($id);
            return response()->json($revenue);
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
            // Trouver la revenue
            $revenue = Revenu::findOrFail($id);
    
            // Sauvegarder l'ancienne date pour recalculer le bénéfice
            $oldDate = $revenue->daterev;
    
            // Mettre à jour la revenue avec les nouvelles données
            $revenue->update($request->all());
    
            // Recalculer le bénéfice pour l'ancienne et la nouvelle date
            $this->calculateAndStoreBenefice($oldDate);
            $this->calculateAndStoreBenefice($revenue->daterev);
    
            return response()->json($revenue);
        } catch (\Exception $e) {
            return response()->json('Problème lors de la mise à jour des données', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
   {
    try {
        // Trouver la revenue
        $revenue = Revenu::findOrFail($id);

        // Sauvegarder la date avant suppression
        $revenueDate = $revenue->daterev;

        // Supprimer la revenue
        $revenue->delete();

        // Recalculer le bénéfice pour le mois affecté
        $this->calculateAndStoreBenefice($revenueDate);

        return response()->json('Revenue supprimée et bénéfice mis à jour !');
    } catch (\Exception $e) {
        return response()->json('Problème lors de la suppression', 500);
    }
}
    public function getDashboardStats()
    {
        // Get the total income and total expenses for all months
        $revenues = Revenu::sum('amountrev');  // Sum of revenues
        $depenses = Depense::sum('amount');  // Sum of expenses


        return response()->json([
            'totalIncome' => $revenues,
            'totalDepenses' => $depenses,

        ]);
    }

    // Method to fetch the revenue and expenses for a specific month
    public function getMonthlyData(Request $request)
    {
        // Get the selected month and year (default to current month if not provided)
        $month = $request->get('month', Carbon::now()->format('m'));
        $year = $request->get('year', Carbon::now()->format('Y'));

        // Fetch revenue and expense for the specific month and year
        $revenues = Revenu::whereMonth('daterev', $month)->whereYear('daterev', $year)->sum('amountrev');
        $depenses = Depense::whereMonth('date', $month)->whereYear('date', $year)->sum('amount');

        return response()->json([
            'revenues' => $revenues,
            'depenses' => $depenses,
            'month' => $month,
            'year' => $year
        ]);
    }
}
