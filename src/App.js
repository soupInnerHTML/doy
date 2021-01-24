import React, {useEffect} from 'react';
import {Container} from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CustomSelect from "./components/CustomSelect";

const ShowButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: 10
});

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
    loading: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    }
}));

export default function CustomizedSelects() {
    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.ptpit.ru/groups?filters=start_date:dlte:2/23/2021|end_date:dgte:1/23/2021|parent:isnull')
            const json = await response.json();
            const groupNames = json.map(e => e.name)

            setGroup(groupNames.slice(-1))
            setGroups(groupNames)
            setTimeout(() => setReady(true), 2000)

        })()
    }, [])

    const classes = useStyles();

    const [week, setWeek] = React.useState(1);
    const [group, setGroup] = React.useState("");
    const [groups, setGroups] = React.useState([]);
    const [isReady, setReady] = React.useState(false);

    const handleWeekChange = (event) => {
        setWeek(event.target.value);
    };
    const handleGroupChange = (event) => {
        setGroup(event.target.value);
    };


    if(isReady) {
        return (
            <Container>
                <Grid xs={12} container direction="row" justify="center">
                    <FormControl className={classes.margin}>
                        <InputLabel id="weeks">Неделя</InputLabel>
                        <Select
                            labelId="weeks"
                            id="weeks"
                            value={week}
                            onChange={handleWeekChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={1}>01.09.2020 - 07.09.2020</MenuItem>
                            <MenuItem value={2}>08.09.2020 - 15.09.2020</MenuItem>
                            <MenuItem value={3}>16.09.2020 - 23.09.2020</MenuItem>
                        </Select>
                    </FormControl>
                    {/*<CustomSelect setter={handleWeekChange} state={weeks} label={"Неделя"}></CustomSelect>*/}

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="groups">Группа</InputLabel>
                        <Select
                            id="groups"
                            value={group}
                            onChange={handleGroupChange}
                            input={<BootstrapInput />}
                        >
                            {
                                groups.map(group => {
                                    return (
                                        <MenuItem value={group}>{group}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                        {/*<CustomSelect setter={handleGroupChange} state={groups} label={"Группы"}></CustomSelect>*/}
                </Grid>

                <Grid xs={12} container justify="center">
                    <ShowButton>Посмотреть</ShowButton>
                </Grid>
            </Container>
        );
    }

    else return (
        <Grid className={classes.loading} container justify="center" alignItems="center">
            <CircularProgress color="secondary" />
        </Grid>
    )
}

