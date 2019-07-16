const today = new Date(); // 今日の日付を取得
const year = today.getFullYear(); // 今年取得
const month = today.getMonth(); // 今月取得（0 = 1月）
const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const weekInitial = ["S", "M", "T", "W", "T", "F", "S"];
const monthEn = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

// -----------------------------------------
// 西暦の出力
// -----------------------------------------

document.getElementById('year').textContent = year;


// -----------------------------------------
// 和暦の出力
// -----------------------------------------

document.getElementById('jpa_year').textContent = getJpaCalender(year);


// -----------------------------------------
// 今月の月表示 0埋めして表示
// -----------------------------------------

document.getElementById('month').textContent = ('0' + (month + 1)).slice(-2);


// -----------------------------------------
// 月の英語表記出力を実行
// -----------------------------------------

let monthEnText = getMonthEn(month);
printMonthEn(monthEnText);


// -----------------------------------------
// 今月のカレンダーの出力を実行
// -----------------------------------------

// 今月のカレンダーデータ（HTML）を取得
let currentCalenderHtml = getCalender(year, month, 0);
// 今月のカレンダーを表示する要素を取得
const currentContainer = document.getElementById('current_month');
// 今月のカレンダーを表示
printCalender(currentCalenderHtml, currentContainer);


// -----------------------------------------
// 先月のカレンダーの出力を実行
// -----------------------------------------

// 先月のカレンダーデータ（HTML）を取得
let lastCalenderHtml = getCalender(year, month, 1);
// 先月のカレンダーを表示する要素を取得
const lastContainer = document.getElementById('last_month');
// 先月のカレンダーを表示
printCalender(lastCalenderHtml, lastContainer);


// -----------------------------------------
// 翌月のカレンダーの出力を実行
// -----------------------------------------

// 翌月のカレンダーデータ（HTML）を取得
let nextCalenderHtml = getCalender(year, month, 2);
// 翌月のカレンダーを表示する要素を取得
const nextContainer = document.getElementById('next_month');
// 翌月のカレンダーを表示
printCalender(nextCalenderHtml, nextContainer);


// -----------------------------------------
// カレンダーデータの取得
// - year   int  西暦
// - month  int  今月
// - monthSet  int  今月・先月・翌月の判定用
// -----------------------------------------
function getCalender (year, month, monthSet) {
  if (monthSet === 0) {
    // 今月
    const firstDate = new Date(year, month, 1);  // 初日を取得
    const lastDate = new Date(year, month + 1, 0);  // 最終日を取得
    // HTML化したカレンダーを返す
    return createHtmlCalender(firstDate, lastDate, monthSet);

  } else if (monthSet === 1) {
    // 先月
    const firstDate = new Date(year, month - 1, 1);  // 初日を取得
    const lastDate = new Date(year, month, 0);  // 最終日を取得
    // HTML化したカレンダーを返す
    return createHtmlCalender(firstDate, lastDate, monthSet);

  } else if (monthSet === 2) {
    // 翌月
    const firstDate = new Date(year, month + 1, 1);  // 初日
    const lastDate = new Date(year, month + 2, 0);  // 最終日
    // HTML化したカレンダーを返す
    return createHtmlCalender(firstDate, lastDate, monthSet);

  }
}

// -----------------------------------------
// 月の英語表記の取得
// - month  int  今月
// -----------------------------------------
function getMonthEn (month) {
  return monthEn[month];
}

// -----------------------------------------
// 和暦の年の取得
// - year  int  西暦
// -----------------------------------------
function getJpaCalender (year) {
  let jpaYear = year - 2018;
  return 'R' + jpaYear;
}

// -----------------------------------------
// カレンダーのHTML化
// - firstDate  date  月の初日
// - lastDate  date  月の最終日
// - monthSet  int  今月・先月・翌月の判定用
// -----------------------------------------
function createHtmlCalender (firstDate, lastDate, monthSet) {
  let i = 0;
  let html = '';
  let dayCount = 1; // 日付のカウント
  let month = firstDate.getMonth(); // 月の取得
  let dayOfWeek = firstDate.getDay(); // 初日の曜日
  let endDate = lastDate.getDate(); // 最終日を取得

  // 先月・翌月の場合は月も用意する
  if (monthSet === 1 || monthSet === 2) {
    // 0埋めする
    month = ('0' + (month + 1)).slice(-2);
    html += `<h2 class="mini_month_number">${month}</h2>`;
  }

  html += "<table>";

  // 曜日の行
  html += "<tr>";
  if (monthSet === 0) {
    // 今月の場合
    while (i < week.length) {
      html += `<td class="day_of_week">${week[i]}</td>`;
      i++;
    }

  } else if (monthSet === 1 || monthSet === 2) {
    // 先月・翌月の場合
    while (i < weekInitial.length) {
      html += `<td>${weekInitial[i]}</td>`;
      i++;
    }

  }

  html += "</tr>";

  // 週のループ
  for (let w = 0 ; w < 6 ; w++) {
    html += "<tr>";

    // 日のループ
    for (let d = 0 ; d < 7 ; d++ ) {
      if (w === 0 && d < dayOfWeek) {
        // 第１週
        // 初日の曜日まで空欄にする
        html += "<td></td>";

      } else if (dayCount > endDate) {
        // 最終日以降は空欄にする
        html += "<td></td>";

      } else {
        html += `<td>${dayCount}</td>`;
        dayCount++;
      }
    }

    html += "</tr>";

  }

  html += "</table>";

  return html;
}

// -----------------------------------------
// カレンダーの出力
// - html  str  html化したカレンダー
// - container  element  カレンダーを出力する先の要素
// -----------------------------------------
function printCalender (html, container) {
  container.insertAdjacentHTML('beforeend', html);
}

// -----------------------------------------
// 月の英語表記の出力
// - monthEnText  str  月の英語表記のテキスト
// -----------------------------------------
function printMonthEn (monthEnText) {
  const monthEnTextContainer = document.getElementById('current_month_en_text');
  monthEnTextContainer.textContent = monthEnText;
}