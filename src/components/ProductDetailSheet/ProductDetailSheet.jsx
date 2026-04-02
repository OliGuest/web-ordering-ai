import { React, useContext, useState, useEffect, useRef, useCallback } from "react";
import "./ProductDetailSheet.css";
import { Context } from "../../context/kartItemContext";
import ModifiresList from "../Modifires/Modifires";
import { useCalculateTotalAccToWizard } from "../../Hooks/useCalculateTotalAccToWizard";
import { useOnHandleModifires } from "../../Hooks/useOnHandleModifires";
import { useGetSelectedModifierItem } from "../../Hooks/useGetSelectedModifierItem";
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
        sendDataToServer,
        modifierSelectedTrue,
        setModifierSelectedTrue,
        setError,
        setErrorModifiers,
        setDiscriptionTotal,
    } = useContext(Context);

    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    const [onHandleModifires] = useOnHandleModifires();
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [productData, setProductData] = useState(null);
    const [modifires, setModifires] = useState([]);

    // Find product data when activeCard changes
    useEffect(() => {
        if (!activeCard || !searchSubCatIndex) {
            setProductData(null);
            setModifires([]);
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
        }
    }, [activeCard, searchSubCatIndex]);

    // Get current quantity from cart
    const cartItem = kartItem?.find(i => i.ProductId === productData?.ProductId);
    const currentQty = cartItem?.quantity || 0;

    // Close sheet
    const handleClose = () => {
        setActiveCard(undefined);
        setProductData(null);
        setModifires([]);
        document.body.classList.remove("open-detail");
    };

    // Get selected modifiers from DOM
    const getSelectedModifiers = () => {
        const selectedModifiers = [];
        document.querySelectorAll('.modifiersbox:checked').forEach(el => {
            selectedModifiers.push({
                mModifiersWizardId: el.getAttribute('mdata-ModifiersWizardId'),
                mIdOtherPos: el.getAttribute('mdata-IdOtherPos'),
                mProductId: el.getAttribute('mdata-ProductId'),
                mPrice: el.getAttribute('mdata-Price'),
                mName: el.getAttribute('mdata-Name'),
            });
        });
        return selectedModifiers;
    };

    // Check required modifiers
    const checkRequiredModifiers = () => {
        if (!productData?.ModifierWizards) return true;
        let isValid = true;
        productData.ModifierWizards.forEach((modif) => {
            if (modif?.IsMandatory && !modifierSelectedTrue.includes(modif.ModifierId)) {
                isValid = false;
                setError(modif.ModifierId);
                setErrorModifiers((prev) => [...prev, modif.ModifierId]);
            }
        });
        return isValid;
    };

    // ADD: directly add 1 to cart
    const handlePlus = (e) => {
        e.stopPropagation();
        if (!productData) return;

        if (productData?.OutOfStock) return;

        // Check required modifiers on first add
        if (currentQty === 0 && !checkRequiredModifiers()) return;

        const selectedModifiers = getSelectedModifiers();

        const itemToSend = {
            ...productData,
            quantity: 1,
            basePrice: productData.Price,
            selectedModifiersData: selectedModifiers,
            modifierPrice: selectedModifiers.map(obj => parseFloat(obj.mPrice)),
            selectedModifierIdOtherPos: 0,
        };

        console.log(`[Cart+] Adding 1x "${productData.Name}" (ID: ${productData.ProductId}) | Cart qty: ${currentQty} → ${currentQty + 1}`);
        sendDataToServer([itemToSend]);

        // Clear modifiers after first add
        if (currentQty === 0) {
            const checks = document.getElementsByClassName("clear-checked");
            for (let i = 0; i < checks.length; i++) {
                checks[i].checked = false;
                setModifierSelectedTrue([]);
            }
        }

        document.body.classList.add("open-cart");
        document.body.classList.add("open");
        setDiscriptionTotal(0);
    };

    // MINUS: remove 1 from cart, delete if last one
    const handleMinus = (e) => {
        e.stopPropagation();
        if (!productData || currentQty <= 0) return;

        const itemToSend = {
            ...cartItem,
            quantity: -1,
        };

        console.log(`[Cart-] Removing 1x "${productData.Name}" (ID: ${productData.ProductId}) | Cart qty: ${currentQty} → ${currentQty - 1}`);

        if (currentQty === 1) {
            console.log(`[Cart] Deleting "${productData.Name}" from cart (was last item)`);
        }

        sendDataToServer([itemToSend]);
    };

    // Swipe down to close
    const sheetRef = useRef(null);
    const swipeStartY = useRef(0);
    const swipeCurrentY = useRef(0);
    const isSwiping = useRef(false);

    const onSwipeStart = useCallback((e) => {
        const sheet = sheetRef.current;
        if (!sheet) return;
        // Only allow swipe when scrolled to top
        if (sheet.scrollTop > 5) return;
        swipeStartY.current = e.touches[0].clientY;
        swipeCurrentY.current = swipeStartY.current;
        isSwiping.current = true;
        sheet.style.transition = "none";
    }, []);

    const onSwipeMove = useCallback((e) => {
        if (!isSwiping.current || !sheetRef.current) return;
        swipeCurrentY.current = e.touches[0].clientY;
        const diff = swipeCurrentY.current - swipeStartY.current;
        if (diff > 0) {
            sheetRef.current.style.transform = `translateY(${diff * 0.55}px)`;
        }
    }, []);

    const onSwipeEnd = useCallback(() => {
        if (!isSwiping.current || !sheetRef.current) return;
        const diff = swipeCurrentY.current - swipeStartY.current;
        const sheet = sheetRef.current;
        sheet.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";
        if (diff > 80) {
            sheet.style.transform = "translateY(100%)";
            setTimeout(handleClose, 280);
        } else {
            sheet.style.transform = "translateY(0)";
            setTimeout(() => { sheet.style.transform = ""; sheet.style.transition = ""; }, 300);
        }
        isSwiping.current = false;
    }, []);

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

    // Total items in cart for logging
    const totalCartItems = kartItem?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

    return (
        <>
            <div className="pds-backdrop" onClick={handleClose} />

            <div className="pds-sheet"
                ref={sheetRef}
                onTouchStart={onSwipeStart}
                onTouchMove={onSwipeMove}
                onTouchEnd={onSwipeEnd}
            >
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

                {/* Footer with +/- and cart button */}
                {active && (
                    <div className="pds-footer">
                        <div className="pds-qty-row">
                            <div className="pds-qty-stepper">
                                {/* Minus / Delete button */}
                                <button
                                    className="pds-qty-btn"
                                    onClick={handleMinus}
                                    disabled={currentQty === 0}
                                    style={{ opacity: currentQty === 0 ? 0.3 : 1 }}
                                >
                                    {currentQty === 1 ? (
                                        // Trash icon when qty is 1
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                                                stroke="#e5484d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    ) : (
                                        // Minus icon
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                        </svg>
                                    )}
                                </button>

                                <span className="pds-qty-value">{currentQty}</span>

                                {/* Plus button */}
                                <button className="pds-qty-btn" onClick={handlePlus}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4v12M4 10h12" stroke={activeColor} strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Add / Done button */}
                            <button
                                className="pds-add-btn"
                                style={{ backgroundColor: activeColor }}
                                onClick={(e) => {
                                    if (currentQty === 0) {
                                        handlePlus(e);
                                    } else {
                                        console.log(`[Cart] Done — "${productData.Name}" qty: ${currentQty} | Total cart items: ${totalCartItems}`);
                                        handleClose();
                                    }
                                }}
                            >
                                {currentQty === 0
                                    ? `${t("lblAddToBasket") || "Add"} · ${currency} ${totalPrice.toFixed(2)}`
                                    : `${t("lblDone") || "Done"} · ${currency} ${(totalPrice * currentQty).toFixed(2)}`
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
