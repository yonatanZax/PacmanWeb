class User {
    userName;
    password;
    fName;
    lName;
    email;
    birthday;

    constructor(values = {}) {
        this.userName = values.userName;
        this.password = values.password;
        this.fName = values.fName || "Mark";
        this.lName = values.lName || "Last";
        this.email = values.email || "default@gmail.com";
        this.birthday = values.birthday || 19920101;
    }

    getName() {
        return userName;
    }

}


function manageLogin() {

    var footer = document.getElementById("footer");
    var user_display = document.getElementById("userName_display");


    var uName = $('#userName_login').val();

    var pass = $('#password_login').val();

    var checkUserFromForm = new User({userName: uName, password: pass});

    var check = checkUser(checkUserFromForm);
    if (check) {
        session = checkUserFromForm;
        user_display.innerHTML = session.fName + " " + session.lName + " is logged";
        footer.innerHTML = "User logged in successfully";
        document.getElementById('loginDiv').style.display = 'none';

    } else {
        alert("Incorrect values");
    }

}

function manageRegister() {

    var uName = $('#userName_register').val();
    var pass = $('#password_register').val();
    var fName = $('#fName_register').val();
    var lName = $('#lName_register').val();
    var email = $('#email_register').val();


    var birthbay = $('#birthday_register').val();

    var newUserRegistration = new User({
        userName: uName, password: pass,
        fName: fName, lName: lName,
        email: email, birthday: birthbay
    });
    if (addUserToList(newUserRegistration)) {
        footer.innerHTML = "New user was created successfully";
        document.getElementById('registerDiv').style.display = 'none'
    } else {
        alert("Incorrect values - registration");
    }


}

function checkUser(userTocheck) {

    var userFromDB = user_db[userTocheck.userName];
    if (userFromDB != null && userFromDB.password == userTocheck.password)
        return true;

    return false;
}

function addUserToList(newUser) {
    var userFromDB = user_db[newUser.userName];
    if (userFromDB == undefined) {
        user_db[newUser.userName] = newUser;
        return true;
    }

    return false;
}


// $("#registerBtn").click(
//     function (event) {
//         var userNameValidation = $("#userName_register")[0].checkValidity();
//         var passwordValidation = $("#password_register")[0].checkValidity();
//         var emailValidation = $("#email_register")[0].checkValidity();
//
//         //validate if the pattern match
//         if (userNameValidation && passwordValidation && emailValidation) {
//
//             var uName = $('#userName_register').val();
//             var pass = $('#password_register').val();
//             var fName = $('#fName_register').val();
//             var lName = $('#lName_register').val();
//             var email = $('#email_register').val();
//
//
//             var birthbay = $('#birthday_register').val();
//
//             var newUserRegistration = new User({userName:uName,password:pass,
//                 fName:fName, lName:lName,
//                 email:email, birthday:birthbay
//             });
//             if(addUserToList(newUserRegistration)){
//                 footer.innerHTML = "New user was created successfully";
//                 document.getElementById('registerDiv').style.display='none'
//             }else{
//                 alert("Incorrect values - registration");
//             }
//
//
//         }else {
//             $("#userName_register")[0].setCustomValidity("Please enter at least 8 characters.");
//             var isValid = $('#userName_register')[0].reportValidity();
//             event.preventDefault();
//         }
//
//     });










