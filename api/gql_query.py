import requests
import pandas as pd

import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env') 
speckle_token = os.getenv('SPECKLE_TOKEN')

def get_project_data(project_id):

    # Replace with your actual Speckle server URL
    speckle_server_url = 'https://app.speckle.systems/graphql'

    # Set up the request headers (add any necessary authentication headers if required)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {speckle_token}',
    }

    variables = {
            "projectId": project_id
    }

    graphql_query = """
        query Query($projectId: String!) {
            project(id: $projectId) {
                versions {
                    items {
                        referencedObject
                        model {
                            name
                            id
                            createdAt
                            previewUrl
                        }
                    }
                }
            }
        }
        """
    try:
        # Make the POST request
        response = requests.post(
            speckle_server_url,
            headers=headers,
            json={"query": graphql_query, "variables": variables}
        )
        response.raise_for_status()  # Raise an error for bad status codes

        # Parse JSON response
        gql_response = response.json()

        # Extract project data
        data = gql_response.get("data", {}).get("project", {}).get("versions", {}).get("items", [])

        # Debug: Print extracted data
        print(f"Extracted Project Data: {data}")

        return data

    except requests.RequestException as e:
        print(f"Request error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

    return