import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {createReservation} from '../utils/reservation';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import Card from 'material-ui/Card'
class TrainRowSchedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      openError : false,
      DialogText : "",
    }

  }

  handleClose = (evt) => {
    this.setState({
      openError : false,
      DialogText : ""
    })
  }

  handleReservation = () => {
      const API_KEY = localStorage.getItem("API_KEY");
      const TRIP_DATE =  this.props.date;
      const TRIP_START = this.props.start;
      const TRIP_END = this.props.end;
      const TRIP_TRAIN_ID = this.props.train.TrainID;
      const TOTAL_FARE =  this.props.totalFare;

      createReservation(API_KEY,TRIP_DATE,TRIP_START,TRIP_END,TRIP_TRAIN_ID,TOTAL_FARE)
      .then (data => (
        this.setState({
          openError : true,
          DialogText : data
        })
      ))
      .catch(data => 
        this.setState({
          openError : true,
          DialogText : data
        }))
  }

  render(){
    return(

      <TableRow>
        <TableCell><h1>{this.props.train.TrainID}</h1></TableCell>
        <TableCell><h1>{this.props.train.Departure}</h1></TableCell>
        <TableCell><h1>{this.props.train.Arrival}</h1></TableCell>
        <TableCell><h1 color="primary">${this.props.totalFare}</h1></TableCell>
        <TableCell><Button variant="raised" color="primary" onClick={(evt) => this.handleReservation()}>Reserve</Button></TableCell>
      
        <Dialog open={this.state.openError} onClose={this.handleClose} >
          <DialogContent>
            {this.state.DialogText}
          </DialogContent>
        </Dialog>
      </TableRow>
    )
  }
}

export default TrainRowSchedule;
