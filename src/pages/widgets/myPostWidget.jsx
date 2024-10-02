/* eslint-disable react/prop-types */
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Flex from "../../components/flex";
import Dropzone from "react-dropzone";
import UserImage from "../../components/userImage";
import WidgetWrapper from "../../components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import { postApi } from "../../utils/apiRoutes";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    setLoading(true);
    setErrorMessage("");
    const imageUrl = await uploadImage(image);

    if (!imageUrl) {
      toast.error("Something Wrong with Your Photo. Try Later");
      setLoading(false);
      return;
    }
    if (imageUrl) {
      const postData = {
        userId: _id,
        description: post,
        picturePath: imageUrl,
      };

      const response = await fetch(`${postApi}/create-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const posts = await response.json();
      toast.success("Post Created Successfully");
      setLoading(false);
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    }
  };

  return (
    <WidgetWrapper>
      <Flex gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          required
        />
      </Flex>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Flex>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <Flex>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </Flex>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "10%", marginLeft: "5px" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Flex>
            )}
          </Dropzone>
        </Box>
      )}

      {/* {errorMessage && (
        <Typography color="error" sx={{ mt: "1rem" }}>
          {errorMessage}
        </Typography>
      )} */}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Flex>
        <Flex gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </Flex>

        <Button
          // disabled={!post || !image}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              style={{ marginLeft: "8px", color: "#FFFFFF" }}
              size={16}
            />
          ) : (
            "POST"
          )}
        </Button>
      </Flex>

      {errorMessage && (
        <Typography color="error" sx={{ mt: "1rem" }}>
          {errorMessage}
        </Typography>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
