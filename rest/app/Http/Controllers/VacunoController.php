<?php

namespace App\Http\Controllers;

use App\Vacuno;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str; 

class VacunoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vacunos=Vacuno::all();
        return response([
            'vacunos'=> $vacunos,
            'status_code' => 200,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $insertGetId=DB::table('vacunos')->insertGetId(
            ['nombre' => $_POST['nombre'], 'fecha_nacimiento' => $_POST['fecha_nacimiento'], 'sexo' => $_POST['sexo'], 'tipos_vacunos_id' => $_POST['tipos_vacunos_id'], 'raza' => $_POST['raza'], 'estado' => $_POST['estado'], 'fecha_venta' => $_POST['fecha_venta']]);
        $request->file('imagen_vacuno')->storeAs('public/imagenes',$insertGetId.".jpg");
        return response()->json([
            "_FILES" => $_FILES,
            "_POST" => $_POST,
            'status_code' => 200
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vacuno  $vacuno
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Storage::disk('imagenes')->get($id.'.jpg'))->header('Content-Type', 'image/png');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vacuno  $vacuno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vacuno $vacuno)
    {
        //
        return response()->json([
            "request" => $request,
            'status_codeput' => 200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vacuno  $vacuno
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vacuno $vacuno)
    {
        //
    }
}
