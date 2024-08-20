import React from 'react'
import Navbar from './Navbar'
import Quizcard from './Quizcard'

export default function Dashboard() {
  return (
    <div><Navbar></Navbar>
    <div>
      <Quizcard></Quizcard>
    </div>
    </div>
  )
}
