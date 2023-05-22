from fastapi import APIRouter
from pydantic import BaseModel
from .controller import (core_instance, CASE_ID,
    END_TIMESTAMP, START_TIMESTAMP, ACTIVITY
)

router = APIRouter(
    prefix="/api/processos",
    tags=['processos'],
    responses={404: {"processos": "Not found"}}
)

@router.get("/stats/", status_code=200)
async def get_log_stats():
    """
    Returns statistics about the log:
    casesCount: NPU (unique cases) count
    movimentosCount: Total movimentos count
    avgMovimentosPerCase: Average movimentos per case
    avgCaseDuration: Average case duration, in seconds
    avgMovimentoDuration: Average movimento duration, in seconds
    {
        casesCount: int,
        movimentosCount: int,
        avgCaseDuration: seconds,
        avgMovimentosPerCase: float,
        avgMovimentoDuration: seconds
    }
    """
    df = core_instance.log.copy()
    df['duration'] = df[END_TIMESTAMP] - df[START_TIMESTAMP]

    movimentos_count = len(df)
    cases_count = len(df[CASE_ID].unique())
    avg_movimento_duration = df['duration'].mean()
    avg_movimentos_per_case = movimentos_count / cases_count
    case_duration_sum = df.groupby(CASE_ID)['duration'].sum().mean()

    return [{
        "casesCount": cases_count,
        "movimentosCount": movimentos_count,
        "avgCaseDuration": case_duration_sum,
        "avgMovimentoDuration": avg_movimento_duration,
        "avgMovimentosPerCase": avg_movimentos_per_case,
    }]

class ProcessosInfosInput(BaseModel):
    movimento: str

@router.post("/", status_code=200)
async def get_processos_infos(request: ProcessosInfosInput):
    """
    Returns a list of all processos with some stats and a count
    of how many times the given movimento happened.
    """
    pinned_movimento = request.movimento
    cases, df = [], core_instance.log.copy()
    df['duration'] = df[END_TIMESTAMP] - df[START_TIMESTAMP]

    for NPU, group in df.groupby(CASE_ID):
        trace_duration = group['duration'].sum()
        pinned_movimento_count = len(
            group[group[ACTIVITY] == pinned_movimento]
        )
        cases.append({
            "NPU": NPU,
            "movimentosCount": len(group),
            "duration": trace_duration.total_seconds(),
            "pinnedMovimentoCount": pinned_movimento_count
        })

    return { "cases": cases }
