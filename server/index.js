import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();
// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = supabaseClient.createClient({
  apiKey: '<API_KEY>',
  project: '<PROJECT_ID>'
});
app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});