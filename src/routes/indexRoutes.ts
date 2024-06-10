import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
    const htmlTemplate = `
    <html>
         <head>
            <title>API Node</title>
         </head>
         <body>
            <h1>API Taller</h1>
         </body>
    </html>
    `
res.status(200).json({message: 'API'});
res.status(200).send(htmlTemplate);
});

export default router;