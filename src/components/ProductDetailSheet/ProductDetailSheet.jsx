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
        discriptionTotal,
    } = useContext(Context);

    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    const [onHandleModifires] = useOnHandleModifires();
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();
    const [minusQuantityKart] = useMinusQuantityKart();
    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    const [productData, setProductData] = useState(null);
    const [modifires, setModifires] = useState([]);
    const [localQty, setLocalQty] = useState(0);

    // Find the product data from categories when activeCard changes
    useEffect(() => {
        if (!activeCard || !searchSubCatIndex) {
            setProductData(null);
            setModifires([]);
            setLocalQty(0);
            return;
        }
        for (const cat of searchSubCatIndex) {
            if (cat?.SubCategories) {
                for (const sub of cat.SubCategories) {
                    if (sub?.Products) {
                        const found = sub.Products.find(p => p.ProductId === activeCard);
                        if (found) {
                            setProductData(found);
                            setModifires(found.ModifierWizards || []);
                            // Get existing quantity from cart, default to 1 for new items
                            const existing = kartItem?.find(i => i.ProductId === found.ProductId);
                            setLocalQty(existing?.quantity || 1);
                            return;
                        }
                    }
                }
            }
            if (cat?.Products) {
                const found = cat.Products.find(p => p.ProductId === activeCard);
                if (found) {
                    setProductData(found);
                    setModifires(found.ModifierWizards || []);
                    const existing = kartItem?.find(i => i.ProductId === found.ProductId);
                    setLocalQty(existing?.quantity || 1);
                    return;
                }
            }
        }
    }, [activeCard, searchSubCatIndex]);

    // Sync localQty with kartItem changes
    useEffect(() => {
        if (productData) {
            const existing = kartItem?.find(i => i.ProductId === productData.ProductId);
            setLocalQty(existing?.quantity || 0);
        }
    }, [kartItem, productData]);

    const handleClose = () => {
        setActiveCard(undefined);
        setProductData(null);
        setModifires([]);
        setLocalQty(0);
        document.body.classList.remove("open-detail");
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        if (productData) {
            addQuantityAndRemoveClass(productData);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (productData && localQty > 0) {
            const finddata = kartItem.find((item) => item.ProductId === productData.ProductId);
            if (finddata) {
                minusQuantityKart(finddata);
            }
        }
    };

    if (!productData || !activeCard) return null;

    const basePrice = parseFloat(productData?.Price) || 0;
    const modifierTotal = parseFloat(discriptionTotal) || 0;
    const totalPrice = basePrice + modifierTotal;
    const currency = currencyValue || "€";
    const hasModifiers = modifires && modifires.length > 0;
    const description = productData?.ProductDetails?.MenuItems?.map((item) => {
        if (item.LayoutType === 1) return item?.HtmlContent;
        return "";
    }) || [];

    return (
        <>
            <div className="pds-backdrop" onClick={handleClose} />

            <div className="pds-sheet">
                <div className="pds-drag-handle" onClick={handleClose}>
                    <span />
                </div>

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
                    <div className="pds-header">
                        <h2 className="pds-title" style={{ color: orderTheme?.ProductTextColor }}>
                            {productData?.Name}
                        </h2>
                        <p className="pds-price" style={{ color: activeColor }}>
                            {currency} {basePrice.toFixed(2)}
                        </p>
                    </div>

                    {description.some(d => d && d.length > 0) && (
                        <div className="pds-description">
                            <DescriptionItemAllText description={description} />
                        </div>
                    )}

                    <div className="pds-allergens">
                        <AlergenIcons data={productData} />
                    </div>

                    {/* Modifiers */}
                    {hasModifiers && (
                        <div className="pds-modifiers">
                            <ModifiresList
                                key={activeCard}
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

                {/* Footer — always show quantity stepper */}
                {active && (
                    <div className="pds-footer">
                        <div className="pds-qty-row">
                            <div className="pds-qty-stepper">
                                <button
                                    className="pds-qty-btn"
                                    onClick={handleRemove}
                                    disabled={localQty === 0}
                                    style={{ opacity: localQty === 0 ? 0.3 : 1 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                                <span className="pds-qty-value">{localQty}</span>
                                <button className="pds-qty-btn" onClick={handleAdd}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4v12M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                            {localQty > 0 ? (
                                <button
                                    className="pds-add-btn"
                                    style={{ backgroundColor: activeColor }}
                                    onClick={handleClose}
                                >
                                    Done · {currency} {(totalPrice * localQty).toFixed(2)}
                                </button>
                            ) : (
                                <button
                                    className="pds-add-btn"
                                    style={{ backgroundColor: activeColor }}
                                    onClick={handleAdd}
                                >
                                    Add to cart
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetailSheet;
