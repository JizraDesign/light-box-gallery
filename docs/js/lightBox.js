// Light box Gallery ceada por Jizra Diseño Web® para https://jizratest.eu5.org todos los derechos reservados©
// >>>>> -->>>>> ----- funcion para estructurar galeria ----- <<<<<-- <<<<<

//     Uso
//   ------
//   Cuatro parámetros :
//   'parent' = el elemento que necesita ser envuelto
//   'wrapper' = el elemento que envolverá al parent
//   'atributo' = el atributo que necesita que tenga este elemento
//   'attributevalue' = el valor del atributo que acaba de crear
 
//   Ejemplo
//   -------
//   wrapInner ('body', 'div', 'class', 'my-class');
console.log('%c versionde de desarrollo','background: #ff0000; color: #fff');
console.log('%c If you have to ask, you\'ll never know. If you know, you need only ask.','background: #000; color: #fff');
console.log('%c Gallery Light Box by https://fb.me/jizradesign','background: #000; color: #fff');
// >>>>> -->>>>> ----- estructura de galleria ----- <<<<<-- <<<<<

const contGall = document.querySelector("#jd-cont__gallery");
const imgFront = document.querySelectorAll(".jd-front__img__gallery");

function wrapInner(parent, wrapper, attribute, attributevalue) {
    if(typeof wrapper === "string") {
        wrapper = parent.appendChild(document.createElement(wrapper));
        wrapper.setAttribute(attribute, attributevalue);
    };
};

for(let i = 0; i < imgFront.length; i++){
    if(imgFront[i].hasAttribute("src")){
        wrapInner(contGall, 'section', 'class', `jd-front__item__gallery`);
        let jdGallery = document.querySelectorAll('.jd-front__item__gallery');
        let img = jdGallery[i].appendChild(document.createElement('img'));
            img.setAttribute('loading', 'lazy');
            fetch(imgFront[i].src)
            .then(res => res.blob())
            .then(data => {
                let imgen = URL.createObjectURL(data);
                img.setAttribute('src', imgen);
            });
            if(imgFront[i].dataset.urlImg != ""){
                fetch(imgFront[i].dataset.urlImg)
                .then(res => res.blob())
                .then(data => {
                    let imgen = URL.createObjectURL(data);
                    img.setAttribute('data-url-img', imgen);
                });
            }else{
                img.setAttribute('data-url-img',"");
            };
            img.setAttribute('data-title-img', imgFront[i].dataset.titleImg);
            img.setAttribute('data-desc-img', imgFront[i].dataset.descImg);
            img.setAttribute('alt', imgFront[i].alt);
        imgFront[i].remove();
    };
};

// >>>>> -->>>>> ----- light box ----- <<<<<-- <<<<<

let lightBoxPadre = document.querySelector('body').appendChild(document.createElement('section'));
lightBoxPadre.setAttribute("id","jd-light-box");
lightBoxPadre.setAttribute("class","center");

const imgGallery=document.querySelectorAll('.jd-front__item__gallery');
const lightBox=document.querySelector('#jd-light-box');

for(let i=0;i<imgGallery.length;i++){
    imgGallery[i].addEventListener('click',()=>{
        setTimeout(function(){
            lightbox(i);
        },300);
    });
};
function lightbox(i){
    this.i=i;
    let lightBoxCont=document.createElement('section');
    let dataUrl=document.querySelectorAll('.jd-front__item__gallery img')[i].dataset.urlImg;
    let dataTitle=document.querySelectorAll('.jd-front__item__gallery img')[i].dataset.titleImg;
    let dataDesc=document.querySelectorAll('.jd-front__item__gallery img')[i].dataset.descImg;
    let ubicacionImg="";
    
    if(dataUrl!==""){
        ubicacionImg=dataUrl;
    }else{
        ubicacionImg=document.querySelectorAll('.jd-front__item__gallery img')[i].src;
    };
    
    let panel=` <div id="btn-clouse-lbox"class="center"title="Cerrar"><i class="far fa-times-circle"></i></div>
                    <img id="img-panel"src="${ubicacionImg}">
                    <div class="descripcion">
                        <p class="data-title">${dataTitle}</p>
                        <p class="data-desc">${dataDesc}</p>
                        <p class="data-cont">Imagen ${i+1} de ${imgGallery.length}</p>
                        <span class="e-firm">Gallery by <a href="https://jizratest.eu5.org">Jizra</a></span>
                    </div>
                    <div id="derecha"class="flecha"title="Derecha"><i class="fas fa-chevron-right"></i></div>
                    <div id="izquierda"class="flecha"title="Izquierda"><i class="fas fa-chevron-left"></i></div>
                    <section class="cont__pre-loader">
                        <section class="loader">
                            <span class="loader__span"></span>
                            <span class="loader__span"></span>
                            <section class="jizra__logo">
                                <img loading="lazy" src="https://jizratest.eu5.org/img/diseno-jizra-logo.png" alt="Jizra Logo" class="jizra__logo__img">
                            </section>
                        </section>
                        <section class="loader__texto">
                            <span class="loader__texto__span">L</span>
                            <span class="loader__texto__span">O</span>
                            <span class="loader__texto__span">A</span>
                            <span class="loader__texto__span">D</span>
                            <span class="loader__texto__span">I</span>
                            <span class="loader__texto__span">N</span>
                            <span class="loader__texto__span">G</span>
                            <span class="loader__texto__span">.</span>
                            <span class="loader__texto__span">.</span>
                            <span class="loader__texto__span">.</span>
                        </section>
                    </setion>`;

    if(!document.querySelector('#jd-light-box-cont')){
        lightBox.classList.add('active');
        lightBoxCont.setAttribute("id","jd-light-box-cont");
        lightBoxCont.setAttribute("class","jd-light-box-cont center");
        lightBoxCont.innerHTML=panel;
        lightBox.appendChild(lightBoxCont);

        let imgPanel=document.querySelector('#img-panel');
        imgPanel.addEventListener('load',()=>{
            document.querySelector('.cont__pre-loader').style.display='none';
            setTimeout(function(){
                document.querySelector('#img-panel').classList.add('active');
                document.querySelector('.descripcion').style.width = '100%';
                let flecha = document.querySelectorAll('.flecha');
                flecha.forEach(flechaI => {
                    flechaI.style.display = 'flex';
                })
            },300);
        });
        
        document.querySelector('#btn-clouse-lbox').addEventListener('click',()=>{
            borrarlightbox();
        });
        document.querySelector('#derecha').addEventListener('click',()=>{
            avance(+1);
        });
        document.querySelector('#izquierda').addEventListener('click',()=>{
            avance(-1);
        });
        window.addEventListener('keyup', e=>{    
            teclas(e);
        });
    };
    let letra = document.querySelectorAll('.loader__texto__span');
    for(let i = 0; i < letra.length; i++){
        letra[i].style = `animation: texto 2s ease-in-out ${0.1 * i}s infinite;`
    }
};

// >>>>> -->>>>> ----- controles ----- <<<<<-- <<<<<
    
function borrarlightbox(){
    lightBox.classList.remove('active');
    setTimeout(function(){
        document.querySelector('#jd-light-box-cont').remove();
    },500);
};

function avance(x){
    this.x=x;
    let res = i + x;
    borrarlightbox();
    if(imgGallery[res]){
        setTimeout(function(){
            lightbox(res);
        },500);
    };
    //console.log(res);
};

function teclas(e){    
    if(e.keyCode==27){
        borrarlightbox();
    }/*else if(e.keyCode==39){
        avance(+1);
    }else if(e.keyCode==37){
        avance(-1);
    };
    console.log(e.keyCode);*/
};

// >>>>> -->>>>> ----- animaciones ----- <<<<<-- <<<<<

window.addEventListener('load', e => {
    let img = document.querySelectorAll('.jd-front__item__gallery img');
    img.forEach(imagen => {
        imagen.addEventListener('mouseenter', e => {
            for(imagenes of img){
                imagenes.style.filter = 'grayscale(100%)';
            };
            imagen.style.transform = 'scale(1.5)';
            imagen.style.filter = 'grayscale(0%)';
        });
        imagen.addEventListener('mouseleave', e => {
            for(imagenes of img){
                imagenes.style.filter = 'grayscale(0%)';
            };
            imagen.style.transform = 'scale(1)';
        });
    });
});