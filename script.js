"use strict";
// 1行目に記載している "use strict" は削除しないでください

//わからないことをわからないままにしない
//学ぶことを楽しむ

/*作成するもの*/

// 最初は上司画面を隠す
// 上司が新しいファイルを追加
// 災害事例を選ぶ ==> ファイル表示
// 名前・コメントを登録
// パスワード入力 ==> 上司画面へ
// 登録されたコメントを一覧表示
// メイン画面に戻る


// HTML要素を取得する

// 画面表示
const bossPage = document.getElementById("bossPage");
const casePage = document.getElementById("casePage");
// ボタン関係
const bossButton = document.getElementById("bossButton");
const backButton = document.getElementById("backButton");
const addFileButton = document.getElementById("addFileButton");
const postButton = document.getElementById("postButton");
// ファイル関係
const newTitle = document.getElementById("newTitle");
const newFile = document.getElementById("newFile");
const caseSelect = document.getElementById("caseSelect");
const fileView = document.getElementById("fileView");
// コメント関係
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const commentList = document.getElementById("commentList");
// データを入れる配列
const files = [];
const comments = [];
// 最初は上司画面を隠す
bossPage.style.display = "none";
// 上司画面を開く
bossButton.addEventListener("click", function () {
    const password = prompt("上司パスワードを入力してください");
    if (password === "1234") {
        showComments();
        casePage.style.display = "none";
        bossPage.style.display = "block";
    } else {
        alert("パスワードが違います");
    }
});
// コメント一覧を表示
function showComments() {
    let result = "";
    for (const element of comments) {
        result += `
            <div class="commentBox">
                <p>事例：${element.fileName}</p>
                <p>名前：${element.name}</p>
                <p>コメント：${element.comment}</p>
            </div>
        `;
    }
    // コメントがない場合
    if (result === "") {
        result = "<p>まだコメントはありません</p>";
    }
    commentList.innerHTML = result;
}
// ファイルを追加
addFileButton.addEventListener("click", function () {
    const title = newTitle.value;
    const file = newFile.files[0];
    // ファイル名がない場合
    if (title === "") {
        alert("ファイル名を入力してください");
        return;
    }
    // ファイルが選ばれていない場合
    if (file === undefined) {
        alert("ファイルを選んでください");
        return;
    }
    // ファイルを表示するURLを作る
    const url = URL.createObjectURL(file);
    // 配列filesに追加
    files.push({
        name: title,
        fileUrl: url
    });
    // ドロップダウンの選択肢を作る
    const option = document.createElement("option");
    option.value = files.length - 1;
    option.textContent = title;
    // ドロップダウンに追加
    caseSelect.appendChild(option);
    // 入力欄を空にする
    newTitle.value = "";
    newFile.value = "";
    alert(`「${title}」を追加しました`);
});
// ファイルを選択
caseSelect.addEventListener("change", function () {
    const number = caseSelect.value;
    // 何も選んでいない場合
    if (number === "") {
        fileView.data = "";
        return;
    }
    // 選んだファイルを表示
    fileView.data = files[number].fileUrl;
});
// コメントを登録
postButton.addEventListener("click", function () {
    const number = caseSelect.value;
    const userName = nameInput.value;
    const text = commentInput.value;
    // 事例を選んでいない場合
    if (number === "") {
        alert("災害事例を選んでください");
        return;
    }
    // 名前またはコメントが空の場合
    if (userName === "" || text === "") {
        alert("名前とコメントを入力してください");
        return;
    }
    // コメントを配列に追加
    comments.push({
        fileName: files[number].name,
        name: userName,
        comment: text
    });
    // 入力欄を空にする
    nameInput.value = "";
    commentInput.value = "";
    alert("登録しました");
});
// メイン画面に戻る
backButton.addEventListener("click", function () {
    bossPage.style.display = "none";
    casePage.style.display = "block";
});
