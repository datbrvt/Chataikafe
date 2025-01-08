/**
 * Node modules
 */

import { Link, Form, useNavigation, useActionData } from 'react-router-dom'


/**
 * Assents
 */

import { banner } from '../assets/assets'

/**
 * Custom hooks
 */

import { useSnackbar } from '../hooks/useSnackbar'

/**
 * Components
 */
import { CircularProgress, LinearProgress } from '../components/Progress'
import PageTitle from '../components/PageTitle'
import TextField from '../components/TextField'
import { Button } from '../components/Button'
import Logo from '../components/Logo'


import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

const ResetPassword = () => {
    const actionData = useActionData();
    const navigation = useNavigation();

    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (actionData?.message) {
            showSnackbar({
                message: actionData.message,
                type: actionData.ok ? 'info' : 'error',
                timeOut: 8000,
            })
        }
    }, [actionData, showSnackbar])
    return (
        <>
            <PageTitle title='New password' />
            <div className='relative lg:gap-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] p-2 w-screen h-dvh'>
                <div className="flex flex-col p-4">
                    <Logo classes='mx-auto lg:mx-0 mb-auto max-w-max'/>

                    <div className="flex flex-col gap-2 mx-auto w-full max-w-[480px]">
                        <h2 className='font-semibold text-center text-displaySmall text-light-onBackground dark:text-dark-onBackground'>Set a new password</h2>

                        <p className='mt-1 mb-5 px-2 text-bodyLarge text-center text-light-onSurface dark:text-dark-onSurfaceVariant'>
                            Please choose a password that hasn't been used before. Must be at least 8 characters.
                        </p>

                        <Form method='POST' className='gap-4 grid grid-cols-1'>
                            <TextField
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='New password'
                                required={true}
                                autoFocus={true}
                            />
                            <Button
                                type='submit'
                                disabled={navigation.state === 'submitting'}

                            >
                                {navigation.state === 'submitting'
                                    ? (<CircularProgress size='small' />)
                                    : ('Reset password')}
                            </Button>
                        </Form>
                    </div>

                    <p className="mx-auto lg:mx-0 mt-auto text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                        @copy; 2024 NTDPROG. All right reserved
                    </p>
                </div>

                <div className="lg:block lg:relative hidden lg:rounded-large img-box">
                    <img
                        src={banner}
                        alt=""
                        className="w-full h-full img-cover object-cover"
                    />

                    <p className='right-12 text-right bottom-10 left-12 z-10 absolute drop-shadow-sm font-semibold text-displayLarge text-light-onSurface 2xl:text-[72px] leading-tight'>
                        Chat with Phoenix to supercharge your ideas
                    </p>
                </div>
            </div>
            <AnimatePresence>
                {navigation.state === 'loading' && (
                    <LinearProgress classes='top-0 right-0 left-0 absolute' />
                )}
            </AnimatePresence>
        </>
    )
}

export default ResetPassword