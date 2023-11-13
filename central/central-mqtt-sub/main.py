import paho.mqtt.client as mqtt
from dotenv import dotenv_values
import psycopg2
from psycopg2 import sql
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load configuration from .env file
config = dotenv_values("../.env")

# Database connection details
dbHost = 'localhost'
dbPort = '5432'
CONNECTION = f"postgres://{config['TDB_USER']}:{config['TDB_PASSWORD']}@{dbHost}:{dbPort}/{config['TDB_DBNAME']}"

selectSensorQuery = sql.SQL("SELECT id FROM sensor WHERE name = %s")
insertSensorQuery = sql.SQL("INSERT INTO sensor (name, type) VALUES (%s, %s) RETURNING id")
insertMeasureQuery = sql.SQL("INSERT INTO measure (datetime, value, sensor_id) VALUES (NOW(), %s, %s)")

def on_connect(client, userdata, flags, rc):
    logger.info(f"Connected with result code {rc}")
    logger.info(f"Subscribing to {topic}")
    client.subscribe(topic)

def on_message(client, userdata, msg: mqtt.MQTTMessage):
    payload = msg.payload.decode('utf-8')
    sensorName, sensorType, valueStr = payload.split(':')
    logger.info(f"Message received [{msg.topic}]: {msg.payload}")
    try:
        value = float(valueStr)
        
        with dbConnection, dbConnection.cursor() as cursor:
            # Check if the sensor exists in the database
            cursor.execute(selectSensorQuery, (sensorName))
            sensorId = cursor.fetchone()
            if sensorId:
                sensorId = sensorId[0]
            else:
                # If the sensor doesn't exist, insert it into the database
                cursor.execute(insertSensorQuery, (sensorName, sensorType))
                sensorId = cursor.fetchone()[0]
            # inserr the measure
            cursor.execute(insertMeasureQuery, (value, sensorId))
            dbConnection.commit()
            logger.info("Row inserted")
    except ValueError as e:
        logger.error(f"Invalid value format: {e}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")

if __name__ == "__main__":
    topic = "faaapu/measures"

    logger.info("Start subscriber")
    logger.info(f"Connecting to the database at {dbHost}:{dbPort}")
    dbConnection = None

    try:
        dbConnection = psycopg2.connect(CONNECTION)
        logger.info("Connected to the database")

        client = mqtt.Client("central-mqtt-sub")
        client.on_connect = on_connect
        client.on_message = on_message
        client.username_pw_set("myuser", "password")
        client.connect('127.0.0.1', 1883)
        client.loop_forever()
    except psycopg2.Error as e:
        logger.error(f"Database connection error: {e}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    finally:
        if dbConnection:
            dbConnection.close()