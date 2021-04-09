import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import ganado_vacuno from '../../src/assets/img/logo/019017472.jpg';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const Listado = () => {  
  const descargarPdf = () => {
    console.log("Descargando pdf");
    var pdf = new jsPDF('p', 'pt', 'letter');
    var tabla = document.getElementById("listVacunos");
    pdf.autoTable({
      html: "#listVacunos",
      bodyStyles: {minCellHeight: 15},
      didDrawCell: function(data) {
        if (data.column.index === 5 && data.cell.section === 'body') {
           pdf.addImage(ganado_vacuno, 'JPEG', data.cell.x + 15, data.cell.y + 2, 30, 20)
        }
      }
    });
    pdf.save("Listado_animales.pdf");
  }
  const [modalPdf, showPdf] = useState(false);
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
              <Button  style={{float:'right'}} className="ml-10" onClick={descargarPdf}>Descargar pdf </Button>
            </CardHeader>
            <CardBody>
              <Table id="listVacunos">
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha nacimiento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Raza</th>
                    <th scope="col">Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {vacunos.map(vac=>{
                    return (<tr key={vac.id} className="table-info">
                    <th>{vac.id}</th>
                    <td>{vac.nombre}</td>
                    <td>{vac.fecha_nacimiento}</td>
                    <td>{vac.sexo}</td>
                    <td>{vac.raza}</td>
                    <td><img height={34} src={url_imagenes+"019017472.jpg"}/></td>
                  </tr>);} )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/*<Row>
        <Modal
          isOpen={modalPdf}
          //toggle={this.toggle()}
          //className={this.props.className}
          size="xl"
          >
          <ModalHeader>Listado de animales</ModalHeader>
          <ModalBody>
            <PDFViewer>
              <PdfListado />
            </PDFViewer>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={descargarPdf}>
              Descargar
            </Button>{' '}
            <Button color="secondary" onClick={()=>showPdf(!modalPdf)}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Row>*/}
    </Page>
  );
}

export default Listado;
