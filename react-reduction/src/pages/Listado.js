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
  Input,
} from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import TablaPaginador from '../components/TablaPaginador';
import Label from 'reactstrap/lib/Label';
import SearchInput from '../components/SearchInput';

const Listado = props => {
  const styles = {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    textAlign: 'center',
    verticalAlign: 'middle',
  };
  var fechaFormateada;
  var vacunosReducer = useSelector(store => store.vacuno.vacunos);
  var loading = useSelector(store => store.vacuno.loading);
  var loadingEliminar = useSelector(store => store.vacuno.loadingEliminar);
  var vacunosBuscados = useSelector(store => store.vacuno.vacunosBuscados);
  var vacunoSeleccionado = useSelector(store => store.vacuno.vacunoEditado);
  const [loadingDescarga, cambiaLoadingDescarga] = useState(false);
  const [mostrarAlertEliminar, muestraAlertEliminar] = useState(false);
  const [eliminacionConfirmada, cambiaEliminacionConfirmada] = useState(false);
  const [vacunos, actualizaListadoVacunos] = useState(vacunosReducer);

  useEffect(() => {
    if (loadingDescarga) {
      descargarPdf();
    }
  }, [loadingDescarga]);
  const filtrarVacunos = e => {
    var vacunosFiltrados = vacunosReducer.filter(vacuno => {
      if (vacuno.nombre.includes(e.target.value)) {
        return vacuno;
      } else if (vacuno.numero !== null) {
        if (vacuno.numero.includes(e.target.value)) {
          return vacuno;
        }
        return null;
      } else {
        return null;
      }
    });
    actualizaListadoVacunos(vacunosFiltrados);
  };
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
    vacunosReducer.forEach((vac, i) => {
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
    if (!loading && vacunosBuscados && vacunosReducer.length === 0) {
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
    } else {
      actualizaListadoVacunos(vacunosReducer);
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
  const [vacunosPorPagina, cambiaVacPorPagina] = useState(2);
  return (
    <Page
      title="Listado de vacunos"
      breadcrumbs={[{ name: 'listado', active: true }]}
      className="TablePage"
    >
      <Card className="mb-3">
        <CardHeader>
          <Row>
            <Col className="col-3">
              <b>
                <Label for="nPaginas">Vacunos por página</Label>
              </b>
              <Input
                value={vacunosPorPagina}
                onChange={e => {
                  cambiaVacPorPagina(e.target.value);
                }}
                id="nPaginas"
                type="select"
              >
                <option>2</option>
                <option>5</option>
                <option>10</option>
              </Input>
            </Col>
            <Col xs="4" md="4">
              <b>
                <Label>Buscar por nombre o DIIO</Label>
              </b>
              <SearchInput filtrarVacunos={filtrarVacunos} />
            </Col>
            <Col className="col-5">
              <Button
                disabled={vacunosReducer.length === 0}
                style={{ float: 'right', marginTop: '20px' }}
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
            </Col>
          </Row>
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
              <TablaPaginador
                vacunos={vacunos}
                styles={styles}
                vacunosPorPagina={vacunosPorPagina}
                editarVacuno={editarVacuno}
                eliminarVacuno={eliminarVacuno}
                formatoFecha={formatoFecha}
                muestraAlertEliminar={muestraAlertEliminar}
              />
            </>
          )}
        </CardBody>
      </Card>
    </Page>
  );
};

export default Listado;
