import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import "react-datepicker/dist/react-datepicker.css"
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Grid from "@material-ui/core/Grid"
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate()

    const [MathsTotalSeats, setMathsTotalSeats] = useState(0)
    const [PhysicsTotalSeats, setPhysicsTotalSeats] = useState(0)
    const [ChemistryTotalSeats, setChemistryTotalSeats] = useState(0)


    const [mathsStudentsArray, setMathsStudentsArray] = useState([]);
    const [physicsStudentsArray, setPhysicsStudentsArray] = useState([]);
    const [chemistryStudentsArray, setChemistryStudentsArray] = useState([]);

    const getTotalSeats = async () => {
        try {
            const res = await fetch('/getTotalSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMathsTotalSeats(data.maths);
            setPhysicsTotalSeats(data.physics);
            setChemistryTotalSeats(data.chemistry);
        } catch (err) {
            console.log(err)
        }
    }

    const getStudentClassList = async () => {
        try {
            const res = await fetch('/getStudentClassList', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            var studentM = [], studentP = [], studentC = [];
            for (var i = 0; i < data.length; i++) {

                if (data[i].subject === "maths") {
                    studentM.push(data[i].name + " - " + data[i].id)
                }
                else if (data[i].subject === "physics") {
                    studentP.push(data[i].name + " - " + data[i].id)
                }
                else if (data[i].subject === "chemistry") {
                    studentC.push(data[i].name + " - " + data[i].id)
                }
            }
            setMathsStudentsArray(studentM)
            setPhysicsStudentsArray(studentP)
            setChemistryStudentsArray(studentC)
        } catch (err) {
            console.log(err)
        }
    }


    const changeTotalSeats = async () => {
        console.log('changeTotalSeats')
        const total = {
            maths: MathsTotalSeats,
            physics: PhysicsTotalSeats,
            chemistry: ChemistryTotalSeats
        }
        try {
            await fetch('/changeTotalSeats', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(total)
            })
            alert('Changed Total Seats')
            navigate('/')
        } catch {
            console.log('cant change seats')
            alert('Can not change seats')
        }
    }

    const deleteAllSeats = async () => {
        console.log("delete clicked")
        try {
            const res = await fetch('/deleteAllSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            alert('Cancelled all classes')
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const printStudents = (event) => {
        if (event.length === 0) {
            return <h5>EMPTY CLASS :( </h5>
        }
        return event.map((item, i) => (
            <h5 key={i}>{item}</h5>
        ))
    }

    useEffect(() => {
        getTotalSeats()
        getStudentClassList()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <div style={{ marginLeft: '30rem', marginTop: '2rem' }}>
                <Card bg='success' text='white' style={{ width: '10rem', marginLeft: '8rem', marginBottom: '1rem' }}>
                    <Card.Body>Faculty Section</Card.Body>
                </Card>

                <Card bg='light' border="primary" style={{ width: '25rem' }}>
                    <Card.Header >Modify the Number of Total Seats</Card.Header>
                    <Card.Body>
                        <div style={{ margin: '2rem' }}>
                            Update Maths Seats

                            <input
                                style={{ width: '10rem' }}
                                type="text"
                                placeholder="Set Maths Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={MathsTotalSeats}
                                required
                                onChange={(event) => {
                                    setMathsTotalSeats(event.target.value);
                                }}
                            />
                        </div>

                        <div style={{ margin: '2rem' }}>
                            Update Physics Seats
                            <input
                                style={{ width: '10rem' }}
                                type="text"
                                placeholder="Set Physics Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={PhysicsTotalSeats}
                                required
                                onChange={(event) => {
                                    setPhysicsTotalSeats(event.target.value);
                                }}
                            />
                        </div>

                        <div style={{ margin: '2rem' }}>
                            Update Chemistry Seats
                            <input
                                style={{ width: '10rem' }}
                                type="text"
                                placeholder="Set Chemistry Seats"
                                className="form-control"
                                id="formGroupExampleInput"
                                value={ChemistryTotalSeats}
                                required
                                onChange={(event) => {
                                    setChemistryTotalSeats(event.target.value);
                                }}
                            />
                        </div>

                        <div style={{ marginLeft: '2rem' }}>
                            <Button
                                onClick={changeTotalSeats}
                                style={{ width: '5rem' }}>set</Button>

                            <Button variant="danger"
                                type="submit"
                                onClick={deleteAllSeats}
                                style={{ width: '5rem' }}>Delete</Button>
                        </div>


                    </Card.Body>
                </Card>

            </div>


            <Grid container spacing={9}>
                <Grid item md={3}>
                    <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                        <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Maths Class List</b><br />Total Seats : {MathsTotalSeats} </center></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">

                                <div style={{ overflow: 'scroll', height: '9rem' }} >
                                    <center>{printStudents(mathsStudentsArray)}</center>

                                </div>

                            </blockquote>
                        </Card.Body>

                    </Card>
                </Grid>

                <Grid item md={3}>
                    <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                        <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Physics Class List</b><br />Total Seats : {PhysicsTotalSeats} </center></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">

                                <div style={{ overflow: 'scroll', height: '9rem' }} >
                                    <center>{printStudents(physicsStudentsArray)}</center>

                                </div>

                            </blockquote>
                        </Card.Body>

                    </Card>

                </Grid>
                <Grid item md={3}>

                    <Card style={{ width: '15rem', marginLeft: '10.5rem', marginTop: '2rem' }}>
                        <Card.Header style={{ backgroundColor: '#FDD2BF' }}><center><b> Chemistry Class List</b><br />Total Seats : {ChemistryTotalSeats} </center></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">

                                <div style={{ overflow: 'scroll', height: '9rem' }} >
                                    <center>{printStudents(chemistryStudentsArray)}</center>

                                </div>

                            </blockquote>
                        </Card.Body>

                    </Card>
                </Grid>

            </Grid>
        </div>
    )

}

export default Admin