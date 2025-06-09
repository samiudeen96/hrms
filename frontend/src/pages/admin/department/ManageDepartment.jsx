import React, { useEffect, useState } from 'react'
import Title from "../../../components/Title"
import { useDeptList, useDptCreate, usePositionCreate } from '../../../hooks/deptHook';
import { toast } from 'react-hot-toast';


const ManageDepartment = () => {

  const { data: deptList, refetch: refetchDeptList } = useDeptList();

  const initialState = {
    deptName: "",
    subDepartment: "",
    dept_id: "",
    positionName: ""
  }

  const [formData, setFormData] = useState(initialState);

  // Automatically update deptSubName when deptName changes
  useEffect(() => {
    if (formData.deptName.trim()) {
      const words = formData.deptName.trim().split(" ");
      const initials = words.map(word => word.charAt(0).toUpperCase()).join("");
      setFormData(prev => ({
        ...prev,
        subDepartment: initials
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        subDepartment: ""
      }));
    }
  }, [formData.deptName, formData.deptName]);

  



  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const createDept = useDptCreate();

  const onDptSubmit = (e) => {
    e.preventDefault();
    console.log("formData");

    createDept.mutate(formData, {
      onSuccess: () => {
        toast.success("Department has created successfully")
        setFormData(initialState);
        refetchDeptList(); // ✅ Refresh department list
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message)
      }
    })

  }

  const createPosition = usePositionCreate();

  const onPositionSubmit = (e) => {
    e.preventDefault();
    console.log("formData");

    createPosition.mutate(formData, {
      onSuccess: () => {
        toast.success("Position has created successfully")
        setFormData(initialState);
      },
      onError: (error) => {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        toast.error(message)
      }
    })
  }

  return (
    <div className="wrapper space-y-10">

      {/* Department Form */}
      <div>
        <Title title={"Add Department"} />
        <form onSubmit={onDptSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Department */}
            <div>
              <label className="label">Department <sup className="text-red-500">*</sup></label>
              <input
                type="text"
                className="input"
                placeholder="Enter Department"
                name="deptName"
                value={formData.deptName}
                onChange={onChangeHandler}
              />
            </div>

            {/* Department Sub Name */}
            <div>
              <label className="label">Department Sub Name <sup className="text-red-500">*</sup></label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Sub Name"
                  name="subDepartment"
                  value={formData.subDepartment}
                  onChange={onChangeHandler}
                // readOnly
                />
                <button type="submit" className="button_primary">Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Position Form */}
      <div>

        <Title title={"Add Position"} />
        <form onSubmit={onPositionSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Select Department */}
            <div>
              <label className="label">Select Department <sup className="text-red-500">*</sup></label>
              <select
                className="input"
                name="dept_id"
                value={formData.dept_id}
                onChange={onChangeHandler}
              >
                <option value="" disabled>Select position</option>
                {deptList?.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="label">Position <sup className="text-red-500">*</sup></label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Position"
                  name="positionName"
                  value={formData.positionName}
                  onChange={onChangeHandler}
                />
                <button type="submit" className="button_primary">Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>

  )
}

export default ManageDepartment