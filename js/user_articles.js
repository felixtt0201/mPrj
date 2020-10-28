const api = `https://fierce-forest-92782.herokuapp.com/articles`;
const article_num = document.querySelector('.profile-main__badge');
const article_list = document.querySelector('.user-article-list');
const get_draftID = document.getElementById('get_draftID');

// (´・ω・｀)
let userID = parseStatus.loginID;
let userName = parseStatus.loginName;

console.log(`${userID}:${userName}`)//6

// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)// (´・ω・｀)


/* 找到自己ID 的文章 */
axios.get(api)
  .then(res => {
    let data = res.data;
    let newData = data.filter(i => i.artOnwerID == userID)
    let user_article_num = 0;
    // render
    let str = '';
    newData.forEach(i => {
      user_article_num++;
      str += `<li class="qa-list profile-list">
    <div class="profile-list__condition">
      <p class="qa-condition">
        <span class="qa-condition__count">100</span>
        <span class="qa-condition__text">Like</span>
      </p>
      <p class="qa-condition qa-condition--had-answer">
        <span class="qa-condition__count">100</span>
        <span class="qa-condition__text">留言</span>
      </p>
      <p class="qa-condition">
        <span class="qa-condition__count">9527</span>
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
        <a title="2020-10-14 10:09:33" class="qa-list__info-time">2020-10-14</a> 由
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
    getID();
  })

function getID() {
  let id = '';
  get_draftID.addEventListener('click', function (e) {
    id = e.target.dataset.id
    console.log(id)
  });
}
