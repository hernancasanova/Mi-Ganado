import Page from 'components/Page';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import * as actions from '../actions/VacunoActions';
import ReactTable from 'react-table';
import {Button} from 'reactstrap';
import NavDropdown from 'reactstrap/lib/NavDropdown';


const Listado = ({listadoAnimales}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(actions.listadoAnimales());
  },[]);
  var vacunos = useSelector(store=>store.vacuno.vacunos);
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
              {<Table>
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
                    <td><img height={34} src="https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg"/></td>  
                  </tr>);} )}
                </tbody>
              </Table>}
            </CardBody>
          </Card>
        </Col>

        
      </Row>
    </Page>
  );
};

export default Listado;
