<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVacunosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vacunos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->date('fecha_nacimiento');
            $table->string('sexo');
            $table->unsignedBigInteger('tipos_vacunos_id');
            $table->foreign('tipos_vacunos_id')->references('id')->on('tipos_vacunos')->onDelete('cascade');
            $table->string('color');
            $table->string('estado');
            $table->date('fecha_venta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vacunos');
    }
}
