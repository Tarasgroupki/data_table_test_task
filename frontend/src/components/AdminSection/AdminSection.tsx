import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import * as process from "process";

const AdminSection: React.FC = () => {
    const { request, loading, error } = useHttp();
    const [pageConfig, setPageConfig] = useState<{ [key: string]: string[] }>({
        Page2: [],
        Page3: [],
    });

    const components = ["About Me", "Address", "Birthdate"];

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const page2Data = await request(`${process.env.REACT_APP_BACKEND_URL}/admin/settings/Page2`, "GET", null);
                const page3Data = await request(`${process.env.REACT_APP_BACKEND_URL}/admin/settings/Page3`, "GET", null);

                setPageConfig({
                    Page2: page2Data.pageSettings?.components || [],
                    Page3: page3Data.pageSettings?.components || [],
                });
            } catch (e) {
                console.error(e);
            }
        };

        fetchSettings();
    }, [request]);

    const updateSettings = async (page: string, components: string[]) => {
        try {
            await request(`${process.env.REACT_APP_BACKEND_URL}/admin/settings`, "POST", { page, components });
        } catch (e) {
            console.error(e);
        }
    };

    const handleCheckboxChange = (page: string, component: string) => {
        setPageConfig((prevConfig) => {
            const newPageConfig = { ...prevConfig };
            const currentPageComponents = newPageConfig[page];
            const otherPage = page === "Page2" ? "Page3" : "Page2";

            newPageConfig[otherPage] = newPageConfig[otherPage].filter(
                (c) => c !== component
            );

            if (currentPageComponents.includes(component)) {
                if (currentPageComponents.length > 1) {
                    newPageConfig[page] = currentPageComponents.filter(
                        (c) => c !== component
                    );
                } else {
                    alert("На странице должен быть выбран хотя бы один компонент.");
                    return prevConfig;
                }
            } else {
                newPageConfig[page] = [...currentPageComponents, component];
            }

            updateSettings(page, newPageConfig[page]);
            updateSettings(otherPage, newPageConfig[otherPage]);

            return newPageConfig;
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Admin Section</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex justify-between bg-gray-100 p-4 rounded-md">
                {["Page2", "Page3"].map((page) => (
                    <div key={page} className="w-1/2 p-4">
                        <h3 className="text-md font-semibold mb-2">{page}</h3>
                        <div className="space-y-2">
                            {components.map((component) => (
                                <label
                                    key={component}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={pageConfig[page]?.includes(component.toLowerCase().split(' ').join('_'))}
                                        onChange={() => handleCheckboxChange(page, component.toLowerCase().split(' ').join('_'))}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-gray-700">{component}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSection;