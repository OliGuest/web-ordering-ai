import React, {useState} from 'react'
import Parser from 'html-react-parser';


function DescriptionItem(props) {

    const [readMore, setReadMore] = useState(false);
    let stripedHtml = props.description.replace(/<[^>]+>/g, '');
    let finalText = Parser(stripedHtml);
    
    const changeReadMore = () => {
        setReadMore(true);
    }

  return (
    <div className='scrollerdiv desc'>
        { finalText.length > 100 && !readMore ? 
            
                <p className="pl-20 pr-20">
                { finalText.substring(0,100) } 
                <button className="readmore-btn mt-2" onClick={ changeReadMore }>
                    Read More.....
                </button>
                </p>
            
        :
         
                <p className="pl-20 pr-20">
                { finalText }
                </p>
            
        }
        
    </div>
  )
}

export default DescriptionItem