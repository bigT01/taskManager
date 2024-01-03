# React + TypeScript + Vite + Zustand

In this project main goal was using zustand.

### About project

The project divided for two pages:
1. Login page
   This page connected with zustand and will redirect user to `/dashboard` after registration.
   User info will save in local storage and after log out information will delete. 
2. Dashboard
   In this page user access for some kind of actions like delete task, edit it or create task. 
   Editing and creating task components not same for some kind of reason.
   Also, there are access to drop tasks between status of task
   On the top of columns in left side user have access for filter tasks by 'name', 'date', 'priority'
### Additional Utils
1. for sorting items(tasks) I create functions in `unil` folder
2. every date will save in number format for sorting elements 



### Run the Project
for install packages `yarn install`
for run the project `yarn run dev`

