import express from "express";
import {
    createOrganization,
    deleteOrganization,
    getOrganizationById,
    getOrganizations,
    joinOrganization,
    manageOrganization,
    updateOrganization,
} from "../controllers/organizationController";

const router = express.Router()

router
    .post('/create', createOrganization)
    .get('/organizations', getOrganizations)
    .get('/:organization_id', getOrganizationById)
    .put('/update/:organization_id', updateOrganization)
    .delete('/delete/:organization_id', deleteOrganization)
    .patch('/:organization_id/manage', manageOrganization)
    .post('/join', joinOrganization);

export default router;