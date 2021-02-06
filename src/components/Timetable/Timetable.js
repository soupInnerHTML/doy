import React from 'react';
import { XGrid } from '@material-ui/x-grid';
import {makeStyles} from "@material-ui/core/styles";

const columns = [
    {
        field: 'num',
        type: 'number',
        headerName: '#',
        width: 70,
        sortable: false,
    },
    {
        field: 'date',
        headerName: 'Дата',
        width: 130
    },
    {
        field: 'lesson_time',
        headerName: 'Время',
        sortable: false,
        width: 130,
    },
    {
        field: 'subject_name',
        headerName: 'Предмет',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 430,
    },
    {
        field: 'subgroup',
        headerName: 'Подгруппа',
        type: 'number',
        sortable: false,
        width: 130,
    },
    {
        field: 'teacher',
        headerName: 'Препод',
        sortable: false,
        width: 130,
    },
    {
        field: 'room_name',
        headerName: 'Кабинет',
        sortable: false,
        width: 130,
    },
];

const useStyles = makeStyles((theme) => ({
    table: {
        height: "100vh",
        width: '100%',
        animation: "fadeIn 1s"
    }
}));

const Timetable = ({state,}) => {
    const css = useStyles()

    if(state.length) {
        return (
            <div className={css.table}>
                <XGrid
                    rows={state}
                    columns={columns}
                />
            </div>
        );
    }

    return <></>
};

export default Timetable;
