import { useEffect, useState } from "react";

const ModifiresList = (props) => {
  const [modifiredState, setmodifiredState] = useState([]);
  const [checkedData, setCheckedData] = useState();
  const {
    onCalculateTotalAccToWizard,
    modifires,
    requiredErrorMsg,
    activeColor,
    DescriptionData,
  } = props;

  useEffect(() => {
    props.resetModifiers.current = fun;
    setmodifiredState(modifires);
  }, [modifires]);

  useEffect(() => {
    onCalculateTotalAccToWizard(modifiredState);
    //for reseting the checkbox 

  }, []);

  const handleModifireChange = (
    e,
    selectedItem,
    ModifierId,
    ProductId,
    IdOtherPos
  ) => {
    // e.target.isChecked = true;
    props.getSelectedModifierItem(ModifierId, ProductId, IdOtherPos);
    let nextState = modifiredState?.map((modifire) => {
      if (modifire?.Title !== e.target.name) {
        return modifire;
      } else {
        return {
          ...modifire,
          ModifierItemElements: modifire.ModifierItemElements.map((m_item) => {
            const isChecked = m_item.Name === e.target.value;
            if (isChecked) {
              props.onModifireState(m_item);
              setCheckedData(m_item);
            }
            return {
              ...m_item,
              selected: isChecked,
            };
          }),
        };
      }
    });
    props.onCalculateTotalAccToWizard(nextState);
    setmodifiredState(nextState);
  };
  const fun = () => {
    setmodifiredState(modifires);
  };

  return modifiredState.map((item, index) => {

    return (
      <div
        className="extra-features-wrapper mt-15"
        id={"ModifierId_" + item.ModifierId}
        key={index}
      >
        <div className="extra-features-list">
          <div className="d-flex">
            <label
              className="mb-10"
              style={{
                color: `${DescriptionData?.ProductDetails?.MenuTextColor}`,
              }}
            >
              {item?.Title}
            </label>
            {item?.IsMandatory && (
              <span
                className="info-msg ml-auto modifier_required "
                id={"mid_" + item.ModifierId}
              >
                {/* <img src="assets/img/info.svg" alt="filter-img" className="mr-1" /> */}
                <span className="mr-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="5.5" stroke="rgb(218 26 53)" />
                    <path
                      d="M5.07469 2.5H6.93469L6.62469 7.07H5.38469L5.07469 2.5ZM6.00469 9.58C5.73135 9.58 5.50135 9.49333 5.31469 9.32C5.13469 9.14 5.04469 8.92333 5.04469 8.67C5.04469 8.41667 5.13469 8.20667 5.31469 8.04C5.49469 7.86667 5.72469 7.78 6.00469 7.78C6.28469 7.78 6.51469 7.86667 6.69469 8.04C6.87469 8.20667 6.96469 8.41667 6.96469 8.67C6.96469 8.92333 6.87135 9.14 6.68469 9.32C6.50469 9.49333 6.27802 9.58 6.00469 9.58Z"
                      fill="#FF9900"
                    />
                  </svg>
                </span>
                Required
              </span>
            )}
          </div>

          {item?.ModifierItemElements?.map((modifireItem, index) => {

            return (
              <div className="form-check" key={index}>
                <input
                  className="modifiersbox form-check-input"
                  mdata-modifierswizardid={modifireItem?.ModifiersWizardId}
                  mdata-idotherpos={modifireItem?.IdOtherPos}
                  mdata-productid={modifireItem?.ProductId}
                  mdata-price={modifireItem?.Price}
                  mdata-mid={item.IsMandatory.toString()}
                  mdata-name={modifireItem?.Name}
                  id={modifireItem?.ProductId}
                  name={item?.Title}
                  //value={modifireItem?.Name}
                  type="radio"
                  // checked={
                  //   modifireItem?.selected
                  //     ? !!modifireItem?.selected
                  //     : modifireItem?.DefaultSelected
                  // }
                  onChange={(e) =>
                    handleModifireChange(
                      e,
                      modifireItem,
                      item.ModifierId,
                      modifireItem?.ProductId,
                      modifireItem?.IdOtherPos
                    )
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={modifireItem?.ProductId}
                >
                  {modifireItem?.Name} &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {modifireItem?.PriceValue ? modifireItem?.PriceValue : " € " + " " + modifireItem?.Price}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

export default ModifiresList;
