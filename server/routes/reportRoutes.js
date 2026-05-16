const express = require('express');
const router = express.Router();
const { generateHealthReport } = require('../services/pdfReportService');
const authMiddleware = require('../middleware/auth');  // <- სწორი path

router.get('/health/:userId', authMiddleware, async (req, res) => {
  try {
    const pdf = await generateHealthReport(req.params.userId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=health-report.pdf');
    res.send(pdf);
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ message: 'PDF გენერაცია ვერ მოხერხდა', error: err.message });
  }
});

module.exports = router;