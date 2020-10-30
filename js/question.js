const q_api = `https://fierce-forest-92782.herokuapp.com/articles`;
const question_title = document.getElementById('subject');
const q_post_btn = document.querySelector('.subbtn');
const question_content = document.getElementById('question_content');
let q_obj = {
  title: '',
  author: '',
  date: '',
  content: '',
  artOnwerID: '',
  articleID: '',
  likes: 0,
  views: 0,
  type: 'question'
}



function question() {
  /* 取得 title */
  let Qtitle = question_title.value;
  q_obj.title = Qtitle

  /* 個人ID & 作者名字 */
  let getStatus = localStorage.getItem('loginStatus');
  let parseStatus = JSON.parse(getStatus);
  // console.log(parseStatus)
  q_obj.artOnwerID = parseStatus.loginID;
  q_obj.author = parseStatus.loginName;

  /* 取得文章內容 */
  q_obj.content = CKEDITOR.instances['question_content'].getData();


  /* 取得時間 */
  const date = new Date();
  const nowDay = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  const result = date.toLocaleDateString("ja-JP", nowDay);
  q_obj.date = result;
  // console.log(result)

  /* 文章ID */
  let today = date.getTime();
  q_obj.articleID = `${parseStatus.loginID}${today}`;


}
let id = {};
function post_question() {
  question();
  axios.post(q_api, q_obj)
    .then(res => {
      id = res.data.articleID
      console.log(id);
      localStorage.setItem('articleID', id);
      window.location.href = 'qa_content.html';
      getqa_data()
    })
}

// let getdata = {}; // id~106
// function getqa_data(){
//   axios.get(q_api)
//   .then(function(res){
//     getdata = res.data;
//     console.log(getdata);
//     render();
//   })
// }
q_post_btn.addEventListener('click', post_question);