let data = {
    musicVolume: 1,
    sfxVolume: 1,
    fullscreen: false
}

function loadData(){

    if(!localStorage.data){
        localStorage.setItem( "data", JSON.stringify(data) );
    }

   data = JSON.parse( localStorage.getItem("data") );

}

function getData(){
    if(!localStorage.data){
        loadData();
    }
    return JSON.parse( localStorage.getItem("data") );
}

function saveData(key, value){
    const newData = JSON.parse( localStorage.getItem("data") );

    if(key in newData){
        newData[key] = value;
        localStorage.setItem( "data", JSON.stringify(newData) );
    }
}



export { loadData, getData, saveData }