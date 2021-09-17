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
            ["nombre_tipo_vacuno"=>"Ternero"],
            ["nombre_tipo_vacuno"=>"Ternera"],
            ["nombre_tipo_vacuno"=>"Toro"],
            ["nombre_tipo_vacuno"=>"Vaquilla"],
            ["nombre_tipo_vacuno"=>"Vaca"],
            ["nombre_tipo_vacuno"=>"Buey"],
            ["nombre_tipo_vacuno"=>"Novillo"]
        ];
        DB::table("tipos_vacunos")->insert($tipoVacunos);

    }
}
