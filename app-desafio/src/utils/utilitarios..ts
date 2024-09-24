export const tratarStringRua = (endereco: string) => {
    return endereco.trim().replace(/\s+/g, '+')
}

export const isValidLocation = (value: string) => {
    const regex = /^-?\d{1,2}\.\d+,-?\d{1,3}\.\d+$/;
    return regex.test(value);
};
