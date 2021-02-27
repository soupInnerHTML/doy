import './App.css'
import {
    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@material-ui/core";
import React, {useEffect, useState} from 'react';

export default () => {
    let [rows, setRows] = useState([])
    let [open, setOpen] = useState(false)
    let [mode, setMode] = useState('Add')
    const modeReq = {
        'Add': 'POST',
        'Edit': 'PUT'
    }
    const [fields, setFields] = useState({
        mark: "", model: "", speed: "", has_mileage: false
    })

    let changeHandler = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value || e.target.checked, })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await fetch('https://api.ptpit.ru/dealers/test1/cars', {
            method: modeReq[mode],
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(fields)

        })
        setOpen(false)
        await setCars()
    }

    const deleteCar = async (id) => {
        const response = await fetch('https://api.ptpit.ru/cars/' + id, {
            method: 'DELETE'
        })
        setCars()
    }

    const setCars = async () => {
        const response = await fetch('https://api.ptpit.ru/dealers/test1/cars')
        const data = await response.json()
        setRows(data)
    }

    useEffect(setCars, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="caption table">
                    <caption>A basic table example with a caption</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mark</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Speed</TableCell>
                            <TableCell>Has mileage</TableCell>
                            <TableCell>Dealer</TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} key={row.id}>
                                <TableCell>{row.mark}</TableCell>
                                <TableCell>{row.model}</TableCell>
                                <TableCell>{row.speed}</TableCell>
                                <TableCell>{row.has_mileage ? '+' : '-'}</TableCell>
                                <TableCell>{row.dealer}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => (setMode('Edit'), setOpen(true))}>Edit</Button>
                                    <Button variant="contained" color="secondary" style={{marginLeft: 5}} onClick={() => deleteCar(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <IconButton variant="contained" color="primary" style={{ position: 'absolute', bottom: 5, right: 5 }} onClick={() => setOpen(true)}>
                <Icon style={{ fontSize: 30 }}>add_circle</Icon>
            </IconButton>

            <Dialog open={open}
                    // onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {mode}
                </DialogTitle>
                <form onSubmit={ submitHandler }>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name={'mark'}
                            label="Mark"
                            type="text"
                            fullWidth
                            required
                            onChange={ changeHandler }
                            value={fields.mark}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name={'model'}
                            label="Model"
                            type="text"
                            fullWidth
                            required
                            onChange={ changeHandler }
                            value={fields.model}
                            // onChange={handleSalaryChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name={'speed'}
                            label="Speed"
                            type="text"
                            fullWidth
                            required
                            onChange={ changeHandler }
                            value={fields.speed}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={fields.has_mileage}
                                    name="has_mileage"
                                    color="primary"
                                    onChange={ changeHandler }
                                />
                            }
                            label="Has mileage?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="primary" type={'submit'}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

