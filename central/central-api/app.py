from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send, emit
import psycopg2
from psycopg2 import sql

app = Flask(__name__)
socketio = SocketIO(app)

insertZoneQuery = sql.SQL("INSERT INTO zone (name) VALUES (%s) RETURNING id")
selectZonesQuery = sql.SQL("SELECT id, name FROM zone")
selectSensorsByZoneQuery = sql.SQL("SELECT id, name FROM sensor WHERE zone_id = %s")
selectMeasuresBySensorQuery = sql.SQL("SELECT datetime, value FROM measure WHERE sensor_id = %s")
selectMeasuresByTypeByZoneQuery = sql.SQL("SELECT datetime, value FROM measures m INNER JOIN sensors s ON m.sensor_id = s.id WHERE s.zone_id = %s AND s.type = %s")

# Function to establish a database connection
def get_db_connection():
    conn = psycopg2.connect(
        host="your_database_host",
        port=5432,  # Adjust the port if needed
        user="your_database_user",
        password="your_database_password",
        database="your_database_name"
    )
    return conn

# REST API Endpoints

# Create a new zone
@app.route('/zones/', methods=['POST'])
def create_zone():
    data = request.get_json()
    with get_db_connection(), get_db_connection().cursor() as cursor:
        cursor.execute(insertZoneQuery, (data['name'],))
        zone_id = cursor.fetchone()[0]
    return jsonify({'zone_id': zone_id, 'name': data['name']}), 201

# Read all zones
@app.route('/zones/', methods=['GET'])
def read_zones():
    with get_db_connection(), get_db_connection().cursor() as cursor:
        cursor.execute(selectZonesQuery)
        zones = cursor.fetchall()
    return jsonify([{'zone_id': zone[0], 'name': zone[1]} for zone in zones])

# Read all sensors within a zone
@app.route('/zones/<int:zone_id>/sensors/', methods=['GET'])
def read_sensors(zone_id):
    with get_db_connection(), get_db_connection().cursor() as cursor:
        cursor.execute(selectSensorsByZoneQuery, (zone_id,))
        sensors = cursor.fetchall()
    return jsonify([{'sensor_id': sensor[0], 'name': sensor[1]} for sensor in sensors])

# Read all measures for a sensor
@app.route('/zones/<int:zone_id>/sensors/<int:sensor_id>/measures/', methods=['GET'])
def read_measures(zone_id, sensor_id):
    with get_db_connection(), get_db_connection().cursor() as cursor:
        cursor.execute(selectMeasuresBySensorQuery, (sensor_id,))
        measures = cursor.fetchall()
    return jsonify([{'datetime': measure[0], 'value': measure[1]} for measure in measures])

# Read all measures for a type of sensor in a zone
@app.route('/zones/<int:zone_id>/sensors/<str:sensor_type>/measures/', methods=['GET'])
def read_measures(zone_id, sensor_type):
    with get_db_connection(), get_db_connection().cursor() as cursor:
        cursor.execute(selectMeasuresBySensorQuery, (zone_id, sensor_type))
        measures = cursor.fetchall()
    return jsonify([{'datetime': measure[0], 'value': measure[1]} for measure in measures])

# WebSocket Endpoint

@socketio.on('message')
def handle_message(message):
    emit('response', {'data': f'Message text was: {message}'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)