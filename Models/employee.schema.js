import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    profile: {
      type: String,
    },
    students: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: "Student", 
        default: null },
    ],
    profilephoto : {
      type : String,
      default : "https://ohmylens.com/wp-content/uploads/2017/06/dummy-profile-pic-300x300.png"
    }
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
