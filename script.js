function select_loader() {
    const selectdata = document.getElementById("subject-list-select");
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    selectdata.innerHTML = ''; // Clear existing options
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        selectdata.appendChild(option);
    });
}

window.addEventListener('DOMContentLoaded', select_loader);

function addnote() {
    const option = document.getElementById("setting_box");
    option.classList.toggle("hidden");
}

const close_button = document.getElementById("close-setting");
close_button.addEventListener("click", function() {
    const option = document.getElementById("setting_box");
    option.className = "hidden";
});

const save_button = document.getElementById("save-note");
save_button.addEventListener("click", function() {
    const subject = document.getElementById("subject-list-select").value;
    const dateline = document.getElementById("line-date").value;
    if (!subject || !dateline) {
        alert("Please fill in all fields.");
        return;
    }
    const note = document.getElementById("note-text").value;

    const noteData = {
        subject: subject,
        dateline: dateline,
        note: note
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteData);
    localStorage.setItem('notes', JSON.stringify(notes));
    const option = document.getElementById("setting_box");
    option.className = "hidden"; // Hide the settings box after saving
    loadnotes(); // Reload notes to display the new one
});

function loadnotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ''; // Clear existing notes

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        const SubjectName = document.createElement('h3');
        SubjectName.textContent = note.subject;
        SubjectName.className = 'subject-name';
        noteElement.appendChild(SubjectName);
        const dateline = document.createElement('span');
        dateline.textContent = "OutDate : " + note.dateline;
        dateline.className = 'dateline';
        noteElement.appendChild(dateline);
        const noteText = document.createElement('pre');
        noteText.textContent = note.note;
        noteText.className = 'note-text';
        noteElement.appendChild(noteText);

        const finishButton = document.createElement('button');
        finishButton.textContent = 'Finish';
        finishButton.className = 'finish-button';
        finishButton.addEventListener('click', () => {
            // Remove the note from local storage
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const updatedNotes = notes.filter(n =>
                n.subject !== note.subject ||
                n.dateline !== note.dateline ||
                n.note !== note.note
            );
            
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            loadnotes(); // Reload notes to reflect the changes
        });

        const btnbox = document.createElement('div');
        btnbox.className = 'btn-box';
        btnbox.appendChild(finishButton);
        noteElement.appendChild(btnbox);
        notesContainer.appendChild(noteElement);

    });
}

window.addEventListener('DOMContentLoaded', loadnotes());