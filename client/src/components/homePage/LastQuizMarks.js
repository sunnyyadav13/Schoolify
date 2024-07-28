import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'

const LastQuizMarks = (quizAttempted) => {
  const [lastQuizMarks, setLastQuizMarks] = useState(0)

  useEffect(() => {
    if (quizAttempted)
      setLastQuizMarks(JSON.parse(localStorage.getItem('lastQuizMarks')))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Card style={{ width: '13rem' }}>
        <Card.Header style={{ backgroundColor: '#FF9292' }}><center><b>Score</b></center></Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">

            <center><b>{quizAttempted ? lastQuizMarks : "You have not attended any quiz yet"}</b></center>

          </blockquote>
        </Card.Body>
        <Card.Header style={{ backgroundColor: '#EEEEEE' }}>
          <center><b>Last Quiz Percentage</b></center>
        </Card.Header>

      </Card>
    </>

  );
};

export default LastQuizMarks;