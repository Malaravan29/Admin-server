import { Schema as MongooseSchema, model } from "mongoose";

// Regular expression to validate hh:mm:ss format in 24-hour time
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

// Define schema for robot analytics
const RobotAnalyticsSchema = new MongooseSchema({
  robotId: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  batteryPercentage: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  analytics: {
    batteryRunningTime: {
      startingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
      endingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
    },
    motorRunningTime: {
      startingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
      endingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
    },
    uvLightRunningTime: {
      startingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
      endingTime: {
        type: String, // Store time as a string in hh:mm:ss format
        required: true,
        validate: {
          validator: (v) => timeRegex.test(v),
          message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
        },
      },
    },
  },
});

const RobotAnalytics = model("RobotAnalytics", RobotAnalyticsSchema);

export default RobotAnalytics;
