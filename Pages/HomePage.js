const Page = require('./BasePage');
const config = require('../config.json');
const Log = require('../test/Log');
const loging = text => log.log(text);


loginBtn             = '.header__btn-login';                    // кнопка Войти на главной
userMenuBtn          = '.header__btn-user-menu';    		    // кнопка с ФИО после авторизации
exitBtn              = '.header__user-menu-balloon>.balloon--menu__element-container:last-child>.balloon--menu__element';   // кнопка логаута. короче локатор не сделать

logoBtn              = '.header__logo';                         // кнопка лого на главной
helpBtn              = '.header__btn-help';                     // кнопка вкладки Помощь
businessBtn          = '.header__btn-business';                 // кнопка вкладки Бизнесс на главной
allTextPageHelpText  = '.text-page>div>article>ul>li';          // большой текс во вкладке Помощь


allTextBusines       = '[class="header__business-menu-section-item"] a'; // ссылки на вкладке Бизнесс

mailBtn              = '[href="letters"]';                      // кнопка Письма на главной
mailLinksText        = '.product-page__header-help-item>a';     // ссылки на вкладке Письма

parcelsBtn           = '[href="parcels"]';                      // кнопка Посылки на главной
parcelsChexboxText   = '.checkbox__text';                       // текст чекбоксов на вкладке Посылки

TREKNOMER            = config.TREK;                             // тестовые данные: трек-номер
trekNomerBtn         = '.input__btn-search';                    // кнопка поиска трек-номера
trekNomerInp         = '.main-page__tracking-input>input';      // поле ввода трек-номера

module.exports = (driver) => {
  const basePage = Page(driver);
  return {

    // Методы Авторизации

    login_btn_click() {
      loging('Нажимаю кнопку Войти на разводящей');
      return basePage.find(loginBtn).click();
    },
    getTextFromUserMenuButton() {
      loging('Получаю текст кнопки Меню Пользователя');
      return basePage.get_text_el(userMenuBtn);
    },
    userMenu_btn_click() {
      loging('Клик на меню пользователя');
      return basePage.find(userMenuBtn).click();
    },
    exit_btn_click() {
      loging('Клик на кнопку "Выход" из меню пользователя (логаут)');
      return basePage.find(exitBtn).click();
    },
    getTextFromLoginButton() {
      loging('Получаю ФИО из кнопки Меню пользователя');
      return basePage.get_text_el(loginBtn);
    },

    // методы прокликивания главной страницы

    help_btn_click() {
      loging('Нажимаю кнопку Помощь на разводящей');
      return basePage.find(helpBtn).click();
    },
    business_btn_click() {
      loging('Нажимаю кнопку Бизнесс на разводящей');
      return basePage.find(businessBtn).click();
    },
    mail_btn_click() {
      loging('Нажимаю кнопку Письма на разводящей');
      return basePage.find(mailBtn).click();
    },
    parcels_btn_click() {
      loging('Нажимаю кнопку Посылки на разводящей');
      return basePage.find(parcelsBtn).click();
    },

    // Методы взаимодействия с трек-номером на главной

    set_trekNomer() {
      loging(`Ввожу трек-номер на главной странице: ${TREKNOMER}`);
      return basePage.write(trekNomerInp, TREKNOMER);
    },
    trekNomer_btn_click() {
      loging('Нажимаю кнопку поиска трек-номера на разводящей');
      return basePage.find(trekNomerBtn).click();
    },

  };
};
