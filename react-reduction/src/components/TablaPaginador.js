import React, { useState } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Input,
  Col,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Label from 'reactstrap/lib/Label';

const TablaPaginador = props => {
  var url_imagenes = useSelector(store => store.vacuno.url_imagenes);
  const {
    vacunos,
    styles,
    formatoFecha,
    editarVacuno,
    eliminarVacuno,
    muestraAlertEliminar,
  } = props;
  const [paginaActual, cambiaPaginaActual] = useState(0);
  const [vacunosPorPagina, cambiaVacPorPagina] = useState(2);
  let cantidadPaginas = Math.ceil(vacunos.length / vacunosPorPagina);
  const vacunosListados = vacunos.slice(
    paginaActual * vacunosPorPagina,
    (paginaActual + 1) * vacunosPorPagina,
  );
  let numeroPaginas = [];
  for (let i = 0; i < cantidadPaginas; i++) {
    numeroPaginas.push(
      <PaginationItem key={i} active={paginaActual === i ? true : false}>
        <PaginationLink onClick={e => cambiaPaginaActual(i)}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>,
    );
  }
  return (
    <>
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
      <Table id="listVacunos">
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
          {vacunosListados.map(vac => {
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
                <td>{vac.numero != null ? vac.numero : 'Sin arete'}</td>
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
      </Table>
      <Pagination aria-label="Page navigation example">
        {/* <PaginationItem disabled>
        <PaginationLink first href="#" />
      </PaginationItem> */}
        <PaginationItem>
          <PaginationLink
            disabled={paginaActual === 0}
            onClick={e => cambiaPaginaActual(paginaActual - 1)}
            previous
          />
        </PaginationItem>
        {numeroPaginas}
        <PaginationItem>
          <PaginationLink
            next
            onClick={e => cambiaPaginaActual(paginaActual + 1)}
            disabled={paginaActual + 1 === cantidadPaginas}
          />
        </PaginationItem>
        {/* <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem> */}
      </Pagination>
    </>
  );
};

export default TablaPaginador;
