import express from "express";
import {
    createOrganization,
    deleteOrganization,
    getOrganizationByIdentifier, // updated name here
    getOrganizations,
    joinOrganization,
    manageOrganization,
    updateOrganization,
} from "../controllers/organizationController";

const router = express.Router();

router
    .post('/create', createOrganization)
    .get('/organizations', getOrganizations)
    .get('/:identifier', getOrganizationByIdentifier) // <-- change here
    .put('/update/:identifier', updateOrganization)
    .delete('/delete/:identifier', deleteOrganization)
    .patch('/:identifier/manage', manageOrganization)
    .post('/join', joinOrganization);

export default router;
