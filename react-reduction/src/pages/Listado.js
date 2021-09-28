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
} from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import TablaPaginador from '../components/TablaPaginador';

const Listado = props => {
  const styles = {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    textAlign: 'center',
    verticalAlign: 'middle',
  };
  const [loadingDescarga, cambiaLoadingDescarga] = useState(false);
  const [mostrarAlertEliminar, muestraAlertEliminar] = useState(false);
  const [eliminacionConfirmada, cambiaEliminacionConfirmada] = useState(false);
  var fechaFormateada;
  var vacunos = useSelector(store => store.vacuno.vacunos);
  var loading = useSelector(store => store.vacuno.loading);
  var loadingEliminar = useSelector(store => store.vacuno.loadingEliminar);
  var vacunosBuscados = useSelector(store => store.vacuno.vacunosBuscados);
  var vacunoSeleccionado = useSelector(store => store.vacuno.vacunoEditado);

  useEffect(() => {
    if (loadingDescarga) {
      descargarPdf();
    }
  }, [loadingDescarga]);
  const descargarPdf = () => {
    console.log('Descargando pdf');
    var pdf = new jsPDF('p', 'pt', 'letter');
    var nColumna = 1;
    var ids = [];
    var i = 0;
    //var fecha;
    var tabla = document.getElementById('listVacunos');
    var tablaCopia = tabla.cloneNode(true);
    var filas = tablaCopia.rows;
    for (var j = 0; j < filas.length; j++) {
      filas[j].deleteCell(8);
    }
    var body = [];
    vacunos.forEach((vac, i) => {
      let fila = [
        vac.id,
        'imagen',
        vac.nombre,
        vac.numero ? vac.numero : 'Sin arete',
        vac.fecha_colocacion ? formatoFecha(vac.fecha_colocacion) : 'Sin arete',
        formatoFecha(vac.fecha_nacimiento),
        vac.sexo,
        vac.color,
      ];
      body.push(fila);
    });
    pdf.autoTable({
      //html: tablaCopia,
      head: [
        [
          'N°',
          'Imagen',
          'Nombre',
          'DIIO',
          'Fecha colocación',
          'Fecha nacimiento',
          'Sexo',
          'Color',
        ],
      ],
      body,
      /*body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
        // ...
      ],*/
      columnStyles: {
        0: { cellWidth: 'auto', minCellHeight: 80 },
        1: { cellWidth: 120, minCellHeight: 80 },
        2: { cellWidth: 'auto', minCellHeight: 80 },
        3: { cellWidth: 'auto', minCellHeight: 80 },
        4: { cellWidth: 'auto', minCellHeight: 80 },
        5: { cellWidth: 'auto', minCellHeight: 80 },
        6: { cellWidth: 'auto', minCellHeight: 80 },
        7: { cellWidth: 'auto', minCellHeight: 80 },
      },
      styles: {
        valign: 'middle',
        halign: 'center',
      },
      //bodyStyles: {minCellHeight: 80, minCellWidth: 80},
      includeHiddenHtml: true,
      didParseCell: function (data) {
        if (data.column.index === 0 && data.cell.section === 'body') {
          ids.push(data.cell.text[0]);
          data.cell.text[0] = nColumna.toString();
          nColumna++;
        }
        /*if((data.column.index === 4 && data.cell.section === 'body')||(data.column.index === 5 && data.cell.section === 'body')){
            //data.cell.text[0]=moment(data.cell.text[0], 'DD-MM-YYYY');
            if(data.cell.text[0]!="Sin arete"){
              fecha=data.cell.text[0].split('-');
              data.cell.text[0] = [fecha[2],fecha[1],fecha[0] ].join("-");
            }
          }*/
      },
      didDrawCell: function (data) {
        if (data.column.index === 1 && data.cell.section === 'body') {
          pdf.addImage(
            'http://localhost:8000/api/vacunos/' + ids[i],
            'JPEG',
            data.cell.x + 15,
            data.cell.y + 2,
            80,
            80,
          );
          i++;
        }
      },
    });
    pdf.save('Listado_animales.pdf');
    cambiaLoadingDescarga(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loadingEliminar) {
      Swal.fire({
        icon: 'success',
        title: 'Vacuno eliminado correctamente',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(actions.listadoAnimales());
        }
      });
    }
  }, [loadingEliminar]);
  useEffect(() => {
    dispatch(actions.listadoAnimales());
  }, []);
  useEffect(() => {
    if (!loading && vacunosBuscados && vacunos.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No se encontraron vacunos',
        confirmButtonText: 'Registrar vacuno',
        footer:
          '<a href="javascript:location.reload(true)">Favor recargue la página si existe algun problema</a>',
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          props.history.push('registrar_vacuno');
        }
      });
    }
  }, [vacunosBuscados]);
  const formatoFecha = fecha => {
    fechaFormateada = fecha.split('-');
    return [fechaFormateada[2], fechaFormateada[1], fechaFormateada[0]].join(
      '-',
    );
  };
  useEffect(() => {
    if (mostrarAlertEliminar) {
      Swal.fire({
        icon: 'warning',
        title: '¿Está seguro(a) de eliminar este vacuno?',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(actions.eliminarVacuno(vacunoSeleccionado.id));
          cambiaEliminacionConfirmada(true);
          muestraAlertEliminar(false);
        } else {
          muestraAlertEliminar(false);
        }
      });
    }
  }, [mostrarAlertEliminar]);
  const editarVacuno = vac => {
    dispatch(actions.vacunoSeleccionado(vac));
    props.history.push('editar_vacuno');
  };
  const eliminarVacuno = vac => {
    dispatch(actions.vacunoSeleccionado(vac));
  };
  return (
    <Page
      title="Listado de vacunos"
      breadcrumbs={[{ name: 'listado', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>
              <Button
                disabled={vacunos.length === 0}
                style={{ float: 'right' }}
                className="ml-10"
                onClick={() => {
                  cambiaLoadingDescarga(true);
                }}
              >
                {loadingDescarga ? (
                  <>
                    {'Generando pdf... '}
                    <Spinner />
                  </>
                ) : (
                  'Descargar pdf'
                )}{' '}
              </Button>
            </CardHeader>
            <CardBody>
              {loading ? (
                <PageSpinner texto="Cargando listado" />
              ) : loadingEliminar &&
                eliminacionConfirmada &&
                !mostrarAlertEliminar ? (
                <PageSpinner texto="Eliminando vacuno" />
              ) : (
                <>
                  {/* <Table id="listVacunos">
                    <thead>
                      <tr>
                        <th scope="col" hidden={true}>
                          N°
                        </th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">DIIO</th>
                        <th scope="col">Fecha colocación</th>
                        <th scope="col">Fecha nacimiento</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Color</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacunos.map(vac => {
                        return (
                          <tr key={vac.id}>
                            <td hidden={true}>{vac.id}</td>
                            <td>
                              <img
                                alt={vac.name}
                                height={styles.height}
                                width={styles.width}
                                src={url_imagenes + vac.id + '.jpg'}
                              />
                            </td>
                            <td>{vac.nombre}</td>
                            <td>
                              {vac.numero != null ? vac.numero : 'Sin arete'}
                            </td>
                            <td>
                              {vac.fecha_colocacion != null
                                ? formatoFecha(vac.fecha_colocacion)
                                : 'Sin arete'}
                            </td>
                            <td>{formatoFecha(vac.fecha_nacimiento)}</td>
                            <td>{vac.sexo}</td>
                            <td>{vac.color}</td>
                            <td>
                              <FaPencilAlt
                                cursor="pointer"
                                title="Editar"
                                onClick={() => editarVacuno(vac)}
                              />{' '}
                              <FaTrash
                                cursor="pointer"
                                title="Eliminar"
                                onClick={() => {
                                  eliminarVacuno(vac);
                                  muestraAlertEliminar(true);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table> */}
                  <TablaPaginador
                    vacunos={vacunos}
                    styles={styles}
                    editarVacuno={editarVacuno}
                    eliminarVacuno={eliminarVacuno}
                    formatoFecha={formatoFecha}
                    muestraAlertEliminar={muestraAlertEliminar}
                  />
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Listado;
