import React, { Component } from 'react';
import {Container,Account,AccountHeader} from '../styles/MyAccount.style';
import {Grid,Paper, Button, Typography} from 'material-ui';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {getPassengerInfo} from '../utils/auth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'


class MyAccount extends Component {

    constructor(props){
        super(props);
        this.state = {
            fname : "",
            lname : "",
            email : "",
            preferred_card_number : "",
            preferred_billing_address : "",
            

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            expandTrainSchedule : !this.state.expandTrainSchedule,
        })
    }

    logOutUser = (event) => {
         event.preventDefault();
         localStorage.removeItem('API_KEY')
         this.props.history.push('/Login')
    }
    
    componentDidMount(){
        const API_KEY = localStorage.getItem('API_KEY')

        getPassengerInfo(API_KEY)
        .then( (userData => {
            this.setState({
                fname : userData[0].fname,
                lname : userData[0].lname,
                email : userData[0].email,
            });
        }))
        
    }

    render() {
        return (
            <Container>
                <Grid justify="center" container  spacing={40 } style={{padding : '50px'}}>
                    <Grid item xs>
                        <Account>
                            <AccountHeader title={ this.state.fname+ " " + this.state.lname}/>
                            <CardContent> 

                                <Typography gutterBottom variant="headline" component="h4">
                                    Email : {this.state.email}
                                </Typography>
                                <br/>

                                <Typography gutterBottom variant="headline" component="h4">
                                    Reservations
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>TrainID</TableCell>
                                        <TableCell>Departure Time</TableCell>
                                        <TableCell>Arrival Time</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Reserve</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    
                                </TableBody>
                                </Table>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.logOutUser} color="primary" >
                                        Log Out
                                </Button>
                            </CardActions>
                        </Account> 
                    </Grid>
                </Grid>
            </Container>
        );
    }
}


export default MyAccount;
