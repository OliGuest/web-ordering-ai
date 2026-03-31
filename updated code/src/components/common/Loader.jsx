/**
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

import React from 'react';
//import ImgTag from './ImgTag';
function Loader() {
    return (
        <div className="maindiv" >
            <div>
                <div className="loadericon">
                    <div className="outerCircle"></div>
                    <div className="icon">
                        {/* <ImgTag src={process.env.PUBLIC_URL + '/assets/images/loader-icon.png'} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Loader
