function SearchBar({ value, onChange, onSubmit, onClear, placeholder = 'Search...' }) {
  return (
    <form
      className="row g-2 align-items-center mb-3"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="col-12 col-md-8 col-lg-9">
        <input
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      <div className="col-6 col-md-auto">
        <button className="btn btn-primary w-100" type="submit">
          Search
        </button>
      </div>

      {onClear && value ? (
        <div className="col-6 col-md-auto">
          <button className="btn btn-secondary w-100" type="button" onClick={onClear}>
            Clear
          </button>
        </div>
      ) : null}
    </form>
  )
}

export default SearchBar