import { logger } from '../config/logger';
import express, { Router, Response, Request } from 'express';
const router: Router = express.Router();
import {getSettings, get_branches_function, get_insurers_function, get_logo_function, login_function, save_branch_function} from '../services/admin.service'


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

router.get('/settings',async (req:Request, res: Response) => {
    try {
        let data = await getSettings();
        res.json(data);
    } catch (error) {
        logger.error({message: error})
        res.status(500).json({ status: '-1', data: null, message: error })

    }
})

export default router;