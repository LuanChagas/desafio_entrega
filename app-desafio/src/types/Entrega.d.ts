interface Entrega {
  id: number;
  nomeCliente: string;
  dataEntrega: Date;
  pontoPartida: string;
  pontoPartidaDados: DadosViaCepSucesso
  pontoDestino: string;
  pontoDestinoDados: DadosViaCepSucesso
  criadoEm: Date;
}

type FormEntrega = Omit<Entrega, "id" | "criadoEm">;
