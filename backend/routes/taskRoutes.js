import express from "express";
import { Task } from '../models/taskModel.js';

const router =express.Router();

//save a new task or create a new task
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.completeBeforeDate
        ) {
            return response.status(400).send({
                message: 'Title and CompleteBeforeDate are required',
            });
        }
        const newTask = {
            title: request.body.title,
            description: request.body.description,
            completeBeforeDate: new Date(request.body.completeBeforeDate),
        };

        const task = await Task.create(newTask);

        return response.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get all tasks
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json({
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get a specific task
router.get('/:id', async (request, response) => {
    try {
        const{id}=request.params;

        const task = await Task.findById(id);

        if (!task) {
            return response.status(404).json({ message: 'Task not found' });
          }
      
        return response.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//update an existing task by id
router.put('/:id',async(request, response)=>{
   try {
    if (
        !request.body.title ||
        !request.body.completeBeforeDate
    ) {
        return response.status(400).send({
            message: 'Title and CompleteBeforeDate are required',
        });
    }

    const {id}= request.params;
    const result=await Task.findByIdAndUpdate(id, request.body);
    if (!result) {
        return response.status(404).json({ message: 'Task not found' });
      }
  
      return response.status(200).send({ message: 'Task updated successfully' });
    
   } catch (error) {
    console.log(error.message);
        response.status(500).send({ message: error.message });
   } 
});

//delete a task
router.delete('/:id', async(request, response)=>{
    try {
        const {id}=request.params;

        const result=await Task.findByIdAndDelete(id);
        
        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
          }
      
          return response.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
