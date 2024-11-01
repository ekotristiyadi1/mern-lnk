import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getEmails, createEmail, updateEmail, deleteEmail } from '../services/emailService';

interface Email {
  id: string;
  email: string;
  description: string;
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<{ email: string; description: string }>();
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchEmails(); 
    }
  }, [navigate]);

  const fetchEmails = async () => {
    const data = await getEmails();
    setEmails(data);
  };

  const onSubmit = async (data: { email: string; description: string }) => {
    if (editingId) {
      const payload = {...data, id: editingId}
      await updateEmail(editingId, payload);
      setEditingId(null);
    } else {
      await createEmail(data);
    }
    reset();
    fetchEmails();
  };

  const handleEdit = (email: Email) => {
    setEditingId(email.id);
    setValue('email', email.email);
    setValue('description', email.description);
  };

  const handleDelete = async (id: string) => {
    await deleteEmail(id);
    fetchEmails();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage List Send Emails</h2>
      {/* Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
        

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div><div>
          <label className="block font-medium">Description</label>
          <input
            type="text"
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {editingId ? 'Update Email' : 'Add Email'}
        </button>
      </form>

      {/* Email List */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Description</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td className="px-4 py-2 border-b">{email.email}</td>
              <td className="px-4 py-2 border-b">{email.description}</td>
              <td className="px-4 py-2 border-b space-x-2">
                <button
                  onClick={() => handleEdit(email)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(email.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailManager;
