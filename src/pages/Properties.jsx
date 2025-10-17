import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ModernSelect from '../components/ModernSelect'
import properties from '../data/properties'

export default function Properties(){
  const [filter, setFilter] = useState('All')
  const types = Array.from(new Set(properties.map(p=>p.type)))

  // group properties by type
  const grouped = types.reduce((acc, type) => {
    acc[type] = properties.filter(p => p.type === type)
    return acc
  }, {})

  const gridVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  }

  const item = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36 } }
  }

  return (
    <div className='page properties-page'>
      <div className='container'>
        <h1>Properties</h1>
        <p className='lead'>Browse our curated selection of luxury properties across the United States.</p>

        <div className='filters'>
          <ModernSelect id='type-select' label='Type:' value={filter} onChange={e=>setFilter(e.target.value)} options={[{value:'All', label:'All'}, ...types.map(t=>({value:t,label:t}))]} />
        </div>

        {/* If a filter is applied, show only that group */}
        {filter !== 'All' ? (
          <section className='group'>
            <h2 className='group-title'>{filter}</h2>
            <motion.div className='properties-grid' variants={gridVariants} initial='hidden' animate='visible'>
              {grouped[filter].map(p => (
                <motion.article className='property-card-grid' variants={item} key={p.id}>
                  <Link to={`/properties/${p.id}`} className='card-link'>
                    <div className='card-img' style={{backgroundImage:`url(${p.img})`}} />
                    <div className='card-body'>
                      <div className='card-title'>{p.title}</div>
                      <div className='card-sub'>{p.location} • {p.price}</div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </section>
        ) : (
          // show each type as its own section
          Object.keys(grouped).map(type => (
            <section className='group' key={type}>
              <h2 className='group-title'>{type}</h2>
              <motion.div className='properties-grid' variants={gridVariants} initial='hidden' animate='visible'>
                {grouped[type].map(p => (
                  <motion.article className='property-card-grid' variants={item} key={p.id}>
                    <Link to={`/properties/${p.id}`} className='card-link'>
                      <div className='card-img' style={{backgroundImage:`url(${p.img})`}} />
                      <div className='card-body'>
                        <div className='card-title'>{p.title}</div>
                        <div className='card-sub'>{p.location} • {p.price}</div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          ))
        )}

      </div>
    </div>
  )
}
