import React from 'react'
export default function Footer(){
  return (
    <footer className='footer' role='contentinfo'>
      <div className='footer-inner'>
        <div>
          <strong>Swift Real Estate</strong>
          <div style={{marginTop:6}}>© {new Date().getFullYear()} Swift Real Estate. All rights reserved.</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div>Luxury Sales · Rentals · Advisory</div>
          <div className='small'>Designed and built for deployment on Vercel</div>
        </div>
      </div>
    </footer>
  )
}
