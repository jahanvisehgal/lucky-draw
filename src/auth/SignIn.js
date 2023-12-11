import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SignInComponent = () => {
    const { setAuthToken } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/auth/login', formData);
            const { token, expiresAt } = response.data;

            setAuthToken(token, expiresAt);
            setFormData({ username: '', password: '' });
            toast.info('Login successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error('Login not successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">

            <div className="md:w-1/2 p-4 mb-0">
                <img
                    className="w-full h-[70vh] md:h-full object-cover rounded-lg"
                    src="https://ik.imagekit.io/ep1jdi37yy7/WhatsApp%20Image%202023-12-03%20at%207.40.32%20PM_eHuH1DfDt.png?updatedAt=1702314866763"
                    alt="Registration"
                />
            </div>

            <div className="md:w-1/2 flex flex-col items-center justify-center p-4 bg-gray-100 md:mt-0 mt-8">
                <h2 className="text-3xl mb-6 font-bold text-blue-700">Shyam Lucky Draw</h2>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    type="submit"
                >
                    Check Result
                </button>
            </div>
        </div>

    );
};

export default SignInComponent;
