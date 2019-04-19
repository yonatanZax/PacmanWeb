



function manageLogin(myForm) {
    console.log("ManageLogin");
    var uName = myForm.userName;
    var pass = myForm.password;

    var checkUserFromForm = new User({userName:uName,password:pass});

    var check = checkUser(checkUserFromForm);

    if(check){
        session = checkUserFromForm;
        console.log("ManageLogin - valid user");
    }else{
        console.log("Incorrect values");

    }

}

function manageRegister(myForm) {

    console.log("manageRegister");

    var newUserRegistration = new User({userName:myForm.userName, password:myForm.password,
                                            fName:myForm.fname, lName:myForm.lName,
                                            email:myForm.email, birthday:myForm.birthday
    });

    addUserToList(newUserRegistration);

}

function checkUser(userTocheck) {

    var userFromDB = user_db[userTocheck.userName];
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










