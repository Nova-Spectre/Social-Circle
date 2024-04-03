import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Gif,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDB } from "../../firebaseConfig";

const MyPostWidget = ({ picturepath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(null);
  const [imageFile, setImageFile] = useState(false);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleFileUpload = async (file) => {
    try {
        if (!file) {
            throw new Error("File is undefined or null");
        }
        

        const storageRef = ref(imageDB); // Use imageDb instead of storage
        const fileRef = ref(storageRef, `Posts/${file.name}`);
        await uploadBytes(fileRef, file);
        

        const downloadURL = await getDownloadURL(fileRef);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

  const handlepost = async () => {
    try{
    let imageURL = null;
    if (imageFile) {
      imageURL = await handleFileUpload(imageFile); // Upload file if it exists
  }
  console.log("Preparing form data...");
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (imageURL) {
      formData.append("picturepath",imageURL );
    }
    console.log("Sending POST request...");

    const response = await fetch("https://social-circle-api.vercel.app/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    console.log("Response from server:", response);
    const posts = await response.json();
    console.log("Response data:", posts);
    dispatch(setPosts({ posts }));
    setImageFile(null);
    setPost("");
  }catch(error){
    console.error("Error posting:", error);
  }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturepath} />
        <InputBase
          placeholder="Whats on your mind...."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImageFile(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!imageFile ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{imageFile.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {imageFile && (
                  <IconButton
                    onClick={() => setImageFile(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlepost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
