// Elementos de habilidades y stats
export const ELEMENTS = {
    FIRE: "Fuego",
    WATER: "Agua",
    WIND: "Viento",
    EARTH: "Tierra",
  };
  
  // Rutas de la API
  export const API_ROUTES = {
    GET_QUESTS: "quests",
    GET_SHOP_ITEMS: "shop/items",
    POST_CHARACTER_CREATION: "character/create",
  };
  
  // Mensajes genéricos
  export const MESSAGES = {
    ERROR_GENERIC: "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
    CHARACTER_CREATED: "¡Personaje creado con éxito!",
    NOT_ENOUGH_GOLD: "No tienes suficiente oro para realizar esta compra.",
  };
  

  //Data básica

  export const zodiacData = [
    {
      id: 1,
      signo: "ARIES",
      escuela: "GUERRERX",
      recurso: "ARMA",
      energia: "fuego",
      regente: "marte",
      color: "rojo",
      nahual: "cabra",
      abundancia: "polillas, obejas",
      dificil: "zorro",
      espiritus: "faunos",
      dragones: "bola de fuego chino",
      tribuAI: "Ninjas",
      armas: "Espada",
      habilidad: "trepar",
      shooters: "estrellas",
    },
    {
      id: 2,
      signo: "TAURO",
      escuela: "CHAMÁN",
      recurso: "ENERGÍAS",
      energia: "tierra",
      regente: "venus",
      color: "naranja",
      nahual: "toro",
      abundancia: "perros, caballos",
      dificil: "flamenco",
      espiritus: "driadas (tierra arbol)",
      dragones: "colacuernos",
      tribuAI: "aborigenes",
      armas: "hacha",
      habilidad: "manipular materia",
      shooters: "hojas",
    },
    {
      id: 3,
      signo: "GEMINIS",
      escuela: "MEDIUM",
      recurso: "HUMO",
      energia: "aire",
      regente: "mercurio",
      color: "gris",
      nahual: "murciélago",
      abundancia: "mariposas, cuervos",
      dificil: "kakuy",
      espiritus: "silfides (hadas)",
      dragones: "galés verde común",
      tribuAI: "psiquix",
      armas: "doble lanza",
      habilidad: "teletransportacion",
      shooters: "esqueletos",
    },
    {
      id: 4,
      signo: "CANCER",
      escuela: "ENCANTADOR",
      recurso: "ANIMAL AI",
      energia: "agua",
      regente: "luna",
      color: "cian",
      nahual: "mono de agua",
      abundancia: "cangrejos, conejos",
      dificil: "elefante",
      espiritus: "400 conejos",
      dragones: "hocicorto sueco (azul)",
      tribuAI: "pitonisas",
      armas: "escudo",
      habilidad: "encantar",
      shooters: "cristales",
    },
    // Continuar con los signos restantes...
  ];
  