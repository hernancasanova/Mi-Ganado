import Page from 'components/Page';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import {Button} from 'reactstrap';
import NavDropdown from 'reactstrap/lib/NavDropdown';

//const dispatch = useDispatch();
/*useEffect(()=>{
  dispatch(listadoAnimales());
},[]);*/

const Listado = ({listadoAnimales}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(actions.listadoAnimales());
  },[]);
  const vacunos = useSelector(store=>store.vacuno.vacunos);
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
            <CardHeader>Actualizado al </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha nacimiento</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Raza</th>
                    {/*<th scope="col">Estado</th>
                    <th scope="col">Fecha Venta</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {/*
                  <tr className="table-active">
                    <th scope="row">Active</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr>
                    <th scope="row">Default</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>

                  <tr className="table-primary">
                    <th scope="row">Primary</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Secondary</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-success">
                    <th scope="row">Success</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-danger">
                    <th scope="row">Danger</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-warning">
                    <th scope="row">Warning</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-info">
                    <th scope="row">Info</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Light</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>
                  <tr className="table-dark">
                    <th scope="row">Dark</th>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                  </tr>*/}
                  {vacunos.map(vac=>{
                    return (<tr key={vac.id} className="table-info">
                    <th>{vac.id}</th>
                    <td>{vac.nombre}</td>
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
};

export default Listado;
