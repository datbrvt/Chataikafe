/**
 * Node modules
 */

import { figure } from "framer-motion/client";
import PropTypes from "prop-types";

/**
 * Custom modules
 */

import { avatars } from "../lib/appwrite";


const Avatar = ({ name }) => {
    return (
        <figure className="avatar">

            <img
                src={avatars.getInitials(name, 48, 48)}
                alt={name}
                width={48}
                height={48}
            />
        </figure>
    )
}

Avatar.propTypes = {
    name: PropTypes.string,
}

export default Avatar