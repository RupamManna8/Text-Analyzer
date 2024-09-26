import React, { useState } from 'react';
import "../styles/feedback.css";
import { redirect } from 'react-router-dom';

export default function Feedback() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Rating, setRating] = useState(null);
  const [Suggestion, setSuggestion] = useState("");

 async function formSubmit(e) {
    e.preventDefault();

    
    
    if(Email==="" || Name===""|| Rating===null)
    { 
      alert("Please Fill Proper form")
    }
    else{
      let result = await fetch('http://172.16.1.74:5000/formData',{
       method:'post',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify({Name,Email,Phone,Rating,Suggestion})
    });
    
    result = result.json;
    localStorage.setItem("newCollection",JSON.stringify(result));
    alert("Form Submited")
    redirect("/feedback")
    window.location.reload();
    }
    
  }

  return (
    <>
      <div className="container2">
        <h1>FEEDBACK FORM</h1>
        <p>Your feedback really matters to us. Please fill out the form.</p>
        <div className="Form-container">
          <form onSubmit={formSubmit}>
            <label htmlFor="name" className='t'>Name:
            <input type="text" id="name" className='input-name' placeholder='Enter name' value={Name} onChange={(e) => setName(e.target.value)} /></label><br /><br />
            
            <label htmlFor="email" className='t'>Email:
            <input type="email" id="email" className='input-email' placeholder='Enter email' value={Email} onChange={(e) => setEmail(e.target.value)} /></label><br /><br />
            
            <label htmlFor="phone" className='t'>Phone No:
            <input type="tel" id="phone" className='input-phone' maxLength={10} placeholder='Enter phone number' value={Phone} onChange={(e) => setPhone(e.target.value)} /></label><br /><br />
            
            <label htmlFor="rating" className='t'>Rating:
            <input type="number" id="rating" min={0} max={5} className='input-rating' placeholder='0' value={Rating} onChange={(e) => setRating(e.target.value)} />
            <div className="rating-bracket">(between 1 to 5)</div></label><br /><br />
            
            <label htmlFor="suggestion" className='t'>Suggestion:
            <textarea id="suggestion" className='input-suggetion' maxLength={200} placeholder='Give us some suggestion' value={Suggestion} onChange={(e) => setSuggestion(e.target.value)}></textarea></label><br /><br />
            
            <button type="submit" className='submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

// import React,{useState} from 'react'
// import "../styles/feedback.css"
// export default function Feedback() {
// const[Name,setName]=useState("");
// const[Email,setEmail]=useState("");
// const[Phone,setPhone]=useState(null);
// const[Rating,setRating]=useState(null);
// const[Suggetion,setSuggetion]=useState("");
// function FormSubmit(){
//   console.log(Name)
//   console.log(Email)
//   console.log(Phone)
//   console.log(Rating)
//   console.log(Suggetion)
// }

//   return (
//     <>
//       <div className="container2">
//         <h1>FEEDBACK FORM</h1>
//         <p>Your feedback realy matter to us please fill out the form</p>
//         <div className="Form-container">
//           <form method='POST'>
//               <label htmlFor="text" className='t' >Name:<input type="text" name="text" value={Name} className='input-name' placeholder='Enter name' onChange={(e)= setName(e.target.value)} /></label><br /><br />
//               <label htmlFor="text" className='t'>Email:<input type="email" name="text" value={Email} className='input-email' placeholder='Enter email'onChange={(e)= setEmail(e.target.value)} /></label><br /><br />
//               <label htmlFor="text" className='t'>Phone No:<input type="tel" name="text" value={Phone} className='input-phone' maxLength={10} placeholder='Enter phone number'onChange={(e)= setPhone(e.target.value)} /></label><br /><br />
//               <label htmlFor="text" className='t'>Rating:<input type="number" value={Rating} min={0} max={5} name="text" className='input-rating' placeholder='0'  onChange={(e)= setRating(e.target.value)}/><div className="rating-bracket" >(between 1 to 5)</div></label><br /><br />
//               <label htmlFor="text" className='t'>Suggetion: <textarea name="suggetion" value={Suggetion}  className='input-suggetion' maxLength={200} placeholder='Give us some suggetion'onChange={(e)= setSuggetion(e.target.value)} ></textarea></label><br /><br />
//               <button type="submit" className='submit' onClick={FormSubmit}>submit</button>
//           </form>
//         </div>
//       </div>
     
//   </>
//   )
// }
