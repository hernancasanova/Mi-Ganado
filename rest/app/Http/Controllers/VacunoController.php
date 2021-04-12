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
        //ALMACENAR IMAGEN
        //echo $request;
        $insertGetId=DB::table('vacunos')->insertGetId(
            ['nombre' => $_POST['nombre'], 'fecha_nacimiento' => $_POST['fecha_nacimiento'], 'sexo' => $_POST['sexo'], 'tipos_vacunos_id' => $_POST['tipos_vacunos_id'], 'raza' => $_POST['raza'], 'estado' => $_POST['estado'], 'fecha_venta' => $_POST['fecha_venta']]);
        //$insertGetId=DB::table('vacunos')->insertGetId(
            //['nombre' => $request->nombre, 'fecha_nacimiento' => $request->fecha_nacimiento, 'sexo' => $request->sexo, 'tipos_vacunos_id' => $request->tipos_vacunos_id, 'raza' => $request->raza, 'estado' => $request->estado, 'fecha_venta' => $request->fecha_venta]);
        //DB::table('vacunos')->insert([
          //  ['nombre' => $request->nombre, 'fecha_nacimiento' => $request->fecha_nacimiento, 'sexo' => $request->sexo, 'tipos_vacunos_id' => $request->tipos_vacunos_id, 'raza' => $request->raza, 'estado' => $request->estado, 'fecha_venta' => $request->fecha_venta]
        //]);
        //$imagen=$request->file('imagen_vacuno');
        //$nombre_imagen = $imagen->getClientOriginalName();
        //$extension_imagen = $imagen->getClientOriginalExtension();
        //$request->file('imagen_vacuno')->storeAs('imagenes', $insertGetId.'.'.$extension_imagen);
        //request()->file('imagen_vacuno')->move(storage_path('imagenes'), $nombre_imagen.'.'.$extension_imagen);
        $request->file('imagen_vacuno')->storeAs('public/imagenes',$insertGetId.".jpg");
        //$_FILES['imagen_vacuno']->storeAs('imagenes',$insertGetId.'.jpg');
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
    public function show(Vacuno $vacuno)
    {
        //
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
