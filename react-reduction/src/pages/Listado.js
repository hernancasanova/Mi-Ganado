import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import ganado_vacuno from '../../src/assets/img/logo/019017472.jpg';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import base64Img from 'base64-img';

const Listado = () => {  
  //var vacunos = useSelector(store=>store.vacuno.vacunos);
  const  toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  var url_imagenes = useSelector(store=>store.vacuno.url_imagenes);
  const descargarPdf = () => {
    console.log("Descargando pdf");
    var pdf = new jsPDF('p', 'pt', 'letter');
    //let imagen = new Image();
    //imagen.crossOrigin = 'anonymous';
    var imagen;
    var id;
    var tabla = document.getElementById("listVacunos");
    pdf.autoTable({
      html: "#listVacunos",
      bodyStyles: {minCellHeight: 50},
      didDrawCell: function(data) {
        //let id;
        //console.log("id: ",id);
        //console.log("data.column: ",data.column);
        /*if(data.column.index===0 && data.cell.section === 'body'){
          console.log("data.cell.text[0]: ",data.cell.text[0]);
          console.log("data.cell.secction: ",data.cell.section);
          id=data.cell.text[0];
        }*/
        if (data.column.index === 5 && data.cell.section === 'body') {
          //base64Img.base64(url_imagenes+id+".jpg", function(err, data) {
            //imagen=data;
          //});
          //console.log("url_imagenes+id: "+url_imagenes+id);
          //toDataURL(url_imagenes+data.cell.text[0]+".jpg",result => {
          //toDataURL(url_imagenes+id+".jpg",result => {
            //console.log("result: ",result);
          //toDataURL(url_imagenes+"26.jpg",result => {
            //imagen = result;
          //});
           //imagen.src=url_imagenes+data.cell.text[0];
           pdf.addImage(ganado_vacuno, 'JPEG', data.cell.x + 15, data.cell.y + 2, 50, 50)
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
              <Button disabled={vacunos.length===0} style={{float:'right'}} className="ml-10" onClick={descargarPdf}>Descargar pdf </Button>
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
                    return (<tr key={vac.id} >
                    <th>{vac.id}</th>
                    <td>{vac.nombre}</td>
                    <td>{vac.fecha_nacimiento}</td>
                    <td>{vac.sexo}</td>
                    <td>{vac.raza}</td>
                    <td><img height={34} src={url_imagenes+vac.id+".jpg"}/></td>
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
