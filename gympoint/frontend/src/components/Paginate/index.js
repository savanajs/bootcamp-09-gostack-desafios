import React from 'react';

import { Pagination } from './styles';

export default function Paginate({ onSetPage, page, pages }) {
  if (pages > 1) {
    return (
      <Pagination>
        <div className="actions">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onSetPage(page - 1)}
          >
            {'<'} Anterior
          </button>
          <button
            type="button"
            disabled={page === pages}
            onClick={() => onSetPage(page + 1)}
          >
            Próxima {'>'}
          </button>
        </div>
      </Pagination>
    );
  }
  return '';
}
