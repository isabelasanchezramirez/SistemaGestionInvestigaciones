import requests
from flask import Flask, render_template, request, url_for, redirect, session

# Configuración de la URL base del servidor
PROJECT_NAME = "SGI"
BASE_URL = f"http://190.217.58.246:5184/api/{PROJECT_NAME}/procedures/execute"  # Reemplaza con la URL correcta

class ControlEntidad:

    def validarIngreso(email, contrasena): # ,role):
        table_name = "usuario"  # Reemplaza con el nombre correcto de tu tabla de usuarios
        condition = {
            "email": str(email),
            "contrasena": str(contrasena)  # , "role": role
        }
        select_columns = ["email"]  # , "role"]

        payload = {
            "procedure": "select_json_entity",
            "parameters": {
                "table_name": table_name,
                "where_condition": condition,
                "select_columns": select_columns
            }
        }
        
        response = requests.post(BASE_URL, json=payload)
        # Verifica si la respuesta es exitosa (código 200)
        if response.status_code == 200:
            try:
                result = response.json()
                print(result)  # Muestra el resultado JSON para depurar
                if result.get("data"):
                    return True
                else:
                    return False
            except ValueError as e:
                print("Error al decodificar JSON:", e)
                print("Respuesta del servidor:", response.text)
                return False
        else:
            print(f"Error en la solicitud: {response.status_code}")
            print("Respuesta del servidor:", response.text)
            return False


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

