const bcrypt = require('bcrypt');
const {
  Mark, ModelSneaker, Size, Photo, Count, CountSize, Admin, Status,
} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up() {
    await Admin.bulkCreate([

      {
        login: 'olejaAdmin)(',
        password: await bcrypt.hash('repAdminpoizon', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await Mark.bulkCreate([
      { name: 'Nike' },
      { name: 'Adidas' },
      { name: 'New Balance' },
    ]);
    await Status.bulkCreate([
      { name: 'Новый' },
      { name: 'В работе' },
      { name: 'Выполнен' },
      { name: 'Отклонен' },
    ]);
    await ModelSneaker.bulkCreate([
      {
        name: 'AIR FORCE 1 07', mark_id: 1, price: 6780, description: 'ЛЕГЕНДАРНЫЙ СТИЛЬ Пусть солнце сияет для тебя с кроссовками Nike Air Force 1 07. Это обновленная версия классической баскетбольной модели из кожи с эффектными цветами и идеальным сиянием. Прошитые накладки из невероятно гладкой и слегка блестящей кожи обеспечивают прочность и поддержку, создавая классический образ. Изначально разработанная для высоких результатов на баскетбольной площадке система амортизации Nike Air обеспечивает легкость и комфорт на весь день. Низкопрофильный силуэт создает минималистичный образ. Мягкий низкопрофильный бортик для непревзойденного комфорта.',
      },
      {
        name: 'AIR MAX 90 GORE-TEX', mark_id: 1, price: 68000, description: 'Разработанные для того, чтобы вы могли весело проводить время, когда начинается дождь, кроссовки Nike Air Max 90 GTX обеспечивают водонепроницаемость кроссовок champion, которые определили стиль 90-х. Несомненно, это желанное издание, ваше проверенное и верное получит верх из GORE-TEX, чтобы вы могли произвести фурор, не промокнув.',
      },
      {
        name: 'AIR TRAINER 1', mark_id: 1, price: 7600, description: 'Прямо из хранилища возвращается желанный внешний вид с Air Trainer 1 "Shima Shima". Изготовленное из высококачественной замши, это переиздание знаменитого 2003 года выпуска в масштабе 1:1 позволит вам путешествовать без сбоев. Дизайнерские детали на язычке и подкладке воротника в полоску подчеркивают качество изделия, а ремешок на передней части стопы дополняет ваш любимый образ. Пусть воздушная амортизация Nike обеспечит вам комфорт во время сегодняшних приключений. Что делать дальше?',
      },
      {
        name: 'BLAZER MID 77 VINTAGE"', mark_id: 1, price: 8000, description: 'Дизайн модели Nike Blazer Mid 77 Vintage был создан еще в 70-х, но, кажется, с годами он становится еще более актуальным. Верх пары выполнен из мягкой кожи и дополнен вставками из натуральной замши. Открытый пеноматериал и необработанные края на язычке еще больше придают кедам винтажности. Перфорация вдоль подошвы обеспечивает активную циркуляцию воздуха. Конструкция создана методом термической обработки, поэтому обеспечивает не только цельный обтекаемый образ, но и дарит ощущение мягкости и комфорта. Резиновая подошва с зигзагообразным протектором создает надежное сцепление с поверхностью и узнаваемый отпечаток.',
      },
      {
        name: 'AIR MAX TERRASCAPE 90 LIGHT BONE', mark_id: 1, price: 7000, description: 'Air Max 90 — самая известная модель от Nike из линейки Air Max. Впервые эта модель была выпущена в 1990-м году в качестве беговых кроссовок и была названа Air Max III, так как была третьей моделью линейки. В 2000-м году модель была переименована по году выпуска и всё больше использовалась в качестве повседневной обуви. ',
      },
      {
        name: 'ORIGINALS CONTINENTAL 80 STRIPES', mark_id: 2, price: 6780, description: 'Скучаете по классике? Тогда вам идеально подойдут эти ретро-кроссовки adidas Continental 80. Наденьте их прямо сегодня. А потом еще и завтра. Просто потому что вам вряд ли захочется снимать кроссовки из мягкой белой кожи с фирменными тремя полосками. И упускать возможность похвастаться своим спортивным чувством стиля.',
      },
      {
        name: 'ORIGINALS FORUM LOW', mark_id: 2, price: 68000, description: 'Кеды в уличном стиле, вдохновленные баскетболом. Верх из композиционной кожи и эко-кожи с высоким зимним голенищем. Мягкая стелька и текстильная подкладка обеспечивают комфорт в течение всего дня. Детали: классическая шнуровка и на липучке, текстильная подкладка, резиновая подошва, литая стелька из ЭВА. Данный товар является частью проекта Lamoda planet - специального раздела нашего каталога, где мы собрали экологичные, этичные, инклюзивные и благотворительные товары. Товар произведен c использованием материалов, сертифицированных по стандарту Leather Working Group. Это означает, что при производстве кожаных изделий бренд поддерживает самые передовые протоколы по охране окружающей среды, специально разработанные для кожевенной промышленности. Выбирая этот товар, вы бережете планету.',
      },
      {
        name: 'ORIGINALS NITEBALL', mark_id: 2, price: 7600, description: 'Кроссовки adidas Niteball выполнены из натуральной кожи и текстиля. Модель с баскетбольным прошлым и современным дизайном из настоящего подойдёт для любителей яркого ретро. Кроссовки вдохновлены стритболом и баскетболом. Созданы под вдохновением от Streetball и Nite Jogger и призваны покорять улицы большого города. Яркая эстетика, агрессивный силуэт, комфорт, контраст и три полоски, светоотражающие детали.        ',
      },
      {
        name: 'ORIGINALS SUPER STAR', mark_id: 2, price: 8000, description: 'Модель, созданная в 1969 году, врывается в актуальные аутфиты с привычным визуалом и завышенной платформой. Кроссовки adidas Superstar XLG выполнены из сочетания натуральной и искусственной кожи. Цепкий протектор на резиновой подошве обеспечивает уверенность каждому шагу. Шнуровка отвечает за плотную посадку по стопе. Узнаваемый мысок-ракушка и ленедарные «три полоски» формируют привычный образ, который идеально вписывается в любой гардероб.',
      },
      {
        name: 'ORIGINALS OZELIA', mark_id: 2, price: 7000, description: 'Мода 90-х остается в тренде. Почувствуйте яркую энергетику того десятилетия в кроссовках adidas Ozelia. Верх из текстиля и кожи с литыми вставками сочетает ретро-дизайн и футуристические линии. Амортизация Adiprene обеспечивает комфорт в течение всего дня, чтобы вы смогли демонстрировать свой модный стиль с утра и до самого вечера. Модель частично выполнена из переработанного материала, который был создан из отходов производства, например, обрезков ткани, а также из вторичных бытовых отходов с целью сокращения производства первичных тканей и снижения негативного воздействия на экологию.',
      },
      {
        name: '530', mark_id: 3, price: 6780, description: 'Беговые кроссовки конца 90-х-начала 2000-х стали настоящим хитом и абсолютным хэдлайнером в коллекциях сникерхедов. Яркий представитель «daddy shoes», модель New Balance 530 изготовлена из мягкой сетчатой ткани и дополнена вставками из искусственной кожи. Сочетание этих материалов позволяет с комфортом носить кроссовки каждый день, ведь они активно пропускают воздух и сохраняют эстетичный внешний вид. Система амортизации ABZORB®, зашитая в ударопрочную пенную подошву, отвечает за мягкость и отзывчивость. Резиновая подметка с глубокими протекторами минимизирует скольжение и придает уверенности каждому шагу.',
      },
      {
        name: '574', mark_id: 3, price: 68000, description: 'New Balance 574 — классические беговые кроссовки, разработанные в 80-х годах прошлого века. Тогда они мгновенно завоевали популярность и до сих пор остаются ключевым силуэтом в классической линейке New Balance. В этой паре 574 использована натуральная замша и текстиль с плотным плетением. За амортизацию и стабилизацию при ходьбе отвечают межподошва из ЭВА с технологией ENCAP®, сочетающей мягкий внутренний материал и жесткий кант, удерживающий стопу.',
      },
      {
        name: '996', mark_id: 3, price: 7600, description: 'Созданная для беговых дорожек, модель New Balance 996 стала той спортивной обувью, которая прекрасно вписалась в стиль streetwear. От начала до сегодняшнего дня - вот все, что вам нужно знать. Модель New Balance 996 - это классический стиль и крой кроссовок, обеспечивающий их владельцу поддержку и комфорт, но при этом не нарушающий его стиль. Нетрудно понять, почему они не теряют своей актуальности. ',
      },
      {
        name: '373"', mark_id: 3, price: 8000, description: 'C момента основания в 1906 году бостонская компания New Balance стремилась к лидерству. Сначала это были стельки и поддерживающие аксессуары для стопы под руководством английского эмигранта Уильяма Дж. Райли, затем мелкое производство спортивной обуви дочери Элеоноры и её мужа Пола Кида. Но по-настоящему бренд Нью Беленс развернулся в 1972 году, когда компанию купил бизнесмен Джеймс Дэвис, превративший её в транснациональную корпорацию. Современное переиздание силуэта кроссовок New Balance 373 является отсылкой к тому времени.',
      },
      {
        name: '998', mark_id: 3, price: 7000, description: 'В бурные 90-е появились сотни кроссовок, но остались актуальными лишь десятки. New Balance, пожалуй, действовали аккуратнее всех — практически каждый их релиз за последние пятьдесят лет представляет собой выверенную комбинацию технологий и стиля. Кроссовки New Balance 998, вышедшие в 1993 году, являются одной из таких комбинаций.',
      },
    ]);

    await Photo.bulkCreate([
      {
        name: 'mainPhoto',
        photo: '/image/airForce_1.jpg',
        model_id: 1,
      },
      {
        name: 'two',
        photo: '/image/airForce_2.jpg',
        model_id: 1,
      },
      {
        name: 'three',
        photo: '/image/airForce_3.jpg',
        model_id: 1,
      },
      {
        name: 'four',
        photo: '/image/airForce_4.jpg',
        model_id: 1,
      },
      {
        name: 'five',
        photo: '/image/airForce_5.jpg',
        model_id: 1,
      },
      {
        name: 'six',
        photo: '/image/airForce_6.jpg',
        model_id: 1,
      },
      {
        name: 'mainPhoto',
        photo: '/image/goreTex_1.jpg',
        model_id: 2,
      },
      {
        name: 'two',
        photo: '/image/goreTex_2.jpg',
        model_id: 2,
      },
      {
        name: 'three',
        photo: '/image/goreTex_3.jpg',
        model_id: 2,
      },
      {
        name: 'four',
        photo: '/image/goreTex_4.jpg',
        model_id: 2,
      },
      {
        name: 'five',
        photo: '/image/goreTex_5.jpg',
        model_id: 2,
      },
      {
        name: 'six',
        photo: '/image/goreTex_6.jpg',
        model_id: 2,
      },
      {
        name: 'mainPhoto',
        photo: '/image/trainer_1.jpg',
        model_id: 3,
      },
      {
        name: 'two',
        photo: '/image/trainer_2.jpg',
        model_id: 3,
      },
      {
        name: 'three',
        photo: '/image/trainer_3.jpg',
        model_id: 3,
      },
      {
        name: 'four',
        photo: '/image/trainer_4.webp',
        model_id: 3,
      },
      {
        name: 'five',
        photo: '/image/trainer_5.webp',
        model_id: 3,
      },
      {
        name: 'six',
        photo: '/image/trainer_6.webp',
        model_id: 3,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 4,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 4,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 4,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 4,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 4,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 4,
      },
      {
        name: 'mainPhoto',
        photo: '/image/airForce_1.jpg',
        model_id: 5,
      },
      {
        name: 'two',
        photo: '/image/airForce_2.jpg',
        model_id: 5,
      },
      {
        name: 'three',
        photo: '/image/airForce_3.jpg',
        model_id: 5,
      },
      {
        name: 'four',
        photo: '/image/airForce_4.jpg',
        model_id: 5,
      },
      {
        name: 'five',
        photo: '/image/airForce_5.jpg',
        model_id: 5,
      },
      {
        name: 'six',
        photo: '/image/airForce_6.jpg',
        model_id: 5,
      },
      {
        name: 'mainPhoto',
        photo: '/image/goreTex_1.jpg',
        model_id: 6,
      },
      {
        name: 'two',
        photo: '/image/goreTex_2.jpg',
        model_id: 6,
      },
      {
        name: 'three',
        photo: '/image/goreTex_3.jpg',
        model_id: 6,
      },
      {
        name: 'four',
        photo: '/image/goreTex_4.jpg',
        model_id: 6,
      },
      {
        name: 'five',
        photo: '/image/goreTex_5.jpg',
        model_id: 6,
      },
      {
        name: 'six',
        photo: '/image/goreTex_6.jpg',
        model_id: 6,
      },
      {
        name: 'mainPhoto',
        photo: '/image/trainer_1.jpg',
        model_id: 7,
      },
      {
        name: 'two',
        photo: '/image/trainer_2.jpg',
        model_id: 7,
      },
      {
        name: 'three',
        photo: '/image/trainer_3.jpg',
        model_id: 7,
      },
      {
        name: 'four',
        photo: '/image/trainer_4.webp',
        model_id: 7,
      },
      {
        name: 'five',
        photo: '/image/trainer_5.webp',
        model_id: 7,
      },
      {
        name: 'six',
        photo: '/image/trainer_6.webp',
        model_id: 7,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 8,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 8,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 8,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 8,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 8,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 8,
      },
      {
        name: 'mainPhoto',
        photo: '/image/airForce_1.jpg',
        model_id: 9,
      },
      {
        name: 'two',
        photo: '/image/airForce_2.jpg',
        model_id: 9,
      },
      {
        name: 'three',
        photo: '/image/airForce_3.jpg',
        model_id: 9,
      },
      {
        name: 'four',
        photo: '/image/airForce_4.jpg',
        model_id: 9,
      },
      {
        name: 'five',
        photo: '/image/airForce_5.jpg',
        model_id: 9,
      },
      {
        name: 'six',
        photo: '/image/airForce_6.jpg',
        model_id: 9,
      },
      {
        name: 'mainPhoto',
        photo: '/image/goreTex_1.jpg',
        model_id: 10,
      },
      {
        name: 'two',
        photo: '/image/goreTex_2.jpg',
        model_id: 10,
      },
      {
        name: 'three',
        photo: '/image/goreTex_3.jpg',
        model_id: 10,
      },
      {
        name: 'four',
        photo: '/image/goreTex_4.jpg',
        model_id: 10,
      },
      {
        name: 'five',
        photo: '/image/goreTex_5.jpg',
        model_id: 10,
      },
      {
        name: 'six',
        photo: '/image/goreTex_6.jpg',
        model_id: 10,
      },
      {
        name: 'mainPhoto',
        photo: '/image/trainer_1.jpg',
        model_id: 11,
      },
      {
        name: 'two',
        photo: '/image/trainer_2.jpg',
        model_id: 11,
      },
      {
        name: 'three',
        photo: '/image/trainer_3.jpg',
        model_id: 11,
      },
      {
        name: 'four',
        photo: '/image/trainer_4.webp',
        model_id: 11,
      },
      {
        name: 'five',
        photo: '/image/trainer_5.webp',
        model_id: 11,
      },
      {
        name: 'six',
        photo: '/image/trainer_6.webp',
        model_id: 11,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 12,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 12,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 12,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 12,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 12,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 12,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 13,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 13,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 13,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 13,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 13,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 13,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 14,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 14,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 14,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 14,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 14,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 14,
      },
      {
        name: 'mainPhoto',
        photo: '/image/blazer_1.jpg',
        model_id: 15,
      },
      {
        name: 'two',
        photo: '/image/blazer_2.jpg',
        model_id: 15,
      },
      {
        name: 'three',
        photo: '/image/blazer_3.jpg',
        model_id: 15,
      },
      {
        name: 'four',
        photo: '/image/blazer_4.jpg',
        model_id: 15,
      },
      {
        name: 'five',
        photo: '/image/blazer_5.jpg',
        model_id: 15,
      },
      {
        name: 'six',
        photo: '/image/blazer_6.jpg',
        model_id: 15,
      },
    ]);

    await Count.bulkCreate([
      { count: 0 },
      { count: 1 },
      { count: 2 },
      { count: 3 },
      { count: 4 },
      { count: 5 },
      { count: 6 },
      { count: 7 },
    ]);

    await Size.bulkCreate([
      { size: 36 },
      { size: 36.5 },
      { size: 37 },
      { size: 37.5 },
      { size: 38 },
      { size: 38.5 },
      { size: 39 },
      { size: 39.5 },
      { size: 40 },
      { size: 40.5 },
      { size: 41 },
      { size: 41.5 },
      { size: 42 },
      { size: 42.5 },
      { size: 43 },
      { size: 43.5 },
      { size: 44 },
      { size: 44.5 },
      { size: 45 },
      { size: 45.5 },
      { size: 46 },
      { size: 47 },
      { size: 48 },
    ]);

    await CountSize.bulkCreate([
      { size_id: 1, model_id: 1, count_id: 2 },
      { size_id: 5, model_id: 1, count_id: 4 },
      { size_id: 14, model_id: 1, count_id: 3 },
      { size_id: 19, model_id: 1, count_id: 2 },
      { size_id: 3, model_id: 2, count_id: 1 },
      { size_id: 11, model_id: 2, count_id: 4 },
      { size_id: 19, model_id: 2, count_id: 6 },
      { size_id: 20, model_id: 2, count_id: 4 },
      { size_id: 8, model_id: 3, count_id: 2 },
      { size_id: 9, model_id: 3, count_id: 2 },
      { size_id: 3, model_id: 3, count_id: 2 },
      { size_id: 4, model_id: 3, count_id: 1 },
      { size_id: 20, model_id: 4, count_id: 3 },
      { size_id: 9, model_id: 4, count_id: 3 },
      { size_id: 1, model_id: 4, count_id: 3 },
      { size_id: 3, model_id: 4, count_id: 2 },
      { size_id: 12, model_id: 5, count_id: 3 },
      { size_id: 2, model_id: 5, count_id: 3 },
      { size_id: 16, model_id: 5, count_id: 3 },
      { size_id: 2, model_id: 5, count_id: 6 },
      { size_id: 12, model_id: 6, count_id: 4 },
      { size_id: 19, model_id: 6, count_id: 4 },
      { size_id: 20, model_id: 6, count_id: 4 },
      { size_id: 10, model_id: 6, count_id: 2 },
      { size_id: 19, model_id: 7, count_id: 1 },
      { size_id: 20, model_id: 7, count_id: 3 },
      { size_id: 1, model_id: 7, count_id: 1 },
      { size_id: 5, model_id: 7, count_id: 1 },
      { size_id: 19, model_id: 8, count_id: 4 },
      { size_id: 2, model_id: 8, count_id: 4 },
      { size_id: 3, model_id: 8, count_id: 4 },
      { size_id: 1, model_id: 8, count_id: 2 },
      { size_id: 17, model_id: 9, count_id: 3 },
      { size_id: 15, model_id: 9, count_id: 3 },
      { size_id: 4, model_id: 9, count_id: 3 },
      { size_id: 5, model_id: 9, count_id: 1 },
    ]);
  },

  async down() {
    await Mark.destroy({ truncate: { cascade: true } });
    await Size.destroy({ truncate: { cascade: true } });
    await Photo.destroy({ truncate: { cascade: true } });
    await ModelSneaker.destroy({ truncate: { cascade: true } });
  },
};
