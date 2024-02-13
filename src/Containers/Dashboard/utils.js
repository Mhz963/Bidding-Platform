// var utcSeconds = 1234567890;


export const epochToDate = utcSeconds =>   {
    var d = new Date(utcSeconds); // The 0 there is the key, which sets the date to the epoch
    return d.getDate()+' '+d.getMonth()+' '+d.getFullYear()
}

export const parseLeaveData = (data) => {
    let finalData = []
    data.forEach(element => {
        let D = element.split('|')
        let Dobj ={
            startData : epochToDate(isNaN(parseInt(D[0])) ? parseInt(D[1]) : parseInt(D[0]) ),
            endDate :epochToDate(isNaN(parseInt(D[0])) ? parseInt(D[2]) : parseInt(D[1])  ),
            reason :    epochToDate(isNaN(parseInt(D[0]))) ? D[3] : D[2],
            status : epochToDate(isNaN(parseInt(D[0]))) ? D[4] : D[3],
        }
        finalData.push(Dobj)
    });
  return finalData
}