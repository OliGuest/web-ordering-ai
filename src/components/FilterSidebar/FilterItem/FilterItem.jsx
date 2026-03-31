import { useEffect, useState } from "react";
import "./FilterItem.css";

const FilterItem = ({ constantKey, fillFilterArray, clearChecked, setFilterArray }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (clearChecked) {
      setChecked(false);
    }
  }, [clearChecked]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    if (!checked) {
      fillFilterArray(constantKey[1]);
    } else {
      // Remove allergen from the array when unchecked
      setFilterArray((prevFilterArray) =>
        prevFilterArray.filter((filterId) => filterId !== constantKey[1])
      );
    }
  };

  return (
    <li className="filter-item fade-check-wrapper">
      <input
        type="checkbox"
        id={`filter${constantKey[1]}`}
        onChange={handleCheckboxChange}
        checked={checked}
      />
      <label className="fade-check" htmlFor={`filter${constantKey[1]}`}>
        <div className="filter-img">
          <img
            src={`assets/img/color-filter-${constantKey[1]}.svg`}
            alt="filter-img"
          />
        </div>
        <h6 className="text-center">{constantKey[0]}</h6>
      </label>
    </li>
  );
};

export default FilterItem;
