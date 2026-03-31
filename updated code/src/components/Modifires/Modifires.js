import { useEffect, useState } from "react";
import "./Modifires.css";
import { useContext } from "react";
import { Context } from "../../context/kartItemContext";

const ModifiresList = (props) => {
  const { modifiredState, setmodifiredState, t, setModifierSelectedTrue } =
    useContext(Context);
  // eslint-disable-next-line
  const [checkedData, setCheckedData] = useState();
  
  // const ref = useRef(null);

  const {
    onCalculateTotalAccToWizard,
    modifires,
    DescriptionData,
    activeColor,
  } = props;


  useEffect(() => {
    // props.resetModifiers.current = fun;
    setmodifiredState(modifires);
    // eslint-disable-next-line
  }, [modifires]);

  useEffect(() => {
    onCalculateTotalAccToWizard(modifiredState);
    //for reseting the checkbox
    // eslint-disable-next-line
  }, [modifiredState]);

  const handleModifireChange = (
    e,
    selectedItem,
    ModifierId,
    ProductId,
    IdOtherPos
  ) => {
    const inputisChecked = e.target.checked;

    if (inputisChecked) {
      props.getSelectedModifierItem(ModifierId, ProductId, IdOtherPos);
      let nextState = modifiredState?.map((modifire) => {
        
        if (modifire?.Title !== e.target.name) {
          return modifire;
        } else {
          return {
            ...modifire,
            ModifierItemElements: modifire.ModifierItemElements.map(
              (m_item) => {
                console.log(m_item,"m_item")
                let idTable = Number(e.target.getAttribute("mdata-productid"))
                const isChecked = m_item.ProductId === idTable;
                if (isChecked) {
                  props.onModifireState(m_item);
                  setCheckedData(m_item);
                }
                return {
                  ...m_item,
                  selected: isChecked,
                };
              }
            ),
          };
        }
      });

      props.onCalculateTotalAccToWizard(nextState);
      setmodifiredState(nextState);
    } else {
      setmodifiredState([]);
      setModifierSelectedTrue([]);

    }
  };


  return modifires.map((item, index) => {
    return (
      <div
        className="extra-features-wrapper"
        id={"ModifierId_" + item.ModifierId}
        key={index}
      >
        <div
          className="extra-features-list"
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          <div className="d-flex ">
            <label
              className="label-name"
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

                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                  <path d="M4.5835 3.5638H5.41683V4.39714H4.5835V3.5638ZM4.5835 5.23047H5.41683V7.73047H4.5835V5.23047ZM5.00016 1.48047C2.70016 1.48047 0.833496 3.34714 0.833496 5.64714C0.833496 7.94714 2.70016 9.8138 5.00016 9.8138C7.30016 9.8138 9.16683 7.94714 9.16683 5.64714C9.16683 3.34714 7.30016 1.48047 5.00016 1.48047ZM5.00016 8.98047C3.16266 8.98047 1.66683 7.48464 1.66683 5.64714C1.66683 3.80964 3.16266 2.3138 5.00016 2.3138C6.83766 2.3138 8.3335 3.80964 8.3335 5.64714C8.3335 7.48464 6.83766 8.98047 5.00016 8.98047Z" fill="#C45A3C" />
                </svg>

                {t("IbIRequired")}
              </span>
            )}
          </div>
          <div className="form-check" key={index}>
          {item?.ModifierItemElements?.map((modifireItem, index) => {
            // eslint-disable-next-line
            if (item?.SelectionMax === 1) {
              return (
                <>
                  <input
                    // ref={ref}
                    className="modifiersbox form-check-input clear-checked"
                    type="radio"
                    mdata-modifierswizardid={modifireItem?.ModifiersWizardId}
                    mdata-idotherpos={modifireItem?.IdOtherPos}
                    mdata-productid={modifireItem?.ProductId}
                    mdata-price={modifireItem?.Price}
                    mdata-mid={item.IsMandatory.toString()}
                    mdata-name={modifireItem?.Name}
                    id={`${modifireItem?.Name}_${modifireItem?.ProductId + modifireItem?.ModifiersWizardId
                      }_${index}`}
                    name={item?.ModifierId}
                    //value={modifireItem?.Name}
                    // checked={
                    //   modifireItem?.selected
                    //     ? !!modifireItem?.selected
                    //     : modifireItem?.DefaultSelected
                    // }
                    onChange={(e) => {
                      handleModifireChange(
                        e,
                        modifireItem,
                        item.ModifierId,
                        modifireItem?.ProductId,
                        modifireItem?.IdOtherPos,
                      );
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${modifireItem?.Name}_${modifireItem?.ProductId + modifireItem?.ModifiersWizardId}_${index}`}
                      // To ensure that the click is working on Ios Iphone devices
                    // onClick={()=>{}}
                  >
                    <span>{modifireItem?.Name} </span> 
                    <span className="price">{modifireItem?.PriceValue
                      ? modifireItem?.PriceValue
                      : " €  " + modifireItem?.Price}</span>
                    
                  </label>
                </>
              );
            } else if (item?.SelectionMax === 2) {
              return (
                  <label
                    htmlFor={`${modifireItem?.Name}_${modifireItem?.ProductId + modifireItem?.ModifiersWizardId
                      }`}
                    className="checkbox"
                  >
                    <input
                      // ref={ref}
                      className="checkbox__input modifiersbox clear-checked"
                      type="checkbox"
                      mdata-modifierswizardid={modifireItem?.ModifiersWizardId}
                      mdata-idotherpos={modifireItem?.IdOtherPos}
                      mdata-productid={modifireItem?.ProductId}
                      mdata-price={modifireItem?.Price}
                      mdata-mid={item.IsMandatory.toString()}
                      mdata-name={modifireItem?.Name}
                      value={modifireItem?.Name}
                      id={`${modifireItem?.Name}_${modifireItem?.ProductId +
                        modifireItem?.ModifiersWizardId
                        }`}
                      name={item?.Title}
                      onChange={(e) => {
                        handleModifireChange(
                          e,
                          modifireItem,
                          item.ModifierId,
                          modifireItem?.ProductId,
                          modifireItem?.IdOtherPos
                        );
                      }}
                      required="required"
                    />
                    <svg
                      className="checkbox__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                    >
                      <rect
                        width="18"
                        height="18"
                        x=".5"
                        y=".5"
                        fill="#FFF"
                        stroke={activeColor}
                        rx="3"
                      />
                      <path
                        className="tick"
                        stroke={activeColor}
                        fill="none"
                        strokeLinecap="round"
                        strokeWidth="3"
                        d="M4 9l4 5 9-9"
                      />
                    </svg>
                    <span className="checkbox__label">
                      {/* {modifireItem?.Name} &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {modifireItem?.PriceValue
                        ? modifireItem?.PriceValue
                        : " €  " + modifireItem?.Price} */}
                      <span>{modifireItem?.Name} </span>
                      <span className="price">{modifireItem?.PriceValue
                        ? modifireItem?.PriceValue
                        : " €  " + modifireItem?.Price}</span>
                    </span>
                  </label>
              );
            }
          })}
          </div>  
        </div>
      </div>
    );
  });
};

export default ModifiresList;
