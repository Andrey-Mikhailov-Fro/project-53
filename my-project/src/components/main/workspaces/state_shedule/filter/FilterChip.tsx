type Option = {
    id: number,
    label: string,
};

type FilterChipProps = {
    option: Option,
    deleteChip:  (id: number) => void,
};

function FilterChip({ option, deleteChip } : FilterChipProps) {
    return (
        <div className="filter-chip">
            <span className="filter-chip-text">{option.label}</span>
            <button className="filter-chip-close" onClick={() => deleteChip(option.id)}><img src="/close.svg" /></button>
        </div>
    );
}

export default FilterChip;