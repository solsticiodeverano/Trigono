import CharacterSkills from "./CharacterSkills";
import CharacterStats from "./CharacterStats";
import styles from "./CharacterSheet.module.css";

const CharacterSheet = () => {
  return (
    <div className={styles.sheetContainer}>
      <h1>Hoja de Personaje</h1>
      <CharacterStats />
      <CharacterSkills />
    </div>
  );
};

export default CharacterSheet;
