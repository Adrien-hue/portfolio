//Définition de la page de base
page.base('/');

//Définition des différentes routes
page('/', index);
page('/projet', projet);
page('/cv', cv);
page({ dispatch: false });

function index() {
  document.querySelector('main')
        .textContent = 'La page index';
        console.log("ok");
}

function projet() {
  document.querySelector('main')
        .textContent = 'La page projet';
}

function cv(){
    document.querySelector('main')
        .textContent = 'La page cv';
}