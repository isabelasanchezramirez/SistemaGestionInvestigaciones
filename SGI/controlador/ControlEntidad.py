import requests

# Configuración de la URL base del servidor
PROJECT_NAME = "SGI"
BASE_URL = f"http://190.217.58.246:5184/api/{PROJECT_NAME}/procedures/execute"  # Reemplaza con la URL correcta

def insert_data(table_name, data):
    payload = {
        "procedure": "insert_json_entity",
        "parameters": {
            "table_name": table_name,
            "json_data": data
        }
    }
    response = requests.post(BASE_URL, json=payload)
    return response.json()

def update_data(table_name, data, condition):
    payload = {
        "procedure": "update_json_entity",
        "parameters": {
            "table_name": table_name,
            "json_data": data,
            "where_condition": condition
        }
    }
    response = requests.post(BASE_URL, json=payload)
    return response.json()

def delete_data(table_name, condition):
    payload = {
        "procedure": "delete_json_entity",
        "parameters": {
            "table_name": table_name,
            "where_condition": condition
        }
    }
    response = requests.post(BASE_URL, json=payload)
    return response.json()

def select_data(table_name, condition=None, order_by=None, limit=None, select_columns=None):
    payload = {
        "procedure": "select_json_entity",
        "parameters": {
            "table_name": table_name,
            "where_condition": condition,
            "order_by": order_by,
            "limit_clause": limit,
            "select_columns": select_columns
        }
    }
    response = requests.post(BASE_URL, json=payload)
    return response.json()

