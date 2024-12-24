import React, {useState, useEffect, use} from 'react';
import { useHttp } from "../../hooks/http.hook";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import * as process from "process";

interface PageSettings {
    components: string[];
}
interface UserData {
    email: string;
    password: string;
    aboutMe?: string;
    address?: string;
    birthdate?: Date | null;
}

const OnboardingFlow: React.FC = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;
    const { loading, request } = useHttp();
    const [step, setStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: '',
        aboutMe: '',
        address: '',
        birthdate: null,
    });
    const [pageSettings, setPageSettings] = useState<PageSettings | null>(null);

    useEffect(() => {
        const fetchPageSettings = async () => {
            const page = `Page${step}`;
            try {
                const response = await request(`${process.env.REACT_APP_BACKEND_URL}/admin/settings/${page}`, 'GET', null);
                setPageSettings(response.pageSettings);
            } catch (error) {
                console.error("Error fetching page settings:", error);
            }
        };

        step > 1 && fetchPageSettings();
    }, [step, request]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLElement>
    ) => {
        const { name, value, type }: any = e.target;

        if (type === 'date') {
            setUserData({
                ...userData,
                [name]: new Date(value).toLocaleDateString(),
            });
        } else {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            setErrorMessage(null);
            const response = await request(`${process.env.REACT_APP_BACKEND_URL}/users`, 'POST', userData);

            if (!response) {
                setErrorMessage('Registration failed! Please check your email.');
            }
        } catch (err) {
            throw err;
        }
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const renderStepFields = () => {
        if (!pageSettings) return null;

        const componentsForCurrentStep = pageSettings.components || [];

        return componentsForCurrentStep.map((component: string) => {
            switch (component) {
                case 'about_me':
                    return (
                        <Input
                            className="mb-2"
                            key="aboutMe"
                            type="text"
                            name="aboutMe"
                            value={userData.aboutMe || ""}
                            onChange={handleChange}
                            placeholder="About me"
                        />
                    );
                case 'address':
                    return (
                        <Input
                            className="mb-2"
                            key="address"
                            type="text"
                            name="address"
                            value={userData.address || ""}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                    );
                case 'birthdate':
                    return (
                        <DatePicker
                            selected={userData.birthdate}
                            onChange={(value: any) => {
                                if (value !== null) {
                                    setUserData({
                                        ...userData,
                                        birthdate: value,
                                    });
                                }
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Date of birth"
                            className="outline-none w-[310px] pr-12 border border-gray-300 rounded px-2 py-1 text-gray-700"
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div>
            {loading && <p>Loading...</p>}

            {step === 1 && (
                <>
                    <Input
                        className="mb-2"
                        key="email"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="E-mail address"
                        validationRegex={emailRegex}
                    />
                    <Input
                        key="password"
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        validationRegex={passwordRegex}
                    />
                </>
            )}

            {step > 1 && renderStepFields()}

            {errorMessage && (
                <div className="text-red-500 mt-2">
                    {errorMessage}
                </div>
            )}
            <div className="relative w-full h-[50px] mt-4 flex justify-between">
                <Button
                    className="w-auto"
                    text="Prev"
                    onClick={handlePrevStep}
                    disabled={step <= 1}
                />
                <Button
                    className="w-auto"
                    text={step === 3 ? 'Submit' : 'Next'}
                    onClick={step === 3 ? handleSubmit : handleNextStep}
                    disabled={!(emailRegex.test(userData.email) && passwordRegex.test(userData.password))}
                />
            </div>
        </div>
    );
};

export default OnboardingFlow;