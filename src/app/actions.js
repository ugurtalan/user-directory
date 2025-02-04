"use server"

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json(); // JSONPlaceholder doğrudan bir dizi döndürür
  

  return users || []; 
}








