import express from "express";
import {
    createOrganization,
    deleteOrganization,
    getOrganizationById,
    getOrganizations,
    manageOrganization,
    updateOrganization
} from "../controllers/organizationController";
import validateToken from "../middleware/validateTokenHandler";

const router = express.Router()

router
    .post('/create', validateToken, createOrganization)
    .get('/organizations', validateToken, getOrganizations)
    .get('/:organization_id', validateToken, getOrganizationById)
    .put('/update/:organization_id', validateToken, updateOrganization)
    .delete('/delete/:organization_id', validateToken, deleteOrganization)
    .patch('/:organization_id/manage', validateToken, manageOrganization);

export default router;