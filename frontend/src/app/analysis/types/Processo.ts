export interface Processo {
  NPU: string;
  duration: number | string | [number, string];
  movimentosCount: number;
  pinnedMovimentoCount: number;
}
