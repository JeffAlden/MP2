import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUpAdmin = () => {
  const [signUpData, setSignUpData] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: ''
  });

  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const viewAdmin = (admin) => {
    setCurrentAdmin(admin);
    setIsModalVisible(true);
    toast.info(`Viewing details for ${admin.Name}`);
  };


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('signUpAdminData')) || [];
    setSignUpData(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('signUpAdminData', JSON.stringify(signUpData));
  }, [signUpData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAdminId !== null) {
      const updatedSignUpData = signUpData.map(admin =>
        admin.id === currentAdminId ? { ...admin, ...formData } : admin
      );
      setSignUpData(updatedSignUpData);
      setCurrentAdminId(null);
      toast.success('Admin data updated successfully!');
    } else {
      const newAdmin = {
        id: Date.now(),
        ...formData
      };
      setSignUpData(prev => [...prev, newAdmin]);
      toast.success('Admin added successfully!');
    }
    setFormData({
      Name: '',
      Email: '',
      Phone: '',
      Address: ''
    });
    setIsFormVisible(false);
  };

  const editAdmin = (id) => {
    const adminToEdit = signUpData.find(admin => admin.id === id);
    setIsFormVisible(true);
    setCurrentAdminId(adminToEdit.id);
    setFormData(adminToEdit);
    toast.info(`Editing details for ${adminToEdit.Name}`);
  };

  const deleteAdmin = (id) => {
    setSignUpData(signUpData.filter(admin => admin.id !== id));
    toast.error('Admin deleted successfully!');
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      {/* Tabs */}
      <nav>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <Link className="nav-link" to="/staff-management">Staff Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/signup-admin">Sign Up Admin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact-us-admin">Contact Us Admin</Link>
          </li>
        </ul>
      </nav>

      <h1 className="text-center mb-4">Sign Up Admin</h1>
      <button className="btn btn-primary mb-4" onClick={() => setIsFormVisible(true)}>Add Client</button>

      {/* Table wrapped in a responsive div */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Address</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {signUpData.map(admin => (
              <tr key={admin.id}>
                <td className="text-center">{admin.id}</td>
                <td className="text-center">{admin.Name}</td>
                <td className="text-center">{admin.Email}</td>
                <td className="text-center">{admin.Phone}</td>
                <td className="text-center">{admin.Address}</td>
                <td className="text-center">
                  <button style={{ backgroundColor: '#0DCAF0', borderColor: '#0DCAF0' }} className="btn mr-2" onClick={() => viewAdmin(admin)}>View</button>
                  <button style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }} className="btn mr-2" onClick={() => editAdmin(admin.id)}>Edit</button>
                  <button style={{ backgroundColor: '#DC3545', borderColor: '#DC3545', color: '#FFFFFF' }} className="btn" onClick={() => deleteAdmin(admin.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/staff-management" className="btn btn-secondary mb-4 float-end">Back to Staff Management</Link>

      {isFormVisible && (
        <div className="container mt-5">
          <h3>{currentAdminId !== null ? 'Edit Admin' : 'Add New Admin'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Phone">Phone:</label>
              <input
                type="tel"
                className="form-control"
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address:</label>
              <textarea
                className="form-control"
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsFormVisible(false)}>Cancel</button>
          </form>
        </div>
      )}
      {isModalVisible && currentAdmin && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Details</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalVisible(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {currentAdmin.id}</p> {/* This line is added to show the ID */}
                <p><strong>Name:</strong> {currentAdmin.Name}</p>
                <p><strong>Email:</strong> {currentAdmin.Email}</p>
                <p><strong>Phone:</strong> {currentAdmin.Phone}</p>
                <p><strong>Address:</strong> {currentAdmin.Address}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalVisible(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SignUpAdmin;
