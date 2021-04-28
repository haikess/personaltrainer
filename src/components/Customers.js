import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from 'material-ui/core/IconButton';
import DeleteIcon from 'material-ui/icons/Delete';

function Customers() {
    const [customers, setCustomers] = useState ([]);

    useEffect (() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if(response.ok)
                fetchCustomers();
            else
                alert('Delete did not work.')
        })
        .catch(err => console.error(err))
        }
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 130 },
        { field: 'city', sortable: true, filter: true, width: 130 },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true, width: 130 },
        { 
            headerName: '',
            field: 'links.0.href',
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]


    return(
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}> 
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
    )

}

export default Customers;