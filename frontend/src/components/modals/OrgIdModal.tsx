import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

interface OrgIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orgId: string, orgName?: string) => void;
}

const OrgIdModal: React.FC<OrgIdModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [joinOrgId, setJoinOrgId] = useState('');
  const [createOrgId, setCreateOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [error, setError] = useState<string | null>(null);

  const createOrganization = async (name: string, orgId: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found')
    }
    try {
      const response = await fetch('http://localhost:3001/api/organization/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, orgId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create organization');
      }

      return data;
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  };

  const joinOrganization = async (organizationId: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found')
    }
    try {
      const response = await fetch('http://localhost:3001/api/organization/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ organizationId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join organization');
      }

      return data;
    } catch (error) {
      console.error('Error joining organization:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (activeTab === 'join') {
        await joinOrganization(joinOrgId);
        onSubmit(joinOrgId);
      } else {
        await createOrganization(orgName, createOrgId);
        onSubmit(createOrgId, orgName);
      }
      setJoinOrgId('');
      setCreateOrgId('');
      setOrgName('');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'join'
              ? 'text-black border-b-2 border-black font-semibold cursor-pointer'
              : 'text-gray-500'
              }`}
            onClick={() => setActiveTab('join')}
          >
            Join Organization
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'create'
              ? 'text-black border-b-2 border-black font-semibold cursor-pointer'
              : 'text-gray-500'
              }`}
            onClick={() => setActiveTab('create')}
          >
            Create Organization
          </button>
        </div>
        <DialogHeader>
          <DialogTitle>{activeTab === 'join' ? 'Enter Organization ID' : 'Create Organization'}</DialogTitle>
          <DialogDescription className="text-[12.5px] text-gray-400">
            {activeTab === 'join'
              ? 'Please enter the ID of the organization you want to join.'
              : 'Create a new organization by entering a name and a unique ID.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {activeTab === 'join' ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="joinOrgId" className="block text-sm font-medium text-gray-700">
                  Organization ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="joinOrgId"
                  value={joinOrgId}
                  onChange={(e) => setJoinOrgId(e.target.value)}
                  placeholder="Enter the Organization ID to join"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Enter your Organization Name"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="createOrgId" className="block text-sm font-medium text-gray-700">
                    Organization ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="createOrgId"
                    value={createOrgId}
                    onChange={(e) => setCreateOrgId(e.target.value)}
                    placeholder="Enter a unique Organization ID"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <DialogFooter>
            <Button type="submit">
              {activeTab === 'join' ? 'Join' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrgIdModal;
