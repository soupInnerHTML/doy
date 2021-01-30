import React, {useEffect, useState} from 'react';
import './App.css'
import {Container} from "@material-ui/core";
import {useCache} from "./hooks/useCache";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomSelect from "./components/CustomSelect";
import Timetable from "./components/Timetable";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
import getId from "lodash/uniqueId"

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

const useStyles = makeStyles((theme) => ({
    loading: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    tableContainer: {
        marginTop: 20
    }
}));

export default function CustomizedSelects() {
    const {storage, setOpen, isOpen} = useCache("")

    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.ptpit.ru/groups?filters=start_date:dlte:2/23/2021|end_date:dgte:1/23/2021|parent:isnull')
            const groups = await response.json()
            setGroups(groups)
            if(!isOpen) {
                setReady(true)
            }
        })()

    }, [])

    const classes = useStyles();

    const [groups, setGroups] = useState([]);
    const [weeks] = useState([
        "25.01.2021 - 31.01.2021",
        "01.02.2021 - 07.02.2021",
        "08.02.2021 - 15.02.2021",
    ]);
    const [isReady, setReady] = useState(false);
    const [timetable, setTimetable] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const time = [
        '8:30-10:05',
        '10:25-12:00',
        '12:20-14:10',
        '14:15-15:50',
        '16:10-17:55',
        '18:00-19:35',
    ]

    const getTimetable = async () => {
        setLoading(true)
        const tail = `/${groups.find(group => group.name === storage['Группа']).id}/${storage['Неделя'].match(/\d{2}.\d{2}.\d{4}/)[0].split('.').reverse().join('-')}`
        const response = await fetch(`https://api.ptpit.ru/timetable/groups` + tail)
        const json = await response.json();
        const mapped = json.map((pair, i) => {
            let __timetable = {
                ...pair,
                date: pair.date.split`-`.reverse().join`.`,
                subgroup: pair.subgroup || 'Группа',
                lesson_time: time[pair.num - 1],
                teacher: `${pair.teacher_surname} ${pair.teacher_name[0]}.${pair.teacher_secondname[0]}.`
            }
            if (__timetable.date.slice(0, 2) === json[i + 1]?.date.slice(-2)) {
                return __timetable
            }

            return [__timetable, {id: getId()}]
        }).flat().slice(0, -1)

        setTimetable(mapped)
        setLoading(false)
        setOpen(true)
    }

    useEffect(() => {
        if(groups.length && isOpen) {
            (async() => {
                await getTimetable()
                setReady(true)
            })()
        }
    }, [groups])


    if(isReady) {
        return (
            <Container>
                <Grid container direction="row" justify="center">
                    <CustomSelect
                        state={weeks}
                        label={"Неделя"}
                    />
                    <CustomSelect
                        state={groups.map(e => e.name)}
                        label={"Группа"}
                    />
                </Grid>

                <Grid container justify="center">
                    <ShowButton onClick={getTimetable}>Посмотреть</ShowButton>
                </Grid>

                <div className={classes.tableContainer}>
                    {isLoading ? <div className={"fadeIn"}><Skeleton variant="rect" height={1500}/></div> : <Timetable state={timetable}/>}
                </div>
            </Container>
        );
    }

    else return (
        <Grid className={classes.loading} container justify="center" alignItems="center">
            <CircularProgress color="secondary" />
        </Grid>
    )
}

