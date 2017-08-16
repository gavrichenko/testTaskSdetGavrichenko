const { describe, it, after, before, beforeEach, afterEach } = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const assert = require('assert');

const config = require('../config.json');
const BasePage = require('../Pages/BasePage');
const LoginPage = require('../Pages/LoginPage');
const HomePage = require('../Pages/HomePage');
const MobileSizePage = require('../Pages/MobileSizePage');
const TrackingCardPage = require('../Pages/TrackingCardPage');

const Log = require('./Log'),
loging = text => log.log(text);
log = new Log();

beforeInit = () => {
  driver = new webdriver.Builder().forBrowser('chrome').build();
  driver.manage().deleteAllCookies();
  driver.manage().window().setSize(1050, 1050);
};
beforeInitMobile = () => {
  driver = new webdriver.Builder().forBrowser('chrome').build();
  driver.manage().deleteAllCookies();
  driver.manage().window().setSize(700, 900);
};


describe ('Автотесты сайта www.pochta.ru/', function () {
  log.start('Автотесты сайта www.pochta.ru');
  this.timeout(120000);

  describe ('Тесты авторизации', () => {
    before(() => {
      loging('  --СЦЕНАРИЙ 1: "АВТОРИЗАЦИЯ С ГЛАВНОЙ СТРАНИЦЫ" (SMOKE)');
      beforeInit();
    });

    afterEach(() => {
      driver.quit();
    });

    it('Авторизация с главной страницы (SMOKE)', () => {
      const
        loginPageHelper = LoginPage(driver),
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver);

      return commonPageHelper.visit(config.URL) // захожу на главную
        .then(() =>
          commonPageHelper.getTitle() // проверка тайтла
        )
        .then((title) => {
          assert.equal('Почта России', title, 'ТЕСТ УПАЛ! Ожидаемый title не совпадает с фактическим.');
          loging('Проверка пройдена: Тайтл страницы совпадает с ожидаемым');
        })
        .then(() =>
          homePageHelper.login_btn_click() // клик по кнопке Войти
        )
        .then(() =>
          loginPageHelper.set_login() // ввожу логин
        )
        .then(() =>
          loginPageHelper.set_password() // ввожу пароль
        )
        .then(() =>
          loginPageHelper.enter_btn_click() // авторизовываюсь
        )
        .then(() =>
          homePageHelper.getTextFromUserMenuButton() // проверка ФИО после авторизации
        )
        .then((text) => {
          assert.equal('Илья Алексеевич Гавриченко', text, 'ТЕСТ УПАЛ! Текст кнопки userMenuBtn не совпадает с фактическим.');
          loging('Проверка пройдена: ФИО отображается и совпадает с ожидаемым');
        })
        .then(() =>
          homePageHelper.userMenu_btn_click() // Клик по ФИО в меню пользователя
        )
        .then(() =>
          homePageHelper.exit_btn_click() // Логаут
        )
        .then(() =>
          homePageHelper.getTextFromLoginButton() // Проверка что ФИО не отображается после логаута
        )
        .then((text) => {
          assert.equal('Войти', text, 'ТЕСТ УПАЛ! Текст кнопки loginBtn не совпадает с фактическим.');
          loging('Проверка пройдена: ФИО не отображается, разлогинились.');
        });
    });
  });
  describe('Прокликивание вкладок с главной страницы (SMOKE)', () => {
    beforeEach(() => {
      beforeInit();
    });

    afterEach(() => {
      driver.quit();
    });

    it('Вкладка "ПОМОЩЬ"', () => {
      loging('  --СЦЕНАРИЙ 2: "ПЕРЕХОД НА ВКЛАДКУ ПОМОЩЬ" (SMOKE)');
      const
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver);

      return commonPageHelper.visit('https://www.pochta.ru/') // захожу на главную
        .then(() =>
          homePageHelper.help_btn_click() // Нажимаю кнопку Помощь на разводящей
        )
        .then(() => { // Проверка текста на странице "Помощь"
          return commonPageHelper.findAll(allTextPageHelpText);
        })
        .then((textInPage) => {
          const pageHelpText = 'Популярные вопросы,Как узнать, где моя посылка или письмо?,Сколько посылка или письмо хранится в' +
                        ' отделении?,Как узнать стоимость и срок доставки?,Как правильно писать адрес?,Как оставить жалобу или претензию?,Зачем' +
                        ' нужен личный кабинет?,Как узнать индекс?,Как поделиться местоположением посылки?,Как сообщить о проблеме на сайте?,Почтовые' +
                        ' услуги и правила,Виды отправлений,Простые и регистрируемые почтовые отправления,Ценные отправления,Уведомление о вручении,' +
                        'СМС-уведомление,Опись вложения,Наложенный платеж,Отметка «Осторожно» для посылок,Требования к содержимому и упаковке отправлений,' +
                        'Доступность почтовых отделений для людей с инвалидностью,Упаковочные материалы,Таможенная декларация,Пересылка до востребования' +
                        ',Получение отправлений,Отправка электронной техники,Доставка на дом,RFID-метка,Тарифы на доставку и дополнительные услуги,Сроки ' +
                        'доставки,Письма,Письмо,Письмо 1 класса,Заказное письмо,Заказное письмо 1 класса,Ценное письмо,Ценное письмо 1 класса,Экспресс-письмо ' +
                        'EMS,Письма в государственные органы,Бандероли,Бандероль,Заказная бандероль,Заказная бандероль 1 класса,Ценная бандероль,Ценная бандероль ' +
                        '1 класса,Посылки,Виды посылок,Мелкий пакет,Заказной мелкий пакет,Посылка,Ценная посылка,Экспресс-посылка EMS,Бизнес курьер,Бизнес курьер' +
                        ' экспресс,Новая продуктовая линейка посылок,Претензионная работа,Как оставить жалобу или претензию?,Поиск пропавших почтовых отправлений,' +
                        'Возмещение ущерба,Другие почтовые отправления,Открытка,Телеграмма,Секограмма,Мультиконверт,Мешок М,Подписка,Подписка на периодические издания,' +
                        'Онлайн-подписка,Льготы на подписку,Благотворительная подписка,Денежные переводы,Общая информация о денежных переводах,Почтовый перевод,Перевод ' +
                        '«Форсаж»,Перевод Western Union,Денежные переводы c QIWI,Безналичный перевод с карты на карту,Переводы с банковской карты с получением наличными,' +
                        'Получение перевода,Хранение и возврат невостребованного денежного перевода,Как резервировать деньги,Почта Банк,Общая информация о банке,Услуги ,' +
                        'Отделения,Услуги в отделениях,Услуги в отделениях,Подписка на периодические издания,Выдача пенсий и пособий,Приём платежей и оплата штрафов,Печать, ' +
                        'копия, сканирование, факс,Продажа билетов,Продажа лотерейных билетов,Филателия,Аренда абонементного ящика,Отправка документов в ВУЗы,Миграционные' +
                        ' уведомления,Центр выдачи и приема посылок (ЦВПП),Идентификационная карта «Почтовый паспорт»,Финансовые услуги,Страхование,Погашение кредитов,Услуги ' +
                        'доставки для бизнеса,Курьерская служба b2b,Подготовка посылок к отправке,Проверка почтовых рассылок,Массовая отправка писем и счетов,Бокс-сервис.' +
                        ' Получение и отправка письменной корреспонденции в офисе,3-в-1. Подготовка и отправка письменной корреспонденции из офиса,Франкирование,Рассылка' +
                        ' счетов вашим клиентам,Гибридная почта. Печать и доставка писем и счетов,Абонементный ящик,Отделения для корпоративных клиентов,Рекламные услуги для ' +
                        'бизнеса,Рекламные рассылки,Гео-почта. Локальная рекламная рассылка,Директ-мейл. Таргетированная рекламная рассылка,Федеральная рекламная рассылка,Ответные ' +
                        'внутренние отправления,Размещение рекламы в отделениях,Финансовые услуги для бизнеса,Прием платежей в почтовых отделениях,Денежные переводы,Другие услуги' +
                        ' для бизнеса,API. Интеграция с вашими приложениями,Упрощенный экспорт,Подписное агентство. Размещение изданий в подписном каталоге,Подготовка и отправка' +
                        ' миграционных уведомлений,Помещения в аренду,Веб и мобильные сервисы,Мобильное приложение,Электронные заказные письма,Подписное агентство';
          assert.equal(pageHelpText, textInPage, 'ТЕСТ УПАЛ! Текст на странице "Помощь" не совпадает с фактическим.');
          loging('Проверка пройдена: Текст на странице "Помощь" совпадает с фактическим.');
        });
    });

    it ('Вкладка "БИЗНЕСС"', () => {
      loging('  --СЦЕНАРИЙ 3: "ПЕРЕХОД НА ВКЛАДКУ БИЗНЕСС" (SMOKE)');
      const
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver);
      return commonPageHelper.visit('https://www.pochta.ru/') // захожу на главную
        .then(() =>
          homePageHelper.business_btn_click() // Нажимаю кнопку Бизнесс на разводящей
        )

        .then(() => { // Проверка текста на странице "Бизнесс"
          driver.sleep(500);
          return commonPageHelper.findAll(allTextBusines);
        })
        .then((textInPage) => {
          const pageBusinessText = 'Отправка посылок,Отправка и получение писем в вашем офисе,Получение писем от ГИБДД в ' +
                        'электронном виде,Массовая отправка писем и счетов,Абонементный ящик,Локальные рассылки,Таргетированные рассылки,' +
                        'Реклама в отделениях,Прием платежей от ваших клиентов,Денежные переводы,Интеграция с вашими приложениями (API),' +
                        'Подписное агентство,Упрощенный экспорт для юридических лиц';
          assert.equal(pageBusinessText, textInPage, 'ТЕСТ УПАЛ! Текст на странице "Бизнесс" не совпадает с фактическим.');
          loging('Проверка пройдена: Текст на странице "Бизнесс" совпадает с фактическим.');
        });
    });

    it ('Вкладка "ПИСЬМА"', () => {
      loging('  --СЦЕНАРИЙ 4: "ПЕРЕХОД НА ВКЛАДКУ ПИСЬМА" (SMOKE)');
      const
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver);
      return commonPageHelper.visit('https://www.pochta.ru/') // захожу на главную
        .then(() =>{
          homePageHelper.mail_btn_click(); // Нажимаю кнопку Письма на разводящей
        })
		.then(() =>
          commonPageHelper.getTitle() // проверка тайтла
        )
        .then((title) => {
          assert.equal('Письма', title, 'ТЕСТ УПАЛ! Ожидаемый title не совпадает с фактическим.');
          loging('Проверка пройдена: Тайтл страницы совпадает с ожидаемым');
        })
        .then(() => { // Проверка ссылок на странице "Письма"
          return commonPageHelper.findAll(mailLinksText);
        })
        .then((textInPage) => {
          const pageMailText = 'Виды писем,Отслеживание писем,Как написать адрес';
          assert.equal(pageMailText, textInPage, 'ТЕСТ УПАЛ! Текст на странице "Письма" не совпадает с фактическим.');
          log.log('Проверка пройдена: Текст на странице "Письма" совпадает с фактическим.');
        });
    });

    it('Вкладка "ПОСЫЛКИ"', () => {
      loging('  --СЦЕНАРИЙ 5: "ПЕРЕХОД НА ВКЛАДКУ ПОСЫЛКИ" (SMOKE)');
      const
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver);
      return commonPageHelper.visit('https://www.pochta.ru/') // захожу на главную
        .then(() =>
          homePageHelper.parcels_btn_click() // Нажимаю кнопку Посылки на разводящей
        )
        .then(() =>
          commonPageHelper.getTitle() // проверка тайтла
        )
        .then((title) => {
          assert.equal('Посылки', title, 'ТЕСТ УПАЛ! Ожидаемый title не совпадает с фактическим.');
          loging('Проверка пройдена: Тайтл страницы совпадает с ожидаемым');
        })
        .then(() => { // Проверка текста на странице "Посылки"
          return commonPageHelper.findAll(parcelsChexboxText);
        })
        .then((textInPage) => {
          const pageParcelsText = 'Уведомление о вручении,Ценная,Опись вложения,Наложенный платеж,Отметка «Осторожно»';
          assert.equal(pageParcelsText, textInPage, 'ТЕСТ УПАЛ! Текст на странице "Посылки" не совпадает с фактическим.');
          log.log('Проверка пройдена: Текст на странице "Посылки" совпадает с фактическим.');
        });
    });
  });
  describe.skip('Тесты при малом разрешении экрана', () => {
    beforeEach(() => {
      beforeInitMobile(); // Размер окна браузера для адаптации под мобилку
    });

    afterEach(() => {
      driver.quit();
    });

    it('Аккордеон при адаптации под мобилку', () => {
      loging('  --СЦЕНАРИЙ 6: "ПРОВЕРКА МИНИ-АККОРДЕОНА"');
      const
        commonPageHelper = BasePage(driver),
        mobileSizePageHelper = MobileSizePage(driver);
      return commonPageHelper.visit('https://www.pochta.ru/') // Захожу на главную
        .then(() =>
          mobileSizePageHelper.mobileMenu_btn_click() // Нажимаю кнопку Мини Аккордеона на разводящей
        )
        .then(() => { // Проверка текста на вкладках мини аккордеона
          return commonPageHelper.findAll(mobileMenu_text);
        })
        .then((textInPage) => {
          const pageMiniAkkText = 'Помощь,Отслеживание,Письма,Посылки,Открытки,Денежные переводы,Отделения,Курьер,Индекс,Бланки,Электронные письма,' +
                        'Подписка онлайн,Почта Маркет,Почта Банк,Отправка посылок,Отправка и получение писем в вашем офисе,Получение писем от ГИБДД в электронном виде,' +
                        'Массовая отправка писем и счетов,Абонементный ящик,Локальные рассылки,Таргетированные рассылки,Реклама в отделениях,Прием платежей от ваших клиентов,' +
                        'Денежные переводы,Интеграция с вашими приложениями (API),Подписное агентство,Пресс-центр,О компании';
          assert.equal(pageMiniAkkText, textInPage, 'ТЕСТ УПАЛ! Текст в Мини-аккордеоне не совпадает с фактическим.');
          loging('Проверка пройдена: Текст в Мини-аккордеоне совпадает с фактическим.');
        });
    });
  });
  describe('Проверка посылки (поиск, удаление, восстановление)', () => {
    beforeEach(() => {
      beforeInit();
    });

    afterEach(() => {
      driver.quit();
    });

    it('Поиск', () => {
      loging('  --СЦЕНАРИЙ 7: "ПОИСК ПОСЫЛКИ"'); // трек-номер RM524897714CN
      const
        loginPageHelper = LoginPage(driver),
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver),
        trackingCardHelper = TrackingCardPage(driver);

      return commonPageHelper.visit('https://www.pochta.ru/') // Захожу на главную и авторизовываюсь
        .then(() =>
          homePageHelper.login_btn_click() // клик по кнопке Войти
        )
        .then(() =>
          loginPageHelper.set_login() // ввожу логин
        )
        .then(() =>
          loginPageHelper.set_password() // ввожу пароль
        )
        .then(() =>
          loginPageHelper.enter_btn_click() // авторизовываюсь
        )
        .then(() => {
          return homePageHelper.set_trekNomer(); // Ввожу трек-номер на главной странице
        })
        .then(() =>
          homePageHelper.trekNomer_btn_click() // Нажимаю кнопку поиска трек-номера на разводящей
        )
        .then(() =>
          commonPageHelper.getTitle() // проверка тайтла
        )
        .then((title) => {
          assert.equal('Отслеживание', title, 'ТЕСТ УПАЛ! Ожидаемый title не совпадает с фактическим.');
          loging('Проверка пройдена: Тайтл страницы совпадает с ожидаемым');
        })
        .then(() => { // Проверка отображения кнопок  Настроить уведомления, Распечатать, Удалить в карточке трека
          return commonPageHelper.findAll(trackingCardFooterButtons_text);
        })
        .then((textInPage) => {
          const pageTrackingCard_text = 'Настроить уведомления,Распечатать,,Удалить';
          assert.equal(pageTrackingCard_text, textInPage, 'ТЕСТ УПАЛ! Кнопки "Настроить уведомления", "Распечатать", "Удалить" не отображаются в карточке трека');
          loging('Проверка пройдена: Кнопки "Настроить уведомления", "Распечатать", "Удалить" отображаются в карточке трека');
        })
        .then(() => // Проверка отображения трек-номера в карточке трека
          commonPageHelper.get_text_el(number_txt)
        )
        .then((textBtn) => {
          assert.equal('RM524897714CN', textBtn, 'ТЕСТ УПАЛ! Номер трека не совпадает с фактическим.');
          loging('Проверка пройдена: Трек номер верно отображается на странице посылки');
        });
    });
    it ('Удаление и восстановление', () => {
      loging('  --СЦЕНАРИЙ 8: "УДАЛЕНИЕ И ВОССТАНОВЛЕНИЕ ПОСЫЛКИ"'); // трек-номер RM524897714CN
      const
        loginPageHelper = LoginPage(driver),
        homePageHelper = HomePage(driver),
        commonPageHelper = BasePage(driver),
        trackingCardHelper = TrackingCardPage(driver);

      return commonPageHelper.visit('https://www.pochta.ru/') // Захожу на главную и авторизовываюсь
        .then(() =>
          homePageHelper.login_btn_click() // клик по кнопке Войти
        )
        .then(() =>
          loginPageHelper.set_login() // ввожу логин
        )
        .then(() =>
          loginPageHelper.set_password() // ввожу пароль
        )
        .then(() =>
          loginPageHelper.enter_btn_click() // авторизовываюсь
        )
        .then(() => {
          return homePageHelper.set_trekNomer(); // Ввожу трек-номер на главной странице
        })
        .then(() =>
          homePageHelper.trekNomer_btn_click() // Нажимаю кнопку поиска трек-номера на разводящей
        )
        .then(() =>
          trackingCardHelper.delTrek_btn_click() // Нажимаю кнопку Удалить в карточке трека
        )
        .then(() => {
          return trackingCardHelper.getAttributeTrekAfterDelete(); // Проверка что цвет трека - Серый
        })
        .then((text_btn) => {
          driver.sleep(500);
          assert.equal('rgba(153, 153, 153, 1)', text_btn, 'ТЕСТ УПАЛ! Текст кнопки не совпадает с фактическим.');
          loging('Проверка пройдена: Серый цвет трек номера после удаления');
        })
        .then(() =>
          trackingCardHelper.undelete_btn_click() // Нажимаю кнопку Восстановить
        )
        .then(() => {
          return trackingCardHelper.getAttributeTrekBeforeDelete(); // Проверка что цвет трека - Серый
        })
        .then((text_btn) => {
          assert.equal('rgba(0, 85, 166, 1)', text_btn, 'ТЕСТ УПАЛ! Текст кнопки не совпадает с фактическим.');
          loging('Проверка пройдена: Синий цвет трек номера после удаления');
        });
    });
  });
});
