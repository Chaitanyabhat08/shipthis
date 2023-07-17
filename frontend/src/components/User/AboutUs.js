import React from 'react';


const AboutUs = () => {
  return (<>
    <div style={{textAlign:'center'}}>
      <h1>ABOUT ME</h1> 
      <hr/>
      <h3>Chaitanya Bhat</h3>
      <h4>Software Development Engineer</h4>
      <p>Banglore, Karnataka - India | chaitanyabhat08@gmail.com | +91-9113986668</p>
    </div>
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
      <div class="card" style={{ "width": "18rem", textAlign:'center'}}>
        <div class="card-body">
          <h6 class="card-title">Visit My LinkedIn</h6>
          <a href="https://www.linkedin.com/in/chaitanya-bhat-8b35561bb/" class="card-link">LinkedIn</a>
        </div>
      </div>
      <div class="card" style={{ "width": "18rem", textAlign: 'center' }}>
        <div class="card-body">
          <h6 class="card-title">Visit My GitHub</h6>
          <a href="https://github.com/Chaitanyabhat08" class="card-link">GitHib</a>
        </div>
      </div>
    </div>
  </>
  )
}

export default AboutUs