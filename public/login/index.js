
const form = document.getElementById('myform');


form.addEventListener("submit", submitForm);
async function submitForm(eve) {
    try {
        eve.preventDefault();
        const userEmail = document.getElementById('Email');
        const userPassword = document.getElementById('password');

        let obj = {
            email: userEmail.value,
            password: userPassword.value,
        }
        // console.log(obj);
        user = await axios.post('http://localhost:4000/login/login', obj);
        // console.log(user.data);
        alert(user.data.message);
        localStorage.setItem('token', user.data.token);
        window.location.href = "../expenses/index.html";
    } catch (error) {
        alert(error.response.data.message)
        // console.log(error.response.data.message)
    }

}