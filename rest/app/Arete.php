<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Arete extends Model
{
    public function vacuno(){
        return $this->belongsTo('App\Vacuno');
    }
}
