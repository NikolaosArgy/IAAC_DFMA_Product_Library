import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from pydantic import BaseModel

from specklepy.api.client import SpeckleClient

from api.fetch_data import get_data
from api.gql_query import get_project_data

#Initialise FastAPI App
#-------------------------------------------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all domains (or replace with ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#Get .env 
#-------------------------------------------------------------------------------------
load_dotenv(dotenv_path='.env') 
speckle_token = os.getenv('SPECKLE_TOKEN')
project_id = os.getenv('SPECKLE_PROJECT_ID')

client = SpeckleClient(host="https://app.speckle.systems") # here add your custom server URL 
client.authenticate_with_token(speckle_token) # you can generate a new token from the DEVELOPER SETTINGS

#--------------------------------------------------------------------------------------

gql_data = get_project_data(project_id)

@app.get("/projects", response_model=List[dict]) #API GET Method - Sends the Project model information to the frontend.
async def get_project_versions():
    return gql_data

#--------------------------------------------------------------------------------------
class RequestBody(BaseModel):
    id: str

class ResponseData(BaseModel):
    message: str
    data: List[dict]  # List of dictionaries with string keys and values

@app.post("/fetch-data") #API POST Method - Sends the Model data requested to the frontend.
async def fetch_data(body: RequestBody):

    data = get_data(client, project_id, body.id)

    #print(data)

    return ResponseData(message="Data fetched successfully", data=data)

