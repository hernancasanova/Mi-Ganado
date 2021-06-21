<?php

namespace App\Http\Controllers;

use App\TiposVacuno;
use Illuminate\Http\Request;
use DB;

class TiposVacunoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiposVacunos=DB::table('tipos_vacunos')->select('tipos_vacunos.*')->get();
        return response([
            'tiposVacunos'=> $tiposVacunos,
            'status_code' => 200,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TiposVacuno  $tiposVacuno
     * @return \Illuminate\Http\Response
     */
    public function show(TiposVacuno $tiposVacuno)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TiposVacuno  $tiposVacuno
     * @return \Illuminate\Http\Response
     */
    public function edit(TiposVacuno $tiposVacuno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TiposVacuno  $tiposVacuno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TiposVacuno $tiposVacuno)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TiposVacuno  $tiposVacuno
     * @return \Illuminate\Http\Response
     */
    public function destroy(TiposVacuno $tiposVacuno)
    {
        //
    }
}
