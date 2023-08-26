import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import api from './api';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  
  const [currentStaff, setCurrentStaff] = useState(null);
  
  const viewData = (index) => {
    setCurrentStaff(staffMembers[index]);
    setIsModalVisible(true);
    toast.info('Viewing staff member details');
  };

  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state && location.state.loggedIn) {
      toast.success('Logged in successfully!');
    }
    fetchStaffData();
  }, [location.state]);

  const fetchStaffData = () => {
    api.get('/staff')
      .then(response => setStaffMembers(response.data))
      .catch(error => console.error('Error fetching staff:', error));
  };

  const editData = (index) => {
    const staffToEdit = staffMembers[index];
    setFormData({
      id: staffToEdit.id,
      name: staffToEdit.name,
      email: staffToEdit.email,
      phoneNumber: staffToEdit.phoneNumber,
      address: staffToEdit.address
    });
    setIsFormVisible(true);
    setIsEditing(true);
    toast.info('Editing staff member. Update the form and save!');
  };

  const deleteData = (index) => {
    const staffToDelete = staffMembers[index];
    api.delete(`/staff/${staffToDelete.id}`)
      .then(() => {
        const updatedStaffMembers = [...staffMembers];
        updatedStaffMembers.splice(index, 1);
        setStaffMembers(updatedStaffMembers);
        toast.error('Staff member deleted successfully!');
      })
      .catch(() => {
        toast.error("Error deleting staff member!");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditing) {
      try {
        const updatedStaffMember = { ...formData };
        const response = await api.put(`/staff/${updatedStaffMember.id}`, updatedStaffMember);
        setStaffMembers(prevStaffMembers => 
          prevStaffMembers.map(staff => 
            staff.id === updatedStaffMember.id ? response.data.data : staff
          )
        );
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          address: ''
        });
        setIsFormVisible(false);
        setIsEditing(false);
        toast.success('Staff member updated successfully!');
      } catch (error) {
        console.error('Error updating staff:', error);
        toast.error('Failed to update staff member. Please try again.');
      }
    } else {
      try {
        const newStaffMember = { ...formData };
        const response = await api.post('/staff', newStaffMember);
        setStaffMembers(prevStaffMembers => [...prevStaffMembers, response.data.data]);
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          address: ''
        });
        setIsFormVisible(false);
        toast.success('Staff member added successfully!');
      } catch (error) {
        console.error('Error adding staff:', error);
        toast.error('Failed to add staff member. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* Navigation */}
      <nav>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/staff-management">Staff Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup-admin">Sign Up Admin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact-us-admin">Contact Us Admin</Link>
          </li>
        </ul>
      </nav>

      {/* Title */}
      <h1 className="text-center mb-4">Staff Management</h1>

      {/* Add Data Button */}
      <button className="btn btn-primary mb-4" onClick={() => { setIsFormVisible(true); setIsEditing(false); setFormData({ name: '', email: '', phoneNumber: '', address: '' }); }}>Add Data</button>

      {/* Staff Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Address</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff, index) => (
              <tr key={staff.id}>
                <td className="text-center">{staff.id}</td>
                <td className="text-center">{staff.name}</td>
                <td className="text-center">{staff.email}</td>
                <td className="text-center">{staff.phoneNumber}</td>
                <td className="text-center">{staff.address}</td>
                <td className="text-center">
                  <button style={{ backgroundColor: '#0DCAF0', borderColor: '#0DCAF0', color: '#000000' }} className="btn mr-2" onClick={() => viewData(index)}>View</button>
                  <button style={{ backgroundColor: '#FFC107', borderColor: '#FFC107', color: '#000000' }} className="btn mr-2" onClick={() => editData(index)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteData(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="btn btn-secondary mb-4 float-end">Back to Home</Link>

      {/* Add/Edit Data Form */}
      {isFormVisible && (
        <div className="container mt-5">
          <h3>Add Data</h3>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'phoneNumber', 'address'].map((field, idx) => (
              <div key={idx} className="form-group">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className="form-control"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-success mr-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsFormVisible(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* View Staff Modal */}
      {isModalVisible && currentStaff && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Staff Details</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalVisible(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {currentStaff.id}</p>
                <p><strong>Name:</strong> {currentStaff.name}</p>
                <p><strong>Email:</strong> {currentStaff.email}</p>
                <p><strong>Phone:</strong> {currentStaff.phoneNumber}</p>
                <p><strong>Address:</strong> {currentStaff.address}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalVisible(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default StaffManagement;
