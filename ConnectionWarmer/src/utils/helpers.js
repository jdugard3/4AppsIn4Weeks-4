export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  export const calculateNextInteraction = (lastInteraction, frequency) => {
    const last = new Date(lastInteraction);
    return new Date(last.setDate(last.getDate() + frequency));
  };