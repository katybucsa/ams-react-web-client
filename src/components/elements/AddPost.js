import clsx from "clsx";
import React, {useState} from "react";
import {useStyles} from "../../styles/styles";
import {connect, useDispatch} from "react-redux";
import {setOpen} from "../../store/communication/communicationActions";
import PropTypes from "prop-types";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {Button} from "@material-ui/core";
import {Redirect, useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {addPost} from "../../store/posts/postActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";

const AddPost = ({isAuthenticated, match, open}) => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const courseId = match.params.cId;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [radioButtonValue, setRadioButtonValue] = useState("announce");
    const [showEventFields, setShowEventFields] = useState(false);
    const [date, setDate] = useState(
        `${new Date().getFullYear()}-${`${new Date().getMonth() +
        1}`.padStart(2, 0)}-${`${new Date().getDate() + 1}`.padStart(
            2,
            0
        )}T${`${new Date().getHours()}`.padStart(
            2,
            0
        )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`
        )
    ;
    const [place, setPlace] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        if (new Date(date) < Date.now())
            return;
        if (radioButtonValue === 'announce')
            dispatch(addPost({title, text, type: radioButtonValue}, courseId, history));
        else {
            const d = new Date(date).getTime();
            dispatch(addPost({title, text, type: radioButtonValue, event: {date: d, place}}, courseId, history))
        }
    };

    const handleChange = (event) => {
        setRadioButtonValue(event.target.value);
        if (radioButtonValue === 'event') {
            setShowEventFields(false);
        } else {
            setShowEventFields(true);
        }
    };

    const dateChanged = (event) => {
        setDate(event.target.value);
    };


    if (!isAuthenticated) {
        return <Redirect to="/login"/>
    }

    return <div className={classes.root}>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <CssBaseline/>
            <div className={classes.drawerHeader}/>
            <Typography variant={"h6"} className={classes.paper1}>
                Add a new post for course Sisteme de operare
            </Typography>
            <form className={classes.paper1} noValidate onSubmit={e => onSubmit(e)}>
                <TextField
                    variant="outlined"
                    required
                    id="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    autoFocus
                    className={classes.form}
                    style={{width: 600}}
                />
                <TextareaAutosize
                    variant="outlined"
                    aria-label="empty textarea"
                    placeholder="Post description"
                    required
                    autoFocus
                    name={"text"}
                    onChange={e => setText(e.target.value)}
                    value={text}
                    style={{width: 600, minHeight: 200}}
                    className={classes.form}
                />
                <FormControl component="fieldset" className={classes.form} style={{width: 600}}>
                    <FormLabel component="legend">Post type</FormLabel>
                    <RadioGroup row aria-label="post-type" name="post-type" value={radioButtonValue}
                                onChange={handleChange}>
                        <FormControlLabel value="announce" control={<Radio/>} label="Announce"/>
                        <FormControlLabel value="event" control={<Radio/>} label="Event"/>
                    </RadioGroup>
                </FormControl>
                {showEventFields && (
                    <>
                        <TextField
                            id="datetime-local"
                            label="Event date and hour"
                            type="datetime-local"
                            defaultValue={date}
                            onChange={dateChanged}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            id="place"
                            label="Place"
                            name="place"
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                            autoFocus
                            className={classes.form}
                            style={{width: 600}}
                        />
                    </>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.form}
                    style={{width: 600}}
                >
                    Add Post
                </Button>
            </form>
        </main>
    </div>
};

AddPost.propTypes = {
    isAuthenticated: PropTypes.bool,
    open: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    open: state.communication.isOpen
});

export default connect(mapStateToProps, {
    setOpen: setOpen
})(AddPost);