import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddEvent from './AddEvent';
import Modal from '@material-ui/core/Modal';
import firebase from '../../firebase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    text: {
        textTransform: 'none',
    },
    paper: {
        height: 100,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    widthMax: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: 40,
    },
    heightMax: {
        minHeight: 200
    }
}));

const Event = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [eventList, seteventList] = useState([])
    useEffect(() => {
        const eventRef = firebase.getEvents();
        eventRef.on('value', (snapshot) => {
            const event = snapshot.val()
            const eventList = []
            for (let id in event) {
                eventList.push(event[id])
            }
            seteventList(eventList)
        })
    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <React.Fragment>
            <Grid spacing={3} >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Button size="medium" color="primary" variant="contained" className={classes.text} onClick={handleOpen}>
                            Add new Event
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <div className='card-container'>
                {eventList && eventList.map((event) => (
                    <div>
                        <Card className={classes.widthMax}>
                            <CardActionArea>
                                <CardContent className={classes.heightMax}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {String(event.title).toLocaleUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {event.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {event.date}
                                </Typography>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <AddEvent onClose={handleClose} />
            </Modal>
        </React.Fragment>
    )
}
export default Event;