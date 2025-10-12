<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = ['maladie_id','patient_id','medicament', 'dosage'];

    public function maladie()
    {
        return $this->belongsTo(Maladie::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
