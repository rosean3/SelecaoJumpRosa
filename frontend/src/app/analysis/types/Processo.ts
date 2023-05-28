export interface Processo {
  NPU: string;
  duration: number;
  movimentosCount: number;
  pinnedMovimentoCount?: number;
}
