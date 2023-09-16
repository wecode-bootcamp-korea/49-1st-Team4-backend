
function convertThreadDataToBoolean(thread) {
    thread.isMyPost = checkBoolean(thread.isMyPost);
    thread.isLiked = checkBoolean(thread.isLiked);
    thread.likeCount = (thread.likeCount === null || thread.likeCount === "null") 
      ? 0 
      : parseInt(thread.likeCount);
    thread.createdAt = new Date(thread.createdAt).toISOString();
    if (thread.comments) {
      for (let j = 0; j < thread.comments.length; j++) {
        let comment = thread.comments[j];
        comment.isMyReply = checkBoolean(comment.isMyReply);
        comment.createdAt = new Date(comment.createdAt).toISOString();
      }
    } else {
      thread.comments = [];
    }
  }
  
  const checkBoolean = (target) => {
    return (
      target === "1" 
      || target === 1 
      || target === true 
      || target === "true"
      ) ? true : false;
  };

  module.exports = {
    convertThreadDataToBoolean,
  }