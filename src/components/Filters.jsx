import "../styles/products.css";

export default function Filters({ total }) {
  return (
    <div className="filters-bar">
      <div className="filters-left">
        <span className="filter-label">Filter :</span>

        <select className="filter-select">
          <option>Category</option>
          <option>Travel</option>
          <option>Office</option>
          <option>Office</option>
          <option>Office</option>
          <option>Office</option>
        </select>

      </div> 

      <div className="filters-right">
        {total} Products
      </div>
    </div>
  );
}
