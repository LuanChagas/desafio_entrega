import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "entregas" })
export class Entrega {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        name: "nome_cliente"
    })
    nomeCliente: string;

    @IsNotEmpty()
    @IsString()
    @Column("date", {
        name: "data_entrega"
    })
    dataEntrega: Date

    @IsNotEmpty()
    @IsString()
    @Column({
        name: "ponto_partida"
    })
    pontoPartida: string

    @IsNotEmpty()
    @ValidateNested()
    @Column({
        name: "ponto_partida_dados",
        type: "json"
    })
    pontoPartidaDados: string

    @IsNotEmpty()
    @IsString()
    @Column({
        name: "ponto_destino"
    })
    pontoDestino: string

    @IsNotEmpty()
    @ValidateNested()
    @Column({
        name: "ponto_destino_dados",
        type: "json"
    })
    pontoDestinoDados: string

    @Column("timestamp", {
        name: "criado_em",
    })
    criadoEm: Date

    @BeforeInsert()
    updateCriadoEm() {
        const atualData = new Date();
        const brData = new Date(atualData.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
        this.criadoEm = brData
    }

}
