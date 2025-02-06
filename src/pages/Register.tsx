import { Label, TextInput, Button } from "flowbite-react";
import React from "react";

const Register: React.FC = () => {
  return (
    <>
      <div>CREATE A NEW USER</div>
      <form className="flex max-w-md flex-col gap-4">
        {/* Email */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@email.com"
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
            placeholder="choose username"
            required
            shadow
          />
        </div>

        <Button type="submit">Register new account</Button>
      </form>
    </>
  );
};

export default Register;
