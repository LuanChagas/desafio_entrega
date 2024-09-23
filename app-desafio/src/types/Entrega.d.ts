interface Entrega {
  id: number;
  nomeCliente: string;
  dataEntrega: Date;
  pontoPartida: string;
  pontoPartidaDados: string
  pontoDestino: string;
  pontoDestinoDados: string
  criadoEm: Date;
}

type FormEntrega = Omit<Entrega, "id" | "criadoEm">;
