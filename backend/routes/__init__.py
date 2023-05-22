from fastapi import APIRouter

from routes import processos
from routes import visualization

routes = APIRouter()

routes.include_router(processos.router)
routes.include_router(visualization.router)