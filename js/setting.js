const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const editConfirm = document.getElementById('login');
const accountURL = "https://fierce-forest-92782.herokuapp.com/account";


// 抓取localStorage
let localStorageInfo = JSON.parse(localStorage.getItem('loginStatus'))
let pPassword = localStorageInfo.loginPassword
let pID = localStorageInfo.loginID;
console.log(localStorageInfo)
console.log(pPassword)
console.log(pID)

function checkPassword(pID) {
  //判斷舊密碼吻合且不能空白
  if (oldPassword.value !== "" && oldPassword.value === pPassword) {
    alert('舊密碼吻合')
    newPasswordCheck(pID);
  }
  else {
    alert('舊密碼錯誤')
  }
}

// function newPasswordCheck() {
//   if (newPassword.value === confirmNewPassword.value && newPassword.value !== "" && confirmNewPassword.value !== "") {
//     axios.patch(`https://fierce-forest-92782.herokuapp.com/account/${pID}`, {
//       password: 'asdddd'
//     }).then((res => {
//       console.log(res)
//     }))
//   }
//   else {
//     alert('新密碼不吻合')
//   }
// }

editConfirm.addEventListener('click', checkPassword)