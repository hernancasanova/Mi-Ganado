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
        $vacunos=DB::table("vacunos")
                    ->leftJoin('aretes','vacunos.id','=','aretes.vacuno_id')
                    ->select('vacunos.id','vacunos.nombre','vacunos.fecha_nacimiento','vacunos.sexo','vacunos.tipos_vacunos_id','vacunos.raza','vacunos.estado','vacunos.fecha_venta',DB::raw('MAX(aretes.fecha_colocacion) as fecha_colocacion'))//ESTA FUNCIONA
                    ->groupBy('vacunos.id','vacunos.nombre','vacunos.fecha_nacimiento','vacunos.sexo','vacunos.tipos_vacunos_id','vacunos.raza','vacunos.estado','vacunos.fecha_venta');//FUNCIONA
        $vacunos = DB::table('aretes')
                   ->select('aretes.numero','fechaUltimosAretes.*')
                  ->rightJoinSub($vacunos, 'fechaUltimosAretes', function ($join) {
                      $join->on('aretes.fecha_colocacion', '=', 'fechaUltimosAretes.fecha_colocacion');
                  })
                  ->get();
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
        $fecha_venta=request()->get('fecha_venta')===''?null:request()->get('fecha_venta');
        $insertGetId=DB::table('vacunos')->insertGetId(
            //['nombre' => $_POST['nombre'], 'fecha_nacimiento' => $_POST['fecha_nacimiento'], 'sexo' => $_POST['sexo'], 'tipos_vacunos_id' => $_POST['tipos_vacunos_id'], 'raza' => $_POST['raza'], 'estado' => $_POST['estado'], 'fecha_venta' => $fecha_venta]);
           ['nombre' => $request->nombre, 'fecha_nacimiento' => $request->fecha_nacimiento, 'sexo' => $request->sexo, 'tipos_vacunos_id' => $request->tipo_vacuno, 'raza' => $request->raza, 'estado' => $request->estado, 'fecha_venta' => $fecha_venta]);
        $request->file('imagen_vacuno')->storeAs('public/imagenes',$insertGetId.".jpg");
        return response()->json([
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
