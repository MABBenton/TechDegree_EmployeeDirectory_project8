//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

//fetch data from API
fetch(urlAPI)
  .then(response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(err => err.console.log(err))

// displayEmployees function
function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index=${index}>
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `
  });

  gridContainer.innerHTML = employeeHTML;
}

//display modal function
function displayModal(index) {
  let { name, dob, phone, email, location: { street, city, state, postcode }, picture } = employees[index];

  let date = new Date(dob.date);

  let modalHTML = `
    <img class="modal-avatar" src="${picture.large}"/>
    <div class="modal-text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p class="phone">${phone}</p>
        <p class="full-address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p> 
        <p class="dob">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}

//Event Listeners

  //grid container event listener
gridContainer.addEventListener('click', e => {
  if ( e.target !== gridContainer ) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
  
    displayModal(index);
  }
});

  //modal close event listener
modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});