import React, { useState } from 'react'
import '../styles/Card.css'
import MemorialHoverCard from './MemorialHoverCard.jsx'

const Card = () => {
  const [hoverCard, setHoverCard] = useState({ visible: false, x: 0, y: 0, section: null, slot: null })
  const [targetPosition, setTargetPosition] = useState(null)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSlotClick = (event) => {
    event.stopPropagation()
    const section = event.target.dataset.section
    const slot = event.target.dataset.slot
    console.log(`Clicked section ${section}, slot ${slot}`)
    
    // Add visual feedback
    event.target.style.transform = 'scale(0.95)'
    setTimeout(() => {
      event.target.style.transform = 'scale(1)'
    }, 150)
    
    // Get position of clicked grid box
    const rect = event.target.getBoundingClientRect()
    const x = rect.left + (rect.width / 2) // Center horizontally on grid box
    const y = rect.top - 20 // Position above the grid box
    
    // Store target position for navigation
    setTargetPosition({ section, slot, element: event.target })
    
    // Show memorial hover card at grid box position
    setHoverCard({ visible: true, x, y, section, slot })
  }

  const hideHoverCard = () => {
    setHoverCard({ visible: false, x: 0, y: 0, section: null, slot: null })
    setTargetPosition(null)
  }

  const handleNavigate = () => {
    if (targetPosition) {
      setIsNavigating(true)
      
      // Remove existing YOU ARE HERE marker
      const existingMarker = document.querySelector('.old-location-marker')
      if (existingMarker) {
        existingMarker.remove()
      }
      
      // Remove existing navigation lines
      const existingLines = document.querySelectorAll('.navigation-line')
      existingLines.forEach(line => line.remove())
      
      // Get the card element and its rect
      const cardElement = document.querySelector('.card')
      const cardRect = cardElement.getBoundingClientRect()
      
      // Get start position (bottom center of card)
      const startX = cardRect.width / 2
      const startY = cardRect.height - 80
      
      // Get target position relative to the card (center of grid box)
      const targetRect = targetPosition.element.getBoundingClientRect()
      const placementX = targetRect.left - cardRect.left + targetRect.width / 2
      const placementY = targetRect.top - cardRect.top + targetRect.height / 2
      
      // Create curved SVG path element
      const deltaX = placementX - startX
      const deltaY = placementY - startY
      
      // Calculate control points to go outside/around sections
      const midX = startX + deltaX * 0.5
      const midY = startY + deltaY * 0.5
      
      // Create curve that goes outside/around cemetery sections
      const offsetDistance = 80 // Distance to curve outside sections
      
      // Determine which side to curve based on direction
      let curveDirection = 1 // 1 for outside, -1 for opposite side
      
      // If going to top sections, curve downward first then up
      if (placementY < startY) {
        curveDirection = 1
      }
      // If going to bottom sections, curve upward first then down  
      else if (placementY > startY + 100) {
        curveDirection = -1
      }
      
      // Control points that create curves going around sections
      const control1X = startX + deltaX * 0.25
      const control1Y = startY - (curveDirection * offsetDistance) // Go outside initially
      const control2X = startX + deltaX * 0.75  
      const control2Y = placementY + (curveDirection * offsetDistance) // Come from outside
      
      // Create SVG container
      const svgElement = document.createElement('div')
      svgElement.className = 'navigation-line'
      svgElement.style.position = 'absolute'
      svgElement.style.left = '0px'
      svgElement.style.top = '0px'
      svgElement.style.width = `${cardRect.width}px`
      svgElement.style.height = `${cardRect.height}px`
      svgElement.style.zIndex = '50'
      svgElement.style.pointerEvents = 'none'
      
      // Create unique gradient ID
      const gradientId = `lineGradient-${Date.now()}`
      
      // Create SVG with curved path
      svgElement.innerHTML = `
        <svg width="100%" height="100%" style="overflow: visible;">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ff0000;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#ff4444;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff0000;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${placementX} ${placementY}" 
                stroke="url(#${gradientId})" 
                stroke-width="4" 
                fill="none" 
                stroke-dasharray="1000" 
                stroke-dashoffset="1000"
                style="transition: stroke-dashoffset 2s ease-out;">
          </path>
        </svg>
      `
      
      // Add to card
      cardElement.appendChild(svgElement)
      
      // Animate line drawing
      setTimeout(() => {
        const path = svgElement.querySelector('path')
        if (path) {
          path.style.strokeDashoffset = '0'
        }
      }, 100)
      
      // Create new location marker at the end of the line
      const locationMarker = document.createElement('div')
      locationMarker.className = 'old-location-marker'
      locationMarker.style.position = 'absolute'
      locationMarker.style.left = `${placementX}px`
      locationMarker.style.top = `${placementY}px`
      locationMarker.style.transform = 'translate(-50%, -50%)'
      locationMarker.style.zIndex = '60'
      locationMarker.innerHTML = `
        <div class="location-pin">
          <div class="pin-icon">📍</div>
        </div>
        
      `
      locationMarker.style.opacity = '0'
      
      // Add marker to card
      cardElement.appendChild(locationMarker)
      
      // Calculate animation duration
      const duration = 2000 // 2 seconds
      
      // Hide the memorial card
      setHoverCard({ visible: false, x: 0, y: 0, section: null, slot: null })
      
      // Show marker after line animation completes
      setTimeout(() => {
        locationMarker.style.transition = 'opacity 0.5s ease'
        locationMarker.style.opacity = '1'
        
        // Complete navigation
        setTimeout(() => {
          setIsNavigating(false)
        }, duration)
      }, 2100) // 2s line animation + 100ms buffer
    }
  }


  return (
    <>
      <div className="card" onClick={hideHoverCard}>
      {/* Top Navigation */}
      <div className="top-nav">
        {/* <div className="home-btn">
          <span className="home-icon">🏠</span>
        </div> */}
        {/* <div className="search-bar">
          <span className="search-icon">🔍</span>
          <span className="search-text">Search</span>
       
        </div> */}
        {/* <div className="settings-btn">
          <span className="gear-icon">⚙️</span>
        </div> */}
      </div>

      {/* All 6 Sections positioned over background plots */}
      {/* Section G (Top Left) */}
      <div className="section section-g">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">G</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="G" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section A (Top Center-Left) */}
      <div className="section section-a">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">A</span>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="A" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
          {Array.from({ length: 2 }, (_, i) => (
            <div key={`orange-${i}`} className="grid-item white-box orange-border clickable-slot" data-section="A" data-slot={i+10} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 3</div>
            </div>
          ))}
          <div className="grid-item white-box green-border clickable-slot" data-section="A" data-slot="12" onClick={handleSlotClick}>
            <div className="slot-tooltip">available slots : 5</div>
          </div>
          <div className="grid-item white-box orange-border clickable-slot" data-section="A" data-slot="13" onClick={handleSlotClick}>
            <div className="slot-tooltip">available slots : 3</div>
          </div>
          <div className="grid-item white-box green-border clickable-slot" data-section="A" data-slot="14" onClick={handleSlotClick}>
            <div className="slot-tooltip">available slots : 5</div>
          </div>
          <div className="grid-item white-box red-border clickable-slot" data-section="A" data-slot="15" onClick={handleSlotClick}>
            <div className="slot-tooltip">available slots : 0</div>
          </div>
        </div>
      </div>

      {/* Section B (Top Center-Right) */}
      <div className="section section-b">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">B</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="B" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section H (Top Right) */}
      <div className="section section-h">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">H</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="H" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section J (Bottom Center-Left) */}
      <div className="section section-j">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">J</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="J" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section I (Bottom Center-Right) */}
      <div className="section section-i">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">I</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="I" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section C (Top Left-Center) */}
      <div className="section section-c">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">C</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="C" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section D (Top Right-Center) */}
      <div className="section section-d">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">D</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="D" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section E (Bottom Left-Center) */}
      <div className="section section-e">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">E</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="E" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section F (Bottom Right-Center) */}
      <div className="section section-f">
        <div className="section-grid">
          <div className="grid-item central-block">
            <span className="section-letter">F</span>
          </div>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="grid-item white-box green-border clickable-slot" data-section="F" data-slot={i} onClick={handleSlotClick}>
              <div className="slot-tooltip">available slots : 5</div>
            </div>
          ))}
        </div>
      </div>


      {/* Legend */}
      <div className="legend">
        <div className="legend-title">LEGEND</div>
        <div className="legend-item">
          <div className="legend-box green-border"></div>
          <span>- all slots available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box orange-border"></div>
          <span>- some slots available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box red-border"></div>
          <span>- no slots available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box home-btn">🏠</div>
          <span>- home button</span>
        </div>
      </div>

      </div>
      
      {/* Memorial Hover Card */}
      <MemorialHoverCard 
        isVisible={hoverCard.visible}
        onClose={hideHoverCard}
        onNavigate={handleNavigate}
        x={hoverCard.x}
        y={hoverCard.y}
      />
    </>
  )
}

export default Card