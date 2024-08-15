import psycopg2

try:
    connection = psycopg2.connect(
        host="190.217.58.246",
        database="bdinvestigaciones",
        user="Posgrest",
        password="your_password_here",
        port=5185,
        sslmode="disable"  # Desactiva SSL
    )
    
    cursor = connection.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print(f"Connected to - {db_version}")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
