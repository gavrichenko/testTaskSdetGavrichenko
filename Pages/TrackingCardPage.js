
const Page = require('./BasePage');
const Log = require('../test/Log');
const loging = text => log.log(text);

trackingCardFooterButtons_text         = '[class="tracking-card__footer-buttons"]>div';                              //текст кнопок Настроить уведомления, Распечатать, Удалить
delTrek_btn                            = '.tracking-card__footer-btn--delete';                                       //кнопка удаления посылки
edit_btn                               = '.editable-title__btn-edit';                                                //кнопка редактирования имени посылки
number_txt                             = '.tracking-card__header-track-number';                                      //трек-номер при раскрытой посылке
allTextTrek                            = '.tracking-card__history-status>span';                                      //текст появляется при открытии посылки
undelete_btn                           = '.text-button.tracking-card__btn-undelete';                                 //кнопка восстановить удаленную посылку
trekAfterDelete                        = '.tracking-card__title--non-editable';                 					 //возвразщает СЕРЫЙ ЦВЕТ после удаление трека
trekBeforeDelete                       = '.editable-title__value';                                                   //возвразщает СИНИЙ ЦВЕТ после восстановления трека
ZelenayaGalka                          = '.tracking-card__completed-mark';                                           //Зеленая галка

module.exports = (driver) => {
  const basePage = Page(driver);
  return {
    delTrek_btn_click() {
      loging('Нажимаю кнопку Удалить трек');
      return basePage.find(delTrek_btn).click();
    },
    getAttributeTrekAfterDelete() {
      loging('Получаю CSS свойства...');
      return basePage.find(trekAfterDelete).getCssValue('color');
    },
    getAttributeTrekBeforeDelete() {
      loging('Получаю CSS свойства...');
      return basePage.find(trekBeforeDelete).getCssValue('color');
    },
    undelete_btn_click() {
      loging('Нажимаю кнопку Восстановить трек');
      return basePage.find(undelete_btn).click();
    },
  };
};
