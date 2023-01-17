import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
//import { useSelector } from 'react-redux';
import { Form, Input } from 'reactstrap';

const SearchInput = props => {
  const [palabraBuscada, cambiaPalabraBuscada] = useState('');
  return (
    <Form className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="30"
        className="cr-search-form__icon-search text-secondary"
        style={{marginTop:"3%"}}
      />
      <Input
        onChange={e => {
          props.filtrarVacunos(e);
          cambiaPalabraBuscada(e.target.value);
        }}
        id="buscadornombrediio"
        value={palabraBuscada}
        type="search"
        className="cr-search-form__input"
        placeholder="Buscar..."
      />
    </Form>
  );
};

export default SearchInput;
