import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner, Button, FormFeedback, FormGroup, FormText, Input, Label, UncontrolledAlert } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

const RegistrarVacuno = () => {  
  /*var datosVacuno = new FormData();
  datosVacuno.append("nombre",nombre);
  datosVacuno.append("fecha_nacimiento",fecha_nacimiento);
  datosVacuno.append("sexo",sexo);
  datosVacuno.append("tipos_vacunos_id",tipos_vacunos_id);
  datosVacuno.append("raza",raza);
  datosVacuno.append("estado",estado);
  datosVacuno.append("fecha_venta",fecha_venta);
  datosVacuno.append("imagen_vacuno",imagen);
  const registrar_vacuno = () => {
    fetch("http://localhost:8000/api/vacunos",{method: 'post',
    body:datosVacuno})
    .then(result => { return result.json() })
    .then(data => {
        if(data.status_code===200){
          Swal.fire({
            'html': "Vacuno agregado correctamente",
            'icon': "success",
            'timer': 4000,
            'confirmButtonText': 'Aceptar'
          });
        }
        else{
          Swal.fire({
            'icon': 'error',
            'title': 'Ups...',
            'text': 'Algo salió mal!',
            'confirmButtonText': 'Intentelo nuevamente',
            'footer': '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>'
          })
        }
      })
    .catch(error=>{Swal.fire({
      'icon': 'error',
      'title': 'ups...',
      'text': 'Algo salió mal!',
      'confirmButtonText': 'Intentelo nuevamente',
      'footer': '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>'
    })});
  }*/
  var tipos_vacunos = useSelector(store=>store.vacuno.tipos_vacunos);
  var loading = useSelector(store=>store.vacuno.loading);
  var vacunoCreated = useSelector(store=>store.vacuno.vacunoCreated);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  /*if(tipos_vacunos.length===0){
    dispatch(actions.listadoTiposVacunos());
  }*/
  useEffect(()=>{
    dispatch(actions.listadoTiposVacunos());
  },[]);
  const onsubmit = data => {
    var nombre = document.getElementById('nombre').value;
    var fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    var sexo = document.getElementById("sexo").value;
    var tipo_vacuno = document.getElementById("tipos_vacunos_id").value;//tipos_vacunos_id
    var raza = document.getElementById("raza").value;
    var estado = document.getElementById("estado").value;
    var fecha_venta = document.getElementById("fecha_venta").value;
    var imagen = document.querySelector('input[type="file"]').files[0];
    dispatch(actions.crearVacuno(nombre, fecha_nacimiento, sexo, tipo_vacuno, raza, estado, fecha_venta, imagen));
  };
  if(vacunoCreated){
    Swal.fire({
      'html': "Vacuno agregado correctamente",
      'icon': "success",
      'timer': 4000,
      'confirmButtonText': 'Aceptar'
    }).then((result)=>{
      if(result.isConfirmed){
        dispatch(actions.reset());
      }
    });
  }
  return (
    <Page
      title="Registrar vacuno"
      breadcrumbs={[{ name: 'registrar_vacuno', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
        {tipos_vacunos.length>0?<>
          <Card className="mb-3">
            <CardHeader> 
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onsubmit)}>
              {/*<input
                        className="form-control my-2"
                        name="nameshrt"
                        {...register("name", { 
                            required:{
                                value: true,
                                message: 'Title required' 
                            }
                        })}   
                    />
                    <span className="text-danger text-small d-block mb-2">
                        {errors.name &&  errors.name.message}
                    </span>*/}
                <FormGroup>
                  <Label for="imagen_vacuno">Seleccione imagen</Label>
                  <Input
                    //{...register("imagen", { required: {value: true, message: "Debe seleccionar una imagen"} })}
                    type="file"
                    name="imagen_vacuno"
                    id="imagen_vacuno"
                    //placeholder="Ej: 2021-04-06"
                  />
                  <FormText>Tamaño máximo 2 MB</FormText>
                  <span className="text-danger text-small d-block mb-2">
                    {errors.imagen &&  errors.imagen.message}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input
                    //type="text"
                    name="nombre"
                    id="nombre"
                    //placeholder=""
                    //onChange={(e)=>handleChange(e.target.value)}
                    //value={nombre}
                    //valid={validNombre(nombre)}
                    //invalid={!validNombre(nombre)}
                    //valid={e=>validNombre(e.target.value)}
                    //valid={nombre.length>6 && nombre.length<15}
                    //invalid={!(nombre.length>6 && nombre.length<15) && nombre.length>0}
                    //invalid={e=>{!validNombre(e.target.value) && nombre.length>0}}
                    {...register("name", { required: {value: true, message: "El campo nombre es requerido"}, maxLength: {value: 12, message: "Máximo de 12 caracteres"}, minLength: {value: 4, message: 'Mínimo 4 caracteres'} })}
                  />
                  <span className="text-danger text-small d-block mb-2">
                    {errors.name &&  errors.name.message}
                  </span>
                  {/*errors.nombre && <span>This field is required</span>*/}
                </FormGroup>
                <FormGroup>
                  <Label for="fecha_nacimiento">Fecha nacimiento</Label>
                  <Input
                    {...register("fecha_nacimiento", { required: {value: true, message: "El campo fecha de nacimiento es requerido"} })}
                    type="date"
                    name="fecha_nacimiento"
                    id="fecha_nacimiento"
                  />
                  <span className="text-danger text-small d-block mb-2">
                    {errors.fecha_nacimiento &&  errors.fecha_nacimiento.message}
                  </span>
                </FormGroup>
                <FormGroup>
                    <Label for="sexo">Sexo</Label>
                    <Input type="select" id="sexo" name="sexo"  
                    {...register("sexo", { required: {value: true, message: "El campo sexo es requerido"} })}>
                  {/*onChange={(e)=>handleSelectChange(e.target.value)}>*/}
                        <option val="">Seleccione</option>
                        <option val="1">Macho</option>
                        <option val="2">Hembra</option>
                    </Input>
                    <span className="text-danger text-small d-block mb-2">
                      {errors.sexo &&  errors.sexo.message}
                    </span>
                </FormGroup>
                <FormGroup>
                    <Label for="tipos_vacunos_id">Tipo</Label>
                    <Input type="select" id="tipos_vacunos_id" name="tipos_vacunos_id"
                    {...register("tipo_vacuno", { required: {value: true, message: "El campo tipo de vacuno es requerido"} })}>
                        <option val="">Seleccione</option>
                    {tipos_vacunos.map(tip_vac=>{
                        return (<option key={tip_vac.id} value={tip_vac.id}>{tip_vac.nombre_tipo_vacuno}</option>);} )}
                    </Input>
                    <span className="text-danger text-small d-block mb-2">
                      {errors.tipo_vacuno &&  errors.tipo_vacuno.message}
                    </span>
                </FormGroup>
                <FormGroup>
                    <Label for="raza">Color</Label>
                    <Input type="select" id="raza" name="raza"
                    {...register("color", { required: {value: true, message: "El campo color es requerido"} })}>
                        <option val="">Seleccione</option>
                        <option val="1">Clavel(a)</option>
                        <option val="2">Overo(a)</option>
                        <option val="3">Blanco(a)</option>
                        <option val="4">Colorado(a)</option>
                        <option val="5">Amarillo(a)</option>
                    </Input>
                    <span className="text-danger text-small d-block mb-2">
                      {errors.color &&  errors.color.message}
                    </span>
                </FormGroup>
                <FormGroup>
                    <Label for="estado">Estado</Label>
                    <Input type="select" id="estado" name="estado"
                    {...register("estado", { required: {value: true, message: "El campo estado es requerido"} })}>
                        <option val="">Seleccione</option>
                        <option val="1">Vivo</option>
                        <option val="2">Muerto</option>
                    </Input>
                    <span className="text-danger text-small d-block mb-2">
                      {errors.estado &&  errors.estado.message}
                    </span>
                </FormGroup>
                <FormGroup>
                  <Label for="fecha_venta">Fecha venta (opcional)</Label>
                  <Input
                    type="date"
                    name="fecha_venta"
                    id="fecha_venta"
                    placeholder="Ej: 2021-04-06"
                  />
                </FormGroup>
                <Button className="ml-10">{!loading?"Registrar vacuno":<>{"Registrando vacuno...  "}<Spinner/></>}</Button>
                </form>
                {/*<form onSubmit={handleSubmit(onsubmit)}>
                    <input
                        className="form-control my-2"
                        name="nameshrt"
                        {...register("name", { 
                            required:{
                                value: true,
                                message: 'Title required' 
                            }
                        })}   
                    />
                    <span className="text-danger text-small d-block mb-2">
                        {errors.name &&  errors.name.message}
                    </span>
                    
                    <button className="btn btn-primary" >Send</button>
                      </form>*/}
            </CardBody>
          </Card></>:<PageSpinner />}
        </Col>
      </Row>
    </Page>
  );
}

export default RegistrarVacuno;
