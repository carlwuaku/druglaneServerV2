import { add_insurer_function, delete_insurer_function, get_insurers_function, get_users_function, get_user_function, login_function, save_user_function } from "../services/admin.service";
import { runMigrations } from "../config/migrations/migrations";
const request = require('supertest');
import { app } from '../server';
import { InsuranceProviders } from "../models/InsuranceProviders";
import { Users } from "../models/Users";

const userCarl = {
    "name": "carl",
    "role_id": 1,
    "email": "wuakuc@gmail.com",
    username: "carl",
    "display_name": "Carl Kojo",
    "active": 1,
    "phone": "0203934",
    "allow_online": "yes",
    "password": "1234"
};

const userDoris = {
    "name": "doris",
    "role_id": 1,
    "email": "doris@gmail.com",
    username: "doris",
    "display_name": "Abena Dross",
    "active": 1,
    "phone": "020399874",
    "allow_online": "yes",
    "password": "2345"
};

const userHarriet = {
    "name": "harriet",
    "role_id": 1,
    "email": "harriet@gmail.com",
    username: "harriet",
    "display_name": "H Yankson",
    "active": 1,
    "phone": "020345114",
    "allow_online": "yes",
    "password": "0000"
};


describe('Admin Service', () => {

    beforeAll(() => {
        return runMigrations();
    });

    it('add an insurer', async () => {
        //clear the table and try to insert
        await InsuranceProviders.destroy({ truncate: true, force: true });
        const insurer = await add_insurer_function({ name: "NHS" })
        expect(insurer).toBeInstanceOf(InsuranceProviders);
        const numExisting = await get_insurers_function();
        expect(numExisting).toHaveLength(1)
    });


    it('deletes insurer', async () => {
        await InsuranceProviders.destroy({ truncate: true, force: true });
        const insurer = await add_insurer_function({ name: "NHS" });
        await delete_insurer_function({ id: insurer.id.toString() });
        const numExisting = await get_insurers_function();
        expect(numExisting).toHaveLength(0)
    })


    it('adds a user', async () => {
      
            await Users.destroy({ truncate: true, force: true });
            const user = await save_user_function(userCarl);
            expect(user).toBeInstanceOf(Users);
            //get the users and expect it to have one user
            const users = await get_users_function({ offset: 0, limit: 10 });
            expect(users).toHaveLength(1)
        
        
    })

    it('adds does not allow duplicate username', async () => {

        await Users.destroy({ truncate: true, force: true });
        const user = await save_user_function(userCarl);
        //add again
        await expect(save_user_function).rejects.toThrow("Error adding a user")
        
    });

    it('adds multiple users', async () => {
        await Users.destroy({ truncate: true, force: true });

        await Users.bulkCreate([userCarl, userDoris, userHarriet]);
        const users = await get_users_function({ offset: 0, limit: 10 });
        
        expect(users).toHaveLength(3)
    });

    it('deletes users', async () => {
        await Users.destroy({ truncate: true, force: true });

        const carl = await save_user_function(userCarl);
        const doris = await save_user_function(userDoris);
        const harriet = await save_user_function(userHarriet);

        carl.destroy();

        let users = await Users.findAll()
        expect(users).toHaveLength(2);

        doris.destroy();
        users = await Users.findAll();
        expect(users).toHaveLength(1)
    })

    it('logs user in with correct credentials', async () => {
        await Users.destroy({ truncate: true, force: true });

        await save_user_function(userCarl);
        const login_details = await login_function({ "password": "1234", "username": "carl" });
        expect(login_details).toBeInstanceOf(Users);
    });

    it('does not log user in with wrong password', async () => {
        await Users.destroy({ truncate: true, force: true });

        await save_user_function(userCarl);
        await expect(login_function({ "password": "0004", "username": "carl" })).rejects.
            toThrow("User not found")
        
    });

    it('does not log user in with wrong username', async () => {
        await Users.destroy({ truncate: true, force: true });
        await save_user_function(userCarl);
        await expect(login_function({ "password": "1234", "username": "joojo" })).rejects.
            toThrow("User not found")        
    });


    it('updates a user',async () => {
        await Users.destroy({ truncate: true, force: true });

        let carl = await save_user_function(userCarl);
        //update the user's name to amina
        await carl.update({ display_name: 'Aminatu', username: 'amina' });
        let new_carl = await Users.findOne({ where: { id: carl.id } });
        console.log(new_carl)
        expect(new_carl.display_name).toBe("Aminatu");
        expect(new_carl.username).toBe("amina")
    })


    it('fetches  a user based on id', async () => {
        await Users.destroy({ truncate: true, force: true });

        let carl = await save_user_function(userCarl);
        carl = await get_user_function({ id: carl.id });
        expect(carl).toBeInstanceOf(Users);
        expect(carl.username).toBe("carl")
    })

    
})