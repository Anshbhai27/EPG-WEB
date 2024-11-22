// Format date to DD-MM-YYYY
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

// Format time from "HH:mm" to "HH:mm AM/PM"
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
}

// Show loading spinner
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('scheduleContainer').innerHTML = '';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Create show card HTML
function createShowCard(show) {
    return `
        <div class="show-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3">
                    <div class="poster-container">
                        <img src="${show.poster || 'https://via.placeholder.com/300x200'}" 
                             alt="${show.title}"
                             class="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                             onerror="this.src='https://via.placeholder.com/300x200'">
                    </div>
                </div>
                <div class="p-4 md:w-2/3">
                    <div class="flex justify-between items-start">
                        <h3 class="text-xl font-bold">${show.title}</h3>
                        <div class="text-gray-400 text-sm">
                            ${formatTime(show.startTime)} - ${formatTime(show.endTime)}
                        </div>
                    </div>
                    <p class="text-gray-400 mt-2 text-sm">${show.description || 'No description available'}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${show.genre ? `<span class="px-2 py-1 bg-gray-700 rounded text-xs">${show.genre}</span>` : ''}
                        ${show.languages ? `<span class="px-2 py-1 bg-gray-700 rounded text-xs">${show.languages}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fetch and display schedule
async function fetchSchedule() {
    showLoading();
    
    const dateInput = document.getElementById('dateSelector');
    const selectedDate = formatDate(dateInput.value || new Date());
    
    try {
        const response = await fetch(`https://tata-ka-epg.vercel.app/api/epg?date=${selectedDate}&channel=114`);
        if (!response.ok) throw new Error('Failed to fetch schedule');
        
        const data = await response.json();
        const scheduleContainer = document.getElementById('scheduleContainer');
        
        if (data.data && data.data.length > 0) {
            scheduleContainer.innerHTML = data.data
                .map(show => createShowCard(show))
                .join('');
        } else {
            scheduleContainer.innerHTML = `
                <div class="text-center py-8">
                    <p>No shows scheduled for this date.</p>
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('scheduleContainer').innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-500">Error loading schedule. Please try again later.</p>
            </div>
        `;
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Set default date to today
window.onload = function() {
    const dateSelector = document.getElementById('dateSelector');
    dateSelector.valueAsDate = new Date();
    fetchSchedule();
};
