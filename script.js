// Cemetery Navigation System - Complete Implementation Based on 5 Flow Design

// Target memorial data
const memorialData = {
    name: "Juan dela Cruz",
    birthDate: "April 10, 1985",
    deathDate: "June 25, 2009",
    gender: "Male",
    burial: "Manila North Park Cemetery",
    plot: "Cluster A - Row 2 - Box 1",
    memorialId: "10005789",
    availableSlots: 0,
    section: "A",
    row: 2,
    box: 1
};

// DOM Elements
const mapContainer = document.getElementById('mapContainer');
const memorialDetailsPanel = document.getElementById('memorialDetailsPanel');
const memorialCardOverlay = document.getElementById('memorialCardOverlay');
const hoverTooltip = document.getElementById('hoverTooltip');
const targetSlot = document.getElementById('targetSlot');
const sectionA = document.getElementById('sectionA');
const navigationLine = document.getElementById('navigationLine');
const youAreHereMarker = document.getElementById('youAreHereMarker');
const seeMoreBtn = document.getElementById('seeMoreBtn');
const goNowBtn = document.getElementById('goNowBtn');
const cancelBtn = document.getElementById('cancelBtn');
const navArrows = document.querySelectorAll('.nav-arrow');

// State management
let currentState = 'main'; // main, memorial-card, memorial-details, navigation
let hoverTimeout = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupInitialAnimations();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Step 2: Section hover effect
    sectionA.addEventListener('mouseenter', handleSectionHover);
    sectionA.addEventListener('mouseleave', handleSectionLeave);
    
    // Step 3: Target slot click for memorial card
    targetSlot.addEventListener('click', handleTargetSlotClick);
    
    // Step 4: See More button
    seeMoreBtn.addEventListener('click', handleSeeMoreClick);
    
    // Step 5: Go Now button
    goNowBtn.addEventListener('click', handleGoNowClick);
    
    // Cancel button
    cancelBtn.addEventListener('click', handleCancelClick);
    
    // Memorial card overlay click
    memorialCardOverlay.addEventListener('click', handleOverlayClick);
    
    // Navigation arrows
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', handleNavArrowClick);
    });
    
    // Setup other slot interactions
    setupSlotInteractions();
}

// Setup initial animations and state
function setupInitialAnimations() {
    // Animate map entrance
    mapContainer.classList.add('fade-in');
    
    // Setup initial highlighting for Section A
    setTimeout(() => {
        highlightSectionA();
    }, 500);
}

// Step 2: Handle Section A hover effect
function handleSectionHover(event) {
    // Clear any existing timeout
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
    }
    
    // Show tooltip after short delay
    hoverTimeout = setTimeout(() => {
        showTooltip(event);
        highlightTargetSlot();
    }, 300);
}

// Step 2: Handle Section A leave
function handleSectionLeave(event) {
    // Clear timeout if mouse leaves before delay
    if (hoverTimeout) {
        clearTimeout(hoverTimeout);
    }
    
    // Hide tooltip
    hideTooltip();
    unhighlightTargetSlot();
}

// Show tooltip for hover effect (Step 2)
function showTooltip(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipRect = hoverTooltip.getBoundingClientRect();
    
    // Position tooltip above Section A
    hoverTooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    hoverTooltip.style.top = `${rect.top - tooltipRect.height - 20}px`;
    
    hoverTooltip.classList.add('show');
}

// Hide tooltip
function hideTooltip() {
    hoverTooltip.classList.remove('show');
}

// Highlight the target slot (Step 2)
function highlightTargetSlot() {
    targetSlot.classList.add('target-slot', 'active');
}

// Remove highlight from target slot
function unhighlightTargetSlot() {
    targetSlot.classList.remove('target-slot', 'active');
}

// Step 3: Handle target slot click for memorial card display
function handleTargetSlotClick(event) {
    event.stopPropagation();
    
    // Show memorial card overlay
    showMemorialCard();
    
    // Update state
    currentState = 'memorial-card';
}

// Show memorial card overlay (Step 3)
function showMemorialCard() {
    memorialCardOverlay.classList.add('show');
    memorialCardOverlay.querySelector('.memorial-card').classList.add('scale-in');
    
    // Hide tooltip if visible
    hideTooltip();
}

// Step 4: Handle See More button click
function handleSeeMoreClick(event) {
    event.stopPropagation();
    
    // Show memorial details panel
    showMemorialDetails();
    
    // Update state
    currentState = 'memorial-details';
}

// Show memorial details panel (Step 4)
function showMemorialDetails() {
    // Hide memorial card overlay
    hideMemorialCard();
    
    // Show memorial details panel
    memorialDetailsPanel.classList.add('active');
    memorialDetailsPanel.classList.add('slide-in-left');
    
    // Adjust map container
    adjustMapForDetails();
    
    // Highlight target slot in details view
    setTimeout(() => {
        highlightTargetSlotForDetails();
    }, 100);
}

// Hide memorial card overlay
function hideMemorialCard() {
    memorialCardOverlay.classList.remove('show');
    memorialCardOverlay.querySelector('.memorial-card').classList.remove('scale-in');
}

// Adjust map container for details view
function adjustMapForDetails() {
    // Map shrinks to right side when details panel is shown
    const mapStyle = window.getComputedStyle(mapContainer);
    mapContainer.style.transition = 'all 0.5s ease-in-out';
}

// Highlight target slot in details view
function highlightTargetSlotForDetails() {
    targetSlot.classList.add('target-slot', 'active');
}

// Step 5: Handle Go Now button click
function handleGoNowClick(event) {
    event.stopPropagation();
    
    // Start navigation animation
    startNavigationAnimation();
    
    // Update state
    currentState = 'navigation';
}

// Start navigation animation (Step 5)
function startNavigationAnimation() {
    // Reset button state
    goNowBtn.disabled = true;
    goNowBtn.textContent = 'Navigating...';
    
    // Scroll to map view
    scrollToMapView();
    
    // Step 1: Highlight target slot
    setTimeout(() => {
        highlightTargetSlot();
        showTargetSlotInfo();
    }, 500);
    
    // Step 2: Show navigation line
    setTimeout(() => {
        showNavigationLine();
    }, 1000);
    
    // Step 3: Animate line drawing
    setTimeout(() => {
        animateLineDrawing();
    }, 1500);
    
    // Step 4: Complete navigation
    setTimeout(() => {
        completeNavigation();
    }, 3500);
}

// Scroll to map view
function scrollToMapView() {
    mapContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Show navigation line (Step 5)
function showNavigationLine() {
    navigationLine.classList.add('active');
}

// Animate line drawing from YOU ARE HERE to target slot
function animateLineDrawing() {
    // Calculate exact positions
    const mapRect = document.getElementById('cemeteryMap').getBoundingClientRect();
    const youAreHereRect = youAreHereMarker.getBoundingClientRect();
    const targetSlotRect = targetSlot.getBoundingClientRect();
    
    // Convert to percentages relative to map
    const startX = (((youAreHereRect.left + youAreHereRect.width/2) - mapRect.left) / mapRect.width) * 100;
    const startY = (((youAreHereRect.top + youAreHereRect.height) - mapRect.top) / mapRect.height) * 100;
    const endX = ((targetSlotRect.left + targetSlotRect.width/2) - mapRect.left) / mapRect.width * 100;
    const endY = ((targetSlotRect.top) - mapRect.top) / mapRect.height * 100;
    
    // Update line coordinates
    const lineElement = navigationLine.querySelector('#navLine');
    if (lineElement) {
        lineElement.setAttribute('x1', startX + '%');
        lineElement.setAttribute('y1', startY + '%');
        lineElement.setAttribute('x2', endX + '%');
        lineElement.setAttribute('y2', endY + '%');
        
        // Animate the line drawing
        lineElement.style.strokeDasharray = '1000';
        lineElement.style.strokeDashoffset = '1000';
        lineElement.style.transition = 'stroke-dashoffset 2s ease-in-out';
        
        setTimeout(() => {
            lineElement.style.strokeDashoffset = '0';
        }, 100);
    }
}

// Complete navigation sequence
function completeNavigation() {
    // Reset button
    goNowBtn.disabled = false;
    goNowBtn.textContent = 'Go Now';
    
    // Show success message
    showNavigationSuccess();
    
    // Keep target slot highlighted
    targetSlot.classList.add('target-slot', 'active');
}

// Show target slot information
function showTargetSlotInfo() {
    const tooltip = document.createElement('div');
    tooltip.className = 'slot-info-tooltip';
    tooltip.innerHTML = `
        <div class="info-content">
            <strong>${memorialData.name}</strong><br>
            <span>${memorialData.plot}</span>
        </div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        text-align: center;
        z-index: 50;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 200px;
    `;
    
    targetSlot.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Show navigation success message
function showNavigationSuccess() {
    const successMsg = document.createElement('div');
    successMsg.textContent = `You have reached ${memorialData.name}'s memorial location!`;
    
    successMsg.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2000;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        max-width: 400px;
        text-align: center;
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => {
            successMsg.remove();
        }, 300);
    }, 4000);
}

// Handle cancel button click
function handleCancelClick(event) {
    event.stopPropagation();
    
    // Hide memorial details panel
    hideMemorialDetails();
    
    // Reset state
    currentState = 'main';
}

// Hide memorial details panel
function hideMemorialDetails() {
    memorialDetailsPanel.classList.remove('active');
    memorialDetailsPanel.classList.remove('slide-in-left');
    
    // Unhighlight target slot
    targetSlot.classList.remove('target-slot', 'active');
}

// Handle overlay click to close memorial card
function handleOverlayClick(event) {
    if (event.target === memorialCardOverlay) {
        hideMemorialCard();
        currentState = 'main';
    }
}

// Handle navigation arrow clicks
function handleNavArrowClick(event) {
    const isNext = event.target.closest('.next-arrow');
    
    if (isNext) {
        showToast('Loading next memorial...');
    } else {
        showToast('Loading previous memorial...');
    }
}

// Setup other slot interactions
function setupSlotInteractions() {
    const allSlots = document.querySelectorAll('.slot');
    
    allSlots.forEach(slot => {
        slot.addEventListener('mouseenter', function(e) {
            if (e.target !== targetSlot) {
                e.target.style.transform = 'scale(1.2)';
                e.target.style.opacity = '0.8';
            }
        });
        
        slot.addEventListener('mouseleave', function(e) {
            if (e.target !== targetSlot) {
                e.target.style.transform = 'scale(1)';
                e.target.style.opacity = '1';
            }
        });
        
        slot.addEventListener('click', function(e) {
            if (e.target !== targetSlot) {
                exploreSlot(e.target);
            }
        });
    });
}

// Explore individual slot
function exploreSlot(slot) {
    const section = slot.closest('.map-section');
    const sectionId = section.dataset.section;
    const slotIndex = Array.from(slot.parentElement.children).indexOf(slot);
    
    showSlotInfoModal(sectionId, slotIndex + 1);
}

// Show slot information modal
function showSlotInfoModal(sectionId, slotNumber) {
    const modal = document.createElement('div');
    modal.className = 'slot-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Slot ${slotNumber} Details</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Section:</strong> ${sectionId}</p>
                <p><strong>Slot:</strong> ${slotNumber}</p>
                <p><strong>Available:</strong> ${Math.random() > 0.5 ? 'Yes' : 'No'}</p>
                <p><strong>Price:</strong> $${(Math.random() * 3000 + 2000).toFixed(0)}</p>
                <div class="features">
                    <strong>Features:</strong>
                    <ul>
                        <li>Garden view</li>
                        <li>Memorial bench</li>
                        <li>Seasonal flowers</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn modal-btn-secondary close-modal">Close</button>
                <button class="btn modal-btn-primary">Reserve</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // Close modal events
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }); 
}

// Highlight Section A initially
function highlightSectionA() {
    sectionA.style.transition = 'all 0.5s ease';
    sectionA.style.transform = 'perspective(1000px) rotateX(5deg) scale(1.02)';
    sectionA.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
    
    setTimeout(() => {
        sectionA.style.transform = 'perspective(1000px) rotateX(5deg) scale(1)';
        sectionA.style.boxShadow = 'none';
    }, 1500);
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 3000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add CSS for modal styling
const modalCSS = `
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 400px;
    width: 90%;
    position: relative;
    z-index: 1;
    color: #333;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.modal.show .modal-content {
    transform: scale(1);
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: #1f2937;
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #9ca3af;
    transition: color 0.3s ease;
}

.close-modal:hover {
    color: #6b7280;
}

.modal-body {
    padding: 20px;
}

.modal-body p {
    margin-bottom: 8px;
}

.modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.modal-btn-primary {
    background: #3b82f6;
    color: white;
}

.modal-btn-primary:hover {
    background: #2563eb;
}

.modal-btn-secondary {
    background: #6b7280;
    color: white;
}

.modal-btn-secondary:hover {
    background: #4b5563;
}

.features ul {
    list-style: none;
    padding: 0;
    margin-top: 8px;
}

.features li {
    padding: 4px 0;
    position: relative;
    padding-left: 20px;
}

.features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
}
`;

// Inject modal CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = modalCSS;
document.head.appendChild(styleSheet);

// Export functions for global access
window.navigateToTargetSlot = handleGoNowClick;
window.showMemorialCard = showMemorialCard;
window.showMemorialDetails = showMemorialDetails;