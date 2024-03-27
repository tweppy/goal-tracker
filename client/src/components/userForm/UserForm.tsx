import "./style.scss";

import { Input } from "../Input/Input";

interface UserFormProps {
  heading: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
}

export const UserForm: React.FC<UserFormProps> = ({
  heading,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
}) => {
  return (
    <section className="user-form">
      <h2 className="user-form__heading">{heading}</h2>
      <section className="user-form__inputs">
        <Input
          label="Username"
          type="username"
          id="username"
          name="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {email !== undefined && setEmail !== undefined && (
          <Input
            label="E-mail"
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        )}
      </section>
    </section>
  );
};
