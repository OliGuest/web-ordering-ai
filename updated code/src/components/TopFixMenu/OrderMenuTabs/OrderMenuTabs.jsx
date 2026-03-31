import { React, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../context/kartItemContext";
import { Fragment } from "react";
import './OrderMenuTabs.css';
import { useSearchData } from "../../../Hooks/useSearchData";
import { useToggleOnFocus } from "../../../Hooks/useToggleOnFocus ";
var $ = require("jquery");

const OrderMenuTabs = ({ visible, handleShow }) => {

    const {
        inititalIndex,
        index,
        setShow1,
        show,
        show1,
        setSearchSubCatIndex

    } = useContext(Context);

    const [searchTextInner, setsearchTextInner] = useState("");
    const [searchdata] = useSearchData();
    const [showElem, eventHandlers] = useToggleOnFocus();
    const topMenuRef = useRef(null);

    const scrollToItem = (e) => {
        e.preventDefault();

        const clickedLi = e.currentTarget; // Get the clicked li element
        const subCategoryId = clickedLi.getAttribute("subcatid");
        const container = $(".order-listing");
        const scrollTo = $("#menu-list-wrapper-" + subCategoryId);

        if (scrollTo.offset() !== undefined) {

            const divTopHeight = scrollTo.offset().top;
            const containerTop = container.offset().top;

            let calc = divTopHeight - containerTop + (container.scrollTop() - $("#top-menu").outerHeight()) - 60;

            container.animate(
                {
                    scrollTop: calc
                },
                600
            );
        }
    }


    const clearField = (e) => {
        setsearchTextInner("");
    }

    useEffect(() => {
        // setsearchTextInner(searchTextInner);
    }, [searchTextInner]);

    useEffect(() => {

        const handleScroll = (e) => {
            // Prevent default anchor behavior
            e.preventDefault();
            const sections = document.querySelectorAll(".section");
            const navLi = document.querySelectorAll(".nav-link");

            var current = "";
            var topMenu = document.querySelector("#top-menu")
            const topMenuHeight = topMenu.offsetHeight;
            const orderListBody = document.querySelector('.order-listing');
            const fromTop = orderListBody.scrollTop + topMenuHeight;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop + 320;
                if (fromTop > sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            navLi.forEach((li) => {
                if (fromTop > 350) {
                    li.classList.remove("active");

                    if (li.classList.contains(current)) {
                        li.classList.add("active");
                        const wrapper = document.querySelector(".order-menu-tabs");
                        const activeLiOffset = li.offsetLeft;
                        const containerWidth = wrapper.offsetWidth;
                        const activeLiWidth = li.offsetWidth;

                        // Scroll the container to bring the active li into view
                        const scrollAmount = activeLiOffset - (containerWidth - activeLiWidth) / 2;
                        wrapper.scrollLeft = scrollAmount;
                    }
                }
            });
            // End N
        }


        // Add scroll event listener
        const orderListBody = document.querySelector('.order-listing');
        orderListBody.addEventListener('scroll', handleScroll);

        // Remove scroll event listener on component unmount
        return () => {
            orderListBody.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className="menu-search">

            <div className={`search ${showElem && "focus"}`} {...eventHandlers} >
                <input type="checkbox" id="trigger" className="search__checkbox" />
                <label className="search__label-init" htmlFor="trigger"></label>
                <label className="search__label-active" htmlFor="trigger" onClick={(e) => {
                    setSearchSubCatIndex(index);
                    clearField();
                    setShow1(!show1);
                }}></label>
                <div className="search__icon"></div>
                <div className="search__border"></div>
                <input type="text" className="search__input" onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                }}
                    onChange={(e) => {
                        searchdata(e.target.value);
                        setsearchTextInner(e.target.value);
                        setShow1(!show);
                    }}
                    value={searchTextInner}/>
                <div className="search__close"></div>
            </div>
           

            {index !== undefined && index && index.length > 0 ? (
                <ul
                    className="nav order-menu-tabs nav-link-active"
                    id="top-menu"
                    ref={topMenuRef}
                >
                    {index[inititalIndex].SubCategories.map((data, index) => (
                        <Fragment key={index}>
                            {data?.Products.length > 0 ? (
                                <Fragment key={index}>

                                    <li className="nav-item" key={index}>
                                        <a className={`nav-link top-menu menu-list-wrapper-${data.SubCategoryId} ${index === 0 ? 'active' : ''}`}
                                            subcatid={data.SubCategoryId}
                                            // id={"clickTab_" + data.SubCategoryId}
                                            href={"/"}
                                            onClick={(e) => scrollToItem(e)}>
                                            {data?.Name}
                                        </a>{" "}
                                    </li>
                                </Fragment>
                            ) : (
                                <></>
                            )}
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default OrderMenuTabs;