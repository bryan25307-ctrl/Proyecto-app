const musica = document.getElementById("musica");
const letra = document.getElementById("letra");

const botonMusica = document.getElementById("botonMusica");

botonMusica.addEventListener("click", () => {

    if (musica.paused) {

        musica.play();

        botonMusica.textContent = "❚❚";

    } else {

        musica.pause();

        botonMusica.textContent = "▶";
    }

});

// Tiempos de aparición de cada texto
const frases = [
    { tiempo: "0.24", texto: "¿Cómo estarán en la ensenada, el viejo ceibal" },
    { tiempo: "0.31", texto: "Los jazmineros y orquídeas en flor? Donde cantó dulcemente el zorzal" },
    { tiempo: "0.40", texto: "Quiero volver a contemplarmee en tus ojos kamba" },
    { tiempo: "0.46", texto: "Y que me beses como te besé. Bajo la sombra del jacarandá" },
    { tiempo: "0.56", texto: "Niño, apoyate en mis recuerdos, intentá dormir en paz. Siento el peso en tu conciencia" },
    { tiempo: "1.06", texto: "por el llanto de mamá. Vi que el miedo al abandono no te deja respirar" },
    { tiempo: "1.14", texto: "Siento el nudo de tu panza cuando te hablan de papá" },
    { tiempo: "1.22", texto: "Niño, haz las paces con la vida, no es de piedra el pastizal" },
    { tiempo: "1.28", texto: "La nostalgia de tu antes no te deja caminar" },
    { tiempo: "1.34", texto: "¿Quién mató tu sonrisita de ilusión y de bondad?" },
    { tiempo: "1.39", texto: "Sé que te querés dormir pa' no volver a despertar" },
    { tiempo: "1.45", texto: "Amor, no llores" },
    { tiempo: "1.51", texto: "veo luz en tus males. Siguiéndote el corazón, bailando en un canto de zorzales" },
    { tiempo: "1.59", texto: "Bailando en un canto de zorzales" },
    { tiempo: "2.08", texto: "Niño, soy un hombre con tristeza, sé del peso en tu verdad" },
    { tiempo: "2.14", texto: "Escaparte por robar porque robás para cenar" },
    { tiempo: "2.20", texto: "Vi tus dedos en el barro con olor a libertad" },
    { tiempo: "2.26", texto: "Sé que te querés dormir pa' no volver a despertar. Por el mundo vas de pillo " },
    { tiempo: "2.35", texto: "Tcon alma de caramelo. Vi la vida en tus nudillos y su odio en tus hoyuelos (ah, ah, ah, ah)" },
    { tiempo: "2.43", texto: "Le rezaste a unos amigos, pues no todos van al cielo. Pero vos sos un grial" },
    { tiempo: "2.52", texto: "Amor no llores" },
    { tiempo: "2.58", texto: "veo luz en tus males. Siguiéndote el corazón" },
    { tiempo: "3.06", texto: "bailando en un canto de zorzal. Amor, no llores" },
    { tiempo: "3.15", texto: "Veo luz en tus males. Siguiéndote el corazón" },
    { tiempo: "3.27", texto: "Hijo, me robaron tus ojitos los momentos que perdí" },
    { tiempo: "3.33", texto: "Pedí tiempo a mi destino, y dijo, hoy te toca a ti. Sé que un día serás grande" },
    { tiempo: "3.42", texto: "sé que un día entenderás. Los consejos de tu viejo, estoy descansando en paz" }
];

// Convierte 0.24 en 24 segundos,
// 1.06 en 1 minuto con 6 segundos, etc.
function convertirTiempo(tiempo) {
    const partes = tiempo.split(".");

    const minutos = Number(partes[0]);
    const segundos = Number(partes[1]);

    return (minutos * 60) + segundos;
}

// Convertimos todos los tiempos a segundos
frases.forEach(frase => {
    frase.segundos = convertirTiempo(frase.tiempo);
});

let fraseActual = -1;

// Detecta el tiempo real de la canción
musica.addEventListener("timeupdate", () => {

    const tiempoActual = musica.currentTime;

    for (let i = frases.length - 1; i >= 0; i--) {

        if (tiempoActual >= frases[i].segundos) {

            if (fraseActual !== i) {

                fraseActual = i;

                // Oculta el texto anterior
                letra.classList.remove("mostrar");

                // Espera un poco y muestra el nuevo
                setTimeout(() => {
                    letra.textContent = frases[i].texto;
                    letra.classList.add("mostrar");
                }, 400);
            }

            break;
        }
    }
});

// Cuando la canción vuelve a un punto anterior
musica.addEventListener("seeked", () => {

    fraseActual = -1;

    letra.classList.remove("mostrar");
});

// ===============================
// ESCENAS DE LA CANCIÓN
// ===============================

function cambiarEscena(tiempo) {

    document.body.classList.remove(
        "escena1",
        "escena2",
        "escena3",
        "escena4",
        "escena5"
    );

    if (tiempo < 56) {

        // Inicio: recuerdos y naturaleza
        document.body.classList.add("escena1");

    } else if (tiempo < 119) {

        // Recuerdos
        document.body.classList.add("escena2");

    } else if (tiempo < 178) {

        // Noche y sentimientos
        document.body.classList.add("escena3");

    } else if (tiempo < 222) {

        // Parte más emocional
        document.body.classList.add("escena4");

    } else {

        // Final: tranquilidad
        document.body.classList.add("escena5");
    }
}


// Detectar el avance de la canción
musica.addEventListener("timeupdate", () => {

    cambiarEscena(musica.currentTime);

});