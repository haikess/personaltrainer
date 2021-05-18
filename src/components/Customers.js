import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import { LinkSharp } from '@material-ui/icons';
import AddTraining from './AddTraining';

function Customers() {
    const [customers, setCustomers] = useState ([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect (() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMsg('Customer deleted');
                openSnackBar();
            }
            else {
                alert('Delete did not work.')
            }
        })
        .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
           method: 'POST', 
           body: JSON.stringify(newCustomer),
           headers: { 'Content-type' : 'application/json' } 
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          body: JSON.stringify(newTraining),
          headers: { 'Content-type' : 'application/json' }
       })
       .then(response => {
         if(response.ok) {
           setMsg('Training added succesfully');
           openSnackBar();
          fetchCustomers()
         }
         else {
          alert('Something went wrong!')
         }
       })
       .catch(err => console.error(err))
      }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const columns = [
        { headerName: '', 
        field: 'links.0.href', 
        cellRendererFramework: params => 
        <AddTraining link={params.value} addTraining={addTraining} /> },
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
            width: 100,
            cellRendererFramework: params => 
                <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer}/>
        },
        { 
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]

    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}> 
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
            <Snackbar 
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={closeSnackBar}
            />
        </div>
    )
}

export default Customers;