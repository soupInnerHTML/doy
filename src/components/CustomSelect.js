import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {useCache} from "../hooks/useCache";
import getId from "lodash/uniqueId"

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        }
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
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

export default ({state, label,}) => {
    const classes = useStyles()
    const {storage, setValue} = useCache(label, state[0])
    const handleChange = e => setValue(e.target.value)

    return (
        <FormControl className={classes.margin}>
            <InputLabel id="custom">{label}</InputLabel>
            <Select
                labelId="custom"
                id="custom"
                value={storage[label]}
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                {
                    state.map(item => {
                        return (
                            <MenuItem key={getId()} value={item}>{item}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}