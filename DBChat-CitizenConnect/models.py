import os
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
from dotenv import load_dotenv

load_dotenv('.env')


KEY = os.getenv('KEY')
uri = os.getenv('uri')

database = SQLDatabase.from_uri(uri)

llm = ChatOpenAI( model="gpt-3.5-turbo", openai_api_key = KEY )

toolkit = SQLDatabaseToolkit(db = database, llm = llm)

agent_executor = create_sql_agent(
    llm = llm,
    toolkit = toolkit,
    agent_type = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True,
    prefix = "You are an AI that interacts with a MSSQL database"

)

# result = agent_executor("The content of views made")

# print(result)

# print(result['output'])