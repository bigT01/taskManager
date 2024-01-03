export const DescriptionText = (text: string) => {
    const splited = text.split('')
    let newText = ''

    if (splited.length < 98) {
        return splited.join('')
    } else {
        for (let i = 0; i < 98; i++) {
            newText += splited[i]
        }

        return newText + '...'
    }
}
