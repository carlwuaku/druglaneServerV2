import { logger } from '../config/logger';
import express, { Router, Response, Request } from 'express';
const router: Router = express.Router();
import {addRole, delete_role_function, delete_user_function, getSettings, get_branches_function, get_insurers_function, get_logo_function, get_permissions_function, get_roles_function, get_role_function, get_role_permissions_function, get_users_function, get_user_function, login_function, saveSettings, save_branch_function, save_user_function} from '../services/admin.service'


router.get("/", async (req: Request, res: Response) => {
    res.status(200).send("welcome!")
});

router.post('/login', async (req: Request, res: Response) => {

    try {

        let login = await login_function(req.body);// helper.login(username, password);
        res.status(201).json(login);

    } catch (error) {
        // await helper.closeConnection();
        res.status(500).json({ status: '-1', data: null, message: error })

    }

});


router.get('/getBranches', async (req: Request, res: Response) => {
    try {
        let data = await get_branches_function();  //helper.getAll(helper.branches_table_name);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ status: '-1', data: null, message: error })

    }
})




router.get('/getLogo', async (req: Request, res: Response) => {

    try {
        let data = await get_logo_function();
        res.status(201).json(data);
    } catch (error) {
        logger.error(error)
        res.status(500).json({ status: '-1', data: null, message: error })
    }
})




router.post('/saveBranch', async (req: Request, res: Response) => {
    try {
        let data = await save_branch_function(req.body);
        res.json(data);
    } catch (error) {
        logger.error(error)
        res.status(500).json({ status: '-1', data: null, message: error })

    }
})

router.get('/getInsurers', async (req: Request, res: Response) => {
    try {
        let data = await get_insurers_function();
        res.json(data);
    } catch (error) {
        logger.error(error)
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/settings', async (req: Request, res: Response) => {
    try {
        let data = await getSettings();
        res.json(data);
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/allPermissions', async (req: Request, res: Response) => {
    try {
        let data = await get_permissions_function();
        res.json(data);
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.post('/saveSettings', async (req: Request, res: Response) => {
    try {
        console.log(req.body)

        let data = await saveSettings(req.body);
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
})

router.post('/saveRole', async (req: Request, res: Response) => {
    try {
        let data = await addRole(req.body);
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
})

router.get('/getRoles', async (req: Request, res: Response) => {
    try {
        let data = await get_roles_function({});
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/getUsers', async (req: Request, res: Response) => {
    try {
        let data = await get_users_function({});
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        let data = await get_user_function({id: req.params.id});
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/role/:id', async (req: Request, res: Response) => {
    try {
        let data = await get_role_function({ id: req.params.id });
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.get('/rolePermissions/:id', async (req: Request, res: Response) => {
    try {
        let data = await get_role_permissions_function({ id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.post('/saveUser', async (req: Request, res: Response) => {
    try {
        let data = await save_user_function(req.body);
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        let data = await delete_user_function({
            id: req.params.id,
            user_id: ''
        });
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

router.delete('/role/:id/', async (req: Request, res: Response) => {
    try {
        let data = await delete_role_function({
            id: req.params.id,
            user_id: ''
        });
        res.status(200).json(data)
    } catch (error) {
        logger.error({ message: error })
        res.status(500).json({ status: '-1', data: null, message: error })

    }
});

export default router;