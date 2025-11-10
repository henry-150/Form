import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function UserForm() {
  //states
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    salary: "",
    mobile: "",
    profilePicture: ""
  });
  const [users, setUsers] = useState([])


  //useeffects
  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }, [])



  //handlefunctions

  // convert selected file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
    };

    if (file) reader.readAsDataURL(file);
  };

  // handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // send data to json-server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUsers = [...users, { ...formData, id: uuidv4() }]
      setUsers(newUsers)
      localStorage.setItem('users', JSON.stringify(newUsers))
      console.log(newUsers)
      alert("User saved!");
      setFormData({
        id: uuidv4(),
        name: "",
        city: "",
        salary: "",
        mobile: "",
        profilePicture: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error occurred");
    }
  };

  const handleEdit = (e,id) => {
    console.log(users)
    let d = users.filter(i=>i.id ===id)
    setFormData(d[0])

    let newUsers = users.filter((item) => {
      return item.id !== id
    }
    )

    setUsers(newUsers)

    console.log("newusers",newUsers)

    localStorage.setItem("users", JSON.stringify(users))

  }

  const handleDelete = (e,id) => {
    let x = users.filter(i=>i.id!==id)
    setUsers(x)

    localStorage.setItem("users", JSON.stringify(users))
  }
  
  

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border rounded"
          />

          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            type="number"
            className="w-full p-2 border rounded"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full p-2 border rounded"
          />

          {/* Upload Image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* Preview */}
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>

        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">User List</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Sr No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Profile Picture</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Edit</th>
                  <th className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.salary}</td>
                    <td className="px-6 py-4">
                      <img src={user.profilePicture} alt="img" className="w-10 h-10 object-cover border" />
                    </td>
                    <td className="px-6 py-4">{user.mobile}</td>
                    <td className="px-6 py-4">
                      <button onClick={(e)=>handleEdit(e,user.id)} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-200 transition">
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={(e)=>{handleDelete(e,user.id)}} className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>

    </>

  );
}
