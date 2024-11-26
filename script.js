// Helper functions
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}

function getDaysInMonth(month, year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth[month];
}

// UI Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
}

function findDay() {
    const dateInput = document.getElementById('dateInput').value;
    const date = new Date(dateInput);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('dayResult').textContent = `Day: ${days[date.getDay()]}`;
}

function showMonthDays() {
    const monthInput = document.getElementById('monthInput').value;
    const [year, month] = monthInput.split('-').map(Number);
    const date = new Date(year, month - 1);
    
    let html = '<table><tr><th>Date</th><th>Day</th></tr>';
    const daysInMonth = getDaysInMonth(month - 1, year);
    
    for (let i = 1; i <= daysInMonth; i++) {
        date.setDate(i);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        html += `<tr><td>${i}/${month}/${year}</td><td>${day}</td></tr>`;
    }
    
    html += '</table>';
    document.getElementById('monthDays').innerHTML = html;
}

function saveNote() {
    const date = document.getElementById('noteDate').value;
    const note = document.getElementById('noteText').value;
    
    if (!date || !note) {
        alert('Please fill in both date and note');
        return;
    }
    
    // Store notes in localStorage
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '[]');
    notes.push({ date, note });
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
    
    alert('Note saved successfully!');
    document.getElementById('noteText').value = '';
}

function showNotes() {
    const monthInput = document.getElementById('viewMonth').value;
    const [year, month] = monthInput.split('-').map(Number);
    
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '[]');
    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.date);
        return noteDate.getMonth() === month - 1 && noteDate.getFullYear() === year;
    });
    
    const notesList = document.getElementById('notesList');
    if (filteredNotes.length === 0) {
        notesList.innerHTML = '<p>No notes found for this month</p>';
        return;
    }
    
    let html = '<ul>';
    filteredNotes.forEach((note, index) => {
        const date = new Date(note.date).toLocaleDateString();
        html += `<li><strong>${date}:</strong> ${note.note}</li>`;
    });
    html += '</ul>';
    notesList.innerHTML = html;
}

// Show the day finder section by default
showSection('dayFinder');