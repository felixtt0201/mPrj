const jsonUrl = 'https://fierce-forest-92782.herokuapp.com/articles';

const columnBoard = document.querySelector('.columnBoard');
const get_draftID = document.getElementById('get_draftID');
const indexPagination = document.querySelector('.indexPagination')


getID();
let jsonData = {};

axios.get(jsonUrl).then((response) => {
  jsonData = response.data;
  pagination(jsonData, 1);
});

function pagination(jsonData, nowPage) {

  // 取得type=question的資料
  questionInfo = jsonData.filter(i => i.type === "question")
  // 取得資料長度
  const dataTotal = jsonData.filter(i => i.type === "question").length;

  // 設定要顯示在畫面上的資料數量
  // 預設每一頁只顯示 5 筆資料。
  const perpage = 10;

  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  const pageTotal = Math.ceil(dataTotal / perpage);

  // 當前頁數，對應現在當前頁數
  let currentPage = nowPage;

  // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
  // 所以要在寫入一個判斷避免這種狀況。
  // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
  // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況，例如：nowPage 突然發神經？！
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }


  //當前頁面
  const minData = (currentPage - 1) * perpage + 1;
  //最大筆數
  const maxData = (currentPage * perpage);

  // 先建立新陣列
  const data = [];
  // 這邊將會使用 ES6 forEach 做資料處理
  // 首先必須使用索引來判斷資料位子，所以要使用 index


  // 改寫未完
  // for (let i = minData; i < maxData; i++) {
  //   data.push(jsonData[i])
  //   // console.log()
  // }

  questionInfo.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if (num >= minData && num <= maxData) {
      data.push(item);
    }
  })

  // 用物件方式來傳遞資料
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
  }
  displayData(data);
  pageBtn(page);
}

function displayData(data) {
  let str = '';
  data.forEach((i) => {
    str += `<div class="qaList">
                        <div class="qaCondition">
                            <li>
                                <a class="like" href="">
                                    <span>${i.likes}</span>
                                    <span>Like</span>
                                </a>
                            </li>
                            <li>
                                <a class="answer" href="">
                                    <span>0</span>
                                    <span>回答</span>
                                </a>
                            </li>
                            <li>
                                <a class="view" href="">
                                    <span>${i.views}</span>
                                    <span>瀏覽</span>
                                </a>
                            </li>
                        </div>
                        <div class="qaContent">
                            <li>
                                <a href="#">
                                    <h3 data-id='${i.articleID}'>${i.title}</h3>
                                </a>
                                <div class="qaTrivia">
                                    <a href=""
                                        class="qaTags">JavaScript</a>
                                        <a href=""
                                        class="qaTags">Web</a>
                                    <a class="qaTime" title="2020-10-21 13:16:08">2020-10-21</a>‧ 由
                                    <a class="qaInfoLink" href="https://ithelp.ithome.com.tw/users/20067337">
                                        ${i.author}
                                    </a> 提問
                                </div>
                            </li>
                        </div>
                    </div>`
  });
  columnBoard.innerHTML = str;
  getID();
}

function pageBtn(page) {
  let str = '';
  const total = page.pageTotal;

  if (page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">上一頁</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">上一頁</span></li>`;
  }


  for (let i = 1; i <= total; i++) {
    if (Number(page.currentPage) === i) {
      str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
  };

  if (page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">下一頁</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">下一頁</span></li>`;
  }

  indexPagination.innerHTML = str;
}

function switchPage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  const page = e.target.dataset.page;
  pagination(jsonData, page);

}

function getID() {
  let id = '';
  get_draftID.addEventListener('click', function (e) {
    id = e.target.dataset.id
    console.log(id)
    localStorage.setItem('articleID', id);
    window.location.href = '/qa_content.html';
  });
}

indexPagination.addEventListener('click', switchPage);