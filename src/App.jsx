import { useEffect, useState } from 'react';
import './App.css';
import Button from "./Components/Button";
import Input from "./Components/Input";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {

  const URL = `https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10`

  const [urldata, seturlsata] = useState([]);
  const [userinfo, setuserinfo] = useState(false);
  const [finalresult, setfinalresult] = useState({});

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        seturlsata(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [handleSubmit]);

  function onsubmit(formdata) {
    const finalresult = urldata?.data?.data.filter(singledata => formdata.email === singledata.login.username && formdata.password === singledata.login.password)[0];

    if (finalresult) {
      setuserinfo(true);
      setfinalresult(finalresult);
    }
    else {
      seturlsata(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-4">
      <div className="flex w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg space-x-6">
        <form onSubmit={handleSubmit(onsubmit)} className="w-1/2 space-y-6">
          <Input
            label="Email"
            type="text"
            placeholder="Enter your Email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your Password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register('password', { required: 'Password is required' })}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-green-500 hover:via-teal-600 hover:to-blue-700 transition duration-300 ease-in-out"
          >
            Get Credential
          </Button>
        </form>

        {userinfo && finalresult && (
          <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">User Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{finalresult.login.username}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">UserName:</span>
                <span className="font-semibold">{finalresult.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">{finalresult.location.street.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{finalresult.phone}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center">
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
