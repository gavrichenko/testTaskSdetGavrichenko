const { By, until, logging } = require('selenium-webdriver');
const Log = require('../test/Log');

const loging = text => log.log(text);

module.exports = driver => ({
  visit(URL) {
    loging('Перехожу на главную страницу www.pochta.ru/');
    return driver.get(URL);
  },
  quit() {
    loging('Тест окончен');
    return this.driver.quit();
  },
  find(el) {
    driver.wait(until.elementLocated(By.css(el)), 8000);
    return driver.findElement(By.css(el));
  },
  findAll(el) {
    loging('Собираю  текст со траницы...');
    driver.wait(until.elementsLocated(By.css(el)), 8000);
    return driver.findElements(By.css(el)).then((elements) => {
      const getTextPromiseList = [];
      elements.forEach((element) => {
        getTextPromiseList.push(element.getText());
      });
      // getTextPromiseList - в этом массиве теперь лежат промисы получения текста элементов, эти операции уже запущены, нужно на них подписаться
      // через Promise.all делаю это
      // Promise.all сделает нам результирующий промис, который завершится тогда, когда завершатся все, переданные в Promise.all
      return Promise.all(getTextPromiseList);
    });
  },
  write(el, txt) {
    return this.find(el).sendKeys(txt);
  },
  getTitle() {
    return driver.getTitle().catch((err) => {
      console.error(err);
      return 'no title';
    });
  },
  get_text_el(el) {
    return this.find(el).getText();
  },
  takeScreenshot() {
    return this.driver.takeScreenshot()
      .then(data => fs.writeFileSync(path.join(__dirname, '../img', 'img.png'), data, 'base64')).catch((err) => {
        console.error(err);
      });
  },

});

