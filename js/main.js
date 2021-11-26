svgTrashCan = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`;
svgEditPen = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>`;
/**
 * Met en majuscule la première lettre d'une chaine de caractère
 * 
 * @param {String} stToUcfirst chaine de caractere à transformer
 * @return {String} chaine de caratere avec la première lettre en majuscule
 */
 function UcFirst(stToUcfirst){
    //Met en majuscule la première lettre de la chaine de caractère
    let stUcFirst;

    stUcFirst = stToUcfirst.slice(0, 1).toUpperCase() + stToUcfirst.slice(1).toLowerCase();
    
    return stUcFirst;
}

/**
 * Ajoute le header sur la page où la fonction est appelée
 */
function getHeader(){
    let header = document.querySelector('header');
    //variables pour la nav
    let nav, menuToggle, checkbox, spanTop, spanMiddle, spanBottom, ul, aIndex, aProjet, aCv, liIndex, liProjet, liCv;
    //variables pour le title
    let accueil, title, h1, p;

    //Création de la nav
    nav = document.createElement('nav');
    nav.setAttribute('role', 'navigation');

    //Création de la div id="menuToggle"
    menuToggle = document.createElement('div');
    menuToggle.setAttribute('id', 'menuToggle');

    //Création de la checkbox
    checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    menuToggle.appendChild(checkbox);

    //Création des 3 span
    spanTop = document.createElement('span');
    spanMiddle = document.createElement('span');
    spanBottom = document.createElement('span');

    menuToggle.appendChild(spanTop);
    menuToggle.appendChild(spanMiddle);
    menuToggle.appendChild(spanBottom);

    //Création des liens de navigation
    ul = document.createElement('ul');
    ul.setAttribute('id', 'menu');

    //Ajout du lien vers l'accueil
    aIndex = document.createElement('a');
    aIndex.setAttribute('href', './index.html');

    liIndex = document.createElement('li');
    liIndex.textContent = "Accueil";

    aIndex.appendChild(liIndex);

    ul.appendChild(aIndex);

    //Ajout du lien vers les projets
    aProjet = document.createElement('a');
    aProjet.setAttribute('href', './projets.html');

    liProjet = document.createElement('li');
    liProjet.textContent = "Projets";

    aProjet.appendChild(liProjet);

    ul.appendChild(aProjet);

    //Ajout du lien vers le CV
    aCv = document.createElement('a');
    aCv.setAttribute('href', './cv.html');

    liCv = document.createElement('li');
    liCv.textContent = "CV";

    aCv.appendChild(liCv);

    ul.appendChild(aCv);

    //Ajout des liens dans la div id="menuToggle"
    menuToggle.appendChild(ul);

    //Ajout de la div id="menuToggle" dans la nav
    nav.appendChild(menuToggle);

    //Ajout de la nav dans le header
    header.appendChild(nav);

    //Creéation de la div id="accueil"
    accueil = document.createElement('div');
    accueil.setAttribute('id', 'accueil');

    //Creéation de la div class="title"
    title = document.createElement('div');
    title.setAttribute('class', 'title');

    //Création du h1
    h1 = document.createElement('h1');
    h1.textContent = `HOUÉE Adrien`;

    title.appendChild(h1);

    //Création du p
    p = document.createElement('p');
    p.textContent = `Bachelor Développeur Full-Stack`

    title.appendChild(p);

    //Ajout de title dans accueil
    accueil.appendChild(title);

    //Ajout de accueil au header
    header.appendChild(accueil);
}

/**
 * Créé un enregistrement
 * 
 * @param {String} path chemin d'accès aux données
 * @param {String} arData id du formulaire à utiliser
 */
async function createJson(path, arData){
    let url, params, headers;

    headers = new Headers();
    headers.append("Content-Type", "application/json");

    url = 'http://localhost:3000/'+path;

    params = {
        method: 'POST',
        body: JSON.stringify(arData),
        headers: headers
    };

    req = await fetch(url, params)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(error =>{
        console.log(`createJson - Il y a eu un problème avec l'opération fetch: ${error.message}`);
    });
}

/**
 * Permet de récupérer les données en base de données
 * 
 * @param {String} path chemin d'accès aux données
 * @param {String} searchTerm terme de recherche pour la récupération de données
 * @returns {Array} tableau contenant les données récupérées
 */
async function readJson(path, searchTerm = undefined){
    let arJson;
    let req;
    let url;

    url = 'http://localhost:3000/'+path;

    if(searchTerm != undefined){
        url += '/'+searchTerm;
    }
    
    req = await fetch(url, {method: 'GET'})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        arJson = json;
    })
    .catch(error =>{
        console.log(`readJson - Il y a eu un problème avec l'opération fetch: ${error.message}`);
    });

    return arJson;
}

/**
 * Met à jour un enregistrement
 * 
 * @param {String} path chemin d'accès aux données
 * @param {String} id identifiant unique de la ligne à modifié
 * @param {Object} form nouvelles informations à intégrer
 */
async function updateJson(path, id, arData){
    let url, params, formData, headers;

    headers = new Headers();
    headers.append("Content-Type", "application/json");

    url = 'http://localhost:3000/'+path+'/'+id;

    params = {
        method: 'PUT',
        body: JSON.stringify(arData),
        headers: headers
    };

    req = await fetch(url, params)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(error =>{
        console.log(`updateJson - Il y a eu un problème avec l'opération fetch: ${error.message}`);
    });
}

/**
 * Supprime un enregistrement
 * 
 * @param {String} path chemin d'accès aux données
 * @param {String} id identifiant unique de la ligne à modifié
 */
async function deleteJson(path, id){
    let url, params;

    url = 'http://localhost:3000/'+path+'/'+id;

    params = {
        method: 'DELETE'
    };

    req = await fetch(url, params)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(error =>{
        console.log(`deleteJson - Il y a eu un problème avec l'opération fetch: ${error.message}`);
    });
}

/**
 * Affiche les projets
 * 
 * @param {element} target cible de l'affichage des projets
 */
async function displayProjects(target){
    let article, title, image;
    let arProjects = await readJson('projects')
    
    arProjects.forEach(project => {
        //Création de l'article
        article = document.createElement('article');
        article.classList.add('article-projet');
        article.setAttribute('data-idproject', project.id);

        //Redirection au click sur l'article
        article.addEventListener('click', function(){
            window.location = 'projet.html?id_projet='+project.id;
        });

        //Création du titre de l'article
        title = document.createElement('h3');
        title.textContent = project.name;

        //Création de l'image
        image = document.createElement('img');
        image.src = `img/${project.medias[0]}`;

        //Ajout des éléments dans l'article
        article.appendChild(image);
        article.appendChild(title);

        //Ajout de l'article à la cible
        target.appendChild(article);
    });
}

/**
 * Met à jour les values des inputs de la page courante
 * 
 * @param {String} target cible de l'affichage
 * @param {String} path chemin d'accès aux données
 * @param {String} searchTerm terme de recherche pour la récupération de données
 */
async function fillInput(target, path, searchTerm = undefined){
    let arJson = await readJson(path, searchTerm);
    let arInput;

    arInput = document.querySelectorAll(`#${target} input, #${target} textarea`);

    arInput.forEach(input => {
        if(input.tagName == 'INPUT' || input.tagName == 'TEXTAREA'){
            input.value = arJson[input.name];
        }
    });
}

/**
 * Affiche les medias du projet recherché
 * 
 * @param {String} path chemin d'accès aux données
 * @param {String} searchTerm terme de recherche pour la récupération de données
 */
async function displayProjectMedia(path, searchTerm){
    let arJson = await readJson(path, searchTerm);
    let arMedias, mediasProject;
    let img

    mediasProject = document.querySelector('.mediasProject');

    arMedias = arJson.medias;

    arMedias.forEach(media => {
        //Création de l'image
        img = document.createElement('img');
        img.src = `img/${media}`;

        mediasProject.appendChild(img);
    });
}

/**
 * Active les champs de formulaire sur une page
 * 
 * @param {String} idForm id du formulaire à activer
 */
function enableForm(idForm){
    let arInput, formAction;

    arInput = document.querySelectorAll(`#${idForm} input, #${idForm} textarea`);

    //Active les inputs
    arInput.forEach(input => {
        input.disabled = false;
    });

    //Affiche les action de formulaire
    formAction = document.querySelector(`#${idForm} .formAction`);
    formAction.classList.remove('hide');
}

/**
 * Désactive les champs de formulaire sur une page
 * 
 * @param {String} idForm id du formulaire à desactiver
 */
function disableForm(idForm){
    let arInput;

    arInput = document.querySelectorAll(`#${idForm} input, #${idForm} textarea`);

    //Désactive les inputs
    arInput.forEach(input => {
        input.disabled = true;
    });

    //Cache les action de formulaire
    formAction = document.querySelector(`#${idForm} .formAction`);
    formAction.classList.add('hide');
}

/** 
 * Récupère la valeur de chacun des inputs d'un formulaire et en forme un tableau
 * 
 * @param {String} idForm identifiant du formulaire
 * @return {Array} tableau associatif contenant les valeurs des inputs d'un formulaire
 */
function formInputToArray(idForm){
    let arInputForm, arData, index;

    arInputForm = document.querySelectorAll(`#${idForm} input, #${idForm} textarea`);
    arData = {};
    index = "";

    arInputForm.forEach(input => {
        index = input.name;
        value = input.value;

        arData[index] = value;
    });

    return arData;
}

/**
 * Affiche les experiences
 * 
 * @param {String} target cible d'affichage des experiences
 * @param {HTMLElement} form formulaire correspondant
 */
async function loadDivExperiences(target, form){
    let arExperiences;

    let divExperience, titleExperience, title, place, date, description, divAction, editButton, deleteButton;

    arExperiences = await readJson('experiences');

    arExperiences.forEach(experience => {
        //Création de la divExperience
        divExperience = document.createElement('div');
        divExperience.classList.add('experience');

        //Création de la div title
        title = document.createElement('div');
        title.classList.add('row');
        title.classList.add('flexBetween');

        //Création du titleExperience
        titleExperience = document.createElement('h4');
        titleExperience.textContent = `${experience.job} - ${experience.company}`;

        title.appendChild(titleExperience);

        //Création de la divAction
        divAction = document.createElement('div');
        divAction.style.width = `98px`;

        //Création du editButton
        editButton = document.createElement('button');
        editButton.type = "button";
        editButton.innerHTML = svgEditPen;
        editButton.classList.add('button');

        editButton.addEventListener('click', function(event){
            //Annule le comportement de base
            event.preventDefault();

            //Rempli le formulaire correspondant
            clickEditButton(form, experience);
        });

        divAction.appendChild(editButton);

        //Création du deleteButton
        deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.innerHTML = svgTrashCan;
        deleteButton.classList.add('button');
        deleteButton.classList.add('buttonRouge');

        deleteButton.addEventListener('click', async function(event){
            //Annule le fonctionnement de base
            event.preventDefault();

            //Supprime l'entré
            await deleteJson('experiences', experience.id);

            //Actualise le bloc
            document.querySelectorAll('.experience').forEach(e => e.remove());
            
            loadDivExperiences(target)
        });

        divAction.appendChild(deleteButton);

        title.appendChild(divAction);

        divExperience.appendChild(title);

        //Création de la place
        place = document.createElement('p');
        place.textContent = experience.place;

        divExperience.appendChild(place);

        //Création de la date
        date = document.createElement('p');
        date.classList.add('experienceDate');
        date.textContent = experience.date;

        divExperience.appendChild(date);

        //Création de la description
        description = document.createElement('p');
        description.innerHTML = experience.description;

        divExperience.appendChild(description);

        target.appendChild(divExperience);
    });
}

/**
 * Affiche les formations
 * 
 * @param {String} target cible d'affichage des formations
 * @param {HTMLElement} form formulaire correspondant
 */
async function loadDivFormations(target, form){
    let arFormations;

    let divFormations, title, titleFormation, place, date, divAction, editButton, deleteButton;

    arFormations = await readJson('formations');

    arFormations.forEach(formation => {
        //Création de la divFormations
        divFormations = document.createElement('div');
        divFormations.classList.add('formation');

        //Création de la div title
        title = document.createElement('div');
        title.classList.add('row');
        title.classList.add('flexBetween');

        //Création du titleFormation
        titleFormation = document.createElement('h4');
        titleFormation.textContent = formation.name;

        title.appendChild(titleFormation);

        //Création de la divAction
        divAction = document.createElement('div');
        divAction.style.width = `98px`;

        //Création du editButton
        editButton = document.createElement('button');
        editButton.type = "button";
        editButton.innerHTML = svgEditPen;
        editButton.classList.add('button');

        editButton.addEventListener('click', function(event){
            //Annule le comportement de base
            event.preventDefault();

            //Rempli le formulaire correspondant
            clickEditButton(form, formation);
        });

        divAction.appendChild(editButton);

        //Création du deleteButton
        deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.innerHTML = svgTrashCan;
        deleteButton.classList.add('button');
        deleteButton.classList.add('buttonRouge');

        deleteButton.addEventListener('click', async function(event){
            //Annule le fonctionnement de base
            event.preventDefault();

            //Supprime l'entré
            await deleteJson('formations', formation.id);

            //Actualise le bloc
            document.querySelectorAll('.formation').forEach(e => e.remove());
            
            loadDivFormations(target)
        });

        divAction.appendChild(deleteButton);

        title.appendChild(divAction);

        divFormations.appendChild(title);

        //Création de la place
        place = document.createElement('p');
        place.textContent = formation.place;

        divFormations.appendChild(place);

        //Création de la date
        date = document.createElement('p');
        date.classList.add('formationDate');
        date.textContent = formation.date;

        divFormations.appendChild(date);

        target.appendChild(divFormations);
    });
}

/**
 * Affiche les skills
 * 
 * @param {String} target cible d'affichage des skills
 * @param {HTMLElement} form formulaire correspondant
 */
async function loadDivSkills(target, form){
    let arSkills;

    let divSkill, progress, titleSkill, leftDiv, title, percent, editButton, deleteButton;

    arSkills = await readJson('skills');

    arSkills.forEach(skill => {
        //Création de la skill
        divSkill = document.createElement('div');
        divSkill.classList.add('skill');

        //Création de la div titleSkill
        titleSkill = document.createElement('div');
        titleSkill.classList.add("titleSkill");
        titleSkill.classList.add("row");
        titleSkill.classList.add("flexBetween");

        //Création de la leftDiv
        leftDiv = document.createElement('div');
        leftDiv.classList.add('leftDiv');
        leftDiv.classList.add('row');

        //Création du title
        title = document.createElement('p');
        title.textContent = skill.name;

        leftDiv.appendChild(title);

        //Création du editButton
        editButton = document.createElement('button');
        editButton.type = "button";
        editButton.innerHTML = svgEditPen;
        editButton.classList.add('button');

        editButton.addEventListener('click', function(event){
            //Annule le comportement de base
            event.preventDefault();

            //Rempli le formulaire correspondant
            clickEditButton(form, skill);
        });

        leftDiv.appendChild(editButton);

        //Création du deleteButton
        deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.innerHTML = svgTrashCan;
        deleteButton.classList.add('button');
        deleteButton.classList.add('buttonRouge');

        deleteButton.addEventListener('click', async function(event){
            //Annule le fonctionnement de base
            event.preventDefault();

            //Supprime l'entré
            await deleteJson('skills', skill.id);

            //Actualise le bloc
            document.querySelectorAll('.skill').forEach(e => e.remove());

            loadDivSkills(target)
        });

        leftDiv.appendChild(deleteButton);

        titleSkill.appendChild(leftDiv);

        //Création du pourcentage
        percent = document.createElement('p');
        percent.textContent = `${skill.level} %`;

        titleSkill.appendChild(percent);

        divSkill.appendChild(titleSkill);

        //Création de la progress
        progress = document.createElement('progress');
        progress.max = "100";
        progress.value = skill.level;

        divSkill.appendChild(progress);

        target.appendChild(divSkill);
    });
}

/**
 * Affiche les diplômes
 * 
 * @param {String} target cible d'affichage des diplômes
 * @param {HTMLElement} form formulaire correspondant
 */
async function loadDivDiplomes(target, form){
    let arDiplomes;

    let divDiplome, title, titleDiplome, place, date, divAction, editButton, deleteButton;

    arDiplomes = await readJson('diplomes');

    arDiplomes.forEach(diplome => {
        //Création de la divDiplome
        divDiplome = document.createElement('div');
        divDiplome.classList.add('diplome');

        //Création de la div title
        title = document.createElement('div');
        title.classList.add('row');
        title.classList.add('flexBetween');

        //Création du titleDiplome
        titleDiplome = document.createElement('h4');
        titleDiplome.textContent = diplome.name;

        title.appendChild(titleDiplome);

        //Création de la divAction
        divAction = document.createElement('div');
        divAction.style.width = `98px`;

        //Création du editButton
        editButton = document.createElement('button');
        editButton.type = "button";
        editButton.innerHTML = svgEditPen;
        editButton.classList.add('button');

        editButton.addEventListener('click', function(event){
            //Annule le comportement de base
            event.preventDefault();

            //Rempli le formulaire correspondant
            clickEditButton(form, diplome);
        });

        divAction.appendChild(editButton);

        //Création du deleteButton
        deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.innerHTML = svgTrashCan;
        deleteButton.classList.add('button');
        deleteButton.classList.add('buttonRouge');

        deleteButton.addEventListener('click', async function(event){
            //Annule le fonctionnement de base
            event.preventDefault();

            //Supprime l'entré
            await deleteJson('diplomes', diplome.id);

            //Actualise le bloc
            document.querySelectorAll('.diplome').forEach(e => e.remove());
            
            loadDivDiplomes(target)
        });

        divAction.appendChild(deleteButton);

        title.appendChild(divAction);

        divDiplome.appendChild(title);

        //Création de la place
        place = document.createElement('p');
        place.textContent = diplome.place;

        divDiplome.appendChild(place);

        //Création de la date
        date = document.createElement('p');
        date.classList.add('diplomeDate');
        date.textContent = diplome.date;

        divDiplome.appendChild(date);

        target.appendChild(divDiplome);
    });
}

async function createTableInfo(target, path){
    let arJson, key, value;
    let table, tr, leftTd, rightTd, label, input;

    arJson = await readJson(path);

    //Création du table
    table = document.createElement('table');
    table.classList.add('tableInfo');

    for(key in arJson){
        value = arJson[key];

        //Création de la ligne
        tr = document.createElement('tr');

        //Création de la td de gauche
        leftTd = document.createElement('td');

        //Création du label
        label = document.createElement('label');
        label.textContent = UcFirst(key);

        leftTd.appendChild(label);

        tr.appendChild(leftTd);

        //Création de la td de droite
        rightTd = document.createElement('td');

        //Création de l'input
        input = document.createElement('input');
        input.type = "text";
        input.value = value;
        input.disabled = true;

        rightTd.appendChild(input);

        tr.appendChild(rightTd);

        table.appendChild(tr);
    }

    target.appendChild(table);
}

/**
 * Préremplie le formulaire du block correspondant
 * 
 * @param {HTMLElement} form formulaire correspondant au block
 * @param {Array} data tableau contenant les informations pour préremplir le formulaire
 */
function clickEditButton(form, data){
    //Rempli le formulaire avec les informations correspondante
    let arInput = form.querySelectorAll('input, textarea');

    arInput.forEach(input => {
        input.value = data[input.name];
    });
}