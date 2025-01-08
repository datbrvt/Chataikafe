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


const Register = () => {
    const error = useActionData();
    console.log(error)
    const navigation = useNavigation();

    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (error?.message) {
            showSnackbar({
                message: error.message,
                type: 'error',
            })
        }
    }, [error, showSnackbar])
    return (
        <>
            <PageTitle title='Create an account' />
            <div className='relative lg:gap-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] p-2 w-screen h-dvh'>
                <div className="flex flex-col p-4">
                    <Logo classes='mb-auto mx-auto lg:mx-0'/>

                    <div className="flex flex-col gap-2 mx-auto w-full max-w-[480px]">
                        <h2 className='font-semibold text-center text-displaySmall text-light-onBackground dark:text-dark-onBackground'>Create an acount</h2>

                        <p className='mt-1 mb-5 px-2 text-bodyLarge text-center text-light-onSurface dark:text-dark-onSurfaceVariant'>
                            Register today and gain to powerful tools that will supercharge your ideas
                        </p>

                        <Form method='POST' className='gap-4 grid grid-cols-1'>
                            <TextField
                                type='text'
                                name='name'
                                label='Full name'
                                placeholder='Full name'
                                required={true}
                                autoFocus={true}
                                helperText=''
                            />
                            <TextField
                                type='email'
                                name='email'
                                label='Email'
                                placeholder='Email'
                                required={true}
                            />

                            <TextField
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Enter your Password'
                                required={true}
                            />

                            <Button
                                type='submit'
                                disabled={navigation.state === 'submitting'}

                            >
                                {navigation.state === 'submitting'
                                    ? (<CircularProgress size='small' />)
                                    : ('Create account')}
                            </Button>
                        </Form>

                        <p className="mt-4 text-bodyMedium text-center text-light-onSurface dark:text-dark-onSurface">
                            Already have an account?

                            <Link
                                to='/login'
                                className='inline-block text-labelLarge text-light-onSurface dark:text-dark-onSurface link ms-1'
                            >
                                Sign in
                            </Link>
                        </p>
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

export default Register