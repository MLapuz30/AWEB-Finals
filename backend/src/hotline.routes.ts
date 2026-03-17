import { Router, Request, Response } from 'express';
import { HotlineModel } from './hotline.model';

const router = Router();

// GET all hotlines
router.get('/', async (_req: Request, res: Response) => {
  try {
    const hotlines = await HotlineModel.find();
    res.json(hotlines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotlines' });
  }
});

// POST create new hotline
router.post('/', async (req: Request, res: Response) => {
  try {
    const hotline = new HotlineModel(req.body);
    await hotline.save();
    res.status(201).json(hotline);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create hotline' });
  }
});

// PUT update hotline
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await HotlineModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hotline' });
  }
});

// DELETE hotline
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await HotlineModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hotline' });
  }
});

export default router;