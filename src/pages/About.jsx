import React, { useMemo, useState, useEffect } from 'react'
import properties from '../data/properties'
import { motion } from 'framer-motion'

export default function About(){
  const images = useMemo(() => properties.slice(0,8).map(p => p.img).filter(Boolean), [])

  return (
    <div className='container about-page'>
      <h1>About Swift Real Estate</h1>
      <p className='lead'>Swift Real Estate specialises in luxury property transactions. from penthouses to private estates. Founded by industry veterans, we offer white-glove service and a global network of buyers and sellers.</p>

      <div className='team'>
        <article>
          <h3>Our Mission</h3>
          <p>To deliver exceptional real estate experiences with integrity, speed, and discretion.</p>
        </article>
        <article>
          <h3>What We Offer</h3>
          <ul>
            <li>Residential sales & acquisitions</li>
            <li>Off-market deals</li>
            <li>Luxury rentals and property management</li>
            <li>Advisory services for high-net-worth clients</li>
          </ul>
        </article>
      </div>

      <div style={{marginTop:36}}>
          <h2 className='about-strip-title'>Our properties. a quick look</h2>
        <ImageStrip images={images} />
      </div>
    </div>
  )
}

function ImageStrip({ images = [] }){
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if(!images.length) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className='about-strip-wrap'>
      <div className='about-strip-viewport'>
        {images.map((src,i) => (
          <motion.div
            key={src}
            initial={{opacity:0}}
            animate={{opacity: i === idx ? 1 : 0}}
            transition={{duration:0.8}}
            className='about-strip-img'
            style={{backgroundImage:`url(${src})`}}
          />
        ))}
      </div>
    </div>
  )
}
