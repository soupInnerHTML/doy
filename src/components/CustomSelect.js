import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: 'Roboto',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        width: 600,
    },
}));

export default ({state, setter, label}) => {
    const classes = useStyles()

    return (
        <FormControl className={classes.margin}>
            <InputLabel id="weeks">{label}</InputLabel>
            <Select
                labelId="weeks"
                id="weeks"
                value={state[0]}
                onChange={setter}
                input={<BootstrapInput />}
            >
                {
                    state.map(item => {
                        return (
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}