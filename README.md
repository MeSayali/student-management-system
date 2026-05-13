# Student Management System Deployment on Microsoft Azure
http://135.235.197.17/
## Project Name

Student Management System

## GitHub Repository

[https://github.com/MeSayali/student-management-system](https://github.com/MeSayali/student-management-system)

---

# Aim

To deploy the Student Management System project on a Microsoft Azure Virtual Machine using:

* Ubuntu Linux VM
* Node.js
* MongoDB Atlas
* PM2 Process Manager
* Nginx Web Server

---

# Technologies Used

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* Server: Nginx
* Process Manager: PM2
* Cloud Platform: Microsoft Azure
* Version Control: Git & GitHub

---

# Azure VM Configuration

| Component        | Details          |
| ---------------- | ---------------- |
| Operating System | Ubuntu 24.04 LTS |
| Cloud Provider   | Microsoft Azure  |
| Web Server       | Nginx            |
| Runtime          | Node.js v20      |
| Process Manager  | PM2              |

---

# Deployment Steps

## Step 1: Connect to Azure VM

```bash
cd Downloads

ssh -i VM1_key.pem azureuser@<PUBLIC-IP>
```

---

## Step 2: Update Ubuntu Packages

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Step 3: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install -y nodejs
```

Check Version:

```bash
node -v
npm -v
```

---

## Step 4: Install Git and Nginx

```bash
sudo apt install git nginx -y
```

---

## Step 5: Clone GitHub Repository

```bash
cd ~

git clone https://github.com/MeSayali/student-management-system.git
```

Open Project Folder:

```bash
cd student-management-system
```

---

# Backend Deployment

## Step 6: Install Backend Dependencies

```bash
cd backend

npm install
```

---

## Step 7: Create Environment Variables

Create `.env` file:

```bash
nano .env
```

Add:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=mysecret
```

---

## Step 8: Install PM2

```bash
sudo npm install -g pm2
```

---

## Step 9: Start Backend Server

```bash
pm2 start server.js --name backend
```

Check Running Process:

```bash
pm2 list
```

Save PM2 Process:

```bash
pm2 save
```

---

## Step 10: Test Backend

```bash
curl http://localhost:5001/students
```

Output:

```json
[
  {
    "name": "sayali",
    "rollNo": "1",
    "department": "Computer",
    "marks": 99
  }
]
```

---

# Frontend Deployment

## Step 11: Configure Nginx

Create Nginx Configuration:

```bash
sudo nano /etc/nginx/sites-available/app
```

Add Configuration:

```nginx
server {
    listen 80 default_server;
    server_name _;

    root /home/s24ce029/student-management-system/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /students {
        proxy_pass http://localhost:5001;
    }
}
```

---

## Step 12: Enable Nginx Configuration

```bash
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
```

Remove Default Configuration:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## Step 13: Fix Folder Permissions

```bash
sudo chmod 755 /home/s24ce029

sudo chmod 755 /home/s24ce029/student-management-system

sudo chmod 755 /home/s24ce029/student-management-system/frontend

sudo chmod 644 /home/s24ce029/student-management-system/frontend/index.html
```

---

## Step 14: Test and Restart Nginx

```bash
sudo nginx -t

sudo systemctl restart nginx
```

---

# Errors Faced During Deployment

## 1. 500 Internal Server Error

### Cause

Incorrect Nginx root path and frontend configuration.

### Solution

Updated Nginx configuration with correct frontend path.

---

## 2. Rewrite or Internal Redirection Cycle Error

### Cause

Infinite redirect caused by incorrect `try_files` configuration.

### Solution

Simplified Nginx routing configuration.

---

## 3. 403 Forbidden Error

### Cause

Nginx did not have permission to access frontend files.

### Solution

Updated file and folder permissions using `chmod`.

---

ess demonstrated how to host a full-stack Node.js application on Microsoft Azure using Ubuntu VM, Nginx, PM2, and MongoDB Atlas. The project was successfully configured and deployed with proper server management and error handling.
