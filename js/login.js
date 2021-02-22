const login = document.getElementById("login");

const loginAdmin = async () => {
    // idloginError.style.display = "none";
    try {
        if (username.value == "" && password.value == "") {
            idloginError.style.display = "block";
            return;
        }
        else {
            let credentials = {
                "username": username.value,
                "password": password.value
            }
            let response = await fetch("http://localhost:3501/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)

            })
            let resp = await response.json();
            if (resp == "success") {
                location.href = "upload.html";

            } else {
                idloginError.style.display = "block";

            }
        }

    }
    catch {
        idloginError.style.display = "block";
    }
}



login.addEventListener('click', loginAdmin);