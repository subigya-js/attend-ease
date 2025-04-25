import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { OrganizationType } from '../types/organization';
import Organization from '../models/organizationModel';
import { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: JwtPayload;
}

// @desc Create a new organization
// @route POST /api/create/organization
// @access Private
const createOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, orgId } = req.body;
    if (!name || !orgId) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const organizationExists = await Organization.findOne({ orgId });
    if (organizationExists) {
        res.status(400);
        throw new Error('Organization already exists');
    }
    const organization = await Organization.create({
        name,
        orgId,
        admins: [req.user?.id],
        members: [],
    });

    if (organization) {
        res.status(201).json({
            organization_id: organization._id,
            name: organization.name,
            orgId: organization.orgId,
            admins: organization.admins,
            members: organization.members,
            holidays: organization.holidays,
            createdAt: organization.createdAt,
        });
    } else {
        res.status(400);
        throw new Error('Invalid organization data');
    }
})

// @desc Get all organizations
// @route GET /api/get/organizations
// @access Private
const getOrganizations = asyncHandler(async (req: AuthRequest, res: Response) => {
    const organizations = await Organization.find({
        $or: [
            { admins: req.user?.id },
            { members: req.user?.id }
        ]
    })
        .populate('admins', 'name email')
        .populate('members', 'name email');

    if (organizations) {
        res.status(200).json(organizations);
    } else {
        res.status(400);
        throw new Error('No organizations found');
    }
})

// @desc Get organization by ID
// @route GET /api/get/organization/:organization_id
// @access Private
const getOrganizationById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { organization_id } = req.params;
    const organization = await Organization.findById(organization_id)
        .populate('admins', 'name email')
        .populate('members', 'name email');
    if (organization) {
        res.status(200).json(organization);
    }
    else {
        res.status(404);
        throw new Error('Organization not found');
    }
})
// @desc Update organization
// @route PUT /api/update/organization/:organization_id
// @access Private
const updateOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { organization_id } = req.params;
    const { name, orgId, holidays } = req.body;

    const organization = await Organization.findById(organization_id);
    if (!organization) {
        res.status(404);
        throw new Error('Organization not found');
    }
    if (organization.admins.includes(req.user?.id)) {
        const updatedOrganization = await Organization.findByIdAndUpdate(
            organization_id,
            {
                name: name || organization.name,
                orgId: orgId || organization.orgId,
                holidays: holidays || organization.holidays,
            },
            { new: true }
        );
        res.status(200).json(updatedOrganization);
    }
    else {
        res.status(403);
        throw new Error('Not authorized to update this organization');
    }
});