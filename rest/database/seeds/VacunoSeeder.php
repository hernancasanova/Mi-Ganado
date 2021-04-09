<?php

use Illuminate\Database\Seeder;

class VacunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vacunos=[
            ["nombre"=>"Clavela mañosa","fecha_nacimiento"=>"2017-11-15","sexo"=>"Hembra","tipos_vacunos_id"=>"5","raza"=>"clavela","estado"=>"vivo"],
            ["nombre"=>"Muñeca","fecha_nacimiento"=>"2015-12-18","sexo"=>"Hembra","tipos_vacunos_id"=>"5","raza"=>"clavela","estado"=>"vivo"]
            //["nombre"=>"ternero","fecha_nacimiento"=>"","sexo"=>"","tipos_vacunos_id"=>"","raza"=>"","estado"=>"","fecha_venta"=>""]
            //["nombre"=>"ternero","fecha_nacimiento"=>"","sexo"=>"","tipos_vacunos_id"=>"","raza"=>"","estado"=>"","fecha_venta"=>""],
            //["nombre"=>"ternero","fecha_nacimiento"=>"","sexo"=>"","tipos_vacunos_id"=>"","raza"=>"","estado"=>"","fecha_venta"=>""],
        ];
        DB::table("vacunos")->insert($vacunos);
    }
}
