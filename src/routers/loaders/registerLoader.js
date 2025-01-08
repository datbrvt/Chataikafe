/**
 * Node modules
 */

import { redirect } from "react-router-dom";

/**
 * Custom Modules
 */

import { account } from "../../lib/appwrite";

const registerLoader = async () => {
    try {
        await account.get()
    } catch (err) {
        console.log(`Error getting user seesion: ${err.message}`)
        return null
    }

    return redirect('/')
}

export default registerLoader