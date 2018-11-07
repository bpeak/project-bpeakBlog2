import React from 'react'
import PropTypes from 'prop-types'
//components
import AutoPopup from './AutoPopup/AutoPopup'
import AlertPopup from './AlertPopup/AlertPopup'
//local modules
import * as popupImgSrcs from './popupImgSrcs'

const Popup = (props) => {
    const { closePopup, popup } = props
    switch(popup.popupType){
        case 'AUTO' :
        return (
            <AutoPopup
            imgSrc={popupImgSrcs[popup.icon]}
            closePopup={closePopup}
            title={popup.title}
            description={popup.description}
            />
        )
        case 'ALERT' :
        return (
            <AlertPopup
            imgSrc={popupImgSrcs[popup.icon]}
            closePopup={closePopup}
            title={popup.title}
            description={popup.description}
            />
        )
    }
}

Popup.propTypes = {
    popup : PropTypes.shape({
        unique_id : PropTypes.string.isRequired,
        popupType : PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
    }).isRequired,
    closePopup : PropTypes.func.isRequired
}

export default Popup