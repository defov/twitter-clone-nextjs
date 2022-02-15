import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    const form = new formidable.IncomingForm({
        uploadDir: './public/uploads/',
        filename: true,
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        if(err) res.status(400).json({ error: true });
        console.log(err, fields, files);
        res.status(200).json({ 
          imageUrl: `/uploads/${files.file.newFilename}`
        })
    });
};