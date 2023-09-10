import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from './Context/ContextProvider';

const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const getdata = async () => {
    try {
      const res = await fetch(`http://localhost:3000/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log('error');
      } else {
        setINP(data);
        console.log('get data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, employeeID } = inpval;

    try {
      const res2 = await fetch(`http://localhost:3000/updateuser/${id}`, {
        method: 'PATCH',
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

      const data2 = await res2.json();
      console.log(data2);

      if (res2.status === 422 || !data2) {
        alert('Fill in the data');
      } else {
        navigate('/');
        setUPdata(data2);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              EmployeeID
            </label>
            <input
              type="text"
              value={inpval.employeeID}
              onChange={setdata}
              name="employeeID"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpval.add}
              onChange={setdata}
              name="add"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <button type="submit" onClick={updateuser} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
