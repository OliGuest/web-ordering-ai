import { React, useContext, useState, useEffect } from "react";
import "./ProductDetailSheet.css";
import { Context } from "../../context/kartItemContext";
import ModifiresList from "../Modifires/Modifires";
import { useCalculateTotalAccToWizard } from "../../Hooks/useCalculateTotalAccToWizard";
import { useOnHandleModifires } from "../../Hooks/useOnHandleModifires";
import { useGetSelectedModifierItem } from "../../Hooks/useGetSelectedModifierItem";
import { useAddQuantityRemoveClass } from "../../Hooks/useAddQuantityRemoveClass";
import { useMinusQuantityKart } from "../../Hooks/useMinusQuantityKart";
import { useGetProductQuantityInCart } from "../../Hooks/useGetProductQuantityInCart";
import DescriptionItemAllText from "../DescriptionItem/DescriptionItemAllText";
import AlergenIcons from "../OrderListItems/MenuListWrapper/MenuListItem/AlergenIcons";

const ProductDetailSheet = () => {
    const {
        activeColor,
        currencyValue,
        activeCard,
        resetModifiers,
        onModifireState,
        requiredErrorMsg,
        t,
        kartItem,
        active,
        orderTheme,
        searchSubCatIndex,
        setActiveCard,
    } = useContext(Context);

    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    const [onHandleModifires] = useOnHandleModifires();
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();
    const [minusQuantityKart] = useMinusQuantityKart();
    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    const [productData, setProductData] = useState(null);
    const [modifires, setModifires] = useState([]);

    // Find the product data from categories when activeCard changes
    useEffect(() => {
        if (!activeCard || !searchSubCatIndex) {
            setProductData(null);
            return;
        }
        // Search through all categories to find the product
        for (const cat of searchSubCatIndex) {
            if (cat?.SubCategories) {
                for (const sub of cat.SubCategories) {
                    if (sub?.Products) {
                        const found = sub.Products.find(p => p.ProductId === activeCard);
                        if (found) {
                            setProductData(found);
                            setModifires(found.ModifierWizards || []);
                            return;
                        }
                    }
                }
            }
            // Also check if products are directly on the category
            if (cat?.Products) {
                const found = cat.Products.find(p => p.ProductId === activeCard);
                if (found) {
                    setProductData(found);
                    setModifires(found.ModifierWizards || []);
                    return;
                }
            }
        }
    }, [activeCard, searchSubCatIndex]);

    const handleClose = () => {
        setActiveCard(undefined);
        setProductData(null);
        document.body.classList.remove("open-detail");
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (productData) {
            addQuantityAndRemoveClass(productData);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        if (productData) {
            const finddata = kartItem.find((item) => item.ProductId === productData.ProductId);
            if (finddata) {
                minusQuantityKart(finddata);
            }
        }
    };

    if (!productData || !activeCard) return null;

    const quantity = getProductQuantityInCart(productData);
    const price = parseFloat(productData?.Price) || 0;
    const currency = currencyValue || "€";
    const hasModifiers = modifires && modifires.length > 0;
    const description = productData?.ProductDetails?.MenuItems?.map((item) => {
        if (item.LayoutType === 1) return item?.HtmlContent;
        return "";
    }) || [];

    return (
        <>
            {/* Backdrop */}
            <div className="pds-backdrop" onClick={handleClose} />

            {/* Sheet */}
            <div className="pds-sheet">
                {/* Drag handle */}
                <div className="pds-drag-handle" onClick={handleClose}>
                    <span />
                </div>

                {/* Close button */}
                <button className="pds-close" onClick={handleClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                {/* Product image */}
                <div className="pds-image">
                    <img
                        src={productData?.ProductDetails?.ProductPictureUrl || productData?.SmallPictureUrl}
                        alt={productData?.Name}
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="pds-content">
                    {/* Title & Price */}
                    <div className="pds-header">
                        <h2 className="pds-title" style={{ color: orderTheme?.ProductTextColor }}>
                            {productData?.Name}
                        </h2>
                        <p className="pds-price" style={{ color: activeColor }}>
                            {currency} {price.toFixed(2)}
                        </p>
                    </div>

                    {/* Description */}
                    {description.some(d => d && d.length > 0) && (
                        <div className="pds-description">
                            <DescriptionItemAllText description={description} />
                        </div>
                    )}

                    {/* Allergens */}
                    <div className="pds-allergens">
                        <AlergenIcons data={productData} />
                    </div>

                    {/* Modifiers */}
                    {hasModifiers && (
                        <div className="pds-modifiers">
                            <ModifiresList
                                resetModifiers={resetModifiers}
                                DescriptionData={productData}
                                modifires={modifires}
                                onModifireState={onModifireState}
                                activeColor={activeColor}
                                onCalculateTotalAccToWizard={calculateTotalAccToWizard}
                                requiredErrorMsg={requiredErrorMsg}
                                getSelectedModifierItem={getSelectedModifierItem.bind(this)}
                                onHandleModifires={onHandleModifires}
                            />
                        </div>
                    )}
                </div>

                {/* Sticky footer with add to cart */}
                {active && (
                    <div className="pds-footer">
                        {quantity && quantity !== "" ? (
                            <div className="pds-qty-row">
                                <div className="pds-qty-stepper">
                                    <button className="pds-qty-btn" onClick={handleRemoveFromCart}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10h12" stroke={activeColor} strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <span className="pds-qty-value">{quantity}</span>
                                    <button className="pds-qty-btn" onClick={handleAddToCart}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 4v12M4 10h12" stroke={activeColor} strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    className="pds-add-btn"
                                    style={{ backgroundColor: activeColor }}
                                    onClick={handleClose}
                                >
                                    {t("lblDone") || "Done"}
                                </button>
                            </div>
                        ) : (
                            <button
                                className="pds-add-btn pds-add-btn-full"
                                style={{ backgroundColor: activeColor }}
                                onClick={handleAddToCart}
                            >
                                <span>{t("lblAddToCart") || "Add to order"}</span>
                                <span className="pds-add-price">{currency} {price.toFixed(2)}</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetailSheet;
