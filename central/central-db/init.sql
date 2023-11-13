CREATE TABLE IF NOT EXISTS zones (
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
)


CREATE TABLE IF NOT EXISTS sensors (
id SERIAL PRIMARY KEY
name VARCHAR(255) NOT NULL
type VARCHAR(255) NOT NULL
zone_id INT REFERENCES zone(id)
)

CREATE TABLE IF NOT EXISTS measures (
id SERIAL PRIMARY KEY
datetime TIMESTAMP NOT NULL
value FLOAT NOT NULL
sensor_id INT REFERENCES sensor(id)
)

-- Convert the "measures" table to a hypertable with time-related settings
SELECT create_hypertable('measures', 'datetime');

-- seed data

-- Insert a new zone record named "myzone"
INSERT INTO zone (name) VALUES ('mon fa''a''apu') ON CONFLICT (name) DO NOTHING;