bindUserData();
function addUserDataToLocalStorage(userObj) {

    //already has data in localstorage then update it other create new one
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.push(userObj);
       
        localStorage.setItem('userData', JSON.stringify(users));
    }
    else {
        var userData = new Array();
        userData.push(userObj);
        localStorage.setItem('userData', JSON.stringify(userData));

    }
}

function updateDataToLocalStorage(userObj) {

    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        var user = users.filter((x) => x.id == userObj.id).pop();
        if (user != null) {
            user.name = userObj.name;
            user.email = userObj.email;
            user.membershipType = userObj.membershipType;
        }
        localStorage.setItem('userData', JSON.stringify(users));
    }
}

function deletedataFromLocalStorage(UserId) {

    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('userData', JSON.stringify(users));
    }
}


function bindUserData() {
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        document.getElementById('tblbody').innerHTML = "";
        users.forEach(function (item, index) {
  
            var btnEditId = "btnedit" + item.id;
            var btnDeleteId = "btndelete" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   data-CustomerID='" + item.id + "'   data-name='" + item.name + "' data-email='" + item.email + "' data-membershipType='" + item.membershipType + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.name + "</td>"
                + "<td class='td-data'>" + item.email + "</td>"
                + "<td class='td-data'>" + item.membershipType + "</td>"
                
                + "<td class='td-data'>" +
                "<button id='" + btnEditId + "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" + item.id + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody').innerHTML += tableRow;
        })
    }
    var AddRow = "<tr>"
    + "<td class='td-data'></td>"
    + "<td class='td-data'><input type='text' id='txtname' placeholder='name..'></td>"
    + "<td class='td-data'><input type='email' id='txtemail' placeholder='email..'></td>"
    + "<td class='td-data'><select id='ddlmembershipType'>"
    + "<option value='Basic'>Basic</option>"
    + "<option value='Intermediate'>Intermediate</option>"
    + "<option value='Advanced'>Advanced</option>"
    + "<option value='Elite'>Elite</option>"
    + "<option value='Private Martial Art Tuition'>Private Martial Art Tuition</option>"
    + "<option value='Junior MemberShip'>Junior MemberShip</option>"
    + "</select></td>"
    + "<td class='td-data'>" + "<button id='btnaddCustomer' onclick='addUser()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
    + "</tr>";
document.getElementById('tblbody').innerHTML += AddRow;
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUser() {
    var userId = GetUserID();
    var txtname = document.getElementById("txtname").value;
    if (!txtname) {
        alert('Please enter name!')
        return false;
    }
    var email = document.getElementById("txtemail").value;
    if (!email) {
        alert('Please enter email!')
        return false;
    }
    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    var membershipType = document.getElementById("ddlmembershipType").value;
    var userObj = {
        "id": userId,
        "name": txtname,
        "email": email,
        "membershipType": membershipType
        
    };
    addUserDataToLocalStorage(userObj);
    document.getElementById('txtname').value = "";
    document.getElementById('txtemail').value = "";
    bindUserData();
};
function showEditRow(UserID) {
  var userRow = document.getElementById(UserID);
  var trdata = userRow.querySelectorAll(".td-data");

  var userID = trdata[0].innerHTML;
  var userName = trdata[1].innerHTML;
  var useremail = trdata[2].innerHTML;
  var usermembershipType = trdata[3].innerHTML;

  var txtUserID = createInputElement(userID, "txtuserid", true);
  var txtName = createInputElement(userName, "txtname", false);
  var txtEmail = createInputElement(useremail, "txtemail", false);
  var ddlMembershipType = createSelectElement(usermembershipType, "ddlmembershipType");

  trdata[0].innerHTML = '';
  trdata[1].innerHTML = '';
  trdata[2].innerHTML = '';
  trdata[3].innerHTML = '';

  trdata[0].appendChild(txtUserID);
  trdata[1].appendChild(txtName);
  trdata[2].appendChild(txtEmail);
  trdata[3].appendChild(ddlMembershipType);

  var btnUpdate = createButtonElement("Update", "btn-primary", "updateUser(" + UserID + ")");
  var btnCancel = createButtonElement("Cancel", "btn-warning", "cancelEdit(" + UserID + ")");
  var btnDelete = createButtonElement("Delete", "btn-danger", "deleteUser(" + UserID + ")");

  trdata[4].innerHTML = '';
  trdata[4].appendChild(btnUpdate);
  trdata[4].appendChild(btnCancel);
  trdata[4].appendChild(btnDelete);
}

function createInputElement(value, id, disabled) {
  var input = document.createElement("input");
  input.name = id;
  input.id = id;
  input.value = value;
  input.disabled = disabled;
  return input;
}

function createSelectElement(selectedValue, id) {
  var select = document.createElement("select");
  select.id = id;

  var membershipTypes = ["Basic", "Intermediate", "Advanced", "Elite", "Private martial art tuition", "Junior"];
  membershipTypes.forEach(function (type) {
      var option = document.createElement("option");
      option.value = type;
      option.text = type;
      if (type === selectedValue) {
          option.selected = true;
      }
      select.appendChild(option);
  });

  return select;
}

function createButtonElement(text, className, onclickFunction) {
  var button = document.createElement("button");
  button.classList.add("btn", "btn-xs", className);
  button.textContent = text;
  button.setAttribute("onclick", onclickFunction);
  return button;
}

function cancelEdit(UserID) {
  var userRow = document.getElementById(UserID);
  var trdata = userRow.querySelectorAll(".td-data");
  var userID = trdata[0].querySelector("#txtuserid").value;
  var userName = trdata[1].querySelector("#txtname").value;
  var userEmail = trdata[2].querySelector("#txtemail").value;
  var membershipType = trdata[3].querySelector("#ddlmembershipType").value;

  trdata[0].innerHTML = userID;
  trdata[1].innerHTML = userName;
  trdata[2].innerHTML = userEmail;
  trdata[3].innerHTML = membershipType;

  var btnEditId = "btnedit" + UserID;
  var btnDeleteId = "btndelete" + UserID;
  trdata[4].innerHTML =
      "<button id='" + btnEditId + "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" + UserID + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
      "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" + UserID + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>";
}
function updateUser(UserID) {
    var userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    var data = userRow.querySelectorAll(".td-data");
    var name = data[1].querySelector("#txtname").value;
    var email = data[2].querySelector("#txtemail").value;
    var membershipType = data[3].querySelector("#ddlmembershipType").value;
 
    var userObj = {
        "id": UserID,
        "name": name,
        "email": email,
        "membershipType": membershipType
     
    };
    updateDataToLocalStorage(userObj);
    bindUserData();
}
function deleteRow(UserID) {
    deletedataFromLocalStorage(UserID);
    bindUserData();
}