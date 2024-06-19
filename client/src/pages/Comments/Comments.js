import React, { useEffect, useState ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Comments.css';
import { Grid, Paper, TextField, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { CiTrash } from "react-icons/ci";
import { AuthContext } from "../helpers/Authcontext";

export default function Comments() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paperStyle = {
        padding: 20,
        height: 'auto',
        width: isSmallScreen ? '90%' : 580,
        height: isSmallScreen ? '90%' : 600,
        margin: "100px auto"
    };
    const btnstyle = { margin: '8px 0' };
    const fieldStyle = { margin: '10px 0' };

    let { id } = useParams();

    const [service, setService] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authstate}=useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3001/service/byId/${id}`)
            .then((response) => {
                setService(response.data);
            })
            .catch((error) => {
                console.error("Error fetching service:", error);
            });

        axios.get(`http://localhost:3001/comments/${id}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
            
    },[id]);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            commentBody: newComment,
            ServiceId: id,
            
        },{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }
    ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                const newCommentData = response.data;
                const commentToAdd = {
                    commentBody: newComment,
                    userName: newCommentData.userName,
                    createdAt: newCommentData.createdAt
                };
                setComments([commentToAdd, ...comments]); // Prepend new comment
                setNewComment(""); // Clear input field
                console.log(commentToAdd)
            }
        }).catch((error) => {
            console.error("Error adding comment:", error);
        });
    };

    const handleDelete = (commentId) => {
        console.log(commentId)
        axios.delete(`http://localhost:3001/comments/com/${commentId}`,{
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
            .then((response) => {
                // Update state to remove the deleted comment from comments array
                setComments(comments.filter(comment => comment.id !== commentId));
                console.log("Comment deleted successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });
    };
    

    

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <article className='service1'>
                    <div className='service__head1'>
                        <div className='icon1'>
                            <img src={service.icon} alt='Innovation1' />
                        </div>
                        <h4 id={service.color}>{service.title}</h4>
                    </div>
                    <div className='innerBody1'>
                        <p className='subtitle1'>{service.body}</p>
                    </div>
                </article>
            </div>
            <div className='rightSide'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid align='center'>
                                <h2>Leave A Comment</h2>
                            </Grid>
                            <Grid>
                                <TextField
                                    style={fieldStyle}
                                    label='Comment'
                                    placeholder='Leave a comment...'
                                    fullWidth
                                    required
                                    onChange={(event) => { setNewComment(event.target.value) }}
                                    value={newComment}
                                />
                                <Button
                                    onClick={addComment}
                                    type='submit'
                                    color='primary'
                                    variant="contained"
                                    style={btnstyle}
                                    fullWidth
                                >
                                    Comment
                                </Button>
                            </Grid>
                            <Grid className="commentsContainer">
                            {comments.map((comment, key) => {
    const formattedDate = comment.createdAt ? formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true }) : "";
    return (
        <div key={key} className="comment">
            <div className="commentContent">
                <div>
                    <strong>{comment.userName}</strong>
                    <br />
                    {comment.commentBody}
                    <br />
                    <small>{formattedDate}</small>
                </div>
                {authstate.userName === comment.userName &&
                <CiTrash size={30} className='iconic' onClick={() => handleDelete(comment.id)} />}

            </div>
        </div>
    );
})}
                              
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
