import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import {getActivityTypes} from "../../store/courses/courseActions";
import {useDispatch, useSelector} from "react-redux";
import {assignGrade} from "../../store/student/studentActions";
import Spinner from "./Spinner";
import {gradeFormClosed} from "../../store/communication/communicationActions";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default function GradesForm({studentId, studentName, courseId}) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [grade, setGrade] = useState(0.0);
    const [typeId, setTypeId] = useState(-1);
    const assignPressed = useSelector(state => {
        return state.communication.assignPressed;
    });
    const gradeAssigned = useSelector(state => {
        return state.communication.gradeAssigned
    });
    const errorGradeAssigned = useSelector(state => {
        return state.communication.errorGradeAssigned
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivityTypes());
    }, []);

    const activities = useSelector(state => {

        return state.activity.activities;
    });

    const handleChangeGrade = event => {

        setGrade(Number(event.target.value) || "");
    };

    function onChange(event) {

        setTypeId(event.target.value);
    }

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const getTypeId = () => {
        if (typeId === -1) {
            setTypeId(activities[0].typeId);
        }
    };

    const handleSubmitGrade = () => {

        getTypeId();
        console.log(typeId);
        dispatch(assignGrade(studentId, courseId, parseInt(typeId), grade));
    };

    if (assignPressed && gradeAssigned) {
        handleClose();
        dispatch(gradeFormClosed());
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add grade</Button>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
            >
                {(assignPressed && !errorGradeAssigned) ? <Spinner/> : (
                    <>
                        <DialogTitle>Assign grade to {studentName}</DialogTitle>
                        <DialogTitle>Fill the form</DialogTitle>
                        <DialogContent>
                            <form className={classes.container} noValidate>
                                <Input
                                    placeholder="Given grade"
                                    inputProps={{"aria-label": "description"}}
                                    onChange={handleChangeGrade}
                                />
                                <select
                                    id="activities"
                                    name="activities"
                                    onChange={e => onChange(e)}
                                    value={typeId}
                                >
                                    {activities &&
                                    activities.map(spec => {
                                        return (
                                            <option key={spec.typeId} value={spec.typeId}>
                                                {spec.name}
                                            </option>
                                        );
                                    })}
                                </select>

                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitGrade} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}