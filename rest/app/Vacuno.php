<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vacuno extends Model
{
    //
    //protected $fillable =["nombre","fecha_nacimiento","sexo","tipo","color","estado", "fecha_venta"];
    public function aretes(){
        return $this->hasMany('App\Arete');
    }
}
