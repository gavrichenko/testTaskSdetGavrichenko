const Page = require('./BasePage');
const config = require('../config.json');
const Log = require('../test/Log');
const loging = text => log.log(text);

LOGIN            = config.LOGIN;   //'gavr.imba@mail.ru';
PASSWORD         = config.PASSWORD; //'Nogood1234';

login_inp        = '#username';                                       //поле ввода логина
password_inp     = '#password';                                       //поле ввода пароля
enter_btn        = '.id-page__main-button';    //кнопка авторизации

module.exports = (driver) => {
  const basePage = Page(driver);
  return {
    set_login() {
      loging('Ввожу логин');
      return basePage.write(login_inp, LOGIN);
    },
    set_password() {
      loging('Ввожу пароль');
      basePage.write(password_inp, PASSWORD);
    },
    enter_btn_click() {
      loging('Авторизовываюсь на сайте');
      return basePage.find(enter_btn).click();
    },
  };
};
