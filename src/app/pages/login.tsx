import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { useFormik, FormikErrors, } from 'formik';
import { postData } from '@/utils/network';
import { GET_SERVER_URL, SERVER_URL_RECEIVED } from '@/utils/stringKeys';
import { ipcRenderer } from 'electron';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { useSignIn } from 'react-auth-kit'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const serverUrl = useRef("");
    const toast = useRef<Toast>(null);
    const history = useNavigate();
    const signIn = useSignIn();
    const showSuccess = (message: string) => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    }
    const showError = (message: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }
    const formik = useFormik<{ password: string }>({
        initialValues: {
            password: ''
        },
        validate: (values: { password: string }) => {
            let errors: FormikErrors<{ password: string }> = {};
            if (!values.password) {
                errors.password = 'The password is required';
            }
            return errors;
        },
        onSubmit: async (data) => {

            try {
                setLoading(true);
                const res = await postData<string>(`${serverUrl.current}/api_admin/admin_login`,
                    data);
                if (signIn(
                    {
                        token: res.data,
                        expiresIn: 3600,
                        tokenType: "Bearer"}
                )) {
                    showSuccess('Logged in successfully');
                    setLoading(false);
                    history('/');
                } else {
                    throw new Error("Error signing in. Please try again")
                }

                
                //go back to home
            } catch (error) {
                showError(`error occurred: ${error}`);
                setLoading(false);
            }
        }
    });

    useEffect(() => {

        const handleServerUrlReceived = async (event: any, data: any) => {
            serverUrl.current = data.data;

        };

        ipcRenderer.send(GET_SERVER_URL);

        ipcRenderer.on(SERVER_URL_RECEIVED, handleServerUrlReceived)

        return () => {
            ipcRenderer.removeListener(SERVER_URL_RECEIVED, handleServerUrlReceived);
        };
    }, [serverUrl]);

    const resetPassword = async() => {
        try {
            setLoading(true);
            let response = await postData<{error:boolean, message:any}>(`${serverUrl.current}/api_admin/resetAdminLogin`,
                {});
            if (response.data.error) {
                alert("There was an error sending your token. Please check your connection and click on the 'Forgot Password' to try again")
            }
            else {
                setLoading(false);
                showSuccess("Email sent successfully. Please check your email for the reset token")
                history('/resetPassword');
            }
            
        } catch (error) {
            showError(`error occurred: ${error}`);
            setLoading(false);
        }
    }

    return (
        <>
            <Header showBackArrow={true}></Header>
            <div className="container">
                <form onSubmit={formik.handleSubmit} >
                    <div className="flex-column align-items-center justify-content-center">
                    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div className="text-center mb-5">
                            <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Log in as the administrator</div>
                        </div>

                            <div className='flex-column align-items-center justify-content-center' >
                            <label htmlFor="password" className="block text-900 font-medium mb-2">Admin Password</label>
                                <InputText id="password" type="password" 
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.setFieldValue('password', e.target.value);
                                    }}
                                    className={classNames({
                                        'p-invalid': (formik.touched.password && formik.errors.password),
                                        'w-full mb-3': true
                                    })}

                                />


                            <div className="flex align-items-center justify-content-between mb-6">

                                <a onClick={resetPassword} className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                            </div>

                            <Button loading={loading} label="Sign In" icon="pi pi-user" className="w-full" />
                        </div>
                    </div>
                    </div>
                </form>
            </div>
            <Toast ref={toast} />
        </>
    )
}
