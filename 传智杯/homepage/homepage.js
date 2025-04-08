document.addEventListener("DOMContentLoaded", function () {
    // 绑定提交按钮的点击事件
    document.getElementById("userForm").addEventListener("submit", function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        // 获取用户输入的值
        let username = document.getElementById("uname").value.trim();
        let email = document.getElementById("umail").value.trim();
        let address = document.getElementById("uaddress").value.trim();

        if (!username || !email || !address) {
            alert("所有字段不能为空！");
            return;
        }

        // 组织请求数据
        let signupData = {
            username: username,
            email: email,
            address: address
        };

        // 发送 POST 请求到 Flask 服务器
        fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData) // 转换为 JSON 格式
        })
            .then(response => response.json())  // 解析 JSON 响应
            .then(data => {
                if (data.status === "success") {
                    let successDiv = document.getElementById("successMessage");
                    successDiv.innerText = "报名成功：" + data.message;
                    successDiv.style.display = "block";

                    document.getElementById("userForm").reset(); // 清空表单

                    setTimeout(() => {
                        successDiv.style.display = "none";
                    }, 3000);
                } else {
                    let errorDiv = document.getElementById("successMessage");
                    errorDiv.innerText = "报名失败：" + data.message;
                    errorDiv.style.display = "block";

                    setTimeout(() => {
                        errorDiv.style.display = "none";
                    }, 3000);
                }
            })
    });
});
