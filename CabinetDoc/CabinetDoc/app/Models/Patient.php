<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'telephone', 'date_naissance', 'adresse'];

    public function rendezVous()
    {
        return $this->hasMany(RendezVous::class);
    }

    public function maladies()
    {
        return $this->hasMany(Maladie::class);
    }
    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }
}
