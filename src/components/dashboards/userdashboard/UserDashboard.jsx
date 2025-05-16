import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { auth } from '../../../api/auth';

const UserDashboard = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    const columns = [
        {
            name: 'User Name',
            selector: row => row.user_name,
        },
        {
            name: 'Full Name',
            selector: row => row.full_name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name:'Phone',
            selector: row => row.phone,
        },
        {
            name:'Status',
            selector: row => row.status,
        },
        {
            name:'Role',
            selector: row => row.rol,
        },
        {
            name:'City',
            selector: row => row.city
,
        },
        {
            name:'Department',
            selector: row => row.department,
        },
        {
            name:'Actions',
            cell: row => (
                <div>
                    <button className='btn btn-primary'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                </div>
            ),
        }
    ];

    const users = async () => {
        const response = (await auth.getAllUsers()).data;
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Error fetching users:", response);
            return [];
        }
    }

     const [records, setRecords] = React.useState([]);

    React.useEffect(() => {
        const fetchUsers = async () => {

            const response = await auth.getAllUsers();
            console.log("Response:", response);
            
            if (response.status === 200) {
                
                setRecords(response.data);
            } else {
                setRecords([]);
            }
        };
        fetchUsers();
    }, []);
    
    
    
    return (
        <div className="w-full px-4 py-4 bg-white rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Título y barra de búsqueda */}
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-xl font-semibold">Users</h2>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botón de crear */}
        <button className="self-start md:self-auto bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
          CREATE
        </button>
      </div>
            <DataTable
                columns={columns}
                data={records}
                pagination
            />
        </div>
    );
}  

export default UserDashboard;