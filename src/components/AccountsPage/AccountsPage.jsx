import React, { useEffect, useState } from "react";
import "./AccountsPage.css";
import { FaEdit, FaSave } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useAuth } from "../../authentication";
import Loading from "../Loading/Loading";
import HistoryElement from "./HistoryElement";

const AccountsPage = () => {
  const { fetchProfile, fetchHistory, updateUserInfo } = useAuth();
  const { id } = useParams();
  const [name, setName] = useState("null");
  const [email, setEmail] = useState("null");
  const [address, setAddress] = useState("null");
  const [initials, setInitials] = useState("");
  const [purchaseHistory, setpurchaseHistory] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const fetchedProfile = await fetchProfile(id);
        const fetchedHistory = await fetchHistory(id);
        setEmail(fetchedProfile.email);
        setName(fetchedProfile.username);
        setAddress(fetchedProfile.address);
        setpurchaseHistory(fetchedHistory);
        setInitials(getInitials(fetchedProfile.username));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    loadProfile();

  }, [id, fetchProfile]);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEditClick = (field) => {
    switch (field) {
      case "name":
        setIsEditingName(true);
        break;
      case "email":
        setIsEditingEmail(true);
        break;
      case "address":
        setIsEditingAddress(true);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = async (field) => { 
    switch (field) {
      case "name":
        setIsEditingName(false);
        break;
      case "email":
        setIsEditingEmail(false);
        break;
      case "address":
        setIsEditingAddress(false);
        break;
      default:
        break;
    }

    const updatedInfo = {
      username: name,
      email: email,
      address: address,
    };

    try {
      await updateUserInfo(id, updatedInfo);
      alert("Profile details updated!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar isBack={true} />

      <div className="profilePage">
        <h2>User Profile</h2>
        <div className="profileInfo">
          <div className="avatarContainer">
            <div className="avatar">{initials}</div>
          </div>
          <div className="inputContainer">
            <div className="userInfo">
              <label>Name:</label>
              {isEditingName ? (
                <input type="text" value={name} onChange={handleNameChange} />
              ) : (
                <div>{name}</div>
              )}
            </div>
            {isEditingName ? (
              <button onClick={() => handleSaveClick("name")}>
                <FaSave />
              </button>
            ) : (
              <button onClick={() => handleEditClick("name")}>
                <FaEdit />
              </button>
            )}
          </div>
          <div className="inputContainer">
            <div className="userInfo">
              <label>Email:</label>
              {isEditingEmail ? (
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              ) : (
                <div>{email}</div>
              )}
            </div>
            {isEditingEmail ? (
              <button onClick={() => handleSaveClick("email")}>
                <FaSave />
              </button>
            ) : (
              <button onClick={() => handleEditClick("email")}>
                <FaEdit />
              </button>
            )}
          </div>
          <div className="inputContainer">
            <div className="userInfo">
              <label>Address:</label>
              {isEditingAddress ? (
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              ) : (
                <div>{address}</div>
              )}
            </div>
            {isEditingAddress ? (
              <button onClick={() => handleSaveClick("address")}>
                <FaSave />
              </button>
            ) : (
              <button onClick={() => handleEditClick("address")}>
                <FaEdit />
              </button>
            )}
          </div>
        </div>
        <h2 className="purchaseHistoryHeading">Purchase History</h2>
        <div className="purchaseInfo">
          {purchaseHistory.map((history)=>(
            <HistoryElement key={history._id} history={history}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountsPage;
