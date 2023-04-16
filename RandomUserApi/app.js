
const apiUrl = 'https://randomuser.me/api/';
let page = 1;
let resultsPerPage = 20;


let users = [];


const getUsers = async () => {
  const response = await fetch(`${apiUrl}?results=${resultsPerPage}&page=${page}`);
  const data = await response.json();
  users = [...users, ...data.results];
  renderUsers(users);
  page++;
};


const renderUsers = (users) => {
  const container = document.getElementById('users-container');
  container.innerHTML = '';
  users.forEach(user => {
    const userCard = `
      <div class="user-card">
        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>${user.email}</p>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', userCard);
  });
};


document.getElementById('load-more').addEventListener('click', getUsers);


document.getElementById('search').addEventListener('keyup', (event) => {
  const searchValue = event.target.value.toLowerCase();
  const filteredUsers = users.filter(user => {
    return (
      user.name.first.toLowerCase().includes(searchValue) ||
      user.name.last.toLowerCase().includes(searchValue)
    );
  });
  renderUsers(filteredUsers);
});


getUsers();


