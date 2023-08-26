import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactUsAdmin = () => {
  const [contactUsData, setContactUsData] = useState([]);
  const [currentContactId, setCurrentContactId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
    Message: ''
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contactUsAdminData')) || [];
    setContactUsData(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('contactUsAdminData', JSON.stringify(contactUsData));
  }, [contactUsData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentContactId !== null) {
      const updatedContactUsData = contactUsData.map(contact =>
        contact.id === currentContactId ? { ...contact, ...formData } : contact
      );
      setContactUsData(updatedContactUsData);
      setCurrentContactId(null);
      toast.success("Contact updated successfully!");
    } else {
      const newContact = {
        id: Date.now(),
        ...formData
      };
      setContactUsData(prev => [...prev, newContact]);
      toast.success("Contact added successfully!");
    }
    setFormData({
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
      Message: ''
    });
    setIsFormVisible(false);
  };

  const deleteContact = (id) => {
    setContactUsData(contactUsData.filter(contact => contact.id !== id));
    toast.error("Contact deleted successfully!");
  };

  const editContact = (contact) => {
    setIsFormVisible(true);
    setCurrentContactId(contact.id);
    setFormData({
      Name: contact.Name,
      Email: contact.Email,
      Phone: contact.Phone,
      Address: contact.Address,
      Message: contact.Message,
    });
    toast.info(`Editing details for ${contact.Name}`);
  };

  const viewContact = (contact) => {
    setCurrentContact(contact);
    setIsModalVisible(true);
    toast.info(`Viewing details for ${contact.Name}`);
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
            <Link className="nav-link" to="/signup-admin">Sign Up Admin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/contact-us-admin">Contact Us Admin</Link>
          </li>
        </ul>
      </nav>

      <h1 className="text-center mb-4">Contact Us Admin</h1>
      <button className="btn btn-primary mb-4" onClick={() => setIsFormVisible(true)}>Add Client</button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactUsData.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.Name}</td>
              <td>{contact.Email}</td>
              <td>{contact.Phone}</td>
              <td>{contact.Address}</td>
              <td>{contact.Message}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewContact(contact)}>View</button>
                <button className="btn btn-warning mr-2" onClick={() => editContact(contact)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/staff-management" className="btn btn-secondary mb-4 float-end">Back to Staff Management</Link>

      {isFormVisible && (
        <div className="container mt-5">
          <h3>Add New Message</h3>
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
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Message">Message:</label>
              <textarea
                className="form-control"
                id="Message"
                name="Message"
                value={formData.Message}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsFormVisible(false)}>Cancel</button>
          </form>
        </div>
      )}
      {isModalVisible && currentContact && (
        <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>ID:</strong> {currentContact.id}</p> {/* This line is added */}
            <p><strong>Name:</strong> {currentContact.Name}</p>
            <p><strong>Email:</strong> {currentContact.Email}</p>
            <p><strong>Phone:</strong> {currentContact.Phone}</p>
            <p><strong>Address:</strong> {currentContact.Address}</p>
            <p><strong>Message:</strong> {currentContact.Message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalVisible(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}


export default ContactUsAdmin;

