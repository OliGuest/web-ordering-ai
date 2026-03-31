import React from "react";
import spicy from "../../../../assets/img/spicy.svg";
import pregnancy from "../../../../assets/img/pregnancy.svg";
import vegan from "../../../../assets/img/vegan.png";
import vegetarian from "../../../../assets/img/vegetarian.png";

const AlergenIcons = ({ data, right }) => {

    return ( 
        <div className="icon-alergens">
            
            {data?.IsPregnancyNotSuitable && right && (
                <div className="alerg-img">
                    <img
                        src={pregnancy}
                        alt="Spicy"
                    />
                </div>
            )}
            {data?.IsSpicy && right && (
                <div className="alerg-img">
                    <img
                        src={spicy}
                        alt="Spicy"
                    />
                </div>
            )}
            {data?.IsVegan && right && (
                <div className="alerg-img">
                    <img
                        src={vegan}
                        alt="Spicy"
                    />
                </div>
            )}
            {data?.IsVegetarian && right && (
                <div className="alerg-img">
                    <img
                        src={vegetarian}
                        alt="Spicy"
                    />
                </div>
            )}
            {
                data?.ProductDetails?.MenuItems?.map((modif) => {
                    if(modif.LayoutType === 3) {
                      let modifires =  modif.AllergensScreen?.Allergens.map((el, ind) => {
                            return <div key={ind} className="alerg-img bottom-view-allergens">
                                <img
                                    src={`../../../../../assets/img/color-filter-${el.AllergenType}.svg`}
                                    alt={`${el.AllergenType}`}
                                />
                            </div>
                        })
                        return modifires;
                    }
                })
            }
        </div>
    ) 

}

export default AlergenIcons;
