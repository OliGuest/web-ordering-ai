import React from 'react'
import Parser from 'html-react-parser';
import "./DescriptionItem.css";

const DescriptionItemAllText = ({ description }) => {

    const fromArrayToString = description.toString();
    let stripedHtml = fromArrayToString.replace(/<[^>]+>/g, '');
    let finalText = Parser(stripedHtml);

    return (
        <div className='p-0'>
            {finalText === '.' ? "" :
                <p className="all-text">
                    {finalText}
                </p>}

        </div>
    )
}

export default DescriptionItemAllText;