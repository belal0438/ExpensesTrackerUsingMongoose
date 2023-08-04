


const form = document.getElementById('myform');


form.addEventListener("submit", submitForm);
async function submitForm(eve) {
    try {
        eve.preventDefault();
        const amount = document.getElementById('amount');
        const decription = document.getElementById('descript');
        const category = document.getElementById('categree');

        let obj = {
            amount: amount.value,
            decription: decription.value,
            category: category.value
        }
        //    console.log(obj);
        DisplayData(obj)

        const token = localStorage.getItem('token');
        expenses = await axios.post('http://localhost:4000/expenses/expenses', obj, { headers: { 'Authorization': token } });
        // console.log(expenses.data.message);

        document.getElementById('amount').value = "";
        document.getElementById('descript').value = "";
        document.getElementById('categree').value = "";


    } catch (error) {
        alert(error.response.data.message)
        // console.log(error.response.data.message)
    }
}



async function getExpenseData() {

    try {

        const token = localStorage.getItem('token');
        let getdata = await axios.get("http://localhost:4000/expenses/expenses", { headers: { 'Authorization': token } });
        // console.log(getdata.data)
        getdata.data.forEach(element => {
            DisplayData(element)
        });

    } catch (error) {
        console.log(error)
    }

}
getExpenseData()







function DisplayData(obj) {
    const Ullist = document.getElementById('Ullist');
    const li = document.createElement('li');
    const Delbtn = document.createElement('button');
    Delbtn.innerText = "Delete";

    const Editbtn = document.createElement('button')
    Editbtn.innerText = "Eddit";

    li.innerHTML = `Amount:- ${obj.amount},    Description:- ${obj.decription},       Category:- ${obj.category}  `;


    Delbtn.onclick = async (eve) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/expenses/expenses/${obj._id}`, { headers: { 'Authorization': token } })
        Ullist.removeChild(li);
    }




    Editbtn.onclick = async (eve) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/expenses/expenses/${obj._id}`, { headers: { 'Authorization': token }});

            document.getElementById('amount').value = obj.amount;
            document.getElementById('descript').value = obj.decription;
            document.getElementById('categree').value = obj.category;
            Ullist.removeChild(li);

        } catch (err) {
            console.log(err)
        }

    }

    li.appendChild(Editbtn);
    li.appendChild(Delbtn);
    Ullist.appendChild(li);
}



// async function showPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage }) {
//     try {
//         const prevBtn = document.getElementById('prev');
//         const currBtn = document.getElementById('curr');
//         const netxBtn = document.getElementById('next');


//         if (hasPreviousPage) {
//             prevBtn.addEventListener('click', () => {
//                 console.log("previousPage>>",previousPage)
//                 getProducts(previousPage)

//             });
//         }


//         currBtn.addEventListener('click', () => {
//             // console.log("currentPage>>",currentPage)
//             getProducts(currentPage)
//         });


//         if (hasNextPage) {
//             netxBtn.addEventListener('click', () => {
//                 // console.log("nextPage>>",nextPage)
//                 getProducts(nextPage)
//             })
//         }


//     }
//     catch (err) {
//         console.log(err)
//     }
// }





async function getProducts(page){
    const token = localStorage.getItem('token');
    let getdata = await axios.get(`http://localhost:4000/expenses/expenses_pagination?page=${1}&limit=${3}`, { headers: { 'Authorization': token } });
    console.log(getdata.data);
    // getdata.data.allExpense.forEach(element => {
    //     DisplayData(element);
    //     // console.log(element)
    // });
    // showPagination(getdata.data)
}
getProducts()

// response.data.allExpense.forEach(element => {
//     DisplayOnScreen(element);
// });
// showPagination(response.data)