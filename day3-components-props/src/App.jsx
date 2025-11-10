import { useState } from 'react'
import './App.css'

// 🎯 COMPONENT 1: User Avatar
function UserAvatar({ src, alt, size = "medium", online = false }) {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium', 
    large: 'avatar-large'
  };

  return (
    <div className={`avatar ${sizeClasses[size]}`}>
      <img src={src} alt={alt} />
      {online && <span className="online-indicator"></span>}
    </div>
  );
}

// 🎯 COMPONENT 2: Like Button (with interactive props)
function LikeButton({ likes, onLike, liked = false }) {
  return (
    <button 
      className={`like-btn ${liked ? 'liked' : ''}`}
      onClick={onLike}
    >
      ❤️ {likes}
    </button>
  );
}

// 🎯 COMPONENT 3: Comment Section
function CommentSection({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments ({comments.length})</h4>
      
      {/* Comments List */}
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>User {index + 1}:</strong> {comment}
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          Post
        </button>
      </form>
    </div>
  );
}

// 🎯 COMPONENT 4: Social Card (Main Component)
function SocialCard({ 
  user = {}, 
  content = {}, 
  stats = {},
  onLike,
  onAddComment 
}) {
  const { name, avatar, role, online } = user;
  const { title, text, image, date } = content;
  const { likes, comments: initialComments, shares } = stats;

  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);
    onLike?.(newLikedState);
  };

  const handleAddComment = (commentText) => {
    const newComments = [...comments, commentText];
    setComments(newComments);
    onAddComment?.(commentText);
  };

  return (
    <div className="social-card">
      {/* Card Header */}
      <div className="card-header">
        <UserAvatar 
          src={avatar} 
          alt={name} 
          size="medium" 
          online={online} 
        />
        <div className="user-info">
          <h3 className="username">{name}</h3>
          <p className="user-role">{role}</p>
          <span className="post-date">{date}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <h2 className="post-title">{title}</h2>
        <p className="post-text">{text}</p>
        {image && (
          <div className="post-image">
            <img src={image} alt="Post visual" />
          </div>
        )}
      </div>

      {/* Card Stats */}
      <div className="card-stats">
        <div className="stat">
          <span className="stat-number">{currentLikes}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat">
          <span className="stat-number">{comments.length}</span>
          <span className="stat-label">Comments</span>
        </div>
        <div className="stat">
          <span className="stat-number">{shares}</span>
          <span className="stat-label">Shares</span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="card-actions">
        <LikeButton 
          likes={currentLikes} 
          onLike={handleLike}
          liked={isLiked}
        />
        <button className="action-btn">💬 Comment</button>
        <button className="action-btn">🔄 Share</button>
      </div>

      {/* Comments Section */}
      <CommentSection 
        comments={comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

// 🎯 COMPONENT 5: Card Container (Layout Component)
function CardContainer({ children, title }) {
  return (
    <div className="card-container">
      {title && <h1 className="container-title">{title}</h1>}
      <div className="cards-grid">
        {children}
      </div>
    </div>
  );
}

// 🎯 MAIN APP COMPONENT
function App() {
  // Sample data for our cards
  const cardData = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "React Developer",
        online: true
      },
      content: {
        title: "Just mastered React Components! 🚀",
        text: "Today I learned about props, component composition, and building reusable UI pieces. The power of React is incredible!",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
        date: "2 hours ago"
      },
      stats: {
        likes: 42,
        comments: ["Great job!", "Welcome to React!", "Awesome progress!"],
        shares: 5
      }
    },
    {
      id: 2,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        role: "UI/UX Designer",
        online: false
      },
      content: {
        title: "Design Systems in React",
        text: "Building consistent, beautiful interfaces with React components. Consistency + flexibility = amazing user experiences!",
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&h=300&fit=crop",
        date: "5 hours ago"
      },
      stats: {
        likes: 89,
        comments: ["Love this approach!", "Can you share your design tokens?"],
        shares: 12
      }
    },
    {
      id: 3,
      user: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "Full Stack Developer",
        online: true
      },
      content: {
        title: "The Power of Component Composition",
        text: "Instead of complex inheritance hierarchies, React encourages composition. Small, focused components that work together beautifully.",
        date: "1 day ago"
      },
      stats: {
        likes: 156,
        comments: ["So true!", "Composition over inheritance!", "Great examples"],
        shares: 23
      }
    }
  ];

  // Event handlers passed as props
  const handleCardLike = (cardId, liked) => {
    console.log(`Card ${cardId} ${liked ? 'liked' : 'unliked'}`);
  };

  const handleCardComment = (cardId, comment) => {
    console.log(`New comment on card ${cardId}: ${comment}`);
  };

  return (
    <div className="app">
      <CardContainer title="🔥 React Social Feed - Component Mastery">
        {cardData.map(card => (
          <SocialCard
            key={card.id}
            user={card.user}
            content={card.content}
            stats={card.stats}
            onLike={() => handleCardLike(card.id, true)}
            onAddComment={(comment) => handleCardComment(card.id, comment)}
          />
        ))}
      </CardContainer>

      {/* Component Demonstration Area */}
      <div className="component-demo">
        <h2>🎯 Component & Props Demonstration</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>UserAvatar Component</h3>
            <div className="avatar-demo">
              <UserAvatar 
                src={cardData[0].user.avatar} 
                alt="Demo Avatar" 
                size="small" 
                online={true} 
              />
              <UserAvatar 
                src={cardData[1].user.avatar} 
                alt="Demo Avatar" 
                size="medium" 
                online={false} 
              />
              <UserAvatar 
                src={cardData[2].user.avatar} 
                alt="Demo Avatar" 
                size="large" 
                online={true} 
              />
            </div>
          </div>

          <div className="demo-item">
            <h3>LikeButton Component</h3>
            <div className="like-demo">
              <LikeButton likes={42} onLike={() => console.log('Liked!')} />
              <LikeButton likes={89} onLike={() => console.log('Liked!')} liked={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;