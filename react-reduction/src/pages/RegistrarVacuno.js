import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
  Button,
  FormGroup,
  Input,
  Label,
  FormText,
} from 'reactstrap';
import * as Yup from 'yup';
import * as actions from '../actions/VacunoActions';
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import {
  VACUNO_CREATE_REQUEST,
  VACUNO_EDIT_REQUEST,
} from '../actionstypes/types';
import { Formik } from 'formik';
import { FaInfo } from 'react-icons/fa';
const RegistrarVacuno = props => {
  //var contenidoImagen = document.getElementById('imagen_vacuno').value;
  // const styles = {
  //   // exampleImageInput: {
  //   //   cursor: 'pointer',
  //   //   position: 'absolute',
  //   //   top: '0',
  //   //   bottom: '0',
  //   //   right: '0',
  //   //   left: '0',
  //   //   width: '100%',
  //   //   opacity: '0',
  //   // },
  //   imagen_vacuno: {
  //     display: 'none',
  //   },
  //   boton_imagen_vacuno: {
  //     border: '1px solid #ccc',
  //     display: 'inline-block',
  //     padding: '6px 12px',
  //     cursor: 'pointer',
  //     backgroundColor: '#fb2a55',
  //     color: 'white',
  //     borderRadius: '0.25rem',
  //   },
  // };
  var tipos_vacunos = useSelector(store => store.vacuno.tipos_vacunos);
  var url_imagenes = useSelector(store => store.vacuno.url_imagenes);
  var loading = useSelector(store => store.vacuno.loading);
  var errores = useSelector(store => store.vacuno.errores);
  var vacunoCreatedEdited = useSelector(
    store => store.vacuno.vacunoCreatedEdited,
  );
  var vacunoEditado = useSelector(store => store.vacuno.vacunoEditado);
  const [nombre, cambiaNombre] = useState(vacunoEditado.nombre);
  const [fecha_nacimiento, cambiaFechaNacimiento] = useState(
    vacunoEditado.fecha_nacimiento,
  );
  const [sexo, cambiaSexo] = useState(vacunoEditado.sexo);
  const [tipo, cambiaTipo] = useState(vacunoEditado.tipo);
  const [color, cambiaColor] = useState(vacunoEditado.color);
  const [estado, cambiaEstado] = useState(vacunoEditado.estado);
  const [fechaVenta, cambiaFechaVenta] = useState(vacunoEditado.fechaVenta);
  var accion;
  if (vacunoEditado.id > 0) {
    accion = VACUNO_EDIT_REQUEST;
  } else {
    accion = VACUNO_CREATE_REQUEST;
  }
  const esquemaValidacion = Yup.object().shape({
    nombre: Yup.string()
      .min(4, 'Mínimo 4 caracteres')
      .max(16, 'Máximo 16 caracteres')
      .required('El campo nombre es requerido'),
    fecha_nacimiento: Yup.string().required(
      'El campo fecha de nacimiento es requerido',
    ),
    sexo: Yup.string().required('El campo sexo es requerido'),
    tipo: Yup.number().required('El campo tipo es requerido'),
    color: Yup.string().required('El campo color es requerido'),
    estado: Yup.string().required('El campo estado es requerido'),
    //email: Yup.string().email('Invalid email').required('Required'),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (tipos_vacunos.length === 0) {
      dispatch(actions.listadoTiposVacunos()); //se ejecuta una sola vez porque al primer render actualiza el store y la condición nunca más se ejecuta
    }
  }, []);
  if (vacunoCreatedEdited && !loading) {
    Swal.fire({
      html:
        vacunoEditado.id > 0
          ? 'Vacuno editado correctamente'
          : 'Vacuno agregado correctamente',
      icon: 'success',
      timer: 4000,
      confirmButtonText: 'Aceptar',
    }).then(result => {
      if (result.isConfirmed) {
        props.history.push('listado_vacunos');
      }
    });
  }
  useEffect(() => {
    if (!loading && errores) {
      Swal.fire({
        html: errores,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [loading]);
  return (
    <Page
      title={vacunoEditado.id > 0 ? 'Editar vacuno' : 'Registrar vacuno'}
      breadcrumbs={[
        {
          name: vacunoEditado.id > 0 ? 'editar' : 'registrar',
          active: true,
        },
      ]}
      className="TablePage"
    >
      <Row>
        <Col>
          {tipos_vacunos.length > 0 ? (
            <>
              <Card className="mb-3">
                <CardBody>
                  <Formik
                    enableReinitialize
                    validateOnBlur={false}
                    //validateOnChange={false}
                    validationSchema={esquemaValidacion}
                    initialValues={{
                      id: vacunoEditado.id,
                      nombre,
                      fecha_nacimiento,
                      sexo,
                      tipo,
                      color,
                      estado,
                      fechaVenta,
                      imagen_vacuno: '',
                    }}
                    validate={values => {
                      const errors = {};
                      let imagen =
                        document.querySelector('input[type="file"]').files[0];
                      if (!imagen && vacunoEditado.id === 0) {
                        errors.imagen_vacuno = 'Debe seleccionar una imagen';
                      }
                      return errors;
                    }}
                    onSubmit={values => {
                      var nombre = values.nombre;
                      var fecha_nacimiento = values.fecha_nacimiento;
                      var sexo = values.sexo;
                      var tipo = values.tipo;
                      var color = values.color;
                      var estado = values.estado;
                      var fechaVenta =
                        document.getElementById('fechaVenta').value;
                      let imagen =
                        document.querySelector('input[type="file"]').files[0];
                      dispatch(
                        actions.crearEditarVacuno(
                          vacunoEditado.id,
                          nombre,
                          fecha_nacimiento,
                          sexo,
                          tipo,
                          color,
                          estado,
                          fechaVenta,
                          imagen,
                          accion,
                        ),
                      );
                    }}
                  >
                    {props => (
                      <form onSubmit={props.handleSubmit}>
                        <FormGroup>
                          {vacunoEditado.id > 0 ? (
                            <>
                              <Label for="">Imagen actual: </Label>
                              {'               '}
                              <img
                                alt={vacunoEditado.id + '.jpg'}
                                height={100}
                                width={100}
                                src={
                                  url_imagenes +
                                  vacunoEditado.id +
                                  '.jpg?dummy=' +
                                  Math.random() * 1000
                                }
                              />
                              {/* <Button
                                    style={styles.boton_imagen_vacuno}
                                    type="button"
                                  >
                                    Seleccione una nueva imagen
                                  </Button>
                                  <Input
                                    id="imagen_vacuno"
                                    style={styles.imagen_vacuno}
                                    type="file"
                                  /> */}
                              <br />
                              <br />
                              <Label for="">Seleccione una nueva imagen</Label>
                              <Input
                                id="imagen_vacuno"
                                name="imagen_vacuno"
                                //style={styles.imagen_vacuno}
                                type="file"
                              />
                              <FormText>
                                <FaInfo />
                                {'   '}
                                La imagen seleccionada reemplazará la actual
                                imagen
                              </FormText>
                            </>
                          ) : (
                            <>
                              <Label for="imagen_vacuno">
                                Seleccione imagen
                              </Label>
                              <Input
                                type="file"
                                name="imagen_vacuno"
                                id="imagen_vacuno"
                              />
                            </>
                          )}
                          {props.errors.imagen_vacuno && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.imagen_vacuno}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="nombre">Nombre</Label>
                          <Input
                            type="text"
                            onChange={e => {
                              cambiaNombre(e.target.value);
                            }}
                            value={props.values.nombre}
                            name="nombre"
                            id="nombre"
                          />
                          {props.errors.nombre && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.nombre}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="fecha_nacimiento">Fecha nacimiento</Label>
                          <Input
                            type="date"
                            onChange={e => {
                              cambiaFechaNacimiento(e.target.value);
                            }}
                            value={props.values.fecha_nacimiento}
                            name="fecha_nacimiento"
                            id="fecha_nacimiento"
                          />
                          {props.errors.fecha_nacimiento && (
                            <span className="text-danger text-small d-block mb-9">
                              {props.errors.fecha_nacimiento}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="sexo">Sexo</Label>
                          <Input
                            type="select"
                            id="sexo"
                            name="sexo"
                            onChange={e => {
                              cambiaSexo(e.target.value);
                            }}
                            value={props.values.sexo}
                          >
                            <option val="">Seleccione</option>
                            <option val="1">Macho</option>
                            <option val="2">Hembra</option>
                          </Input>
                          {props.errors.sexo && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.sexo}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="tipo">Tipo</Label>
                          <Input
                            type="select"
                            id="tipo"
                            name="tipo"
                            onChange={e => {
                              cambiaTipo(e.target.value);
                            }}
                            value={props.values.tipo}
                          >
                            <option val="">Seleccione</option>
                            {tipos_vacunos.map(tip_vac => {
                              return (
                                <option key={tip_vac.id} value={tip_vac.id}>
                                  {tip_vac.nombre_tipo_vacuno}
                                </option>
                              );
                            })}
                          </Input>
                          {props.errors.tipo && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.tipo}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="color">Color</Label>
                          <Input
                            type="select"
                            id="color"
                            name="color"
                            onChange={e => {
                              cambiaColor(e.target.value);
                            }}
                            value={props.values.color}
                          >
                            <option val="">Seleccione</option>
                            <option val="1">Clavel(a)</option>
                            <option val="2">Overo(a)</option>
                            <option val="3">Blanco(a)</option>
                            <option val="4">Colorado(a)</option>
                            <option val="5">Amarillo(a)</option>
                          </Input>
                          {props.errors.color && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.color}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="estado">Estado</Label>
                          <Input
                            type="select"
                            id="estado"
                            name="estado"
                            onChange={e => {
                              cambiaEstado(e.target.value);
                            }}
                            value={props.values.estado}
                          >
                            <option val="">Seleccione</option>
                            <option val="1">Vivo</option>
                            <option val="2">Muerto</option>
                          </Input>
                          {props.errors.estado && (
                            <span className="text-danger text-small d-block mb-2">
                              {props.errors.estado}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label for="fechaVenta">Fecha venta (opcional)</Label>
                          <Input
                            type="date"
                            name="fechaVenta"
                            id="fechaVenta"
                            placeholder="Ej: 2021-04-06"
                            onChange={e => {
                              cambiaFechaVenta(e.target.value);
                            }}
                            value={props.values.fechaVenta}
                          />
                        </FormGroup>
                        <Button type="submit" className="ml-10">
                          {vacunoEditado.id > 0 ? (
                            !loading ? (
                              'Editar vacuno'
                            ) : (
                              <>
                                {'Editando vacuno...  '}
                                <Spinner />
                              </>
                            )
                          ) : !loading ? (
                            'Registrar vacuno'
                          ) : (
                            <>
                              {'Registrando vacuno...  '}
                              <Spinner />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </Formik>
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

export default RegistrarVacuno;
