
// Website displaying "Total Market Value of U.S. Stock Market"
//https://siblisresearch.com/data/us-stock-market-value/#:~:text=The%20total%20market%20capitalization%20of,9%2F30%2F2020).
const willshireRatio = 1055; // Miljon Dollars in stock market (1 Willshire point = 1055 miljon $ in stock market)

const addWeekends = (data) =>{ // Remove weekend gaps from stock market data
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
    // console.log(dateArray)
    let count = 0;
    data.forEach((element, i) => {
        element.datetime = transformDayDate(element.datetime)

        // console.log(element.datetime+" vs "+ dateArray[count]);

        if(new Date(element.datetime)>new Date(dateArray[count]) && count==0){ // If the first date in the 'valid days array'(dateArray) is a weekend
            const diffTime = Math.abs(new Date(element.datetime) - new Date(dateArray[count]));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // console.log("INITIAL GAP REACHED:")
            // console.log(element.datetime+" vs "+ dateArray[count]);
            for(let i = 0;i<diffDays;i++){ // Loop through all days in the gap
                newData.push({...element, "datetime":dateArray[count]})
                count++;
            }

            newData.push({...element, "datetime":dateArray[count]})
            count++;
            // console.log("new data: "+dateArray[count]);

        }
        if(new Date(element.datetime)>new Date(dateArray[count])){ // If we have found a gap day
            const diffTime = Math.abs(new Date(element.datetime) - new Date(dateArray[count]));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // console.log("GAP REACHED:")
            // console.log(element.datetime+" vs "+ dateArray[count]);
            for(let i = 0;i<diffDays;i++){ // Loop through all days in the gap
                newData.push({...newData[count-1], "datetime":dateArray[count]})
                count++;
            }
        }
        // console.log(count+" - "+element.datetime);

        if(element.datetime == dateArray[count]){// If we are not in a gap day
            count++;
            newData.push(element)
        }


    });
    const arraySizeDifference = (data.length - newData.length);
    let lastData;
    for(let i = 0;i<arraySizeDifference;i++){ // Add the last dates if they are missing(happens when running on a weekend)
        lastData = newData[newData.length-1];
        newData.push({...lastData, "datetime":dateArray[count++]})
    }
    // console.log(newData)
    return newData;
}
const transformDayDate = (date)=>{ // Transforms the dates that are ex: 2020-11-09 -> 2020-11-9
    if(date.charAt(date.length - 2) == "0"){
        return date.substring(0, date.length-2)+date.charAt(date.length-1);
    }
    return date;
    
}

const skimStockData = (data) =>{
    let array = [];
    data.values = data.values.reverse();
    data = addWeekends(data.values);
    // console.log(data)
    let prevVal = data[0].close;
    data.forEach((element, i) => {
        element = {"x":element.datetime,"y": ((element.close-prevVal)/prevVal)*100}
        array.push(element);
    })
    // console.log(array)
    return array;
}
const skimCryptoData = (data)=>{
    // console.log(data);
    let array = [];
    // data = data.reverse()
    let prevVal = data[0].volume;
    for (const [key, value] of Object.entries(data)) {
        value = {"x":transformDayDate(value.timestamp.slice(0,-10)),"y": ((value.volume-prevVal)/prevVal)*100}
        array.push(value);
    }
    // console.log(array)
    return array;
}

const getAPIDate = (date) =>{ // Transforms dates from ex: 2020-5-1 => 2020-05-01
    if(date.charAt(date.length - 2) == "-"){ // Add zero to start of 'day' value
        date = date.substring(0, date.length-1)+"0"+date.charAt(date.length-1);
    }
    if(date.charAt(date.length - 5) == "-"){
        date = date.substring(0, date.length-4)+"0"+date.substring(date.length-4);
    }
    return date;
}

const stockAPI = async (timeframe) => {

    let outputSize;

    if(timeframe.toLowerCase() === "7d"){
        outputSize = 7;
    } else if (timeframe.toLowerCase() === "1m"){        
        outputSize = 31;
    } else if (timeframe.toLowerCase() === "6m"){        
        outputSize = 31*6;
    } else if (timeframe.toLowerCase() === "1y"){        
        outputSize = 31*12;
    }
    
    const url = "https://api.twelvedata.com/time_series?symbol=W5000&interval=1day&outputsize="+outputSize+"&apikey=a467faa10a8d4c369bee33d8f2e07daf"
    let response = await fetch(url)
        .then(response => (
            response.json())
            .then(data => {
                if(data.status == "ok"){
                    // console.log(data);
                    return skimStockData(data)
                }else{
                    console.log("Stock API error: ");
                    console.log(data)
                }
            })
            )
        .catch(error => {
            console.log("HOLY SHIT, Error occured! Run for your life!");
            console.log(error);
        });
    console.log(response);
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
    startDate = getAPIDate(startDate);
    endDate = getAPIDate(endDate);

    url = "https://api.nomics.com/v1/volume/history?key=cb20c6e35d1b2f873402d249f2c145cf&start="+startDate+"T00%3A00%3A00Z&end="+endDate+"T00%3A00%3A00Z&convert=USD"
    let response = await fetch(url)
    .then(response => (
        response.json())
        .then(data => {
            // console.log(data);
            return skimCryptoData(data)
        })
        )
    .catch(error => {
        console.log("HOLY SHIT, Error occured! Run for your life!");
        console.log(error);
    });
    console.log(response)
    console.log(startDate+" - "+endDate);
    return response;
};
export default {
        stockAPI, 
        cryptoAPI
}