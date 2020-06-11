// Light box Gallery ceada por Jizra Diseño Web® para https://jizratest.eu5.org todos los derechos reservados©
// gallery front
//     Uso
//   ------
//   Cuatro parámetros que puedes usar:
//   'parent' = el elemento que necesita ser envuelto
//   'wrapper' = el elemento que envolverá al parent
//   'atributo' = el atributo que necesita que tenga este elemento
//   'attributevalue' = el valor del atributo que acaba de crear
 
//   Ejemplo
//   -------
//   wrapInner ('body', 'div', 'class', 'my-class');

var background = document.querySelector("#cont-gallery");
//  var bodyinner = document.body;
var divtag = document.querySelectorAll(".front-gallery");

function wrapInner(parent, wrapper, attribute, attributevalue) {
    if(typeof wrapper === "string") {
        wrapper = document.createElement(wrapper);
        wrapper.setAttribute(attribute, attributevalue);
    };
    var div = parent.appendChild(wrapper);
};

for(let i = 0; i < divtag.length; i++){
    if(divtag[i].hasAttribute("src")){
        wrapInner(background, 'section', 'class', `gallery-img`);
        let galleryImgTest = document.querySelectorAll('.gallery-img');
        let imagenSRC = divtag[i].src;
        let imagenURL = divtag[i].dataset.urlImg;
        let imagenTITLE = divtag[i].dataset.titleImg;
        let imagenDESC = divtag[i].dataset.descImg;
        let imagenALT = `imagen ${i}`;//divtag[i].alt;
        galleryImgTest[i].innerHTML =  `<img loading="lazy" src="${imagenSRC}" data-url-img="${imagenURL}" data-title-img="${imagenTITLE}" data-desc-img="${imagenDESC}" alt="${imagenALT}">`;

        let imagen=divtag[i];
        background=imagen.parentNode;
        background.removeChild(imagen);
    };
};

// light box
let lightBoxPadre=document.createElement('section');
lightBoxPadre.setAttribute("id","light-box");
lightBoxPadre.setAttribute("class","center");
document.querySelector('#gallery-light-box').appendChild(lightBoxPadre);

const imgGallery=document.querySelectorAll('.gallery-img');
const lightBox=document.querySelector('#light-box');

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
    let dataUrl=document.querySelectorAll('.gallery-img img')[i].dataset.urlImg;
    let dataTitle=document.querySelectorAll('.gallery-img img')[i].dataset.titleImg;
    let dataDesc=document.querySelectorAll('.gallery-img img')[i].dataset.descImg;
    let ubicacionImg="";
    
    if(dataUrl!==""){
        ubicacionImg=dataUrl;
    }else{
        ubicacionImg=document.querySelectorAll('.gallery-img img')[i].src;
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

    if(!document.querySelector('#light-box-cont')){
        lightBox.classList.add('active');
        lightBoxCont.setAttribute("id","light-box-cont");
        lightBoxCont.setAttribute("class","light-box-cont center");
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
    
function borrarlightbox(){
    lightBox.classList.remove('active');
    setTimeout(function(){
        let imagen=document.querySelector('#light-box-cont');
        padre=imagen.parentNode;
        padre.removeChild(imagen);
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