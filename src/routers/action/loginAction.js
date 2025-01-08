import { redirect } from "react-router-dom";

/**
 * Custom modules
 */

import { account } from "../../lib/appwrite";

/**
 * Handle the login actionm
 */

const loginAction = async ({ request }) => {
    const formData = await request.formData()

    try {
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password')
        )
        return redirect('/')
    } catch (err) {
        return {
            message: err.message,
        }
    }
}

export default loginAction