// utils.js
const getRoomId = (userId1, userId2) => {
    let ids = [userId1, userId2];
    ids.sort();
    return ids.join('-'); // Add return statement
  };

export default getRoomId
