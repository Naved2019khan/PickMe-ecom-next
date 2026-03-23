// Mock Authentication API

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

// Simulate backend latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Mock Database of users
const MOCK_DB: User[] = [
  { id: "u1", name: "Naved Khan", email: "naved@gmail.com", phone: "+91 9876543210" }
];

export async function loginApi(email: string, password: string): Promise<User> {
  await delay(1000);

  if (password !== 'password') { // any password but "password" works for this mock, but let's make anything work unless it's empty
    if (!password) throw new Error("Password is required");
  }

  const user = MOCK_DB.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
}

export async function signupApi(name: string, email: string, phone: string, password: string): Promise<User> {
  await delay(1200);

  if (!name || !email || !phone || !password) {
    throw new Error("All fields are required");
  }

  const exists = MOCK_DB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("Account with this email already exists");
  }

  const newUser: User = {
    id: `u${MOCK_DB.length + 1}`,
    name,
    email,
    phone
  };

  MOCK_DB.push(newUser);
  return newUser;
}
