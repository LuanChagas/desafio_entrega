import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"entregas"})
export class Entrega {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name:"nome_cliente"
    })
    nomeCliente: string;

    @Column("date",{
        name:"data_entrega"
    })
    dataEntrega: Date

    @Column({
        name:"ponto_partida"
    })
    pontoPartida:string

    @Column({
        name:"ponto_partida_dados",
        type:"json"
    })
    pontoPartidaDados:string

    @Column({
        name:"ponto_destino"
    })
    pontoDestino:string

    @Column({
        name:"ponto_destino_dados",
        type:"json"
    })
    pontoDestinoDados:string

    @Column("timestamp",{
        name:"criado_em",
    })
    criadoEm: Date

    @BeforeInsert()
    updateCriadoEm(){
        const atualData = new Date();
        const brData = new Date(atualData.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
        this.criadoEm = brData
    }
   
}