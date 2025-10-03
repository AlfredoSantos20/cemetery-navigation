import React, { useState } from 'react'
import '../styles/MemorialHoverCard.css'

const MemorialHoverCard = ({ isVisible, onClose, onNavigate, x, y }) => {
  const [showDetailedCard, setShowDetailedCard] = useState(false)

  if (!isVisible) return null

  const handleSeeMore = () => {
    setShowDetailedCard(true)
  }

  const handleDetailedClose = () => {
    setShowDetailedCard(false)
  }

  if (showDetailedCard) {
    return (
      <div className="memorial-hover-overlay" onClick={onClose}>
        {/* Detailed Memorial Card positioned in left corner */}
        <div 
          className="detailed-memorial-card" 
          onClick={(e) => e.stopPropagation()}
          style={{
            left: '20px',
            top: '20px'
          }}
        >
          {/* Memorial Plaque */}
          <div className="detailed-plaque">
            <div className="plaque-icon">⛪</div>
            <div className="plaque-quote">"Your memories will remain in our hearts"</div>
            <div className="plaque-name">Gabriel Adrena</div>
            <div className="plaque-dates">June 10, 1948</div>
            <div className="plaque-dates">Feb 25, 2018</div>
          </div>

          {/* Card Content */}
          <div className="card-content">
            <div className="card-name">Gabriel Adrena</div>
            
            <div className="info-row">
              <span className="info-label">Birth:</span>
              <span className="info-value">June 10, 1948</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Death:</span>
              <span className="info-value">February 25, 2018</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">Male</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Burial:</span>
              <span className="info-value">Manila North Park Cemetery</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Plot:</span>
              <span className="info-value">Cluster A - Row 4 - Box 5</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Memorial ID:</span>
              <span className="info-value">10008789</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="cancel-btn" onClick={handleDetailedClose}>
              Cancel
            </button>
            <button className="go-now-btn" onClick={onNavigate}>
              Go Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="memorial-hover-overlay" onClick={onClose}>
      
      {/* Main White Card */}
      <div 
        className="memorial-card-container" 
        onClick={(e) => e.stopPropagation()}
        style={{
          left: `${x - 90}px`, // Center horizontally (90px is half of 180px width)
          top: `${y - 270}px`    // Position above the grid box
        }}
      >
        
        {/* Memorial Plaque Image */}
        <div className="memorial-plaque">
          
          {/* Gold Corner Decorations */}
          <div className="corner-decoration corner-top-left"></div>
          <div className="corner-decoration corner-top-right"></div>
          <div className="corner-decoration corner-bottom-left"></div>
          <div className="corner-decoration corner-bottom-right"></div>

       
        </div>

        {/* Text Below Plaque */}
        <div className="below-plaque-text">
          <div className="main-name">Erlinda Ajeda</div>
          <div className="date-range">November 25, 1950 - September 9, 2013</div>
        </div>

        {/* See More Button */}
        <button className="see-more-btn" onClick={handleSeeMore}>
          See More
        </button>

      </div>

    </div>
  )
}

export default MemorialHoverCard