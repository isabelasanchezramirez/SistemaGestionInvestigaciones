import psycopg2
from psycopg2 import extras #Cuando se trabaja postgress
from configBd import *
class ControlConexion:
    def __init__(self):
        self.conn = None

    def abrirBd(self, serv, usua, passw, bdat, port):
        try:
            # Construye la cadena de conexión con los datos proporcionados
            self.conn = psycopg2.connect(
                dbname=bdat,
                user=usua,
                password=passw,
                host=serv,
                port=port
            )
            # Por defecto, psycopg2 trata de manejar algunos errores silenciosamente y realizar reintentos.
            self.conn.set_session(autocommit=False)
            return self.conn       
        except Exception as e:
            print("ERROR AL CONECTARSE AL SERVIDOR:", e)
            exit()  

    def cerrarBd(self):
        if self.conn is not None:
            self.conn.close()
            self.conn = None

    def ejecutarComandoSql(self, sql, parametros=[]): #insert into, update, delete
        try:
            with self.conn.cursor() as cursor:
                # Ejecuta el comando SQL
                cursor.execute(sql, parametros)
                self.conn.commit()  # Es necesario hacer commit para que los cambios sean persistentes.
                return True
        except Exception as e:
            print("Error al ejecutar el comando SQL:", e)
            return False

    def ejecutarSelect(self, sql, parametros=[]):
        try:
            with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute(sql, parametros)
                # Aquí, 'recordSet' será una lista de diccionarios Python, cada uno con claves que corresponden
                # a los nombres de las columnas seleccionadas por tu consulta SQL.
                recordSet = cursor.fetchall()
                return [dict(record) for record in recordSet]  # Convierte cada fila en un diccionario.
        except Exception as e:
            print("ERROR:", e)
            return False
