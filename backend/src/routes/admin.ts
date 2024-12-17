import express from "express";
import { Request, Response } from "express";
import Config, {IConfig} from "../models/Config";

interface ConfigRequestBody {
    page: string;
    components: string;
}

const app = express.Router();

app.get('/settings/:page', async (req: Request, res: Response): Promise<any> => {
    try {
        const { page } = req.params;

        const pageSettings = await Config.findOne({ page });

        if (!pageSettings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        res.status(200).json({ pageSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching settings', error });
    }
});

app.post('/settings', async (req: Request, res: Response): Promise<any> => {
    try {
        const { page, components } = req.body;

        if (!page || !Array.isArray(components) || components.length === 0) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        let pageSettings = await Config.findOne({ page });
        if (pageSettings) {
            pageSettings.components = components;
            await pageSettings.save();
        } else {
            pageSettings = new Config({ page, components });
            await pageSettings.save();
        }

        res.status(200).json({ message: 'Settings updated successfully', pageSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating settings', error });
    }
});

export default app;