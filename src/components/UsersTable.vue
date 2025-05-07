<template>
    <div class="table-container">
      <h3>Table of users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Tool</th>
            <th>IDTool</th>
            <th>ProjectTool</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.tool }}</td>
            <td>{{ user.idTool }}</td>
            <td>{{ user.projectTool }}</td>
            <td>{{ user.created }}</td>
            <td>
              <button class="action-button">Edit</button>
              <button class="action-button delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { User } from '@/api';
  
  defineProps<{
    users: User[];
  }>();
  </script>
  
  <style scoped>
  .table-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
  
  .action-button {
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .action-button.delete {
    background-color: #f44336;
  }
  
  .action-button:hover {
    opacity: 0.8;
  }
  </style>