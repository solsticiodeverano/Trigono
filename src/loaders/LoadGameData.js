// Importar todas las categorías
import AguaSkills from "../data/skills/AquaSkills.json";
import FuegoSkills from "../data/skills/FuegoSkills.json";
import AireSkills from "../data/skills/AireSkills.json";
import TierraSkills from "../data/skills/TierraSkills.json";

import espadas from "../data/weapons/espadas.json";
import arcos from "../data/weapons/arcos.json";
import baculos from "../data/weapons/baculos.json";
import acha from "../data/weapons/acha.json";
import dagas from "../data/weapons/dagas.json";
import hoz from "../data/weapons/hoz.json";
import intrumento from "../data/weapons/instrumento.json";
import maza from "../data/weapons/maza.json";
import talisman from "../data/weapons/talisman.json";
import turifero from "../data/weapons/turifero.json";
import varita from "../data/weapons/varita.json";
import tridente from "../data/weapons/tridente.json";


import solar from "../data/quest/solar.json";

import shields from "../data/shields/shields.json";

import comunes from "../data/animals/comunes.json";
import magicos from "../data/animals/magicos.json";

import sombreros from "../data/vestimenta/sombreros.json";
import guantes from "../data/vestimenta/guantes.json";
import botas from "../data/vestimenta/botas.json";
import capas from "../data/vestimenta/capas.json";

import plantas from "../data/pociones/plantas.json";
import arboles from "../data/pociones/arboles.json";
import sustancias from "../data/pociones/sustancias.json";
import piedras from "../data/pociones/piedras.json";
import semillas from "../data/pociones/semillas.json";


export const loadGameData = () => {
    const addCategory = (items, category) => {
      if (!Array.isArray(items)) {
        console.warn(`⚠️ El archivo de la categoría "${category}" no es un array.`, items);
        return [];
      }
      return items.map((item) => ({ ...item, category }));
    };
  
    const allItems = [
      ...addCategory(AguaSkills, "skills"),
      ...addCategory(FuegoSkills, "skills"),
      ...addCategory(AireSkills, "skills"),
      ...addCategory(TierraSkills, "skills"),
  
      ...addCategory(espadas, "weapons"),
      ...addCategory(arcos, "weapons"),
      ...addCategory(baculos, "weapons"),
      ...addCategory(acha, "weapons"),
      ...addCategory(dagas, "weapons"),
      ...addCategory(hoz, "weapons"),
      ...addCategory(intrumento, "weapons"),
      ...addCategory(maza, "weapons"),
      ...addCategory(talisman, "weapons"),
      ...addCategory(turifero, "weapons"),
      ...addCategory(tridente, "weapons"),
      ...addCategory(varita, "weapons"),
  
      ...addCategory(shields, "shield"),
  
      ...addCategory(comunes, "beast"),
      ...addCategory(magicos, "beast"),
  
      ...addCategory(sombreros, "clothes"),
      ...addCategory(guantes, "clothes"),
      ...addCategory(botas, "clothes"),
      ...addCategory(capas, "clothes"),
  
      ...addCategory(plantas, "potions"),
      ...addCategory(arboles, "potions"),
      ...addCategory(sustancias, "potions"),
      ...addCategory(piedras, "potions"),
      ...addCategory(piedras, "semillas"),

  
      ...addCategory(solar, "quest"),
    ];
  
    return allItems;
  };
  