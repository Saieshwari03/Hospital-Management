const express = require("express");
const cors = require("cors");

require("dotenv").config();

const patientRoutes =
    require("./routes/patientRoutes");

const doctorRoutes =
    require("./routes/doctorRoutes");

const nurseRoutes =
    require("./routes/nurseRoutes");

const recordRoutes =
    require("./routes/recordRoutes");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use(
    "/api/patients",
    patientRoutes
);

app.use(
    "/api/doctors",
    doctorRoutes
);

app.use(
    "/api/nurses",
    nurseRoutes
);

app.use(
    "/api/records",
    recordRoutes
);


// Test

app.get("/", (req, res) => {

    res.send(
        "Hospital Management Server is running"
    );

});


// Start server

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Server running at http://localhost:${process.env.PORT}`
        );

    }
);