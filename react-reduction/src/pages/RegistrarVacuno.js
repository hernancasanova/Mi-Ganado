import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Button, FormFeedback, FormGroup, FormText, Input, Label, UncontrolledAlert } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';

const RegistrarVacuno = () => {  
  const registrar_vacuno = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    let sexo = document.getElementById("sexo").value;
    let tipos_vacunos_id = document.getElementById("tipos_vacunos_id").value;
    let raza = document.getElementById("raza").value;
    let estado = document.getElementById("estado").value;
    let fecha_venta = document.getElementById("fecha_venta").value;
    let imagen = document.querySelector('input[type="file"]').files[0];
    var datosVacuno = new FormData();
    datosVacuno.append("nombre",nombre);
    datosVacuno.append("fecha_nacimiento",fecha_nacimiento);
    datosVacuno.append("sexo",sexo);
    datosVacuno.append("tipos_vacunos_id",tipos_vacunos_id);
    datosVacuno.append("raza",raza);
    datosVacuno.append("estado",estado);
    datosVacuno.append("fecha_venta",fecha_venta);
    //formData.append( '_token', csrf_token() );
    datosVacuno.append("imagen_vacuno",imagen);
    //console.log("fecha_venta: ",fecha_venta);
    //console.log("imagen2: ",imagen2);
    //debugger;
    fetch("http://localhost:8000/api/vacunos",{method: 'post', 
    /*headers: {
      'Accept': 'application/json, text/plain, *',
      'Content-Type': 'application/json'
      //'Content-Type': 'application/x-www-form-urlencoded'
    },*/
    //body: JSON.stringify({nombre, fecha_nacimiento, sexo, tipos_vacunos_id, raza, estado, fecha_venta})})
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
            'title': 'Oops...',
            'text': 'Algo salió mal!',
            'confirmButtonText': 'Intentelo nuevamente',
            'footer': '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>'
          })
        }
      })
    .catch(error=>{Swal.fire({
      'icon': 'error',
      'title': 'Oops...',
      'text': 'Algo salió mal!',
      'confirmButtonText': 'Intentelo nuevamente',
      'footer': '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>'
    })});
  }
  const dispatch = useDispatch();
  //useEffect(()=>{
  //   dispatch(actions.listadoAnimales());
  //},[]);
  //const [numero, onChange] = useState(0);
  const [arete_registrado, AreteRegistrado]= useState(false);
  const [vacuno_id, handleSelectChange] = useState("");
  var tipos_vacunos = useSelector(store=>store.vacuno.tipos_vacunos);
  //var url_imagenes = useSelector(store=>store.vacuno.url_imagenes);
  /*const handleSelectChange = (e) => {
    vacuno_id=e.target.value;
  }*/
  if(tipos_vacunos.length===0){
    dispatch(actions.listadoTiposVacunos());
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
              <FormGroup>
                <Label for="nombre">Nombre</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder=""
                />
              </FormGroup>
              <FormGroup>
                <Label for="fecha_nacimiento">Fecha nacimiento</Label>
                <Input
                  type="date"
                  name="fecha_nacimiento"
                  id="fecha_nacimiento"
                  placeholder="Ej: 2021-04-06"
                />
              </FormGroup>
              <FormGroup>
                  <Label for="sexo">Seleccione sexo del vacuno</Label>
                  <Input type="select" id="sexo" name="sexo" onChange={(e)=>handleSelectChange(e.target.value)}>
                      <option val="">Seleccione</option>
                      <option val="1">Macho</option>
                      <option val="2">Hembra</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="tipos_vacunos_id">Seleccione tipo del vacuno a registrar</Label>
                  <Input type="select" id="tipos_vacunos_id" name="tipos_vacunos_id" onChange={(e)=>handleSelectChange(e.target.value)}>
                      <option val="">Seleccione</option>
                  {tipos_vacunos.map(tip_vac=>{
                      return (<option key={tip_vac.id} value={tip_vac.id}>{tip_vac.nombre_tipo_vacuno}</option>);} )}
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="raza">Seleccione raza del vacuno</Label>
                  <Input type="select" id="raza" name="raza" onChange={(e)=>handleSelectChange(e.target.value)}>
                      <option val="">Seleccione</option>
                      <option val="1">Clavel(a)</option>
                      <option val="2">Overo(a)</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="estado">Seleccione estado del vacuno</Label>
                  <Input type="select" id="estado" name="estado" onChange={(e)=>handleSelectChange(e.target.value)}>
                      <option val="">Seleccione</option>
                      <option val="1">Vivo</option>
                      <option val="2">Muerto</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fecha_venta">Fecha venta</Label>
                <Input
                  type="date"
                  name="fecha_venta"
                  id="fecha_venta"
                  placeholder="Ej: 2021-04-06"
                />
              </FormGroup>
              <FormGroup>
                <Label for="imagen_vacuno">Seleccione imagen</Label>
                <Input
                  type="file"
                  name="imagen_vacuno"
                  id="imagen_vacuno"
                  //placeholder="Ej: 2021-04-06"
                />
                <FormText>Tamaño máximo 2 MB</FormText>
              </FormGroup>
              <Button className="ml-10" onClick={registrar_vacuno}>Registrar vacuno</Button>
            </CardBody>
          </Card></>:<PageSpinner />}
        </Col>
      </Row>
    </Page>
  );
}

export default RegistrarVacuno;
