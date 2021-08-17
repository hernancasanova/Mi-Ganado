import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import PageSpinner from '../components/PageSpinner';
import Swal from 'sweetalert2';
import * as moment from 'moment';

const Listado = (props) => {  
  const styles = {
      width: 300,
      height: 300,
      resizeMode: 'cover',
      textAlign: 'center',
      verticalAlign: 'middle' 
  };
  var fechaFormateada;
  var url_imagenes = useSelector(store=>store.vacuno.url_imagenes);
  var loading = useSelector(store=>store.vacuno.loading);
  var vacunosBuscados = useSelector(store=>store.vacuno.vacunosBuscados);
  const descargarPdf = () => {
    console.log("Descargando pdf");
    var pdf = new jsPDF('p', 'pt', 'letter');
    var nColumna=1;
    var ids=[];
    var i=0;
    //var fecha;
    pdf.autoTable({
      html: "#listVacunos",
      columnStyles: {
        0: {cellWidth: 'auto', minCellHeight: 80},
        1: {cellWidth: 120, minCellHeight: 80},
        2: {cellWidth: 'auto', minCellHeight: 80},
        3: {cellWidth: 'auto', minCellHeight: 80},
        4: {cellWidth: 'auto', minCellHeight: 80},
        5: {cellWidth: 'auto', minCellHeight: 80},
        6: {cellWidth: 'auto', minCellHeight: 80},
        7: {cellWidth: 'auto', minCellHeight: 80},
        // etc
      },
      styles:{
        valign: 'middle',
        halign : 'center'
      },
      //bodyStyles: {minCellHeight: 80, minCellWidth: 80},
      includeHiddenHtml: true,
      didParseCell: function(data) {
        console.log("data: ",data);
        if(data.column.index===0 && data.cell.section === 'body'){
          ids.push(data.cell.text[0]);
          data.cell.text[0]=nColumna.toString();
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
      didDrawCell: function(data) {
        if(data.column.index === 1 && data.cell.section === 'body') {
          pdf.addImage("http://localhost:8000/api/vacunos/"+ids[i], 'JPEG', data.cell.x + 15, data.cell.y + 2, 80, 80);
          i++;
        }
      }
    });
    pdf.save("Listado_animales.pdf");
  }
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(actions.listadoAnimales());
  },[]);
  var vacunos = useSelector(store=>store.vacuno.vacunos);
  var url_imagenes = useSelector(store=>store.vacuno.url_imagenes); 
  if(vacunosBuscados && vacunos.length===0){
    Swal.fire({
      'icon': 'info',
      'title': 'No se encontraron vacunos',
      'confirmButtonText': 'Registrar vacuno',
      'footer': '<a href="javascript:location.reload(true)">Favor recargue la página si existe algun problema</a>',
      'allowOutsideClick': false
    }).then((result) => {
      if (result.isConfirmed) {
        props.history.push("registrar_vacuno");
      }
    })
  }
  const formatoFecha = (fecha) => {
    fechaFormateada=fecha.split('-');
    return [fechaFormateada[2],fechaFormateada[1],fechaFormateada[0] ].join("-");
  }
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
              <Button disabled={vacunos.length===0} style={{float:'right'}} className="ml-10" onClick={descargarPdf}>Descargar pdf </Button>
            </CardHeader>
            <CardBody>{loading?<PageSpinner texto="cargando listado" />:
              <Table id="listVacunos">
                <thead>
                  <tr >
                    <th scope="col" hidden={true}>N°</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DIIO</th>
                    <th scope="col">Fecha colocación</th>
                    <th scope="col">Fecha nacimiento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {vacunos.map(vac=>{
                    return (<tr key={vac.id} >
                    <td hidden={true}>{vac.id}</td>
                    <td><img height={styles.height} width={styles.width} src={url_imagenes+vac.id+".jpg"}/></td>
                    <td >{vac.nombre}</td>
                    <td>{vac.numero!=null?vac.numero:"Sin arete"}</td>
                    <td>{vac.fecha_colocacion!=null?formatoFecha(vac.fecha_colocacion): "Sin arete"}</td>
                    <td>{formatoFecha(vac.fecha_nacimiento)}</td>
                    <td>{vac.sexo}</td>
                    <td>{vac.raza}</td>
                  </tr>);} )}
                </tbody>
              </Table>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
                    );
}

export default Listado;
