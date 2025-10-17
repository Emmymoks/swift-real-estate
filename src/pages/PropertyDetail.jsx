import React from 'react'
import { useParams, Link } from 'react-router-dom'
import properties from '../data/properties'

export default function PropertyDetail(){
  const { id } = useParams()
  const p = properties.find(x=>x.id===id)
  if(!p) return <div className='container'><h2>Property not found</h2></div>

  return (
    <div className='container property-detail'>
      <div className='back'>
        <Link to='/properties' className='btn-link'>← Back to listings</Link>
      </div>
      <div className='detail-grid'>
        <div className='gallery'>
          <div className='main-img' style={{backgroundImage:`url(${p.img})`}} />
          <div className='thumbs'>
            {p.gallery.map((g,i)=> <div key={i} className='thumb' style={{backgroundImage:`url(${g})`}} />)}
          </div>
        </div>
        <div className='detail-info'>
          <h1>{p.title}</h1>
          <div className='meta'>{p.location} • {p.price}</div>
          <div className='specs'>{p.beds} beds • {p.baths} baths • {p.area}</div>
          <p className='desc'>{p.description}</p>
          <div className='cta-row'>
            <a className='btn-primary' href={`mailto:info@swiftrealestate.com?subject=Inquiry about ${encodeURIComponent(p.title)}`}>Request Viewing</a>
            <Link className='btn-outline' to={'/contact#contact'}>Contact Agent</Link>
          </div>

          <section className='additional'>
            <h3>Property Details</h3>
            <ul>
              <li>Parking: Private garage</li>
              <li>Year built: 2018 (recent renovations)</li>
              <li>Smart home: Full automation</li>
              <li>Other: Concierge & security services available</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
