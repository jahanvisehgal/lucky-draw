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
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                <img
                    className="max-w-full max-h-full"
                    src="https://ik.imagekit.io/ep1jdi37yy7/WhatsApp%20Image%202023-12-03%20at%207.40.32%20PM_5Tmx4UwtRL.jpeg?updatedAt=1702205801282"
                    alt="Registration"
                />
            </div>

            <div className="w-1/2 flex items-center justify-center">
                <form className="w-1/2" onSubmit={handleFormSubmit}>
                    <h2 className="text-3xl mb-6 font-bold text-gray-800">Shyam lucky draw</h2>
                    <div className="mb-4">
                        <input
                            className="w-full p-2 border rounded placeholder-gray-400"
                            type="email"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            className="w-full p-2 border rounded placeholder-gray-400"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        type="submit"
                    >
                        Register
                    </button>
                    <div class="pt-2">
                        <p className="text-gray-600 text-lg mb-2">
                            Do not have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-500 hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInComponent;
