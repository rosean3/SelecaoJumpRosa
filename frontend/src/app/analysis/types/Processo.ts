// export interface Processo {
//   NPU: string;
//   movimentos?: number;
//   totalDuration: number;
//   totalMovimentos: number;
// }
export interface Processo {
  NPU: string;
  duration: number;
  movimentosCount: number;
  pinnedMovimentoCount?: number;
}
