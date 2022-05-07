ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=7ea74aba-b233-418c-a2a5-f95b9b2330db&lang=ru_RU').then(maps => {
  const center = [55.68381882889063, 37.72960898280328];
 function init() {
  const map = new maps.Map('map-greenGarden', {
    center,
    zoom: 18
  });

  const placemark = new maps.Placemark(center, {}, {
    iconLayout: 'default#image',
    iconImageHref: '../../../icons/iconLocationFill.svg',
    iconImageSize: [32, 45],
    iconImageOffset: [0, -30]
  });

  map.geoObjects.add(placemark);
}
  maps.ready(init);
});

