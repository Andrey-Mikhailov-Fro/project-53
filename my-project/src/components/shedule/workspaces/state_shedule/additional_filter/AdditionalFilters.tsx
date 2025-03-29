function AdditionalFilters() {
  const additionalFilters = [
    { id: 1, label: "Выбрать всех" },
    { id: 2, label: "Отображать уволенных" },
    { id: 3, label: "Отображать заблокированных" },
  ];

  return (
    <div className="additional-filters">
      <div className="additional-filters-options">
        {additionalFilters.map((filter) => (
          <label key={filter.id} className="additional-filters-option">
            <input type="checkbox" />
            {filter.label}
          </label>
        ))}
      </div>
      <button className="additional-filters-clear" disabled>Удалить</button>
    </div>
  );
}

export default AdditionalFilters;
