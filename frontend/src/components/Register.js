import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata } from './Context/ContextProvider';

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
  const history = useNavigate();

  const [inpval, setINP] = useState({
    name: '',
    email: '',
    employeeID: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, employeeID } = inpval;

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          work,
          add,
          mobile,
          desc,
          employeeID,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log('error');
        alert('error');
      } else {
        history.push('/');
        setUdata(data);
        console.log('data added');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              EmployeeID
            </label>
            <input type="text" value={inpval.employeeID} onChange={setdata} name="employeeID" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input type="text" value={inpval.add} onChange={setdata} name="add" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
          </div>

          <button type="submit" onClick={addinpdata} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
