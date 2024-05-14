import { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import './form.css'
import logowhite from '../media/logowhite.png'


export default function ResetPassword() {

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    // const navigate = useNavigate()

    const { uid, token } = useParams();

    const handlePasswordChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            password: e.target.value,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            confirmPassword: e.target.value,
        }));
    };

    const validateForm = (formData) => {
        if (formData.password !== formData.confirmPassword) {
            return {
                isValid: false,
                errorMessage: 'Passwords do not match!',
            };
        }

        return {
            isValid: true,
            errorMessage: ''
        }
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formValidation = validateForm(formData)

        if (!formValidation.isValid) {
            setErrorMessage(formValidation.errorMessage)
            setLoading(false)
        }
        else {
            setErrorMessage('')
            const password = formData.password
            try {
                const response = await axios.put(`http://110.44.121.73:2564/reset/${uid}/${token}`, { password })
                setResponse(response.data)
            } catch (e) {
                setErrorMessage(e.response.data)
            }
        }
        setLoading(false)
    }

    return (
        <main className="h-screen bg-265073 main">
            {loading && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            )}
            <div className='h-auto'>
                <img src={logowhite} alt="img" className='h-20 w-auto mx-10' />
            </div>
            <div className="flex max-h-full flex-col justify-center bg-white w-96 md:max-w-50 m-auto rounded-lg form py-5">
                <div className="w-full mb-3">
                    <h2 className="text-center text-2xl font-bold text-gray-900 ">Enter new password</h2>
                </div>
                <div className="w-full">
                    <form className="px-10" onSubmit={handleFormSubmission}>
                        <label htmlFor="password" className="text-gray-900 block">Password</label>
                        <div>
                            <input id="password" name="password" type="password" required value={formData.password}
                                className="border-2 rounded-md p-1 mb-4 block w-full"
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <label htmlFor="confirmPassword" className="text-gray-900 block">Confirm Password</label>
                        <div>
                            <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword}
                                className="border-2 rounded-md p-1 mb-4 block w-full"
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>

                        {errorMessage &&
                            <p className="text-sm font-semibold text-red-600 w-full text-center">{errorMessage}</p>
                        }

                        {response &&
                            <div className="flex flex-col items-center">
                                <p className="text-sm font-semibold text-gray-900 w-full text-center">{response}</p>
                                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-400">Click to Login</Link>
                            </div>
                        }

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Email</button>
                        </div>
                    </form>
                </div>
            </div>
        </main >
    )

}


// raxb wwyd gntu ykvi