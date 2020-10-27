const draft_title = document.getElementById('draft-header-title');
const draft_btn = document.querySelector('.btn-draft');
const draft_api ='https://fierce-forest-92782.herokuapp.com/articles';

// console.log(draft_btn)
// console.log(draft_title)

let draft_obj ={
  title: '',
  author: '',
  date: '',
  content: '',
  artOnwerID: '',
  articleID:''
}
draft();

// (´・ω・｀)
function draft(){
  /* 取得title */
  let title = draft_title.value;
  draft_obj.title = title ;
  // console.log(draft_obj.title)

  /* 取得時間 */
  const date = new Date();
  const nowDay = date.toLocaleString();
  draft_obj.data = nowDay;

  /* 取得文章內容 */
  draft_obj.content = CKEDITOR.instances['editor-main'].getData();
  // console.log(draft_obj.content)

  /* 個人ID & 作者名字 */
  let getStatus = localStorage.getItem('loginStatus');
  let parseStatus = JSON.parse(getStatus);
  // console.log(parseStatus)
  draft_obj.artOnwerID = parseStatus.loginID;
  draft_obj.author = parseStatus.loginName ;

  /* 文章ID */
  let today = Date.parse(nowDay);
  draft_obj.articleID = `${parseStatus.loginID}${today}`;
  console.log(draft_obj.articleID);
}

function post_draft(){
  draft();
  axios.post(draft_api,draft_obj)
  .then(res=>{
    console.log (res);
  })
}

draft_btn.addEventListener('click',post_draft)
