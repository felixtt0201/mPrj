const url = "https://fierce-forest-92782.herokuapp.com/articles";


const columnBoard = document.querySelector('.columnBoard');
const get_draftID = document.getElementById('get_draftID');
const indexPagination = document.querySelector('.indexPagination')

let urlData = [];




axios.get(url).then(res => {
  urlData = res.data;
  //篩選type=question的資料
  const dataTotal = urlData.filter(i => i.type === "question");
  console.log(dataTotal);


  //每頁只顯示幾筆
  const perPage = 5;
  const pageTotal = Math.ceil(dataTotal.length / perPage)
  console.log(pageTotal)

  let currentPage = 5;
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  };

  const minData = (currentPage * perPage) - perPage + 1;
  const maxData = (currentPage * perPage);


  const newData = []
  dataTotal.forEach((i, index) => {
    const num = index + 1;
    if (num >= minData && num <= maxData) {
      newData.push(i)
    }
  })
  console.log(newData)



  //篩選渲染主內容
  let str = "";

  newData.forEach(i => {
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
                                    <span></span>
                                    <span>回答</span>
                                </a>
                            </li>
                            <li>
                                <a class="view" href="">
                                    <span>${i.view}</span>
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


  //動態分頁實做
  const pageList = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < dataTotal,
  };
  pageBtn(pageList);

  function pageBtn(pageList) {
    let pstr = "";
    const total = pageList.pageTotal;
    console.log(total)
    if (pageList.hasPage) {
      pstr += `<li class="pages"><a href="#" data-page="${Number(pageList.currentPage) - 1}">上一頁</a></li>`
    } else {
      pstr += `<li class="pages"><a href="">下一頁</a></li>`
    }

    for (let i = 1; i <= total; i++) {
      pstr += `<li class="pages"><a href="" data-page="${i}">${i}</a></li>`;
    };


    if (pageList.hasNext) {
      pstr += `<li class="pages"><a href="#" data-page="${Number(pageList.currentPage) + 1}">下一頁</a></li>`
    }
    else {
      pstr += `<li class="pages"><a href="#">下一頁</a></li>`
    }
    indexPagination.innerHTML = pstr;
  }
  getID();

  function switchPage(e) {
    e.preventDefault();
    if (e.target.nodeName !== "A")
      return;
    const page = e.target.dataset.page;
  }
});

indexPagination.addEventListener('click', switchPage())



function getID() {
  let id = '';
  get_draftID.addEventListener('click', function (e) {
    id = e.target.dataset.id
    console.log(id)
    localStorage.setItem('articleID', id);
    window.location.href = '/qa_content.html';
  });
}