<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
{
    use HasFactory;

    protected $fillable = ['patient_id', 'date_time', 'statut', 'montant'];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
}
