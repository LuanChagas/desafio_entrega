interface DadosViaCepSucesso {
    cep: string
    logradouro?: string
    bairro: string
    localidade: string
    estado: string
}

interface DadosViaCepError {
    erro: true
}

type DadosViaCep = DadosViaCepSucesso | DadosViaCepError
