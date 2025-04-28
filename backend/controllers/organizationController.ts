import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import Organization from '../models/organizationModel';
import { findOrganizationByIdentifier } from '../utils/findOrganization';

interface AuthRequest extends Request {
    user?: JwtPayload;
}

// @desc Create a new organization
// @route POST /api/organization/create
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
// @route GET /api/organizations
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

// @desc Join an organization
// @route POST /api/organization/join
// @access Private
const joinOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { organizationId } = req.body;

    if (!organizationId) {
        res.status(400);
        throw new Error('Organization ID is required');
    }

    const organization = await Organization.findOne({ orgId: organizationId });
    if (!organization) {
        res.status(404);
        throw new Error('Organization not found');
    }

    if (organization.members.includes(req.user?.id)) {
        res.status(400);
        throw new Error('Already a member of this organization');
    }

    organization.members.push(req.user?.id);
    await organization.save();

    res.status(200).json({
        message: 'Successfully joined the organization',
        organization_id: organization._id,
        name: organization.name,
        orgId: organization.orgId,
    });
});

// @desc Get Organization by ID or orgId
// @route GET /api/organization/:identifier
// @access Private
const getOrganizationByIdentifier = asyncHandler(async (req: Request, res: Response) => {
    const { identifier } = req.params;

    let organization;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
        // If identifier is a valid MongoDB ObjectId
        organization = await Organization.findById(identifier)
            .populate('admins', 'name email')
            .populate('members', 'name email');
    } else {
        // Otherwise search by orgId
        organization = await Organization.findOne({ orgId: identifier })
            .populate('admins', 'name email')
            .populate('members', 'name email');
    }

    if (!organization) {
        res.status(404);
        throw new Error('Organization not found');
    }

    res.status(200).json(organization);
});

// @desc Update organization
// @route PUT /api/organization/update/:organization_id
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

// @desc Delete Organization
// @route DELETE /api/organization/delete/:organization_id
// @access Private
const deleteOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { organization_id } = req.params;

    const organization = await Organization.findById(organization_id);

    if (!organization) {
        res.status(404);
        throw new Error('Organization not found');
    }

    if (!organization.admins.includes(req.user?.id)) {
        res.status(403);
        throw new Error('Not authorized to delete this organization');
    }

    await Organization.findByIdAndDelete(organization_id);

    res.status(200).json({ message: 'Organization deleted successfully' });
});

// @desc Add or remove admins and remove members
// @route PATCH /api/organization/:organization_id/manage
// @access Private
const manageOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
    const organization_id = req.params.organization_id;
    const { addAdmin = [], removeAdmin = [], removeMember = [] } = req.body;
    const organization = await Organization.findById(organization_id);
    if (!organization) {
        res.status(404);
        throw new Error('Organization not found');
    }
    if (!organization.admins.includes(req.user?.id)) {
        res.status(403);
        throw new Error('Only admins can manage the organization');
    }

    // add admin
    if (addAdmin.length > 0) {
        organization.admins.push(...addAdmin);
    }
    // remove admin
    if (removeAdmin.length > 0) {
        organization.admins = organization.admins.filter(
            (admin) => !removeAdmin.includes(admin.toString())
        );
    }
    // remove member
    if (removeMember.length > 0) {
        organization.members = organization.members.filter(
            (member) => !removeMember.includes(member.toString())
        );
    }
    const updatedOrganization = await organization.save();
    res.status(200).json(updatedOrganization);
});

export {
    createOrganization, deleteOrganization, getOrganizationByIdentifier, getOrganizations, joinOrganization, manageOrganization, updateOrganization
};
