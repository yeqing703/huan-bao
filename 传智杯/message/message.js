document.addEventListener("DOMContentLoaded", function () {
    loadComments();

    document.getElementById("fromMessage").addEventListener("submit", function (event) {
        event.preventDefault();

        let ename = document.getElementById("ename").value.trim();
        let content = document.getElementById("word").value.trim();

        if (!ename || !content) {
            alert("请输入完整的名字和留言内容！");
            return;
        }

        fetch("http://127.0.0.1:5000/add_comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ename: ename, content: content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("successMessage").innerText = data.message;
                addMessageToTop(data.comment);
                // loadComments();  // 这里可以先注释掉，避免刷新覆盖
                document.getElementById("fromMessage").reset();
            } else {
                alert("提交失败: " + data.message);
            }
        })
        .catch(error => console.error("提交留言时出错:", error));
    });
});

function loadComments() {
    fetch('http://127.0.0.1:5000/comments')
        .then(response => response.json())
        .then(data => {
            let msgBox = document.querySelector(".msg-box");
            if (!msgBox) {
                console.error(".msg-box 未找到！");
                return;
            }
            data.forEach(comment => addMessageToTop(comment));  // 重新添加所有留言
        })
        .catch(error => console.error('加载留言时出错:', error));
}

function addMessageToTop(comment) {
    let msgBox = document.querySelector(".msg-box");
    if (!msgBox) {
        console.error("错误：找不到 .msg-box，请检查 HTML 是否正确");
        return;
    }

    if (!comment || !comment.ename || !comment.content) {
        console.error("留言数据不完整:", comment);
        return;
    }

    let avatarSrc = comment.avatar && comment.avatar.startsWith('/') ? comment.avatar : "/img/avatar0.png";
    let newMessage = `
        <div class="msg-item">
            <div class="msg-title">
                <img src="${avatarSrc}" alt="用户头像"> ${comment.ename}
            </div>
            <div class="msg-address">广州</div>
            <div class="msg-cont">"${comment.content}"</div>
        </div>
        <p>------------------------------------------------------------------------</p>
    `;

    msgBox.insertAdjacentHTML("afterbegin", newMessage);
}




