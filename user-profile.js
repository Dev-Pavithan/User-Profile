document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.getElementById('profiles');
    const table = document.querySelector('#profiles-details tbody');
    const moreUsersButton = document.getElementById('more-users');

    const moreUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5');
            if (!response.ok) {
                throw new Error('Network Error');
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
            profiles.innerHTML = `<p>Error more user data: ${error.message}</p>`;
        }
    };

    moreUsersButton.addEventListener('click', moreUsers);

    moreUsers();
});
// Dark mode
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