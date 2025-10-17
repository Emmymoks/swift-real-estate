import React, { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const [isLight, setIsLight] = useState(() => {
    try {
      const val = localStorage.getItem('site-theme')
      return val === 'light'
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if(isLight){
      root.classList.add('theme-light')
      localStorage.setItem('site-theme', 'light')
    } else {
      root.classList.remove('theme-light')
      localStorage.setItem('site-theme', 'dark')
    }
  }, [isLight])

  return (
    <button
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={'theme-toggle ' + (isLight ? 'light' : 'dark')}
      type="button"
      onClick={() => setIsLight(v => !v)}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {isLight ? (
          <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#fff"/>
        )}
      </svg>
    </button>
  )
}
