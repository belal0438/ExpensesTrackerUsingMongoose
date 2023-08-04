const Rz_Premium = document.getElementById('Rz_premium');


Rz_Premium.onclick = async (eve) => {
    try {
        eve.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:4000/premium/purchasepremium", { headers: { 'Authorization': token } });
        // console.log("response.data",response.data);
        var options = {
            "key": response.data.Key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                // console.log(response)
                await axios.post("http://localhost:4000/premium/transaction-status", {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    status: "SUCCESSFUL"
                }, { headers: { 'Authorization': token } })
                alert('you are a premium User Now');
                premiumFeatures();
                // fordownloading();
                // forDownloadedUrl();
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert("somthing went wrong");
        });
    } catch (error) {
        console.log(error);
    }

}




async function premiumFeatures() {
    try {
        premiunList = document.getElementById('ulpremium');

        premiunList.innerHTML = "";

        premiunListDon = document.getElementById('Ullist2')
        li = document.createElement('li');
        // Premium = document.getElementById('Premium')
        button = document.createElement('button');
        button.innerText = "you are a premium user now";


        // leaderbordBtn = document.createElement('button')
        // leaderbordBtn.id = "BtnLeader";
        // leaderbordBtn.innerText = "Show LeaderBoard";


        // forDowloaddBtn = document.createElement('button')
        // forDowloaddBtn.id = "BtnDownload";
        // forDowloaddBtn.innerText = "Downloading";


        // forShowDowloaddBtn = document.createElement('button')
        // forShowDowloaddBtn.id = "BtnDownloadedUrl";
        // forShowDowloaddBtn.innerText = " Show Downloaded Url";



        li.append(button);
        // li.append(leaderbordBtn);
        // li.append(forDowloaddBtn);
        // li.append(forShowDowloaddBtn);
        // premiunList.remove(Premium)
        premiunListDon.append(li);
    }
    catch (err) {
        console.log(err)
    }
}



async function GetUserData() {

    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:4000/expenses/user", { headers: { 'Authorization': token } });
    // console.log(response.data[0])
    if (response.data[0].ispremiumuser == true) {
        premiumFeatures()
    }
}

GetUserData()