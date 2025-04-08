document.getElementById("fromMessage").addEventListener("submit", function(event) {
    event.preventDefault();  // 阻止默认提交行为

    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("word").value.trim(); 

    if (!email || !message) {
        alert("请填写完整信息！");
        return;
    }

    fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, message: message })  
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("fromMessage").reset();/*重置表单内容*/

            //页面延迟 1.5 秒后刷新
            setTimeout(() => {
                location.reload();  // **刷新页面**
            }, 1500);
        } else {
            alert("提交失败: " + data.message);
        }
    })
    .catch(error => console.error("提交错误:", error));
});




