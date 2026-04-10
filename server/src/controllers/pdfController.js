import { ingestPdfForUser } from '../services/pdfService.js';

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No PDF uploaded' });

    const result = await ingestPdfForUser({
      userId: req.user.id,
      filepath: req.file.path,
      filename: req.file.originalname
    });

    return res.status(201).json({ message: 'PDF processed successfully', ...result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
