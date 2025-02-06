import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { LoginUser } from "../model/user";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { postData } = usePost<LoginUser>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFail, setLoginFail] = useState<string>("");
  const navigate = useNavigate();
  const isDisabled = !email || !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await postData("user/login", { email, password });
    if (response?.token) {
      localStorage.setItem("token", response.token);
      navigate("/");
    } else {
      setLoginFail("Password e/o username errati");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
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
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="true"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
              autoComplete="true"
            />
          </div>

          <Button type="submit" disabled={isDisabled} onClick={handleSubmit}>
            Login
          </Button>
        </form>
        {loginFail && <div>{loginFail}</div>}
      </div>
    </>
  );
};

export default Login;
