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
        detailsBackButtonColor,
    } = useContext(Context);

    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    const [onHandleModifires] = useOnHandleModifires();
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();
    const [minusQuantityKart] = useMinusQuantityKart();
    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    const [productData, setProductData] = useState(null);
    const [modifires, setModifires] = useState([]);
    const [pendingQty, setPendingQty] = useState(1);
    const [isInCart, setIsInCart] = useState(false);

    // Find product and check if already in cart
    useEffect(() => {
        if (!activeCard || !searchSubCatIndex) {
            setProductData(null);
            setModifires([]);
            setPendingQty(1);
            setIsInCart(false);
            return;
        }
        const findProduct = (categories) => {
            for (const cat of categories) {
                if (cat?.SubCategories) {
                    for (const sub of cat.SubCategories) {
                        if (sub?.Products) {
                            const found = sub.Products.find(p => p.ProductId === activeCard);
                            if (found) return found;
                        }
                    }
                }
                if (cat?.Products) {
                    const found = cat.Products.find(p => p.ProductId === activeCard);
                    if (found) return found;
                }
            }
            return null;
        };
        const found = findProduct(searchSubCatIndex);
        if (found) {
            setProductData(found);
            setModifires(found.ModifierWizards || []);
            const existing = kartItem?.find(i => i.ProductId === found.ProductId);
            if (existing) {
                setPendingQty(existing.quantity);
                setIsInCart(true);
            } else {
                setPendingQty(1);
                setIsInCart(false);
            }
        }
    }, [activeCard, searchSubCatIndex]);

    // Sync with cart changes (after add/remove)
    useEffect(() => {
        if (productData) {
            const existing = kartItem?.find(i => i.ProductId === productData.ProductId);
            if (existing) {
                setPendingQty(existing.quantity);
                setIsInCart(true);
            }
        }
    }, [kartItem, productData]);

    // Close without adding
    const handleClose = () => {
        setActiveCard(undefined);
        setProductData(null);
        setModifires([]);
        setPendingQty(1);
        setIsInCart(false);
        document.body.classList.remove("open-detail");
    };

    // Add to cart (first time or increment)
    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (productData) {
            addQuantityAndRemoveClass(productData);
        }
    };

    // Remove from cart (decrement)
    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        if (productData && isInCart) {
            const finddata = kartItem.find((item) => item.ProductId === productData.ProductId);
            if (finddata) {
                minusQuantityKart(finddata);
            }
        } else {
            // Not in cart yet, just decrease pending
            setPendingQty(prev => Math.max(0, prev - 1));
        }
    };

    // Increase pending qty (before adding to cart)
    const handleIncreasePending = (e) => {
        e.stopPropagation();
        if (isInCart) {
            handleAddToCart(e);
        } else {
            setPendingQty(prev => prev + 1);
        }
    };

    // Decrease pending qty
    const handleDecreasePending = (e) => {
        e.stopPropagation();
        if (isInCart) {
            handleRemoveFromCart(e);
        } else {
            setPendingQty(prev => Math.max(0, prev - 1));
        }
    };

    if (!productData || !activeCard) return null;

    const basePrice = parseFloat(productData?.Price) || 0;
    const modifierTotal = parseFloat(discriptionTotal) || 0;
    const totalPrice = basePrice + modifierTotal;
    const currency = currencyValue || "€";
    const hasModifiers = modifires && modifires.length > 0;
    const displayQty = pendingQty;
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

                <div className="pds-image">
                    <img
                        src={productData?.ProductDetails?.ProductPictureUrl || productData?.SmallPictureUrl}
                        alt={productData?.Name}
                        loading="lazy"
                    />
                </div>

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

                {/* Footer */}
                {active && (
                    <div className="pds-footer">
                        <div className="pds-qty-row">
                            <div className="pds-qty-stepper">
                                <button
                                    className="pds-qty-btn"
                                    onClick={handleDecreasePending}
                                    disabled={displayQty === 0}
                                    style={{ opacity: displayQty === 0 ? 0.3 : 1 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                                <span className="pds-qty-value">{displayQty}</span>
                                <button className="pds-qty-btn" onClick={handleIncreasePending}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4v12M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                            <button
                                className="pds-add-btn"
                                style={{
                                    backgroundColor: displayQty > 0 ? activeColor : '#ccc',
                                    pointerEvents: displayQty > 0 ? 'auto' : 'none'
                                }}
                                onClick={(e) => {
                                    if (isInCart) {
                                        // Already in cart, just close
                                        handleClose();
                                    } else {
                                        // Add to cart then close
                                        handleAddToCart(e);
                                        setTimeout(handleClose, 200);
                                    }
                                }}
                            >
                                {isInCart
                                    ? `Done · ${currency} ${(totalPrice * displayQty).toFixed(2)}`
                                    : `Add to cart · ${currency} ${(totalPrice * displayQty).toFixed(2)}`
                                }
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetailSheet;
