<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Benefice extends Model
{
   protected $fillable = ['monthlyBenefice', 'date', 'totalBenefice'];
}
