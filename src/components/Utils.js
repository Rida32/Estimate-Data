

export function formatDateToCustomString(date) {
    if (!date) return ""; 
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options).replace(",", "-");
  }
  
  export const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty or undefined input
    // Split the dateString to get only the date part
    if (typeof dateString !== "string") {
      const formattedDate = dateString.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    console.log("formattedDate",formattedDate);
     return formattedDate
    }
  };
  
  export function formatDateToInput(value) {
    if (!value) return "";
    const date = new Date(value);
    return date.toISOString().split("T")[0];
  }