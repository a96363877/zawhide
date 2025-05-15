// This file is now just a wrapper around the server API
// The actual implementation is hidden on the server

export async function fetchBalance(phoneNumber: string) {
  // This function is now just a placeholder
  // The actual implementation is in the server API route
  // This helps with code organization and imports

  // In a real implementation, you would remove this function entirely
  // and call the API route directly from the component

  // Mock data for development
  return {
    dueAmount: "29.900",
    dueDate: "2023-12-31",
    accountStatus: "active",
  }
}
