import React, { useState } from 'react'
import '../styles/MemorialHoverCard.css'

const MemorialHoverCard = ({ isVisible, onClose, onNavigate, x, y }) => {
  const [showDetailedCard, setShowDetailedCard] = useState(false)
  const [currentMemorialIndex, setCurrentMemorialIndex] = useState(0)

  // Memorial data array with different tombstone information
  const memorialData = [
    {
      id: 1,
      name: "Erlinda Ajeda",
      birthDate: "November 25, 1950",
      deathDate: "September 9, 2013",
      gender: "Female",
      burial: "Manila North Park Cemetery",
      plot: "Cluster A - Row 4 - Box 5",
      memorialId: "10008789",
      tombstoneImage: "/images/tombstone1.png",
      memorialPlaqueImage: "/images/tombstone1.png"
    },
    {
      id: 2,
      name: "Pedro Dela Pena",
      birthDate: "February 12, 1990",
      deathDate: "November 25, 2023",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster B - Row 2 - Box 3",
      memorialId: "10008790",
      tombstoneImage: "/images/tombstone3.png",
      memorialPlaqueImage: "/images/tombstone3.png"
    },
    {
      id: 3,
      name: "Patrick Mejica",
      birthDate: "July 8, 1960",
      deathDate: "August 15, 1870",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster C - Row 1 - Box 7",
      memorialId: "10008791",
      tombstoneImage: "/images/tombstone4.png",
      memorialPlaqueImage: "/images/tombstone4.png"
    },
    {
      id: 4,
      name: "Johnny Lukban",
      birthDate: "December 10, 1971",
      deathDate: "April 18, 2022",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster D - Row 3 - Box 2",
      memorialId: "10008792",
      tombstoneImage: "/images/tombstone5.png",
      memorialPlaqueImage: "/images/tombstone5.png"
    },
    {
      id: 5,
      name: "Edita Abad",
      birthDate: "April 10, 1943",
      deathDate: "December 13, 2013",
      gender: "Female",
      burial: "Manila North Park Cemetery",
      plot: "Cluster E - Row 5 - Box 4",
      memorialId: "10008793",
      tombstoneImage: "/images/tombstone6.png",
      memorialPlaqueImage: "/images/tombstone6.png"
    },
    {
      id: 6,
      name: "Rosita Ador",
      birthDate: "October 14, 1942",
      deathDate: "April 26, 2011",
      gender: "Female",
      burial: "Manila North Park Cemetery",
      plot: "Cluster F - Row 2 - Box 6",
      memorialId: "10008794",
      tombstoneImage: "/images/tombstone7.png",
      memorialPlaqueImage: "/images/tombstone7.png"
    },
    {
      id: 7,
      name: "Gabriel Adrena",
      birthDate: "June 10, 1948",
      deathDate: "Feb 25, 2018",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster G - Row 4 - Box 1",
      memorialId: "10008795",
      tombstoneImage: "/images/tombstone8.png",
      memorialPlaqueImage: "/images/tombstone8.png"
    },
    {
      id: 8,
      name: "Rolando Aguire",
      birthDate: "September 16, 1970",
      deathDate: "June 17, 2014",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster H - Row 1 - Box 8",
      memorialId: "10008796",
      tombstoneImage: "/images/tombstone9.png",
      memorialPlaqueImage: "/images/tombstone9.png"
    },
    {
      id: 9,
      name: "Audie Alviar",
      birthDate: "January 28, 1928",
      deathDate: "October 04, 2013",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster I - Row 3 - Box 5",
      memorialId: "10008797",
      tombstoneImage: "/images/tombstone10.png",
      memorialPlaqueImage: "/images/tombstone10.png"
    },
    {
      id: 10,
      name: "Danilo Alvarez",
      birthDate: "September 05, 1941",
      deathDate: "August 01, 2014",
      gender: "Male",
      burial: "Manila North Park Cemetery",
      plot: "Cluster J - Row 2 - Box 9",
      memorialId: "10008798",
      tombstoneImage: "/images/tombstone11.png",
      memorialPlaqueImage: "/images/tombstone11.png"
    },
    
  ]

  const currentMemorial = memorialData[currentMemorialIndex]

  const handlePrevious = () => {
    setCurrentMemorialIndex((prev) => 
      prev === 0 ? memorialData.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentMemorialIndex((prev) => 
      prev === memorialData.length - 1 ? 0 : prev + 1
    )
  }

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
            <img src={currentMemorial.tombstoneImage} alt="tombstone" className="tombstone-image" />
          </div>

          {/* Card Content */}
          <div className="card-content">
            <div className="card-name">{currentMemorial.name}</div>
            
            <div className="info-row">
              <span className="info-label">Birth:</span>
              <span className="info-value">{currentMemorial.birthDate}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Death:</span>
              <span className="info-value">{currentMemorial.deathDate}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">{currentMemorial.gender}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Burial:</span>
              <span className="info-value">{currentMemorial.burial}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Plot:</span>
              <span className="info-value">{currentMemorial.plot}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Memorial ID:</span>
              <span className="info-value">{currentMemorial.memorialId}</span>
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
        {/* Navigation Buttons */}
        <button className="nav-btn nav-btn-left" onClick={handlePrevious}>
          ‹
        </button>
        <button className="nav-btn nav-btn-right" onClick={handleNext}>
          ›
        </button>
        
        {/* Memorial Plaque Image */}
        <div className="memorial-plaque">
          <img 
            src={currentMemorial.memorialPlaqueImage} 
            alt={`Memorial plaque for ${currentMemorial.name}`} 
            className="memorial-plaque-image"
          />
        </div>

        {/* Text Below Plaque */}
        <div className="below-plaque-text">
          <div className="main-name">{currentMemorial.name}</div>
          <div className="date-range">{currentMemorial.birthDate} - {currentMemorial.deathDate}</div>
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