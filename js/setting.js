const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const editConfirm = document.getElementById('login');
const accountURL = "https://fierce-forest-92782.herokuapp.com/account";


// 抓取localStorage 的ＩＤ
let localStorageInfo = JSON.parse(localStorage.getItem('loginStatus'))
let pID = localStorageInfo.loginID;




function checkTest() {
  event.preventDefault();
  let newAry = [];
  let idInfo = [];
  let idInfo_password = "";

  //抓JSON SERVER INFO
  axios.get(accountURL).then((res => {
    newAry = res.data
    // 用LocalStorage的ＩＤ和JSON SEVER的ＩＤ來比對
    idInfo = newAry.filter(i => i.id == pID)
    idInfo_password = idInfo[0].password;
    if (oldPassword.value !== "" && oldPassword.value === idInfo_password) {
      console.log('舊密碼吻合');
      newPasswordCheck();
    }
    else {
      alert('舊密碼錯誤')
    }
  }))
};

//新密碼比對
function newPasswordCheck() {
  if (newPassword.value === confirmNewPassword.value && newPassword.value !== "" && confirmNewPassword.value !== "") {
    axios.patch(accountURL + `/${pID}`, {
      password: confirmNewPassword.value
    }).then((res => {
      console.log(res)
      alert('修改成功')
      window.location.href = `login.html`
    }))
  }
  else {
    alert('新密碼不吻合')
  }
}

editConfirm.addEventListener('click', checkTest)