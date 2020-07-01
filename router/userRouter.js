const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const userController = require('../controllers/user');


router.get('/', [authMiddleware,roleMiddleware], userController.getAllUsers);
router.get('/me', authMiddleware, userController.getCurrentUser);
router.patch('/me', authMiddleware, userController.updateCurrentUser);
router.delete('/me', [authMiddleware,roleMiddleware], userController.deleteCurrentUser);
router.get('/:id',authMiddleware, userController.getUser);
router.post('/',authMiddleware, userController.addUser);
router.patch('/:id',authMiddleware, userController.updateUser);
router.delete('/deleteAll',[authMiddleware,roleMiddleware], userController.deleteAll);
router.delete('/:id',[authMiddleware,roleMiddleware], userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;