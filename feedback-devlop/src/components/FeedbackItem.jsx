import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
  let date = item.date_created  ? new Date(item.date_created).toDateString() : null
  let time = item.date_created  ? new Date(item.date_created).toTimeString().split(' ')[0] : null
  return (
    <Card>
      <button onClick={() => deleteFeedback(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.content}</div>
      <div className="info-bar">
        <span>{item.isPublished ? 'Published' : 'Pending'}</span>
        <span>{item.topic}</span>
        <span>{date}</span>
        <span>{time}</span>
        <span>{item.postLink ? <a target="_blank" href={item.postLink}>Tweet post link</a> : "Not published yet"}</span>
        <span>{item.postImage ? <a target="_blank" href={item.postImage}>View media</a> : "Not Image"}</span>
      </div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
