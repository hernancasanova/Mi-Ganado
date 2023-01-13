import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
//import {IoListCircle} from 'react-icons/io5'

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
  const { vacunosPorPagina } = props;
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
  const pagination = <Pagination aria-label="Page navigation example">
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
    </Pagination>;
  return (
    <div style={{height:"90vh",overflowY:"scroll"}}>
      {/* {pagination} */}
      <Table id="listVacunos" >
        <thead>
          <tr>
            <th scope="col" hidden={true}>
              N°
            </th>
            <th  scope="col">Imagen</th>
            <th  scope="col">Nombre</th>
            <th  scope="col">DIIO</th>
            <th  scope="col">Fecha colocación</th>
            <th  scope="col">Fecha nacimiento</th>
            <th  scope="col">Madre</th>
            <th  scope="col">Tipo</th>
            <th  scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vacunosListados.map(vac => {
            return (
              <tr key={vac.id}>
                <td hidden={true}>{vac.id}</td>
                <td>
                  <img
                    className='zoom'
                    alt={vac.name}
                    height={styles.height}
                    width={styles.width}
                    src={
                      url_imagenes +
                      vac.id +
                      '.jpg?dummy=' +
                      Math.random() * 1000
                    }
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
                <td>
                  {vac.madre}
                </td>
                <td>{vac.tipo}</td>
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
                  {/* <FaTrash
                    cursor="pointer"
                    title="Aretes usados"
                    onClick={() => {
                      mostrarAretes(vac.id);
                    }}
                  /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    {pagination}  
    </div>
  );
};

export default TablaPaginador;
