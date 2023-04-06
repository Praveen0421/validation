// creating table
// table heading
let tableHeader = [
  { firstname: "FirstName" },
  { lastname: "LastName" },
  { email: "Email" },
  { phone: "Phone Number" },
  { password: "Password" },
  { action: "Action" },
];
// selecting table element
const table = document.querySelector("table");

// creating thead in table
const tHead = table.createTHead();

// creating row in thead
const headerRow = tHead.insertRow();

// for in loop
// to create table cell use table heading key
tableHeader.forEach((element) => {
  let key = Object.keys(element)[0];
  const thCell = headerRow.insertCell();
  thCell.appendChild(document.createTextNode(element[key]));
});
// creating tbody
const tBody = table.createTBody();

// function for fetching data from api or local server
// this function also take value from server and put it into table cell
async function getResponse() {
  let fetchValue;
  try {
    fetchValue = await fetch("http://localhost:3000/user");
    const response = await fetchValue.json();
    createTableBody(response);
  } catch (error) {
    console.error(error);
  }
}

// function for adding data to the server

function addResponse() {
  const userFirstName = document.getElementById("firstname").value;
  const userLastName = document.querySelector("#lastname").value;
  const userEmail = document.querySelector("#email").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const accountPassword = document.querySelector("#password").value;
  fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
      phone: phoneNumber,
      password: accountPassword,
    }),
  });
}

// function for editing
async function editData(id) {

    try {
    fetchValue = await fetch(`http://localhost:3000/user/${id}`);
    const response = await fetchValue.json();
    document.querySelector("#firstname").value = response.firstname;
    document.querySelector("#lastname").value = response.lastname;
    document.querySelector("#email").value = response.email;
    document.querySelector("#phoneNumber").value = response.phone;
    document.querySelector("#password").value = response.password;
  } catch (error) {
    console.error(error);
  }
  console.log(id);
  const updateBtn = document.querySelector(".update-btn");

  updateBtn.addEventListener("click", ()=>{
    const userFirstName = document.getElementById("firstname").value;
    const userLastName = document.querySelector("#lastname").value;
    const userEmail = document.querySelector("#email").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    const accountPassword = document.querySelector("#password").value;
    console.log(userFirstName );
    fetch(`http://localhost:3000/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: userFirstName,
        lastname: userLastName,
        email: userEmail,
        phone: phoneNumber,
        password: accountPassword,
      }),
    });

})
}
// update 
// function for deleting data
function deleteData(id) {
  fetch(`http://localhost:3000/user/${id}`, {
    method: 'DELETE'
  })
}
// table body
function createTableBody(responses) {
  responses.forEach((value) => {
    let id = value.id;
    const tbRow = tBody.insertRow();
    tableHeader.forEach((element) => {
      const tbData = tbRow.insertCell();

      if (element.action !== "Action") {
        const key = Object.keys(element)[0];
        tbData.appendChild(document.createTextNode(value[key]));
      }
      else {
        let editBtn = document.createElement("button")
        editBtn.innerHTML = "Edit";
        tbData.appendChild(editBtn);
        editBtn.setAttribute("class", "editBtn");
        editBtn.addEventListener("click", () => editData(id))

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete";
        tbData.appendChild(deleteBtn);
        deleteBtn.setAttribute("class", "deleteBtn");
        deleteBtn.addEventListener("click", () => deleteData(id))
      }

    });
  });
}
// form validation
const input = document.querySelectorAll("input");
input.forEach((element) => {
  element.addEventListener("input", () => {
    let id = element.getAttribute("id");
    console.log(id);
    const firstNameInput = document.getElementById("firstname");
    const lastNameInput = document.getElementById("lastname");
    const emailInput = document.getElementById("email");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const passwordInput = document.getElementById("password");
    const firstNameRegex = /^[A-Za-z]+$/;
    const lastNameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@1rivet\.com$/;
    const phoneNumberRegex = /^[6 7 8 9]{1}[0-9]{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (id === "firstname") {
      let message = document.querySelector("#firstnameError");
      if (!firstNameRegex.test(firstNameInput.value)) {
        message.innerHTML = "Please enter a valid first name.";
        // firstNameInput.value=null
        firstNameInput.style.outlineColor = "red";
        message.style.display = "flex";
        return false;
      } else {
        firstNameInput.style.outlineColor = "green";
        message.style.display = "none";
      }
    }

    // lastname 

    if (id === "lastname") {
      let message = document.querySelector("#lastnameError");
      if (!lastNameRegex.test(lastNameInput.value)) {
        message.innerHTML = "Please enter a valid last name.";
        // firstNameInput.value=null
        lastNameInput.style.outlineColor = "red";
        message.style.display = "flex";
        return false;
      }
      else {
        lastNameInput.style.outlineColor = "green";
        message.style.display = "none";
      }
    }
    // email 

    if (id === "email") {
      let message = document.querySelector("#emailError");
      if (!emailRegex.test(emailInput.value)) {
        message.innerHTML = "Please enter a valid email address for 1rivet.com domain.";
        // firstNameInput.value=null
        emailInput.style.outlineColor = "red";
        message.style.display = "flex";
        return false;
      }
      else {
        emailInput.style.outlineColor = "green";
        message.style.display = "none";
      }
    }
    // phone number

    if (id === "phoneNumber") {
      let message = document.querySelector("#phonenumberError");
      if (!phoneNumberRegex.test(phoneNumberInput.value)) {
        message.innerHTML = "Please enter a valid phone number.";
        // firstNameInput.value=null
        phoneNumberInput.style.outlineColor = "red";
        message.style.display = "flex";
        return false;
      }
      else {
        phoneNumberInput.style.outlineColor = "green";
        message.style.display = "none";
      }
    }

    //  password
    if (id === "password") {
      let message = document.querySelector("#passwordError");
      if (!passwordRegex.test(passwordInput.value)) {
        message.innerHTML = "Please enter a valid password (password should contain one uppercase letter, at least one special character, lowercase and number, and its length should be between 8 and 16).";
        // firstNameInput.value=null
        passwordInput.style.outlineColor = "red";
        message.style.display = "flex";
        return false;
      } else {
        passwordInput.style.outlineColor = "green";
        message.style.display = "none";
      }
    }

    return true;
  });
});

Window.onload(getResponse())