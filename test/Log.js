const Log = function () {
  this.d = new Date();
  this.currentDate = `${this.d.getDate()}.${this.d.getMonth() + 1}.${this.d.getFullYear()} `;
  this.currentTime = `${this.d.getHours()}h ${this.d.getMinutes()}m ${this.d.getSeconds()}s ${this.d.getMilliseconds()}ms`;
  this.log_name = (`${this.currentDate + this.currentTime}.txt`);
  this.logEnd = this.d;
};
const fs = require('fs');
const path = require('path');

Log.prototype.start = function (logtext) {
  fs.writeFileSync(path.join(__dirname, '../LOG', this.log_name), `${logtext}\r\n`, 'utf8'), console.log(logtext);
};

Log.prototype.log = function (logtext) {
  const d = new Date();
  const logStart = new Date();
  const bench = logStart - this.logEnd;
  this.logEnd = logStart;
  const currentDate = `${d.getFullYear()}-${f((d.getMonth() + 1))}-${f(d.getDate())}`;
  const currentTime = (`${f(d.getHours())}:${f(d.getMinutes())}:${f(d.getSeconds())}.${fms(d.getMilliseconds())}`);

  function f(val) { // устанавливает красивый формат даты
    if (val < 10) { val = `0${val}`; }
    return val;
  }

  function fms(val) { // устанавливает красивый формат ms
    val += '';
    if (val.length < 3) {
      for (let i = 0; (val.length < 3); i++) {
        val = `0${val}`;
      }
    }
    return val;
  }

  function fb(val) { // выравнивает benchmark по правому краю
    val = `+${val}`;
    if (val.length < 5) {
      for (let i = 0; (val.length < 5); i++) {
        val = ` ${val}`;
      }
    }
    return val;
  }

  return fs.appendFileSync(path.join(__dirname, '../LOG', this.log_name), (`${currentDate} ${currentTime}  ${fb(bench)
  }ms    ${logtext}\r\n`), 'utf8'), console.log(`${fb(bench)}  ${logtext}`);
};

module.exports = Log;
