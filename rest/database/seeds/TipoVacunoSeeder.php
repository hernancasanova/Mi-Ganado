<?php

use Illuminate\Database\Seeder;

class TipoVacunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoVacunos=[
            ["nombre_tipo_vacuno"=>"ternero"],
            ["nombre_tipo_vacuno"=>"ternera"],
            ["nombre_tipo_vacuno"=>"toro"],
            ["nombre_tipo_vacuno"=>"vaquilla"],
            ["nombre_tipo_vacuno"=>"vaca"],
            ["nombre_tipo_vacuno"=>"buey"],
            ["nombre_tipo_vacuno"=>"novillo"]
        ];
        DB::table("tipos_vacunos")->insert($tipoVacunos);

    }
}
