const PORT = process.env.PORT || 5100;
// const appName = "Shoplane";
// const appLongName = "Shoplane POS & Inventory Management System";
// const databaseName = "shoplane.db";
import path from 'path';
import os from 'os';
const appName = "Druglane";
const appLongName = "Druglane Pharmacy Management System";
const databaseName = "druglanev1.db";

const appDirectory = "druglaneServerV1";
const settings_location:string =  path.join(process.env.APPDATA, appDirectory);

export const constants = {
  appLongName : appLongName,
     appname : appName,
     server_url : process.env.NODE_ENV == "development" ? 
        "http://localhost/druglanebackend" : "https://druglanepms.calgadsoftwares.com",
     settings_location,
     customer_image_url : "assets/customer_images/",
     customer_image_thumbnail_url : "assets/customer_images/thumbnails/",
         
     product_image_url : "assets/product_images/",
     product_image_thumbnail_url : "assets/product_images/thumbnails/",
     port : PORT, 
    
     
     firebase_user_collection : "users",
     firebase_requests_collection : "requests",
     firebase_responses_collection : "responses",
     
     settings_path :path.join( settings_location,'system-settings.json'),
     db_path : path.join( settings_location, databaseName),
     backup_folder : path.join(os.homedir(), `${appName}Backups`),
     settings_filename : 'system-settings.json',
     db_filename : databaseName,
     internal_backups_path :path.join( settings_location,'backups'),
     company_id : '',
    
  STRING_DB_VERSION:"dbversion",
   
     
     }
