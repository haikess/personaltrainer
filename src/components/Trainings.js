import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

function Trainings() {
    const [trainings, setTrainings] = useState ([]);

    useEffect (() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.err(err))
    }

    const columns = [
        { field: 'date', sortable: true, filter: true, cellRenderer: (data) => { return moment(data.date).format('MM/DD/YYYY HH:mm')}},
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'content', sortable: true, filter: true }
    ]


    return(
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto'}}> 
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    )

}

export default Trainings;