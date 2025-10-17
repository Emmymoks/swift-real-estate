import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import properties from '../data/properties'

const cardContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 * i }
  })
}

const cardItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } }
}

export default function Home(){
  const hero = properties[0]
  return (
    <div className='home page-anim'>
      <section className='hero'>
        <div className='container'>
          <div className='hero-grid'>
          <motion.div className='hero-left' initial={{opacity:0, x:-40}} animate={{opacity:1, x:0}} transition={{duration:0.8}}>
            <h1>Experience Luxury Living with <span>Swift Real Estate</span></h1>
            <p>Swiftly Closing Deals, and Opening Doors. we connect discerning buyers and exceptional properties.</p>
            <div className='hero-ctas'>
              <Link to='/properties' className='btn-secondary'>Explore Listings</Link>
              <Link to='/contact' className='btn-primary'>Schedule a Viewing</Link>
            </div>
            <ul className='features'>
              <li>Exclusive off-market listings</li>
              <li>Concierge-level service</li>
              <li>Global buyer network</li>
            </ul>
          </motion.div>
          <motion.div className='hero-right' initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{duration:0.8}}>
            <div className='hero-card hero-card-float' style={{backgroundImage:`url(${hero.img})`}} aria-hidden='true'>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      <section className='showcase'>
        <div className='container'>
          <h2>Featured Properties</h2>

          {/* Group properties by type and show one card per type */}
          <TypeGrid properties={properties} />
          
          {/* Customer reviews section */}
          <Reviews />
        </div>
      </section>
    </div>
  )
}


function TypeGrid({ properties }){
  // group by type
  const groups = useMemo(() => {
    return properties.reduce((acc, p) => {
      acc[p.type] = acc[p.type] || []
      acc[p.type].push(p)
      return acc
    }, {})
  }, [properties])

  const types = Object.keys(groups)

  return (
    <motion.div className='grid' variants={cardContainer} initial='hidden' animate='visible'>
      {types.map((type, idx) => (
        <motion.div className='card' variants={cardItem} key={type} custom={idx}>
          <TypeCard type={type} items={groups[type]} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function TypeCard({ type, items }){
  // collect images: main image + any gallery images from each item
  const images = useMemo(() => {
    const set = []
    items.forEach(it => {
      if(it.img && !set.includes(it.img)) set.push(it.img)
      if(Array.isArray(it.gallery)){
        it.gallery.forEach(g => { if(g && !set.includes(g)) set.push(g) })
      }
    })
    // fallback to a small placeholder if empty
    return set.length ? set : ['https://images.unsplash.com/photo-1505691723518-36a0f61b25b6?auto=format&fit=crop&w=1400&q=80']
  }, [items])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    // cycle every 3.5s, clean up on unmount
    const t = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, 3500)
    return () => clearInterval(t)
  }, [images.length])

  // pick a representative item (first) for textual info
  const sample = items[0]

  return (
    <a href={`/properties/${sample.id}`} style={{display:'block',height:'100%'}}>
      <div className='card-img' aria-hidden style={{position:'relative',height:200,borderRadius:12,overflow:'hidden'}}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{opacity:0}}
            animate={{opacity: i === index ? 1 : 0}}
            transition={{duration:0.8}}
            style={{backgroundImage:`url(${src})`,backgroundSize:'cover',backgroundPosition:'center',position:'absolute',inset:0}}
          />
        ))}
      </div>

      <div className='card-body'>
        <div>
          <div className='card-title'>{type}</div>
        </div>
      </div>
    </a>
  )
}

/* Reviews component: shows groups of 3 reviews, cycles automatically */
function Reviews(){
  const reviews = useMemo(() => ([
    {name: 'Oliver Hayes', text: 'Swift helped us close a dream home in under two weeks. Exceptional service!', rating:5},
    {name: 'Ava Martinez', text: 'Professional, responsive, and incredibly knowledgeable. Highly recommend.', rating:5},
    {name: 'Liam Johnson', text: 'Seamless process from viewing to closing. Top-tier agents.', rating:5},
    {name: 'Sophia Brown', text: 'They found us an off-market gem. VIP treatment all the way.', rating:5},
    {name: 'Noah Wilson', text: 'Expert negotiation and great communication. Couldn’t be happier.', rating:5},
    {name: 'Isabella Davis', text: 'Truly concierge-level service. Every detail was handled.', rating:5},
    {name: 'Mason Miller', text: 'Quick, honest, and effective. Made the process painless.', rating:5},
    {name: 'Mia Anderson', text: 'Fantastic market knowledge and friendly agents.', rating:5},
    {name: 'Lucas Thomas', text: 'They went above and beyond to stage and present our property.', rating:5},
    {name: 'Amelia Jackson', text: 'Responsive and professional. highly recommended for luxury properties.', rating:5},
    {name: 'Ethan White', text: 'Expert guidance and excellent results. A++', rating:5},
    {name: 'Charlotte Harris', text: 'Helpful, attentive, and efficient. Wonderful experience.', rating:5}
  ]), [])

  const perPage = 3
  const pages = Math.ceil(reviews.length / perPage)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPage(p => (p + 1) % pages), 3500)
    return () => clearInterval(t)
  }, [pages])

  const visible = []
  for(let i=0;i<perPage;i++){
    const idx = (page * perPage + i) % reviews.length
    visible.push(reviews[idx])
  }

  return (
    <section style={{marginTop:36}}>
      <h2>What our clients say</h2>
      <div style={{marginTop:18}}>
        <AnimatePresence mode='wait'>
          <motion.div key={page} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.5}} className='grid'>
            {visible.map((r, i) => (
              <div key={r.name + i} className='card'>
                <div className='card-body'>
                  <div style={{fontWeight:700, marginBottom:8}}>{r.name}</div>
                  <div style={{color:'var(--muted)', marginBottom:8}}>{r.text}</div>
                  <div style={{color:'var(--accent)'}}>{'★'.repeat(r.rating)}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
