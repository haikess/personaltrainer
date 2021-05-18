import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: props.link
    })
     
     const handleClickOpen = () => {
        console.log(training.customer);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const inputChanged = (event) => {
          setTraining({...training, [event.target.name]: event.target.value});
      }

     const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
      }

      const handleDateChange = (date) => {
        var dateString = moment(date._d).toISOString();
        setTraining({...training, date: dateString})
      }   

    return (
        <div>
          <Button size="small" style={{marginBottom: 5}} variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Choose the date and time and fill duration and activity
        </DialogContentText>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker style={{marginTop:16, marginRight: 10}}  value={training.date} onChange={date => handleDateChange(date)}/>
        </MuiPickersUtilsProvider>
        <TextField
              margin="dense"
              label="Duration"
              name='duration'
              value={training.duration}
              onChange={inputChanged}
              fullWidth
            />
             <TextField
              margin="dense"
              label="Activity"
              name='activity'
              value={training.activity}
              onChange={inputChanged}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      );
}

export default AddTraining;