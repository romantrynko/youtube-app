import express from 'express';
import requireUser from '../../middleware/requireUser';
import { findVideosHandler, uploadVideoHandler } from './video.controller';
const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);

router.patch('/:videoId', requireUser, uploadVideoHandler);

router.get('/', findVideosHandler);


export default router;