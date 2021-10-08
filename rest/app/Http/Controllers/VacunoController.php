<?php

namespace App\Http\Controllers;

use App\Vacuno;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str; 
use Carbon\Carbon;

class VacunoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vacunos1=DB::table("vacunos")
                    ->leftJoin('aretes','vacunos.id','=','aretes.vacuno_id')
                    ->select('vacunos.id','vacunos.nombre','vacunos.fecha_nacimiento','vacunos.sexo','vacunos.tipos_vacunos_id as tipo','vacunos.color','vacunos.estado','vacunos.fecha_venta',DB::raw('DATE(MAX(aretes.created_at)) as fecha_colocacion'),DB::raw('MAX(aretes.created_at) as created_at'))//ESTA FUNCIONA
                    ->groupBy('vacunos.id','vacunos.nombre','vacunos.fecha_nacimiento','vacunos.sexo','tipo','vacunos.color','vacunos.estado','vacunos.fecha_venta');//FUNCIONA
        $vacunos = DB::table('aretes')
                    ->select('aretes.numero','fechaUltimosAretes.*')
                    ->rightJoinSub($vacunos1, 'fechaUltimosAretes', function ($join) {
                      $join->on('aretes.created_at', '=', 'fechaUltimosAretes.created_at');
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
        $vacunos=Vacuno::all();
        $vacuno=DB::table("vacunos")->select('vacunos.*')->where("vacunos.nombre",$request->nombre)->first();
        if(isset($vacuno)){
            throw new \Exception("El vacuno ya se encuentra ingresado", 1);
        }
        $fecha_venta=request()->get('fecha_venta')===''?null:request()->get('fecha_venta');
        $insertGetId=DB::table('vacunos')->insertGetId(
           ['nombre' => $request->nombre, 'fecha_nacimiento' => $request->fecha_nacimiento, 'sexo' => $request->sexo, 'tipos_vacunos_id' => $request->tipo_vacuno, 'color' => $request->color, 'estado' => $request->estado, 'fecha_venta' => $fecha_venta]);
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
        $fechaVenta=$request->fechaVenta===''?null:$request->fechaVenta;
        $vacunoActualizado=DB::table('vacunos')
              ->where('id', $request->id)
              ->update(['nombre' => $request->nombre,
                        'fecha_nacimiento' => $request->fecha_nacimiento,
                        'sexo'=>$request->sexo,
                        'tipos_vacunos_id'=>$request->tipo,
                        'color'=>$request->color,
                        'estado'=>$request->estado,
                        'fecha_venta'=>$fechaVenta,
                        //'updated_at' =>'now()'
                        ]);
        if($request->file('imagen_vacuno')!=null){
            $request->file('imagen_vacuno')->storeAs('public/imagenes',$request->id.".jpg");
        }
        return response()->json([
            'status_code' => 200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('vacunos')->where('id', '=', $id)->delete();
        return response()->json([
            'status_code' => 200
        ], 200);
    }
}
