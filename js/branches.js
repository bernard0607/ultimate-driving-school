document.addEventListener('DOMContentLoaded', function() {
    updateBranchStatus();
    // Update status every minute
    setInterval(updateBranchStatus, 60000);
});

function updateBranchStatus() {
    const cards = document.querySelectorAll('.branch-card');
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Convert current time to minutes since midnight for easier comparison
    const currentTimeInMinutes = (currentHour * 60) + currentMinute;
    
    // Opening hours: 8:00 AM (480 minutes) to 6:00 PM (1080 minutes)
    const openTime = 8 * 60;   // 8:00 AM in minutes
    const closeTime = 18 * 60; // 6:00 PM in minutes
    
    // Days of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    cards.forEach(card => {
        const statusBadge = card.querySelector('.branch-status');
        const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
        
        if (isOpen) {
            // Calculate time until close
            const minutesUntilClose = closeTime - currentTimeInMinutes;
            const hoursUntilClose = Math.floor(minutesUntilClose / 60);
            const minsRemaining = minutesUntilClose % 60;
            
            // Update status badge
            statusBadge.innerHTML = `
                <i class="fas fa-circle"></i>
                <span class="status-text">Open Now</span>
                <span class="status-details">• Closes in ${hoursUntilClose > 0 ? hoursUntilClose + 'h ' : ''}${minsRemaining}m</span>
            `;
            statusBadge.classList.remove('closed');
            
            // Update tooltip
            card.title = `Open until 6:00 PM`;
        } else {
            let nextOpenDay = currentDay;
            let daysUntilNextOpen = 0;
            
            // If it's after hours today, show next opening time (tomorrow 8 AM)
            if (currentTimeInMinutes >= closeTime) {
                daysUntilNextOpen = 1;
                nextOpenDay = (currentDay + 1) % 7;
            }
            
            const nextDayName = days[nextOpenDay];
            
            // Update status badge
            statusBadge.innerHTML = `
                <i class="fas fa-circle"></i>
                <span class="status-text">Closed Now</span>
                <span class="status-details">• Opens ${nextDayName} at 8:00 AM</span>
            `;
            statusBadge.classList.add('closed');
            
            // Update tooltip
            card.title = `Opens ${nextDayName} at 8:00 AM`;
        }
    });
}
