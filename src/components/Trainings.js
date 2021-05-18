import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';

function Trainings() {
    const [trainings, setTrainings] = useState ([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect (() => {
        fetchTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    function fullNameGetter(params) {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
        }

   const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE'})
        .then(response => {
            if(response.ok) {
                fetchTrainings();
                setMsg('Training deleted');
                openSnackBar();
            }
            else {
                alert('Delete did not work.')
            }
        })
        .catch(err => console.error(err))
        }
    }

    function dateFormatter(params) {
        var dateAsString = params.data.date;
        return moment(dateAsString).format('DD/MM/YYYY HH:mm');
    }
        
    const columns = [
        { field: 'id', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true, valueFormatter: dateFormatter},
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {headerName: 'Full Name', field: 'Customer', sortable: true, filter: true, valueGetter: fullNameGetter},
        { 
            headerName: '',
            width: 100,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteTraining(params.data.id)}>
                <DeleteIcon />
            </IconButton>
        }
    ]

    return(
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}> 
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
            <Snackbar 
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={closeSnackBar}
            />
        </div>
    )
}

export default Trainings;