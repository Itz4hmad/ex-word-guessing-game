
const alphabet = document.getElementById('alphabet');
const userBoard = [
   "پر طرفدار ترین ورزش در جهان ؟",
    "وسیله ای برای رفت و امد ؟" ,
    "بازی معروف حدس زدن کلمه ؟",
    "ویروسی همه گیر که اخیرا باعث مرگ افراد زیادی شد ؟",
    "عمومی ترین سیستم عامل موبایل هوشمند ؟",
    "محبوب ترین شخصیت کامیک بوک در جهان ؟",
    "یکی از معروف ترین زبان برنامه نویسی دنیا ؟",
    "پربیننده ترین شبکه دنیا که هیچ شبکه تلویزیونی ندارد ؟",
    "محبوب ترین بازی جهان در همه پلتفرم ها ؟",
    "تئوری گروهی از کسانی که دنیا تحت سلطه انها است ؟",
];
const passwordBoard = [
    'فوتبال',
    'امیرزا',
    'امیرزا',
    'کرونا',
    'اندروید',
    'مردعنکبوتی',
    'پایتون',
    'نتفلیکس',
    'ماینکرفت ',
    'ایلومیناتی',
];

const passwordDiv = document.querySelector('#board');
const userDiv = document.querySelector('#title');
const chance = document.querySelector('#chance');
const random = Math.floor(Math.random() * passwordBoard.length);
const password = passwordBoard[random];
let letters = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
const user = userBoard[random];

const yes = new Audio('correct.mp3');
const no = new Audio('error.mp3');
const win = new Audio('pass.mp3');
const lose = new Audio('gameover.mp3');
let fail = 5;
let countDown;

chance.innerHTML += `<div id='Count'>فرصت باقی مانده: ${fail}</div>`;

const start = function () {
  letters.split('').forEach(letter => {
    const html = `<div class="letter">${letter}</div>`;
    alphabet.insertAdjacentHTML('beforeend', html);
  });
  showPassword();
  showuser();
  
  
};
window.onload = start;


const passwordDashed = password.split('').map(letter => {
  if (letter === ' ') return ' ';
  else if (letter === '’') return '’';
  else if (letter === ',') return ',';
  else return '_';
});



const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join('');
};
const showuser = function () {
  userDiv.innerHTML = user;
};


const checkForLetter = function (e) {
  if (e.target.classList.contains('letter')) {
    if (password.toUpperCase().split('').includes(e.target.textContent)) {
      yes.play();
      password
        .toUpperCase()
        .split('')
        .forEach((letter, i, arr) => {
          if (letter === e.target.textContent) {
            passwordDashed[i] = letter;
            showPassword();
          }
        });

      deactivateLetter(true, e.target);
    } else {
      no.play();
      fail -= 1;
      document.querySelector("#Count").innerText = `فرصت باقی مانده: ${fail}`;
      document.querySelector("#Count").classList.add("#chance:after");
      deactivateLetter(false, e.target);
    }
    if (fail == 0) {
      finish(false);
    }
    if (password.toUpperCase() === passwordDashed.join('')) {
      finish(true);
    }
  }
};
alphabet.addEventListener('click', checkForLetter);
const deactivateLetter = function (hit, letter, audio) {
  letter.style.border = hit
    ? '1px solid rgb(50, 177, 149)'
    : '1px solid rgba(255, 0, 0, 0.338)';
  letter.style.backgroundColor = hit
    ? 'rgb(50, 177, 149)'
    : 'rgba(255, 0, 0, 0.747)';
  letter.style.color = 'white';
  letter.style.cursor = 'default';
};

const finish = function (succes) {
  if (succes) {
    alphabet.innerHTML = `<h1>شما برنده شدید!</h1><div class='btn'>مرحله بعد</div>`;
    win.play();
    clearInterval(countDown);
  } else {
    alphabet.innerHTML = ` <h3>پاسخ:${password}</h3> <h1>شما باختید!</h1> <div class='btn'><p>شروع مجدد </p></div>`;
    lose.play();
    clearInterval(countDown);
  }
  document
    .querySelector('.btn')
    .addEventListener('click', () => location.reload());
};

const timer = function () {
  const timer = document.querySelector('#timer');
  let time = new Date(60000);
  const options = {
    second: '2-digit'
  };
  const tick = function () {
    time -= 1000;
    timer.textContent = Intl.DateTimeFormat('en-US', options).format(time);
    if (time == 0) {
      finish(false);
      clearInterval(countDown);
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timer();
