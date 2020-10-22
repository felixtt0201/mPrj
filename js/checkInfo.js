function checkInfo(page = "") {
  let checkStatus = localStorage.getItem('loginStatus');
  if (checkStatus) {
    let url = `${window.location.origin}/${!page ? 'postInfo' : page}.html`;
    window.location.replace(url)
  }
  console.log(checkStatus)
}

function ck() {
  let checkStatus = localStorage.getItem('loginStatus');
  if (checkStatus) {
    return true
  }
  return false;
}
