import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    listItem: {
        marginBottom: 40,
        width: '50rem'
    },
    textsEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    textEnd: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },

    buttonEnd: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
    buttonsEnd: {
        display: 'flex',
    },
}));

export default function AdminItem(props) {
    const classes = useStyles();
    const {name, path, running, stopService} = props;

    return <Grid item xs={12} md={10} className={classes.listItem}>
        <Card className={classes.card}>
            <div className={classes.cardDetails}>
                <CardContent>
                    <Grid container style={{display: "block"}}>
                        <Typography align={"center"}>
                            {name}
                        </Typography>
                        <div className={classes.buttonsEnd}>
                            <Button
                                onClick={() => stopService(path)}
                                color="primary"
                                variant="contained"
                                disabled={!running}
                                className={classes.buttonEnd}
                            >
                                Stop
                            </Button>
                        </div>
                    </Grid>
                    <div className={classes.textsEnd}>
                        <Typography className={classes.textEnd}>
                            {running ? "Running..." : "Stopped"}
                        </Typography>
                    </div>
                </CardContent>
            </div>
        </Card>
    </Grid>
};
