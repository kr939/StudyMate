console.log('STUDY PLAN ROUTES LOADED');
const express = require('express');
const router = express.Router();
router.get('/test', (req, res) => {
  res.json({ message: 'Study plan route works!' });
});
const StudyPlan = require('../models/StudyPlan');

// Get all study plans
router.get('/', async (req, res) => {
  try {
    const plans = await StudyPlan.find().sort({ studyDate: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch study plans' });
  }
});

// Add a study plan
router.post('/', async (req, res) => {
  try {
    console.log('Study plan request received:', req.body);
    console.log('POST /api/study-plans reached');

    const { subject, topic, studyDate, duration } = req.body;

    if (
      !subject?.trim() ||
      !topic?.trim() ||
      !studyDate ||
      !Number.isFinite(Number(duration)) ||
      Number(duration) < 1
    ) {
      return res.status(400).json({ message: 'Please enter valid study plan details' });
    }

    const plan = await StudyPlan.create({
      subject: subject.trim(),
      topic: topic.trim(),
      studyDate,
      duration: Number(duration),
    });

    res.status(201).json(plan);
  } catch (error) {
     console.error('Error saving study plan:', error);
    res.status(500).json({ message: 'Failed to save study plan' });
  }
});

// Delete a study plan
router.delete('/:id', async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    res.json({ message: 'Study plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete study plan' });
  }
});

module.exports = router;