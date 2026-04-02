import { React, useContext } from "react";
import { Context } from "../../context/kartItemContext";
import { useGetProductQuantityInCart } from "../../Hooks/useGetProductQuantityInCart";
import { useMenuWarapper } from "../../Hooks/useMenuWarapper";
import Parser from "html-react-parser";
import "./ProductCard.css";

const ProductCard = ({ data, index, propClass }) => {
    const {
        currencyValue,
        active,
        orderTheme,
        activeColor,
        setClickedCardId,
        t,
    } = useContext(Context);

    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    const [menuWarapper] = useMenuWarapper();

    const qty = getProductQuantityInCart(data);

    // Extract description text
    const descText = data?.ProductDetails?.MenuItems
        ?.filter((p) => p.LayoutType === 1 && p.HtmlContent)
        .map((p) => p.HtmlContent.replace(/<[^>]+>/g, ""))
        .join(" ")
        .trim();

    const parsedDesc = descText ? Parser(descText) : null;
    const shortDesc =
        descText && descText.length > 80
            ? descText.substring(0, 80) + "..."
            : descText;

    return (
        <div
            className="product-card"
            onClick={() => menuWarapper(data, index)}
        >
            {/* Image left */}
            {data?.SmallPictureUrl && (
                <div className="product-card__img">
                    <img
                        src={data.SmallPictureUrl}
                        alt={data?.Name}
                        loading="lazy"
                    />
                    {data?.IsPromotion && (
                        <span className="product-card__promo">
                            {t("IbIPromo")}
                        </span>
                    )}
                </div>
            )}

            {/* Text middle */}
            <div className="product-card__info">
                <h6
                    className="product-card__title"
                    style={{ color: orderTheme?.ProductTextColor }}
                >
                    {data?.Name}
                </h6>

                {shortDesc && (
                    <p className="product-card__desc">{shortDesc}</p>
                )}

                {data?.Price !== 0 ? (
                    <span className="product-card__price">
                        {currencyValue ? currencyValue : "€ "}
                        {parseFloat(data?.Price).toFixed(2)}
                    </span>
                ) : null}
            </div>

            {/* Plus button right */}
            {active && (
                <div className="product-card__right">
                    {qty !== "" && (
                        <span
                            className="product-card__qty"
                            style={{ backgroundColor: activeColor }}
                        >
                            {qty}
                        </span>
                    )}
                    <button
                        className="product-card__plus"
                        onClick={(e) => {
                            e.stopPropagation();
                            menuWarapper(data, index);
                            setClickedCardId(propClass);
                        }}
                        style={{
                            background: activeColor
                                ? `${activeColor}15`
                                : "#f5f5f7",
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M17 9H11V3H9V9H3V11H9V17H11V11H17V9Z"
                                fill={activeColor || "#E7A536"}
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
