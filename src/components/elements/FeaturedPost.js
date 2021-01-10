import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import PanToolTwoToneIcon from '@material-ui/icons/PanToolTwoTone';
import CardActionArea from "@material-ui/core/CardActionArea";
import {useDispatch, useSelector} from "react-redux";
import {getEventParticipants} from "../../store/posts/postActions";
import Dialog from "@material-ui/core/Dialog";
import Spinner from "../layout/Spinner";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    listItem: {
        marginBottom: 40,
    },
    textsEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    textEnd: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(1),
    },
}));


export default function FeaturedPost(props) {
    const classes = useStyles();
    const {courseId, post, particip, addpart} = props;
    const [showParticip, setShowParticip] = useState(false);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const participants = useSelector(state => {
        return state.post.allPostParticip;
    });
    const loading = useSelector(state => {
        return state.post.allParticipLoading;
    });

    const handleClose = () => {

        setOpen(false);
        setShowParticip(false);
    };


    const ParticipantsView = () => {

        return <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
        >
            {loading ? <Spinner/> : (
                <>
                    <DialogTitle>Participants</DialogTitle>
                    <DialogContent>
                        <Divider/>
                        <List>
                            {participants.map((particip, index) => {
                                return <div key={index}>
                                    <ListItem>
                                        <ListItemText>{particip}</ListItemText>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            })}
                        </List>
                    </DialogContent>
                    < DialogActions>
                        < Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    };

    const showParticipants = () => {
        setShowParticip(true);
        setOpen(true);
        dispatch(getEventParticipants(courseId, post.id));
    };

    return (
        <Grid item xs={12} md={10} className={classes.listItem}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {post.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {post.text}
                        </Typography>
                        {post.type === 'event' && (
                            <>
                                <Typography style={{margin: '1rem 0'}}>
                                    Date: {post.event.date}
                                </Typography>
                                <Typography style={{margin: '1rem 0'}}>
                                    Hour: {post.event.hour}
                                </Typography>
                                <Typography style={{margin: '1rem 0'}}>
                                    Place: {post.event.place}
                                </Typography>
                            </>
                        )}
                        {post.type === 'event' && (particip.some(i => i === post.id) ? (

                                <CardActionArea component="a" style={{marginTop: '1rem', width: '8rem'}}
                                                onClick={() => addpart(post.id)}>
                                    <Grid container direction={"row"} alignItems="center">
                                        <PanToolTwoToneIcon color="primary"/>
                                        <Typography color="primary">Participate</Typography>
                                    </Grid>
                                </CardActionArea>
                            ) :
                            (<CardActionArea component="a" style={{width: '8rem'}}
                                             onClick={() => addpart(post.id)}>
                                <Grid container direction="row" alignItems="center">
                                    <PanToolOutlinedIcon textAnchor={"Participate"}/>
                                    <Typography>Participate</Typography>
                                </Grid>
                            </CardActionArea>))
                        }
                    </CardContent>
                    {post.type === 'event' &&
                    <div className={classes.textsEnd}>
                        <CardActionArea className={classes.textEnd} onClick={showParticipants}>
                            <Typography>View participants</Typography>
                        </CardActionArea>
                    </div>}
                </div>
            </Card>
            {showParticip && <ParticipantsView/>}
        </Grid>
    );
}
