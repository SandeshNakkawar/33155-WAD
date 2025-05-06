const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Employee = require('./models/employee');
const PORT = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employee")
.then(()=> {
    console.log("MongoDB Connected successfully")
});

app.get('/api/employee', async (req, res) => {
    const emp = await Employee.find();
    res.status(201).json(emp);
});

app.post('/api/employee', async (req, res) => {
    try {
      const { name, department, designation, salary, doj } = req.body;
  
      const newEmp = new Employee({
        name,
        department,
        designation,
        salary,
        doj: new Date(doj), // ensures correct date format
      });
  
      const savedEmp = await newEmp.save();
      res.status(201).json(savedEmp);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.put('/api/employee/:id', async (req, res) => {
    const { name, department, designation, salary, doj } = req.body;
  
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, department, designation, salary, doj },
      { new: true }
    );
  
    res.status(200).json(updated);
  });


app.delete('/api/employee/:id', async (req, res) => {
const emp = await Employee.findByIdAndDelete(req.params.id);
res.status(201).json({"message":"Deleted successfully"});
});


app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
})


