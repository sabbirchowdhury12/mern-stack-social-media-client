/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  DeleteOutline,
  Download,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import Flex from "../../components/flex";
import Friend from "../../components/friend";
import WidgetWrapper from "../../components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "../../state";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { saveAs } from "file-saver";
import { postApi } from "../../utils/apiRoutes";
import ConfirmationModal from "../../components/confirmationModal";
import toast from "react-hot-toast";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false); // State for confirmation modal

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${postApi}/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleComment = async () => {
    const response = await fetch(`${postApi}/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  const handleSaveImage = () => {
    saveAs(picturePath, "downloaded_image.jpg");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("https://sabbir-chowdhury-portfolio.vercel.app/")
      .then(
        () => {
          setCopySuccess("Link copied!");
          setTimeout(() => {
            setCopySuccess("");
          }, 2000);
        },
        (err) => {
          setCopySuccess("Failed to copy!");
          console.error("Failed to copy the text: ", err);
        }
      );
  };

  // Handle delete post confirmation
  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${postApi}/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(deletePost({ id: postId }));
        toast.success("delete successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setOpenConfirmation(false);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <>
          <Zoom>
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={picturePath}
            />
          </Zoom>
        </>
      )}

      <Flex mt="0.25rem">
        <Flex gap="1rem">
          <Flex gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Flex>

          <Flex gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Flex>
          <Flex gap="0.3rem" title="download">
            <Button onClick={handleSaveImage}>
              <Download />
            </Button>
          </Flex>
        </Flex>

        <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
          {loggedInUserId == postUserId && (
            <IconButton onClick={() => setOpenConfirmation(true)}>
              <DeleteOutline />
            </IconButton>
          )}
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={copyToClipboard}>
              <ShareOutlined />
            </IconButton>
            {/* Display the success message below the button */}
            {copySuccess && (
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "0",
                  color: "green",
                  fontSize: "0.8rem",
                  width: "100px",
                }}
              >
                {copySuccess}
              </Typography>
            )}
          </Box>
        </Box>
      </Flex>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Flex gap="0.3rem">
            <InputBase
              placeholder="leave a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 2rem",
                margin: "1rem 0",
              }}
            />
            <Button
              disabled={!comment}
              onClick={handleComment}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Done
            </Button>
          </Flex>
          <Divider />
        </Box>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirm={handleDeletePost}
      />
    </WidgetWrapper>
  );
};

export default PostWidget;
