import React, { useContext } from "react";
import { FoodListContext } from "../context/FoodListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddressForm } from "./AddressForm";
import { v4 as uuid } from "uuid";

export const Address = () => {
  const { state, dispatch } = useContext(FoodListContext);

  const handleDeleteAddress = (id) => {
    dispatch({
      type: "ADDRESS_DELETE_BUTTON_CLICKED",
      payload: id,
    });
  };

  const handleEditAddress = (id) => {
    dispatch({
      type: "ADDRESS_EDIT_BUTTON_CLICKED",
      payload: id,
    });
  };

  return (
    <div className="address-outer-container">
      <div className="address-header">
        {state.addresses.length === 0 && <h3>No address to display</h3>}
      </div>
      <div className="address-container">
        <div className="controller-container">
          {state.isAdded ? (
            <AddressForm
              details={{
                id: uuid(),
                name: "",
                phone: "",
                city: "",
                pin: "",
                profileState: "",
                addressText: "",
              }}
            />
          ) : (
            <button
              className="add-address-btn"
              onClick={() => dispatch({ type: "ADD_ADDRESS_BUTTON_CLICKED" })}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {!state.isAdded && (
            <p className="add-address-label">Add new Address</p>
          )}
        </div>

        <ul className="list-stacked address-list">
          {state.addresses.map((details) => {
            const { id, name, phone, city, pin, addressText, profileState } =
              details;
            console.log(state.editAddressId, "state.editAddressId");
            const isEditing = state.editAddressId === id;

            return (
              <div className="controller-container">
                {isEditing ? (
                  <AddressForm details={details} />
                ) : (
                  <div style={{ width: "100%" }}>
                    <div className="list-stacked-heading">
                      <h3>{name}</h3>
                    </div>
                    <div className="ph-no-city-section">
                      <p>{phone}</p>
                      <p>{city}</p>
                    </div>
                    <div className="pin-state-section">
                      <p>
                        <b>Pin:</b> {pin}
                      </p>
                      <p>
                        <b>State:</b> {profileState}
                      </p>
                    </div>
                    <div className="address-section">
                      <p>
                        <b>Address:</b>: {addressText}
                      </p>
                    </div>
                    <div className="address-footer">
                      <button onClick={() => handleEditAddress(id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteAddress(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
