import React from 'react'
import Header from './header'
import Heading from './heading'
import TextTester from './textTester'
import SpeechToText from './SpeechTotext'
import TextToSpeech from './textToSpeech'
import About from './about'
import Feedback from './feedback'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function Main() {
    // const router = createBrowserRouter([
    //     {
    //         path:"/",
    //         element:{<HomePage />} 
    //     }
    //     ,
    //     {
    //         path:"/Voicemode",
    //         element: <SpeechToText/>
    //     },
    //     {
    //       path:"/Speechmode",
    //       element: <TextToSpeech/>
    //     }
    // ])

   
  return (
    // <div className="body">
    //    <RouterProvider router={router}/>
    // </div>
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<AboutPage/>}/>
          <Route path="/feedback" element={<FeedbackPage/>}/>
          <Route path="/Voicemode" element={<Voicemode />} />
          <Route path="/Speechmode" element={<Speechmode/>} />
        </Routes>
      </Router>
    </div>
  )
}

function HomePage(){
  return(
    <>
      <Header/>
      <Heading/>
      <TextTester/>
    </>
  )
}

function AboutPage(){
   return(
    <>
     <Header/>
      <About/>
    </>
   )
}
function FeedbackPage(){
  return(
  <>
       <Header/>
      <Feedback/>
  </>
  )
}
 function Voicemode(){
  return(
    <>
      <Header/>
      <Heading/>
      <SpeechToText/>
    </>
  )
 }

 function Speechmode(){
  return(
    <>
     <Header/>
      <Heading/>
      <TextToSpeech/>
    </>
  )
 }
