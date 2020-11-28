
// Website displaying "Total Market Value of U.S. Stock Market"
//https://siblisresearch.com/data/us-stock-market-value/#:~:text=The%20total%20market%20capitalization%20of,9%2F30%2F2020).
const willshireRatio = 1055; // Miljon Dollars in stock market (1 Willshire point = 1055 miljon $ in stock market)

const addWeekends = (data) =>{
    console.log(data) // LOL DATE API USES 5 WHILE STOCK API USES 05
    let date = new Date();
    let prevDate = null;
    let dateArray = [];
    let newData = []
    let size = data.length;
    date.setDate((date.getDate()-size))
    for(let i = 0;i<size;i++){
        let fDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();// date format
        dateArray.push(fDate);
        date.setDate((date.getDate()+1))
    }
    console.log(dateArray)
    let count = 0;
    data.forEach((element, i) => {
        if(element.datetime == dateArray[count]){
            count++;
            newData.push(element)
        }
        else if (count>0){
            newData.push({...newData[count-1], "datetime":dateArray[count]})
            count++;
            newData.push({...newData[count-1], "datetime":dateArray[count]})
            count++;
            newData.push(element)
            count++;
        }

    });
    console.log(newData);
}

const skimStockData = (data) =>{
    let array = [];
    data.values = data.values.reverse();
    data = addWeekends(data.values);
    let prevVal = data.values[0].close;
    for (const [key, value] of Object.entries(data.values)) {
        
        value = {"x":value.datetime,"y": ((value.close-prevVal)/prevVal)*100}
        array.push(value);
    }
    return array;
}
const skimCryptoData = (data)=>{
    // console.log(data);
    let array = [];
    // data = data.reverse()
    let prevVal = data[0].volume;
    for (const [key, value] of Object.entries(data)) {
        value = {"x":value.timestamp.slice(0,-10),"y": ((value.volume-prevVal)/prevVal)*100}
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
            .then(data => {
                if(data.status == "ok"){
                    return skimStockData(data)
                }else{
                    console.log("API error: ");
                    console.log(data)
                }
            })
            )
        .catch(error => {
            console.log("HOLY SHIT, Error occured! Run for your life!");
            console.log(error);
        });
    // console.log(response);
    return response;
};


function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

async function cryptoAPI (timeframe) {
    const today = new Date(); // set object
    let date = new Date();
    const todayDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();// date format
    let startDate;
    date.setDate(today.getDate()-1);
    let endDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate(); // Yesterdays date
    let url;

    if(timeframe.toLowerCase() === "7d"){
        date.setDate(today.getDate()-7);
    } else if (timeframe.toLowerCase() === "1m"){        
        date.setDate(today.getDate()-31);
    } else if (timeframe.toLowerCase() === "6m"){        
        date.setDate(today.getDate()-31*6);
    } else if (timeframe.toLowerCase() === "1y"){        
        date.setDate(today.getDate()-31*12);
    }
    startDate = ""+date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
    url = "https://api.nomics.com/v1/volume/history?key=cb20c6e35d1b2f873402d249f2c145cf&start="+startDate+"T00%3A00%3A00Z&end="+endDate+"T00%3A00%3A00Z&convert=USD"
    let response = await fetch(url)
    .then(response => (
        response.json())
        .then(data => {   
            return skimCryptoData(data)
        })
        )
    .catch(error => {
        console.log("HOLY SHIT, Error occured! Run for your life!");
        console.log(error);
    });
    // console.log(response)
    return response;
};
export default {
        stockAPI, 
        cryptoAPI
}