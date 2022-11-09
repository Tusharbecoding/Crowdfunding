import React, { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { create as IPFSHTTPCLIENT } from "ipfs-http-client";

const client = IPFSHTTPCLIENT("https://ipfs.infura:5001/api/v0");

function FormRight({ title, story }) {
  const amount = useRef(0);
  const category = useRef("");
  const [image, setImage] = useState(null);
  const [storyUrl, setStoryUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const campaignCreate = () => {
    console.log(title.current.value);
    console.log(story.current.value);
    // console.log(amount.current.value);
    // console.log(category.current.value);
  };
  const uploadFiles = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      if (story.current.value !== "") {
        const add = await client.add(story.current.value);
        setStoryUrl(add.path);
      }
    } catch (err) {
      toast.warn("Error Uploading Story");
      setUploading(false);
      return;
    }
    try {
      if (image !== null) {
        const add = await client.add(image);
        setImageUrl(add.path);
      }
    } catch (err) {
      console.log(err);
      toast.warn("Error Uploading Image");
      setUploading(false);
      return;
    }

    setUploading(false);
    setUploaded(true);
    toast.success("Uploaded ");
  };
  return (
    <FormRightWrapper>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              ref={amount}
              type="number"
              placeholder="Required Amount"
            ></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select ref={category}>
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image
          alt="dapp"
          onChange={(e) => setImage(e.target.files[0])}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>

      {uploading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded == false ? (
        <Button onClick={uploadFiles}>Upload Files to IPFS</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Sucessfully
        </Button>
      )}
      <Button onClick={campaignCreate}>Start Campaign</Button>
    </FormRightWrapper>
  );
}

const FormRightWrapper = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;
export default FormRight;
