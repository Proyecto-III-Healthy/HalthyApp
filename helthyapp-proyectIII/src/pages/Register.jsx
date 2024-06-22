import { useState } from "react";
import { createUser } from "../services/UserService";
import Input from "../components/Input/Input";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    gender: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleComplete = () => {
    // Handle form completion logic here

    createUser(user)
      .then((user) => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };
  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  return (
    <>
      <FormWizard
        shape="circle"
        color="#e74c3c"
        onComplete={handleComplete}
        onSubmit={handleComplete}
        onTabChange={tabChanged}
      >
        <FormWizard.TabContent title="Personal details" icon="ti-user">
          {/* Add your form inputs and components for the frst step */}
          <h1>First Tab</h1>
          <p>Some content for the first tab</p>
          <Input
            value={user.email}
            onChange={handleInputChange}
            name="email"
            type="email"
            title="Email"
          />
          <Input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            type="password"
            title="Password"
          />
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Info" icon="ti-settings">
          <h1>Second Tab</h1>
          <p>Some content for the second tab</p>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Prueba" icon="ti-settings">
          <h1>Third Tab</h1>
          <p>Some content for the second tab</p>
          <select
            className="form-select"
            aria-label="Default select example"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
          >
            <option selected>Género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Last step" icon="ti-check">
          <h1>Last Tab</h1>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
      </FormWizard>
      {/* add style */}
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
};

export default Register;
