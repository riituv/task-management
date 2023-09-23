import mongoose from "mongoose";

const taskSchema=mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          trim: true,
        },
        completeBeforeDate: {
          type:Date,
          required: true,
        },
        done:{
            type: Boolean,
            default : false,
        },

      },
);

export const Task = mongoose.model('Task', taskSchema);
