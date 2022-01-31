var Product = require('../models/product');
var mongoose = require('mongoose');
const { exists } = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: "https://a.allegroimg.com/s512/03389b/c037d6a545fd8826ffd654662415/Kubek-PREZENT-SW-JAN-PAWEL-II-PAPIEZ-Z-POLSKI-JP",
        title: 'Kubek z wizerunkiem św. Jana Pawła II',
        description: 'Wymiary standardowe, druk kolorowy',
        price: 21.37
    }),
    new Product({
        imagePath: "https://kubaradewocjonalia.pl/environment/cache/images/0_0_productGfx_13167/5_JPII2_a.jpg",
        title: 'Koszulka z twarzą św. Jana Pawła II',
        description: 'Rozmiar M, bawełna',
        price: 30.00
    }),
    new Product({
        imagePath: 'https://a.allegroimg.com/original/114cf7/bb004da144d8adc61bacd6928415/Nerka-Jan-Pawel-II-JP2-Dodaj-Napis',
        title: 'Nerka Jan Paweł II',
        description: 'Torba biodrówka z nadrukiem FullPrint! Klasyczna nerka z dwoma kieszeniami.',
        price: 32.00
    }),
    new Product({
        imagePath: "https://regen.cupsell.net/product/4013124/number/0?h=420&fit=fill",
        title: 'Maseczka Jan Paweł II',
        description: 'Trzywawrstwowa maseczka ochronna',
        price: 19.00
    }),
    new Product({
        imagePath: "https://b.allegroimg.com/s512/03130d/c6552a854e4394c2128f544e208b/WOREK-PLECAK-NADRUK-JAN-PAWEL-II-PAPIEZ-POLAK",
        title: 'Torba - plecak Jan Paweł II',
        description: 'Nadruk typu FullPrint, regulacja',
        price: 29.00
    }),
    new Product({
        imagePath: "https://regen.cupsell.net/product/4427717/number/0?h=420&fit=fill",
        title: 'Etui Jan Paweł II',
        description: 'Etui pasuje do IPhone 11',
        price: 13.00
    }),
    new Product({
        imagePath: "https://allegro.pl/oferta/czapka-z-daszkiem-czarna-papiez-papaj-01-10732046518?utm_feed=aa34192d-eee2-4419-9a9a-de66b9dfae24&utm_term=desc-yes&utm_source=google&utm_medium=cpc&utm_campaign=_md_gd_galanteria_pla_ss&ev_adgr=Galanteria&ev_campaign_id=14645773670&gclid=CjwKCAiA3L6PBhBvEiwAINlJ9LXeWerYzeRwjtfwk5SA_fvvYIzxUV6plefGz_7GWzne7OZRp6MOuxoCUfsQAvD_BwE",
        title: 'Czapka z daszkiem Jan Paweł II',
        description: 'One size, bawełna',
        price: 13.00
    })
];

var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done ++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
