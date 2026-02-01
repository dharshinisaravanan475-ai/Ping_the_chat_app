import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "ananya.reddy@example.com",
    fullName: "Ananya Reddy",
    password: "Ananya@123",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "keerthi.iyer@example.com",
    fullName: "Keerthi Iyer",
    password: "Keerthi@123",
    profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    email: "swathi.nair@example.com",
    fullName: "Swathi Nair",
    password: "Swathi@123",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "divya.menon@example.com",
    fullName: "Divya Menon",
    password: "Divya@123",
    profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "lavanya.kumar@example.com",
    fullName: "Lavanya Kumar",
    password: "Lavanya@123",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "meera.rajan@example.com",
    fullName: "Meera Rajan",
    password: "Meera@123",
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    email: "sindhu.venkat@example.com",
    fullName: "Sindhu Venkat",
    password: "Sindhu@123",
    profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
  },
  {
    email: "bhavya.pillai@example.com",
    fullName: "Bhavya Pillai",
    password: "Bhavya@123",
    profilePic: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    email: "nitya.krishnan@example.com",
    fullName: "Nitya Krishnan",
    password: "Nitya@123",
    profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    email: "reshma.murthy@example.com",
    fullName: "Reshma Murthy",
    password: "Reshma@123",
    profilePic: "https://randomuser.me/api/portraits/women/30.jpg",
  },

  // Male Users
  {
    email: "arjun.nair@example.com",
    fullName: "Arjun Nair",
    password: "Arjun@123",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "vikram.reddy@example.com",
    fullName: "Vikram Reddy",
    password: "Vikram@123",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "sachin.iyer@example.com",
    fullName: "Sachin Iyer",
    password: "Sachin@123",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "karthik.menon@example.com",
    fullName: "Karthik Menon",
    password: "Karthik@123",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "ravi.kumar@example.com",
    fullName: "Ravi Kumar",
    password: "Ravi@123",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "suresh.rajan@example.com",
    fullName: "Suresh Rajan",
    password: "Suresh@123",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "vignesh.pillai@example.com",
    fullName: "Vignesh Pillai",
    password: "Vignesh@123",
    profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    email: "gokul.krishnan@example.com",
    fullName: "Gokul Krishnan",
    password: "Gokul@123",
    profilePic: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    email: "naveen.babu@example.com",
    fullName: "Naveen Babu",
    password: "Naveen@123",
    profilePic: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    email: "pradeep.murthy@example.com",
    fullName: "Pradeep Murthy",
    password: "Pradeep@123",
    profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
  },
];


const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();