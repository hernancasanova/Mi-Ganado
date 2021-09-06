<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAretesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aretes', function (Blueprint $table) {
            $table->id();
            $table->string('numero');
            $table->unsignedBigInteger('vacuno_id');
            $table->foreign('vacuno_id')->references('id')->on('vacunos')->onDelete('cascade');
            $table->date('fecha_colocacion');
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
        Schema::dropIfExists('aretes');
    }
}
