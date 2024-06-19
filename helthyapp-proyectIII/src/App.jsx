import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import Input from "./components/Input/Input";
import { useState } from "react";
import { createUser } from "./services/UserService";

function App() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    gender: ""
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    })
  }


  const handleComplete = () => {
    alert("Form completed!");
    // Handle form completion logic here

    createUser(user)
      .then(user => {
        console.log(user.email)
      })
      .catch(err => console.error(err))
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }) => {
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
          <Input value={user.email} onChange={handleInputChange} name="email" type="email" title="Email"/>
          <Input value={user.password} onChange={handleInputChange} name="password" type="password" title="Password"/>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Info" icon="ti-settings">
          <h1>Second Tab</h1>
          <p>Some content for the second tab</p>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Prueba" icon="ti-settings">
          <h1>Third Tab</h1>
          <p>Some content for the second tab</p>
          <Input value={user.gender} onChange={handleInputChange} name="gender" type="text" title="Gender" placeholder="Género"/>
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
}

export default App;
