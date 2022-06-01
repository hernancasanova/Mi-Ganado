import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
//import { useSelector } from 'react-redux';
import { Form, Input } from 'reactstrap';

const SearchInput = props => {
  const [palabraBuscada, cambiaPalabraBuscada] = useState('');
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        onChange={e => {
          props.filtrarVacunos(e);
          cambiaPalabraBuscada(e.target.value);
        }}
        value={palabraBuscada}
        type="search"
        className="cr-search-form__input"
        placeholder="Buscar..."
      />
    </Form>
  );
};

export default SearchInput;
