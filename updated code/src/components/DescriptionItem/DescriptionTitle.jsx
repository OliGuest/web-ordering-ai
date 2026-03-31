import React from 'react'
import Parser from 'html-react-parser';
import "./DescriptionItem.css";

const DescriptionTitle = ({ description, orderTheme, bold, classProp }) => {

    const fromArrayToString = description.toString();
    let stripedHtml = fromArrayToString.replace(/<[^>]+>/g, '');
    let finalText = Parser(stripedHtml);


    return (
        <>
            {finalText.length > 40 ?

                <h6 className={`mb-0 mr-0 card-title-small ${classProp}`} style={{ color: `${orderTheme?.ProductTextColor}` }}>
                    {finalText}
                </h6>

                :

                <h6 className={`mb-0 mr-0 card-title ${classProp}`} style={{ color: `${orderTheme?.ProductTextColor}` }}>
                    {finalText}
                </h6>

            }

        </>
    )
}

export default DescriptionTitle;