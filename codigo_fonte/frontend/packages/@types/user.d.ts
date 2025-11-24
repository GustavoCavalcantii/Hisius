export type User = {
    id: number;
    name?: string;
    email: string;
    password: string;
    role: number;
    deleted: boolean;

    data_criacao: Date;
    data_atualizacao: Date;
}