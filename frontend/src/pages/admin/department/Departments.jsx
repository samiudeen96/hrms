import React from 'react'
import { useDeptList, usePositionList } from '../../../hooks/deptHook';

const Departments = () => {
  const { data: deptList } = useDeptList();
  const { data: positionList } = usePositionList();

  return (
    <div className="grid grid-cols-4 gap-5">
      {deptList?.map((dept) => {
        const deptPositions = positionList?.filter(pos => pos.dept_id === dept.id) || [];

        return (
          <div key={dept.id} className="wrapper">
            <h2 className="font-bold text-md mb-2">{dept.name}</h2>

            {deptPositions?.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {deptPositions?.map((pos) => (
                  <li key={pos.id}>{pos.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No positions added yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Departments;
