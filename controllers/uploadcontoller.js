const multer = require('multer');
const xlsx = require('xlsx');
const transporter = require('../config/mailConfig');
// !! here  is  in  
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadExcel = (req, res) => {
    if (!req.file) {
        return res.render('index', { excelData: null, message: 'No file uploaded.', fileName: null });
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        sheetData.forEach(element => {
           console.log(element);
        });

        const emails = sheetData.map(row => row.Email);

        setTimeout(() => {
            res.render('index', { excelData: emails, message: 'File uploaded successfully!', fileName: req.file.originalname });
        }, 2000);

        sendEmails(emails);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.render('index', { excelData: null, message: 'Error processing file.', fileName: null });
    }
};

// Function to send emails
function sendEmails(emails) {
    emails.forEach(email => {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Hello guys, the code works successfully',
            text: 'sending you a final testing email ',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Error sending email to ${email}:`, error);
            } else {
                console.log(`Email sent to ${email}:`, info.response);
            }
        });
    });

    console.log("All mails are drafted");
}

// Export sendEmails function
exports.sendEmails = sendEmails;
