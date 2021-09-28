import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
  Button,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import * as actions from '../actions/AreteActions';
import * as vacunoActions from '../actions/VacunoActions';
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const RegistrarArete = props => {
  /*const registrar_arete = () => {
    let numero = document.getElementById('diio').value;
    let khbkvacuno_id = document.getElementById('jbjbvacuno_id').value;
    let fecha_colocacion = document.getElementById("fecha_colocacion").value;
    fetch("http://localhost:8000/api/aretes",{method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, *',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({numero, ytfugyvacuno_id, fecha_colocacion})})
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
  }*/
  //useEffect(()=>{
  //   dispatch(actions.listadoAnimales());
  //},[]);
  //const [numero, onChange] = useState(0);
  //const [arete_registrado, AreteRegistrado]= useState(false);
  /*const handleSelectChange = (e) => {
    console.log("ID: ",e.target.value);
  }*/
  /*useEffect(()=>{
     dispatch(actions.crearVacuno(nombre, fecha_nacimiento, sexo, tipo, color, estado, fechaVenta));
  },[]);*/
  /*if(vacunos.length===0){
    dispatch(vacunoActions.listadoAnimales());
  }*/
  /*useEffect(()=>{
    if(!hayVacunos && vacunos.length===0){
      Swal.fire({
        'icon': 'error',
        'title': 'No existen vacunos aún',
        'text': 'Debe registrar un vacuno antes de un arete',
        'confirmButtonText': 'Registrar vacuno',
        'allowOutsideClick': false
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("YENDO A CREAR VACUNO");
          props.history.push("registrar_vacuno");
        }
      })
    }
  },[loadingVacunos]);*/
  //var numero = document.getElementById('diio').value;
  //var ihiuhvacuno_id = document.getElementById('ytfgyuvacuno_id').value;
  //var fecha_colocacion = document.getElementById("fecha_colocacion").value;
  const [vacuno_id, handleSelectChange] = useState('');
  var vacunos = useSelector(store => store.vacuno.vacunos);
  var loading = useSelector(store => store.arete.loading);
  var errores = useSelector(store => store.arete.errores);
  var loadingVacunos = useSelector(store => store.vacuno.loading);
  var url_imagenes = useSelector(store => store.vacuno.url_imagenes);
  var vacunosBuscados = useSelector(store => store.vacuno.vacunosBuscados);
  var areteCreado = useSelector(store => store.arete.areteCreado);
  //var vtyfguvacuno_id="";
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(vacunoActions.listadoAnimales());
  }, []);
  const onsubmit = data => {
    dispatch(
      actions.crearArete(data.numero, data.vacuno, data.fecha_colocacion),
    );
  };
  if (vacunosBuscados && vacunos.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'No se encontraron vacunos',
      text: 'Debe registrar un vacuno antes de un arete',
      confirmButtonText: 'Registrar vacuno',
      footer:
        '<a href="javascript:location.reload(true)">Por favor recargue la página si el problema persiste</a>',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        props.history.push('registrar_vacuno');
      }
    });
  }
  useEffect(() => {
    if (areteCreado) {
      Swal.fire({
        html: 'Arete agregado correctamente',
        icon: 'success',
        timer: 4000,
        confirmButtonText: 'Aceptar',
      });
    } else if (!loading && errores !== '') {
      Swal.fire({
        html: errores,
        icon: 'error',
        timer: 4000,
        confirmButtonText: 'Aceptar',
      });
    }
  }, [loading]);
  return (
    <Page
      title="Registrar arete"
      breadcrumbs={[{ name: 'registrar_arete', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
          {!loadingVacunos ? (
            <>
              <Card className="mb-3">
                <CardHeader></CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit(onsubmit)}>
                    <FormGroup>
                      <Label for="diio">DIIO</Label>
                      <Input
                        type="text"
                        name="numero"
                        id="diio"
                        placeholder="Ej: 019017472"
                        {...register('numero', {
                          required: {
                            value: true,
                            message: 'El campo DIIO es requerido',
                          },
                          maxLength: { value: 9, message: 'Máximo 9 dígitos' },
                          minLength: { value: 9, message: 'Mínimo 9 dígitos' },
                        })}
                      />
                      <span className="text-danger text-small d-block mb-2">
                        {errors.numero && errors.numero.message}
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <Label for="fecha_colocacion">Fecha colocación</Label>
                      <Input
                        type="date"
                        name="fecha_colocacion"
                        id="fecha_colocacion"
                        placeholder="Ej: 2021-04-06"
                        {...register('fecha_colocacion', {
                          required: {
                            value: true,
                            message: 'La fecha de colocación es requerida',
                          },
                        })}
                      />
                      <span className="text-danger text-small d-block mb-2">
                        {errors.fecha_colocacion &&
                          errors.fecha_colocacion.message}
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <Label for="">Seleccione vacuno a asignar el arete</Label>
                      <Input
                        type="select"
                        name="vacuno_id"
                        {...register('vacuno', {
                          required: {
                            value: true,
                            message: 'El vacuno es requerido',
                          },
                        })}
                        onChange={e => {
                          handleSelectChange(e.target.value);
                        }}
                      >
                        <option val="">Seleccione</option>
                        {vacunos.map(vac => {
                          return (
                            <option key={vac.id} value={vac.id}>
                              {vac.nombre}
                            </option>
                          );
                        })}
                      </Input>
                      <span className="text-danger text-small d-block mb-2">
                        {errors.vacuno && errors.vacuno.message}
                      </span>
                    </FormGroup>
                    {vacuno_id && (
                      <FormGroup>
                        <Label for="">Vacuno seleccionado:</Label>{' '}
                        <img
                          alt=""
                          height={100}
                          width={100}
                          src={url_imagenes + vacuno_id + '.jpg'}
                        />
                      </FormGroup>
                    )}
                    <Button className="ml-10">
                      {!loading ? (
                        'Registrar arete'
                      ) : (
                        <>
                          {'Registrando arete...  '}
                          <Spinner />
                        </>
                      )}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </>
          ) : (
            <PageSpinner />
          )}
        </Col>
      </Row>
    </Page>
  );
};

export default RegistrarArete;
