import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required : true
    },
     councellorDetail : {
     type :  mongoose.Schema.Types.ObjectId,
     ref : "Employee",
     default : null
  },
  },
 
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
