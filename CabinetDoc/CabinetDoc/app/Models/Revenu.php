<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenu extends Model
{
    use HasFactory;

    protected $fillable = ['descriptionrev', 'amountrev', 'daterev'];
    protected $casts = [
        'daterev' => 'datetime',
    ];
}
