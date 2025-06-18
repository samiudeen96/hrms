import React, { useEffect, useState } from 'react'
import { useListEmp } from '../../../hooks/employeeHook'
import { useSelector } from 'react-redux';

const ManualEntry = () => {
  const { data: employeeList } = useListEmp();
  const { loggedData } = useSelector((state) => state.auth);

  const initialState = {
    emp_id: "",
    date: "",
    check_in: "",
    check_out: "",
    break_in: "",
    break_out: "",
    status: "absent",
    reason: "",
    created_by: loggedData?.role
  }

  const [formData, setFormData] = useState(initialState)

  const status = [{ id: 1, label: "absent" }, { id: 2, label: "present" }, { id: 3, label: "leave" }]

  useEffect(() => {
    if (formData.check_in) {
      setFormData((prev) => ({ ...prev, status: "present" }))
    } else {
      setFormData((prev) => ({ ...prev, status: "absent" }));
    }
  }, [formData.check_in])

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  }


  return (
    <div>

      <div className="">
        <form className='flex gap-4' onSubmit={onSubmitHandler} >

          <div className='wrapper space-y-4 flex-1'>

            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <label className='label'>Select employee</label>
                <div className='select_option'>
                  <select className="input" name='emp_id' value={formData.emp_id} onChange={onChangeHandler} >
                    <option value="" disabled>Select Employee</option>
                    {employeeList?.map((item) => (
                      <option key={item.employee.id} value={item.employee.id}>{item.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='label'>Select date</label>
                <input type="date" className="input" name="date" value={formData.date} onChange={onChangeHandler} />
              </div>

              <div>
                <label className='label'>Check-in</label>
                <input
                  type="time"
                  placeholder="Check-In"
                  className="input"
                  name='check_in'
                  value={formData.check_in}
                  onChange={onChangeHandler}
                />
              </div>

              <div>
                <label className='label'>Break-in</label>
                <input type="time" placeholder="Check-In" className="input" name='break_in' value={formData.break_in} onChange={onChangeHandler} />
              </div>

              <div>
                <label className='label'>Break-out</label>
                <input type="time" placeholder="Check-Out" className="input" name='break_out' value={formData.break_out} onChange={onChangeHandler} />
              </div>

              <div>
                <label className='label'>Check-out</label>
                <input type="time" placeholder="Check-Out" className="input" name='check_out' value={formData.check_out} onChange={onChangeHandler} />
              </div>
            </div>

            <div>
              <label className='label'>Reason</label>
              <textarea className='input' placeholder='Reason for the manual entry' name='reason' value={formData.reason} onChange={onChangeHandler}></textarea>
            </div>

            <div className='flex justify-center'>
              <button className="button_primary">
                Submit
              </button>
            </div>

          </div>

          <div className='wrapper space-y-4 flex-1 h-min'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='label'>Select status</label>
                <div className='select_option'>
                  <select className="input" name='status' value={formData.status} onChange={onChangeHandler}>
                    <option value="" disabled>Select status</option>
                    {status.map(item => (
                      <option key={item.id} value={item.label}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className='label'>Created by</label>
                <input
                  type="text"
                  placeholder="Created by"
                  className="input"
                  name='created_by'
                  value={formData.created_by}
                  onChange={onChangeHandler}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default ManualEntry