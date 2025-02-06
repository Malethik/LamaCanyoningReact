import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const Login: React.FC = () => {
    
  return (
    <>
      <span className="mb-2 block">LOGIN</span>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput id="password2" type="password" required shadow />
        </div>

        <Button type="submit">Register new account</Button>
      </form>
    </>
  );
};

export default Login;
