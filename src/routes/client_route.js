import express from 'express';
import { ClientController } from  "../controllers";
import multer from "multer";
import * as fs from 'fs';

try {
    let filesA=[];
    const fileFilter = (req, file, cb) => {
        if (file.fieldname === "documents") { // if uploading resume
          if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ) { // check file type to be pdf, doc, or docx
            cb(null, true);
          } else {
            cb(null, false); // else fails
          }
        } else if (file.fieldname === "images") { // else uploading image
          if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
          } else {
            cb(null, false); // else fails
          }

        } else if (file.fieldname === "video") {
          
            if (
                file.mimetype === 'video/mp4' 
              ) { 
                cb(null, true);
              } else {
                cb(null, false); 
              }
        
        }
      };


      const storage=multer.diskStorage({
        destination:(req,file,cb) =>{            
        const path = `${__dirname}/../../public/`;
          fs.mkdirSync(path, { recursive: true });
          cb(null, path);
      },
      filename:(req,file,cb) =>{
        const ext = file.originalname.slice(-5);

        if(ext == '.xlsx') {
            return cb(new Error('File with unkown extension uploaded!'));
        }


        req.body.files=[req.files];
        
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
        
    }
      })



    const uploader = multer(
    {
    storage,
    fileFilter: fileFilter,
    limits:
    { 
      fileSize:'2mb' 
    }, 
})




const clientRouter = express.Router();




clientRouter.get("/", (...args) => ClientController.getClientInfo(...args));
clientRouter.get("/client_id", (...args) => ClientController.getSingleClientInfo(...args));
clientRouter.post("/client_form", (...args) => ClientController.clientPropertyInfo(...args));

clientRouter.post("/renovate_calculator_form", (...args) => ClientController.clientRenvateInfo(...args));

clientRouter.post("/documents",uploader.fields([{
  name: 'documents', maxCount: 2
}, {
  name: 'images', maxCount: 3
},
{
  name:"video",maxCount:1
}
]),(...args) => ClientController.uploadFiles(...args));


clientRouter.get("/renovate_calculator_form_id", (...args) => ClientController.getclientRenvateInfoSingle(...args));
clientRouter.get("/renovate_calculator_agent_id", (...args) => ClientController.getclientRenvateInfoSingle1(...args));

clientRouter.get("/renovate_calculator_form_get_all", (...args) => ClientController.getclientRenvateInfo(...args));
clientRouter.put("/renovate_calculator_form_update", (...args) => ClientController.getclientRenvateInfoUpdate(...args));

module.exports =clientRouter; 

} catch(error) {
     throw error;
}
