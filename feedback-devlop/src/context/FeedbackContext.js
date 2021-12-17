import { createContext, useState, useEffect } from 'react'
import FeedbackData from "../data/FeedbackData"
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const filters = [{id:-1 ,label:"All"},{id:0 ,label:"Football"},{id:1 ,label:"Men's Basketball"},{id:2 ,label:"Women's basketball"},
  {id:3 ,label:"Softball"},{id:4 ,label:"Baseball"},{id:5 ,label:"Campus"}]


  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async (page=1,category=null, status=null) => {
    let url = `http://127.0.0.1:8000/posts/?page=${page}`
    //console.log(category,status);
    if(category)
      url = `${url}&topic=${category}`
    if(status !== null)
      url = `${url}&isPublished=${status}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setFeedback(data['results'])
    setIsLoading(false)

  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    var formdata = new FormData();
    formdata.append("content", newFeedback.text);
    formdata.append("postImage", newFeedback.media, newFeedback.media['name']);
    formdata.append("topic", newFeedback.category );
    formdata.append("postTime", newFeedback.postTime+":00");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/post/create/", requestOptions)
      .then(response => alert("The post has been added successfully!"))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }



  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        filters,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        fetchFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
