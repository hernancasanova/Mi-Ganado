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
            ["nombre"=>"Toro amarillo","fecha_nacimiento"=>"2019-03-05","sexo"=>"Macho","tipos_vacunos_id"=>"3","color"=>"Amarillo(a)","estado"=>"Vivo"],
        ];
        DB::table("vacunos")->insert($vacunos);
    }
}
