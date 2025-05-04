function addSubject() {
    if(localStorage.getItem('subjects')) {
        let subjects = JSON.parse(localStorage.getItem('subjects'));
        const newSubject = document.getElementById('subject-name').value;

        if (newSubject) {
            subjects.push(newSubject);
            localStorage.setItem('subjects', JSON.stringify(subjects));
            window.cachedSubjects = subjects; // Update the cache
            alert('Subject added successfully!');
        } else {
            alert('Please enter a subject name.');
        }
    } else {
        const newSubject = document.getElementById('subject-name').value;
        if (newSubject) {
            let subjects = [newSubject];
            localStorage.setItem('subjects', JSON.stringify(subjects));
            alert('Subject added successfully!');
        }
    }
}

function loadSubjects() {
    if (!window.cachedSubjects) {
        window.cachedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    }
    const subjects = window.cachedSubjects;
    const subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = ''; // Clear existing list

    subjects.forEach(subject => {
        const li = document.createElement('div');
        const subjectName = document.createElement('div');
        subjectName.textContent = subject;
        subjectName.className = 'subject-name'; // Add class for styling

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            const index = subjects.indexOf(subject);
            if (index > -1) {
                subjects.splice(index, 1);
                localStorage.setItem('subjects', JSON.stringify(subjects));
                window.cachedSubjects = subjects; // Update the cache
                loadSubjects(); // Reload the list
            }
        };
        deleteButton.className = 'delete-button'; // Add class for styling
        li.appendChild(subjectName);
        li.appendChild(deleteButton);
        subjectList.appendChild(li);
    });
}


window.addEventListener('DOMContentLoaded', loadSubjects);