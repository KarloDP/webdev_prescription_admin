import React, { useState } from 'react';

export default function PatientsPage() {
    const [patients, setPatients] = useState(initialPatients);
    const [form, setForm] = useState({
        patientID: '',
        firstName: '',
        lastName: '',
        password: '',
        birthDate: '',
        gender: '',
        contactNumber: '',
        address: '',
        email: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (
            form.patientID &&
            form.firstName &&
            form.lastName &&
            form.password &&
            form.birthDate &&
            form.gender &&
            form.contactNumber &&
            form.address &&
            form.email
        ) {
            setPatients([...patients, form]);
            setForm({
                patientID: '',
                firstName: '',
                lastName: '',
                password: '',
                birthDate: '',
                gender: '',
                contactNumber: '',
                address: '',
                email: ''
            });
        }
    };

    const handleDelete = (patientID) => {
        setPatients(patients.filter((p) => p.patientID !== patientID));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Patients</h2>
            <form onSubmit={handleAdd} style={{ marginBottom: '2rem' }}>
                <input name="patientID" placeholder="Patient ID" value={form.patientID} onChange={handleChange} required />
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
                <input name="birthDate" placeholder="Birth Date" type="date" value={form.birthDate} onChange={handleChange} required />
                <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <button type="submit">Add Patient</button>
            </form>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Password</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((p) => (
                        <tr key={p.patientID}>
                            <td>{p.patientID}</td>
                            <td>{p.firstName}</td>
                            <td>{p.lastName}</td>
                            <td>{p.password}</td>
                            <td>{p.birthDate}</td>
                            <td>{p.gender}</td>
                            <td>{p.contactNumber}</td>
                            <td>{p.address}</td>
                            <td>{p.email}</td>
                            <td>
                                <button onClick={() => handleDelete(p.patientID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}