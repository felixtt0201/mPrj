const articleApi = `https://fierce-forest-92782.herokuapp.com/articles`;
const columnBoard = document.querySelector('.columnBoard')
const get_draftID = document.getElementById('get_draftID');


axios.get(articleApi).then(res => {
    let indexData = res.data;
    let articleAry = indexData.filter(i => i.type == "question");
    //render
    let str = "";
    articleAry.forEach(i => {
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
    getID();
});

function getID() {
    let id = '';
    get_draftID.addEventListener('click', function (e) {
        id = e.target.dataset.id
        console.log(id)
        localStorage.setItem('articleID', id);
        window.location.href = 'qa_content.html';
    });
}