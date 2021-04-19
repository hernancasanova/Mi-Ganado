import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const Listado = () => {  
  const styles = {
      width: 300,
      height: 300,
      resizeMode: 'cover'
      
  };
  var url_imagenes = useSelector(store=>store.vacuno.url_imagenes);
  const descargarPdf = () => {
    console.log("Descargando pdf");
    var pdf = new jsPDF('p', 'pt', 'letter');
    var id;
    pdf.autoTable({
      html: "#listVacunos",
      bodyStyles: {minCellHeight: 50},
      didDrawCell: function(data) {
        if(data.column.index===0 && data.cell.section === 'body'){
          id=data.cell.text[0];
        }
        if (data.column.index === 5 && data.cell.section === 'body') {
          pdf.addImage("http://localhost:8000/api/vacunos/"+id, 'JPEG', data.cell.x + 15, data.cell.y + 2, 50, 50)
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
  console.log("VACUNOS DESDE EL BODY DEL COMPONENTE FUNCIONAL LISTADO: ",vacunos);
  return (
    <Page
      title="Listado de animales"
      breadcrumbs={[{ name: 'listado', active: true }]}
      className="TablePage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Actualizado al 
              <Button disabled={vacunos.length===0} style={{float:'right'}} className="ml-10" onClick={descargarPdf}>Descargar pdf </Button>
            </CardHeader>
            <CardBody>
              <Table id="listVacunos">
                <thead>
                  <tr className="align-middle">
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">DIIO</th>
                    <th scope="col">Fecha colocación</th>
                    <th scope="col">Fecha nacimiento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Raza</th>
                  </tr>
                </thead>
                <tbody>
                  {vacunos.map(vac=>{
                    return (<tr key={vac.id} >
                    <td><img height={styles.height} width={styles.width} src={url_imagenes+vac.id+".jpg"}/></td>
                    <td>{vac.nombre}</td>
                    <td>{vac.numero}</td>
                    <td>{vac.fecha_colocacion}</td>
                    <td>{vac.fecha_nacimiento}</td>
                    <td>{vac.sexo}</td>
                    <td>{vac.raza}</td>
                    
                  </tr>);} )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default Listado;
