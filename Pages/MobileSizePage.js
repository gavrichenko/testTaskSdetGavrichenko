const Page = require('./BasePage');
const Log = require('../test/Log');

const loging = text => log.log(text);

mobileMenu_btn = '.header__mobile-menu-btn-icon'; // кнопка открытия мини-аккордеона
mobileMenu_text = '.mobile-menu__section-button'; // текст вкладок мини аккордеона

module.exports = (driver) => {
  const basePage = Page(driver);
  return {
    mobileMenu_btn_click() {
      loging('Нажимаю кнопку мини-аккордеона на разводящей');
      return basePage.find(mobileMenu_btn).click();
    },
  };
};
