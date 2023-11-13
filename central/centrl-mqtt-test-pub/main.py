import paho.mqtt.client as mqtt
import random
import time

topic = "faaapu/measures"
sensorName = "sensor1"
sensorType = "soil_humidity"

def on_connect(client, userdata, flags, rc):
    # This will be called once the client connects
    print(f"Connected with result code {rc}")

def publish(client):
    msg_count = 1
    while True:
      time.sleep(1)
      data = random.randint(0, 1000)
      msg = f"{sensorName}:{sensorType}:{data}"
      result = client.publish(topic, msg)
      status = result[0]
      if status == 0:
        print(f"Sent `{msg}` to topic `{topic}`")
      else:
        print(f"Failed to Send `{msg}` to topic `{topic}`")
      msg_count += 1
      if msg_count > 5:
        break
client = mqtt.Client(sensorName) # client ID
client.on_connect = on_connect
client.username_pw_set("myuser", "password")
client.connect('127.0.0.1', 1883)
client.loop_start()
publish(client)
client.loop_end()