import React from "react";
import {OnboardingFlow} from "../../components/OnboardingFlow";

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="auth-wrapper bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Registration</h1>
                <OnboardingFlow />
            </div>
        </div>
    );
};

export default RegisterPage;