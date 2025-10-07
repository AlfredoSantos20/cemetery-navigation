import React, { useState } from 'react'
import '../styles/Card.css'
import MemorialHoverCard from './MemorialHoverCard.jsx'

const Card = () => {
  const [hoverCard, setHoverCard] = useState({ visible: false, x: 0, y: 0, section: null, slot: null })
  const [targetPosition, setTargetPosition] = useState(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState(['Erlinda Ajeda', 'Section A', 'Pedro Dela Pena', 'Gabriel Adrena'])
  const [selectedCluster, setSelectedCluster] = useState('A')
  const [selectedRow, setSelectedRow] = useState('All')
  const [filteredMemorials, setFilteredMemorials] = useState([])

  // Check if there are any red-border slots in the grid
  const hasRedBorderSlots = () => {
    const redBorderElements = document.querySelectorAll('.red-border')
    return redBorderElements.length > 0
  }

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

  const handleSearchBarClick = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen)
  }

  const handleSearchDropdownClose = () => {
    setIsSearchDropdownOpen(false)
  }

  // Cemetery sections data for search
  const cemeterySections = [
    { id: 'A', name: 'Section A', availableSlots: 5, totalSlots: 16, position: 'Top Center-Left' },
    { id: 'B', name: 'Section B', availableSlots: 5, totalSlots: 16, position: 'Top Center-Right' },
    { id: 'C', name: 'Section C', availableSlots: 5, totalSlots: 16, position: 'Top Left-Center' },
    { id: 'D', name: 'Section D', availableSlots: 5, totalSlots: 16, position: 'Top Right-Center' },
    { id: 'E', name: 'Section E', availableSlots: 5, totalSlots: 16, position: 'Bottom Left-Center' },
    { id: 'F', name: 'Section F', availableSlots: 5, totalSlots: 16, position: 'Bottom Right-Center' },
    { id: 'G', name: 'Section G', availableSlots: 5, totalSlots: 16, position: 'Top Left' },
    { id: 'H', name: 'Section H', availableSlots: 5, totalSlots: 16, position: 'Top Right' },
    { id: 'I', name: 'Section I', availableSlots: 5, totalSlots: 16, position: 'Bottom Center-Right' },
    { id: 'J', name: 'Section J', availableSlots: 5, totalSlots: 16, position: 'Bottom Center-Left' }
  ]

  // Comprehensive memorial data for search (matching MemorialHoverCard data)
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
      section: "A",
      slot: 5
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
      section: "B",
      slot: 3
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
      section: "C",
      slot: 7
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
      section: "D",
      slot: 2
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
      section: "E",
      slot: 4
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
      section: "F",
      slot: 6
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
      section: "G",
      slot: 1
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
      section: "H",
      slot: 8
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
      section: "I",
      slot: 5
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
      section: "J",
      slot: 9
    }
  ]

  const handleSearchInput = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setSearchResults([])
      return
    }

    // Search through sections and memorials
    const sectionResults = cemeterySections.filter(section =>
      section.name.toLowerCase().includes(query.toLowerCase()) ||
      section.position.toLowerCase().includes(query.toLowerCase())
    ).map(section => ({
      type: 'section',
      id: section.id,
      name: section.name,
      subtitle: `${section.availableSlots} slots available • ${section.position}`,
      data: section
    }))

    const memorialResults = memorialData.filter(memorial => {
      const searchTerm = query.toLowerCase()
      return (
        memorial.name.toLowerCase().includes(searchTerm) ||
        memorial.birthDate.toLowerCase().includes(searchTerm) ||
        memorial.deathDate.toLowerCase().includes(searchTerm) ||
        memorial.gender.toLowerCase().includes(searchTerm) ||
        memorial.burial.toLowerCase().includes(searchTerm) ||
        memorial.plot.toLowerCase().includes(searchTerm) ||
        memorial.memorialId.toLowerCase().includes(searchTerm) ||
        memorial.section.toLowerCase().includes(searchTerm) ||
        memorial.slot.toString().includes(searchTerm) ||
        // Search by year ranges
        memorial.birthDate.includes(searchTerm) ||
        memorial.deathDate.includes(searchTerm) ||
        // Search by partial names
        memorial.name.split(' ').some(part => part.toLowerCase().includes(searchTerm))
      )
    }).map(memorial => ({
      type: 'memorial',
      id: memorial.id,
      name: memorial.name,
      subtitle: `Section ${memorial.section}, Slot ${memorial.slot} • ${memorial.birthDate} - ${memorial.deathDate}`,
      data: memorial
    }))

    setSearchResults([...sectionResults, ...memorialResults])
  }

  const handleSearchResultClick = (result) => {
    if (result.type === 'section') {
      // Navigate to section
      const sectionElement = document.querySelector(`[data-section="${result.id}"]`)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Add visual highlight
        sectionElement.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.8)'
        setTimeout(() => {
          sectionElement.style.boxShadow = ''
        }, 2000)
      }
    } else if (result.type === 'memorial') {
      // Navigate to specific memorial
      const slotElement = document.querySelector(`[data-section="${result.data.section}"][data-slot="${result.data.slot}"]`)
      if (slotElement) {
        slotElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Trigger click to show memorial card
        slotElement.click()
      }
    }

    // Add to recent searches
    if (!recentSearches.includes(result.name)) {
      setRecentSearches(prev => [result.name, ...prev.slice(0, 4)])
    }

    // Close dropdown
    setIsSearchDropdownOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search)
    handleSearchInput({ target: { value: search } })
  }

  // Extract row number from plot string (e.g., "Cluster A - Row 4 - Box 5" -> 4)
  const getRowFromPlot = (plot) => {
    const match = plot.match(/Row (\d+)/)
    return match ? parseInt(match[1]) : null
  }

  // Get available rows for a cluster
  const getAvailableRows = (cluster) => {
    const clusterMemorials = memorialData.filter(memorial => memorial.section === cluster)
    const rows = [...new Set(clusterMemorials.map(memorial => getRowFromPlot(memorial.plot)).filter(Boolean))]
    return rows.sort((a, b) => a - b)
  }

  // Filter memorials by cluster and row
  const filterMemorialsByCluster = (cluster, row) => {
    let filtered = memorialData.filter(memorial => memorial.section === cluster)
    
    if (row !== 'All') {
      filtered = filtered.filter(memorial => getRowFromPlot(memorial.plot) === parseInt(row))
    }
    
    return filtered.sort((a, b) => {
      const rowA = getRowFromPlot(a.plot)
      const rowB = getRowFromPlot(b.plot)
      if (rowA !== rowB) return rowA - rowB
      
      const boxA = parseInt(a.plot.match(/Box (\d+)/)?.[1] || '0')
      const boxB = parseInt(b.plot.match(/Box (\d+)/)?.[1] || '0')
      return boxA - boxB
    })
  }

  // Handle cluster selection
  const handleClusterChange = (cluster) => {
    setSelectedCluster(cluster)
    setSelectedRow('All') // Reset row when cluster changes
    const filtered = filterMemorialsByCluster(cluster, 'All')
    setFilteredMemorials(filtered)
  }

  // Handle row selection
  const handleRowChange = (row) => {
    setSelectedRow(row)
    const filtered = filterMemorialsByCluster(selectedCluster, row)
    setFilteredMemorials(filtered)
  }

  // Initialize filtered memorials when dropdown opens
  React.useEffect(() => {
    if (isSearchDropdownOpen && searchQuery.trim() === '') {
      const filtered = filterMemorialsByCluster(selectedCluster, selectedRow)
      setFilteredMemorials(filtered)
    }
  }, [isSearchDropdownOpen, selectedCluster, selectedRow])

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
        <div className="home-btn">
          <span className="home-icon">🏠</span>
        </div>
        <div className="search-bar" onClick={handleSearchBarClick}>
          <span className="search-icon">🔍</span>
          <span className="search-text">Search</span>
          <svg className="microphone-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="currentColor"/>
            <path d="M19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10H3V12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12V10H19Z" fill="currentColor"/>
            <path d="M11 22H13V24H11V22Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="settings-btn">
          <span className="gear-icon">⚙️</span>
        </div>
      </div>

      {/* Search Dropdown */}
      {isSearchDropdownOpen && (
        <>
          {/* Backdrop Overlay */}
          <div className="search-backdrop" onClick={handleSearchDropdownClose}></div>
          
          {/* Search Dropdown */}
          <div className="search-dropdown">
            <div className="search-dropdown-content">
            {/* Search Input */}
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search sections, memorials..."
                value={searchQuery}
                onChange={handleSearchInput}
                autoFocus
              />
            </div>

            {/* Search Results or Sections */}
            {searchQuery.trim() !== '' ? (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.id}`}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <div className="result-icon">
                        {result.type === 'section' ? '📍' : '🪦'}
                      </div>
                      <div className="result-content">
                        <div className="result-name">{result.name}</div>
                        <div className="result-subtitle">{result.subtitle}</div>
                        {result.type === 'memorial' && (
                          <div className="result-details">
                            <span className="detail-item">ID: {result.data.memorialId}</span>
                            <span className="detail-item">•</span>
                            <span className="detail-item">{result.data.gender}</span>
                            <span className="detail-item">•</span>
                            <span className="detail-item">{result.data.plot}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No results found for "{searchQuery}"</div>
                )}
              </div>
            ) : (
              <>
                {/* Recent Searches */}
                <div className="search-section">
                  <h3 className="search-section-title">Recent Searches</h3>
                  <div className="recent-searches">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="recent-search-item"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <span className="recent-search-icon">🕒</span>
                        <span className="recent-search-text">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="search-divider"></div>
                {/* Search By Cluster */}
                <div className="search-section">
                  <h3 className="search-section-title">Search By Cluster</h3>
                  
                  {/* Cluster and Row Dropdowns */}
                  <div className="cluster-filters">
                    <div className="filter-group">
                      <label className="filter-label">Cluster :</label>
                      <select 
                        className="filter-dropdown"
                        value={selectedCluster}
                        onChange={(e) => handleClusterChange(e.target.value)}
                      >
                        {cemeterySections.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label className="filter-label">Row :</label>
                      <select 
                        className="filter-dropdown"
                        value={selectedRow}
                        onChange={(e) => handleRowChange(e.target.value)}
                      >
                        <option value="All">All</option>
                        {getAvailableRows(selectedCluster).map((row) => (
                          <option key={row} value={row}>
                            {row}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Filtered Memorial List */}
                  <div className="memorial-list">
                    {filteredMemorials.length > 0 ? (
                      filteredMemorials.map((memorial) => (
                        <div
                          key={memorial.id}
                          className="memorial-list-item"
                          onClick={() => handleSearchResultClick({
                            type: 'memorial',
                            id: memorial.id,
                            name: memorial.name,
                            subtitle: `Section ${memorial.section}, Slot ${memorial.slot} • ${memorial.birthDate} - ${memorial.deathDate}`,
                            data: memorial
                          })}
                        >
                          <div className="memorial-name">{memorial.name}</div>
                          <div className="memorial-plot">{memorial.plot}</div>
                        </div>
                      ))
                    ) : (
                      <div className="no-memorials">No memorials found in {selectedCluster}{selectedRow !== 'All' ? ` Row ${selectedRow}` : ''}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        </>
      )}

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
        <div className="legend-content">
          <div className="legend-row">
            <div className="legend-column">
              <div className="legend-item">
                <div className="legend-box green-border"></div>
                <span>- all slots available</span>
              </div>
              <div className="legend-item">
                <div className="legend-box orange-border"></div>
                <span>- some slots available</span>
              </div>
              {hasRedBorderSlots() && (
                <div className="legend-item">
                  <div className="legend-box red-border"></div>
                  <span>- no slots available</span>
                </div>
              )}
            </div>
            <div className="legend-column">
              <div className="legend-item">
                <div className="legend-box home-btn">🏠</div>
                <span>- home button</span>
              </div>
            </div>
          </div>
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