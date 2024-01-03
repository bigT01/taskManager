const convertReverseDateChanger = (convertionDate: string) => {
    const dateSplit = convertionDate.split('/')

    return `${dateSplit[1]}.${dateSplit[0]}.${dateSplit[2]}`
}


export const ReverseDateChanger = (numericDate: number) => {
    if (numericDate !== 0) {
        const date = new Date(numericDate);
        const formattedDate = date.toLocaleDateString();
        return convertReverseDateChanger(formattedDate);

    } else {
        return "";
    }
};
