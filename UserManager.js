



function manageLogin() {
    console.log("ManageLogin");

    var footer = document.getElementById("footer");
    footer.innerHTML = "Manage_login";

    var uName = $('#userName_login').val();
    var pass = $('#password_login').val();

    var checkUserFromForm = new User({userName:uName,password:pass});

    var check = checkUser(checkUserFromForm);

    if(check){
        session = checkUserFromForm;
        footer.innerHTML = "ManageLogin - valid user";
    }else{
        footer.innerHTML = "Incorrect values";

    }

}

function manageRegister(myForm) {

    console.log("manageRegister");
    var myForm = document.getElementById("registerForm");


    var newUserRegistration = new User({userName:myForm.userName,password:myForm.password,
                                            fName:myForm.fname, lName:myForm.lName,
                                            email:myForm.email, birthday:myForm.birthday
    });

    addUserToList(newUserRegistration);

}

function checkUser(userTocheck) {

    var userFromDB = single.user_db[userTocheck.userName];
    if (userFromDB != null && userFromDB.password == userTocheck.password)
        return true;

    return false;
}

function addUserToList(newUser) {
    var userFromDB = user_db[userTocheck.userName];
    if (userFromDB == null){
        user_db[newUser.userName] = newUser;
        return true;
    }

    return false;
}










