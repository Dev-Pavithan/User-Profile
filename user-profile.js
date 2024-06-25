document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.getElementById('profiles');
    const table = document.querySelector('#profiles-details tbody');
    const fetchUsersButton = document.getElementById('fetch-users');

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const users = data.results;

            profiles.innerHTML = '';
            table.innerHTML = '';

            users.forEach(user => {
                const profileElement = document.createElement('div');
                profileElement.classList.add('user-profile');
                profileElement.innerHTML = `
                    <img src="${user.picture.large}" alt="User Picture">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <p>${user.email}</p>
                `;
                profiles.appendChild(profileElement);

                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                    <td>${user.name.first} ${user.name.last}</td>
                    <td>${user.email}</td>
                `;
                table.appendChild(tableRow);
            });
        } catch (error) {
            profiles.innerHTML = `<p>Error fetching user data: ${error.message}</p>`;
        }
    };

    fetchUsersButton.addEventListener('click', fetchUsers);

    fetchUsers();
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.getElementById('mode-toggle');
    const currentMode = localStorage.getItem('theme') || 'light';

    if (currentMode === 'dark') {
        document.body.classList.add('dark-mode');
        toggleCheckbox.checked = true;
    }
    
    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});
