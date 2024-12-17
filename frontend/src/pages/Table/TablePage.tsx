import React from "react";
import {DataTable} from "../../components/DataTable";

const TablePage: React.FC = () => {

    return (
        <div className='auth-wrapper' style={{ background: "white" }}>
            <DataTable />
        </div>
    );
};

export default TablePage;