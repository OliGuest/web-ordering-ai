import React from 'react'
import Parser from 'html-react-parser';
import { useTranslation } from "react-i18next";
import "./DescriptionItem.css";

const DescriptionItem = ({ description, descriptionSet }) => {

  const fromArrayToString = description.toString();
  let stripedHtml = fromArrayToString.replace(/<[^>]+>/g, '');
  let finalText = Parser(stripedHtml);

  const { t } = useTranslation();
  return (
    <div className='p-0'>
      {finalText.length > 45 ? (
        <p className="readmore-btn">
          {finalText.substring(0, 45)}
          <em>...{t("IbIReadMore")}</em>
        </p>
      ) : (
          finalText === '.' || finalText === ".,," ? "" :
          <p className="all-text">
            {finalText}
          </p>
      )}
    </div>
  )
}

export default DescriptionItem;