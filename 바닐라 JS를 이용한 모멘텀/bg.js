const body = document.querySelector("body");

const IMG_NUMBER = 5; // 이미지 갯수

/* 배경 이미지 삽입 */
function paintImg(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`; // random으로 생성한 imgNumberr가 0부터 시작하므로
  image.classList.add("bgImage");
  body.prepend(image);
}

/* random 숫자 생성
  무조건 내림으로 설정하여 0부터 출력
*/
function genRandomNum() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandomNum();
  paintImg(randomNumber);
}

init();