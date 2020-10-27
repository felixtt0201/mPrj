const draft_title = document.getElementById('draft-header-title');
const draft_btn = document.querySelector('.btn-draft');
// console.log(draft_btn)
// console.log(draft_title)
let draft_obj ={
  title: '',
  author: '',
  data: '',
  content: '',
  artOnwerID: ''
}
draft();

// (´・ω・｀)
function draft(){
  /* 取得title */
  let title = draft_title.value;
  draft_obj.title = title ;
  console.log(draft_obj.title)

  /* 取得時間 */
  const date = new Date();
  const nowDay = date.toLocaleString();
  draft_obj.data = nowDay;

  draft_obj.content = CKEDITOR.instances['editor-main'].getData();
//   console.log(draft_obj.content);
  
  let author = localStorage.getItem('loginStatus');
  let parseauthor = JSON.parse(author);
//   console.log(parseauthor);
  draft_obj.author = parseauthor.loginID
//   console.log(draft_obj.author)
}

// view


// console.log(draft_obj.data)
// console.log(draft_obj.title)

draft_btn.addEventListener('click',draft)
