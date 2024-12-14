import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string(),
})

export type User = z.infer<typeof userSchema>

export const users: User[] = [
  {
    id: "728ed52f",
    firstName: "Firde",
    lastName: "Abebe",
    email: "firdae@gmail.com",
    phone: "+252910483817",
    role: "System Admin",
  },
  {
    id: "489e1d42",
    firstName: "Mulugeta",
    lastName: "Gidada",
    email: "Mule@gmail.com",
    phone: "+252910483817",
    role: "Approver",
  },
  {
    id: "573d2b1c",
    firstName: "kumlachew",
    lastName: "Debebe",
    email: "kume@gmail.com",
    phone: "+252910483817",
    role: "Checker",
  },
  {
    id: "892c4a3e",
    firstName: "Sultan",
    lastName: "Mohammed",
    email: "Sultan@gmail.com",
    phone: "+252910483817",
    role: "Super Admin",
  },
  {
    id: "634f1b5d",
    firstName: "Sinafkish",
    lastName: "Tesfaye",
    email: "Sinafkish@gmail.com",
    phone: "+252910483817",
    role: "Checker",
  }
]