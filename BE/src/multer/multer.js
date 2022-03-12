import multer from 'multer'
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'C:\\Users\\ADMIN\\Desktop\\Facebook\\BE\\image')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    fileFilter: (req, file, cb) => {

        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
            // You can always pass an error if something goes wrong:
            cb(new Error('File does not support'), false);
            return;
        }

        // To accept the file pass `true`, like so:
        cb(null, true);
    }
})

export default upload