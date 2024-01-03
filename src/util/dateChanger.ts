
const DateConventor = (dateString: string) => {
    const dateSplited = dateString.split('.')
    if(dateSplited.length === 3){
        return `${dateSplited[2]},${dateSplited[1]},${dateSplited[0]}`
    }
    else{
        return 0
    }
}


export const DateChanger = (dateString: string) => {
    const convertedDate = DateConventor(dateString)
    if(convertedDate){
        const date = Date.parse(`${convertedDate}`)
        return date
    } else{
        return 0
    }
}
