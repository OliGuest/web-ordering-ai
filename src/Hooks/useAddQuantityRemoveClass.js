import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import showNotification from "../services/notificationService";
export const useAddQuantityRemoveClass = () => {

  const {
    quantityToKart,
    setquantityToKart,
    setDiscriptionTotal,
    kartItem,
    modifierSelectedTrue,
    setModifierSelectedTrue,
    sendDataToServer,
    setAddRemove,
    setError,
    setErrorModifiers,
    t
  } = useContext(Context);

  const addQuantityAndRemoveClass = (data) => {
    // var selectedModifierIds = [];
    var selectedModifierIdOtherPos = 0;
    var isRequiredTrue = false;
    // eslint-disable-next-line
    let requiredModifiersName = " ";
    // eslint-disable-next-line
    // let error;
    // get selected Modifeirs ids

    if (data?.OutOfStock) {
      showNotification("warning", `${t("lblOutOfStock")}`, {
        toastId: 'warning1',
      });
      return;
    }

    if (data?.ModifierWizards) {
      var AllModifierWizards = data?.ModifierWizards;
      AllModifierWizards?.forEach((modif) => {
        if (modif?.IsMandatory && !modifierSelectedTrue.includes(modif.ModifierId)) {
          isRequiredTrue = true;
          setError(modif.ModifierId);
          requiredModifiersName += modif?.Title + "\n";
          setErrorModifiers((prev) => [...prev, modif.ModifierId]);
        }
      });
    }

    if (isRequiredTrue) {
      showNotification("warning", `${t("lblPleaseSelectAllRequiredOptions!")}`, {
        toastId: 'success1',
      });
      return;
    }

    var selectedModifiers = [];

    // var checkAnyRadioButtonSelected = 0;

    document.querySelectorAll('.modifiersbox:checked').forEach(el => {
      selectedModifiers.push({
        mModifiersWizardId: el.getAttribute('mdata-ModifiersWizardId'),
        mIdOtherPos: el.getAttribute('mdata-IdOtherPos'),
        mProductId: el.getAttribute('mdata-ProductId'),
        mPrice: el.getAttribute('mdata-Price'),
        mName: el.getAttribute('mdata-Name'),
      });
    });

    // end

    var dataAddToCart = data;
    // quantitiy to
    if (quantityToKart !== "" && quantityToKart > 0) {
      // checking data already in CartkartHistoryStore
      let finddata = kartItem.find((item) => item.ProductId === data.ProductId);
      //   //have to find data for existing mod also

      if (finddata) {
        //here if we find item
        // eslint-disable-next-line
        let isSelectionExist = false;

        // also item has modifires
        if (finddata?.selectedModifiersData) {
         
          //looping through kartItem to check that current selected modifier exist's or not
          for (let i = 0; i < kartItem.length; i++) {
            
            if (kartItem[i]?.selectedModifiersData) {
            

              const uniqueValues = new Set(kartItem.map((v) => v.name));

              if (uniqueValues.size <= kartItem.length) {
         
                // Sending just one product to server

                let productToSend = {
                  ...data,
                  quantity: 1,
                  selectedModifiersData: selectedModifiers,
                  modifierPrice: selectedModifiers.map((obj) => {
                    return parseFloat(obj.mPrice);
                  }),
                };

                let saveKartItem = [productToSend];
                // calculateTotalCartAmount(saveKartItem);
                sendDataToServer(saveKartItem);
                // Clear All checked radio or checkboxes
                var check = document.getElementsByClassName("clear-checked");
                for (let i = 0; i < check.length; i++) {
                  check[i].checked = false;
                  setModifierSelectedTrue([]);
                }
                // getProductQuantityInCart(existingKArtItemdata);
                localStorage.setItem("kaartData", JSON.stringify(saveKartItem));

                break;
              } else {
                // item has modifires but selection does not exist i.e => new item

                let addKartItemforNonMod = [
                  {
                    ...finddata,
                    //property to add new item
                    // quantity: finddata.quantity + quantityToKart,
                    quantity: 1,
                    // quantity: quantityToKart,
                    selectedModifiersData: selectedModifiers,
                    modifierPrice: selectedModifiers.map((obj) => {
                      return parseFloat(obj.mPrice);
                    }),
                  },
                  ...kartItem,
                ];
                //setkartItem(addKartItemforNonMod);
                sendDataToServer(addKartItemforNonMod);

                // Clear All checked radio or checkboxes
                var x = document.getElementsByClassName("clear-checked");
                for (let i = 0; i < x.length; i++) {
                  x[i].checked = false;
                  setModifierSelectedTrue([]);
                }
                //calculateTotalCartAmount(addKartItemforNonMod);
                localStorage.setItem(
                  "kaartData",
                  JSON.stringify(addKartItemforNonMod)
                );
              }
            }
            // isSelectionExist = areEqual(
            //   item?.selectedModifiersData.flat(),
            //   currentSelection.flat()
            // );
          }
        }
      } else {
        // other wise add new
        //dataAddToCart.Price += discriptionTotal;
        dataAddToCart.quantity = 1;
        // dataAddToCart.quantity = quantityToKart;
        dataAddToCart.basePrice = dataAddToCart.Price;
        dataAddToCart.modifierPrice = selectedModifiers?.map((obj) => {
          return parseFloat(obj.mPrice);
        });
        dataAddToCart.selectedModifierIdOtherPos = selectedModifierIdOtherPos;
        dataAddToCart.selectedModifiersData = selectedModifiers;

        let saveKartItem = [{ ...dataAddToCart }];
        sendDataToServer(saveKartItem);
        // Clear All checked radio or checkboxes
        var check2 = document.getElementsByClassName("clear-checked");
        for (let i = 0; i < check2.length; i++) {
          check2[i].checked = false;
          setModifierSelectedTrue([]);
        }

        localStorage.setItem("kaartData", JSON.stringify(saveKartItem));
      }

      setTimeout(function () {
        setquantityToKart(1);
        setAddRemove(false);
      }, 1000);
      // open cart class - but don't close detail sheet so quantity stepper shows
      document.body.classList.add("open-cart");
      document.body.classList.add("open");
      // Don't remove open-detail — let the sheet stay open

      setDiscriptionTotal(0);
    }
  };
  // let data =localStorage.getItem("kaartData")
  return [addQuantityAndRemoveClass];
};
