import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  {to: '/', label: 'Home'},
  {to: '/properties', label: 'Properties'},
  {to: '/about', label: 'About'},
  {to: '/contact', label: 'Contact'}
]

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <header className='nav'>
      <div className='nav-inner'>
        <Link to='/' className='brand' onClick={() => setOpen(false)}>
          <div className='logo'>SR</div>
          <div>
            <div className='brand-title'>Swift Real Estate</div>
            <div className='brand-motto'>Swiftly Closing Deals, and Opening Doors</div>
          </div>
        </Link>

        <nav aria-label='Primary navigation'>
          {navLinks.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
              <motion.span whileHover={{ y: -2 }}>{n.label}</motion.span>
            </NavLink>
          ))}
        </nav>

        <div className='cta hide-on-mobile'>
          <Link to='/contact' className='btn-primary'>Get in touch</Link>
        </div>

        {/* mobile hamburger */}
  <button type="button" className={"hamburger" + (open ? ' open' : '')} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span className='box'>
            <span className='line top' />
            <span className='line mid' />
            <span className='line bot' />
          </span>
        </button>

      </div>

      <AnimatePresence>
        {open && (
          <motion.div className='mobile-menu' initial={{opacity:0, y:-12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-12}} transition={{duration:0.28}}>
            <div className='mobile-menu-inner'>
              {navLinks.map(n => (
                <motion.div key={n.to} whileTap={{scale:0.98}}>
                  <NavLink to={n.to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'navlink active' : 'navlink'}>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
              <div style={{marginTop:12}}>
                <Link to='/contact' onClick={() => setOpen(false)} className='btn-primary'>Get in touch</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
