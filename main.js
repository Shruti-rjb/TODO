const userList = document.querySelector("#lecture-list ul");

const formControl1 = document.getElementById("form-control1");

const formControl2 = document.getElementById("form-control2");

const formControl3 = document.querySelector(".form-group textarea");

const formElement = document.getElementById("lecture-add");

function showList(item) {
  const h6 = document.createElement("h6");
  h6.classList.add("title");
  h6.innerText = item.name;
  const span = document.createElement("span");
  span.className = "ml-2 badge badge-info";
  span.innerText = item.priority;
  h6.appendChild(span);

  const p = document.createElement("p");
  p.classList.add("description");
  p.innerText = item.description;

  const div = document.createElement("div");
  const li = document.createElement("li");
  li.id = item._id;

  div.appendChild(h6);
  div.appendChild(p);

  const divContent = document.createElement("div");

  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  const button3 = document.createElement("button");

  divContent.append(button1, button2, button3);

  button1.className = "btn btn-success";
  button2.className = "btn btn-warning";
  button3.className = "btn btn-danger";

  const icon1 = document.createElement("i");
  const icon2 = document.createElement("i");
  const icon3 = document.createElement("i");

  icon1.className = "fas fa-check";
  icon2.className = "fas fa-pencil";
  icon3.className = "far fa-trash-alt";

 
  button1.appendChild(icon1);

  button2.appendChild(icon2);

  button3.appendChild(icon3);

  li.append(div, divContent);
 

  userList.appendChild(li);
}

//Get Request

axios({
  method: "get",
  url: "https://infodev-server.herokuapp.com/api/todos",
})
  .then((response) => {
    response.data.forEach((item) => {
      showList(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });



//Post request


// const userList = document.querySelector("#lecture-list ul");

// const formControl1 = document.getElementById("form-control1");

// const formControl2 = document.getElementById("form-control2");

// const formControl3 = document.querySelector(".form-group textarea");

// const formElement = document.getElementById("lecture-add");

function postData(event) {
  event.preventDefault();

  const requestData = {
    completed: false,
    name: formControl1.value,
    priority: formControl2.value,
    description: formControl3.value,
  };

  axios({
    method: "post",
    url: "https://infodev-server.herokuapp.com/api/todos",
    data: requestData,
  })
    .then((response) => {
      showList(response.data);
    })
    .catch((err) => {
      console.log("Error");
    });
}

formElement.addEventListener("submit", postData);




//Delete Request

function deleteData(id) {
  axios({
    method: "delete",
    url: `https://infodev-server.herokuapp.com/api/todos/${id}`,
  })
    .then((res) => {
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log("Error");
    });
}

userList.addEventListener("click", removeData);

function removeData(e) {
  
  if (e.target.className === "btn btn-danger") {
    var deleteList = e.target.parentElement.parentElement;
  } else if (e.target.className === "far fa-trash-alt") {
    var deleteList = e.target.parentElement.parentElement.parentElement;
  }

  deleteData(deleteList.id);
  userList.removeChild(deleteList);
}

//Update Request
function updateTodo() {
  axios
    .patch(`https://infodev-server.herokuapp.com/api/todos/${id}`, {
      completed: false,
      name: formControl1.value,
      priority: formControl2.value,
      description: formControl3.value,
    })
    .then((res) => showList(res))
    .catch((err) => console.error(err));
}
