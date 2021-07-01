import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';

const router = Router();

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()

const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()

const authenticateUserController = new AuthenticateUserController()

const createComplimentController = new CreateComplimentController()


router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticate, listUsersController.handle);

router.post('/tags', ensureAuthenticate, ensureAdmin, createTagController.handle);
router.get('/tags', ensureAuthenticate, listTagsController.handle);

router.post('/compliments', ensureAuthenticate, createComplimentController.handle);
router.get('/compliments/received', ensureAuthenticate, listUserReceiveComplimentsController.handle);
router.get('/compliments/sent', ensureAuthenticate, listUserSendComplimentsController.handle);

router.post('/login', authenticateUserController.handle);

export { router }