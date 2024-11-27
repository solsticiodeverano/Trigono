import Home from "./components/Pages/Home";
import CharacterInventory from "./components/Characters/CharacterInventory";
import CharacterSkills from "./components/Characters/CharacterSkills";
import CharacterStats from "./components/Characters/CharacterStats";
import CharacterSheet from "./components/Characters/CharacterSheet";

const App = () => {
    return (
        <>
            <Home />
            {/* Integración de los componentes principales */}
            <div className="character-container">
                <CharacterInventory />
                <CharacterSkills />
                <CharacterStats />
                <CharacterSheet />
            </div>
        </>
    );
};

export default App;
