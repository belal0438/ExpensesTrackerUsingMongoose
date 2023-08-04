
const form = document.getElementById('myform');


form.addEventListener("submit", submitForm);
async function submitForm(eve) {
    try {
        eve.preventDefault();
        const userName = document.getElementById('name');
        const userPhone = document.getElementById('Phone');
        const userEmail = document.getElementById('Email');
        const userPassword = document.getElementById('password');

        const ele = document.getElementsByName('gender');
        let gender;
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                gender = ele[i].value
        }
        // console.log(gender);

        let obj = {
            name: userName.value,
            email: userEmail.value,
            phone: userPhone.value,
            password: userPassword.value,
            gender: gender
        }
        //    console.log(obj);
        user = await axios.post('http://localhost:4000/signup/users', obj);
        // console.log(user.data.message);
        alert(user.data.message)
        window.location.href = "../login/index.html";
    } catch (error) {
        console.log(error.response.data.message)
    }

}

// E:\expenseTrackeUsingMongoose\public\login\index.html