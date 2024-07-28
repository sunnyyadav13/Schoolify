import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import "react-datepicker/dist/react-datepicker.css"
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import SubjectPreference from './subjectPreference/SubjectPreference'
import Grid from "@material-ui/core/Grid"
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'

const Student = () => {
    const navigate = useNavigate()

    const [todaysDate, setTodaysDate] = useState('')

    const [MathsTotalSeats, setMathsTotalSeats] = useState(0);
    const [PhysicsTotalSeats, setPhysicsTotalSeats] = useState(0);
    const [ChemistryTotalSeats, setChemistryTotalSeats] = useState(0);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const [disableMaths, setDisableMaths] = useState(true);
    const [Maths, setMath] = useState(false);
    const [MathsOccupiedSeats, setMathsOccupiedSeats] = useState(0);
    const [limitMaths, setlimitMaths] = useState(false);


    const [disablePhysics, setDisablePhysics] = useState(true);
    const [Physics, setPhysics] = useState(false);
    const [PhysicsOccupiedSeats, setPhysicsOccupiedSeats] = useState(0);
    const [limitPhysics, setlimitPhysics] = useState(false);


    const [disableChemistry, setDisableChemistry] = useState(true);
    const [Chemistry, setChemistry] = useState(false);
    const [ChemistryOccupiedSeats, setChemistryOccupiedSeats] = useState(0);
    const [limitChemistry, setlimitChemistry] = useState(false);

    const [handleSubmitPreference, sethandleSubmitPreference] = useState(true);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  DATE SETTER

    let newDate, day;
    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    // var monthNames = ["January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December"];
    // let month
    const setDate = () => {
        newDate = new Date();
        day = dayNames[newDate.getDay()];
        // month = monthNames[newDate.getMonth()] ;
        return <Alert width='2rem' variant='primary'>
            Now book your class for <b> {day} (tomorrow) </b> doubt session
        </Alert>
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  FUNCTIONS CALLED DURING FIRST TIME RENDERING

    const [totalSeatsFetched, setTotalSeatsFetched] = useState(false)
    const [occupiedSeatsFetched, setOccupiedSeatsFetched] = useState(false)

    function setLimits() {
        if (MathsOccupiedSeats >= MathsTotalSeats) setlimitMaths(true);
        else if (MathsOccupiedSeats < MathsTotalSeats) setlimitMaths(false);
        if (PhysicsOccupiedSeats >= PhysicsTotalSeats) setlimitPhysics(true);
        else if (PhysicsOccupiedSeats < PhysicsTotalSeats) setlimitPhysics(false);
        if (ChemistryOccupiedSeats >= ChemistryTotalSeats) setlimitChemistry(true);
        else if (ChemistryOccupiedSeats < ChemistryTotalSeats) setlimitChemistry(false);
    }

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
            setTotalSeatsFetched(true)
        } catch (err) {
            console.log(err)
        }
    }

    const getOccupiedSeats = async () => {
        try {
            const res = await fetch('/getOccupiedSeats', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setMathsOccupiedSeats(data.maths);
            setPhysicsOccupiedSeats(data.physics);
            setChemistryOccupiedSeats(data.chemistry);
            setOccupiedSeatsFetched(true)
        } catch (err) {
            console.log(err)
        }
    }

    const setUserDetails = () => {
        const userName = localStorage.getItem('userName')
        setUserName(userName)
        const email = localStorage.getItem('email')
        setEmail(email)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  STUDENT

    const handleSubmit = async () => {
        if (Maths || Physics || Chemistry) {
            const info = {
                Maths: Maths,
                Physics: Physics,
                Chemistry: Chemistry,
                date: todaysDate
            }

            await fetch('/addClass', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            })
            //Put some exception handling
            //Store class preferences in a separate database too
            sethandleSubmitPreference(false);
        }
        else {
            alert("no classes selected")
        }
    }

    const handleMaths = () => {
        setDisableMaths(false); // to enable red button of cancel now
        setMathsOccupiedSeats(MathsOccupiedSeats + 1);  // to increment the total count of maths students 
        setMath(true) // for that particular student set true as he clicked on book now 
    }
    const cancelMaths = () => {
        setDisableMaths(true);
        setMathsOccupiedSeats(MathsOccupiedSeats - 1);
        setMath(0)
    }

    const handlePhysics = () => {
        setDisablePhysics(false);
        setPhysicsOccupiedSeats(PhysicsOccupiedSeats + 1);
        setPhysics(true)
    }
    const cancelPhysics = () => {
        setDisablePhysics(true);
        setPhysicsOccupiedSeats(PhysicsOccupiedSeats - 1);
        setPhysics(false)

    }

    const handleChemistry = () => {
        setDisableChemistry(false);
        setChemistryOccupiedSeats(ChemistryOccupiedSeats + 1);
        setChemistry(true);
    }
    const cancelChemistry = () => {
        setDisableChemistry(true);
        setChemistryOccupiedSeats(ChemistryOccupiedSeats - 1);
        setChemistry(false);
    }

    const showAdminRights = () => {
        navigate('/adminValidate')
    }

    const setDateForMessages = () => {
        const date = new Date()
        const myDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
        setTodaysDate(myDate)
    }
    //////////////////////////////////////////////////////////////////////////////////
    const [bookedMaths, setBookedMaths] = useState(false)
    const [bookedPhysics, setBookedPhysics] = useState(false)
    const [bookedChemistry, setBookedChemistry] = useState(false)

    const handleStartMaths = () => {
        setDisableMaths(false)
    }

    const handleStartPhysics = () => {
        setDisablePhysics(false)
    }

    const handleStartChemistry = () => {
        setDisableChemistry(false);
    }

    const setClasses = (data) => {
        if (data.Maths) {
            handleStartMaths()
            setBookedMaths(true)
        }
        if (data.Physics) {
            handleStartPhysics()
            setBookedPhysics(true)
        }
        if (data.Chemistry) {
            handleStartChemistry()
            setBookedChemistry(true)
        }
    }

    const getClasses = async () => {
        try {
            const res = await fetch('/getClasses', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.date === todaysDate)
                setClasses(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setDateForMessages()
        setUserDetails()
        getTotalSeats()
        getOccupiedSeats()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (totalSeatsFetched && occupiedSeatsFetched)
            setLimits()         //Calling it here so that it runs after all values are fetched from backend
        getClasses()
        // eslint-disable-next-line
    }, [totalSeatsFetched, occupiedSeatsFetched])

    return (
        <>

            {handleSubmitPreference ?
                <div>
                    <Alert width='2rem' variant='warning'>
                        *Note : Everyday at 12 AM fresh booking will start
                    </Alert>
                    {setDate()}

                    {/* <marquee>Book now Limited seats only due to Covid___________________________Wear Mask___________________________Use Sanitizer</marquee> */}
                    {/* eslint-disable-next-line */}
                    <marquee behavior="scroll" direction="left">
                        <span style={{ marginLeft: '2in', color: '#483434' }}>Book now Limited seats only due to Covid</span>
                        <span style={{ marginLeft: '2in', color: 'red' }}>Wear Mask</span>

                        <span style={{ marginLeft: '2in', color: 'green' }}>Use Sanitizer</span>

                        <span style={{ marginLeft: '2in', color: 'blue' }}>Maintain 6 Feet Distance</span>

                        <span style={{ marginLeft: '2in', color: '#FF5151' }}>Wash Hand</span>

                    </marquee>

                    <Grid container spacing={9}>
                        <Grid item md={3}>

                            {/* maths */}
                            <div className="book">
                                <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                    <Card.Header style={{ backgroundColor: '#7DEDFF' }}>
                                        <center><b>Math</b></center>
                                    </Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">


                                            <center><b>Total Seats : {MathsTotalSeats} </b></center>
                                            <center><b>Filled Seats : {MathsOccupiedSeats} </b></center>


                                        </blockquote>


                                        <div style={{ margin: '1rem' }} >
                                            {disableMaths ? <Button variant="primary"
                                                type="submit"
                                                disabled={limitMaths}
                                                onClick={handleMaths}
                                                style={{ width: '8rem' }}>Book NOW</Button>
                                                :
                                                <Button
                                                    // disable={disableMaths}
                                                    type="submit"
                                                    variant='danger'
                                                    disabled={bookedMaths}
                                                    onClick={cancelMaths}
                                                    style={{ width: '8rem' }}>Cancel Now</Button>
                                            }
                                        </div>

                                    </Card.Body>
                                    <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                        {/* eslint-disable-next-line */}
                                        <b><center>{bookedMaths ? <a style={{ color: 'blue' }}>YOU ALREADY BOOKED</a> : (MathsOccupiedSeats >= MathsTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>)}</center></b>
                                    </Card.Header>
                                </Card>
                            </div>

                        </Grid>

                        <Grid item md={3}>

                            {/* // physics */}
                            <div className="book">
                                <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                    <Card.Header style={{ backgroundColor: '#7DEDFF' }}>
                                        <center><b>Physics</b></center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">


                                            <center><b>Total Seats : {PhysicsTotalSeats} </b></center>
                                            <center><b>Filled Seats : {PhysicsOccupiedSeats} </b></center>


                                        </blockquote>

                                        <div style={{ margin: '1rem' }} >


                                            {disablePhysics ? <Button variant="primary"
                                                type="submit"
                                                onClick={handlePhysics}
                                                disabled={limitPhysics}
                                                style={{ width: '8rem' }}>Book NOW</Button>
                                                /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                :
                                                <Button
                                                    type="submit"
                                                    variant='danger'
                                                    disabled={bookedPhysics}
                                                    onClick={cancelPhysics}
                                                    style={{ width: '8rem' }}>Cancel Now</Button>
                                            }

                                        </div>

                                    </Card.Body>
                                    <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                        {/* eslint-disable-next-line */}
                                        <b><center>{bookedPhysics ? <a style={{ color: 'blue' }}>YOU ALREADY BOOKED</a> : (PhysicsOccupiedSeats >= PhysicsTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>)}</center></b>
                                    </Card.Header>

                                </Card>
                            </div>

                        </Grid>
                        <Grid item md={3}>

                            {/* chemistry */}

                            <div className="book">
                                <Card style={{ width: '13rem', marginLeft: '11rem', marginTop: '-15rem' }}>
                                    <Card.Header style={{ backgroundColor: '#7DEDFF' }}><center><b>Chemistry</b></center></Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">


                                            <center><b>Total Seats : {ChemistryTotalSeats} </b></center>
                                            <center><b>Filled Seats : {ChemistryOccupiedSeats} </b></center>


                                        </blockquote>

                                        <div style={{ margin: '1rem' }} >

                                            {disableChemistry ? <Button variant="primary"
                                                type="submit"
                                                disabled={limitChemistry}

                                                onClick={handleChemistry}
                                                style={{ width: '8rem' }}>Book NOW</Button>

                                                :
                                                <Button
                                                    type="submit"
                                                    variant='danger'
                                                    disabled={bookedChemistry}
                                                    onClick={cancelChemistry}
                                                    style={{ width: '8rem' }}>Cancel Now</Button>
                                            }

                                        </div>


                                    </Card.Body>
                                    <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
                                        {/* eslint-disable-next-line */}
                                        <b><center>{bookedChemistry ? <a style={{ color: 'blue' }}>YOU ALREADY BOOKED</a> : (ChemistryOccupiedSeats === ChemistryTotalSeats ? <a style={{ color: 'red' }}>FULL</a> : <a style={{ color: 'green' }}>AVAILABLE</a>)}</center></b>
                                    </Card.Header>

                                </Card>
                            </div>


                        </Grid>
                    </Grid>


                    {/* list of students was here  */}

                    <div className="d-flex justify-content-between" style={{ margin: '4rem' }} >
                        <Button variant="danger"
                            onClick={showAdminRights}
                            style={{ width: '10rem' }}>Are you an admin?</Button>

                        <Button variant="success"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ width: '10rem' }}>Final Submit</Button>

                    </div>

                    {/* {mathsStudentsArray}  */}


                </div>


                :
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
                <div>

                    <SubjectPreference
                        userName={userName}
                        email={email}
                        Maths={Maths}
                        Physics={Physics}
                        Chemistry={Chemistry}
                    />

                </div>

            }
        </>
    )
};

export default Student