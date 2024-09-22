


export const maskValidacaoCep = (target: HTMLInputElement) => {
    const regex = /^[0-9-]+$/;
    let cep = target.value
    if (!regex.test(cep)) {
        target.value = cep.replace(/[^0-9-]/g, "")
        return false
    }



    if (cep.length > 5) {
        cep = cep.replace('-', "")
        target.value = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`
        return true
    }


    return false
}