import React from 'react'

export default function ModernSelect({id, label, value, onChange, options = []}){
  return (
    <div className='modern-select modern-select--custom' aria-hidden={false}>
      <label htmlFor={id}>{label}</label>
      <div className='modern-select-inner'>
        <select id={id} value={value} onChange={onChange} aria-label={label}>
          {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  )
}
