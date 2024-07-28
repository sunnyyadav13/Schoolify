import React, { useState, useEffect } from 'react'
import Chat from '../chat/Chat'
import Notes from '../notes/Notes'
import ToolTip from "../tooltip/Tooltip"
import Calander from '../calander/Calander'
import BookClass from '../bookClass/BookClass'
import QuizLogo from '../quizLogo/QuizLogo'
import LastQuizMarks from '../LastQuizMarks'
import Lottie from 'react-lottie'
import animationData from './student.json'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [quizAttempted, setQuizAttempted] = useState(false)

  const setInitialValues = () => {
    const quizAttemptedLocal = localStorage.getItem('quizAttempted')
    if (quizAttemptedLocal === 'true')
      setQuizAttempted(true)
  }

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('userVerified'))
    if (loggedIn === true) {
      setInitialValues()
    } else
      navigate('/login')
    // eslint-disable-next-line
  }, [])

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  return (
    <>
      <section style={{ backgroundColor: 'white' }}>

        <div className="d-flex justify-content-between" style={{ marginBottom: '10rem', marginTop: '0rem', marginLeft: '2rem', marginRight: '2rem' }}>
          <div style={{ marginTop: '1rem' }}>
            <Calander />
          </div>
          <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <Lottie
              options={defaultOptions2}
              height={300}
              width={400}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <LastQuizMarks quizAttempted={quizAttempted} />
          </div>

        </div>


        <div style={{ marginTop: '-20rem' }}>
          <center>
            {/* <ToolTip content="Video Session" direction="top">
                <VideoCall /></ToolTip> */}

            <ToolTip content="Book Class" direction="top">
              <BookClass /></ToolTip>

            <ToolTip content="Task Manager" direction="top">
              <Notes /></ToolTip>

            <ToolTip content="Test Yourself" direction="top">
              <QuizLogo /></ToolTip>

            <ToolTip content="Chat Community" direction="top">
              <Chat /></ToolTip>

          </center>
        </div>
      </section>

    </>
  )
}

export default Home