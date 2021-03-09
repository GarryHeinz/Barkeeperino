
fetchJson();


function fetchJson(glasses){

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let drink = data.drinks[0];
        setUeberschrift(drink.strDrink);
        if(drink.strAlcoholic == "Alcoholic"){
            setFahren("🚶‍♀️🚶 <br><span>(Dont drink and drive)</span>");
        }else{
            setFahren("🚗");
        }
        glass = drink.strGlass;
        setGlas(glass);
        setFoto(drink.strDrinkThumb);
        setInstructions(drink.strInstructionsDE == null ? drink.strInstructions : drink.strInstructionsDE);
        ingred = [];
        ammount = [];
        Object.entries(drink).forEach(element => {
            console.log(element);
            if(element[0].includes("strIngredient")){
                ingred.push(element[1]);
            }else if(element[0].includes("strMeasure")){
                ammount.push(element[1]);
            }
        });
        console.log(ingred);
        setZutaten(ingred,ammount);
    })
    .catch((error) => console.log(error));

}


function fetchGlasses() {
    let glasses= [];
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
        .then((res) => res.json())
        .then((data) => {
            data.drinks.forEach(drink => {
                glasses.push(drink.strGlass);
            });
        })
        .catch((error) => console.log(error));
    return glasses;
}

function setInstructions(val){
    document.getElementById("zubereitungText").innerText = val;
}

function setFoto(addr){
    document.getElementById("foto").setAttribute("src", addr);
}

function setGlas(emoj){
    switch(emoj.toLowerCase()){
        case "Highball glass".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍹";
            break;
        case "Cocktail glass".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍸";
            break;
        case "Whiskey Glass".toLowerCase:
            document.getElementById("glasEmots").innerText = "🥃";
            break;
        case "Coffee mug".toLowerCase():
            document.getElementById("glasEmots").innerText = "☕";
            break;
        case "Irish coffee cup".toLowerCase():
            document.getElementById("glasEmots").innerText = "☕";
            break;   
        case "Wine Glass".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍷";
            break;
        case "Beer mug".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍺";
            break;
        case "Beer pilsner".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍺";
            break;
        case "Beer Glass".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍺";
            break;
        case "Champagne flute".toLowerCase():
            document.getElementById("glasEmots").innerText = "🥂";
            break;
        case "White wine glass".toLowerCase():
            document.getElementById("glasEmots").innerText = "🍷";
            break;
        default:
            document.getElementById("glasEmots").innerText = emoj;
            break;

    }
    
}

function setFahren(emoj){
    document.getElementById("fahrenEmots").innerHTML =  emoj ;
}

function setZutaten(ing, amm){
    for(i = 0; i < ing.length && ing[i] != null; i++){
        d = document.createElement("li");
        d.innerText = amm[i] == null ? ing[i] :  amm[i] + " of "+ ing[i]; 
        document.getElementById("ZutatenText").appendChild(d);   
    }
}

const setUeberschrift = (ueb) => {
    document.getElementById("ueberschrift").innerText = ueb;
}