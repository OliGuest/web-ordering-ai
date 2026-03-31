import React from "react";
import styles from "./FilterSidebar.module.scss";

const FILTERCONSTANTS = {
  GLUTTEN: 1,
  CRUSTACEANS: 2,
  EGGS: 3,
  FISH: 4,
  PEANUTS: 5,
  SOYBEANS: 6,
  MILK: 7,
  NUTS: 8,
  CELERY: 9,
  MUSTARD: 10,
  SESAMESEEDS: 11,
  SULPHURDIOXIDEANDSULPHITES: 12,
  LUPIN: 13,
  MOLLUSCS: 14,
};

const FILTER_ITEMS = [
  { id: "fish", filterId: FILTERCONSTANTS.FISH, label: "VIS", image: "color-filter-1.svg" },
  { id: "gluten", filterId: FILTERCONSTANTS.GLUTTEN, label: "GLUTEN", image: "color-filter-2.svg" },
  { id: "soybeans", filterId: FILTERCONSTANTS.SOYBEANS, label: "EI", image: "color-filter-3.svg" },
  { id: "milk", filterId: FILTERCONSTANTS.MILK, label: "MELK", image: "color-filter-4.svg" },
  { id: "nuts", filterId: FILTERCONSTANTS.NUTS, label: "PINDA'S", image: "color-filter-5.svg" },
  { id: "peanuts", filterId: FILTERCONSTANTS.PEANUTS, label: "SOJA", image: "color-filter-6.svg" },
  { id: "sesameseeds", filterId: FILTERCONSTANTS.SESAMESEEDS, label: "SCHAALDIEREN", image: "color-filter-7-svg.png" },
  { id: "eggs", filterId: FILTERCONSTANTS.EGGS, label: "SESAMZAAD", image: "color-filter-8.svg" },
  { id: "crustaceans", filterId: FILTERCONSTANTS.CRUSTACEANS, label: "WEEKDIEREN", image: "color-filter-9.svg" },
  { id: "celery", filterId: FILTERCONSTANTS.CELERY, label: "MOSTERD", image: "color-filter-10.svg" },
  { id: "sulphur", filterId: FILTERCONSTANTS.SULPHURDIOXIDEANDSULPHITES, label: "SELDERIJ", image: "color-filter-11.svg" },
  { id: "mustard", filterId: FILTERCONSTANTS.MUSTARD, label: "NOTEN", image: "color-filter-12.svg" },
  { id: "lupin", filterId: FILTERCONSTANTS.LUPIN, label: "ZWAVELDIOXCIDE", image: "color-filter-13.svg" },
  { id: "molluscs", filterId: FILTERCONSTANTS.MOLLUSCS, label: "VLEES", image: "color-filter-14.svg" },
];

const FilterSidebar = ({ isOpen, onClose, onFilterToggle, selectedFilters }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h6>Allergies</h6>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Close filters">
          &times;
        </button>
      </div>
      <div className={styles.body}>
        <h6 className={styles.subheading}>Exclude</h6>
        <div className={styles.filterGrid}>
          {FILTER_ITEMS.map((item) => (
            <label
              key={item.id}
              className={`${styles.filterItem} ${
                selectedFilters.includes(item.filterId) ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(item.filterId)}
                onChange={() => onFilterToggle(item.filterId)}
              />
              <div className={styles.filterIcon}>
                <img src={`assets/img/${item.image}`} alt={item.label} />
              </div>
              <span className={styles.filterLabel}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FILTERCONSTANTS, FILTER_ITEMS };
export default FilterSidebar;
