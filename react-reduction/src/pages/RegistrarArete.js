import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Button, FormFeedback, FormGroup, FormText, Input, Label, UncontrolledAlert } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import ganado_vacuno from '../../src/assets/img/logo/019017472.jpg';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';

const RegistrarArete = () => {  
  const registrar_arete = () => {
    let numero = document.getElementById('diio').value;
    let vacuno_id = document.getElementById('vacuno_id').value;
    let fecha_colocacion = document.getElementById("fecha_colocacion").value;
    fetch("http://localhost:8000/api/aretes",{method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, *',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({numero, vacuno_id, fecha_colocacion})})
    .then(result => { return result.json() })
    .then(data => {
        if(data.status_code===200){
          Swal.fire({
            'html': "Arete agregado correctamente",
            'icon': "success",
            'timer': 4000,
            'confirmButtonText': 'Aceptar'
        });
        }
      })
    .catch(error=>{console.log("error en crear arete: ",error)});
  }
  const dispatch = useDispatch();
  //useEffect(()=>{
  //   dispatch(actions.listadoAnimales());
  //},[]);
  //const [numero, onChange] = useState(0);
  const [arete_registrado, AreteRegistrado]= useState(false);
  const [vacuno_id, handleSelectChange] = useState("");
  var vacunos = useSelector(store=>store.vacuno.vacunos);
  var url_imagenes = useSelector(store=>store.vacuno.url_imagenes);
  /*const handleSelectChange = (e) => {
    vacuno_id=e.target.value;
  }*/
  if(vacunos.length===0){
    dispatch(actions.listadoAnimales());
  }
  return (
    <Page
      title="Registrar arete"
      breadcrumbs={[{ name: 'registrar_arete', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
        {vacunos.length>0?<>
          <Card className="mb-3">
            <CardHeader> 
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label for="diio">DIIO</Label>
                <Input
                  type="number"
                  name="numero"
                  id="diio"
                  placeholder="Ej: 019017472"
                />
              </FormGroup>
              <FormGroup>
                <Label for="fecha_colocacion">Fecha colocación</Label>
                <Input
                  type="date"
                  name="fecha_colocacion"
                  id="fecha_colocacion"
                  placeholder="Ej: 2021-04-06"
                />
              </FormGroup>
              {/*<SelectVacuno />*/}
              <FormGroup>
                  <Label for="vacuno_id">Seleccione vacuno a asignar el arete</Label>
                  <Input type="select" id="vacuno_id" name="vacuno_id" onChange={(e)=>handleSelectChange(e.target.value)}>
                      <option val="">Seleccione</option>
                  {vacunos.map(vac=>{
                      return (<option key={vac.id} value={vac.id}>{vac.nombre}</option>);} )}
                  </Input>
              </FormGroup>
              {vacuno_id!=="" && <FormGroup>
                  <Label for="">Vacuno seleccionado:</Label>{' '}
                  <img height={100} width={100} src={url_imagenes+vacuno_id+".jpg"}/>
              </FormGroup>}
              <Button className="ml-10" onClick={registrar_arete}>Registrar arete</Button>
            </CardBody>
          </Card></>:<PageSpinner />}
        </Col>
      </Row>
    </Page>
  );
}

export default RegistrarArete;
