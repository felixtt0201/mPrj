const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const article_num = document.querySelector('.profile-main__badge');
const article_list = document.querySelector('.user-article-list');
const get_draftID = document.getElementById('get_draftID');
const articles = document.getElementById('articles');
const questions = document.getElementById('questions');
const user_name = document.getElementById('user_name')

// (´・ω・｀)
let userID = parseStatus.loginID;
let userName = parseStatus.loginName;

console.log(`${userID}:${userName}`)//6
user_name.textContent = userName;
// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)


/* 找到自己ID 的文章 */
axios.get(api)
  .then(res => {
    let data = res.data;
    let newData = data.filter(i => i.artOnwerID == userID && i.type == 'article')
    let user_article_num = 0;
    let user_question_num = 0
    // render
    let str = '';
    newData.forEach(i => {
      user_article_num++;
      str += `<li class="qa-list profile-list">
    <div class="profile-list__condition">
      <p class="qa-condition">
        <span class="qa-condition__count">0</span>
        <span class="qa-condition__text">Like</span>
      </p>
      <p class="qa-condition">
        <span class="qa-condition__count">0</span>
        <span class="qa-condition__text">留言</span>
      </p>
      <p class="qa-condition">
        <span class="qa-condition__count">${i.views}</span>
        <span class="qa-condition__text">瀏覽</span>
      </p>
    </div>
    <div class="profile-list__content">
      <h3 class="qa-list__title">
        <span class="title-badge title-badge--tech">
          技術
        </span>
        <a href="#" class="qa-list__title-link" data-id='${i.articleID}'>
          ${i.title}
        </a>
      </h3>
      <div class="qa-list__tags">
        <a href="#" class="tag">12th鐵人賽</a>
        <a href="#" class="tag">JavaScript</a>
        <a href="#" class="tag">火箭隊讚</a>
        <a href="#" class="tag">Ben哥重課金</a>
      </div>
      <div class="qa-list__info">
        <a title="2020-10-14 10:09:33" class="qa-list__info-time">${i.date}</a> 由
        <a href="#" class="qa-list__info-link">${i.author}
        </a>
        分享
      </div>
    </div>
  </li>`

    })
    // console.log(user_article_num)
    article_list.innerHTML = str;
    article_num.textContent = user_article_num;
    articles.textContent = user_article_num;
    getID();
    data.forEach(i => {
      if (i.type == 'question' && i.artOnwerID == userID) {
        user_question_num++
      }
    })
    questions.textContent = user_question_num;
  })

function getID() {
  let id = '';
  get_draftID.addEventListener('click', function (e) {
    id = e.target.dataset.id
    console.log(id)
    localStorage.setItem('articleID', id);
    
    axios.get(api)
      .then(res => {
        let apiData = res.data;
        let countData = apiData.filter(i => i.articleID== id)
        // console.log(countData)
        let views = parseInt(countData[0].views)+1;
        console.log(views)
        axios.patch(`${api}/${countData[0].id}`,{
          views : `${views}`
        }).then(res=>{
          window.location.href = '/content.html';
        })
      })
  });
}

