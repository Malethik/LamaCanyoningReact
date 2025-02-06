import { Label, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import usePost from "../hooks/usePost";
import { RegisterUser } from "../model/user";

const Register: React.FC = () => {
  const { data, error, loading, postData } = usePost<RegisterUser>();
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const disabled = !email || !userName;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData("user/register", { email, userName });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div>CREATE A NEW USER</div>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow
            />
          </div>
          {/* UserName */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userName" value="Username" />
            </div>
            <TextInput
              id="userName"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="choose username"
              required
              shadow
            />
          </div>

          <Button type="submit" disabled={disabled}>
            Register new account
          </Button>
        </form>
        {error && <div>{error}</div>}
        {data && <div>{data.userName} created successfully!</div>}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default Register;
