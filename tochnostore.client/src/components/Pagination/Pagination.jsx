import './Pagination.css';

const Pagination = ({ page, total, perPage, onChange }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift('...');
    if (page + delta < totalPages - 1) range.push('...');
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <nav className="pagination" aria-label="Навигация по страницам">
      <button
        className="pagination__btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {getVisiblePages().map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className="pagination__dots">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`pagination__btn ${p === page ? 'pagination__btn--active' : ''}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="pagination__btn"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination;