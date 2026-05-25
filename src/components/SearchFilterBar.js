function SearchFilterBar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) {
  return (
    <div className="toolbar panel">
      <input
        type="text"
        placeholder="Search course..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All categories</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;
