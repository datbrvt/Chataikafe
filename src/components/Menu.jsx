import React from 'react'

/**
 * Node modules
 */

import PropTypes from 'prop-types'



const Menu = ({ classes = '', children }) => {
    return (
        <div className={`menu ${classes}`}>{children}</div>)
}

Menu.propTypes = {
    class: PropTypes.string,
    children: PropTypes.any,
}

export default Menu