
// Website displaying "Total Market Value of U.S. Stock Market"
//https://siblisresearch.com/data/us-stock-market-value/#:~:text=The%20total%20market%20capitalization%20of,9%2F30%2F2020).
const willshireRatio = 1055; // Miljon Dollars in stock market (1 Willshire point = 1055 miljon $ in stock market)

const skimStockData = (data) =>{
    let array = [];
    for (const [key, value] of Object.entries(data.values)) {
        value = {"datetime":value.datetime,"close": value.close}
        array.push(value);
    }
    return array;
}
const skimCryptoData = (data)=>{
    let array = [];
    let prevVal = data[0].volume;
    for (const [key, value] of Object.entries(data)) {
        value = {"timestamp":value.timestamp.slice(0,-10),"volume": ((value.volume-prevVal)/prevVal)*100}
        array.push(value);
    }
    return array;
}


const stockAPI = async (timeframe) => {

    let outputSize;

    if(timeframe.toLowerCase() === "7d"){
        outputSize = 7;
    } else if (timeframe.toLowerCase() === "1m"){        
        outputSize = 30;
    } else if (timeframe.toLowerCase() === "6m"){        
        outputSize = 30*6;
    } else if (timeframe.toLowerCase() === "1y"){        
        outputSize = 30*12;
    }

    
    const url = "https://api.twelvedata.com/time_series?symbol=W5000&interval=1day&outputsize="+outputSize+"&apikey=a467faa10a8d4c369bee33d8f2e07daf"
    
    let response = await fetch(url)
        .then(response => (
            response.json())
            .then(data => skimStockData(data))
            )
        .catch(error => {
            console.log("HOLY SHIT, Error occured! Run for your life!");
        });
    return response;
};


function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

const cryptoAPI = async (timeframe) => {
    const today = new Date(); // set object
    let date = new Date();
    const todayDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();// date format
    let startDate;
    date.setDate(today.getDate()-1);
    let endDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate(); // Yesterdays date
    let url;

    if(timeframe.toLowerCase() === "7d"){
        date.setDate(today.getDate()-6);
    } else if (timeframe.toLowerCase() === "1m"){        
        date.setDate(today.getDate()-30);
    } else if (timeframe.toLowerCase() === "6m"){        
        date.setDate(today.getDate()-30*6);
    } else if (timeframe.toLowerCase() === "1y"){        
        date.setDate(today.getDate()-30*12);
    }
    startDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
    url = "https://api.nomics.com/v1/volume/history?key=cb20c6e35d1b2f873402d249f2c145cf&start="+startDate+"T00%3A00%3A00Z&end="+endDate+"T00%3A00%3A00Z&convert=USD"
    let response = await fetch(url)
    .then(response => (
        response.json())
        .then(data => console.log(skimCryptoData(data)))
        )
    .catch(error => {
        console.log("HOLY SHIT, Error occured! Run for your life!");
    });
    return response;
};
export default {
        stockAPI, 
        cryptoAPI
}