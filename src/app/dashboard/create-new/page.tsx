"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import { fieldNameProps } from "@/types/types";
import AiOutputDialog from "../_components/AiOutputDialog";
import { modalContext } from "@/context/ModalContext";
import { userContext } from "@/context/UserContext";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

function CreateNew() {
  const { user } = useUser();
  const [formData, setFormData] = useState<fieldNameProps>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutputImage, setAiOutputImage] = useState<string>("");
  const [orgImage, setOrgImage] = useState<string>("");

  const modalContextValue = useContext(modalContext);
  const userContextValue = useContext(userContext);

  const { openDialog = false, setOpenDialog } = modalContextValue || {};
  const { userDetail, setUserDetail } = userContextValue || {};

  const handleInputChange = (value: string | File, fieldname: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  const updateUserCredits = useCallback(async () => {
    if (!userDetail || userDetail.id === undefined) return;

    try {
      const result = await db
        .update(Users)
        .set({
          credits: (userDetail?.credits || 0) - 1, // Avoid using non-null assertion
        })
        .where(eq(Users.id, userDetail.id))
        .returning({ credits: Users.credits });

      if (result.length > 0) {
        if (setUserDetail) {
          setUserDetail((prev) => ({
            ...prev,
            credits: result[0].credits ?? 0,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating user credits:", error);
    }
  }, [userDetail, setUserDetail]);

  useEffect(() => {
    if (userContextValue && user) {
      if (setUserDetail) {
        setUserDetail((prev) => ({
          ...prev,
          credits: prev?.credits || 0, // Handle undefined credits
        }));
      }
      // Call updateUserCredits when user logs in
      updateUserCredits();
    } else {
      setUserDetail!(null);
    }
  }, [user, setUserDetail, updateUserCredits, userContextValue]);

  if (!modalContextValue || !userContextValue) {
    return null; // Or handle this case appropriately
  }

  const GenerateAiImage = async () => {
    setLoading(true);
    const rawImageUrl = await SaveRawImageToFirebase();
    try {
      const response = await fetch("/api/redesign-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: rawImageUrl,
          roomType: formData.roomType,
          designType: formData.designType,
          additionalReq: formData.additionalReq,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate AI image");
      }

      const data = await response.json();
      await updateUserCredits();
      setAiOutputImage(data.result);
      setOpenDialog!(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "room-redesign/" + fileName);

    try {
      await uploadBytes(
        imageRef,
        formData.image as Blob | Uint8Array | ArrayBuffer
      ); // Pass the image directly
      console.log("File uploaded...");

      const downloadUrl = await getDownloadURL(imageRef);
      setOrgImage(downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500 mt-4">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] mt-10 gap-10">
        <ImageSelection
          selectedImage={(value) => handleInputChange(value, "image")}
        />
        <div>
          <RoomType
            selectedRoomType={(value) => handleInputChange(value, "roomType")}
          />
          <DesignType
            selectedDesignType={(value) =>
              handleInputChange(value, "designType")
            }
          />
          <AdditionalReq
            AdditionalRequirementInput={(value) =>
              handleInputChange(value, "additionalReq")
            }
          />
          <Button onClick={GenerateAiImage} className="w-full mt-2">
            Generate
          </Button>
          <p className="text-sm text-gray-400 mb-20">
            Note: 1 Credit will be used to redesign your room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog && setOpenDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  );
}

export default CreateNew;
