import mongoose from 'mongoose';
import Organization from '../models/organizationModel';

export const findOrganizationByIdentifier = async (identifier: string) => {
    if (mongoose.Types.ObjectId.isValid(identifier)) {
        const organization = await Organization.findById(identifier)
            .populate('admins', 'name email')
            .populate('members', 'name email');
        return organization;
    } else {
        const organization = await Organization.findOne({ orgId: identifier })
            .populate('admins', 'name email')
            .populate('members', 'name email');
        return organization;
    }
};
