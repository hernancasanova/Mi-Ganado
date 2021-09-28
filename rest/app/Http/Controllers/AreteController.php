<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Arete;
use DB;
use Illuminate\Database\QueryException;
use App\Exceptions\Handler;

class AreteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        try {
            DB::beginTransaction();
            DB::table('aretes')->where('vacuno_id',$request->vacuno_id)->update(['estado'=>'inactivo']);
            DB::table('aretes')->insert([
                ['numero' => $request->numero, 'vacuno_id' => $request->vacuno_id, 'fecha_colocacion' => $request->fecha_colocacion, 'estado'=>'activo']
            ]);
            DB::commit();
            return response()->json([
                'status_code' => 200
            ], 200);
        } catch (QueryException $e) {
            $errorCode = $e->errorInfo[1];
            DB::rollback();
            if($errorCode===1062){
                throw new \Exception("El arete ya se encuentra asociado a un vacuno", 1);
            }
        } 
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
